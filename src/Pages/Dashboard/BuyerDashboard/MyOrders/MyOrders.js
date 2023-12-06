import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { authContext } from '../../../../Context/AuthContext/AuthProvider';
import useTitle from '../../../../Hooks/useTitle/useTitle';

const MyOrders = () => {
    useTitle("My Orders");

    const { user } = useContext(authContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://second-lit-server.vercel.app/booking?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [user?.email])

    return (
        <div>
            <h1 className='text-2xl font-bold mb-2'>My Order</h1>
            {
                orders.length === 0 &&
                <p className='text-center text-red-600 text-3xl font-semibold'>Nothing To Show</p>
            }

            <div className='grid grid-cols-1 md:grid-cols-2 gap-32'>
                {
                    orders?.map(order =>

                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <figure><img src={order.productImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{order.productName}</h2>
                                <p>TK: {order.productPrice}</p>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => toast.error("Not Implemented")}
                                        className="btn btn-primary">Pay Now</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyOrders;
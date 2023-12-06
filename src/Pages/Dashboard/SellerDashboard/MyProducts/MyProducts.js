import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { authContext } from '../../../../Context/AuthContext/AuthProvider';
import useTitle from '../../../../Hooks/useTitle/useTitle';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const MyProducts = () => {

    useTitle("All Products");
    const { user } = useContext(authContext);

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`https://second-lit-server.vercel.app/products?name=${user?.displayName}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("secondLit-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    const handleDelete = id => {
        fetch(`https://second-lit-server.vercel.app/products/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem("secondLit-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Delete successful");
                    refetch();
                }
            })
    }

    const handleAdvertise = id => {

        fetch(`https://second-lit-server.vercel.app/products/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem("secondLit-token")}`
            }
        }).then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {
                    toast.success("Advertise active Successful");
                    refetch();
                }
            })
    }
    return (
        <div>
            <h1 className='text-2xl font-bold mb-2'>My Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Resale Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, idx) =>
                                <tr className="hover" key={product._id}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.productImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.productName}</div>
                                                <div className="text-sm opacity-50">{product.author}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.category}</td>
                                    <td>{product.resalePrice}</td>
                                    <td>{product.status}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary"
                                            onClick={() => handleDelete(product._id)}
                                        >Delete Product
                                        </button>
                                    </td>
                                    <td>
                                        {
                                            product.status === "Available" && !product.advertised &&
                                            <button className="btn btn-sm btn-accent"
                                                onClick={() => handleAdvertise(product._id)}
                                            >Advertise
                                            </button>

                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;
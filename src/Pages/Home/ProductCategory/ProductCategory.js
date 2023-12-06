import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCategory = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        axios.get("https://second-lit-server.vercel.app/category")
            .then(response => setCategories(response.data))
    }, []);

    return (
        <div className='p-10'>
            <h2 className='text-xl text-gray-700 text-center'>Book Category</h2>
            <h1 className='text-5xl text-primary text-center font-bold mb-6'>
                Book We Sell
            </h1>

            <div className='grid justify-items-center items-center grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
                {
                    categories?.map(category =>

                        <Link to={`/category/${category.name}`} key={category._id}>

                            <div className="card w-96 h-64 bg-base-100 shadow-xl image-full transition ease-in-out delay-100 hover:-translate-y-1">
                                <figure><img src={category.thumbnail} alt=" " /></figure>
                                <div className="card-body flex items-center justify-center">
                                    <h2 className="card-title text-5xl font-bold">{category.name}</h2>
                                </div>
                            </div>

                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default ProductCategory;
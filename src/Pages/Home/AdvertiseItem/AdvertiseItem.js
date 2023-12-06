import React from 'react';
import Item from './Item';

const AdvertiseItem = ({ products }) => {
    // console.log(products);
    return (
        <div className=" 2xl:container 2xl:mx-auto">
            <div className="text-center lg:py-10 md:py-8 py-6">
                <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">Featured Books</p>
            </div>
            <div className="lg:px-20 md:px-6 px-4">

                <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">

                    {
                        products.map(product =>
                            <Item
                                key={product._id}
                                product={product}
                            ></Item>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default AdvertiseItem;
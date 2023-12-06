import React from 'react';

const Item = ({ product }) => {

    const { productImage, resalePrice, author, productName } = product;
    return (
        <div className=" relative ">
            <div className=" relative group">
                <div className=" flex justify-center Items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <img className=" w-full" src={productImage} alt="bookImage" />
            </div>
            <p className=" font-bold text-xl leading-5 text-gray-800 md:mt-6 mt-4">{productName}</p>
            <p className=" font-normal text-xl leading-5 text-gray-800 mt-4">{author}</p>
            <p className=" font-normal text-base leading-4 text-gray-600 mt-4">Taka: {resalePrice}</p>
        </div>
    );
};

export default Item;
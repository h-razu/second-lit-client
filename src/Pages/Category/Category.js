import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle/useTitle';
import BookNowModal from './BookNowModal';

const Category = () => {

    const data = useLoaderData();
    // console.log(data);
    useTitle(`${data[0].category}`)

    const [selectedBook, setSelectedBook] = useState(null);
    return (
        <>
            <h1 className='text-2xl font-bold m-12'>{data[0].category}</h1>
            <div className="bg-gray-100 ">
                <div className="mx-auto container py-8">
                    <div className="flex flex-wrap items-center justify-center">
                        {
                            data.map(item =>
                                <div className="mx-6 w-96 lg:mb-0 mb-8" key={item._id}>
                                    <div>
                                        <img src={item.productImage} className="w-full h-64" alt='' />
                                    </div>
                                    <div className="bg-white">
                                        <div className="p-4">
                                            <div className="flex items-center">
                                                <h2 className="text-lg font-semibold capitalize ">
                                                    {item.productName}
                                                </h2>
                                                <p className="text-xs text-gray-600 capitalize pl-5">by {item.author}</p>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-2">Posted On {item.postedTime} </p>
                                            <div className="flex mt-4">
                                                <div>
                                                    <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                                                        {item.condition}</p>
                                                </div>
                                                <div className="pl-2">
                                                    <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                                                        {item.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between py-4">
                                                <h2 className="text-indigo-700 text-xs font-semibold">
                                                    Seller: {item.seller}
                                                </h2>
                                                <h3 className="text-indigo-700 text-xl font-semibold">
                                                    Taka:{item.resalePrice}
                                                </h3>
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <label
                                                    htmlFor="book-now-modal"
                                                    className="btn btn-primary text-white focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-secondary rounded px-4 sm:px-8 py-2 text-xs sm:text-sm"
                                                    onClick={() => setSelectedBook(item)}
                                                >
                                                    Book Now
                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                selectedBook &&
                <BookNowModal
                    selectedBook={selectedBook}
                    setSelectedBook={setSelectedBook}
                ></BookNowModal>
            }

        </>
    );
};

export default Category;
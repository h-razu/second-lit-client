import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { authContext } from '../../Context/AuthContext/AuthProvider';

const BookNowModal = ({ selectedBook, setSelectedBook }) => {

    const { user } = useContext(authContext);

    const bookDate = format(new Date(), "PP");

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const buyerPhone = form.phone.value;
        const meetLocation = form.meetingLocation.value;

        const booking = {
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerPhone,
            meetLocation,
            productImage: selectedBook.productImage,
            productName: selectedBook.productName,
            productID: selectedBook._id,
            productPrice: selectedBook.resalePrice,
            bookDate,
        }

        fetch("https://second-lit-server.vercel.app/booking", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Booking Confirm")
                    form.reset();
                    setSelectedBook(null);
                }
                else {
                    toast.error(data.message)
                }
            })
    }

    return (
        <div>
            <div className="py-12 bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="book-now-modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">

                        <div onClick={() => setSelectedBook(null)}
                            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={18} y1={6} x2={6} y2={18} />
                                <line x1={6} y1={6} x2={18} y2={18} />
                            </svg>
                        </div>

                        <h1 className="text-gray-800 font-lg font-bold  mb-4">
                            Enter Following Information
                        </h1>

                        <form onSubmit={handleSubmit}>
                            <label className="text-gray-800 text-sm font-bold ">
                                Buyer Name
                            </label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" defaultValue={user?.displayName} readOnly />

                            <label className="text-gray-800 text-sm font-bold     ">
                                Buyer Email
                            </label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" defaultValue={user?.email} readOnly />

                            <label className="text-gray-800 text-sm font-bold     ">
                                Book Name
                            </label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" defaultValue={selectedBook.productName} readOnly />

                            <label className="text-gray-800 text-sm font-bold     ">
                                Book Price
                            </label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" defaultValue={selectedBook.resalePrice} readOnly />

                            <label className="text-gray-800 text-sm font-bold     ">
                                Phone Number
                            </label>
                            <input type="text" name='phone' className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder='phone number' required />

                            <label className="text-gray-800 text-sm font-bold     ">
                                Meeting Location
                            </label>
                            <input type="text" name='meetingLocation' className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder='meeting location' required />


                            <div>
                                <button type='submit' className="focus:outline-none transition duration-150 ease-in-out hover:bg-secondary bg-primary rounded text-white px-8 py-2 text-sm">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookNowModal;
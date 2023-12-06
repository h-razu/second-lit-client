import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { authContext } from '../../../../Context/AuthContext/AuthProvider';
import useTitle from '../../../../Hooks/useTitle/useTitle';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const AddProducts = () => {

    useTitle("Add Product");

    const loaderData = useLoaderData();

    const { user } = useContext(authContext)

    const [isLoading, setLoading] = useState(false);
    const imageHostKey = process.env.REACT_APP_imageBB_key;

    const postedTime = format(new Date(), "PPpp");

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const handleAddProduct = data => {
        // console.log(data);
        setLoading(true);

        const image = data.image[0];
        // console.log(image);
        const formData = new FormData();
        formData.append("image", image);

        //hosting profile image
        const imageBBUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(imageBBUrl, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    storeToDB(data, imageData.data.url);
                }
                else {
                    toast.error("Can't Upload Image!!!")
                    setLoading(false);
                }
            });
    }

    const storeToDB = (data, productImage) => {

        const product = {
            productName: data.productName,
            author: data.author,
            resalePrice: data.resalePrice,
            condition: data.condition,
            mobileNumber: data.mobile,
            location: data.location,
            category: data.category,
            description: data.productDetails,
            originalPrice: data.originalPrice,
            purchaseYear: data.purchaseYear,
            productImage: productImage,
            seller: user?.displayName,
            postedTime,
            status: "Available"
        }
        // console.log(product);
        fetch('https://second-lit-server.vercel.app/products', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("secondLit-token")}`
            },
            body: JSON.stringify(product)
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Product add successful");
                    setLoading(false);
                    navigate("/dashboard/myProducts");
                }
            })
    }

    return (
        <div>
            {
                isLoading &&
                <div>
                    <LoadingSpinner></LoadingSpinner>
                </div>
            }

            <div>
                <h1 className='text-2xl font-bold mb-2'>Add A Products</h1>
                <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleAddProduct)}>
                            <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input type="text" placeholder="product name" className="input input-bordered w-full max-w-md" required
                                        {...register("productName")}
                                    />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Author</span>
                                    </label>
                                    <input type="text" placeholder="author name" className="input input-bordered w-full max-w-md" required
                                        {...register("author")}
                                    />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Resale Price</span>
                                    </label>
                                    <input type="text" placeholder="resale price" className="input input-bordered w-full max-w-md" required
                                        {...register("resalePrice")}
                                    />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Original Price</span>
                                    </label>
                                    <input type="text" placeholder="original price" className="input input-bordered w-full max-w-md" required
                                        {...register("originalPrice")}
                                    />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Product Condition</span>
                                    </label>
                                    <select className="select select-bordered"
                                        {...register("condition")}
                                        defaultValue={'DEFAULT'}
                                    >
                                        <option disabled value="DEFAULT">Choose Condition</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Product Category</span>
                                    </label>
                                    <select className="select select-bordered"
                                        {...register("category")}
                                        defaultValue={'DEFAULT'}>
                                        <option disabled value="DEFAULT">Choose Category</option>
                                        {
                                            loaderData?.map((category) =>
                                                <option key={category._id} value={category.name}>{category.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Mobile No</span>
                                    </label>
                                    <input type="text" placeholder="mobile number" className="input input-bordered w-full max-w-md" required
                                        {...register("mobile")}
                                    />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Location</span>
                                    </label>
                                    <input type="text" placeholder="location" className="input input-bordered w-full max-w-md" required
                                        {...register("location")}
                                    />
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Year Of Purchase</span>
                                    </label>
                                    <select className="select select-bordered"
                                        {...register("purchaseYear")}
                                        defaultValue={'DEFAULT'}>
                                        <option disabled value="DEFAULT">Choose Purchase Year</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>
                                <div className="form-control w-full max-w-md">
                                    <label className="label">
                                        <span className="label-text">Product Image</span>
                                    </label>
                                    <input type="file" className="file-input file-input-bordered w-full max-w-md"
                                        {...register("image")} />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea className="textarea textarea-bordered h-24 w-full max-w-lg" placeholder="Product Description" {...register("productDetails")} required></textarea>
                            </div>

                            <div className='flex items-center justify-center'>
                                <button className='btn btn-primary rounded-full btn-wide mt-4'>Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
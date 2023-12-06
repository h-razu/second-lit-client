import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import bg from "../../assets/images/login-page-bg.jpeg"
import { authContext } from '../../Context/AuthContext/AuthProvider';
import useTitle from '../../Hooks/useTitle/useTitle';
import useToken from '../../Hooks/useToken/useToken';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';

const Register = () => {
    useTitle("Register");

    const imageHostKey = process.env.REACT_APP_imageBB_key;

    const { profileUpdate, signUpWithEmail } = useContext(authContext);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const [signUpUserEmail, setSignUpUserEmail] = useState('');
    const [token] = useToken(signUpUserEmail);
    console.log(token);


    const handleRegisterBtn = data => {
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
                    handleFirebaseRegister(data, imageData.data.url);
                }
                else {
                    toast.error("Can't Upload Image!!!")
                    setLoading(false);
                }
            });
    }

    //sign Up with firebase
    const handleFirebaseRegister = (data, imageURL) => {
        signUpWithEmail(data.email, data.password)
            .then(result => {
                // console.log(result.user);
                nameAndImageURLUpdate(data, imageURL);
            }).catch(err => {
                toast.error(err.message);
                setLoading(false);
            })
    }

    //update Image and name
    const nameAndImageURLUpdate = (data, image) => {
        const profileInfo = {
            displayName: data.name,
            photoURL: image
        };
        profileUpdate(profileInfo)
            .then(result => storeToDB(data, image))
            .catch(err => {
                toast.error(err.message)
                setLoading(false);
            })
    };

    //store to mongodb
    const storeToDB = (userData, image) => {
        const user = {
            name: userData.name,
            email: userData.email,
            accountType: userData.accountType,
            profileImg: image
        }

        fetch('https://second-lit-server.vercel.app/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setSignUpUserEmail(userData.email);
                }
            })
    };

    if (token) {
        toast.success("Registration Successful");
        setLoading(false);
        navigate("/");
    }

    return (
        <div className='relative'>
            {
                isLoading &&
                <div>
                    <LoadingSpinner></LoadingSpinner>
                </div>
            }
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0'>
                <div className=' md:col-span-2 flex flex-col gap-8 justify-center items-center'>
                    <h1 className='text-4xl text-primary font-bold'>Create An Account</h1>
                    <form onSubmit={handleSubmit(handleRegisterBtn)} className="w-96">
                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered w-full max-w-lg" {...register("name", { required: "name required" })} />
                            <label className="label">
                                {
                                    errors.email &&
                                    <span className="label-text-alt text-red-600">{errors.name.message}</span>
                                }
                            </label>
                        </div>
                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered w-full max-w-lg" {...register("email", { required: "email required" })} />
                            <label className="label">
                                {
                                    errors.email &&
                                    <span className="label-text-alt text-red-600">{errors.email.message}</span>
                                }
                            </label>
                        </div>
                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">Choose Account Type</span>
                            </label>
                            <select className="select select-bordered"
                                {...register("accountType")}
                            >
                                <option selected value="Buyer">Buyer</option>
                                <option value="Seller">Seller</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-lg">
                            <label className="label">
                                <span className="label-text">Profile Image</span>
                            </label>
                            <input type="file" className="file-input file-input-bordered w-full max-w-lg"
                                {...register("image", { required: "Image is required" })} />
                            <label className="label">
                                {
                                    errors.image &&
                                    <span className="label-text-alt text-red-600">{errors.image.message}</span>
                                }
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered w-full"
                                {...register("password", { required: "password required" })} />
                            <label className="label">
                                {
                                    errors.password &&
                                    <span className="label-text-alt text-red-600">{errors.password.message}</span>
                                }
                            </label>
                        </div>
                        <div className='flex items-center justify-center'>
                            <button className='btn btn-primary btn-wide mt-4'>Register</button>
                        </div>
                    </form>
                </div>
                <div className='relative '>
                    <div>
                        <img src={bg} alt="" className='w-full min-h-full object-cover' />
                    </div>
                    <div className='absolute flex flex-col justify-center items-center gap-8 top-1/3 w-full'>
                        <h1 className='text-3xl font-bold text-primary text-center'>Already Have an Account?</h1>
                        <Link to="/login">
                            <button className='btn btn-primary rounded-full btn-wide'>Log In</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
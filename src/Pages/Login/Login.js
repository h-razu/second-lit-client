import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bg from "../../assets/images/login-page-bg.jpeg"
import { authContext } from '../../Context/AuthContext/AuthProvider';
import useTitle from '../../Hooks/useTitle/useTitle';
import useToken from '../../Hooks/useToken/useToken';

const Login = () => {
    useTitle("Login")
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { googleSignIn, emailPassSignIn } = useContext(authContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [loggedUserEmail, setLoggedUserEmail] = useState("");
    const [token] = useToken(loggedUserEmail);
    if (token) {
        navigate(from, { replace: true })
    }

    const handleLoginSubmit = data => {
        // console.log(data);

        emailPassSignIn(data.email, data.password)
            .then(result => {
                setLoggedUserEmail(data.email);
                // console.log(loggedUserEmail);
            })
            .catch(e => toast.error(e.message))
    }

    const googleSignInHandler = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user);
                storeToDB(result.user);
            }).catch(error => toast.error(error.message));
    };

    const storeToDB = (loggedInUser) => {
        const user = {
            name: loggedInUser.displayName,
            email: loggedInUser.email,
            accountType: "Buyer",
            profileImg: loggedInUser.photoURL
        }

        fetch('https://second-lit-server.vercel.app/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setLoggedUserEmail(loggedInUser.email);
                }
            })
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0'>
            <div className=' md:col-span-2 flex flex-col gap-8 justify-center items-center'>
                <h1 className='text-4xl text-primary font-bold'>Login to Your Account</h1>
                <form onSubmit={handleSubmit(handleLoginSubmit)} className="w-96">
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
                        <button className='btn btn-primary btn-wide mt-4'>Log In</button>
                    </div>
                </form>
                <div className="flex flex-col w-4/5 border-opacity-50">
                    <div className="divider">OR</div>
                </div>
                <button className='btn btn-outline btn-wide' onClick={googleSignInHandler}>
                    Continue With Google
                </button>
            </div>
            <div className='relative '>
                <div>
                    <img src={bg} alt="" className='w-full min-h-full object-cover' />
                </div>
                <div className='absolute flex flex-col justify-center items-center gap-8 top-1/3'>
                    <h1 className='text-3xl font-bold text-primary'>New Here?</h1>
                    <p className='text-2xl text-center'>Sign up and discover a great amount of new opportunities!</p>
                    <Link to="/register">
                        <button className='btn btn-primary rounded-full btn-wide'>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
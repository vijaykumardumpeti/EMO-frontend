import React from 'react'
import { ArrowRight } from 'lucide-react'
import {Link, useNavigate} from 'react-router-dom'

import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './index.css'

const Login = ()=> {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onSuccess = (jwtToken)=>{
        //navigate to login page
        //cookies to perssit jwt token
        Cookies.set('username', jwtToken, {expires: 1})
        navigate('/home')
    }

    const onFailure = (msg)=>{
        setError(msg)
    }


    const submitLoginDetails = async (e)=>{
    try {
        // ... existing code ...
        e.preventDefault()
        if(username && password){
            //api to login
            const details = {
                username,
                password
            }

            const options = {
                method: 'POST',
                url: 'https://emo-energy.onrender.com/login',
                data: JSON.stringify(details),
                timeout: 5000, // Set a timeout value (in milliseconds) suitable for your application
                headers: {
                    'Content-Type': 'application/json',
                },
            };
    
        const response = await axios(options);
        const result = response.data;
        console.log(result);
    
        if (response.status === 200) {
            onSuccess(result.jwtToken);
        } else {
            onFailure(result.error || 'Login failed');
        }
    }else{
        setError('username or password fields are empty!')
    } 
}catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 400) {
                console.error('Invalid user:', error.response.data.error);
                onFailure('Invalid username or password. Please try again.');
            } else if (error.code === 'ECONNABORTED') {
                console.error('Request timed out. Please try again.');
                onFailure('Request timed out. Please try again.');
            } else {
                console.error('Error submitting login details:', error);
                onFailure('An error occurred while processing your request.');
            }
        } else {
            console.error('Non-Axios error:', error);
            onFailure('An unexpected error occurred.');
        }
    }
    


    }


    return (
        <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
                <p className="mt-2 text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link to="/" className="font-semibold text-black transition-all duration-200 hover:underline">
                    Create a free account
                </Link>
                </p>
                <form onSubmit={(e)=> submitLoginDetails(e)} className="mt-8">
                <div className="space-y-5">
                    <div>
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                        {' '}
                        User Name{' '}
                    </label>
                    <div className="mt-2">
                        <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="User Name"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        ></input>
                    </div>
                    </div>
                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="" className="text-base font-medium text-gray-900">
                        {' '}
                        Password{' '}
                        </label>
                        {/* <a
                        href="#"
                        title=""
                        className="text-sm font-semibold text-black hover:underline"
                        >
                        {' '}
                        Forgot password?{' '}
                        </a> */}
                    </div>
                    <div className="mt-2">
                        <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        ></input>
                    </div>
                    </div>
                    <div>
                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                        Get started <ArrowRight className="ml-2" size={16} />
                    </button>
                    </div>
                </div>
                <p className='error'>{error}</p>
                </form>
                {/* <div className="mt-3 space-y-3">
                <button
                    type="button"
                    className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                    <span className="mr-2 inline-block">
                    <svg
                        className="h-6 w-6 text-rose-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                    </span>
                    Sign in with Google
                </button>
                <button
                    type="button"
                    className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                    <span className="mr-2 inline-block">
                    <svg
                        className="h-6 w-6 text-[#2563EB]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                    </svg>
                    </span>
                    Sign in with Facebook
                </button>
                </div> */}
            </div>
            </div>
            <div className="h-full w-full">
            <img
                className="mx-auto h-full w-full rounded-md object-cover"
                src="https://res.cloudinary.com/dymmp1vtz/image/upload/v1702534398/Login-pana_yonvjo.png"
                alt=""
            />
            </div>
        </div>
        </section>
    )
    }



export default Login
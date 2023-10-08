import React, { useState } from 'react'
import { signUp } from '../services/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {UserRoles, picURL} from '../constants/User'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password, name, UserRoles['user'])
        } catch (err) {
            console.error(err)
        } finally {
            setEmail('')
            setName('')
            setPassword('')
        }
        navigate(from, {replace: true})
    }

    return (
        <form className='p-4 mt-[3rem] max-w-[30rem] mx-auto' onSubmit={handleFormSubmit}>
            <section>
                <h2 className='text-xl text-center'>Sign up to Super</h2>
                <div className='flex flex-col my-4'>
                    <label htmlFor='name' className='mb-2 cursor-pointer text-lg'>Name</label>
                    <input type='text' id='name' className='border rounded-md py-2 px-4 focus:outline-none' onChange={(e) => setName(e.target.value)} placeholder='Your name' />
                </div>
                <div className='flex flex-col my-4'>
                    <label htmlFor='email' className='mb-2 cursor-pointer text-lg'>Email</label>
                    <input type='email' id='email' className='border rounded-md py-2 px-4 focus:outline-none' onChange={(e) => setEmail(e.target.value)} placeholder='you@example.com' />
                </div>
                <div className='flex flex-col my-4'>
                    <label htmlFor='password' className='mb-2 cursor-pointer text-lg'>Password</label>
                    <input type='password' id='password' className='border rounded-md py-2 px-4 focus:outline-none' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </div>
            </section>
            <button className='bg-primary-200 text-white w-full py-2 rounded-md hover:opacity-90'>Sign Up</button>
            <hr className='my-6'></hr>
            <p>Already on Super? <Link to='/login' className='text-primary-100 hover:underline'>Log In</Link></p>
        </form>
    )
}

export default SignUp
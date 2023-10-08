import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signIn } from '../services/auth';
import toast from 'react-hot-toast';

const Login = () => {
    document.title = 'Super - Login'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password)
        } catch (err) {
            err = err.code.split('/')[1].split('-').join(' ')
            toast.error(err);
            return
        } finally {
            setEmail('')
            setPassword('')
        }
        toast.success('Login Successfull')
        navigate(from, { replace: true })
    }
    return (
        <form className='p-4 mt-[3rem] max-w-[30rem] mx-auto' onSubmit={handleFormSubmit}>
            <section>
                <h2 className='text-xl text-center'>Sign in to Super</h2>
                <div className='flex flex-col my-4'>
                    <label htmlFor='email' className='mb-2 cursor-pointer text-lg'>Email</label>
                    <input type='email' id='email' className='border rounded-md py-2 px-4 focus:outline-none' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='you@example.com' />
                </div>
                <div className='flex flex-col my-4'>
                    <label htmlFor='password' className='mb-2 cursor-pointer text-lg'>Password</label>
                    <input type='password' id='password' className='border rounded-md py-2 px-4 focus:outline-none' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' />
                </div>
            </section>
            <button className='bg-primary-200 text-white w-full py-2 rounded-md hover:opacity-90'>Log In</button>
            <hr className='my-6'></hr>
            <p>New to Super? <Link to='/signup' className='text-primary-100 hover:underline'>Sign Up</Link></p>
        </form>
    )
}

export default Login
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
    document.title = '404 - Page not found'
    return (
        <div className='grid place-content-center gap-4 min-h-screen'>
            <h1 className='text-2xl font-bold'>404 : Not found</h1>
            <button className='bg-primary-200 text-white px-8 py-2 w-fit rounded-md hover:bg-opacity-80' onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}

export default PageNotFound
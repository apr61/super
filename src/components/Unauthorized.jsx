import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
    const navigate = useNavigate()
    function handleClick(){
        navigate('/')
    }
    return (
        <div className='grid place-content-center min-h-[100vh]'>
            <h1 className='text-2xl'>You don't have access to this resource.</h1>
            <Button text={'Go home'} isDisabled={false} handleOnClick={handleClick} />
        </div>
    )
}

export default Unauthorized
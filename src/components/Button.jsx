import React from 'react'

const Button = ({isDisabled, text, handleOnClick}) => {
    return (
        <button type="button" disabled={isDisabled}
            className='bg-primary-200 text-white w-fit px-6 py-2 rounded-md hover:opacity-90 mt-6 disabled:bg-gray-300 disabled:hover:opacity-100'
            onClick={handleOnClick}>{text}</button>
    )
}

export default Button
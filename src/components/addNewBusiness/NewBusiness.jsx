import React from 'react'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness'
import { SET_BUSINESS_NAME } from '../../reducers/AddNewBusiness';
import Button from '../Button';

const NewBusiness = () => {
    document.title = 'Add business name'

    const { businessName, reducerHelper, next } = useAddNewBusinessContext();
    const handleOnChange = (text) => {
        reducerHelper(SET_BUSINESS_NAME, text)
    }

    return (
        <>
            <div className='flex flex-col gap-2 ml-auto'>
                <h1 className='text-2xl font-medium'>Get your business discovered</h1>
                <p className='text-gray-500'>Enter a few business details to get started</p>
                <div className='flex flex-col my-2'>
                    <label htmlFor='businessname' className='mb-2 cursor-pointer text-lg'>Business Name</label>
                    <input type='text' id='businessname' value={businessName}
                        onChange={(e) => handleOnChange(e.target.value)}
                        className='border rounded-md p-4 focus:outline-none' placeholder='Business Name' />
                </div>
            </div>
            <Button text={'Continue'} handleOnClick={next} isDisabled={businessName.length <= 0} />
        </>
    )
}

export default NewBusiness
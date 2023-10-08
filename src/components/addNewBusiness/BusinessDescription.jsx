import React from 'react'
import Button from '../Button'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness'
import { SET_BUSINESS_DESCRIPTION } from '../../reducers/AddNewBusiness'

const BusinessDescription = () => {
    const {businessDescription, reducerHelper, next} = useAddNewBusinessContext()
    const handleOnChange = (text) => {
        reducerHelper(SET_BUSINESS_DESCRIPTION, text)
    }
    const isDisabled = businessDescription.trim().length > 0
    return (
        <>
            <div className='flex flex-col gap-2 ml-auto'>
                <h1 className='text-2xl font-medium'>Add business description</h1>
                <p className='text-gray-500'>Let customers learn more about your business by adding a description to your Business.</p>
                <textarea name="business-desc" rows="8" value={businessDescription} onChange={(e) => handleOnChange(e.target.value)} className='border rounded-md resize-none focus:outline-none p-4 my-10'></textarea>
            </div>
            <Button text={'Next'} handleOnClick={next} isDisabled={!isDisabled}/>
        </>
    )
}

export default BusinessDescription
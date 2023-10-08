
import React from 'react'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness';
import Button from '../Button';

const BusinessLastStep = () => {
    const { createNewBusiness, businessName, isLoading } = useAddNewBusinessContext();
    return (
        <>
            <div className='flex flex-col gap-2 items-center justify-center min-h-[20rem]'>
                <h1 className='text-2xl font-medium'>Your <strong>{businessName}</strong> is one step away been discovered</h1>
                <p className='text-gray-500'>Press continue to proceed</p>
            </div>
            <Button text={'Continue'} handleOnClick={createNewBusiness} isDisabled={isLoading} />
        </>
    )
}

export default BusinessLastStep
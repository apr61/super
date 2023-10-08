import React from 'react'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness'
import { SET_BUSINESS_TYPE } from '../../reducers/AddNewBusiness'
import Button from '../Button'

const BusinessType = () => {
    const { businessName, reducerHelper, businessType, next } = useAddNewBusinessContext()
    const handleOnChange = (e) => {
        const text = e.target.value
        let tempBusinessType;
        if (businessType.indexOf(text) === -1) {
            tempBusinessType = [text, ...businessType]
        } else {
            tempBusinessType = businessType.filter(type => type !== text)
        }
        reducerHelper(SET_BUSINESS_TYPE, tempBusinessType)
    }
    return (
        <>
            <div className='flex flex-col gap-2 ml-auto'>
                <h1 className='text-2xl font-medium'>Choose your business type</h1>
                <p className='text-gray-500'>Select all that apply to <strong>{businessName}</strong></p>
                <div tabIndex='0' className='flex my-2 items-center px-6 py-4 border rounded-md hover:bg-primary-500 ease-in duration-150 cursor-pointer'>
                    <label htmlFor='businesstype-o' className='cursor-pointer text-lg flex flex-col w-full'>
                        <h3>Online Retail</h3>
                        <p className='text-sm text-gray-500'>Customers can purchase products through your website</p>
                    </label>
                    <input type='checkbox' id='businesstype-o' name='businesstype' value='Online Retail' checked={businessType.indexOf('Online Retail') !== -1}
                        onChange={handleOnChange} className='border rounded-md p-4 focus:outline-none cursor-pointer w-4 h-4 ml-auto hover:bg-primary-500' />
                </div>
                <div tabIndex='1' className='flex my-2 items-center px-6 py-4 border rounded-md hover:bg-primary-500 ease-in duration-150 cursor-pointer'>
                    <label htmlFor='businesstype-l' className='cursor-pointer text-lg flex flex-col w-full'>
                        <h3>Local Store</h3>
                        <p className='text-sm text-gray-500'>Customers can visit your business in person</p>
                    </label>
                    <input type='checkbox' id='businesstype-l' name='businesstype' value='Local Store' checked={businessType.indexOf('Local Store') !== -1}
                        onChange={handleOnChange} className='border rounded-md p-4 focus:outline-none cursor-pointer w-4 h-4 ml-auto hover:bg-primary-500' />
                </div>
                <div tabIndex='2' className='flex my-2 items-center px-6 py-4 border rounded-md hover:bg-primary-500 ease-in duration-150 cursor-pointer'>
                    <label htmlFor='businesstype-s' className='cursor-pointer text-lg flex flex-col w-full'>
                        <h3>Service Business</h3>
                        <p className='text-sm text-gray-500'>Your business makes visits to customers</p>
                    </label>
                    <input type='checkbox' id='businesstype-s' name='businesstype' value='Service Business' checked={businessType.indexOf('Service Business') !== -1}
                        onChange={handleOnChange} className='border rounded-md p-4 focus:outline-none cursor-pointer w-4 h-4 ml-auto hover:bg-primary-500' />
                </div>
            </div>
            <Button text={'Next'} handleOnClick={next} isDisabled={businessName.length <= 0} />
        </>
    )
}

export default BusinessType
import React from 'react'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness'
import Button from '../Button'
import { SET_BUSINESS_CONTACT } from '../../reducers/AddNewBusiness';

const IndianPhoneNumberRegex = /^(0|\+91)?[6789]\d{9}$/;

const BusinessContactDetails = () => {
    const { businessContact, reducerHelper, next } = useAddNewBusinessContext()
    const handleOnChange = (value, name) => {
        if (name === 'phoneNumber') {
            reducerHelper(SET_BUSINESS_CONTACT, { ...businessContact, phoneNumber: value })
        }
        if (name === 'website-url') {
            reducerHelper(SET_BUSINESS_CONTACT, { ...businessContact, website: value })
        }
    }
    const isDisabled = IndianPhoneNumberRegex.test(+businessContact.phoneNumber)
    return (
        <>
            <div className='flex flex-col gap-2 ml-auto'>
                <h1 className='text-2xl font-medium'>What contact details do ypu what to show to your customers?</h1>
                <p className='text-gray-500'>Help Customers get in touch by including this info on your listing</p>
                <div className='flex flex-col my-2'>
                    <label htmlFor='business-phone' className='mb-2 cursor-pointer text-lg'>Phone number</label>
                    <input type='text' id='business-phone' name='phoneNumber' value={businessContact.phoneNumber}
                        onChange={(e) => handleOnChange(e.target.value, e.target.name)}
                        className='border rounded-md p-4 focus:outline-none' placeholder='Phone number' />
                </div>
                <div className='flex flex-col my-2'>
                    <label htmlFor='business-website' className='mb-2 cursor-pointer text-lg'>Website</label>
                    <input type='url' id='business-website' name='website-url' value={businessContact.website}
                        onChange={(e) => handleOnChange(e.target.value, e.target.name)} pattern="https://.*"
                        className='border rounded-md p-4 focus:outline-none' placeholder='website (optional)' />
                </div>
            </div>
            <Button text={'Next'} handleOnClick={next} isDisabled={!isDisabled} />
        </>
    )
}

export default BusinessContactDetails
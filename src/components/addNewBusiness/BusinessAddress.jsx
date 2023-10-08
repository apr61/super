import React from 'react'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness'
import Button from '../Button'
import { SET_BUSINESS_ADDRESS } from '../../reducers/AddNewBusiness'

const IndianStates = [
    { "id": 1, "name": "Andhra Pradesh" },
    { "id": 2, "name": "Arunachal Pradesh" },
    { "id": 3, "name": "Assam" },
    { "id": 4, "name": "Bihar" },
    { "id": 5, "name": "Chhattisgarh" },
    { "id": 6, "name": "Goa" },
    { "id": 7, "name": "Gujarat" },
    { "id": 8, "name": "Haryana" },
    { "id": 9, "name": "Himachal Pradesh" },
    { "id": 10, "name": "Jharkhand" },
    { "id": 11, "name": "Karnataka" },
    { "id": 12, "name": "Kerala" },
    { "id": 13, "name": "Madhya Pradesh" },
    { "id": 14, "name": "Maharashtra" },
    { "id": 15, "name": "Manipur" },
    { "id": 16, "name": "Meghalaya" },
    { "id": 17, "name": "Mizoram" },
    { "id": 18, "name": "Nagaland" },
    { "id": 19, "name": "Odisha" },
    { "id": 20, "name": "Punjab" },
    { "id": 21, "name": "Rajasthan" },
    { "id": 22, "name": "Sikkim" },
    { "id": 23, "name": "Tamil Nadu" },
    { "id": 24, "name": "Telangana" },
    { "id": 25, "name": "Tripura" },
    { "id": 26, "name": "Uttar Pradesh" },
    { "id": 27, "name": "Uttarakhand" },
    { "id": 28, "name": "West Bengal" },
    { "id": 29, "name": "Jammu and Kashmir" },
    { "id": 30, "name": "Ladakh" },
    { "id": 31, "name": "Delhi" },
    { "id": 32, "name": "Puducherry" },
    { "id": 33, "name": "Chandigarh" },
    { "id": 34, "name": "Lakshadweep" },
    { "id": 35, "name": "Dadra and Nagar Haveli and Daman and Diu" },
    { "id": 36, "name": "Andaman and Nicobar Islands" }
]

const BusinessAddress = () => {
    document.title = 'Add business address'
    const { reducerHelper, businessAddress, next } = useAddNewBusinessContext()
    const handleOnChange = (value, name) => {
        if (name === 'country') {
            reducerHelper(SET_BUSINESS_ADDRESS, { ...businessAddress, country: value })
        } else if (name === 'street') {
            reducerHelper(SET_BUSINESS_ADDRESS, { ...businessAddress, street: value })
        } else if (name === 'city') {
            reducerHelper(SET_BUSINESS_ADDRESS, { ...businessAddress, city: value })
        } else if (name === 'pincode') {
            reducerHelper(SET_BUSINESS_ADDRESS, { ...businessAddress, pincode: +value })
        } else if (name === 'state') {
            reducerHelper(SET_BUSINESS_ADDRESS, { ...businessAddress, state: value })
        }
    }
    const isDisabled = (businessAddress.country.trim().length > 0) && (businessAddress.street.trim().length > 0) &&
        (businessAddress.city.trim().length > 0) && (businessAddress.pincode > 0) && (businessAddress.state.trim().length > 0)
    return (
        <>
            <div className='flex flex-col gap-2 ml-auto'>
                <h1 className='text-2xl font-medium'>Enter your business address</h1>
                <p className='text-gray-500'>Add a location where customers can visit your business in person</p>
                <div className='flex flex-col my-2'>
                    <label htmlFor='business-address-country' className='mb-2 cursor-pointer text-lg'>Country/Region</label>
                    <input type='text' id='business-address-country' name='country' value={businessAddress.country}
                        onChange={(e) => handleOnChange(e.target.value, e.target.name)}
                        className='border rounded-md p-4 focus:outline-none' placeholder='Country/Region' />
                </div>
                <div className='flex flex-col my-2'>
                    <label htmlFor='business-address-street' className='mb-2 cursor-pointer text-lg'>Street address</label>
                    <input type='text' id='business-address-street' name='street' value={businessAddress.street}
                        onChange={(e) => handleOnChange(e.target.value, e.target.name)}
                        className='border rounded-md p-4 focus:outline-none' placeholder='Street address' />
                </div>
                <div className='flex flex-col my-2'>
                    <label htmlFor='business-address-city' className='mb-2 cursor-pointer text-lg'>City</label>
                    <input type='text' id='business-address-city' name='city' value={businessAddress.city}
                        onChange={(e) => handleOnChange(e.target.value, e.target.name)}
                        className='border rounded-md p-4 focus:outline-none' placeholder='City' />
                </div>
                <div className='flex flex-col my-2'>
                    <label htmlFor='business-address-pincode' className='mb-2 cursor-pointer text-lg'>Pincode</label>
                    <input type='number' id='business-address-pincode' name='pincode' value={businessAddress.pincode}
                        onChange={(e) => handleOnChange(e.target.value, e.target.name)}
                        className='border rounded-md p-4 focus:outline-none' placeholder='Pincode' />
                </div>
                <div className='flex flex-col my-2'>
                    <label htmlFor='business-address-state' className='mb-2 cursor-pointer text-lg'>State</label>
                    <select id='business-address-state' name='state' onChange={(e) => handleOnChange(e.target.value, e.target.name)}
                        className='border rounded-md p-4 focus:outline-none'>
                            <option value="">Select State</option>
                        {
                            IndianStates.map((state) => (
                                <option key={state.id} value={state.name}>{state.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <Button text={'Next'} handleOnClick={next} isDisabled={!isDisabled} />
        </>
    )
}

export default BusinessAddress
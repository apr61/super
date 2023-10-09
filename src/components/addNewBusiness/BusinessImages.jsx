import React from 'react'
import Button from '../Button'
import { SET_IMAGES } from '../../reducers/AddNewBusiness'
import { useAddNewBusinessContext } from '../../context/AddNewBusiness'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const BusinessImages = () => {
    document.title = 'Add business images'
    const { reducerHelper, next, businessImages} = useAddNewBusinessContext()
    const handleOnChange = (images) => {
        reducerHelper(SET_IMAGES, [...businessImages, ...images])
    }
    const isDisabled = businessImages?.length >= 5
    return (
        <>
            <div className='flex flex-col gap-2 ml-auto'>
                <h1 className='text-2xl font-medium'>Add photos of your store</h1>
                <p className='text-gray-500'>Show off your products and let customers peek inside your business </p>
                <label htmlFor="imageUpload"
                    className={`cursor-pointer border focus:outline-none my-10 flex gap-2 items-center justify-center hover:bg-primary-500 
                    ${!isDisabled ? 'p-4 w-[15rem] h-[10rem] rounded-md' : 'p-2 w-[10rem] h-[3rem] rounded-full'}`}>
                    <AddPhotoAlternateIcon /> {!isDisabled ? 'Select photos' : 'Add photos'}</label>
                <input type='file' accept='image/*' multiple id='imageUpload'
                    onChange={(e) => handleOnChange(e.target.files)}
                    className='hidden' />
            </div>
            {businessImages && (
                <ul className={`flex flex-wrap gap-2`}>
                    {
                        businessImages.map((image, ind) => (
                            <li key={image.name + ind}>
                                <img src={URL.createObjectURL(image)} alt={image.name} className='object-fit' />
                            </li>
                        ))
                    }
                </ul>
            )}
            <p className='text-sm text-gray-400'>Note : Add a minimum of 5 images</p>
            <Button text={'Next'} handleOnClick={next} isDisabled={!isDisabled} />
        </>
    )
}

export default BusinessImages
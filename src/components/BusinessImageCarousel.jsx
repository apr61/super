import React, { useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BusinessImageCarousel = ({ businessImages, bussinessName }) => {
    const [imageIndex, setImageIndex] = useState(0)
    function handlePrev() {
        if(imageIndex > 0){
            setImageIndex(prev => prev - 1)
        }
    }
    function handleNext() {
        if(imageIndex < businessImages.length - 1){
            setImageIndex(prev => prev + 1)
        }
    }
    return (
        <div className='w-[10rem] h-[10rem] rounded-md overflow-hidden relative'>
            <img src={businessImages[imageIndex]} alt={bussinessName} loading='lazy' className='object-cover brightness-80' />
            <button disabled={imageIndex === 0} onClick={handlePrev}
            className='grid place-content-center absolute left-1 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-90 transition-opacity disabled:bg-opacity-10'>
                <ChevronLeftIcon />
            </button>
            <button disabled={imageIndex === businessImages.length - 1} onClick={handleNext}
                className='grid place-content-center absolute right-1 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-90 transition-opacity disabled:bg-opacity-10'>
                <ChevronRightIcon />
            </button>
        </div>
    )
}

export default BusinessImageCarousel
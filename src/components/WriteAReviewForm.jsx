import React, { useState } from 'react'
import StarRating from './StarRating'
import { useAuthContext } from '../context/AuthContext'
import { createANewReview } from '../services/review'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { createRouterPath } from '../utils/routerUtils'
import { serverTimestamp } from 'firebase/firestore'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { uploadPhotosService } from '../services/business'
import toast from 'react-hot-toast'

const WriteAReviewForm = ({ businessName, businessId, starRating, businessAddress }) => {
  const [currentStarRating, setCurrentStarRating] = useState(starRating || 0)
  const [reviewData, setReviewData] = useState('')
  const [reviewImages, setReviewImages] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useAuthContext()
  const navigate = useNavigate()

  const handleStarRatingOnClick = (currentStar) => {
    setCurrentStarRating(currentStar)
  }
  function handleTextAreaHeight(e) {
    (e.target.style.height = "inherit"),
      (e.target.style.height = `${e.target.scrollHeight}px`);
  }
  const handleTextAreaOnChange = (e) => {
    if (error) {
      setError('');
    }
    setReviewData(e.target.value)
  }
  const handleOnChange = (images) => {
    setReviewImages([...reviewImages, ...images])
  }
  const handleReviewFormSubmit = async () => {
    if (reviewData.length < 60) {
      setError('Your review needs at least 60 characters. Add a few more thoughts to post review.')
      return
    }
    const reviewDataServer = {
      uid: currentUser.uid,
      name: currentUser.displayName,
      reviewData: reviewData,
      businessId: businessId,
      rating: currentStarRating,
      businessName: businessName,
      url: `/business/${createRouterPath(businessName.toLowerCase() + ' ' + businessAddress.city.toLowerCase() + ' ' + businessId)}`,
      date: serverTimestamp()
    }
   
    try {
      setIsLoading(true)
      const imageUrls = await uploadPhotosService(businessName, reviewImages)
      await createANewReview({...reviewDataServer, reviewImages: imageUrls})
    } catch (err) {
      toast.error(err.code)
    } finally {
      setIsLoading(false)
      toast.success('Review added successfull')
    }
    navigate(`/business/${createRouterPath(businessName.toLowerCase() + ' ' + businessAddress.city.toLowerCase() + ' ' + businessId)}`)
  }
  const isDisabled = reviewImages?.length > 0
  return (
    <form className='max-w-[40rem]'>
      <section>
        <h2 className='text-3xl font-bold'>{businessName}</h2>
        <div className='border px-6 py-4 mt-8 rounded-md focus-within:outline focus-within:outline-1 focus-within:outline-black shadow-sm'>
          <StarRating
            currentStarProp={currentStarRating}
            businessId={businessId}
            handleOnClick={handleStarRatingOnClick} />
          <textarea className='resize-none my-4 w-full focus:outline-none'
            rows={10} onKeyDown={handleTextAreaHeight} autoFocus={true} onChange={handleTextAreaOnChange}>
          </textarea>
        </div>
      </section>
      <div className='flex flex-col gap-2 my-2'>
        <label htmlFor="imageUpload"
          className={`cursor-pointer border focus:outline-none flex gap-2 items-center justify-center hover:bg-primary-500 
                   p-2 w-[10rem] h-[3rem] rounded-full`}>
          <AddPhotoAlternateIcon /> {!isDisabled ? 'Select photos' : 'Add photos'}</label>
        <input type='file' accept='image/*' multiple id='imageUpload'
          onChange={(e) => handleOnChange(e.target.files)}
          className='hidden' />
      </div>
      {reviewImages && (
        <ul className={`flex flex-wrap gap-2`}>
          {
            reviewImages.map((image, ind) => (
              <li key={image.name + ind} className='w-40'>
                <img src={URL.createObjectURL(image)} alt={image.name} className='object-fit' />
              </li>
            ))
          }
        </ul>
      )}
      {
        error && (
          <p className='text-red-500 text-sm px-2 mt-4'>{error}</p>
        )
      }
      <Button text={'Post review'} isDisabled={isLoading} handleOnClick={handleReviewFormSubmit} />
    </form>
  )
}

export default WriteAReviewForm
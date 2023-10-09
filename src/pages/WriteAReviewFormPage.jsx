import React, { useEffect, useState } from 'react'
import WriteAReviewForm from '../components/WriteAReviewForm'
import { useParams, useSearchParams } from 'react-router-dom'
import { getBusinessByIdService } from '../services/business'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'

const WriteAReviewFormPage = () => {
  const { businessId } = useParams();
  const [searchParams, _] = useSearchParams({ rating: 0 })
  const rating = searchParams.get("rating") || 0
  const [business, setBusiness] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const getBusinessById = async (businessId) => {
    try {
      const data = await getBusinessByIdService(businessId);
      setBusiness({ ...data });
    } catch (err) {
      err = err.code.split('/')[1].split('-').join(' ')
      toast.error(err);
      return
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBusinessById(businessId);
  }, [businessId, rating]);
  document.title = `Write a Review for ${business.businessName}`
  if (isLoading) return <Loader />
  return (
    <div className='max-w-[60rem] mx-auto my-10'>
      <WriteAReviewForm {...business} starRating={+rating} />
    </div>
  )
}

export default WriteAReviewFormPage
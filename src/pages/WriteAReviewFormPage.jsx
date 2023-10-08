import React, { useEffect, useState } from 'react'
import WriteAReviewForm from '../components/WriteAReviewForm'
import { useParams } from 'react-router-dom'
import { getBusinessByIdService } from '../services/business'

const WriteAReviewFormPage = () => {
  const { businessId, rating } = useParams();
  const [business, setBusiness] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const getBusinessById = async (businessId) => {
    try {
      const data = await getBusinessByIdService(businessId);
      setBusiness({ ...data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBusinessById(businessId);
  }, [businessId, rating]);
  console.log(business)
  document.title = `Write a Review for ${business.businessName}`
  // if(isLoading) return <h1>Loading....</h1>
  return (
    <div className='max-w-[60rem] mx-auto my-10'>
      <WriteAReviewForm {...business} starRating={+rating}/>
    </div>
  )
}

export default WriteAReviewFormPage
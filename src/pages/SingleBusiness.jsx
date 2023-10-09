import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getBusinessByIdService } from '../services/business';
import { days } from '../utils/timeUtils'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import WifiIcon from '@mui/icons-material/Wifi';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getBusinessIdFromRoutePath } from '../utils/routerUtils';
import { getAllReviewsByBusinessIdService } from '../services/review';
import { dateFormatterDDMM } from '../utils/timeUtils'
import ReviewStar from '../components/ReviewStar';
import { reviewStarData } from '../components/StarRating';
import { useBusinesses } from '../context/Businesses';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuthContext } from '../context/AuthContext';

export const imageStyles = ['col-span-2 row-span-2', 'col-start-3', 'col-start-4', 'col-start-3 row-start-2', 'col-start-4 row-start-2']

const SingleBusiness = () => {
  const location = useLocation();
  const {currentUser} = useAuthContext()
  const businessId = getBusinessIdFromRoutePath(location.pathname)
  const [isLoading, setIsLoading] = useState(true);
  const [business, setBusiness] = useState({});
  const [reviews, setReviews] = useState([]);
  const { today, renderStatus, isOpenDay, isOpenNowToday, businessHoursForDay } = useBusinesses()
  const navigate = useNavigate()
  const getBusinessById = async (businessId) => {
    try {
      const data = await getBusinessByIdService(businessId);
      setBusiness({ ...data });
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getAllReviewsByBusinessId = async (businessId) => {
    try {
      setIsLoading(true)
      const data = await getAllReviewsByBusinessIdService(businessId);
      setReviews([...data])
    } catch (err) {
      toast.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBusinessById(businessId)
    getAllReviewsByBusinessId(businessId)
  }, [businessId])


  document.title = isLoading ? "Loading..." : business.businessName

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, curr) => {
    acc += curr.rating
    return acc
  }, 0) / reviews.length : 0

  const reviewCount = reviews.reduce((acc, curr) => {
    acc[curr.rating - 1]++;
    return acc
  }, new Array(5).fill(0))

  const reviewStarBars = reviewCount.reverse().map((count, index) => (
    <div key={index} className='grid grid-cols-[100px_1fr] items-center mb-2'>
      <p>{5 - index} {5 - index === 1 ? 'Star' : 'Stars'}</p>
      <div className='h-2 rounded-md w-full bg-gray-300'>
        <div
          className={`${count !== 0 && reviewStarData[5 - index].reviewStyles} h-2 rounded-md`}
          style={{ width: `${(count / reviews.length) * 100}%` }}
        ></div>
      </div>
    </div>
  ));

  const handleWriteReview = () => {
    navigate(`/writeareview/${businessId}`)
  }

  if (isLoading) return <Loader />

  return (
    <div className='max-w-[70rem] mx-auto my-10'>
      <h1 className='text-[3rem]'>{business.businessName}</h1>
      <div className='flex gap-2 items-center font-medium'>
        <ReviewStar reviewRating={Math.floor(averageRating)} starSize='1.75rem' />
        <p className='text-gray-600'>{averageRating}</p>
        <a href='#ratings' className='text-gray-600 hover:underline'>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</a>
      </div>
      <div className='flex gap-2 items-center'>
        {
          renderStatus(today, business.businessWorkingHours)
        }
        <a href='#working-hours' className='bg-gray-400 px-2 py-1 text-white rounded-md text-sm hover:bg-gray-500 ease-linear duration-200'>See hours</a>
      </div>
      <div className='grid grid-cols-4 grid-rows-2 rounded-xl overflow-hidden gap-1 max-h-[30rem] my-6'>
        {
          business.businessImages.map((img, i) => (
            <img key={img} className={`object-cover ${imageStyles[i]}`} src={img} alt={business.businessName + i + 1} loading='lazy' />
          ))
        }
      </div>
      <section className='border-b pt-6 pb-2'>
        <h2 className='text-xl font-bold'>About Business</h2>
        <p className='my-4'>{business.businessDescription}</p>
      </section>
      <section className='border-b pt-6 pb-2'>
        <h2 className='text-xl font-bold'>Location & Contact details</h2>
        <div className='my-4 flex flex-col gap-4'>
          <p className='flex gap-4 text-md font-medium'><LocalPhoneOutlinedIcon /> {business.businessContact.phoneNumber}</p>
          <Link to={business.businessContact.website} target='_blank' className='flex gap-4 text-md font-medium'><LaunchOutlinedIcon /> {business.businessContact.website}</Link>
          <div className='flex gap-4'>
            <LocationOnOutlinedIcon />
            <p>{business.businessAddress.street + ', ' + business.businessAddress.city + ', ' + business.businessAddress.state + ', ' + business.businessAddress.pincode}</p>
          </div>
        </div>
      </section>
      <section className='border-b pt-6 pb-2' id='working-hours'>
        <h2 className='text-xl font-bold'>Working Hours</h2>
        <table className='my-4'>
          <tbody className='text-start'>
            {
              days.map((day) => (
                <tr key={day} className='flex gap-4'>
                  <td className='capitalize w-12'>{day.slice(0, 3)}</td>
                  <td>
                    {
                      isOpenDay(day, business.businessWorkingHours) ?
                        <p>{businessHoursForDay(day, business.businessWorkingHours)}</p> :
                        <p className={today === day ? 'text-red-500' : ''}>Closed</p>
                    }
                  </td>
                  <td>
                    {
                      today === day ? isOpenNowToday(today, business.businessWorkingHours) : null
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
      <section className='border-b pt-6 pb-2'>
        <h2 className='text-xl font-bold'>Amenities and More</h2>
        <div className='my-4 grid grid-cols-2 gap-4'>
          <p className='flex gap-4'><DeliveryDiningIcon /> Offers Delivery</p>
          <p className='flex gap-4'><TakeoutDiningIcon /> Offers Takeout</p>
          <p className='flex gap-4'><WifiIcon /> Wifi access</p>
          <p className='flex gap-4'><VolumeUpOutlinedIcon /> Pleasant Music</p>
          <p className='flex gap-4'><TvOutlinedIcon /> TV</p>
        </div>
      </section>
      <section className='border-b pt-6 pb-2' id='ratings'>
        <div className='flex max-w-[40rem] justify-between'>
          <h2 className='text-xl font-bold'>Reviews</h2>
          {
            business.uid !== currentUser.uid && (
              <button className='border px-4 py-2 rounded-md bg-primary-300 hover:bg-opacity-80' onClick={handleWriteReview}>Write a reviews</button>
            )
          }
        </div>
        <div className='my-8 flex gap-12 items-center'>
          <div>
            <h3 className='text-gray-800 font-medium'>Overall rating</h3>
            <ReviewStar reviewRating={Math.floor(averageRating)} starSize='1.5rem' />
            <p className='text-gray-600'>{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
          </div>
          <div className='max-w-[30rem] w-full'>
            {
              reviewStarBars
            }
          </div>
        </div>
        {
          reviews?.map(({ reviewId, name, reviewData, rating, date, reviewImages }) => (
            <article key={reviewId} className='my-4'>
              <div className='flex gap-2'>
                <img className='w-8 h-8 rounded-full' src='https://firebasestorage.googleapis.com/v0/b/super-631f5.appspot.com/o/anonymous_user_pic.jpg?alt=media&token=08f6708c-0dc9-4d47-ada9-885507dde124' alt={name} />
                <p className='font-medium capitalize'>{name}</p>
              </div>
              {
                reviewImages.length > 0 && (
                  <div className='flex flex-wrap gap-2 my-4'>
                    {
                      reviewImages.map(image => (
                        <div key={image} className='w-40 rounded-md overflow-hidden'>
                          <img src={image} className='object-cover' />
                        </div>
                      ))
                    }
                  </div>
                )
              }
              <div className='flex gap-2 items-center'>
                <ReviewStar reviewRating={rating} />
                <p className='text-gray-500 text-sm'>{dateFormatterDDMM(date.seconds)}</p>
              </div>
              <p className='py-4 text-gray-500'>
                {reviewData}
              </p>
            </article>
          ))
        }
      </section>
    </div>
  )
}

export default SingleBusiness
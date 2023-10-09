import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { getAllBusinessesByUidService } from '../services/business'
import { Link } from 'react-router-dom'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import WifiIcon from '@mui/icons-material/Wifi';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import { imageStyles } from './SingleBusiness'
import ReviewStar from '../components/ReviewStar'
import { useBusinesses } from '../context/Businesses'
import { dateFormatterDDMM, days } from '../utils/timeUtils'
import { getAllReviewsByBusinessIdService } from '../services/review';

const MyBusinesses = () => {
  document.title = 'My businesses'

  const { currentUser } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  const [userBusinesses, setUserBusinesses] = useState({})
  const [reviews, setReviews] = useState([])
  const { today, renderStatus, isOpenDay, isOpenNowToday, businessHoursForDay } = useBusinesses()

  const getUserBusinesses = async (uid) => {
    try {
      const data = await getAllBusinessesByUidService(uid)
      setUserBusinesses(data[0])
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  const getAllReviewsByBusinessId = async (businessId) => {
    try {
      setIsLoading(true)
      const data = await getAllReviewsByBusinessIdService(businessId);
      setReviews([...data])
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getUserBusinesses(currentUser.uid)
  }, [currentUser.uid])

  useEffect(() => {
    if (isLoading) return
    getAllReviewsByBusinessId(userBusinesses.businessId)
  }, [userBusinesses.businessId])

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

  if (isLoading) return <Loader />

  return (
    <div className='max-w-[70rem] mx-auto my-8'>
      {
        Object.keys(userBusinesses).length === 0 ? (
          <div className='grid place-content-center min-h-[30rem]'>
            <h2 className='text-xl font-semibold'>You don't have any businesses</h2>
            <p>Click <Link to='/business/new' className='text-primary-200 hover:underline'>here</Link> to create one!!!</p>
          </div>
        ) : (
          <>
            <div className='flex justify-between items-center'>
              <h1 className='text-[3rem]'>{userBusinesses.businessName}</h1>
              {
                !userBusinesses.isVerified && (
                  <button className='bg-primary-300 hover:bg-opacity-80 px-4 py-2 rounded-md text-white'>Verify business</button>
                )
              }
            </div>
            <div className='flex gap-2 items-center font-medium'>
              <ReviewStar reviewRating={Math.floor(averageRating)} starSize='1.75rem' />
              <p className='text-gray-600'>{averageRating}</p>
              <a href='#ratings' className='text-gray-600 hover:underline'>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</a>
            </div>
            <div className='flex gap-2 items-center'>
              {
                renderStatus(today, userBusinesses.businessWorkingHours)
              }
              <a href='#working-hours' className='bg-gray-400 px-2 py-1 text-white rounded-md text-sm hover:bg-gray-500 ease-linear duration-200'>See hours</a>
            </div>
            <div className='grid grid-cols-4 grid-rows-2 rounded-xl overflow-hidden gap-1 max-h-[30rem] my-6'>
              {
                userBusinesses.businessImages.map((img, i) => (
                  <img key={img} className={`object-cover ${imageStyles[i]}`} src={img} alt={userBusinesses.businessName + i + 1} loading='lazy' />
                ))
              }
            </div>
            <section className='border-b pt-6 pb-2'>
              <h2 className='text-xl font-bold'>About Business</h2>
              <p className='my-4'>{userBusinesses.businessDescription}</p>
            </section>
            <section className='border-b pt-6 pb-2'>
              <h2 className='text-xl font-bold'>Location & Contact details</h2>
              <div className='my-4 flex flex-col gap-4'>
                <p className='flex gap-4 text-md font-medium'><LocalPhoneOutlinedIcon /> {userBusinesses.businessContact.phoneNumber}</p>
                <Link to={userBusinesses.businessContact.website} target='_blank' className='flex gap-4 text-md font-medium'><LaunchOutlinedIcon /> {userBusinesses.businessContact.website}</Link>
                <div className='flex gap-4'>
                  <LocationOnOutlinedIcon />
                  <p>{userBusinesses.businessAddress.street + ', ' + userBusinesses.businessAddress.city + ', ' + userBusinesses.businessAddress.state + ', ' + userBusinesses.businessAddress.pincode}</p>
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
                            isOpenDay(day, userBusinesses.businessWorkingHours) ?
                              <p>{businessHoursForDay(day, userBusinesses.businessWorkingHours)}</p> :
                              <p className={today === day ? 'text-red-500' : ''}>Closed</p>
                          }
                        </td>
                        <td>
                          {
                            today === day ? isOpenNowToday(today, userBusinesses.businessWorkingHours) : null
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
          </>
        )
      }

    </div>
  )
}

export default MyBusinesses
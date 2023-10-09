import React, { useEffect, useState } from 'react'
import Search from '../components/Search';
import Loader from '../components/Loader';
import { CategoriesDropDown } from '../constants/Categories';
import DropdownHover from '../components/DropdownHover';
import { useBusinesses } from '../context/Businesses';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { getAllReviewsService } from '../services/review';
import ReviewStar from '../components/ReviewStar';
import { dateFormatterDDMM } from '../utils/timeUtils';
import toast from 'react-hot-toast';

const dropDownlistStyles = 'group-hover:grid group-hover:grid-cols-2 group-hover:grid-row-3';
const dropDownButtonStyles = 'mb-2 text-gray-500 border hover:text-black hover:bg-primary-500'

export const Home = () => {
  document.title = "Super"
  const { prevSearchParams } = useBusinesses()
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()
  function handleOnclick(subcategory) {
    navigate({
      pathname: "/search",
      search: createSearchParams({ ...prevSearchParams, find_desc: subcategory }).toString(),
    })
  }
  const getAllReviews = async () => {
    try {
      const reviews = await getAllReviewsService()
      setReviews(reviews)
    } catch (error) {
      err = err.code.split('/')[1].split('-').join(' ')
      toast.error(err);
      return
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getAllReviews()
  }, [])
  return (
    <>
      <div className='max-w-[60rem] mx-auto'>
        <div className='w-full min-h-[15rem] mt-12 mb-12 flex flex-col justify-center'>
          <Search />
          <div className='mt-6 flex flex-wrap gap-2'>
            {
              CategoriesDropDown.map((category) => (
                <DropdownHover key={category.id}
                  dropdownName={category.categoryName}
                  dropDownButtonStyles={dropDownButtonStyles}
                  dropDownlistStyles={dropDownlistStyles}
                  Icon={category.Icon}
                >
                  {
                    category.subcategories.map(category => (
                      <li key={category.id}>
                        <button className='p-2 rounded-md text-gray-500 hover:bg-primary-500 hover:text-black flex items-center gap-2 w-full' onClick={() => handleOnclick(category.DropdownLabel)}>
                          {category.DropdownLabel}
                        </button>
                      </li>
                    ))
                  }
                </DropdownHover>
              ))
            }
          </div>
        </div>
        <section>
          <h2 className='text-2xl font-semibold text-center my-4'>Recent activity</h2>
          {
            isLoading ? <Loader /> : (
              <div className='grid grid-cols-2 gap-2'>
                {
                  reviews?.map(({ id: reviewId, name, reviewData, rating, date, businessName, url, reviewImages }) => (
                    <article key={reviewId} className='border p-4 rounded-md'>
                      <div className='flex gap-2'>
                        <img className='w-8 h-8 rounded-full' src='https://firebasestorage.googleapis.com/v0/b/super-631f5.appspot.com/o/anonymous_user_pic.jpg?alt=media&token=08f6708c-0dc9-4d47-ada9-885507dde124' alt={name} />
                        <p className='font-medium capitalize'>{name}</p>
                      </div>
                      {
                        reviewImages.length > 0 && (
                          <div className='w-full h-[15rem] my-2 rounded-md overflow-hidden'>
                            <img src={reviewImages[0]} className='object-cover' />
                          </div>
                        )
                      }
                      <div className='my-2'>
                        <Link to={url} className='text-primary-200 text-lg hover:underline'>{businessName}</Link>
                      </div>
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
              </div>
            )
          }
        </section>
      </div>
    </>
  )
}

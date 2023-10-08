import React from 'react'
import { Link } from 'react-router-dom'
import { createRouterPath } from '../utils/routerUtils'
import ReviewStar from '../components/ReviewStar'
import { useBusinesses } from '../context/Businesses'
import BusinessImageCarousel from '../components/BusinessImageCarousel'
import Filter from '../components/Filter'


const Search = () => {
  const { today, renderStatus, businesses, isLoading, categorySelected, prevSearchParams: { find_desc } } = useBusinesses()

  if (isLoading) return <h1>Loading...</h1>
  return (
    <div className='m-[1rem] grid gap-2 grid-cols-[20%_50%_30%] pt-6'>
      <Filter />
      <section >
        <h3 className='capitalize text-xl font-bold'>
          {
            businesses.length > 0 ? `Best ${categorySelected}` : `No results found for ${find_desc.toLowerCase()}`
          }
        </h3>
        <div>
          {
            businesses.map(({ businessId, businessName, businessImages, businessAddress, reviews, businessWorkingHours, avgRating, businessCategory: { subcategory } }) => (
              <article key={businessId} className='p-4 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] border transition-shadow duration-200 ease-in-out rounded-md my-4 flex gap-4'>
                <BusinessImageCarousel businessImages={businessImages} bussinessName={businessName} />
                <div>
                  <h2 className='text-2xl font-medium hover:underline'>
                    <Link to={`/business/${createRouterPath(businessName.toLowerCase() + ' ' + businessAddress.city.toLowerCase() + ' ' + businessId)}`}>{businessName}</Link>
                  </h2>
                  <div className='flex gap-2 items-center font-medium'>
                    <ReviewStar reviewRating={Math.floor(avgRating)} starSize='1.5rem' />
                    <p className='text-gray-600 text-sm'>{avgRating}</p>
                    <p className='text-primary-200 text-sm'>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</p>
                  </div>
                  <div>
                    {
                      subcategory.map(category => <p className='bg-gray-200 text-gray-700 font-semibold p-1 text-sm w-fit rounded-md capitalize'>{category}</p>)
                    }
                  </div>
                  <div>
                    {
                      renderStatus(today, businessWorkingHours)
                    }
                  </div>
                </div>
              </article>
            ))
          }
        </div>
      </section>
      <section>
        <h3>Map</h3>
      </section>
    </div>
  )
}

export default Search
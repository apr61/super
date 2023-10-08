import React from 'react'
import Search from '../components/Search'
import StarRating from '../components/StarRating'
import { Link, useNavigate } from 'react-router-dom'
import { useBusinesses } from '../context/Businesses'
import { createRouterPath } from '../utils/routerUtils'

const searchExtraStyles = 'max-w-[50rem]'

const WriteAReview = () => {
	document.title = 'Super - Write A Review'
	const { businesses, isLoading } = useBusinesses()
	const navigate = useNavigate()
	const handleStarReviewClick = (currentStar, businessId) => {
		navigate(`/writeareview/${businessId}/rating/${currentStar}`)
	}
	return (
		<div className='max-w-[75rem] mx-auto my-20'>
			<header className='my-10'>
				<h1 className='text-3xl font-bold'>Find a business to review</h1>
				<p className='text-lg my-4'>Review anything from your favorite patio spot to your local flower shop.</p>
				<Search extraStyles={searchExtraStyles} />
			</header>
			{
				isLoading ? <h1>Loading...</h1> : (
					<section className='mt-20 mb-10'>
						<h2 className='text-xl font-bold'>Visited one of these places recently?</h2>
						<div className='w-full grid grid-cols-2 gap-8 my-8'>
							{
								businesses.map(({ businessId, businessName, businessImages, businessAddress }) => (
									<article key={businessId} className='flex border rounded-md overflow-hidden max-h-[15rem]'>
										<img src={businessImages[0]} alt={businessName} className='object-cover' />
										<div className='px-6 py-8'>
											<Link to={`/business/${createRouterPath(businessName.toLowerCase() + ' ' + businessAddress.city.toLowerCase() + ' ' + businessId)}`}
												className='text-lg font-semibold hover:underline'>{businessName}</Link>
											<p>Do you recommend this business?</p>
											<StarRating handleOnClick={handleStarReviewClick} businessId={businessId} />
										</div>
									</article>
								))
							}
						</div>
					</section>
				)
			}
		</div>
	)
}

export default WriteAReview
import React from 'react'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { reviewStarData } from '../components/StarRating'

const ReviewStar = ({ reviewRating, starSize = '1.25rem'}) => {
    return (
        <div className='flex gap-1 my-2'>
            {
                new Array(5).fill(0).map((_, ind) => (
                    <div key={ind}
                        className={`p-1 rounded-md text-white flex items-center justify-center
                        ${reviewRating >= (ind + 1) ? reviewStarData[reviewRating].reviewStyles : 'bg-gray-200'}`}
                    >
                        <StarRoundedIcon style={{fontSize: starSize}}/>
                    </div>
                ))
            }
        </div>
    )
}

export default ReviewStar
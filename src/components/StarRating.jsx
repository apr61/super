import React, { useState } from 'react'
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export const reviewStarData = {
    1: {
        reviewComment: 'Not good',
        reviewStyles: 'bg-red-500'
    },
    2: {
        reviewComment: "Could've been better",
        reviewStyles: 'bg-orange-500'
    },
    3: {
        reviewComment: 'Ok',
        reviewStyles: 'bg-yellow-500'
    },
    4: {
        reviewComment: 'Good',
        reviewStyles: 'bg-green-500'
    },
    5: {
        reviewComment: 'Great',
        reviewStyles: 'bg-green-600'
    }
}

const StarRating = ({ handleOnClick, businessId, currentStarProp }) => {
    const [currentStar, setCurrentStar] = useState(currentStarProp || 0);
    const [reviewComment, setReviewComment] = useState(currentStar != 0 ? reviewStarData[currentStar].reviewComment : 'Select your review');
    const [reviewStarStyle, setReviewStarStyle] = useState(currentStar != 0 ? reviewStarData[currentStar].reviewStyles : null);

    const onHover = (starIndex) => {
        setReviewComment(reviewStarData[starIndex].reviewComment);
        setReviewStarStyle(reviewStarData[starIndex].reviewStyles);
        setCurrentStar(starIndex)
    }
    const onLeave = () => {
        if (currentStarProp && (currentStar != currentStarProp || currentStar === currentStarProp)) {
            setReviewComment(reviewStarData[currentStarProp].reviewComment)
            setReviewStarStyle(reviewStarData[currentStarProp].reviewStyles);
            setCurrentStar(currentStarProp)
            return
        }
        setReviewComment('Select your review')
        setReviewStarStyle(null)
        setCurrentStar(0)
    }

    return (
        <>
            <div className='flex gap-2 mt-4'>
                {
                    new Array(5).fill(0).map((_, ind) => (
                        <button key={ind} type='button'
                            className={`py-1 px-2 rounded-md text-lg ease-in duration-200 text-white ${currentStar >= (ind + 1) && reviewStarStyle ? reviewStarStyle : 'bg-gray-200'}`}
                            onMouseEnter={() => onHover(ind + 1)} onMouseLeave={onLeave}
                            onClick={() => handleOnClick(ind + 1, businessId)}>
                            <StarRoundedIcon />
                        </button>
                    ))
                }
            </div>
            <p className='mt-2'>{reviewComment}</p>
        </>
    )
}

export default StarRating
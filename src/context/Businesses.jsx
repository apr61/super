import { createContext, useContext, useEffect, useState } from "react"
import { convertToAMPM, days, isTimeBetween } from "../utils/timeUtils"
import { useSearchParams } from "react-router-dom"
import { getAllBusinessesService } from '../services/business'
import { getAllReviewsByBusinessIdService } from '../services/review'
import toast from "react-hot-toast"

const BusinessContext = createContext({})

export const useBusinesses = () => {
    return useContext(BusinessContext)
}

const searchParamsDefaultValue = {
    find_desc: "",
    find_location: "",
    rating: 5,
}

const BusinessProvider = ({ children }) => {
    const [lbusinesses, setBusinesses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams(searchParamsDefaultValue)
    const rating = searchParams.get("rating")
    const find_desc = searchParams.get("find_desc")?.split("+").join(" ")
    const find_location = searchParams.get("find_location")?.split("+").join(" ")
    const subcategory = searchParams.get("subcategory")?.split(",") || []

    const getAllReviews = async (businessId) => {
        try {
            const data = await getAllReviewsByBusinessIdService(businessId);
            return data
        } catch (error) {
            toast.error(`Error fetching reviews for business ${businessId}: ${error}`)
            return [];
        }
    }

    const getAllBusinessData = async () => {
        try {
            const businessData = await getAllBusinessesService();
            const businessPromises = businessData.map(async (business) => {
                const reviews = await getAllReviews(business.businessId);
                const avgRating = getAvgRating(reviews)
                return { ...business, reviews, avgRating: avgRating };
            });
            const businesses = await Promise.all(businessPromises);
            setBusinesses(businesses);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    const getAvgRating = (reviews) => {
        let avg = 0
        if (reviews.length > 0) {
            avg = reviews.reduce((acc, curr) => {
                acc += curr.rating
                return acc
            }, 0) / reviews.length
        }
        return avg
    }

    const today = days[new Date().getDay()]

    const isOpenDay = (day, workingHours) => workingHours[day].isOpen
    const businessHoursForDay = (day, workingHours) => `${convertToAMPM(workingHours[day].opens)} - ${convertToAMPM(workingHours[day].closes)}`
    const isOpenNowToday = (day, workingHours) => {
        const isOpen = isOpenDay(day, workingHours)
        const isOpenNow = isOpen ? isTimeBetween(workingHours[day].opens, workingHours[day].closes) : false
        if (!isOpen) return
        if (isOpenNow) {
            return <p className='text-green-500'>Open Now</p>
        } else {
            return <p className='text-red-500'>Closed Now</p>
        }
    }

    const renderStatus = (today, workingHours) => {
        if (isOpenDay(today, workingHours)) {
            return (
                <>
                    {isOpenNowToday(today, workingHours)}
                    <p className='text-gray-500 font-medium'>{businessHoursForDay(today, workingHours)}</p>
                </>
            )
        } else {
            return <p className='text-red-500'>Closed</p>
        }
    };

    function filterHelper(name, value) {
        setSearchParams(prev => {
            prev.set(name, value)
            return prev
        }, { replace: true })
    }

    function handleFilterClear() {
        const tempSearchParams = {
            find_desc,
            find_location,
            rating: 5
        }
        setSearchParams(tempSearchParams);
    }

    useEffect(() => {
        getAllBusinessData()
    }, [])

    const filterByDesc = lbusinesses.filter(business => (
        business.businessName.toLowerCase().includes(find_desc.toLowerCase()) ||
        business.businessCategory.category.toLowerCase().includes(find_desc.toLowerCase()) ||
        business.businessCategory.subcategory.indexOf(find_desc.toLowerCase()) !== -1
    ))

    const filterByLocation = filterByDesc.filter(business => (
        business.businessAddress.street.toLowerCase().includes(find_location.toLowerCase()) ||
        business.businessAddress.city.toLowerCase().includes(find_location.toLowerCase()) ||
        business.businessAddress.state.toLowerCase().includes(find_location.toLowerCase()) ||
        business.businessAddress.pincode === (find_location.toLowerCase()) ||
        business.businessAddress.country.toLowerCase().includes(find_location.toLowerCase())
    ))

    const filterBySubCategory = subcategory.length > 0 ? filterByLocation.filter(business => (
        business.businessCategory.subcategory.some(category => subcategory.includes(category))
    )) : filterByLocation
    
    const filterByRating = filterBySubCategory.filter(business =>
        business.avgRating <= rating
    )


    const categorySelected = filterByRating[0]?.businessCategory.category || find_desc

    return (
        <BusinessContext.Provider value={{
            businesses: find_desc !== null ? filterByRating : lbusinesses,
            setBusinesses,
            isLoading,
            today,
            isOpenDay,
            isOpenNowToday,
            businessHoursForDay,
            renderStatus,
            getAvgRating,
            rating,
            filterHelper,
            handleFilterClear,
            categorySelected,
            prevSearchParams: { find_desc, find_location, rating, subcategory },
            setSearchParams
        }}>
            {children}
        </BusinessContext.Provider >
    )
}

export default BusinessProvider
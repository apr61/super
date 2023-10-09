import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { AddNewBusinessInitialState, SET_CLEAR, addNewBusinessReducer } from "../reducers/AddNewBusiness"
import useMultiStepForm from '../hooks/useMultiStepForm'
import NewBusiness from '../components/addNewBusiness/NewBusiness';
import BusinessType from '../components/addNewBusiness/BusinessType';
import BusinessCategory from '../components/addNewBusiness/BusinessCategory';
import BusinessAddress from '../components/addNewBusiness/BusinessAddress';
import BusinessContactDetails from '../components/addNewBusiness/BusinessContactDetails';
import BusinessHours from '../components/addNewBusiness/BusinessHours';
import BusinessDescription from '../components/addNewBusiness/BusinessDescription';
import BusinessImages from "../components/addNewBusiness/BusinessImages";
import BusinessLastStep from "../components/addNewBusiness/BusinessLastStep";
import { createNewBusinessService, getAllBusinessesByUidService, uploadPhotosService } from "../services/business";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { useBusinesses } from "./Businesses";
import toast from "react-hot-toast";

const AddNewBusinessContext = createContext({})

export const useAddNewBusinessContext = () => {
    return useContext(AddNewBusinessContext)
}

// const AllSteps = [<BusinessCategory />]
const AllSteps = [<NewBusiness />, <BusinessType />, <BusinessCategory />, <BusinessAddress />, <BusinessContactDetails />, <BusinessHours />, <BusinessDescription />, <BusinessImages />, <BusinessLastStep />]

const AddNewBusinessProvider = ({ children }) => {
    const [AddNewBusinessState, AddNewBusinessDispatch] = useReducer(addNewBusinessReducer, AddNewBusinessInitialState)
    const { step, next, back, steps, currentStepIndex, isFirstStep, isLastStep } = useMultiStepForm(AllSteps)
    const { currentUser } = useAuthContext()
    const { setBusinesses } = useBusinesses()
    const [isLoading, setIsLoading] = useState(true)
    const [userBusinesses, setUserBusinesses] = useState({})
    const navigate = useNavigate()

    function reducerHelper(type, payload) {
        AddNewBusinessDispatch({ type, payload })
    }
    const createNewBusiness = async () => {
        setIsLoading(true)
        const imageUrls = await uploadPhotosService(AddNewBusinessState.businessName, AddNewBusinessState.businessImages)
        const tempBusinessDetails = { ...AddNewBusinessState, businessImages: imageUrls, uid: currentUser.uid }
        const data = await createNewBusinessService(tempBusinessDetails)
        setBusinesses((prev) => [...prev, data])
        reducerHelper(SET_CLEAR, AddNewBusinessInitialState)
        setIsLoading(false)
        toast.success('Business added successfully')
        navigate('/business/my')
    }
    const getUserBusinesses = async (uid) => {
        try {
            const data = await getAllBusinessesByUidService(uid)
            setUserBusinesses(data[0])
        } catch (err) {
            toast.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getUserBusinesses(currentUser.uid)
    }, [currentUser.uid])

    return (
        <AddNewBusinessContext.Provider value={{
            ...AddNewBusinessState,
            reducerHelper,
            step, next, back, steps,
            currentStepIndex,
            isFirstStep,
            isLastStep,
            createNewBusiness,
            isLoading,
            userBusinesses
        }}>
            {children}
        </AddNewBusinessContext.Provider>
    )
}

export default AddNewBusinessProvider
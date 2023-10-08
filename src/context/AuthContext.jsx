import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { getUserDetails, logOut } from "../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext()

export function useAuthContext() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    // const [userDetails, setUserDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
                setIsLoading(false);
            } else {
                setCurrentUser(null)
                setIsLoading(false);
            }
        })
        return () => unsubscribe;
    }, []);

    const logOutUser = async () => {
        await logOut()
        toast.success('Logout successfull')
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ currentUser, logOutUser, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider
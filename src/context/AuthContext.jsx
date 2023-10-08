import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { getUserDetails, logOut } from "../services/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export function useAuthContext() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
                // getUserDetails(user.uid)
                //     .then((data) => {
                //         setUserDetails(data)
                //         setIsLoading(false)
                //     })
                //     .catch(err => {
                //         console.error('Error fetching user data: ', err);
                //         setIsLoading(false);
                //     })
            } else {
                setUserDetails(null);
                setCurrentUser(null)
                setIsLoading(false);
            }
        })
        return () => unsubscribe;
    }, []);

    const logOutUser = async () => {
        await logOut()
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ currentUser, userDetails, logOutUser, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth, db } from "../../FirebaseConfig";
import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

export const signUp = async (email, password, name, roles, picURL) => {
    const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    await updateProfile(userCredentials.user, { displayName: name, photoURL : picURL });
    return await setDoc(doc(db, "users-details", userCredentials.user.uid), {
        name: name,
        email: email,
        roles: roles
    });
};

export const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
    return await signOut(auth);
};

export const getUserDetails = async (userId) => {
    const docRef = doc(db, "users-details", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {uid:userId, ...docSnap.data() };
    }
};
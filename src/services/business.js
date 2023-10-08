import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { v4 } from 'uuid'
import { storage } from "../../FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewBusinessService = async (newBusiness) => {
    const docRef = await addDoc(collection(db, 'businesses'), newBusiness)
    return { id: docRef.id, ...newBusiness }
}

export const uploadPhotosService = async (businessName, businessImages) => {
    let tempImageUrls = []
    businessImages = [...businessImages]
    for (const item of businessImages) {
        try {
            const result = await uploadPhotoHelper(businessName, item);
            tempImageUrls.push(result)
        } catch (error) {
            console.error(error);
        }
    }
    return tempImageUrls
}

export const uploadPhotoHelper = async (businessName, image) => {
    let imageRef = ref(storage, `images/${businessName + '-' + v4()}`)
    const snapshot = await uploadBytes(imageRef, image)
    return await getDownloadURL(snapshot.ref)
}

export const getAllBusinessesService = async () => {
    let productsArray = [];
    const querySnapshot = await getDocs(collection(db, "businesses"));
    querySnapshot.forEach((doc) => {
        productsArray.push({ businessId: doc.id, ...doc.data() });
    });
    return productsArray;
}

export const getAllBusinessesByUidService = async (uid) => {
    const userBusinesses = [];
    const q = query(collection(db, "businesses"), where("uid", "==", uid));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
        userBusinesses.push({ businessId: doc.id, ...doc.data() });
    });
    return [...userBusinesses];
}

export const getBusinessByIdService = async (businessId) => {
    const docRef = doc(db, "businesses", businessId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        return { businessId, ...docSnapshot.data() };
    }
}
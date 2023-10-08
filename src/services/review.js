import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const createANewReview = async (newReview) => {
    const docRef = await addDoc(collection(db, 'reviews'), newReview)
    return { id: docRef.id, ...newReview }
}

export const getAllReviewsByBusinessIdService = async (bid) => {
    const businessReviews = [];
    const q = query(collection(db, "reviews"), where("businessId", "==", bid));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
        businessReviews.push({ reviewId: doc.id, ...doc.data() });
    });
    return [...businessReviews];
}

export const getAllReviewsService = async () => {
    let temp = []
    const querySnapshot = await getDocs(collection(db, "reviews"));
    querySnapshot.forEach((doc) => {
        temp.push({id: doc.id, ...doc.data()})
    });
    return temp
}
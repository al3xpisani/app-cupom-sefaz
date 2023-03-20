
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

fetchFirebaseData = async(collectionName,searchFieldName,searchValue) => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const firebaseQuery = query(collection(db, collectionName), where(searchFieldName, "==", searchValue));
    
    let invoices = [];
    const querySnapshot = await getDocs(firebaseQuery);
    querySnapshot.forEach((doc) => {
        invoices.push(doc.data());
    });
    return invoices;
}

export default fetchFirebaseData
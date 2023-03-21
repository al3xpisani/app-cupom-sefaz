import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAt
} from "firebase/firestore";
import { getDatabase, ref, orderByChild } from "firebase/database";

const fetchFirebaseDataMatch = async (
  collectionName,
  searchFieldName,
  searchValue,
  orderByField,
  isAscSorted
) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const firebaseQuery = query(
    collection(db, collectionName),
    where(searchFieldName, "==", 'jimenslima@gmail.com'),
    orderBy(orderByField, isAscSorted ? "asc" : "desc")
  );

  let invoices = [];
  const querySnapshot = await getDocs(firebaseQuery);
  querySnapshot.forEach((doc) => {
    invoices.push(doc.data());
  });
  return invoices;
};

export const fetchFirebaseDataLikeArrayField = async (
    collectionName,
    orderByField,
    searchValueObject,
  ) => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const firebaseQuery = query(
      collection(db, collectionName), where("emitente.razao_social", "==", "Gaming Sorts")
    //   collection(db, collectionName), orderBy(orderByField), startAt(searchValueObject)
    );

    let invoices = [];
    const querySnapshot = await getDocs(firebaseQuery);
    querySnapshot.forEach((doc) => {
      invoices.push(doc.data());
    });
    return invoices;
  };

export default fetchFirebaseDataMatch;

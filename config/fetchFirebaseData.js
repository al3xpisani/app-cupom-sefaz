import { getDocs, query, where, orderBy } from "firebase/firestore";
import { app, db, getFirestore, collection, addDoc } from "./firebase-config";

const fetchFirebaseDataMatch = async (
  collectionName,
  searchFieldName,
  searchValue,
  orderByField,
  isAscSorted
) => {
  const firebaseQuery = query(
    collection(db, collectionName),
    where(searchFieldName, "==", searchValue),
    orderBy(orderByField, isAscSorted ? "asc" : "desc")
  );

  let invoices = [];
  const querySnapshot = await getDocs(firebaseQuery);
  querySnapshot.forEach((doc) => {
    invoices.push(doc.data());
  });
  return invoices;
};

export const fetchFirebaseExistingInvoice = async (
  collectionName,
  searchFieldName,
  searchValue,
  searchFieldName1,
  searchValue1
) => {
  let invoices = [];
  let firebaseQuery = null;
  let querySnapshot = null;
  try {
      console.log('chave e email ', searchFieldName, searchValue1)
    firebaseQuery = query(
      collection(db, collectionName),
      where(searchFieldName, "==", searchValue)
    );
    querySnapshot = await getDocs(firebaseQuery);
    if (!querySnapshot.empty) {
      firebaseQuery = query(
        collection(db, collectionName),
        where(searchFieldName1, "==", searchValue1)
      );
      if (!querySnapshot.empty) {
          querySnapshot = await getDocs(firebaseQuery);
      }
    }
    console.log('query snaph ', querySnapshot.empty)
    querySnapshot.forEach((doc) => {
      invoices.push(doc.data());
    });
  } catch (error) {
    console.log("error from firebase query multiple fields", error);
  }
  return invoices;
};

export default fetchFirebaseDataMatch;

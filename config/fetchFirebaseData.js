import {
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {app, db, getFirestore, collection,addDoc} from './firebase-config'

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
    const firebaseQuery = query(
      collection(db, collectionName),
      where({"chave":searchValue, "email":searchValue1})
    );
  
    let invoices = [];
    const querySnapshot = await getDocs(firebaseQuery);
    querySnapshot.forEach((doc) => {
      invoices.push(doc.data());
    });
    return invoices;
  };

//   export const fetchFirebaseDataLikeArrayField = async (
//     collectionName,
//     orderByField,
//     searchValueObject,
//   ) => {
//     const app = initializeApp(firebaseConfig);
//     const db = getFirestore(app);
//     const firebaseQuery = query(
//     //   collection(db, collectionName), where("emitente.razao_social", "==", "Gaming Sorts")
//       collection(db, collectionName), orderBy(orderByField), startAt(searchValueObject)
//     );

//     let invoices = [];
//     const querySnapshot = await getDocs(firebaseQuery);
//     querySnapshot.forEach((doc) => {
//       invoices.push(doc.data());
//     });
//     return invoices;
//   };

export default fetchFirebaseDataMatch;

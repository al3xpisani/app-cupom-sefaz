import {
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  collection
} from "firebase/firestore";
import {app, db, getFirestore} from './firebase-config'

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
    searchValue,
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

  export const addNfe = async(nfe) => {
    try {
        const docRef = await addDoc(collection(db, "nota-fiscal"), nfe);
    } catch (e) {
        console.error("Falha ao adicionar a NFE: ", e);
    }
}

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

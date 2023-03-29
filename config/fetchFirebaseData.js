import { getDocs, query, where, orderBy } from "firebase/firestore";
import { addDoc, db, collection } from "./firebase-config";

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

export const fetchFirebaseLikeAt = async (
  collectionName,
  searchFieldName,
  searchValue,
  searchFieldName1,
  searchValue1,
) => {
  let invoices = [];
  try {
    const startAtNameRes = query(
        collection(db, collectionName),
        where(searchFieldName, "==", searchValue),
        where(searchFieldName1, ">=", searchValue1),
        where(searchFieldName1,"<=", searchValue1 + "\uf8ff")
      );

    const querySnapshot = await getDocs(startAtNameRes);
    querySnapshot.forEach((doc) => {
      invoices.push(doc.data());
    });

  } catch (error) {
    console.log("error from firebase query fields starting with ", error);
  }
  return invoices;
};

export const addFirebaseDocument = async (documentEntity, collectionName) => {
        try {
          return await addDoc(collection(db, collectionName), documentEntity);
        } catch (e) {
          console.error(`Erro ao adicionar ${documentEntity}`, e);
        }
}

export default fetchFirebaseDataMatch;

import { getDocs, query, where, orderBy, startAt, endAt } from "firebase/firestore";
import { app, db, collection, addDoc, ref } from "./firebase-config";

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
    //   const startAtNameRes = query(
    //     collection(db, collectionName),
    //     where("email", "==", "jimenslima@gmail.com"),
    //     where("emitente.razao_social", ">=", "COM"),
    //     where("emitente.razao_social","<=","COM" + "\uf8ff")
    //   );

    const querySnapshot = await getDocs(startAtNameRes);
    querySnapshot.forEach((doc) => {
      invoices.push(doc.data());
    });

    console.log("fire like ", invoices.length);
  } catch (error) {
    console.log("error from firebase query fields starting with ", error);
  }
  return invoices;
};

export default fetchFirebaseDataMatch;

import {initializeApp} from 'firebase/app';
import {getFirestore, collection, addDoc} from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDbSaeWEMbNuzOrMMu9qJNORWedgjZb5OY",
//   authDomain: "zeroqueue-8519f.firebaseapp.com",
//   databaseURL: "https://zeroqueue-8519f-default-rtdb.firebaseio.com",
//   projectId: "zeroqueue-8519f",
//   storageBucket: "zeroqueue-8519f.appspot.com",
//   messagingSenderId: "542005439200",
//   appId: "1:542005439200:web:cd11e54ff432a63abb7e85",
//   measurementId: "G-ERHBQZWL2T"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAuf7ohDCRnu_CU50dOF3PH_7HaIFfvfvk",
  authDomain: "zeroqueue-30894.firebaseapp.com",
  projectId: "zeroqueue-30894",
  storageBucket: "zeroqueue-30894.appspot.com",
  messagingSenderId: "178763142648",
  appId: "1:178763142648:web:a65ec8c44bcb4dab29720d",
  measurementId: "G-7EGLC294L6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db, getFirestore, collection,addDoc};
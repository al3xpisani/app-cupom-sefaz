import {initializeApp} from 'firebase/app';
import {getFirestore, collection, addDoc} from 'firebase/firestore';
import { ref } from 'firebase/database'

export const firebaseConfig = {
  apiKey: "xxxxx",
  authDomain: "xxxx.com",
  projectId: "xxxx",
  storageBucket: "xxxx.com",
  messagingSenderId: "xxxx",
  appId: "xxxxx",
  measurementId: "xxxx"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app, db, ref, collection,addDoc};

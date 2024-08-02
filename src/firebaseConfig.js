import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDvraOPJijD5GRBmGnO-RAEhsPBFNXOq0",
  authDomain: "immunicare-9d755.firebaseapp.com",
  projectId: "immunicare-9d755",
  storageBucket: "immunicare-9d755.appspot.com",
  messagingSenderId: "981527780908",
  appId: "1:981527780908:web:e40429bcaf9f5278fafb89",
  measurementId: "G-42NZ490EC5",
};

const app = initializeApp(firebaseConfig);


const firestoreDatabase = getFirestore(app);

export default firestoreDatabase;

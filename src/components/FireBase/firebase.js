// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX3Ftx33yHx4KE5gHoCVOVGiM6N-duqMg",
  authDomain: "flavor-forge-d9469.firebaseapp.com",
  projectId: "flavor-forge-d9469",
  storageBucket: "flavor-forge-d9469.firebasestorage.app",
  messagingSenderId: "833592832064",
  appId: "1:833592832064:web:1a592afc27a700d93d2fa5",
  measurementId: "G-EWGRKF3PV0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

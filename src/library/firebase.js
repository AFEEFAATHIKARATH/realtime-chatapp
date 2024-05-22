// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvq9vHvhAA2y0U2_ekpeGIh6yICOUIJXc",
  authDomain: "react-realchat.firebaseapp.com",
  projectId: "react-realchat",
  storageBucket: "react-realchat.appspot.com",
  messagingSenderId: "683669499656",
  appId: "1:683669499656:web:defb8219b4089487e406bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore();
export const storage = getStorage();
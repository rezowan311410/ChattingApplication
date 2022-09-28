// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsVtM1GEbdfhf5WAY0hO2fyj5FJ2fMgO0",
  authDomain: "techtalk-5bd56.firebaseapp.com",
  projectId: "techtalk-5bd56",
  storageBucket: "techtalk-5bd56.appspot.com",
  messagingSenderId: "698053646975",
  appId: "1:698053646975:web:4cb38081ce1e0c8ac8bd4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const db = getFirestore( app)
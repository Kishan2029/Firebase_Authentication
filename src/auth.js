// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJCmNX6JOdvVgy-UOI0L1UCVequj4QNvc",
  authDomain: "react-auth-2e7f0.firebaseapp.com",
  projectId: "react-auth-2e7f0",
  storageBucket: "react-auth-2e7f0.appspot.com",
  messagingSenderId: "973285390829",
  appId: "1:973285390829:web:50d7251d4deca65441cfe4",
  measurementId: "G-26Z0DTEMXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
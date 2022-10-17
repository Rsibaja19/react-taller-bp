// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJz3poviHRROvjxRu0NNC2JWpuGscMgbM",
    authDomain: "react-taller-bp.firebaseapp.com",
    projectId: "react-taller-bp",
    storageBucket: "react-taller-bp.appspot.com",
    messagingSenderId: "640281824927",
    appId: "1:640281824927:web:2c9cbc063bdf1abf605caa",
    measurementId: "G-2FMQXH9MHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }
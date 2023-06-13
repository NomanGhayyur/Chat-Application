// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcpeIoukGPv4TMqezlNIavxQlU61djBvQ",
    authDomain: "chap-app-b1215.firebaseapp.com",
    projectId: "chap-app-b1215",
    storageBucket: "chap-app-b1215.appspot.com",
    messagingSenderId: "493858429819",
    appId: "1:493858429819:web:ff7cf7c994cbe3f82ffbde",
    measurementId: "G-F7K437TZ3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
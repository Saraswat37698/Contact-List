// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYPyFapc4gKWgDAd5sRJxAAHyh2m9bncQ",
  authDomain: "myapp-66f0a.firebaseapp.com",
  projectId: "myapp-66f0a",
  storageBucket: "myapp-66f0a.firebasestorage.app",
  messagingSenderId: "410483469153",
  appId: "1:410483469153:web:93d632e2bafde52845b320",
  measurementId: "G-BGM5WX8V4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);
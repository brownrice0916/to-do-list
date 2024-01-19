// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOMxeyKfYAESDxequLCOc8cpyCNUNa7cM",
  authDomain: "sparta-ef649.firebaseapp.com",
  projectId: "sparta-ef649",
  storageBucket: "sparta-ef649.appspot.com",
  messagingSenderId: "1081349626549",
  appId: "1:1081349626549:web:53a51c9471b7dcb8c97cfc",
  measurementId: "G-6M70CLQ0PW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;

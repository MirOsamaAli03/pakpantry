// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArGBx9fq_zRjtC93IM7Q6ABYloHb7bAb8",
  authDomain: "pantry-man-89607.firebaseapp.com",
  projectId: "pantry-man-89607",
  storageBucket: "pantry-man-89607.appspot.com",
  messagingSenderId: "130949726269",
  appId: "1:130949726269:web:1cef9a67fd03ee852fea54",
  measurementId: "G-DLNKT73BH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
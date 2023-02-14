// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQKbW6DiVfhbu9w4kbZ9dlcjli2g0OaxU",
  authDomain: "anime-higherlower-game-backend.firebaseapp.com",
  projectId: "anime-higherlower-game-backend",
  storageBucket: "anime-higherlower-game-backend.appspot.com",
  messagingSenderId: "949896368258",
  appId: "1:949896368258:web:a54f793c458bac6f3ca49b",
  measurementId: "G-GPJZ535MGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//auth
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAodUYyJQ3uiX4KQUOi7hqC9nvQIKnEL9o",
  authDomain: "clone-b3273.firebaseapp.com",
  projectId: "clone-b3273",
  storageBucket: "clone-b3273.firebasestorage.app",
  messagingSenderId: "400401758044",
  appId: "1:400401758044:web:f62159fdecad8948497399"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = app.firestore();
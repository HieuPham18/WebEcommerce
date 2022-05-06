// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOwWYN_6WwBH0_6_bjEmFWtJCc356-wZ0",
  authDomain: "webecommerce-b8fe5.firebaseapp.com",
  projectId: "webecommerce-b8fe5",
  storageBucket: "webecommerce-b8fe5.appspot.com",
  messagingSenderId: "518927898796",
  appId: "1:518927898796:web:a64111d4041465b3a5e709",
  measurementId: "G-153D1ZJD9D"

  // apiKey: "AIzaSyD5Usa5cR-je780VN7m5rys1WFRzujuI8c",
  // authDomain: "ecommerce-web-5d727.firebaseapp.com",
  // projectId: "ecommerce-web-5d727",
  // storageBucket: "ecommerce-web-5d727.appspot.com",
  // messagingSenderId: "623502174357",
  // appId: "1:623502174357:web:84a25884e356c7440cd39c",
  // measurementId: "G-ELG924JJC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fileDB = getFirestore(app)
export const auth = getAuth(app);
export default fileDB
// const fileDB1 = firebase.initializeApp(firebaseConfig)
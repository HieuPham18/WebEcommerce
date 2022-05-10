// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import firebase from "firebase/compat/app"
// import "firebase/compat/auth";  
// import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyDOwWYN_6WwBH0_6_bjEmFWtJCc356-wZ0",
  // authDomain: "webecommerce-b8fe5.firebaseapp.com",
  // projectId: "webecommerce-b8fe5",
  // storageBucket: "webecommerce-b8fe5.appspot.com",
  // messagingSenderId: "518927898796",
  // appId: "1:518927898796:web:a64111d4041465b3a5e709",
  // measurementId: "G-153D1ZJD9D"

  // apiKey: "AIzaSyD5Usa5cR-je780VN7m5rys1WFRzujuI8c",
  // authDomain: "ecommerce-web-5d727.firebaseapp.com",
  // projectId: "ecommerce-web-5d727",
  // storageBucket: "ecommerce-web-5d727.appspot.com",
  // messagingSenderId: "623502174357",
  // appId: "1:623502174357:web:84a25884e356c7440cd39c",
  // measurementId: "G-ELG924JJC0"

  apiKey: "AIzaSyCpqIONmlAO01xd7hvRnsKBGeL-CvQX57E",
  authDomain: "ecommerce-e951c.firebaseapp.com",
  projectId: "ecommerce-e951c",
  storageBucket: "ecommerce-e951c.appspot.com",
  messagingSenderId: "167218521871",
  appId: "1:167218521871:web:19863094937039f986407a",
  measurementId: "G-LCWMN0N4WE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fileDB = getFirestore(app)
export const auth = getAuth(app);
// export const firestore  = firebase.firestore()
export default fileDB
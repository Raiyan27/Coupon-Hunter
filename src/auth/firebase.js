import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRDzUAQ_mQ1_cnmPxxTOcp2K3HbTonQUc",
  authDomain: "coupon-hunter-2a8ad.firebaseapp.com",
  projectId: "coupon-hunter-2a8ad",
  storageBucket: "coupon-hunter-2a8ad.firebasestorage.app",
  messagingSenderId: "650050087302",
  appId: "1:650050087302:web:7d857d9a9576a661012407",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIWngSgZPpk6d4-XSBgQEXu_XzADXHJg0",
  authDomain: "almb-e51ad.firebaseapp.com",
  projectId: "almb-e51ad",
  storageBucket: "almb-e51ad.appspot.com",
  messagingSenderId: "565748050740",
  appId: "1:565748050740:web:4e41ed7a6b5854f938d361",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

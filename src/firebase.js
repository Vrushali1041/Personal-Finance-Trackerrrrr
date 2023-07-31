// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe2AiKs34l_PnzC4fenXtMUdm1m1oS6zI",
  authDomain: "personal-finance-tracker-7bf3f.firebaseapp.com",
  projectId: "personal-finance-tracker-7bf3f",
  storageBucket: "personal-finance-tracker-7bf3f.appspot.com",
  messagingSenderId: "783425452809",
  appId: "1:783425452809:web:a0043eb4f38421dddef1d8",
  measurementId: "G-5D8DMDQTJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };


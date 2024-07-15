// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// const api_key = process.env.REACT_APP_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  //put your firebase configuration (api key )
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }

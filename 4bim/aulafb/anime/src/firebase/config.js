import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwzTa73XVqVxSs71DXkmb45HjvLXH4vQE",
  authDomain: "apps-76b06.firebaseapp.com",
  projectId: "apps-76b06",
  storageBucket: "apps-76b06.firebasestorage.app",
  messagingSenderId: "499776236425",
  appId: "1:499776236425:web:f08504024db76cf45e4f58"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
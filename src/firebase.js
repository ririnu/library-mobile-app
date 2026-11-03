import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "library-mobile-app-e5140.firebaseapp.com",
  projectId: "library-mobile-app-e5140",
  storageBucket: "library-mobile-app-e5140.appspot.com",
  messagingSenderId: "...",
  appId: "1:..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
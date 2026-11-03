import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAaUu9pGOW hJmJjQFrQAYaDhhseQsmwke8",
  authDomain: "library-mobile-app-e5140.firebaseapp.com",
  projectId: "library-mobile-app-e5140",
  storageBucket: "library-mobile-app-e5140.firebasestorage.app",
  messagingSenderId: "240979132483",
  appId: "1:240979132483:web:38f46d725829f4defa54f6",
  measurementId: "G-J99DXPNDWG"
};

const app = initializeApp(firebaseConfig);
console.log("Firebase Connected:", app.name);
export default app;
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Correct import
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8V3n3Gs1NKrzlipIl7gQn1hCK58sYvWk",
  authDomain: "whats-app-clone-5535c.firebaseapp.com",
  projectId: "whats-app-clone-5535c",
  storageBucket: "whats-app-clone-5535c.appspot.com",
  messagingSenderId: "850277853550",
  appId: "1:850277853550:web:9c9be25e8459cd3633397f",
  measurementId: "G-0RD48Z9VTJ",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider(); // Use GoogleAuthProvider from getAuth

export { auth, provider }; // Export provider as well

export default db;

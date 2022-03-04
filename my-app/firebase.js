import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword ,signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC6KCAP-a0r2ka14dUILym_BkQnGh0kLAs",
  authDomain: "alumnna.firebaseapp.com",
  projectId: "alumnna",
  storageBucket: "alumnna.appspot.com",
  messagingSenderId: "78602677648",
  appId: "1:78602677648:web:b37fa2c47938031ce59715",
  measurementId: "G-P9TM9JGCVM"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export function signIn () {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
export function signPlsOut () {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  })
}
export const db = getFirestore();
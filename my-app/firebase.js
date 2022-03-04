import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword ,signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  {secret}
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

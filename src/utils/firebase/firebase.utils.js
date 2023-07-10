import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBcNbkHqp0GB-y7kURww-E74uARNIvxiKY",
    authDomain: "crwn-clothing-db-91b67.firebaseapp.com",
    projectId: "crwn-clothing-db-91b67",
    storageBucket: "crwn-clothing-db-91b67.appspot.com",
    messagingSenderId: "559718581905",
    appId: "1:559718581905:web:8f64362eb13341c51de130"
  };
  
  const firebaseapp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);
      const userSnapshot = await getDoc(userDocRef);

      if(!userSnapshot.exists()) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
          } catch (error) {
              console.log('error while creating the user', error.message);
          }
      }

      return userDocRef;
    };
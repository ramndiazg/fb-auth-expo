import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDDhx2GXJAmjGlHUY5vbzmK7ygFxHd7wdU",
  authDomain: "my-auth-app-cfbea.firebaseapp.com",
  projectId: "my-auth-app-cfbea",
  storageBucket: "my-auth-app-cfbea.appspot.com",
  messagingSenderId: "185343130546",
  appId: "1:185343130546:web:aa6fad3ee31d1c2c7542ab",
  measurementId: "G-1TN9EB18C2"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
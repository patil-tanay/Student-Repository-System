import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAAsQZJ80HMcyritCc1lf2NLHlDsGHuwxI",
    authDomain: "minor2-3fc94.firebaseapp.com",
    projectId: "minor2-3fc94",
    storageBucket: "minor2-3fc94.appspot.com",
    messagingSenderId: "222880933179",
    appId: "1:222880933179:web:4ad4976d4de6c0e893c31e",
    measurementId: "G-JKEXBCY1CX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage(); // Add this line to initialize Firebase Storage
export const googleProvider = new firebase.auth.GoogleAuthProvider();


export default firebase;
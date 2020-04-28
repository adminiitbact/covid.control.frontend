import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
export const myFirebase = firebase.initializeApp(firebaseConfig);

import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyAf4j7k5TMTN86QoiNtonPc6zWodwGD5MM',
  authDomain: 'hospital-erp-stag.firebaseapp.com',
  databaseURL: 'https://hospital-erp-stag.firebaseio.com',
  projectId: 'hospital-erp-stag',
  storageBucket: 'hospital-erp-stag.appspot.com',
  messagingSenderId: '842907895704',
  appId: '1:842907895704:web:8445b521bf4819d68f8ded',
  measurementId: 'G-CGHDBXB1Y0'
};

export const myFirebase = firebase.initializeApp(firebaseConfig);

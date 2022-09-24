// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAfZibw9LxGu1wCGRrBbDwnunCCPBLt3p8",
    authDomain: "clone-5c1a3.firebaseapp.com",
    databaseURL: "https://clone-5c1a3.firebaseio.com",
    projectId: "clone-5c1a3",
    storageBucket: "clone-5c1a3.appspot.com",
    messagingSenderId: "52288811153",
    appId: "1:52288811153:web:b076bb4000bbd4d3e44f30",
    measurementId: "G-XBRL2STG5X"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
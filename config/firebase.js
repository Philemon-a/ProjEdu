// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
require('dotenv').config();
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyC_G4G9-B2qHpkDhZ3e1SzP_hOypMCC9cI",
  authDomain: "project-management-syste-84bfa.firebaseapp.com",
  databaseURL: "https://project-management-syste-84bfa-default-rtdb.firebaseio.com",
  projectId: "project-management-syste-84bfa",
  storageBucket:  "project-management-syste-84bfa.appspot.com",
  messagingSenderId: "506422307727",
  appId: "1:506422307727:web:0e32ddcbe674942abb39fa",
  measurementId: "G-7ZBQPXKJPP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = {
  db,
  app,
  auth,
}

import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDPeDJsiXpLQ9LbcOAt81GaOxiK8cJaVuo",
  authDomain: "dev-united-sotillo-daniela.firebaseapp.com",
  projectId: "dev-united-sotillo-daniela",
  storageBucket: "dev-united-sotillo-daniela.appspot.com",
  messagingSenderId: "876257962989",
  appId: "1:876257962989:web:a2d9d6e88fb8a7a86b55e4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore();
//módulo de autenticación:
export const auth = firebase.auth();
//el proveedor de la autenticación:
export const provider = new firebase.auth.GoogleAuthProvider();
//la utilidad para hacer login con el pop-up:
export const loginConGoogle = () => auth.signInWithPopup(provider);
//la utilidad para hacer logout:
export const logout = () => auth.signOut();

// exporta el paquete de firebase para poder usarlo
export default firebase;
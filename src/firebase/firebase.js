import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB_jRlthKb30eUve6IVUq7nHjGeoD_l9_I",
    authDomain: "daniela-sotillo-dev-united.firebaseapp.com",
    projectId: "daniela-sotillo-dev-united",
    storageBucket: "daniela-sotillo-dev-united.appspot.com",
    messagingSenderId: "301822983438",
    appId: "1:301822983438:web:bba6e65f5d4cdbcbe4eb5f"
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
import firebase from 'firebase/app';
import 'firebase/firestore';

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
// exporta el paquete de firebase para poder usarlo
export default firebase;
// Importar las funciones necesarias de Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCKc4nDExcBzzI2HR8ISZR-g8nTLWTWPMM",
  authDomain: "llajtatour-57c11.firebaseapp.com",
  projectId: "llajtatour-57c11",
  storageBucket: "llajtatour-57c11.appspot.com",
  messagingSenderId: "172913904569",
  appId: "1:172913904569:web:39978e0542145d7dc28468"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export default db;





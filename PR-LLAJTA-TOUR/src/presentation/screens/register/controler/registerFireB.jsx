import { auth, db } from "../../../../../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (email, password, name) => {
  try {
    // Registrar al usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, 'User', user.uid), {
      userName: name,
      email: email,
      favorites: [],  // Inicializar con un arreglo vacío de favoritos
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Asegúrate de exportar tu instancia de auth
 
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Mantener el estado de carga mientras se espera la autenticación
 
  useEffect(() => {
    // Escuchar el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Si el usuario está autenticado, se establece en el estado
        setUser(firebaseUser);
      } else {
        // Si no hay usuario autenticado, el estado será null
        setUser(null);
      }
      setLoading(false); // Ya no está cargando
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);
 
  return { user, loading }; // Devolver usuario y estado de carga
};
 
export default useAuth;

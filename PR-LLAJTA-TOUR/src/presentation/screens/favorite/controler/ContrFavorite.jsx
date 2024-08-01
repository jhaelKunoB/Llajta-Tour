import { db } from "../../../../../database/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const getPlaceFavorite = async (userId) => {
  const userDoc = doc(db, "User", userId);
  const userSnapshot = await getDoc(userDoc);
  const places = userSnapshot.exists()
    ? userSnapshot.data().favorites || []
    : [];

  return places;
};

// Obtener detalles completos de lugares favoritos utilizando sus IDs
const getFavoritePlace = async (userId) => {
  try {
    const places = [];
    const getplaceID = await getPlaceFavorite(userId);

    console.log("Datos obtenidos:", getplaceID);

    if (getplaceID && getplaceID.length > 0) {
      const placesCollection = collection(db, "Place");

      // Dividir los IDs en lotes de 10
      const batchSize = 10;
      const batches = [];

      for (let i = 0; i < getplaceID.length; i += batchSize) {
        const batch = getplaceID.slice(i, i + batchSize);
        batches.push(batch);
      }

      // Ejecutar consultas por cada lote
      for (const batch of batches) {
        const q = query(placesCollection, where("__name__", "in", batch)); // __name__ es el ID del documento
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          places.push({ id: doc.id, ...doc.data() });
        });
      }
    } else {
      console.log("No se encontraron IDs de lugares favoritos.");
    }

    return places; // Devuelve los lugares completos

  } catch (error) {
    console.error("Error al obtener detalles de los lugares favoritos:", error);
    return [];
  }
};


export { getFavoritePlace };

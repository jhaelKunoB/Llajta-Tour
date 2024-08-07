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
    console.log("datos", getplaceID);
    if (getplaceID) {
      const placesCollection = collection(db, "Place");
      const q = query(placesCollection, where("__name__", "in", getplaceID)); // __name__ es el ID del documento

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        places.push({ id: doc.id, ...doc.data() });
      });
    }

    return places; // Devuelve los lugares completos
  } catch (error) {
    console.error("Error al obtener detalles de los lugares favoritos:", error);
    return [];
  }
};

export { getFavoritePlace };

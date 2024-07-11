import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import db from '../../../../../database/firebase'; // Importa la conexión a Firebase desde el archivo de configuración

export const fetchAllPlaces = async () => {
    try {
        const placeCollection = collection(db, 'Place');
        const placeSnapshot = await getDocs(placeCollection);
        let places = [];

        placeSnapshot.forEach(doc => {
            const placeData = doc.data();
            if (placeData.ImagesID && Array.isArray(placeData.ImagesID) && placeData.ImagesID.length > 0) {
                places.push({ ref: doc.ref, image: placeData.ImagesID[0] });
            }
        });

        return places;
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
};


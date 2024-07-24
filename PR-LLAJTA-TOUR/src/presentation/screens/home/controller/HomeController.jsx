import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import {db} from '../../../../../database/firebase'; // Importa la conexión a Firebase desde el archivo de configuración

export const fetchAllPlaces = async () => {
    try {
        const placeCollection = collection(db, 'Place');
        const placeSnapshot = await getDocs(placeCollection);
        let places = [];

        placeSnapshot.forEach(doc => {
            const placeData = doc.data();
            if (placeData.ImagesID && Array.isArray(placeData.ImagesID) && placeData.ImagesID.length > 0) {
                places.push({
                    ref: doc.ref,
                    image: placeData.ImagesID[0],
                    title: placeData.Name,
                    ubication: placeData.Address
                });
            }
        });

        return places;
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
};

export const fetchSomeCategories = async (limit = 4) => {
    try {
        const categoryCollection = collection(db, 'Category');
        const categorySnapshot = await getDocs(categoryCollection);
        let categories = [];

        categorySnapshot.forEach(doc => {
            const categoryData = doc.data();
            categories.push({
                id: doc.id,
                title: categoryData.Type,
                image: categoryData.ImageID
            });
        });

        // Filtra las primeras `limit` categorías
        return categories.slice(0, limit);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};


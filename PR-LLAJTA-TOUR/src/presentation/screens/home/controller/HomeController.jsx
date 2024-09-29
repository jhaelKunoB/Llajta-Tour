import { collection, getDocs, doc, getDoc, limit, orderBy, where, query } from 'firebase/firestore';
import {db} from '../../../../../database/firebase'; // Importa la conexión a Firebase desde el archivo de configuración

export const fetchAllPlaces = async () => {
    try {
        const placeCollection = collection(db, 'Place');
        
        const placesQuery = query(
            placeCollection,
            where('Type', '==', '1'),
            orderBy('Likes', 'desc'),
            limit(7)
        );

        const placeSnapshot = await getDocs(placesQuery);
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
        console.log(places)
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



export const fetchCategoryById = async (categoryId = 'fYx7LI8lqJHySQq9JD1K') => {
    try {
        const categoryDocRef = doc(db, 'Category', categoryId); // Referencia al documento específico
        const categoryDoc = await getDoc(categoryDocRef);

        if (categoryDoc.exists()) {
            const categoryData = categoryDoc.data();
            return {
                id: categoryDoc.id,
                title: categoryData.Type,
                image: categoryData.ImageID
            };
        } else {
            console.log("No such document!");
            return null; // O puedes retornar un objeto vacío si prefieres
        }
    } catch (error) {
        console.error("Error fetching category:", error);
        return null; // O un objeto vacío
    }
};

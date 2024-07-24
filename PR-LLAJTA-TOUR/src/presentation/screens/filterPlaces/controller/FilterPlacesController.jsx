import {db} from '../../../../../database/firebase';
import { getDocs, collection, query, where, doc } from 'firebase/firestore';

export const filterPlaces = async (categoryId) => {
    try {
        console.log("Filtering places with CategoryID:", categoryId);
        const categoryRef = doc(db, 'Category', categoryId);
        const placesRef = collection(db, 'Place');
        const q = query(placesRef, where('CategoryID', '==', categoryRef));
        const querySnapshot = await getDocs(q);
 
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return [];
        }

        const places = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Document data:", data); // Log para verificar los datos del documento
            places.push({
                id: doc.id,
                ...data,
                firstImage: data.ImagesID && data.ImagesID.length > 0 ? data.ImagesID[0] : null,
            });
        });

        console.log("Places array:", places); // Log para verificar el array de lugares
        return places;
    } catch (error) {
        console.error("Error fetching places:", error);
        throw error;
    }
};

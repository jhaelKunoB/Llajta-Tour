import {db} from '../../../../../database/firebase'
import { getDoc, doc, getDocs, collection } from 'firebase/firestore'



const fetchDocumentData = async (docRef) => {
    if (!docRef) return null;
    const doc = await getDoc(docRef);
    if (doc.exists()) {
      return { id: doc.id, ...doc.data()};
    }
    return null;
  };

  


const getAllPlaces = async () => {
    try {

        const querySnapshot = await getDocs(collection(db, 'Place'));

        const places = [];

        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
                const placeData = { id: doc.id, ...doc.data()
                };
                places.push(placeData);
            } else {
                console.log("No such document!");
            }
        });


        return places;
    } catch (error) {
        console.error("Error fetching places: ", error);
        throw error; // Asegúrate de manejar errores adecuadamente en tu aplicación
    }
}


  export {getAllPlaces}
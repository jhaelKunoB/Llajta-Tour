import { db } from "../../../../../database/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";


const fetchDocumentData = async (docRef) => {
  if (!docRef) return null;
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }; 
  }
  return null; 
};

// Función para obtener la ubicación de lugares
const placeLocation = async () => {
  const Places = collection(db, "Place"); 

  try {
    const querySnapshot = await getDocs(Places);
    const placesDoc = await Promise.all(
      querySnapshot.docs.map(async (document) => { 
        const data = document.data();
        const coordinates = data.Coordinates; 

     
        const latitude = coordinates?.latitude || '-17.3895';
        const longitude = coordinates?.longitude || '-66.1568';

        
         data.CategoryID = await fetchDocumentData(data.CategoryID);
       

        return {
          id: document.id,
          latitude,
          longitude,
          ...data,
        };
      })
    );

    console.info('se recupero todos los daos');

    return placesDoc;
  } catch (error) {
    console.error("Error al obtener los lugares de Firestore:", error);
    return [];
  }
};




const getCategory = async () => {

  const categoryCollection = collection(db, "Category");
  
  try {

    const querySnapshot = await getDocs(categoryCollection);
    
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.info('se recupero las categorias')

    return categories;
    
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}
export { placeLocation, getCategory };

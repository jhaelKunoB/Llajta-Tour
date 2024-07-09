import db from '../../../../../database/firebase'
import { getDoc, doc } from 'firebase/firestore'




const fetchDocumentData = async (docRef) => {
  if (!docRef) return null;
  const doc = await getDoc(docRef);
  if (doc.exists()) {
    return { id: doc.id, ...doc.data() };
  }
  return null;
};



const getPlace = async (placeID) => {
  try {

    const placeDoc = await getDoc(doc(db, 'Place', placeID));

    if (placeDoc.exists()) {
      const placeData = { id: placeDoc.id, ...placeDoc.data() };



      placeData.provinceID = await fetchDocumentData(placeData.provinceID);
      placeData.DepartmentID = await fetchDocumentData(placeData.DepartmentID);
      placeData.CategoryID = await fetchDocumentData(placeData.CategoryID);



      return placeData;

    } else {
      console.log("No such place!");
      return null;
    }

  } catch (error) {
    console.error("Error fetching places: ", error);
  }
}

export { getPlace }

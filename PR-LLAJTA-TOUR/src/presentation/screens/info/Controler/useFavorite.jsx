// hooks/useFavorites.js
import { useEffect, useState } from "react";

import { db } from "../../../../../database/firebase";
import UserAuth  from "../../../../../database/userAuth";



import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";




//--------------------------paraa favoritos-----------------------------------------
const getUserFavorites = async (userId) => {
    const userDoc = doc(db, "User", userId);
    const userSnapshot = await getDoc(userDoc);
    return userSnapshot.exists() ? userSnapshot.data().favorites || [] : [];
};

  
  const addFavorite = async (userId, placeId) => {
    const userDoc = doc(db, "User", userId);
    await updateDoc(userDoc, {
      favorites: arrayUnion(placeId),
    });
  };
  
  const removeFavorite = async (userId, placeId) => {
    const userDoc = doc(db, "User", userId);
    await updateDoc(userDoc, {
      favorites: arrayRemove(placeId),
    });
  };

  //----------------------------------------------------------------



const useFavorites = () => {

  const [favorites, setFavorites] = useState([]);
  const { user, loading } = UserAuth();

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const favs = await getUserFavorites(user.uid);
        setFavorites(favs);
        console.log('son los favoritos',favs)
      };

      fetchFavorites();
    }
  }, [user]);



  const toggleFavorite = async (placeId) => {
    console.log(placeId)
    if (favorites.includes(placeId)) {
      await removeFavorite(user.uid, placeId);
      setFavorites(favorites.filter((id) => id !== placeId));
    } else {
      await addFavorite(user.uid, placeId);
      setFavorites([...favorites, placeId]);
    }
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;

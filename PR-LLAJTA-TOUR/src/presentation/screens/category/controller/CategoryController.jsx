    import db from '../../../../../database/firebase'
    import { getDocs, collection } from 'firebase/firestore'

    export const fetchAllCategories = async () => {
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

            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    };
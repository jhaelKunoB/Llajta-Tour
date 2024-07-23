import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListCategories from '../../components/ListCategories';
import { fetchAllCategories } from '../category/controller/CategoryController';
import CategoryStyle from './styles/CategoryStyle';

const CategoryScreen = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await fetchAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryPress = (id) => {
        navigation.navigate('FilteredPlaces', { categoryId: id });
        console.log({categoryId: id})
    };

    return (
        <View style={CategoryStyle.container}>
            <ListCategories data={categories} onPress={handleCategoryPress} />
        </View>
    );
};

export default CategoryScreen;

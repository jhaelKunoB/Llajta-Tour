import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { filterPlaces } from './controller/FilterPlacesController';
import styles from './style/FilterPlacesStyle';

const FilteredPlaces = ({ route }) => {
    const { categoryId } = route.params;
    const [places, setPlaces] = useState([]);
    const navigation = useNavigation(); // Use navigation hook

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                console.log("Fetching places for categoryId:", categoryId);
                const placesData = await filterPlaces(categoryId);
                setPlaces(placesData);
                console.log("Places data set:", placesData);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchPlaces();
    }, [categoryId]);

    const handlePlacePress = (placeId) => {
        navigation.navigate('Info', { Id: placeId });
    };

    const renderPlaceItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.placeContainer} 
            onPress={() => handlePlacePress(item.id)} // Add onPress handler
        >
            <Image source={{ uri: item.firstImage }} style={styles.placeImage} />
            <Text style={styles.placeName}>{item.Name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={places}
                renderItem={renderPlaceItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default FilteredPlaces;

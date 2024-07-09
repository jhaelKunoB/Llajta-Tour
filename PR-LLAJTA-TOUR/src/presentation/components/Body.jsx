import React, { useEffect, useState } from 'react';
import { View, Image, useWindowDimensions, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BodyStyle from '../components/styles/BodyStyle';
import { fetchAllPlaces } from '../screens/home/controller/HomeController'; // Asegúrate de que la ruta sea correcta

const Body = () => {
    const { width } = useWindowDimensions();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const placesData = await fetchAllPlaces();
                setPlaces(placesData);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchPlaces();
    }, []);

    const handleImagePress = (docRef) => {
        console.log("Document Reference:", docRef.id);
    };

    return (
        <View style={BodyStyle.content}>
            <View style={BodyStyle.menu}>
                <View style={BodyStyle.menuItem}>
                    <Icon name="church" size={30} color="#6BBFB7" />
                    <Text>Plazas</Text>
                </View>
                <View style={BodyStyle.menuItem}>
                    <Icon name="home" size={30} color="#6BBFB7" />
                    <Text>Hoteles</Text>
                </View>
                <View style={BodyStyle.menuItem}>
                    <Icon name="landmark" size={30} color="#6BBFB7" />
                    <Text>Plazas</Text>
                </View>
                <View style={BodyStyle.menuItem}>
                    <Icon name="utensils" size={30} color="#6BBFB7" />
                    <Text>Comida</Text>
                </View>
            </View>
            <View>
                <Text style={BodyStyle.heading}>Lugares Para Ti</Text>
                <FlatList
                    data={places}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => handleImagePress(item.ref)}>
                                <View style={{ margin: 10, marginTop:0 }}>
                                    <Image source={{ uri: item.image }} style={BodyStyle.sliderImage} />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default Body;

import React, { useEffect, useState } from 'react';
import { View, Image, useWindowDimensions, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BodyStyle from '../components/styles/BodyStyle';
import { fetchAllPlaces, fetchSomeCategories } from '../screens/home/controller/HomeController'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';

const Body = () => {
    const { width } = useWindowDimensions();
    const [places, setPlaces] = useState([]);
    const [categories, setCategories] = useState([]);
    const nav = useNavigation();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const placesData = await fetchAllPlaces();
                console.log("Fetched places:", placesData); // Agrega esto para ver los datos
                setPlaces(placesData.filter(place => place.image)); // Filtrar lugares que tienen imagen
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoriesData = await fetchSomeCategories();
                console.log("Fetched categories:", categoriesData); // Agrega esto para ver los datos
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchPlaces();
        fetchCategories();
    }, []);

    const handleImagePress = (docRef) => {
        nav.navigate("Info", { Id: docRef.id });
    };

    const handleShowAllPress = () => {
        nav.navigate("Categorias");
    };

    const handleSearchFocus = () => {
        nav.navigate("SearchPlace");
    };

    return (
        <View style={{ marginBottom: 70 }}>
            <View style={{ marginLeft: 10 }}>
                <Text style={BodyStyle.headerText1}>Explora las maravillas de</Text>
                <Text style={BodyStyle.headerText1}>Cochabamba</Text>
            </View>
            <SearchBar
                placeholder="Buscar..."
                lightTheme
                round
                containerStyle={BodyStyle.searchBarContainer}
                inputContainerStyle={BodyStyle.inputContainer}
                leftIconContainerStyle={BodyStyle.leftIconContainer}
                rightIconContainerStyle={BodyStyle.rightIconContainer}
                searchIcon={{ type: 'font-awesome', name: 'search' }}
                clearIcon={{ type: 'font-awesome', name: 'usd' }}
                onFocus={handleSearchFocus}
            />
            <View style={BodyStyle.headerContainer}>
                <Text style={BodyStyle.headerText}>Lugares Favoritos</Text>
            </View>
            <FlatList
                data={places}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleImagePress(item.ref)}>
                        <View style={{ margin: 10, marginTop: 0 }}>
                            <Image source={{ uri: item.image }} style={BodyStyle.sliderImage} />
                            <View style={BodyStyle.textContainer}>
                                <Text style={BodyStyle.title}>{item.title}</Text>
                                <View style={BodyStyle.locationContainer}>
                                    <Icon name="map-marker-alt" size={16} color="gray" style={BodyStyle.locationIcon} />
                                    <Text style={BodyStyle.text}>{item.ubication}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />

            <View style={BodyStyle.headerContainer}>
                <Text style={BodyStyle.headerText}>Algunas categorías</Text>
                <TouchableOpacity onPress={handleShowAllPress}>
                    <Text style={BodyStyle.showAllText}>Mostrar todo</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleImagePress(item.ref)}>
                        <View style={BodyStyle.categoryCard}>
                            <Image source={{ uri: item.image }} style={BodyStyle.categoryImage} />
                            <Text style={BodyStyle.categoryTitle}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Body;

import React, { useEffect, useState } from 'react';
import { View, Image, useWindowDimensions, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { fetchAllPlaces, fetchSomeCategories } from '../screens/home/controller/HomeController';
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
                console.log("Fetched places:", placesData);
                setPlaces(placesData.filter(place => place.image));
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoriesData = await fetchSomeCategories();
                console.log("Fetched categories:", categoriesData);
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

    const handleCategoryPress = (id) => {
        nav.navigate('FilteredPlaces', { categoryId: id });
        console.log({ categoryId: id });
    };

    const handleSearchFocus = () => {
        nav.navigate("SearchPlace");
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategoryPress(item.id)} style={BodyStyle.ContImagCat}>
            <ImageBackground source={{ uri: item.image }} style={BodyStyle.categoryCard} imageStyle={{ borderRadius: 20 }}>
                <View style={BodyStyle.categoryOverlay}>
                    <Text style={BodyStyle.categoryTitle}>{item.title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginBottom: 70 }}>
            <View style={{ marginHorizontal:23, marginTop:20}}>
                <Text style={BodyStyle.headerText1}>Explora la diversidad de</Text>
               <Text style={BodyStyle.headerText2}>Cochabamba</Text>
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
                <Text style={BodyStyle.headerText}>Destinos Imprescindibles</Text>
            </View>

            <FlatList
                data={places}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleImagePress(item.ref)}>
                        <View style={BodyStyle.carouselItem}>
                            <Image source={{ uri: item.image }} style={BodyStyle.sliderImage} />
                            <View style={BodyStyle.textContainer}>
                                <Text style={BodyStyle.title}>{item.title}</Text>
                                <View style={BodyStyle.locationContainer}>
                                    <Icon name="map-marker-alt" size={16} color="#164863" style={BodyStyle.locationIcon} />
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
                <Text style={BodyStyle.headerText}>Categorías Más Populares</Text>
                <TouchableOpacity onPress={handleShowAllPress}>
                    <Text style={BodyStyle.showAllText}>Mostrar todo</Text>
                </TouchableOpacity>
            </View>

                <View style={{marginHorizontal:13, marginBottom:25}}>
                <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={renderCategoryItem}
                showsVerticalScrollIndicator={false}/>
                </View>
           
        </View>
    );
};

export default Body;

const BodyStyle = StyleSheet.create({
    headerText1: {
        fontSize: 25,
        fontWeight: '500',
        color: '#11394f',
    },
    headerText2:{
        fontSize: 25,
        fontWeight: '500',
        color:'#365486'
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginHorizontal:10,
        marginVertical:15,
    },
    inputContainer: {
        backgroundColor: 'rgb(235, 244, 246)',
        borderRadius: 20,
        height: 50,
    },
    leftIconContainer: {
        marginLeft: 10,
    },
    rightIconContainer: {
        marginRight: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 6,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#11394f',    
    },
    carouselItem: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#11394f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        backgroundColor: 'rgb(235, 244, 246)',
        marginHorizontal: 15,
        marginBottom:18
    },
    sliderImage: {
        width: 280,
        height: 360,
        borderRadius: 20,
    },
    textContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 15,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#164863',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationIcon: {
        marginRight: 5,
    },
    text: {
        fontSize: 15,
    },
    showAllText: {
        fontSize: 15,
        color: '#7FC7D9',
        fontWeight:'300',
        borderBottomWidth:1,
        borderColor:'#365486'
    },
    categoryCard: {
        width: '100%',
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        shadowColor: '#0F1035',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    categoryOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 20,
        padding: 10,
        width:'100%'
    },
    categoryTitle: {
        textAlign:'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    ContImagCat: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',  
        marginHorizontal:5,
    },
});


import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, Image } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import PlaceCards from './Component/CartsImages'
import CartName from './Component/CartsName'

import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from "./styles/FindPlacesStyle";
import ImgSearch from './assets/Losearch.gif'


import { getAllPlaces } from './Controler/firebaseSerch';





const SearchPlace = () => {

    const navigation = useNavigation();

    const [searchText, setSearchText] = useState('')
    const [placeData, setPlaceData] = useState(null)


    const [placefind, setPlaceFind] = useState([])
    const [isName, setName] = useState([])

    const handleSearch = async (searchText) => {
        setSearchText(searchText);
        setPlaceFind([]);
        if (placeData && searchText !== "") {
            const searchTextUpper = searchText.toUpperCase();
            const filteredPlaces = placeData.filter(item => {
                const placeNameUpper = item.Name.toUpperCase();
                return placeNameUpper.includes(searchTextUpper);
            });

            const placeNames = filteredPlaces.map(item => ({
                id: item.id,
                name: item.Name,
            }));
            setName(placeNames);
        } else {
            setName([]);
        }
    };

    const handleSearchSubmit = async () => {
        if (placeData && searchText !== "") {
            const searchTextUpper = searchText.toUpperCase();
            const filteredPlaces = placeData.filter(item => {
                const placeNameUpper = item.Name.toUpperCase();
                return placeNameUpper.includes(searchTextUpper);
            });
            setPlaceFind(filteredPlaces);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const places = await getAllPlaces();
                setPlaceData(places);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={styles.SearchBarContainer}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={wp('9%')} color="#213555" style={{ textAlign: 'center' }} />
                    </TouchableOpacity>
                </View>

                <SearchBar
                    placeholder="Buscar..."
                    onChangeText={handleSearch}
                    onSubmitEditing={handleSearchSubmit}

                    value={searchText}
                    cancelButtonTitle="Cancelar"
                    round
                    inputContainerStyle={styles.InputContainer}
                    containerStyle={styles.ContainerStyle}
                />
            </View>

            <ScrollView style={styles.SearchBarConten}>
                <View style={styles.CotnCarts}>

                    {placefind.length > 0 ? (
                        <PlaceCards data={placefind} />
                    ) : isName.length > 0 ? (
                        <CartName Names={isName} />
                    ) : (
                        <View>
                            <Image source={ImgSearch} style={styles.ContImgSerach}></Image>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>

    )
}
export default SearchPlace







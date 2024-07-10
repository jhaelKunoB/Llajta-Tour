import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements';
import PlaceCards from '../../components/PlaceCards'
import FindPlacesStyle from "./styles/FindPlacesStyle";

import { useNavigation } from "@react-navigation/native";
import { getAllPlaces } from './Controler/firebaseSerch';


const SearchPlace = () => {

    const navigation = useNavigation();

    const [searchText, setSearchText] = useState('')
    const [placeData, setPlaceData] = useState(null)
    const [placefind, setPlaceFind] = useState([])

    const handleSearch = (searchText) => {
        setSearchText(searchText)
        setPlaceFind([])

        if(placeData){
            const searchTextUpper = searchText.toUpperCase();
            const filteredPlaces = placeData.filter(item => {
                const placeNameUpper = item.Name.toUpperCase();
                return placeNameUpper.includes(searchTextUpper); 
            });
            setPlaceFind(filteredPlaces);
            console.log('Texto de búsqueda:', searchText);
        }
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const places = await getAllPlaces(); // Esperar la respuesta de getAllPlaces
                setPlaceData(places);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, []);



    return (
        <ScrollView style={FindPlacesStyle.SearchBarConten}>
            <SearchBar
                placeholder="Buscar..."
                onChangeText={handleSearch}
                value={searchText}
                cancelButtonTitle="Cancelar"
                round
                showLoading
                inputContainerStyle={FindPlacesStyle.InputContainer}
                containerStyle={FindPlacesStyle.ContainerStyle}
            />
            
            {placefind && placefind.length > 0 && (  
                    placefind.map(Item => (
                        <TouchableOpacity onPress={() => [navigation.navigate('Info',{ Id: Item.id}),console.log(Item)]}>
                            <PlaceCards data={Item} />
                        </TouchableOpacity>
                    ))
            )}

        </ScrollView>
    )
}
export default SearchPlace






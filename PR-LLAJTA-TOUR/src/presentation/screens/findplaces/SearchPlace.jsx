import React, { useState } from "react";
import { View, ScrollView } from 'react-native'
import { SearchBar } from 'react-native-elements';
import PlaceCards from '../../components/PlaceCards'
import FindPlacesStyle from "./styles/FindPlacesStyle";


const SearchPlace = () => {

    const [searchText, setSearchText] = useState('');
    const handleSearch = (searchText) => {
        setSearchText(searchText)
        console.log('Texto de búsqueda:', searchText);
    };

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
             <PlaceCards/>
             <PlaceCards/>
             <PlaceCards/>
             <PlaceCards/>
        </ScrollView>
    )
}
export default SearchPlace



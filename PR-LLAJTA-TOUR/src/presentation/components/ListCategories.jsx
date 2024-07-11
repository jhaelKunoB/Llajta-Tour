import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import ListCategoriesStyles from '../components/styles/ListCategoriesStyle';

const ListCategories = ({ data, onPress }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onPress(item.id)}>
            <View style={ListCategoriesStyles.itemContainer}>
                <Image source={{ uri: item.image }} style={ListCategoriesStyles.image} />
                <View style={ListCategoriesStyles.textContainer}>
                    <Text style={ListCategoriesStyles.title}>{item.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
};

export default ListCategories;

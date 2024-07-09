import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import CategoryStyle from './styles/CategoryStyle';
import { useNavigation } from '@react-navigation/native';
const CategoryScreen =() => {
    const navigation = useNavigation()
    return (
        <View style={CategoryStyle.Background}>
            <Text>Category Screen</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Info') }>
                   <Text>Info</Text>
                </TouchableOpacity>  
        </View>
    );
};

export default CategoryScreen;

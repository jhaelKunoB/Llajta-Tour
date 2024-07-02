import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeStyle from './styles/HomeStyle';

import Header from '../../components/Header'

const HomeScreen =() => {

    const navigation = useNavigation()
    return (
        <ScrollView>
           <View style={HomeStyle.Background}>
                <Header/>
                <View style={HomeStyle.Message}>
                    <Text style={HomeStyle.TextMessage}>Where do 🌏</Text>
                    <Text style={HomeStyle.TextMessage}>you want to go?</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchPLace') }>
                   <Text>Search Lugares</Text>
                </TouchableOpacity>   
           </View>
        </ScrollView>
    );
};
export default HomeScreen

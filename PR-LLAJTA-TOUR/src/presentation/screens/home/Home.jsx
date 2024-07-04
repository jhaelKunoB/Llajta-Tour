import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import HomeStyle from './styles/HomeStyle';

import Header from '../../components/Header'
import Body from '../../components/Body';

const HomeScreen =() => {

    return (
        <ScrollView>
           <View style={HomeStyle.Background}>
                <Header/>
                <Body/>
           </View>
        </ScrollView>
    );
};
export default HomeScreen

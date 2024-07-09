import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import HomeStyle from './styles/HomeStyle';

import Header from '../../components/Header';
import Body from '../../components/Body';

const HomeScreen = () => {
    return (
        <ScrollView style={HomeStyle.container}>
            <View style={HomeStyle.background}>
                <Header />
                <Body />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

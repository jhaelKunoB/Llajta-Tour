import React from 'react';
import { ScrollView, View, Image, useWindowDimensions, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated';
import BodyStyle from '../components/styles/BodyStyle';

const images = [
    "https://unifranz.edu.bo/wp-content/uploads/2023/09/1-8.jpeg",
    "https://www.la-razon.com/wp-content/uploads/2023/02/06/20/5c8923bb-c1c5-4ff7-9daf-3b0f826c26ab.jpg",
    "https://www.civitatis.com/f/bolivia/cochabamba/free-tour-cochabamba-589x392.jpg",
    "https://www.la-razon.com/wp-content/uploads/2023/02/01/20/24ad1f20-fe89-4c0a-a65f-4b36a0af5c6a-1024x768.jpg",
    "https://www.abi.bo/images/historico_1/ccba8.jpg"
];

const Body = () => {

    const { width } = useWindowDimensions();
    const SIZE = width * 0.7;
    const SPACER = (width - SIZE) / 2;
    const newData = [{ key: 'spacer-left' }, ...images, { key: 'spacer-right' }];
    const x = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });

    return (
        <View style={BodyStyle.content}>
            <View style={BodyStyle.menu}>
                <View style={BodyStyle.menuItem}>
                    <Icon name="church"  size={30} color="#6BBFB7" />
                    <Text>Plazas</Text>
                </View>
                <View style={BodyStyle.menuItem}>
                    <Icon name="home"  size={30} color="#6BBFB7" />
                    <Text>Hoteles</Text>
                </View>
                <View style={BodyStyle.menuItem}>
                    <Icon name="landmark" size={30} color="#6BBFB7" />
                    <Text>Plazas</Text>
                </View>
                <View style={BodyStyle.menuItem}>
                    <Icon name="utensils" size={30} color="#6BBFB7" />
                    <Text>Comida</Text>
                </View>

            </View>
            <View>
                <Text style={BodyStyle.heading}>Lugares Para Ti</Text>
                <FlatList
                    data={images}
                    keyExtractor={(item) => item}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginRight: 20 }}>
                                <Image source={{ uri: item }} style={BodyStyle.sliderImage} />
                            </View>
                        );
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default Body;

import React from 'react';
import { ScrollView, View, Image, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated';
import BodyStyles from '../components/styles/BodyStyle';

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
        <View>
            <View style={BodyStyles.menu}>
                <Icon name="search" type="font-awesome" size={30} color="#000" />
                <Icon name="plane" type="font-awesome" size={30} color="#000" />
                <Icon name="hotel" type="font-awesome" size={30} color="#000" />
                <Icon name="ticket" type="font-awesome" size={30} color="#000" />
            </View>
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
                snapToInterval={SIZE}
                decelerationRate="fast"
                onScroll={onScroll}
                style={{ paddingTop: 10, backgroundColor: 'white' }}>
                {newData.map((item, index) => {

                    const style = useAnimatedStyle(() => {
                        const scale = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [0.8, 1, 0.8],
                        );
                        return {
                            transform: [{ scale }],
                        };
                    });

                    if (item.key) {
                        return <View style={{ width: SPACER }} key={index} />;
                    }
                    return (
                        <View style={{ width: SIZE }} key={index}>
                            <Animated.View style={[BodyStyles.imageContainer, style]}>
                                <Image
                                    source={{ uri: item }}
                                    style={BodyStyles.image}
                                />
                                <View style={BodyStyles.textContainer}>
                                    <Text style={BodyStyles.text}>Hola</Text>
                                </View>
                            </Animated.View>
                        </View>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
};

export default Body;




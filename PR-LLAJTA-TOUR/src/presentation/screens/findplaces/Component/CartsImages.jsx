import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ImgSearch from '../assets/loading.gif'

import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/CartStyle'



const CartsImages = ({ data }) => {
    const navigation = useNavigation();
    const [isImages, setImages] = useState([]);

    const [isImages2, setImages2] = useState([[], []]);

    useEffect(() => {
        if (data) {
            setImages(data);

            if (data.length > 0) {
                const columns = [[], []];
                data.forEach((item, index) => {
                    columns[index % 2].push(item);
                });
                setImages2(columns);
            }
            console.log('Columna1', isImages2[0])
            console.log('columnna2', isImages2[1])
        }
    }, [data]);

    const getImageHeight = (index) => (index % 2 === 0 ? 160 : 255);
    const getImageHeight1 = (index) => (index % 2 === 0 ? 260 : 150);

    return (


        <View style={{ width: '100%' }}>

            {data && isImages.length > 0 ? (

                <View style={styles.container}>

                    <View style={styles.column}>
                        {isImages2[0].map((item, index) =>
                            <TouchableOpacity onPress={() => navigation.navigate('Info', { Id: item.id })} style={styles.item} key={item.id}>
                                <ImageBackground source={{ uri: item.ImagesID[0] }} style={[styles.image, { height: getImageHeight(index) }]} resizeMode='cover' borderRadius={15}>
                                    <LinearGradient colors={['rgba(41, 42, 42, 1)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)',]} start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} style={styles.linerStyle}>
                                        <View style={styles.ContText}>
                                            <View style={styles.backContText}>
                                                <Text style={styles.imageText}>{item.Name}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.column}>
                        {isImages2[1].map((item, index) =>

                            <TouchableOpacity onPress={() => navigation.navigate('Info', { Id: item.id })} style={styles.item} key={item.id}>
                                <ImageBackground source={{ uri: item.ImagesID[0] }} style={[styles.image, { height: getImageHeight1(index) }]} resizeMode='cover' borderRadius={15}>
                                    <LinearGradient colors={['rgba(41, 42, 42, 1)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)',]} start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} style={styles.linerStyle}>
                                        <View style={styles.ContText}>
                                            <View style={styles.backContText}>
                                                <Text style={styles.imageText} numberOfLines={2} >{item.Name}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            ) : (
                <View style={styles.contImagLoa}>
                    <Image source={ImgSearch} style={styles.ContImgSerach} resizeMode={'contain'}></Image>
                </View>
            )}
        </View>
    );
};

export default CartsImages;

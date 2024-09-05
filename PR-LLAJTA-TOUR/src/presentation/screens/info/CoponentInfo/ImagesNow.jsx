import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ImaNot from '../assets/Nodata.gif'
import ImgModal from './ModaImage'

const ImageNow = ({ data }) => {
    const [placeData, setPlaceData] = useState(null);

    useEffect(() => {
        if (data) {
            setPlaceData(data);
        }
    }, [data]);

    if (!placeData) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} nestedScrollEnabled={true} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.imageList}>
                    {placeData && placeData.ImagesID ? (
                        placeData.ImagesID.map((image, index) => (
                            <View key={index} style={styles.imageItem}>
                                <ImgModal img={image} />
                            </View>
                        ))
                    ) : (
                        <View style={{}}>
                            <Image style={{ width: '70%', height: '100%' }} source={ImaNot} ></Image>
                        </View>
                    )}
                </View>
            </ScrollView>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        marginHorizontal: wp('5%')
    },
    scrollViewContent: {
        minWidth: wp('100%'),
      //  height: 140,
        marginVertical: hp('1%')
    },
    imageList: {
        flexDirection: 'row',
        height: Platform.select({
            ios: hp('10%'),
            android: hp('10%'),
<<<<<<< HEAD
            web:hp('25%')
        })
    },
    imageItem: {
        marginHorizontal: wp('2%'),
        borderRadius: 10,
        overflow: 'hidden',
        height:80
=======
            web:hp('10%')
        }),
       
>>>>>>> main
    },
});

export default ImageNow;

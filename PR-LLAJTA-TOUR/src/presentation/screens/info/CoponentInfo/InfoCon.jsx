import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'pinar'
import { FontAwesome } from '@expo/vector-icons';

import ImaNot from '../assets/Nodata.gif'
<<<<<<< HEAD
=======
//import ImgLong from '../assets/loading copy.gif'
const ImgLong = require('../assets/loading copy.gif')
>>>>>>> main

const InfoCon = ({ data }) => {

    const [activeComponent, setActiveComponent] = useState('Component1');
    const [activeBotom, setActiveBotom] = useState(true);
    const [placeData, setplaceData] = useState([])
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        if (data) {
            setplaceData(data)
        }
    }, [data]);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };


    const renderComponent = (component) => {
        switch (component) {
            case 'Component1':
                return (
                    <ScrollView style={styles.ContDescription} nestedScrollEnabled={true}>
                        <LinearGradient colors={['rgba(155, 190, 200,1)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.GradientDes}>
                            <View style={styles.ContCityTitlle}>
                                <Text style={styles.titlleDes}>{placeData.Name}</Text>
                            </View>
                            <Text style={styles.descriptionText} numberOfLines={showFullDescription ? undefined : 5} >{placeData.Description}</Text>

                            <View style={styles.conteArrow}>
                                <TouchableOpacity onPress={toggleDescription}>
                                    <FontAwesome style={styles.toggleButton} name={showFullDescription ? 'arrow-up' : 'arrow-down'} />
                                </TouchableOpacity>
                            </View>


                        </LinearGradient>
                    </ScrollView>
                );
            case 'Component2':
                return (
                    <View style={styles.containCarusel}>
                        <Carousel showsControls={false} dotStyle={styles.iconCarusel} activeDotStyle={[styles.iconCarusel, styles.ActiveDot]} style={styles.carusel}>

                            {placeData && placeData.OldImagesID && placeData.OldImagesID.length > 0 ? (
<<<<<<< HEAD
                                placeData.OldImagesID.map(item =>
                                    <Image style={styles.ImageCarusel} source={{ uri: item }} key={item} />
=======
                                placeData.OldImagesID.map(item => 
                                           <Image style={styles.ImageCarusel} source={{ uri: item }} key={item}   defaultSource={ImgLong} />                                  
>>>>>>> main
                                )
                            ) : (
                                <View style={{ alignItems:'center'}}>
                                    <Image style={{ width: '50%', height: '90%' }} source={ImaNot} ></Image>
                                </View>
                            )}
                        </Carousel>
                    </View>
                );
            default:
                return null;
        }
    };

    
    return (
        <View style={styles.container}>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => [setActiveComponent('Component1'), setActiveBotom(true)]} style={activeBotom ? styles.button : styles.cont}>
                    <Text style={styles.txtItem}>Descripcion</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => [setActiveComponent('Component2'), setActiveBotom(false)]} style={activeBotom ? styles.cont : styles.button}>
                    <Text style={styles.txtItem}>Retratos del Pasado</Text>
                </TouchableOpacity>
            </View>

            {/* para mayor detalles */}
            <View style={styles.ContentRender}>
                {activeComponent && renderComponent(activeComponent)}
            </View>
        </View>
    )
}
export default InfoCon



const styles = StyleSheet.create({

    container: {
        marginTop: hp('4%')
    },

    //para la flecha
    toggleButton: {
        color: '#164863',
        width: wp('10%'),
        backgroundColor: '#DCF2F1',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: wp('6%'),
        padding: 5
    },
    conteArrow: {
        alignItems: 'flex-end',
        paddingBottom: hp('1%'),
        paddingRight: wp('3%')
    },
    //-------------------




    ActiveDot: {
        backgroundColor: '#6BBFB7'
    },


    iconCarusel: {
        width: 20,
        height: 7,
        backgroundColor: 'silver',
        marginHorizontal: 3,
        borderRadius: 3
    },

    containCarusel: {
        height: wp('70%'),
        marginHorizontal: wp('5%')
    },

    carusel: {
        width: '100%',
        height: '100%',
    },

    ImageCarusel: {
        height: '100%',
        width: '100%',
        borderRadius: 22
    },

    ContentRender: {
        marginBottom: 10
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
        marginHorizontal: wp('6%')
    },

    //para el boton
    button: {
        borderBottomWidth: 3,
        borderBottomColor: '#427D9D',
        borderRadius: 5,
        marginHorizontal: wp('2%')
    },
    cont: {
        marginHorizontal: wp('2%')
    },
    txtItem: {
        fontSize: wp('4%')
    },


    ContDescription: {
        maxHeight: hp('50%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('6%'),
        backgroundColor: 'white',
        borderRadius: wp('4%'),
    },

    descriptionText: {
        paddingTop: hp('0.5%'),
        paddingHorizontal: wp('1%'),
        paddingBottom: hp('1%'),
        fontSize: wp('4%'),
        lineHeight: hp('3.2%'),
        textAlign: 'justify',
        fontWeight: '300'
    },

    GradientDes: {
        borderBottomRightRadius: wp('5%'),
        borderBottomLeftRadius: wp('5%')
    },

    ContCityTitlle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    titlleDes: {
        paddingHorizontal: wp('1%'),
        fontSize: wp('4.5%'),
        fontWeight: '800',
        color: '#164863',
    },


})
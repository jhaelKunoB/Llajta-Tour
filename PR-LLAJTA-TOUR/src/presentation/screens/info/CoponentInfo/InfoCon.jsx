import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from'expo-linear-gradient';
import Carousel from 'pinar'

const InfoCon = ({data}) => {

    const [activeComponent, setActiveComponent] = useState('Component1');
    const [activeBotom, setActiveBotom] = useState(true);
    const [placeData, setplaceData] = useState([])

    useEffect(() => {
        if (data) {
            setplaceData(data)
        }
    }, [data]);

    const renderComponent = (component) => {
        switch (component) {
            case 'Component1':
                return (
                    <ScrollView style={styles.ContDescription} nestedScrollEnabled={true}>
                        <LinearGradient colors={['rgba(84, 119, 117, 1)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)',]}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.GradientDes}>
                            <View style={styles.ContCityTitlle}>                         
                                <Text style={styles.titlleDes}>{placeData.Name}</Text>
                            </View>
                            <Text style={styles.descriptionText}>{placeData.Description}</Text>
                        </LinearGradient>
                    </ScrollView>
                );
            case 'Component2':
                return (
                    <View style={styles.containCarusel}>
                        <Carousel showsControls={false} dotStyle={styles.iconCarusel} activeDotStyle={[styles.iconCarusel,styles.ActiveDot]} style={styles.carusel}>
                                {placeData.OldImagesID.map(item => 
                                    <Image style={styles.ImageCarusel} source={{uri: item}} key={item}></Image>
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
                    <Text style={styles.txtItem}>DESCRIPCION</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => [setActiveComponent('Component2'), setActiveBotom(false)]} style={activeBotom ? styles.cont : styles.button}>
                    <Text style={styles.txtItem}>IMÁGENES DE ÉPOCA</Text>
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

    ActiveDot:{
        backgroundColor:'#6BBFB7'
    },

    iconCarusel:{
        width:20,
        height:7,
        backgroundColor:'silver',
        marginHorizontal:3,
        borderRadius:3
    },

    containCarusel:{
        height:wp('70%'),
        marginHorizontal:wp('5%')
    },

    carusel:{
        width:'100%',
        height:'100%',
    },

    ImageCarusel:{
        height:'100%',
        width:'100%',
        borderRadius:22
    },

    ContentRender: {
       marginBottom:10
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },

    button: {
        padding: 1,
        borderBottomColor: '#547775',
        borderBottomWidth: 1,
    },

    txtItem: {
        fontSize: wp('4%')
    },

    ContDescription: {
        maxHeight: hp('44%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('6%'),
        backgroundColor: '#c9e0d9',
        borderRadius: wp('5%'),
    },

    descriptionText: {
        paddingTop: hp('1%'),
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('6%'),
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

    CityDess: {
        textAlign: 'right',
        paddingRight: 10,
        color: '#ffffff'
    },

    titlleDes: {
        paddingTop: hp('2%'),
        paddingHorizontal: wp('4%'),
        fontSize: wp('5%'),
        fontWeight: '800',
        color: '#639a8a',
    },


})
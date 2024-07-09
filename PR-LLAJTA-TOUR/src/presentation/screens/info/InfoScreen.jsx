import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';



import InfoCon from './CoponentInfo/InfoCon'
import ImageNow from './CoponentInfo/ImagesNow'
import AudioInfo from './CoponentInfo/AudioInfo'

import { getPlace } from './Controler/firebaseService'//para poder conectar con fire base




const InfoScreen = () => {

    const navigation = useNavigation()
    const video = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [placeData, setPlaceData] = useState(null); //definimos una variable para al macenar el Lugar
    const [isLoading, setIsLoading] = useState(true); 
    const route = useRoute();
    const { Id } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPlace(Id);
                setPlaceData(data);
                setIsLoading(false); // Marcar la carga como completa
                console.log("datos", data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);



      // Mostrar indicador de carga mientras se obtienen los datos
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color="blue" />
            </View>
        );
    }


    //para pausar o play
    const togglePlayPause = () => {

        if (video.current) {
            if (isPlaying) {
                video.current.pauseAsync();
            } else {
                video.current.playAsync();
            }
        }
    };


    return (
        <ScrollView style={styles.Container} nestedScrollEnabled={true}>

            <View style={styles.ContVideo}>
                <Video ref={video}
                    source={{ uri: placeData.Video}}
                    resizeMode={ResizeMode.STRETCH}
                    isLooping
                    volume={0.1}
                    //shouldPlay
                    onPlaybackStatusUpdate={status => {
                        if (status.isPlaying !== undefined) {
                            setIsPlaying(status.isPlaying);
                        }
                    }}
                    style={styles.VideoStyle}></Video>


                <LinearGradient style={styles.overlay}
                    colors={['rgba(41, 42, 42, 0.8)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)',]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 1, y: 0 }}>

                    <View style={styles.ContBack}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" style={styles.IconBack} size={wp('9%')} color="#8dbba0" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.conteCityPlay}>
                        <View style={styles.TextCity}>
                                <Text style={{color:'white'}}>{placeData.DepartmentID.Name} - {placeData.provinceID.Name}</Text>
                        </View>

                        <View style={styles.ContplayIcon}>
                            <TouchableOpacity onPress={() => togglePlayPause()}>
                                <Ionicons name={isPlaying ? "pause-circle-sharp" : "play-circle-sharp"} style={styles.IconPlay} color={'#009194'} size={wp('10%')} />
                            </TouchableOpacity>
                        </View>
                    </View >
                </LinearGradient>
            </View>

            <View style={styles.contTittle}>
                <Text style={styles.textTittle}>{placeData.Name}</Text>
            </View>

            <View style={styles.contLocation}>
                <View style={styles.txtDireccion}>
                    <Ionicons name='location' color={'#070743'} size={20} />
                    <Text style={styles.direccionTxt}>{placeData.Address}</Text>
                </View>
                <View style={styles.txtDireccion}>
                    <Ionicons name='time' color={'#070743'} size={20} />
                    <Text style={styles.timeTxt}> 
                    {placeData.Hours ? (
                        `${placeData.Hours.Lunes.HourOpen} - ${placeData.Hours.Lunes.HourClose}`
                    ) : (
                        <Ionicons name="infinite-sharp" size={24} color="black" />
                    )}
                     </Text>
                </View>
            </View>


            <View style={styles.separator} />
            {/* para el Audio */}
            <AudioInfo data={placeData}/>
            {/* para mostar los datos */}
             <InfoCon data={placeData} />   
            {/* para las Imagens de Haora */}
              <ImageNow data={placeData} />
        </ScrollView>
    );
};

export default InfoScreen

const styles = StyleSheet.create({

    separator: {
        borderBottomColor: '#547775',
        borderBottomWidth: 2,
        marginHorizontal: hp('3%'),
        marginVertical: hp('1%'),
    },


    //para la carga
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //para el video
    Container: {
        backgroundColor: 'white'
    },
    ContVideo: {
        position: 'relative',
    },
    VideoStyle: {
        width: '100%',
        height: hp('35%'),
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomLeftRadius: wp('8%'),
        borderBottomRightRadius: wp('8%')
    },

    ContBack: {
        flex: 1,
        alignItems: 'flex-start'
    },

    conteCityPlay: {
        flexDirection: 'row',
    },

    ContplayIcon: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    IconPlay: {
        backgroundColor: 'white',
        borderRadius: wp('3%'),
        marginHorizontal: wp('6%'),
        marginVertical: wp('4%')
    },

    IconBack: {
        marginHorizontal: wp('4%'),
        marginVertical: wp('10%')
    },

    TextCity:{
        flex:1,
        justifyContent:"flex-end",
        paddingLeft:wp('5%'),
        paddingBottom:wp('4%')
    },

    //backgroundColor: 'rgba(54, 98, 115, 0.9)',


    //-----------------------------------------------------------------------------------------

    //estilos para el titulo
    contTittle: {
        marginTop: wp('4%'),
        marginHorizontal: wp('5%'),
    },

    textTittle: {
        color: '#1c5560',
        fontSize: wp('8%'),
        fontWeight: '600',
    },



    //para la localisacion y la Hora
    contLocation: {
        flexDirection:'row',
        marginHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
    },

    txtDireccion: {
        flexDirection: 'row',
        backgroundColor: '#e8f9f3',
        borderRadius: wp('4%'),
        padding: wp('2%'),
        alignItems: 'center',
        marginHorizontal: wp('1%')
    },

    direccionTxt: {
        fontSize: wp('3%'),
        marginLeft: wp('2%'),
        color:'#08445a'
    },

    timeTxt: {
        fontSize: wp('3%'),
        marginLeft: wp('2%'),
        color:'#08445a'
    },




})


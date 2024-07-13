import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Loandin from './assets/loading.gif'



import Calendar from './CoponentInfo/Calendar'
import InfoCon from './CoponentInfo/InfoCon'
import ImageNow from './CoponentInfo/ImagesNow'
import AudioInfo from './CoponentInfo/AudioInfo'
import { getPlace } from './Controler/firebaseService'




const InfoScreen = () => {

    const navigation = useNavigation()
    const video = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isFavorite, setFavorite] = useState(false)


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
                console.error("Error al obtener los datos");
                setIsLoading(true);
            }
        };
        fetchData();
    }, []);



    // Mostrar indicador de carga mientras se obtienen los datos
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Image source={Loandin}></Image>
            </View>
        );
    }



    const toggleMute = () => {
        if (video.current) {
            setIsMuted(prevIsMuted => {
                video.current.setIsMutedAsync(!prevIsMuted);
                return !prevIsMuted;
            });
        }
    };

    const SetCalendar = (data) => {
        console.log('estos son las hora', data)
    }




    return (
        <ScrollView style={styles.Container} nestedScrollEnabled={true}>

            <View style={styles.ContVideo}>

                {placeData && placeData.Video ? (

                    <Video ref={video}
                        source={{ uri: placeData.Video }}
                        resizeMode={ResizeMode.STRETCH}
                        isLooping
                        volume={0.3}
                        shouldPlay
                        setIsMuted={true}
                        isMuted={isMuted}
                        style={styles.VideoStyle}></Video>
                ) : (
                    <View style={styles.VideoStyle}>
                        <Image source={{ uri: placeData.ImagesID[0] }} resizeMode='cover' style={{ width: '100%', height: '100%' }}></Image>
                    </View>
                )}


                <LinearGradient style={styles.overlay}
                    colors={['rgba(41, 42, 42, 0.8)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)',]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 1, y: 0 }}>
                    <View style={styles.ContBack}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.Contback1}>
                            <Ionicons name="chevron-back" style={styles.IconBack} size={wp('10%')} color={'white'} />
                        </TouchableOpacity>

                        {placeData && placeData.Video ? (
                            <TouchableOpacity onPress={() => toggleMute()}>
                                <Ionicons name={isMuted ? "mic-off" : "mic"} style={styles.IconSound} color={'white'} size={wp('8%')} />
                            </TouchableOpacity>
                        ) : (
                            <View></View>
                        )}

                    </View>
                </LinearGradient>



                <View style={styles.contTittle}>
                    <View style={styles.contMicrTitll}>
                        <View style={{ flex: 4, justifyContent: 'center', marginLeft: wp('5%') }}>
                            <Text style={styles.textTittle}>{placeData.Name}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setFavorite(true)}>
                                <Ionicons name={'heart'} style={isFavorite ? styles.HeardIconRed : styles.HeardIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>











            <View style={styles.contOptions}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity>
                        <FontAwesome name={'location-arrow'} style={styles.LocationIcon} color={'#0F1035'} size={wp('6%')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => SetCalendar(placeData.Hours)}>
                        <Calendar data={placeData.Hours}/>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                </View>
            </View>

            <View style={{ marginHorizontal: wp('10%') }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                    <View style={{ flex: 1 }}>
                        <Ionicons name='location' color={'#164863'} size={wp('6%')} />
                    </View>
                    <View style={{ flex: 8 }}>
                        <Text style={styles.direccionTxt}>{placeData.Address}</Text>
                    </View>
                </View>
            </View>




            <View style={styles.separator} />

            {/* para las Imagens de Haora */}
            <ImageNow data={placeData} />

            {/* para mostar los datos */}
            <InfoCon data={placeData} />

            {/* para el Audio */}
            <AudioInfo data={placeData.Audio} />



        </ScrollView>
    );
};

export default InfoScreen

const styles = StyleSheet.create({

    ContVideo: {
        position: 'relative',
    },

    VideoStyle: {
        width: '100%',
        height: hp('50%'),
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    ContBack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('4%'),
    },

    Contback1: {
        backgroundColor: 'rgba(33, 53, 85,0.7)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 2,
        marginLeft: wp('4%')
    },

    IconSound: {
        backgroundColor: 'rgba(33, 53, 85,0.6)',
        borderRadius: wp('3%'),
        marginHorizontal: wp('6%'),
        marginVertical: wp('4%')
    },



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
        backgroundColor:'white'
    },

    //para el video
    Container: {
        backgroundColor: 'white'
    },




    //estilos para el titulo
    contTittle: {
        position: 'absolute',
        marginTop: wp('95%'),
        width: wp('100%'),
    },

    contMicrTitll: {
        flexDirection: 'row',
        marginHorizontal: wp('5%'),
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },



    textTittle: {
        textAlign: 'auto',
        color: '#0F1035',
        fontSize: wp('4.5%'),
        fontWeight: '400',
    },


    ContplayIcon: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },


    //para el Icono de Localisacion
    LocationIcon: {
        backgroundColor: 'rgba(154, 200, 205, 0.4)',
        borderRadius: 10,
        paddingHorizontal: 11,
        paddingVertical: hp('2%'),
        width: wp('15%'),
        textAlign: 'center'
    },







    HeardIcon: {
        backgroundColor: 'rgba(154, 200, 205, 0.4)',
        borderRadius: 50,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('1.3%'),
        color: 'white',
        fontSize: wp('7%')
    },

    HeardIconRed: {
        backgroundColor: 'rgba(255, 32, 78, 0.6)',
        borderRadius: 50,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('1.3%'),
        color: 'red',
        fontSize: wp('7%')
    },

    //----------------------------------------------------





    //para la localisacion y la Hora
    contOptions: {
        flexDirection: 'row',
        marginHorizontal: wp('6%'),
        paddingVertical: hp('1%'),
        marginTop: hp('7%')
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
        color: '#08445a',
        textAlign: 'justify'
    },
})


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';



import InfoCon from './CoponentInfo/InfoCon'

//import { getPlace } from './Controler/firebaseService'
//const blurhash =
//  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';





const InfoScreen = () => {

    const navigation = useNavigation()
    const video = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    //const [placeData, setPlaceData] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await getPlace('9nq4cZKo2ftrp0iQ5lUc');
    //         setPlaceData(data);
    //         console.log(data.ImagesID[0])
    //     };
    //     fetchData();
    // }, []);


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
        <ScrollView style={styles.Container}>

            <View style={styles.ContVideo}>
                <Video ref={video}
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/llajtatour-57c11.appspot.com/o/Image%2Fistockphoto-864526000-640_adpp_is.mp4?alt=media&token=d4c6f6a7-698c-4c25-acd1-98332c578492' }}
                    resizeMode={ResizeMode.STRETCH}
                    isLooping
                    volume={0.4}
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
                                <Text style={{color:'white'}}>Cochabamba-Cercado</Text>
                        </View>


                        <View style={styles.ContplayIcon}>
                            <TouchableOpacity onPress={() => togglePlayPause()}>
                                <Ionicons name={isPlaying ? "pause-circle-sharp" : "play-circle-sharp"} style={styles.IconPlay} color={'#009194'} size={wp('10%')} />
                            </TouchableOpacity>
                        </View>


                    </View>

                </LinearGradient>
            </View>


            <View style={styles.contTittle}>
                <Text style={styles.textTittle}>Plaza Colon</Text>
            </View>


            <View style={styles.contLocation}>

                <View style={styles.txtDireccion}>
                    <Ionicons name='location' color={'#aeaeae'} size={20} />
                    <Text style={styles.direccionTxt}>Av. San martin entre la calle Mexico</Text>
                </View>

              

                <View style={styles.txtDireccion}>
                    <Ionicons name='time' color={'#aeaeae'} size={20} />
                    <Text style={styles.timeTxt}>8:30 - 7:30</Text>
                </View>




            </View>





           <InfoCon />


            {/* <View style={{ width: '100%', height: '100%' }}>
                {placeData && placeData.ImagesID && placeData.ImagesID.length > 0 && (
                    <View style={{ width: '100%', height: '100%' }}>
                         <Image
                                style={styles.image}
                                source={{uri:placeData.ImagesID[0]}}
                                placeholder={{ uri: blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                    </View>
                )}
            </View> */}



        </ScrollView>
    );
};

export default InfoScreen

const styles = StyleSheet.create({

    Container: {
        backgroundColor: 'white'
    },
    ContVideo: {
        position: 'relative',
    },
    VideoStyle: {
        width: '100%',
        height: hp('34%'),
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
    },

    timeTxt: {
        fontSize: wp('3%'),
        marginLeft: wp('2%'),
    },




})


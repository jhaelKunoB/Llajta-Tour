import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';

import NotHour from '../assets/NotHour.jpg'

const Calendar = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isHours, setHours] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data) {
                    const transformedData = Object.keys(data).map(day => ({ day, ...data[day] }));
                    setHours(transformedData);
                }
            } catch (error) {
                console.error("Error al obtener los datos");
            }
        };
        fetchData();
    }, [data]);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={styles.ContIconTittle}>
                            <View style={styles.ContTittle}>
                                <Text style={styles.title}>HORARIO DE APERTURA</Text>
                            </View>
                            <View style={styles.ContClose}>
                                <Pressable style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
                                    <FontAwesome name="close" style={styles.IconClose} />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.line}></View>

                        {isHours.length > 0 ? (
                            <FlatList
                                data={isHours}
                                keyExtractor={item => item.day}
                                renderItem={({ item }) => (
                                    <View style={styles.item}>
                                        <View style={styles.ContIconClock}>
                                            <FontAwesome style={styles.IconClock} name="clock-o" />
                                        </View>
                                        <View style={{ flex: 4 }}>
                                            <Text style={styles.textDay}>{item.day}</Text>
                                            {item.HourOpen != "0" && item.HourClose != "0" ? (
                                                     <Text style={styles.text}> {item.HourOpen} - {item.HourClose}</Text>
                                            ):(
                                                <Text style={styles.textClose}> Cerrado</Text>
                                            )}   
                                        </View>
                                    </View>
                                )}
                            />
                        ) : (
                            <View style={{ with:'100%', height:'45%', justifyContent:'center'}}>
                                <Image source={NotHour} style={styles.notImage} resizeMode='cover'></Image>
                                <Text style={styles.textNotHour}>Este lugar siempre está abierto.</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesome name={'calendar'} style={styles.CalendarIcon} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({

    notImage:{
        width:wp('50'),
        height:hp('15%')
    },

    textNotHour:{
        fontSize:13, 
        textAlign:'center', 
        marginVertical:hp('1%')
    },
    ContIconClock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    IconClock: {
        color: '#9AC8CD',
        fontSize: wp('8%')
    },

    item: {
        paddingBottom: hp('2%'),
        flexDirection: 'row',
        width: wp('50%'),
    },

    text: {
        fontSize: wp('3.5%'),
        color: '#99A8B2',
    },

    textDay:{
        fontSize: wp('4%'),
        color:'#35858B'
    },
    textClose:{
        fontSize: wp('3.5%'),
        color:'red'
    },

    CalendarIcon: {
        backgroundColor: 'rgba(154, 200, 205, 0.4)',
        borderRadius: 10,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('2%'),
        width: wp('15%'),
        textAlign: 'center',
        color: '#006769',
        fontSize: wp('6%')
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        width: wp('70%'),
        height: hp('40%'),
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: wp('3%'),
        paddingBottom: hp('2%'),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    ContIconTittle: {
        flexDirection: 'row',
        marginTop: hp('2%'),
        marginBottom: hp('0.5%'),
        marginHorizontal: wp('2.6%')
    },

    title: {
        fontSize: wp('4%'),
        color: '#092635'
    },

    ContTittle: {
        flex: 3,
    },

    ContClose: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    buttonClose: {
        textAlign: 'right',
    },
    IconClose: {
        fontSize: wp('6%'),
        color: '#4D869C',
        textAlign: 'right'
    },

    line: {
        backgroundColor: '#252B48',
        width: '100%',
        height: hp('0.2%'),
        borderRadius: 3,
        marginBottom: hp('2%')
    }
});

export default Calendar;

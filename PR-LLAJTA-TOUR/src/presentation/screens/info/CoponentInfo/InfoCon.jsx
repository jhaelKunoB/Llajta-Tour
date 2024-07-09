import React, { useState, useRef } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';



const InfoCon = () => {
    const [activeComponent, setActiveComponent] = useState('Component1');
    const [activeBotom, setActiveBotom] = useState(true);

    


    const renderComponent = (component) => {
        console.log(component)
        switch (component) {
            case 'Component1':
                return (
                    <ScrollView style={styles.ContDescription}>
                        <LinearGradient colors={['rgba(84, 119, 117, 1)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)',]}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.GradientDes}>
                            <View style={styles.ContCityTitlle}>
                                <View style={styles.CityTitlle}>
                                    <Text style={styles.titlleDes}>Plaza Colon</Text>
                                </View>
                                <View style={styles.CityTitlle}>
                                    <Text style={styles.CityDess}>Cochabamba-Cercado</Text>
                                </View>
                            </View>
                            <Text style={styles.descriptionText}>
                                Construida sobre la base Es una montaña en la El Convento de Santa Teresa pertenece a los lugares turísticos más relevantes de Cochabamba. Comúnmente El pueblito de Tupuraya, está localizado en el área de Tupuraya al Nor-este de la localidad de Cochabamba. Es un lugar urbano de connotaciones singulares y sitio que fue escenario del desarrollo histórico de civilizaciones viejas como la de los collas, los quechuas y los Aymaras. En la colonia ha sido “asiento de españoles” quienes después se consolidaron en villas. considerado una fortaleza medieval (en cuanto a arquitectura y elegancia), la historia del Museo Convento empieza durante el siglo XVIII. El Arzobispo de La Plata (Sucre), tramitó el permiso, que ha sido firmado en el Palacio de Aranjuez (Madrid) al rededor del siglo XVIII. cordillera Tunari, tiene una altura de 5035 msnm, el cual es el punto más alto del departamento de Cochabamba, perfecto lugar turístico para ser visitado por amantes de turismo de aventura de un antiguo ScrollView  templo que databa del siglo XVI. En la actualidad pertenece a los sitios turísticos más relevantes en Cochabamba. El diseño del pórtico del acceso de la catedral cobra influencias del estilo ecléctico, debido a que sus columnas son una mezcla de columnas corintias con arcos bajos de medio punto y un extenso rosetón ojival que se alza sobre el arco central.
                            </Text>
                        </LinearGradient>
                    </ScrollView>
                );
            case 'Component2':
                return (
                    <View style={styles.container12}>
                          <Text>Hola putito</Text>
                </View>
                );
            default:
                return null;
        }
    };



    return (
        <View style={styles.container}>

            <View style={styles.separator} />

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => [setActiveComponent('Component1'), setActiveBotom(true)]} style={activeBotom ? styles.button : styles.cont}>
                    <Text>Descripcion</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => [setActiveComponent('Component2'), setActiveBotom(false)]} style={activeBotom ? styles.cont : styles.button}>
                    <Text>Imagens Antiguas</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.ContentRender}>
                {activeComponent && renderComponent(activeComponent)}
                <Text>ashfksfhjksf</Text>
            </View>

        </View>
    )

}

export default InfoCon



const styles = StyleSheet.create({

    separator: {
        borderBottomColor: '#547775',
        borderBottomWidth: 2,
        marginHorizontal: hp('3%'),
        marginVertical: hp('2%'),
    },

    ContentRender: {
        // marginHorizontal: wp('5%')
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

    //para la descfripciom
    ContDescription: {
        maxHeight: hp('35%'),
        marginVertical: hp('1%'),
        backgroundColor: '#c9e0d9',
        borderRadius: wp('5%'),
    },

    descriptionText: {
        paddingTop: hp('1%'),
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('13%'),
        fontSize: wp('4%'),
        lineHeight: hp('3.2%'),
        textAlign: 'justify',
        fontWeight: '300'
    },

    GradientDes: {
        borderBottomRightRadius: wp('5%'),
        borderBottomLeftRadius: wp('5%')
    },


    //para el titulo
    ContCityTitlle: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    CityTitlle: {
        flex: 1
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


    container12: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    item: {
        width: '80%',
        height: 200,
        backgroundColor: 'skyblue',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }
})
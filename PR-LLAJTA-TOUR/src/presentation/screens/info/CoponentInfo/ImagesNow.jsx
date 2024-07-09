import React ,{useState, useEffect}from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import ImgModal from './ModaImage'

const ImageNow = ({data}) => {
    const [placeData, setplaceData] = useState(null)

    useEffect(() => {
        if (data) {
            setplaceData(data)
        }
    }, [data]);


    if (!placeData) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }



    // Dividir las imágenes en dos columnas
    const column1 = [];
    const column2 = [];
    placeData.ImagesID.forEach((image, index) => {
        if (index % 2 === 0) {
            column1.push(image);     
        } else {
            column2.push(image);    
        }
    });

    const getImageHeight = (index) => (index % 2 === 0 ? 130 : 250);
    const getImageHeight1 = (index) => (index % 2 === 0 ? 250 : 130);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Encuentra tu alma en cada rincón de nuestra tierra.</Text>
            </View>

            <View style={styles.imageList}>
                <View style={styles.column}>
                    {column1.map((image, index) => (
                        <View key={`column2-${index}`} style={[styles.imageItem, { height: getImageHeight(index) }]}>
                             <ImgModal img={image} />
                        </View>
                    ))
                    }
                </View>
                <View style={styles.column}>
                    {column2.map((image, index) => (
                        <View key={`column2-${index}`} style={[styles.imageItem, { height: getImageHeight1(index) }]}>
                            <ImgModal img={image} />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        paddingTop: hp('2%'),
    },
    titleContainer: {
        marginHorizontal: wp('5%'),
        marginBottom: hp('2%'),
        backgroundColor:'#d3f2ff',
        borderRadius:20
    },
    title: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        textAlign:'center',
        fontWeight:'300',
        color:'#08445a'
    },
    imageList: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    column: {
        flex: 1,
    },
    imageItem: {
        marginBottom: hp('2%'),
        marginHorizontal: wp('1%'),
        borderRadius: 10,
        overflow: 'hidden',


        shadowColor: '#092b5a',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12, // Android shadow
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: 260,
        height: 250,
        
    },
});

export default ImageNow;

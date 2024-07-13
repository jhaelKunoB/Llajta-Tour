import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const PresentationStyle = StyleSheet.create({


    ImgLogo:{
        width:wp('20%'),
        height:hp('11%')
    },

    ImgPaisaje: {
        width: wp('100%'),
        height: hp('104%'),
    },


    IconArrow: {
        backgroundColor: 'rgba(205, 232, 229,0.5)',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        borderRadius: 50
    },

    FondoButtom: {
        backgroundColor: 'rgba(238, 247, 255,0.5)',
        padding: 10,
        borderRadius: 40
    },


    ContainerTitle: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titulotyle:{
        fontSize: 60, 
        color: '#001C30', 
        marginBottom: 40
    },

    contTounch:{
        flex:1, 
        justifyContent:'center'
    }
});

export default PresentationStyle;
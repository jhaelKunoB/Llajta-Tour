import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    contImagLoa:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    ContImgSerach: {
        width: wp('40%'),
        height: hp('10%')
    },
    column: {
        flex: 1,
        paddingHorizontal: wp('1%'),
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: wp('2%'),
    },
    //para cada Item
    item: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        position: 'absolute',
        paddingLeft: 5,
        textAlign:'center'

    },

    linerStyle:{
        flex: 1, 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
    },

    ContText:{
        flex: 1, 
        justifyContent: 'flex-end' 
    },

    backContText:{
        backgroundColor: 'rgba(77, 134, 156,0.4)', 
        height: 40,   
        justifyContent: 'center', 
        paddingLeft: 10, 
        paddingBottom:wp('2.5%'),
        borderRadius: 10,
    }

});


export default styles;
import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    ContNames: {
        flex:1,
        marginHorizontal: wp('8%'),
        marginTop: hp('2%'),
        marginBottom:hp('5%')
    },
    ToschaStyle: {
        flex:1,
        flexDirection: 'row',
        marginVertical: hp('1.5%')
    },
    textBusca:{
        fontSize:wp('4%'),
        fontWeight:'500',
        color:'#17153B'
    }
})

export default styles
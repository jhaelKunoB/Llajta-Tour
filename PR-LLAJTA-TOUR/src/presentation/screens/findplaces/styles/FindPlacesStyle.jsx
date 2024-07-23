import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    SearchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.select({
            ios: '10%',
            android: '10%',
            web:'1%'
        })
    },
    CotnCarts: {
        flexDirection: 'row',
    },
    InputContainer: {
        backgroundColor: 'rgb(235, 244, 246)',
    },
    ContainerStyle:{
        backgroundColor: 'rgba(255, 255, 255,0)', 
        borderBottomColor: 'transparent', 
        borderTopColor: 'transparent',
        flex:5, 
        width:wp('100%')
    },
    ContImgSerach: {
        width: wp('100%'),
        height: hp('50%')
    },
    SearchBarConten:{
        marginBottom:hp('10%')
    }
})
export default styles
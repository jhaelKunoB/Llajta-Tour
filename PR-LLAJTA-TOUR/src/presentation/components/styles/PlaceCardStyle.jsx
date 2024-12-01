import { StyleSheet } from 'react-native';
import {colorText} from '../../styles/GlobalStyle'
const PlaceCardStyle = StyleSheet.create({
    Container:{
        display:'flex',
        flexDirection:'row',
        height:95,
        marginHorizontal:20,
        marginTop:20
    },
    ImagePai:{
        borderRadius:19,
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },

    imageContainer: {
        flex: 0.9,
    },

    tittle:{
        fontSize:20,
        fontWeight:'300',
        color: colorText.text
    },
    location:{
        alignItems:'center',
        flexDirection:'row',   
    },
    StyleCard:{
        flex:1, 
        paddingHorizontal:7,
         justifyContent:'space-evenly'
    }
});

export default PlaceCardStyle;
import React from 'react';
import { View, Image,StyleSheet } from 'react-native';
//import HeaderStyle from '../components/styles/HeaderStyle';
// Imágenes
import Logo from '../assets/logo.png';
import Titulo from '../assets/Titulo.png';


import PopUpManu from './popPu'

const Header = () => {
    return (
        <View style={HeaderStyle.Header}>   
            <View style={HeaderStyle.contTitulo}>
                <Image source={Titulo} style={HeaderStyle.Titulo} resizeMode='contain' ></Image>
            </View>
            <View style={HeaderStyle.contLogo}>
                <PopUpManu/>
            </View>
        </View>
    );
};

export default Header;


const HeaderStyle = StyleSheet.create({
    Header:{
        flexDirection:'row',
        width:'100%',
        height:60,
        alignItems:'center',
        justifyContent:'center',
    },

    contLogo:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:30
    },
    contTitulo:{
        flex:1,  
        paddingLeft:20
    },
    Titulo:{
       width:'75%',
       height:'80%'
    },
});

import React from 'react';
import { View, Image,StyleSheet } from 'react-native';
// Imágenes
const Titulo = require('../assets/Titulo.png')

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

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
        height:hp('10%'),
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
        paddingLeft:20,
        justifyContent:'center',
    },
    Titulo:{
       width:wp('38%'),
       height:hp('50%')
    },
});

import React from 'react';
import { View, Image, ImageBackground,StyleSheet } from 'react-native';
import HeaderStyle from '../components/styles/HeaderStyle';
// Imágenes
import Logo from '../assets/logo.png';
import Titulo from '../assets/Titulo.png';
import Fondo from '../assets/cocha.jpg';

const Header = () => {
    return (
        <View style={HeaderStyle.Header}>
            <View style={HeaderStyle.contLogo}>
                <Image source={Logo} style={HeaderStyle.Logo} resizeMode='contain' ></Image>
            </View>
            <View style={HeaderStyle.contTitulo}>
                <Image source={Titulo} style={HeaderStyle.Titulo} resizeMode='contain' ></Image>
            </View>
        </View>
    );
};

export default Header;


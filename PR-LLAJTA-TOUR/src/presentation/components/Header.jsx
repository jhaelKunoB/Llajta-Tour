import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import HeaderStyle from '../components/styles/HeaderStyle';
// Imágenes
import Logo from '../assets/logo.png';
import Titulo from '../assets/Titulo.png';
import Fondo from '../assets/cocha.jpg';

const Header = () => {
    return (
        <View>
            <ImageBackground source={Fondo} style={HeaderStyle.fondo}>
                <View style={HeaderStyle.Header}>
                    <View style={HeaderStyle.contLogo}>
                        <Image source={Logo} style={HeaderStyle.Logo} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Header;

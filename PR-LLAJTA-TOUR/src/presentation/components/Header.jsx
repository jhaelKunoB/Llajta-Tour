import React from 'react'
import { View, Image, ImageBackground } from 'react-native'
import HeaderStyle from '../components/styles/HeaderStyle'
//Imagenes
import Logo from '../assets/logo.png'
import Titulo from '../assets/Titulo.png'
import Fondo from '../assets/header.jpg'

const Header = () => {
    return (
        <ImageBackground source={Fondo} style={HeaderStyle.fondo}>
            <View style={HeaderStyle.Header}>
                <View style={HeaderStyle.contLogo}>
                    <Image source={Logo} style={HeaderStyle.Logo}></Image>
                </View>
                <View style={HeaderStyle.contTitulo}>
                    <Image source={Titulo} style={HeaderStyle.Titulo}  ></Image>
                </View>
            </View>
        </ImageBackground>
    )
}
export default Header

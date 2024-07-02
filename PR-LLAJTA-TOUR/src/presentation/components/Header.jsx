import React from 'react'
import { View, Image} from 'react-native'
import HeaderStyle from './styles/HeaderStyle'
//Imagenes
import Logo from '../assets/logo.png'
import Titulo from '../assets/Titulo.png'

const Header = () => {
    return (
        <View style={HeaderStyle.Header}>  
            <View style={HeaderStyle.contLogo}>
            <Image source={Logo} style={HeaderStyle.Logo}></Image>
            </View>   
            <View style={HeaderStyle.contTitulo}>
            <Image source={Titulo} style={HeaderStyle.Titulo}  ></Image>  
            </View>               
        </View>
    )
}
export default Header

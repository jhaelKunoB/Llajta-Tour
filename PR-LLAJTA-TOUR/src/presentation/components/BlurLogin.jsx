import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import blurImg from '../assets/blurImg1.png';

const BlurLogin = () => {

  return (
    <ImageBackground 
      source={blurImg} 
      style={styles.backgroundImage} 
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '105%', // Cambiado a '100%' para asegurar que cubre todo el contenedor
    position: 'absolute',
    top: 0, // Añadido para asegurar que se alinea al top del contenedor
    left: 0, // Añadido para asegurar que se alinea al left del contenedor
  },
});

export default BlurLogin;

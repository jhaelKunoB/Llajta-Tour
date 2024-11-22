import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
const ImgLong = require('../assets/cargaImg.jpg')

const ImageTransition = ({ image1, image2, transitionTime = 3000 }) => {
  const [currentImage, setCurrentImage] = useState(0); // Controla la imagen actual
  const fadeAnim1 = useRef(new Animated.Value(1)).current; // Opacidad de la primera imagen
  const fadeAnim2 = useRef(new Animated.Value(0)).current; // Opacidad de la segunda imagen

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage === 0) {
        // Desvanece la primera imagen y muestra la segunda
        Animated.timing(fadeAnim1, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else {
        // Desvanece la segunda imagen y muestra la primera
        Animated.timing(fadeAnim2, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
      setCurrentImage((prev) => (prev === 0 ? 1 : 0)); // Cambia la imagen actual
    }, transitionTime);

    return () => clearInterval(interval); // Limpia el intervalo
  }, [currentImage, fadeAnim1, fadeAnim2, transitionTime]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: image1 }}
        style={[styles.image, { opacity: fadeAnim1 }]}
        resizeMode="cover"
        defaultSource={ImgLong}
      />
      <Animated.Image
        source={{ uri: image2 }}
        style={[styles.image, { opacity: fadeAnim2 }]}
        resizeMode="cover"
        defaultSource={ImgLong}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default ImageTransition;

import { StyleSheet } from "react-native";

const carouselStyles = StyleSheet.create({
    imageContainer: {
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative', // necesario para la posición absoluta del texto
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    textContainer: {
        position: 'absolute',
        bottom: 10, // ajusta según tus necesidades
        left: 10, // ajusta según tus necesidades
        right: 10, // para centrar el texto horizontalmente
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // fondo semi-transparente
        padding: 5,
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center', // opcional, para centrar el texto
    },
});

export default carouselStyles;
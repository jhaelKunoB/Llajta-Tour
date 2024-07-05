import { StyleSheet } from 'react-native';

const bodyStyle = StyleSheet.create({
    content: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -40, // Ajusta según sea necesario para la superposición
        zIndex: 1,
        backgroundColor: 'white',
        paddingTop:0,
        padding: 10,
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
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
    sliderImage:{
        width:270,
        height:150,
        borderRadius:20
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
    heading:{
        fontSize:20,
        marginBottom:10
    },
    menuItem: {
        flexDirection: 'column',
        alignItems: 'center',
      },
});

export default bodyStyle;

import { StyleSheet } from 'react-native';

const PresentationStyle = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#DCF2F0'
    },
    ImgFondo: {
        width: '100%',
        height: '50%',
        resizeMode:'contain'
    },
    //para el textBiembrnido
    TextBien: {
        textAlign: 'left',
        fontSize: 30,
        width: '100%',
        color: 'white',
        fontWeight: '200'
    },
    //para el contenido
    ContenBotomText: {
        flex: 0.5,
        marginHorizontal: 30,
    },
    //para la Imagen
    ImgTitulo: {
        alignItems: 'center',
        marginTop: 60,
    },
    ImgTamanio: {
        width: 240,
        height: 66
    },
    ImgLogo: {
        width: 90,
        height: 70
    },
    //para el mensaje
    ContenText: {
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    StyleText: {
        fontSize: 15,
        color: 'white',
        fontWeight: '300'
    },
    //para el botom
    ButtonContinuar: {
        backgroundColor: '#006fa3',
        borderRadius: 21,
        width: '100%'
    },
    TextContinuar: {
        fontSize: 15,
        paddingVertical: 18,
        color: 'white',
        textAlign: 'center'
    },
    ImgPaisaje: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode:'cover'
    },
    ContainerTitle: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContenBackground:{
        flex: 2, 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        paddingBottom: 60
    },
    WelcomeText:{
        paddingHorizontal: 30
    }
});

export default PresentationStyle;
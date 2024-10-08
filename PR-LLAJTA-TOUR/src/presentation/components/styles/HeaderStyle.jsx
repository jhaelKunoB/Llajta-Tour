import { StyleSheet } from 'react-native';

const HeaderStyle = StyleSheet.create({
    Header:{
        flexDirection:'row',
        width:'90%',
        height:100,
        alignItems:'center',
        justifyContent:'center'
    },

    contLogo:{
        width:'40%', 
        justifyContent:'flex-start', 
        alignItems:'flex-start',
        paddingLeft:20,
        paddingTop:10,
    },
    contTitulo:{
        width:'60%',
        paddingTop:10,
        justifyContent:'center', 
        alignItems:'flex-end',
        paddingRight:20
    },

    Logo:{
        width:'37%',
        height:'80%',
    },
    Titulo:{
       width:'65%',
    },
});

export default HeaderStyle;

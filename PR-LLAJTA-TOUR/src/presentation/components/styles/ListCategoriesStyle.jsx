import { StyleSheet } from 'react-native';

const ListCategoriesStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        marginHorizontal:20,
        marginVertical:5,
        alignItems: 'center',
        borderRadius:10,
        overflow: "hidden",
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    textContainer:{     
       flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent:'center',
        alignItems:'center',
    }
});

export default ListCategoriesStyles;
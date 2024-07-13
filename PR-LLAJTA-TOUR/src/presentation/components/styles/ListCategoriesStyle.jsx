import { StyleSheet } from 'react-native';

const ListCategoriesStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
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
        position: 'absolute',
        bottom: 0, // ajusta según tus necesidades
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 5,
        borderRadius: 7,
    }
});

export default ListCategoriesStyles;
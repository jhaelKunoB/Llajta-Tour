import { StyleSheet } from 'react-native';

const BodyStyle = StyleSheet.create({
    sliderImage: {
        width: 250,
        height: 290,
        borderRadius: 20,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5
    },
    textContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
        backgroundColor: 'rgba(220, 242, 240, 0.8)',
        padding: 10,
        borderRadius: 15,
    },
    text: {
        color: 'gray',
        fontSize: 15,
    },
    heading: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center'
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    showAll: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF', 
    },
    card: {
        margin: 10,
        marginTop: 0,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        color: 'black'
    },
    locationIcon: {
        marginRight: 5
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginTop: 0,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headerText1: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    showAllText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF'
    },
    container: {
        marginTop: 50,
        paddingHorizontal: 20,
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    inputContainer: {
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        height: 50,
    }, 
    leftIconContainer: {
        marginLeft: 10,
    }, 
    rightIconContainer: {
        marginRight: 10,
    },
});

export default BodyStyle;

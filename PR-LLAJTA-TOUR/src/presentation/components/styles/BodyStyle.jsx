import { StyleSheet } from 'react-native';

const BodyStyle = StyleSheet.create({
    headerText1: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#11394f',
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    inputContainer: {
        backgroundColor: 'rgb(235, 244, 246)',
        borderRadius: 20,
        height: 50,
    },
    leftIconContainer: {
        marginLeft: 10,
    },
    rightIconContainer: {
        marginRight: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#11394f',
    },
    carouselItem: {
        margin: 10,
        marginTop: 0,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#11394f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: 'rgb(235, 244, 246)',
    },
    sliderImage: {
        width: 250,
        height: 290,
        borderRadius: 20,
    },
    textContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 15,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#164863',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationIcon: {
        marginRight: 5,
    },
    text: {
        fontSize: 15,
    },
    showAllText: {
        fontSize: 16,
        color: '#164863',
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginTop: 0,
        padding: 10,
        backgroundColor: 'rgb(235, 244, 246)',
        borderRadius: 10,
        shadowColor: '#11394f',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BodyStyle;

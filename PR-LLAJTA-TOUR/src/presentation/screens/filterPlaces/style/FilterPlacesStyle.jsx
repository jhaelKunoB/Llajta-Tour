import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    placeContainer: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    placeImage: {
        width: '100%',
        height: 150,
    },
    placeName: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'white',
        fontSize: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
    },
});

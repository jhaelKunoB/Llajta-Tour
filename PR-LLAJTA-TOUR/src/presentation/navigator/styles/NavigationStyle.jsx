import { StyleSheet } from 'react-native';

const NavigationStyle = StyleSheet.create({
    Tabs: {
        height: 60,
        position: 'absolute',
        borderRadius: 21,
        marginHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#DCF2F0'
    },
    Icon: {
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
    },
    activeBackground: {
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    //para el Texto    
    TextIcon: {
        display: 'none'
    },
    FocusText: {
        marginHorizontal: 2,
        display: 'flex',
        color: 'white'
    }
});

export default NavigationStyle;
import { StyleSheet } from 'react-native';
import {colors} from '../../styles/GlobalStyle'

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 65,
        backgroundColor: colors.violeta,
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
        paddingBottom: 10,
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
        right: 10,
        left: 10,
        borderRadius: 29,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    selectedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 90,
        position: 'relative',
        bottom: 16, // Aumenta la elevación
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth:1,
        borderColor:colors.viletaClaro
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 40,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 12,
        color: '#fff',     
    },
    selectedLabel: {
        fontSize: 12,
        color: '#366273',
        display:'none'
    },
    tabBarStyle: {
        position: 'absolute',
        height: 60,
        bottom: 24,
        right: 16,
        left: 16,
        borderRadius: 16,
        backgroundColor: '#366273',
        borderTopWidth: 1,
    },
});

export default styles;
import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/CartNamestyle'
import { colors } from '../../../styles/GlobalStyle';

const CartsName = ({ Names }) => {
    const [isName, setName] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        if (Names) {
            setName(Names);
            console.log(Names)
        }
    }, [Names]);

    return (
        <View style={styles.ContNames}>
            {Names && Names.length > 0 ? (
                isName.map((item) =>
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Info', { Id: item.id })} style={styles.ToschaStyle}>
                       
                        <View style={{flex:1, alignItems:'center'}}>
                            <Ionicons name="search-sharp" size={wp('5%')} color={colors.violetaOscuro}/>
                        </View>

                        <View style={{flex:6}}>
                            <Text style={styles.textBusca}>{item.name}</Text>
                        </View>

                    </TouchableOpacity>
                )
            ) : (
                <View></View>
            )}
        </View>
    )
}
export default CartsName


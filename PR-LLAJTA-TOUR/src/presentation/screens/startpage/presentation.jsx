import { Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import PresentationStyle from './styles/PresentationStyle';
import { FontAwesome } from '@expo/vector-icons';

//Imagenes
import Background from './assets/Android_Large_-_4-transformed.jpeg'
import Logo from './assets/logo.png'

const Presentation = () => {
    const navigation = useNavigation()
    return (

        <ImageBackground source={Background} style={PresentationStyle.ImgPaisaje} resizeMode='cover' >
            <View style={PresentationStyle.ContainerTitle}>
                <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                    <Image source={Logo} style={PresentationStyle.ImgLogo}></Image>
                    <Text style={PresentationStyle.titulotyle}>𝓛𝓵𝓪𝓳𝓽𝓪𝓣𝓸𝓾𝓻</Text>
                </View>
                <View style={PresentationStyle.contTounch}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <View style={PresentationStyle.FondoButtom}>
                            <FontAwesome name="arrow-right" size={40} color="#4D869C" style={PresentationStyle.IconArrow} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
export default Presentation


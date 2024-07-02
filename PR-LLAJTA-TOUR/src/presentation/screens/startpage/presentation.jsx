import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import PresentationStyle from './styles/PresentationStyle';
//Imagenes
import Sajama from './assets/WelcomeCollage.png'
import Title from './assets/Title.png'
import Background from './assets/Background.png'

const Presentation = () => {
    const navigation = useNavigation()
    return (
        <View style={PresentationStyle.Container} >
            <Image source={Background} style={PresentationStyle.ImgPaisaje}  ></Image>
            <View style={PresentationStyle.ContainerTitle}>
                <Image source={Title} style={PresentationStyle.ImgTamanio} ></Image>
            </View>
            <View style={PresentationStyle.ContenBackground}>
                <Image source={Sajama} style={PresentationStyle.ImgFondo}  ></Image>
                <View style={PresentationStyle.WelcomeText}>
                    <Text style={PresentationStyle.TextBien}>¡Descubre lo Increíble!</Text>
                    <Text style={PresentationStyle.StyleText}>Emprende un viaje lleno de maravillas y aventuras inolvidables.</Text>
                </View>
            </View>
            <View style={PresentationStyle.ContenBotomText}>
                <LinearGradient
                    style={PresentationStyle.ButtonContinuar}
                    colors={['#1B3A4B', '#3B8C88', '#A8D8D1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}  >
                        <Text style={PresentationStyle.TextContinuar}>Inicia tu Aventura</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}
export default Presentation

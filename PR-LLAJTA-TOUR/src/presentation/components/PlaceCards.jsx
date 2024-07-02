import {View, Text, Image, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import PlaceCardStyle from './styles/PlaceCardStyle'

import ImgPaisaje from '../assets/melissani-grecia-1.jpg'


const PlaceCards = () =>{
    return(
      
            <TouchableOpacity style={PlaceCardStyle.Container}>
                <View style={PlaceCardStyle.imageContainer}>
                    <Image source={ImgPaisaje} style={PlaceCardStyle.ImagePai} ></Image>
                </View>

                <View style={PlaceCardStyle.StyleCard}>
                    <Text style={PlaceCardStyle.tittle}>Palacio Portales</Text>    
                    <View style={PlaceCardStyle.location}>
                        <Icon name='room' color={'#407373'} size={26} />     
                        <Text>C. Cochabamba, Av. Collpapampa</Text>
                    </View>
                </View>  
            </TouchableOpacity> 
    )
}
export default  PlaceCards



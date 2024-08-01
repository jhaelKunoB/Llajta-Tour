import { View, Text, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import PlaceCardStyle from './styles/PlaceCardStyle'

const PlaceCards = ({ data }) => {
    return (
        <View style={PlaceCardStyle.Container}>
                    <View style={PlaceCardStyle.imageContainer}>
                        <Image source={{uri: data.ImagesID[0]}} style={PlaceCardStyle.ImagePai} ></Image>
                    </View>
                    <View style={PlaceCardStyle.StyleCard}>
                        <Text style={PlaceCardStyle.tittle}>{data.Name}</Text>
                        <View style={PlaceCardStyle.location}>
                            <Icon name='room' color={'#407373'} size={28} />
                            <Text numberOfLines={2} >{data.Address}</Text>
                        </View>
                    </View>
        </View>
    )
}
export default PlaceCards



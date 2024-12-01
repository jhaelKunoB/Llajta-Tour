import { StyleSheet, Image, Text, View } from "react-native"
import {colors} from '../styles/GlobalStyle'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const IconImg = require("../assets/AnimLoanding.gif")

const IconLoanding = ({text}) => {
    return(
        <View style={styles.loadingContainer}>
        <Image source={IconImg} style={styles.ImgIcon}></Image>
        {text ? ( <Text style={styles.loadingText}>{text}</Text> ):(<></>)}
        </View>
    )
}

export default IconLoanding

const styles = StyleSheet.create({
    ImgIcon:{
        width:wp("12%"),
        height:hp("9%")
    },
    loadingText: {
        fontSize: 15,
        fontWeight: "300",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.violetaClaro1,
      },
})
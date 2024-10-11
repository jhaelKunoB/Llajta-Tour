import { StyleSheet, Image, Text, View } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const IconImg = require("../assets/Loanding.gif")

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
        width:wp("10%"),
        height:hp("10%")
    },
    loadingText: {
        fontSize: 15,
        fontWeight: "300",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DCF2F150",
      },
})
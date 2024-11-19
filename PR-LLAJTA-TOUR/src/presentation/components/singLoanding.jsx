import { StyleSheet, Image, Text, View } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const IconImg = require("../assets/AnimLoanding.gif")

const SingLoanding = () => {
    return(
        <View style={styles.loadingContainer}>
        <Image source={IconImg} style={styles.ImgIcon}></Image>
         <Text style={styles.loadingText}>Iniciando sesión...</Text>
        </View>
    )
}

export default SingLoanding

const styles = StyleSheet.create({
    ImgIcon:{
        width:wp("12%"),
        height:hp("9%")
    },
    loadingText: {
        fontSize: 16,
        fontWeight: "600",
        color:'white'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
})
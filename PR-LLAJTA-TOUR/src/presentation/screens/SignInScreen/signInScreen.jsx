import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Modal,
  Linking
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useNavigation } from "@react-navigation/native";
import BlurLogin from "../../components/BlurLogin";

import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../../../../database/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import IconImg from "../../components/IconLoanding"

const ImgFont = require("./assets/fondo2.jpg");
const IconGloogle = require("./assets/IconGoogle.png");
const { height } = Dimensions.get("window");

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const navigation = useNavigation();
  const [loguenado, setLoguenado] = useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "427143347905-gtf0892k3uhqsdin9dtea7b9eoskfjmm.apps.googleusercontent.com",
    androidClientId:
      "427143347905-ro3ikerjrsj9iuhjaiunvkceinu3iit7.apps.googleusercontent.com",
  });

  useEffect(() => {
    try {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then(() => {
            console.log("Successfully signed in with Google!");
          })
          .catch((error) => {
            console.log("Error signing in with Google: ", error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [response]);


  const getLocalUser = async () => {
    try {
      setLoguenado(true);
      const userJSON = await AsyncStorage.getItem("@user");

      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);

      if (userData) {
        navigation.navigate("Home");
      } else {
        console.log("No se encontraron datos de usuario");
      }
    } catch (e) {
      console.log("Error al recuperar los datos del usuario:", e);
    } finally {
      setLoguenado(false);
    }
  };
  const saveUserDataToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, "User", user.uid);
      const userSnapshot = await getDoc(userDocRef); 
  
      if (!userSnapshot.exists()) {
       
        await setDoc(userDocRef, {
          userName: user.displayName || "Usuario", 
          email: user.email,
          favorites: [],
        });
        console.log("Nuevo usuario registrado en Firestore");
      } else {
      
        console.log("El usuario ya está registrado en Firestore");
      }
    } catch (e) {
      console.log("Error al guardar o recuperar datos en Firestore:", e);
    }
  };


  useState(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {

        if (user) {
          await AsyncStorage.setItem("@user", JSON.stringify(user));
          console.log("data", JSON.stringify(user, null, 2));
          setUserInfo(user);
          console.log(user)
          await saveUserDataToFirestore(user)
          navigation.navigate("Home");
        } else {
          console.log("User no Autentificado");
        }

      } catch (e) {
        console.log(e);
      } finally {
        setLoguenado(false);
      }

    });

    return () => unsub();
  }, []);
  const openPoliticasPrivacidad = () => {
    // URL que quieres abrir
    const url = 'https://cochaturistica.blogspot.com/2024/10/politica-de-privacidad-la-presente.html';
    // Abrir la URL
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };




  return (
    <>
     <Modal
        transparent={true}
        animationType="fade"
        visible={loguenado}
        onRequestClose={() => {}}
      >
        <IconImg/>
      </Modal>


      <BlurLogin posi={1.55} />
      <SafeAreaView style={styles.contenedor}>
        <ScrollView contentContainerStyle={styles.contenedor}>
          <Image source={ImgFont} style={styles.ImgLogin} />

          <View style={styles.ContContainer}>
            <Text style={styles.title}>
              Descubre los Destinos Turísticos Ideales
            </Text>
            <Text style={styles.body}>
              Sumérgete en la rica historia de Cochabamba, desde sus mercados
              tradicionales hasta sus majestuosas iglesias coloniales.
            </Text>

            <View style={styles.butomContinuo}>
              <TouchableOpacity
                style={styles.butom3}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.butomText}>Continuar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.butomContainer}>
              <TouchableOpacity
                style={styles.butom3}
                onPress={() => { setLoguenado(true); promptAsync();}}
              >
                <Image source={IconGloogle} style={styles.IconGoogleIm}></Image>
                <Text>Continuar con Google</Text>
              </TouchableOpacity>
            </View>



            <View style={styles.contText} >
              <TouchableOpacity onPress={() => openPoliticasPrivacidad()}>
                <Text style={styles.textPoliticas}>POLÍTICA DE PRIVACIDAD</Text>
              </TouchableOpacity>
            </View>



          </View>
        </ScrollView>
      </SafeAreaView>

     
    </>
  );
};
export default SignInScreen;



const styles = StyleSheet.create({
//poloticas
  contText:{
    marginTop:hp('4%'),
    paddingVertical:4,
  },
  textPoliticas:{
    textAlign:'center',
    color:'#686D76',
    textDecorationLine:'underline',
    fontSize:hp("1.5%"),
  },





  //para tempo de carga


  IconGoogleIm: {
    width: "10%",
    height: 20,
  },

  contenedor: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  ImgLogin: {
    width: "85%",
    height: (height / 3) * 1.3,
    borderRadius: 16,
    marginBottom: 25,
    marginTop: hp("4%"),
  },

  ContContainer: {
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
    color: "#071952",
  },
  body: {
    paddingTop: 20,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "400",
    textAlign: "center",
    color: "#071952",
  },
  butomText: {
    color: "#071952",
  },

 

 
  butom3: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  butomContinuo: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: "#EEF7FF",
    borderRadius: 16,
    marginTop: "10%",
  },

  butomContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: "#EEF7FF",
    borderRadius: 16,
    marginTop: "5%",
  },
});

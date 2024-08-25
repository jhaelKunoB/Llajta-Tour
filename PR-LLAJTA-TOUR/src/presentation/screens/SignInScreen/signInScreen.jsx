import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import BlurLogin from "../../components/BlurLogin";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../../../../database/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import ImgFont from "./assets/fondo.png";

const { height } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "172913904569-ifaeffngu9h75cloetkrbqjndii09ejk.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      console.log("Response: ", response);
      const { accessToken } = response.authentication;
      handleSignInWithGoogle(accessToken);
    } else {
      console.log("Response Error: ", response);
    }
  }, [response]);

  const handleSignInWithGoogle = async (accessToken) => {
    try {
      // Inicia sesión con Firebase usando el access token de Google
      const credential = GoogleAuthProvider.credential(null, accessToken);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      // Verifica si el usuario ya existe en Firestore
      const userDocRef = doc(db, "User", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Si el usuario no existe, guárdalo en Firestore
        await setDoc(userDocRef, {
          userName: user.displayName,
          email: user.email,
          favorites: [], // Inicializar con un arreglo vacío de favoritos
        });
        console.log("Usuario guardado en Firestore");
      } else {
        console.log("Usuario ya existe en Firestore");
      }

      // Guarda la información del usuario localmente
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Firebase login error: ", error);
      Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
    }
  };

  return (
    <>
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
                onPress={() => promptAsync()}
              >
                <Text> Iniciar con Google </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.butomContainer}>
              <TouchableOpacity
                style={styles.butom1}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.butomText}>Registrarse</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.butom2}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.butomText}>Iniciar</Text>
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
  contenedor: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  ImgLogin: {
    width: "85%",
    height: (height / 3) * 1.4,
    borderRadius: 16,
    marginBottom: 40,
    marginTop: 40,
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
  butom1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CDE8E5",
    padding: 16,
    borderRadius: 13,
  },
  butom2: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  butom3: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },

  butomContinuo: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: "#EEF7FF",
    borderRadius: 16,
    marginTop: "15%",
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

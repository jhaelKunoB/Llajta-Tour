import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import BlurLogin from "../../components/BlurLogin";
import ImgLgo from "./assets/logo.jpg";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { auth } from "../../../../database/firebase";
import { getAuth, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

//import { GoogleSignin } from '@react-native-google-signin/google-signin';
//import auth from '@react-native-firebase/auth';


const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [initializing, setInitializing] = useState(false);

  const logueo = async () => {
    try {
      setInitializing(true);
     const data = await signInWithEmailAndPassword(auth, email, password);
     console.log('dato ',data)
      navigation.navigate("Home");
      setInitializing(false);
    } catch (error) {
      setError("Datos incorrectos. Verifica tu correo y contraseña.");
      setInitializing(false);
    }
  };


  


  // const handleGoogleSignIn = async () => {
  //   try {

  //     GoogleSignin.configure({
  //       offlineAccess: true,
  //       webClientId: '172913904569-75ip50f4q457s1gnfgc7pvhb082h67lr.apps.googleusercontent.com',
  //     });

  //     await GoogleSignin.hasPlayServices()
  //     Alert.alert("1","23242")

  //     const { idToken } = await GoogleSignin.signIn();
  //     Alert.alert("2","23242")
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //      await auth().signInWithCredential(auth, googleCredential);

  //     navigation.navigate("Home");
  //   } catch (error) {
  //     console.error('Error signing in with Google:', error);
  //   }
  // };




  return (
    <>
      <BlurLogin />
      <SafeAreaView style={styles.contenedor}>
        <ScrollView contentContainerStyle={styles.contenedor}>
          <View style={styles.ContContainer}>
            <View style={styles.continerLogo}>
              <Image source={ImgLgo} style={styles.Imglogo} />
            </View>

            <Text style={styles.title}>Hola de Nuevo👋</Text>
            <Text style={styles.body}>
              Bienvenido de nuevo, te hemos extrañado.
            </Text>

            <View style={styles.inputContainer}>
              <FontAwesome
                name="envelope-o"
                size={24}
                color="#071952"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo"
                keyboardType="email-address"
                autoCorrect={false}
                onChangeText={(text) => [setEmail(text), setError("")]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#071952"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Contrasenia"
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={(text) => [setPassword(text), setError("")]}
              />
            </View>

            <Text style={styles.ErrorTex}>{error}</Text>

            <TouchableOpacity
              style={styles.butomSignIn}
              onPress={logueo}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>

            <View>
      {/* <Button title="Sign In with Google" onPress={handleGoogleSignIn} /> */}
    </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>No tienes una cuenta?</Text>
              <TouchableOpacity
                style={styles.loginText}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.textLogin}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>



      <Modal
        transparent={true}
        animationType="fade"
        visible={initializing}
        onRequestClose={() => {}}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#365486" />
        </View>
      </Modal>
      
    </>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: "100%",
  },

  ContContainer: {
    paddingHorizontal: 30,
  },

  title: {
    fontSize: wp("9%"),
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
    color: "#071952",
  },
  body: {
    padding: 18,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 25,
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
    backgroundColor: "#CDE8E590",
    padding: 16,
    borderRadius: 13,
  },
  butom2: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },

  butomContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: "#4D869C90",
    borderRadius: 16,
    marginTop: "5%",
  },

  Input: {
    backgroundColor: "#F7F7F7",
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
  },

  butomSignIn: {
    backgroundColor: "#7FC7D9",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 30,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.44,
    shadowRadius: 9.32,
  },

  continerLogo: {
    alignItems: "center",
  },
  Imglogo: {
    width: wp("40%"),
    height: hp("20%"),
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#7AB2B2",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 13,
    marginBottom: 15,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "#071952",
  },
  icon: {
    marginRight: 10,
  },

  ErrorTex: {
    color: "red",
    textAlign: "left",
    fontSize: 15,
  },

  loginText: {
    paddingHorizontal: 10,
  },
  textLogin: {
    color: "#071952",
    fontWeight: "500",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCF2F180",
  },
});

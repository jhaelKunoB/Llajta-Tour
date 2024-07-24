import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
  Alert
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import BlurLogin from "../../components/BlurLogin";
import ImgPre from "./assets/Presemta.gif";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {registerUser} from './controler/registerFireB'

const SignInScreen = () => {
  const navigation = useNavigation();


  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')


  const handleRegister = async () => {

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const user = await registerUser(email, password, name);
      console.log(user)
      Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente.');
      navigation.navigate('Home');
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'No se pudo registrar el usuario. Verifica tus datos.');
    }
  };




  return (
    <>
      <BlurLogin/>
      <SafeAreaView style={styles.contenedor}>
        <ScrollView contentContainerStyle={styles.contenedor}>
          <View style={styles.ContContainer}>
            <View style={styles.continerLogo}>
              <Image source={ImgPre} style={styles.Imglogo} resizeMode='cover' />
            </View>

            <Text style={styles.title}>Registro</Text>
            <Text style={styles.body}>
              por favor regístrese para iniciar sesión .
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
                autoCorrect={false}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome
                name="user-o"
                size={24}
                color="#071952"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                autoCorrect={false}
                onChangeText={(text) => setName(text)}
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
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
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
                placeholder="Confirrmar Contrasenia"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>






            <TouchableOpacity style={styles.butomSignIn} onPress={() => handleRegister()}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Registrarse
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>ya tienes cuenta?</Text>
              <TouchableOpacity
                style={styles.loginText}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.textLogin}>Iniciar sesión</Text>
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
    justifyContent: "center",
    backgroundColor: "transparent",
    width: "100%",
  },

  ContContainer: {
    marginHorizontal: 20,
    width:320
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "left",
    color: "#071952",
  },
  body: {
    padding: 5,
    fontSize: 15,
    lineHeight: 30,
    marginBottom: 15,
    fontWeight: "400",
    textAlign: "left",
    color: "#071952",
  },
  butomText: {
    color: "#071952",
  },

  //para el texto
  Input: {
    backgroundColor: "#F7F7F7",
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },

  butomSignIn: {
    backgroundColor: "#7FC7D9",
    padding: 15,
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
    borderRadius:16,
    backgroundColor:'white'
  },
  Imglogo: {
    width: "90%",
    height: 250,
  },

  //----------------------------------
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#7AB2B2",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 13,
    marginBottom: 7,
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

  //-------------------------------
  loginText: {
    paddingHorizontal: 10,
  },
  textLogin: {
    color: "#071952",
    fontWeight: "500",
  },
});

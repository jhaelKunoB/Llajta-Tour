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
  Button
} from "react-native";

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { useNavigation } from "@react-navigation/native";
import BlurLogin from "../../components/BlurLogin";

import ImgFont from "./assets/fondo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {

  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "506090074048-c3h78p37s2r1o9lulgkjcr79gfn3njvu.apps.googleusercontent.com",
    iosClientId:
      "506090074048-f7gm80ede4to4gti589i71s2mj4ol15n.apps.googleusercontent.com",
    androidClientId:
      "506090074048-v0j8goiefcvkhu5tqous5o42kiap1u85.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    handleSingInWithGoogle();
  }, [response])

  async function handleSingInWithGoogle() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
        
      }
      else {
        setUserInfo(user);
      }
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  }

  const getUserInfo = async (token) => {

    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      console.log(user)
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (e) {
      console.log(e)
    }

  }

  const navigation = useNavigation();

  return (
    <>
      <BlurLogin posi={1.55} />
      <View style={styles.container}>
        {!userInfo ? (
          <Button
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        ) : (
          <View style={styles.card}>
            {userInfo?.picture && (
              <Image source={{ uri: userInfo?.picture }} style={styles.image} />
            )}

            <Text style={styles.text}>Email: {userInfo.email}</Text>
            <Text style={styles.text}>
              Verified: {userInfo.verified_email ? "yes" : "no"}
            </Text>
            <Text style={styles.text}>Name: {userInfo.name}</Text>
            {/* <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text> */}
          </View>
          
        )}
        <Button title="remove local store"
        onPress={async () => await AsyncStorage.removeItem("@user")}/>
      </View>

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
  image:{
    width: 100,
    height: 100
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

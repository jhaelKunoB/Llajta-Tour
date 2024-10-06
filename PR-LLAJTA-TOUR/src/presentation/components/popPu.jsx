import { Ionicons, MaterialIcons, AntDesign, Octicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Linking
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import UseAuth from "../../../database/userAuth";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PopUpMenu = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const scala = useRef(new Animated.Value(0)).current;
  const { user } = UseAuth();

  function resizeBox(to, callback) {
    if (to === 1) setVisible(true);
    Animated.timing(scala, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => {
      if (to === 0){
        setVisible(false);
        if (callback) callback(); 
      } 

    });
  }

  const handleSignOut = async () => {
    const authInstance = getAuth();
    try {
      await signOut(authInstance);
      await AsyncStorage.removeItem("@user");
      resizeBox(0, () => navigation.navigate("SignInScreem"));
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const openPoliticasPrivacidad = () => {
    const url = 'https://cochaturistica.blogspot.com/2024/10/politica-de-privacidad-la-presente.html';
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };
  

  return (
    <>
      {user ? (
        <>
          <TouchableOpacity onPress={() => resizeBox(1)}>
            <MaterialIcons name="menu-open" size={30} color="black" />
          </TouchableOpacity>
        </>
      ) : (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('SignInScreem')}>
               <AntDesign name="login" size={24} color="black" />
            </TouchableOpacity>
        </>
      )}

      <Modal transparent visible={visible} animationType="none">
        <TouchableWithoutFeedback onPress={() => resizeBox(0)}>
          <SafeAreaView style={{ flex: 1 }}>
            <Animated.View
              style={[styles.popUp, { transform: [{ scale: scala }] }]}
            >
              <TouchableOpacity style={styles.option}>
                {user ? (
                    <>
                     <Text>{user.displayName ? user.displayName.substring(0, 10) : ''}</Text>
                    </>
                ):(
                    <></>
                )}
               
                <Ionicons
                  name="person-outline"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />


              </TouchableOpacity>

               <TouchableOpacity style={styles.option} onPress={() => resizeBox(0, () => navigation.navigate('Favorite'))}>
                    <Text>Favoritos</Text>
                   <AntDesign name="hearto" size={24} color="red" style={{ marginLeft: 10 }} />
                </TouchableOpacity> 


                <TouchableOpacity style={styles.option} onPress={() => openPoliticasPrivacidad()}>
                    <Text>Aviso de Privacidad</Text>
                   <Octicons name="shield-lock" size={24} color="black" style={{ marginLeft: 10 }} />  
                </TouchableOpacity> 


              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSignOut()}
              >
                <Text>Cerrar Sesión</Text>
                <Ionicons
                  name="exit-outline"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default PopUpMenu;

const styles = StyleSheet.create({
  popUp: {
    borderRadius: 8,
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    position: "absolute",
    top: 60,
    right: 33,
    elevation: 5, // Add some shadow for Android
    shadowColor: "#000", // Add some shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    transformStyle: "preserve-3d", // Fix for transform scale
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
  },
});

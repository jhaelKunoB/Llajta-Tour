import React from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert, // Para mostrar alertas
  ActivityIndicator, // Para mostrar un indicador de carga
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import firebase from 'firebase/app'; // Importa Firebase
import 'firebase/auth'; // Importa autenticación de Firebase
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import UseAuth from "../../../../database/userAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeleteCount = ({ openModal, setOpenModal }) => {
  const [loading, setLoading] = React.useState(false); // Estado para la carga
  const navigation = useNavigation();
  const { user } = UseAuth();


  const handleDeleteAccount = async () => {
   // const user = // Obtener usuario autenticado
    console.log("Datos del Usuario", user)
    const firestore = getFirestore();

    if (user) {
      setLoading(true); // Mostrar indicador de carga mientras se elimina la cuenta

      try {
        // Elimina el documento del usuario en Firestore
        await deleteDoc(doc(firestore, "User", user.uid)); // Reemplaza "users" con la colección correcta

        // Elimina la cuenta de Firebase Authentication
        await user.delete();

        setLoading(false); // Deja de mostrar el indicador de carga

        Alert.alert("Cuenta eliminada", "Tu cuenta ha sido eliminada exitosamente.");
        setOpenModal(false);
        await AsyncStorage.removeItem("@user");
        navigation.navigate("SignInScreem");

      } catch (error) {
        setLoading(false);
        if (error.code === 'auth/requires-recent-login') {
          Alert.alert(
            "Error de autenticación",
            "Por seguridad, debes iniciar sesión de nuevo para eliminar tu cuenta."
          );
        } else {
          Alert.alert("Error", "No se pudo eliminar la cuenta.");
        }
      }
    }
  };

  return (
    <Modal visible={openModal} animationType="slide" transparent={true}>
      <View style={stylesM.ContModal}>
        <View style={stylesM.modalContent}>
          <Text style={stylesM.modalText}>
            ¿Seguro que quieres eliminar tu cuenta?
          </Text>

          <View style={stylesM.ContMensaje}>
            <View style={stylesM.contHeaderTitlesub}>
              <Feather name="alert-triangle" size={22} color="red" />
              <Text style={stylesM.modalTextIF}>Si eliminas esta cuenta:</Text>
            </View>

            <View style={stylesM.listContainer}>
              <Text style={stylesM.listItem}>
                • Se eliminará la cuenta de Cochabamba Turística en todos los dispositivos.
              </Text>
              <Text style={stylesM.listItem}>
                • Se borrarán tus favoritos y configuraciones personales.
              </Text>
              <Text style={stylesM.listItem}>
                • No podrás recuperar tu cuenta una vez eliminada.
              </Text>
            </View>
          </View>

          {/* Indicador de carga al eliminar la cuenta */}
          {loading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <>
              {/* Botón de Eliminar Cuenta */}
              <TouchableOpacity style={stylesM.Deletebutton} onPress={() => handleDeleteAccount()}>
                <Text style={stylesM.DeletebuttonText}>Eliminar Cuenta</Text>
              </TouchableOpacity>

              {/* Botón de Cancelar que cierra el modal */}
              <TouchableOpacity
                style={stylesM.cancelButton}
                onPress={() => setOpenModal(false)} // Cierra el modal
              >
                <Text style={stylesM.CancelbuttonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default DeleteCount;

const stylesM = StyleSheet.create({
  ContModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // Mejorando la opacidad para el fondo
  },

  modalContent: {
    width: wp("100%"), // Usando wp para el ancho
    paddingVertical: hp("3%"), // Usando hp para el padding vertical
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
  },

  modalText: {
    fontSize: hp("2%"), // Usando hp para el tamaño de texto
    textAlign: "center",
    marginBottom: hp("3%"), // Espacio con hp
    color: "#495464",
    fontWeight: "500",
  },

  Deletebutton: {
    paddingVertical: hp("1.5%"), // Usando hp para el padding vertical
    marginVertical: hp("1%"), // Usando hp para el margen vertical
    borderTopWidth: 0.5,
    borderColor: "#ababab",
    borderRadius: 5,
    width: wp("100%"), // Ancho del botón con wp
    alignItems: "center",
  },

  DeletebuttonText: {
    color: "red",
    fontSize: hp("2%"), // Usando hp para el tamaño de texto
  },

  cancelButton: {
    paddingVertical: hp("1.5%"), // Usando hp para el padding
    marginVertical: hp("1%"), // Usando hp para el margen
    marginBottom: hp("2%"), // Usando hp para el margen inferior
    borderRadius: 5,
    width: wp("100%"), // Ancho del botón con wp
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#ababab",
  },

  CancelbuttonText: {
    color: "#ababab",
    fontSize: hp("2%"), // Usando hp para el tamaño de texto
  },

  // Para el mensaje
  contHeaderTitlesub: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // Centrado vertical de los elementos
  },

  ContMensaje: {
    marginHorizontal: wp("5%"), // Margen horizontal con wp
    marginVertical: hp("2%"), // Margen vertical con hp
  },

  modalTextIF: {
    fontSize: hp("1.8%"), // Tamaño de texto con hp
    marginBottom: hp("1%"), // Espacio entre los elementos
    color: "#ababab",
    fontWeight: "bold",
    marginHorizontal: wp("2%"),
  },

  listItem: {
    fontSize: hp("1.5%"), // Tamaño de texto con hp
    color: "#ababab",
    lineHeight: hp("2%"), // Altura de línea ajustada a hp
  },

  listContainer: {
    marginLeft: wp("5%"), // Margen izquierdo con wp
  },
});

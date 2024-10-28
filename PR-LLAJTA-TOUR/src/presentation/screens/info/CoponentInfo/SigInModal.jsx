import React from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../styles/GlobalStyle";

const SingInModal = ({ openModalSing, setOpenModalSing }) => {

    const navigation = useNavigation();


  return (
    <Modal visible={openModalSing} animationType="fade" transparent={true}>
      <View style={stylesM.ContModal}>
        <View style={stylesM.modalContent}>
          <Text style={stylesM.modalText}>
             Por favor, inicia sesión para habilitar esta función.
          </Text>

          <TouchableOpacity style={stylesM.Deletebutton} onPress={() => {navigation.navigate("SignInScreem"), setOpenModalSing(false) }}>
            <Text style={stylesM.DeletebuttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

         
          <TouchableOpacity
            style={stylesM.cancelButton}
            onPress={() => setOpenModalSing(false)}
          >
            <Text style={stylesM.CancelbuttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SingInModal;

const stylesM = StyleSheet.create({
  ContModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", 
  },

  modalContent: {
    width: wp("100%"),
    paddingVertical: hp("3%"),
    backgroundColor: "white",
   
    alignItems: "center",
    
    borderColor: colors.violeta,
    borderTopWidth:3,
    borderTopRightRadius:15,
    borderTopLeftRadius:15
  },

  modalText: {
    fontSize: hp("1.8%"),
    textAlign: "center",
    marginBottom: hp("3%"),
    color: "#ababab",
    fontWeight: "800",
  },

  Deletebutton: {
    paddingVertical: hp("1.5%"),
    marginVertical: hp("1%"),
    borderTopWidth: 0.5,
    borderColor: "#ababab",
    borderRadius: 5,
    width: wp("100%"),
    alignItems: "center",
  },

  DeletebuttonText: {
    color: "#0F1035",
    fontSize: hp("2%"),
    fontWeight:'600'
  },

  cancelButton: {
    paddingVertical: hp("1.5%"),
    marginVertical: hp("1%"),
    marginBottom: hp("2%"),
    borderRadius: 5,
    width: wp("100%"),
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#ababab",
  },

  CancelbuttonText: {
    color: "red",
    fontSize: hp("2%"),
  },

  
});

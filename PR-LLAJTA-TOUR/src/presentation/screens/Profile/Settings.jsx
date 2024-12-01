import React, {useState} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  MaterialIcons, 
  Octicons,
} from "@expo/vector-icons";
import DeleteCount from './DeleteCount'
import SingoutModal from './SingoutModal'
import {colors, colorText, iconColor} from '../../styles/GlobalStyle'

const Settings = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSing, setOpenModalSing] = useState(false);
 
  const openPoliticasPrivacidad = () => {
    const url =
      "https://cochaturistica.blogspot.com/2024/10/politica-de-privacidad-la-presente.html";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };


  return (
    <View style={styles.ContAll}>
      

      <ScrollView contentContainerStyle={styles.Cont}>

        <View style={styles.header}>
            <Text style={styles.tittle}>Configuración</Text>
        </View>

        <View style={styles.seccion}>
          <View style={styles.secionHeader}>
            <Text style={styles.headerText}>Cuenta</Text>
          </View>
        </View>

        <View style={styles.seccionBody}>
          <View style={styles.rowWrapper}>
            <TouchableOpacity
              style={styles.TouchCont}
              onPress={() => openPoliticasPrivacidad()}
            >
              <View style={styles.row}>
                <Octicons
                  name="shield-lock"
                  size={24}
                  color="#616161"
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.rowLabel}>Aviso de Privacidad</Text>
                <View style={styles.rowSpacer}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={29}
                    color="#ababab"
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TouchCont} onPress={() => setOpenModal(true)}>
              <View style={styles.row}>
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color="#616161"
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.rowLabel}>Eliminar la Cuenta</Text>
                <View style={styles.rowSpacer}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={29}
                    color="#ababab"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ----------------------------------------------------------------------------- */}
        <View style={styles.seccion}>
          <View style={styles.secionHeader}>
            <Text style={styles.headerText}>Inicio de sesión</Text>
          </View>
        </View>

        <View style={styles.seccionBody1}>
          <View style={styles.rowWrapper}>
            <TouchableOpacity
              style={styles.TouchCont}
              onPress={() => setOpenModalSing(true)}
            >
              <View style={styles.row}>
                <MaterialIcons
                  name="logout"
                  size={24}
                  color={iconColor.colorV2}
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.rowLabelLogout}>Cerrar sesión</Text>
                <View style={styles.rowSpacer}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={29}
                    color={iconColor.colorV2}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>


      <DeleteCount openModal={openModal} setOpenModal={setOpenModal} />
      <SingoutModal openModalSing={openModalSing} setOpenModalSing={setOpenModalSing} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  ContAll: {
    flex: 1,
  },
  Cont: {
    backgroundColor: colors.violetaClaro1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical:13
  },
  tittle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#243642",
  },

  seccion: {
    paddingTop: 12,
  },
  secionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },

  seccionBody1: {
    marginBottom:110
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e4",
    backgroundColor: "#fff",
  },

  row: {
    marginBottom: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
  },

  TouchCont: {
    paddingLeft: 24,
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },

  //para el cerrar sesión
  rowLabelLogout: {
    fontSize: 15,
    fontWeight: "500",
    color: iconColor.colorV2,
  },

  rowSpacer: {
    flex: 1,
    alignItems: "flex-end",
  },
});

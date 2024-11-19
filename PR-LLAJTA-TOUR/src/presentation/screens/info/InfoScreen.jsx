import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
  Linking,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import Loandin from "./assets/AnimLoanding.gif";
import ImgLong from "./assets/loading copy.gif";

//import * as Location from "expo-location";
import ModalVideo from "./CoponentInfo/ModalVideo";
import Calendar from "./CoponentInfo/Calendar";
import InfoCon from "./CoponentInfo/InfoCon";
import ImageNow from "./CoponentInfo/ImagesNow";
import AudioInfo from "./CoponentInfo/AudioInfo";
import SingInModal from "./CoponentInfo/SigInModal";
import { getPlace } from "./Controler/firebaseService";

//para poder recuperar al Usuario
import UserAuth from "../../../../database/userAuth";
//para Manejo de Favoritos
import UseFavorite from "./Controler/useFavorite";

//para manejar los mapas
import { GestureHandlerRootView } from "react-native-gesture-handler";
//para los estilos
import { colors, colorText, iconColor } from "../../styles/GlobalStyle";
const InfoScreen = () => {

  const { favorites, toggleFavorite } = UseFavorite();
  const [useFvoriteDisa, setFavoDisable] = useState(false);
  const { user, loading } = UserAuth();
  const [useVideoModal, setVideoModal] = useState(false);
  const navigation = useNavigation();
  const [placeData, setPlaceData] = useState(null); //definimos una variable para al macenar el Lugar
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { Id } = route.params;
  const [cantFavorite, setCantLikes] = useState(0);
  const [openModalSing, setOpenModalSing] = useState(false);

  //para reccuperar el Lugar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlace(Id);
        setPlaceData(data);
        setCantLikes(data.Likes);
        setIsLoading(false); // Marcar la carga como completa
        console.log("datos", data);
      } catch (error) {
        console.error("Error al obtener los datos");
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

  // Mostrar indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={Loandin} style={{width:wp("13%"), height:hp('10%')}}></Image>
      </View>
    );
  }

  const SetCalendar = (data) => {
    console.log("estos son las hora", data);
  };
  const getChangeFavorite = async (Id) => {
    try {
      setFavoDisable(true);
      const isFavorite = favorites.includes(Id);
      console.log(isFavorite);
      await toggleFavorite(Id);

      // Update like count
      setCantLikes((prev) => prev + (isFavorite ? -1 : 1));
    } catch (error) {
      console.error(error);
    } finally {
      setFavoDisable(false); // Asegúrate de reactivar el botón después de la operación, incluso si ocurre un error
    }
  };



  const openGoogleMaps = () => {
    const latitude = placeData.Coordinates._lat
      ? placeData.Coordinates._lat
      : -17.3895;
    const longitude = placeData.Coordinates._long
      ? placeData.Coordinates._long
      : -66.1568;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "No se pudo abrir Google Maps");
        }
      })
      .catch((err) => Alert.alert("Error", err.message));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.Container} nestedScrollEnabled={true}>
        <View style={styles.ContVideo}>
          <View style={styles.VideoStyle}>
            <Image
              source={{ uri: placeData.ImagesID[0] }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
              defaultSource={ImgLong}
            ></Image>
          </View>

          {/* Para los Iconos  */}
          <LinearGradient
            style={styles.overlay}
            colors={[
              "rgba(41, 42, 42, 0.8)",
              "rgba(255, 255, 255, 0)",
              "rgba(255, 255, 255, 0)",
              "rgba(255, 255, 255, 0)",
            ]}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.ContBack}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.Contback1}
              >
                <Ionicons
                  name="chevron-back"
                  style={styles.IconBack}
                  size={wp("10%")}
                  color={"white"}
                />
              </TouchableOpacity>

              {/* toggleMute() */}
              {/* {placeData && placeData.Video ? (
                <TouchableOpacity onPress={() => setVideoModal(true)}>
                  <Entypo
                    name="video"
                    style={styles.IconContVideo}
                    color={"white"}
                    size={wp("7%")}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )} */}
            </View>
          </LinearGradient>

          {/* Es para el titulo */}
          <View style={styles.contTittle}>
            <View style={styles.contMicrTitll}>
              <View
                style={{
                  flex: 4,
                  justifyContent: "center",
                  marginLeft: wp("5%"),
                }}
              >
                <Text style={styles.textTittle}>{placeData.Name}</Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                {user ? (
                  <TouchableOpacity
                    onPress={() => getChangeFavorite(Id)}
                    disabled={useFvoriteDisa}
                  >
                    <Ionicons
                      name={"heart"}
                      style={
                        favorites.includes(Id)
                          ? styles.HeardIconRed
                          : styles.HeardIcon
                      }
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setOpenModalSing(true)}>
                    <Ionicons name={"heart"} style={styles.HeardIcon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Modales */}
        <SingInModal
          openModalSing={openModalSing}
          setOpenModalSing={setOpenModalSing}
        />
        <ModalVideo
          videoData={placeData.Video}
          useVideoModal={useVideoModal}
          setVideoModal={setVideoModal}
        />

        {/* Modal para la carga de Fovoritos */}
        <Modal visible={useFvoriteDisa} animationType="fade" transparent={true}>
                <View style = {styles.ContLongFavorite}>
                  <Image source={Loandin} style={styles.contImgLoand}></Image>
                </View>
        </Modal>

        {/* para las opciones de mapas audio horario */}
        <View style={styles.contOptions}>

          <View style={{ alignItems:'center', display:'flex'}}>
            <TouchableOpacity onPress={() => openGoogleMaps()}>
              <Ionicons
                name="location-sharp"
                style={styles.LocationIcon}
                color={iconColor.colorV1}
                size={wp("6%")}
              />
            </TouchableOpacity>
          </View>




          {/* ------------------------------------------------------------------------------- */}
            {/* <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => SetCalendar(placeData.Hours)}>
                <Calendar data={placeData.Hours} />
              </TouchableOpacity>
            </View>  */}
          {/* ------------------------------------------------------------------------------- */}
          


          {placeData && placeData.Video ? (
                <View style={{ alignItems:'center', display:'flex', paddingHorizontal:wp('3%') }}>
                <TouchableOpacity onPress={() => setVideoModal(true)}>
                  <Entypo
                        name="video"
                        style={styles.LocationIcon}
                        color={iconColor.colorV1}
                        size={wp("6%")}
                  />
                </TouchableOpacity>
              </View> 
            ) : (
                <></>
            )}




          {placeData && placeData.Audio ? (
              <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal:wp('2%'),
            
              }}
            >
              <AudioInfo data={placeData.Audio} />
            </View>
          ):(
            <></>
          )}
        


        </View>

        {/* para poder la direccion y el corazon    */}
        <View style={styles.ContHeardAddress}>
          <View style={styles.ContHeart}>
            <FontAwesome name="heart" size={wp("6%")} color="red" />
            <Text style={styles.textLikes}>{cantFavorite}</Text>
          </View>

          <View style={styles.ContAddres}>
            <Entypo name="address" color={"#7FC7D9"} size={wp("6%")} />
            <Text style={styles.direccionTxt}>{placeData.Address}</Text>
          </View>
        </View>

        <View style={styles.separator} />
        {/* para las Imagens de Haora */}
        <ImageNow data={placeData} />
        {/* para mostar los datos */}
        <InfoCon data={placeData} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  contImgLoand:{
    width:70,
    height:70
  },
  ContLongFavorite:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", 
  },
  //----------------------------------------------
  ContHeardAddress: {
    flexDirection: "row",
    marginHorizontal: hp("3%"),
    marginVertical: Platform.select({
      ios: hp("1%"),
      android: hp("1%"),
      web: "2%",
    }),
  },

  ContHeart: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  ContAddres: {
    flex: 3.5,
    flexDirection: "row",
    alignItems: "center",
  },

  textLikes: {
    paddingHorizontal: hp("1%"),
    fontSize: wp("3%"),
    color: colorText.text,
  },

  direccionTxt: {
    fontSize: wp("3%"),
    marginLeft: wp("2%"),
    color: colorText.text,
    marginRight: 20,
  },

  //-------------------Contenerdor del mapa------------------

  //-------------------------------------------------
  ContVideo: {
    width: "100%",
    height: hp("60%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "white",
  },

  VideoStyle: {
    display: "flex",
    width: wp("100%"),
    height: "100%",
    backgroundColor: "white",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  ContBack: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.select({
      ios: "10%",
      android: "4%",
      web: "2%",
    }),
  },

  Contback1: {
    backgroundColor: iconColor.colorV,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 2,
    marginLeft: wp("4%"),
  },

  IconContVideo: {
    backgroundColor: "rgba(33, 53, 85,0.6)",
    borderRadius: wp("3%"),
    marginHorizontal: wp("7%"),
    marginVertical: wp("5%"),
    padding: 5,
  },
  separator: {
    borderBottomColor: colors.violetaOscuro,
    borderBottomWidth: 2,
    marginHorizontal: hp("3%"),
    marginVertical: hp("1%"),
  },

  //para la carga
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  //para el video
  Container: {
    backgroundColor: "white",
  },

  //estilos para el titulo
  contTittle: {
    position: "absolute",
    justifyContent: "center",
    //alignItems:'center',
    width: "100%",
    bottom: -30, // Coloca el contenedor en la parte inferior
    left: 0,
    right: 0,
  },

  contMicrTitll: {
    flexDirection: "row",
    marginHorizontal: wp("5%"),
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 10,
    shadowColor: colors.viletaClaro,//----------------------------------------
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.44,
    shadowRadius: 10,
    elevation: 3,
  },

  textTittle: {
    textAlign: "auto",
    color: colorText.text,
    fontSize: wp("4.5%"),
    fontWeight: "400",
  },

  ContplayIcon: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  //para el Icono de Localisacion
  LocationIcon: {
    backgroundColor: colors.violetaClaro1,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: hp("2%"),
    width: wp("15%"),
    textAlign: "center",
    borderWidth: 2,
    borderColor: colors.violeta,
  },

  HeardIcon: {
    backgroundColor: colors.violetaclaro2,
    borderRadius: 50,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1.3%"),
    color: "white",
    fontSize: wp("7%"),
  },

  HeardIconRed: {
    backgroundColor: "rgba(255, 32, 78, 0.6)",
    borderRadius: 50,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1.3%"),
    color: "red",
    fontSize: wp("7%"),
  },

  //----------------------------------------------------

  //para la localisacion y la Hora
  contOptions: {
    flexDirection: "row",
    alignItems:'flex-start',
    marginHorizontal: wp("6%"),
    paddingVertical: hp("1%"),
    marginTop: hp("7%"),
  },

  txtDireccion: {
    flexDirection: "row",
    backgroundColor: colorText.text,
    borderRadius: wp("4%"),
    padding: wp("2%"),
    alignItems: "center",
    marginHorizontal: wp("1%"),
  },

  //---------------------------------------
  containerMess: {
    height: "10%",
    width: "100%",
    backgroundColor: "#1A2130",
    padding: 9,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "row",
  },

  ContText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  ContButom: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  textSignIn: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
  },

  butonSignIn: {
    backgroundColor: "#DCF2F1",
    borderRadius: 12,
    padding: 8,
    marginVertical: 3,
    width: "60%",
    alignItems: "center",
  },

  ButontextSignIn: {
    fontSize: 14,
    color: "#0F1035",
    fontWeight: "500",
  },

  //estilos para el modal de direction
  ContDirection: {
    height: "80%",
    width: "95%",
    backgroundColor: "#1A2130",
    padding: 9,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },

  contTextNameMap: {
    flex: 4,
  },
  contCloseIcon: {
    flex: 1,
    alignItems: "center",
  },

  modalHeader: {
    width: "100%",
    padding: 10,
    backgroundColor: "#365486",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeaderMap: {
    fontSize: 18,
    fontWeight: "300",
    color: "white",
  },
});

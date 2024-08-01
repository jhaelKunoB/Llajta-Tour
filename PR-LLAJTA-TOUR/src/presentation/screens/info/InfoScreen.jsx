import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import Loandin from "./assets/loading.gif";
import ImgLong from "./assets/loading copy.gif";

import Calendar from "./CoponentInfo/Calendar";
import InfoCon from "./CoponentInfo/InfoCon";
import ImageNow from "./CoponentInfo/ImagesNow";
import AudioInfo from "./CoponentInfo/AudioInfo";
import { getPlace } from "./Controler/firebaseService";

//para poder recuperar al Usuario
import UserAuth from "../../../../database/userAuth";
//para Manejo de Favoritos
import UseFavorite from "./Controler/useFavorite";

//para manejar los mapas
import MapView, { Marker, Callout } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
const GOOGLE_MAPS_APIKEY = "Tu Api Key";
//----------------------------------------------------------

const InfoScreen = () => {
  const { favorites, toggleFavorite } = UseFavorite(); // Usa el hook
  const { user, loading } = UserAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const video = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const [placeData, setPlaceData] = useState(null); //definimos una variable para al macenar el Lugar
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { Id } = route.params;
  const [cantFavorite, setCantLikes] = useState(0);

  //para el mapa-----------------------------------------------------
  const snapPoints = useMemo(() => [hp("70")], []);
  const bottomSheetRef = useRef(null);
  const handlerClose = () => bottomSheetRef.current?.close();
  const handlerOpen = () => bottomSheetRef.current?.expand(); //para abrir los lugares

  //para reccuperar el Lugar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlace(Id);
        setPlaceData(data);
        setCantLikes(data.Likes)
        setIsLoading(false); // Marcar la carga como completa
        console.log("datos", data);
      } catch (error) {
        console.error("Error al obtener los datos");
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

  //para poder pedir permisos de localisacion----------------------
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "No se pudo obtener la ubicación");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Destino de ejemplo
      setDestination({
        latitude: -34.609722,
        longitude: -58.377232,
      });
    })();
  }, []);
  //------------------------------------------------------------------------------------------------

  // Mostrar indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={Loandin}></Image>
      </View>
    );
  }

  const toggleMute = () => {
    if (video.current) {
      setIsMuted((prevIsMuted) => {
        video.current.setIsMutedAsync(!prevIsMuted);
        return !prevIsMuted;
      });
    }
  };

  const SetCalendar = (data) => {
    console.log("estos son las hora", data);
  };

  // Estilo del mapa para ocultar POI----------------------------------------
  const customMapStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  const getChangeFavorite = async (Id) => {
    try {
      const isFavorite = favorites.includes(Id);
      console.log(isFavorite);
      await toggleFavorite(Id);

      // Update like count
      setCantLikes((prev) => prev + (isFavorite ? -1 : 1));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.Container} nestedScrollEnabled={true}>
        <View style={styles.ContVideo}>
          {placeData && placeData.Video ? (
            <ImageBackground source={ImgLong} resizeMode="center">
              <Video
                ref={video}
                source={{ uri: placeData.Video }}
                resizeMode={ResizeMode.COVER}
                isLooping
                volume={0.3}
                shouldPlay
                setIsMuted={true}
                isMuted={isMuted}
                style={styles.VideoStyle}
              ></Video>
            </ImageBackground>
          ) : (
            <View style={styles.VideoStyle}>
              <Image
                source={{ uri: placeData.ImagesID[0] }}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </View>
          )}

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

              {placeData && placeData.Video ? (
                <TouchableOpacity onPress={() => toggleMute()}>
                  <Ionicons
                    name={isMuted ? "mic-off" : "mic"}
                    style={styles.IconSound}
                    color={"white"}
                    size={wp("8%")}
                  />
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
            </View>
          </LinearGradient>

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
                  <TouchableOpacity onPress={() => getChangeFavorite(Id)}>
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
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name={"heart"} style={styles.HeardIcon} />
                  </TouchableOpacity>
                )}
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(false)}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      backgroundColor: "rgba(0,0,0,0)",
                    }}
                  >
                    <View style={styles.containerMess}>
                      <View style={styles.ContText}>
                        <Text style={styles.textSignIn}>
                          Por favor, inicia sesión para habilitar esta función.
                        </Text>
                      </View>

                      <View style={styles.ContButom}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Login")}
                          style={styles.butonSignIn}
                        >
                          <Text style={styles.ButontextSignIn}>
                            Iniciar sesión
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </View>
        </View>

        <View style={styles.contOptions}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => handlerOpen()}>
              <Ionicons
                name="location-sharp"
                style={styles.LocationIcon}
                color={"#006769"}
                size={wp("6%")}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => SetCalendar(placeData.Hours)}>
              <Calendar data={placeData.Hours} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 3,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AudioInfo data={placeData.Audio} />
          </View>
        </View>

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

      {/* para la Localisacion */}
      <BottomSheet
        handleIndicatorStyle={{ backgroundColor: "white" }}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#508C9B" }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        containerStyle={styles.ContMapButtomSheet}
        enableContentPanningGesture={false} //para poder avilitar los getos dentro del contenedor
      >
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: placeData.Coordinates.latitude,
            longitude: placeData.Coordinates.longitude,
            longitudeDelta: 0.05,
            latitudeDelta: 0.05,
          }}
          customMapStyle={customMapStyle}
          showsUserLocation={true}
        >
      

          {/* {origin && <Marker coordinate={origin} title="Origen" />} */}
          {destination && (
            <Marker
              coordinate={{
                latitude: placeData.Coordinates.latitude,
                longitude: placeData.Coordinates.longitude,
              }}
              title="Destino"
              image={
                placeData?.CategoryID?.PinMap
                  ? placeData.CategoryID.PinMap
                  : "https://firebasestorage.googleapis.com/v0/b/llajtatour-57c11.appspot.com/o/IconLocation%2FIconCategori.png?alt=media&token=069218b0-7cc7-4b61-930b-c982c0f47883"
              }
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{placeData.Name}</Text>
                </View>
              </Callout>

            </Marker>
          )}

          {origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={{
                latitude: placeData.Coordinates.latitude,
                longitude: placeData.Coordinates.longitude,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#0F1035"
              onError={(errorMessage) => {
                console.log("Error al trazar la ruta:", errorMessage);
              }}
            />
          )}

        </MapView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  //----------------------------------------------
  ContHeardAddress: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: hp("3%"),
    marginVertical: hp("1%"),
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
    color: "#08445a",
  },

  direccionTxt: {
    fontSize: wp("3%"),
    marginLeft: wp("2%"),
    color: "#08445a",
    marginRight: 20,
  },

  //-------------------Contenerdor del mapa------------------
  ContMapButtomSheet: {
    marginHorizontal: wp("5%"),
    marginBottom: 10,
    padding: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },

  calloutContainer: {
    width: 150,
    padding: 5,
    backgroundColor: "#DCF2F1",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  calloutTitle: {
    fontWeight: "600",
    marginVertical: 1,
    textAlign: "center",
    color: "#0F1035",
  },

  //-------------------------------------------------
  ContVideo: {
    position: "relative",
  },

  VideoStyle: {
    width: "100%",
    height: hp("50%"),
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
      web: "4%",
    }),
  },

  Contback1: {
    backgroundColor: "rgba(33, 53, 85,0.7)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 2,
    marginLeft: wp("4%"),
  },
  IconSound: {
    backgroundColor: "rgba(33, 53, 85,0.6)",
    borderRadius: wp("3%"),
    marginHorizontal: wp("6%"),
    marginVertical: wp("4%"),
  },
  separator: {
    borderBottomColor: "#547775",
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
    marginTop: wp("95%"),
    width: wp("100%"),
  },

  contMicrTitll: {
    flexDirection: "row",
    marginHorizontal: wp("5%"),
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 10,
    shadowColor: "#0F1035",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.44,
    shadowRadius: 10,
    elevation: 10,
  },

  textTittle: {
    textAlign: "auto",
    color: "#0F1035",
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
    backgroundColor: "#DCF2F130",
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: hp("2%"),
    width: wp("15%"),
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#DCF2F1",
  },

  HeardIcon: {
    backgroundColor: "rgba(154, 200, 205, 0.4)",
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
    marginHorizontal: wp("6%"),
    paddingVertical: hp("1%"),
    marginTop: hp("7%"),
  },

  txtDireccion: {
    flexDirection: "row",
    backgroundColor: "#e8f9f3",
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
});

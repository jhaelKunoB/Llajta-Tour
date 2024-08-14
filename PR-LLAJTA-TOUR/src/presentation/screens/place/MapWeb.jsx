import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Switch,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { placeLocation, getCategory } from "./controler/placeLocation";
import loanding from "./assets/loading.gif";


const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};
const center = {
  lat: -17.3935419,
  lng: -66.1570139,
};
const mapOptions = {
  disableDefaultUI: true,
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const MapWeb = () => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [findPLace, setFindPlace] = useState([]);
  const [place, setPlace] = useState();
  const [categorys, setCategori] = useState();
  //para el modal del lugar
  const snapPoints = useMemo(() => [hp("0.1"),hp("28")], []);
  const bottomSheetRef = useRef(null);
  const handlerClose = () => bottomSheetRef.current?.close();
  const handlerOpen = () => bottomSheetRef.current?.expand();
  //para categorias
  const bottmSheeCategori = useRef(null);
  const HandlerCategoruOpen = () => bottmSheeCategori.current?.expand();
  const HandlerCategoruClose = () => bottmSheeCategori.current?.close(); 
  const snapPointsCatego = useMemo(() => [hp("0.1"), hp("70")], []);

  // //para Inicialisar los valores
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await placeLocation();
        const category = await getCategory();
        setPlaces(data);
        setFindPlace(data);
        setCategori(category);
        console.log("solo una sola ves");
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handleMarkerPress = (id) => {
    try {
      if (Array.isArray(places) && places.length > 0 && id) {
        handlerOpen();
        const selectedPlace = places.find((place) => place.id === id);

        if (selectedPlace) {
          setPlace(selectedPlace);
        } else {
          console.warn("Lugar no encontrado con id:", id);
        }
      } else {
        console.warn("No se han encontrado lugares o id no proporcionado");
      }
    } catch (error) {
      console.error("Error en handleMarkerPress:", error);
    }
  };

  //----------------------------------
  const [switchValue, setSwitchValue] = useState(true);
  const toggleSwitch = (value) => {
    try {
      if (value) {
        setFindPlace(places)
        HandlerCategoruClose()
        handlerClose()
        setItemSelect(null)
      }
      setSwitchValue(value);
    } catch (error) {
      console.error(error);
    }
  };
   //para poder renderisar las categorias---------------------------------
   const [itemSelect, setItemSelect] = useState(null)
   const renderCategori = ({ item }) => {
    const isSelct = item.id == itemSelect
    return(
      <TouchableOpacity
      style={isSelct ? styles.selectItem : styles.itemContainer}
      onPress={() => FindCategoris(item.id)}>
      <Image source={{ uri: item.PinMap }} style={{ width: 40, height: 50 }} />
      <Text style={styles.itemText}>{item.Type}</Text>
    </TouchableOpacity>
    )
  }
    //para Filtrar por  categorias----------------------------------------
    const FindCategoris = (idCat) => {
      if (places) {
        const fibdCate = places.filter((index) => index.CategoryID?.id == idCat)
        setItemSelect(idCat)
        setFindPlace(fibdCate)
        HandlerCategoruClose()
        handlerClose()
        setSwitchValue(false) 
      }
    };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.ContHeadder}>
        <View style={styles.ContButonnBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle-sharp"
              size={wp("10%")}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.textHeaderCon}>
          <Text style={styles.textHeader}>Ubicaciones</Text>
        </View>

        <View style={styles.ContButomCate}>
          <TouchableOpacity
            onPress={() => HandlerCategoruOpen()}
            style={styles.ContIconCate}
          >
            <Ionicons name="filter-sharp" size={wp("6%")} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* para poder mostrar mapa */}
      <LoadScript googleMapsApiKey="AIzaSyDwDjy2lThsbIR9w2AOHFVFBHUyahu0PJY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          options={mapOptions}
          zoom={13}
          center={center}
        >
          {findPLace.length > 0 &&
            findPLace.map((item) => (
              <Marker
                onClick={() => handleMarkerPress(item.id)}
                key={item.id}
                position={{
                  lat: item.latitude,
                  lng: item.longitude,
                }}
                title={item.Name}
                icon={{
                  url: item?.CategoryID?.PinMap
                    ? item.CategoryID.PinMap
                    : "https://firebasestorage.googleapis.com/v0/b/llajtatour-57c11.appspot.com/o/IconLocation%2FIconCategori.png?alt=media&token=069218b0-7cc7-4b61-930b-c982c0f47883",
                  scaledSize: new window.google.maps.Size(45, 50), // Ajusta el tamaño del ícono aquí (30x30 píxeles en este caso)
                  anchor: new window.google.maps.Point(5, 5), // Ajusta el punto de anclaje del ícono
                }}
              ></Marker>
            ))}
        </GoogleMap>
      </LoadScript>

      {/* para poder mostrar datos del Lugar-------------------------------------- */}
      <BottomSheet
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: "#001C30" }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        containerStyle={{ ...styles.styleButomSheet, paddingTop: 0 }}
        enableContentPanningGesture={false}
        enableOverDrag={false}
        enableHandlePanningGesture={false}
      >
        <View style={styles.contClosePlaceInfo}>
          <TouchableOpacity
            onPress={() => handlerClose()}
            style={styles.handleIndicator}
          >
            <Ionicons name="caret-down-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {place ? (
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.ContNameCate}>
                <Text numberOfLines={1} style={styles.titlePlace}>
                  {place?.Name}
                </Text>
                <Text style={styles.textCategory}>
                  {place.CategoryID?.Type
                    ? place.CategoryID.Type
                    : "Tipo no disponible"}
                </Text>
              </View>

              <View style={styles.ContButom}>
                <TouchableOpacity
                  style={styles.butomPlace}
                  onPress={() => navigation.navigate("Info", { Id: place.id })}
                >
                  <Text style={styles.textButm}>Explorar</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 130, width: "100%", marginTop: 20 }}>
              <BottomSheetScrollView
                nestedScrollEnabled={true}
                horizontal={true}
                index={-1}
                enablePanDownToClose={false}
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false} // Opcional, para ocultar la barra de desplazamiento
              >
                {place.ImagesID.map((imageUri, index) => (
                  <ImageBackground
                    source={loanding}
                    key={index}
                    style={styles.imageWrapper}
                  >
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.image}
                      resizeMode="cover"
                      onError={(error) =>
                        console.error(
                          "Error loading image:",
                          error.nativeEvent.error
                        )
                      }
                    />
                  </ImageBackground>
                ))}
              </BottomSheetScrollView>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, marginTop: 20 }}>
            <ActivityIndicator size="large" color="#0F1035" />
          </View>
        )}
      </BottomSheet>


        {/* para poder mostrar todas las cateoorias---------------------------------- */}
        <BottomSheet
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#EEF7FF" }}
        ref={bottmSheeCategori}
        snapPoints={snapPointsCatego}
        index={-1}
        containerStyle={styles.ContCategory}
        enableContentPanningGesture={false}
        enableOverDrag={false}
        enableHandlePanningGesture={false}
      >
          <View style={styles.contClosePlaceInfo}>
          <TouchableOpacity
            onPress={() => HandlerCategoruClose()}
            style={styles.handleIndicator1}
          >
            <Ionicons name="caret-down-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.ContHeaderBut}>
          <Text style={styles.textHeaderBut}>Explorar por Categoria</Text>
        </View>

        <View style={styles.contAllCatego}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.textCatego}>Ver Todos los Sitios</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Switch
              value={switchValue}
              style={{ transform: [{ scale: 1.2 }] }}
              thumbColor={switchValue ? "#153448" : "white"} // Cambia el color del thumb
              trackColor={{ false: "#767577", true: "#9AC8CD" }}
              onValueChange={toggleSwitch}
            />
          </View>
        </View>



        {categorys ? (
          <BottomSheetScrollView>
            <FlatList
              data={categorys}
              renderItem={renderCategori}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.ContCategoryFlatList}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  No hay favoritos disponibles.
                </Text>
              }
            />
          </BottomSheetScrollView>
        ) : (
          <View style={{ flex: 1, marginTop: 20 }}>
            <ActivityIndicator size="large" color="#0F1035" />
          </View>
        )}
      </BottomSheet>

    </View>
  );
};

export default MapWeb;

const styles = StyleSheet.create({
  //para el header del mapa-------------------------------------------------
  ContHeadder: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#02152699",
    zIndex: 1,
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  ContButonnBack: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ContButomCate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeaderCon: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: wp("4.5%"),
    color: "white",
  },
  ContIconCate: {
    padding: 5,
  },
  //---------------para la informacion del lugar------------------
  styleButomSheet: {
    borderRadius: 20,
    marginBottom: hp("13%"),
    marginHorizontal: 10,
    display: "flex",
    alignItems: "center",
  },

  ContNameCate: {
    paddingLeft: 12,
    flex: 2.5,
  },
  titlePlace: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  textCategory: {
    color: "white",
    fontSize: 12,
    fontWeight: "300",
  },

  ContButom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  butomPlace: {
    backgroundColor: "#EEF5FF",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  textButm: {
    padding: 5,
    color: "#1A2130",
  },

  scrollView: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  imageWrapper: {
    width: 160,
    height: 90,
    marginRight: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCF2F1",
    overflow: "hidden",

    // Sombras para iOS
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Sombras para Android
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  handleIndicator: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: wp("15%"),
    borderRadius: 10,
  },
  contClosePlaceInfo: {
    alignItems: "center",
    marginBottom:hp("1%")
  },

  //--------------------------------
  ContCategoryFlatList: {
    paddingBottom: 20,
  },

  ContCategory: {
    borderRadius: 20,
    marginBottom: 94,
    marginHorizontal: 10,
    display: "flex",
    alignItems: "center",
  },

  textHeaderBut: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
    paddingVertical: 5,
    color:'#222831'
  },

  contAllCatego:{
    flexDirection:'row',
    paddingTop:8,
    paddingBottom:8,
    backgroundColor:'#DCF2F1',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:10,
    marginBottom:5
  },

  textCatego:{
    fontSize:15,
    fontWeight:'300'
  },

  itemContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 2,
  },

  selectItem:{
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#DCF2F1",
    borderRadius: 15,
    padding: 2,
    borderWidth:3,
    borderColor:'white'
  },

  itemText: {
    fontSize: 12,
    textAlign: "center",
    color: "#070F2B",
  },

  handleIndicator1: {
    backgroundColor: "#001C30",
    justifyContent: "center",
    alignItems: "center",
    width: wp("15%"),
    borderRadius: 10,
  },





});

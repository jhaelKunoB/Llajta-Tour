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
import MapView, { Marker, Callout } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { placeLocation, getCategory } from "./controler/placeLocation";
import { useNavigation } from "@react-navigation/native";
import loanding from "./assets/loading.gif";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const Place = () => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]); //para recuperar los lugares
  const [categorys, setCategori] = useState(); //todos las categorias
  const [findPLace, setFindPlace] = useState([]); //variable para filtrar por categoria

  const [place, setPlace] = useState();
  const snapPoints = useMemo(() => [hp("25")], []);
  const snapPointsCatego = useMemo(() => [hp("14"), hp("70")], []);
  const bottomSheetRef = useRef(null);
  const bottmSheeCategori = useRef(null);

  const [amplitud, setAmplitud] = useState(0.5);

  const handlerClose = () => bottomSheetRef.current?.close();
  const handlerOpen = () => bottomSheetRef.current?.expand(); //para abrir los lugares
  const HandlerCategoruOpen = () => bottmSheeCategori.current?.expand(); //para abrir las Categorias
  const HandlerCategoruClose = () => bottmSheeCategori.current?.close(); //para abrir las Categorias
  const [itemSelect, setItemSelect] = useState(null)


  //para el witchValue, para mostarr todos lugares-----------------
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
 

  //para poder recuperar el lugar seleccionado ------------------------------
  const handleMarkerPress = (id) => {
    try {
      if (Array.isArray(places) && places.length > 0 && id) {
       
        handlerOpen();
        const selectedPlace = places.find((place) => place.id === id);
        
        if (selectedPlace) {
          setPlace(selectedPlace);
        } else {
          console.warn('Lugar no encontrado con id:', id);
        }
      } else {
        console.warn('No se han encontrado lugares o id no proporcionado');
      }
    } catch (error) {
      console.error('Error en handleMarkerPress:', error);
    }
  };
  
  

  // //para Inicialisar los valores
   useEffect(() => {
     const fetchPlaces = async () => {
       try {
         const data = await placeLocation();
         const category = await getCategory();
         setPlaces(data); // Asegúrate de que data sea un array
         setFindPlace(data);
         setCategori(category);
         console.log("solo una sola ves");
       } catch (error) {
         console.error("Error fetching places:", error);
      }
     };

     fetchPlaces();
   }, []);


   

  //para Filtrar por  categorias----------------------------------------
  const FindCategoris = (idCat) => {
    if (places) {
      const fibdCate = places.filter((index) => index.CategoryID?.id == idCat)
      setItemSelect(idCat)
      setFindPlace(fibdCate)
      HandlerCategoruClose()
      handlerClose()
      setSwitchValue(false) //para setear todo el filtrado
      setAmplitud(0.4); //para setear la amplitudes
      console.log("hola====================", fibdCate);
    }
  };


  // Estilo del mapa para ocultar POI----------------------------------------
  const customMapStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  //para poder renderisar las categorias---------------------------------
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



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.ContHeadder}>
        <View style={styles.ContButonnBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle-sharp"
              size={wp("11%")}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.textHeader}>
          Ubicaciones
          </Text>
        </View>

        <View style={styles.ContButomCate}>
          <TouchableOpacity onPress={() => HandlerCategoruOpen()} style={styles.ContIconCate}>
            <Ionicons name="filter-sharp" size={wp('7%')} color="white" />
          </TouchableOpacity>
        </View>
      </View>



      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: -17.3935419,
          longitude: -66.1570139,
          longitudeDelta: amplitud,
          latitudeDelta: amplitud,
        }}
        customMapStyle={customMapStyle}
        showsUserLocation={true}
      >
        {findPLace.length > 0 &&
          findPLace.map((item) => (
            <Marker
              onPress={() => handleMarkerPress(item.id)}
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.name}
              image={
                item?.CategoryID?.PinMap
                  ? item.CategoryID.PinMap
                  : "https://firebasestorage.googleapis.com/v0/b/llajtatour-57c11.appspot.com/o/IconLocation%2FIconCategori.png?alt=media&token=069218b0-7cc7-4b61-930b-c982c0f47883"
              }
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{item.Name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>



      {/* para poder mostrar datos del Lugar-------------------------------------- */}
      <BottomSheet
        handleIndicatorStyle={{ backgroundColor: "white" }}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#001C30" }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        containerStyle={styles.styleButomSheet}
        enableContentPanningGesture={false} //para poder avilitar los getos dentro del contenedor
      >
        {place ? (
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.ContNameCate}>
                <Text style={styles.titlePlace}>{place?.Name}</Text>
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
        handleIndicatorStyle={{ backgroundColor: "black" }}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#EEF7FF" }}
        ref={bottmSheeCategori}
        snapPoints={snapPointsCatego}
        index={-1}
        containerStyle={styles.ContCategory}
        // enableContentPanningGesture={false} //para poder avilitar los getos dentro del contenedor
      >
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
              scrollEnabled={false} // Desactiva el desplazamiento
              bounces={false}
            />
          </BottomSheetScrollView>
        ) : (
          <View style={{ flex: 1, marginTop: 20 }}>
            <ActivityIndicator size="large" color="#0F1035" />
          </View>
        )}
      </BottomSheet>


    </GestureHandlerRootView>
  );
};

export default Place;

const styles = StyleSheet.create({

  //paa el modal decarga --------------------
  loadingContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    zIndex:1
  },

  //estilos para categoria =------------------------
  
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

  //stilos para cada item de las categorias

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

  //para el navegador de arriva
  ContHeadder: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#02152699",
    zIndex: 1,
    color:"white",
    paddingHorizontal:5,
    paddingVertical:5
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
  textHeader: {
    fontWeight: "500",
    textAlign: "center",
    fontSize:18,
    color:'white'
  },

  ContIconCate:{
    padding:5,
  },

  //-------------------------------------------------------
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  styleButomSheet: {
    borderRadius: 20,
    marginBottom: 94,
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

  //--------------------------------------------------------------------------------------------------
  scrollView: {
    flexDirection: "row", // Cambia la dirección a 'row' para el desplazamiento horizontal
    paddingHorizontal: 10,
  },

  imageWrapper: {
    width: 160, // Ancho fijo para cada imagen en el carrusel
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "gray",
    fontSize: 16,
  },

  //------------------------para el botom
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

  //---------------------------------------------------
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
});

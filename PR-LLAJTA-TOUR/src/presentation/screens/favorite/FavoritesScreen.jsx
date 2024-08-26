import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Button,
} from "react-native";
import { getFavoritePlace } from "./controler/ContrFavorite";
import UseAuth from "../../../../database/userAuth";
import { useFocusEffect } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import PopUpManu from '../../../../src/presentation/components/popPu'
import fotoImg from './assets/fotoImg.png'

const Favorite = () => {
  const navigation = useNavigation();
  const [place, setPlaces] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const { user } = UseAuth();
  

  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        if (user) {
          try {
            const favoritePlaces = await getFavoritePlace(user.uid);
            setPlaces(favoritePlaces || []);
            console.log(user)
          } catch (error) {
            console.error("Error al obtener los favoritos:", error);
          } finally {
            setLoadingFavorites(false);
          }
        }
      };
      fetchFavorites();
    }, [user])
  );




  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate("Info", { Id: item.id })}
      >
        <ImageBackground
          source={{ uri: item.ImagesID[0] }}
          style={styles.image}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={"heart"} color={"red"} size={24} />
          </View>
        </ImageBackground>
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.name}>{item.Name}</Text>
          <View style={styles.addressContainer}>
            <Ionicons name={"location"} color={"#0F1035"} size={20} />
            <Text style={styles.textAddress} numberOfLines={1}>
              {item.Address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );



  return (
    <View style={styles.container}>
      <View style={styles.ContHeader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle-sharp"
              size={wp("11%")}
              color="#0F1035"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.headerCenter}>
          <Text style={styles.titleSearch}>Favoritos</Text>
        </View>

        <View style={styles.headerRight}>
          <PopUpManu/>
        </View>
      </View>

      {!user ? (

        <View style={styles.authContainer}>

          <Image source={fotoImg} style={styles.ImgLogin}/>
          <Text style={styles.authText}>
            Por favor, inicia sesión para ver tus favoritos.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreem")} style={styles.buttomSign}>
            <Text style={styles.butonTextSign}>Inicio sesión</Text>
          </TouchableOpacity>

        </View>



      ) : loadingFavorites ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0F1035" />
          <Text style={styles.loadingText}>
            Ya casi... Obteniendo tus favoritos...
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, marginBottom:wp('17%') }}>
          <FlatList
            data={place}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No hay favoritos disponibles.
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
  },
  flatListContent: {
    paddingVertical: 10,
    marginHorizontal: 13,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },

  
  card: {
    flex: 1,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    maxWidth: "48%",
    minHeight: 220,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1035",
    marginBottom: 5,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textAddress: {
    fontSize: 12,
    fontWeight: "300",
    marginLeft: 5,
    color: "#0F1035",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#999",
  },

  // Estilos para el encabezado
  ContHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#0F1035",
  },

  headerLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flex: 1,
    alignItems:'center',
  },
  titleSearch: {
    fontSize: wp("5.5%"),
    color: "#0F1035",
    fontWeight: "400",
  },

  //------------------para Inico Seccion
  authContainer: {
    backgroundColor: '#DCF2F1',
    marginHorizontal: 30,
    marginTop: 60,
    padding: 20,
    borderRadius: 10,
  
    // Shadow for iOS
    shadowColor: '#000', // Black color for the shadow
    shadowOffset: { width: 0, height: 2 }, // Offsets the shadow from the container
    shadowOpacity: 0.25, // 25% opacity for the shadow
    shadowRadius: 3.84, // Blur radius for the shadow
  
    // Elevation for Android
    elevation: 5, // Elevation for the shadow on Android
    justifyContent:'center',
    alignItems:'center',
  },

  authText:{
    paddingVertical:10,
    fontWeight:'300',
    color:'#0F1035'
  },

  buttomSign:{
    backgroundColor:'#0F1035',
    marginVertical:30,
    paddingVertical:10,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    width:'90%'
  },

  butonTextSign:{
    color:'white',
    
  },
  ImgLogin:{
    alignItems:'center',
    width:'80%',
    height:200
  }

});

export default Favorite;

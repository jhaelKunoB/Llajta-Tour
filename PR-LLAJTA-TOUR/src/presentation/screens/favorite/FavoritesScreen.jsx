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


const favoriteImg = require("./assets/Social update.gif")


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

      {loadingFavorites ? (
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
              <View style={styles.imageContainer}>
                <Image
                  source={favoriteImg} // Tu GIF aquí
                  style={styles.ImgLogin}
                  resizeMode="cover" // o "contain", dependiendo de tu necesidad
                />
              </View>
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
    fontSize: wp("4%"),
    fontWeight: "300",
    textAlign: "center",
  },
  flatListContent: {
    paddingVertical: hp("1%"),
    marginHorizontal: wp("3%"),
  },
  row: {
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    margin: wp("2%"),
    borderRadius: wp("3%"),
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    maxWidth: "48%",
    minHeight: hp("30%"),
  },
  image: {
    width: "100%",
    height: hp("20%"),
    resizeMode: "cover",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: wp("2%"),
  },
  infoContainer: {
    padding: wp("3%"),
  },
  name: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    color: "#0F1035",
    marginBottom: hp("1%"),
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textAddress: {
    fontSize: wp("3.5%"),
    fontWeight: "300",
    marginLeft: wp("2%"),
    color: "#0F1035",
  },
  emptyText: {
    textAlign: "center",
    marginTop: hp("3%"),
    fontSize: wp("4%"),
    color: "#999",
  },
  ContHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.5%"),
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
    alignItems: "center",
  },
  titleSearch: {
    fontSize: wp("5.5%"),
    color: "#0F1035",
    fontWeight: "400",
  },
  ContImgFavorite: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    backgroundColor: '#DCF2F1',
    marginHorizontal: wp("8%"),
    marginTop: hp("8%"),
    padding: wp("5%"),
    borderRadius: wp("2.5%"),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: wp("2%"),
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authText: {
    paddingVertical: hp("1.5%"),
    fontWeight: '300',
    color: '#0F1035',
  },
  buttomSign: {
    backgroundColor: '#0F1035',
    marginVertical: hp("4%"),
    paddingVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp("90%"),
  },
  butonTextSign: {
    color: 'white',
  },
  imageContainer: {
    borderRadius: wp("5%"),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgLogin: {
    width: wp("80%"),
    height: hp("40%"),
    borderRadius: wp("5%"),
  },
});


export default Favorite;

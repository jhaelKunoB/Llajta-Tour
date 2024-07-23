import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { getFavoritePlace } from "./controler/ContrFavorite";
import UseAuth from "../../../../database/userAuth";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Favorite = () => {
  const navigation = useNavigation()
  const [place, setPlaces] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const { user } = UseAuth();
  const [dataLoaded, setDataLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        if (user && !dataLoaded) {
          // Solo si los datos no están cargados
          try {
            const favoritePlaces = await getFavoritePlace(user.uid);
            setPlaces(favoritePlaces || []);
            setDataLoaded(true); // Marca los datos como cargados
          } catch (error) {
            console.error("Error al obtener los favoritos:", error);
          } finally {
            setLoadingFavorites(false);
          }
        }
      };

      fetchFavorites();
    }, [user, dataLoaded])
  );

  const renderFavoriteItem = ({ item }) => (
   
      <View style={styles.card}>

<TouchableOpacity  key={item.id} onPress={() => navigation.navigate('Info', { Id: item.id })} >
        <ImageBackground
          source={{ uri: item.ImagesID[0] }}
          style={styles.image}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={"heart"} color={"red"} size={24} />
          </View>
        </ImageBackground>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.Name}</Text>
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
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Cargando favoritos...</Text>
        </View>
      ) : (
        <FlatList
          data={place}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay favoritos disponibles.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#EEF5FF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  flatListContent: {
    paddingVertical: 10,
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
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    maxWidth: "48%", // Adjusted for responsiveness
    minHeight: 220, // Ensure cards have a minimum height
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
});

export default Favorite;

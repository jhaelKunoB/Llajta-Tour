import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { filterPlaces } from "./controller/FilterPlacesController";

import Ionicons from "react-native-vector-icons/Ionicons";
import PopUpManu from "../../components/popPu";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FilteredPlaces = ({ route }) => {

   
  const { categoryId, name } = route.params;
  const [places, setPlaces] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const placesData = await filterPlaces(categoryId);
        setPlaces(placesData);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [categoryId]);

  const handlePlacePress = (placeId) => {
    navigation.navigate("Info", { Id: placeId });
  };

  const renderPlaceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeContainer}
      onPress={() => handlePlacePress(item.id)}
    >
      <Image source={{ uri: item.firstImage }} style={styles.placeImage} />
      <View style={styles.placeNameContainer}>
        <Text style={styles.placeName}>{item.Name}</Text>
      </View>
    </TouchableOpacity>
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
          <Text style={styles.titleSearch}>{name}</Text>
        </View>

        <View style={styles.headerRight}>
          <PopUpManu />
        </View>
      </View>

      {places ? (
        <FlatList
          data={places}
          renderItem={renderPlaceItem}
          keyExtractor={(item) => item.id}
          numColumns={2} // Display items in two columns
          columnWrapperStyle={styles.columnWrapper} // Style for columns
        />
      ) : (

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0F1035" />
          <Text style={styles.loadingText}>
            Ya casi... Obteniendo categoría...
          </Text>
        </View>
      )}
    </View>
  );
};

export default FilteredPlaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#EEF5FF",
  },
  placeContainer: {
    flex: 1,
    marginHorizontal:12,
    marginVertical:5,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white", // Background color for better visibility
    elevation: 2, // Shadow effect for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
  placeImage: {
    width: "100%",
    height: 150,
  },
  placeNameContainer: {
    padding: 8,
    backgroundColor: "white", // Background color for text
  },
  placeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1035",
    textAlign:'center'
  },
  columnWrapper: {
    flex:1,
    justifyContent: 'space-around',
    backgroundColor:'#EEF5FF',
    marginTop:20
  },

  //para header------------------
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
    alignItems: "center",
  },
  titleSearch: {
    fontSize: wp("5%"),
    color: "#0F1035",
    fontWeight: "400",
    textAlign:'center'
  },

   //---------para la carga-------------
   loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCF2F150",
  },
  loadingText: {
    fontSize: 15,
    fontWeight: "300",
  },
});

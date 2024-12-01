import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { filterPlaces } from "./controller/FilterPlacesController";

import Ionicons from "react-native-vector-icons/Ionicons";
import PopUpManu from "../../components/popPu";
import IconLoanding from "../../components/IconLoanding"
import { colors, colorText, iconColor } from "../../styles/GlobalStyle";
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
        <Text style={styles.placeName} numberOfLines={1}>{item.Name}</Text>
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
              color={iconColor.colorV1}
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
        <IconLoanding text={"  Ya casi... Obteniendo categoría..."}/>
      )}
    </View>
  );
};

export default FilteredPlaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.violetaClaro1,
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
    backgroundColor: "white",
  },
  placeName: {
    fontSize: 15,
    fontWeight: "600",
    color: colorText.text,
    textAlign:'center'
  },
  columnWrapper: {
    flex:1,
    justifyContent: 'space-around',
    backgroundColor: colors.violetaClaro1,
    marginTop:20
  },

  //para header------------------
  ContHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: colors.violetaOscuro,
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
    color: colorText.title,
    fontWeight: "400",
    textAlign:'center'
  },

});

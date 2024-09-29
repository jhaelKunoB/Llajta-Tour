import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListCategories from "../../components/ListCategories";
import { fetchAllCategories } from "../category/controller/CategoryController";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import PopUpManu from '../../../presentation/components/popPu'



const CategoryScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (id, title) => {
    navigation.navigate("FilteredPlaces", { categoryId: id, name : title });
   // console.log({ categoryId: title });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
          <Text style={styles.title}>Categorías</Text>
        </View>

        <View style={styles.headerRight} >
          <PopUpManu/>
        </View>
      </View>

      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => navigation.navigate("SearchPlace")}
      >
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder={"Encuentra tu lugar favorito"}
          placeholderTextColor="#999"
          editable={false}
        />
      </TouchableOpacity>

      {categories ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListCategories data={item} onPress={handleCategoryPress}/>
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0F1035" />
          <Text style={styles.loadingText}>
            Ya casi... Obteniendo categorías...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
    position: "relative", // Ensure child elements are positioned correctly
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderBottomColor: "#0F1035",
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  title: {
    fontSize: wp("5.5%"),
    color: "#0F1035",
    fontWeight: "400",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgb(235, 244, 246)", // Transparent background
    elevation: 5, // Shadow for Android
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    position: "absolute",
    top: 70, // Adjust this based on your header height
    width: "90%",
    zIndex: 1,
    borderWidth: 1,
    borderColor: "white",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
    marginHorizontal: 10,
    backgroundColor: "transparent", // Transparent background
  },
  listContainer: {
    paddingTop: 70, // Space for the search input
    paddingBottom:wp("23 %"),

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

export default CategoryScreen;

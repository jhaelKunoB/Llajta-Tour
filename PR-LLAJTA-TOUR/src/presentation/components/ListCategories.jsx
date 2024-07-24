import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

const ListCategories = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(data.id, data.title)}>
      <View style={ListCategoriesStyles.itemContainer}>
        <ImageBackground
          source={{ uri: data.image }}
          style={ListCategoriesStyles.image}
        >
          <View style={ListCategoriesStyles.textContainer}>
            <Text style={ListCategoriesStyles.title}>{data.title}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ListCategories;

const ListCategoriesStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 23,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  textContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    margin: 13,
    borderRadius: 20,
  },
});

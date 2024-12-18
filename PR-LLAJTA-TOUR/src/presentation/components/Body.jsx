import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  fetchAllPlaces,
  fetchSomeCategories,
  fetchCategoryById,
} from "../screens/home/controller/HomeController";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {colorText, lineborderColor, iconColor, colors} from "../styles/GlobalStyle"


const Body = () => {
  const { width } = useWindowDimensions();
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [IDCategori, setIDCategori] = useState(null);
  const nav = useNavigation();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const placesData = await fetchAllPlaces();
        setPlaces(placesData.filter((place) => place.image));
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchSomeCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchIDCategori = async () => {
      try {
        const categoriID = await fetchCategoryById();
        setIDCategori(categoriID);
        console.log(categoriID);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchPlaces();
    fetchCategories();
    fetchIDCategori();
  }, []);

  const handleImagePress = (docRef) => {
    nav.navigate("Info", { Id: docRef.id });
  };

  const handleShowAllPress = () => {
    nav.navigate("Categorias");
  };

  const handleCategoryPress = (id, title) => {
    nav.navigate("FilteredPlaces", { categoryId: id, name: title });
  };

  const handleSearchFocus = () => {
    nav.navigate("SearchPlace");
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item.id, item.title)}
      style={BodyStyle.ContImagCat}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={BodyStyle.categoryCard}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={BodyStyle.categoryOverlay}>
          <Text style={BodyStyle.categoryTitle}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginBottom: 70 }}>
      <View style={{ marginHorizontal: 23, marginTop: 10 }}>
        <Text style={BodyStyle.headerText1}>Explora la diversidad de</Text>
        <Text style={BodyStyle.headerText2}>Cochabamba</Text>
      </View>

      <SearchBar
        placeholder="Explorar..."
        lightTheme
        round
        containerStyle={BodyStyle.searchBarContainer}
        inputContainerStyle={BodyStyle.inputContainer}
        leftIconContainerStyle={BodyStyle.leftIconContainer}
        rightIconContainerStyle={BodyStyle.rightIconContainer}
        searchIcon={{ type: "font-awesome", name: "search" }}
        clearIcon={{ type: "font-awesome", name: "usd" }}
        onFocus={handleSearchFocus}
      />

      <View style={BodyStyle.headerContainer}>
        <Text style={BodyStyle.headerText}>DESTINOS IMPRESCINDIBLES</Text>
      </View>

      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item.ref)}>
            <View style={BodyStyle.carouselItem}>
              <Image
                source={{ uri: item.image }}
                style={BodyStyle.sliderImage}
              />
              <View style={BodyStyle.textContainer}>
                <Text numberOfLines={1} style={BodyStyle.title}>
                  {item.title}
                </Text>
                <View style={BodyStyle.locationContainer}>
                  <Icon
                    name="map-marker-alt"
                    size={16}
                    color={iconColor.colorV}
                    style={BodyStyle.locationIcon}
                  />
                  <Text numberOfLines={1} style={BodyStyle.text}>
                    {item.ubication}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <View style={BodyStyle.headerContainer}>
        <Text style={BodyStyle.headerText}>CATEGORÍAS MÁS POPULARES</Text>
        <TouchableOpacity onPress={handleShowAllPress}>
          <Text style={BodyStyle.showAllText}>Mostrar todo</Text>
        </TouchableOpacity>
      </View>

      <View style={BodyStyle.ContLugarAnt}>
      {IDCategori ? (
        <TouchableOpacity style={BodyStyle.TouchLugaresAltanio} onPress={() => handleCategoryPress(IDCategori.id, IDCategori.title)}>    
            <ImageBackground
              source={{uri:IDCategori.image}}
              style={BodyStyle.ImgAntonioCont}
              imageStyle={{ borderRadius: 20 }}
            >
              <View style={BodyStyle.BackGruondImg}>
                <Text style={BodyStyle.textLugAntanio}>
                  {IDCategori.title}
                </Text>
              </View>
            </ImageBackground>
        </TouchableOpacity>
         ) : (
          <></>
        )}
      </View>

      <View style={BodyStyle.ContCat}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={renderCategoryItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      
    </View>
  );
};

export default Body;

const BodyStyle = StyleSheet.create({

  //Banner Lugar de Antanio
  ContLugarAnt: {
    marginHorizontal: wp("5"),
    marginVertical:hp("1%")
  },
  textLugAntanio: {
    color: "white",
    fontWeight:'500',
    fontSize:19
  },
  BackGruondImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 10,
    marginHorizontal:10,
    marginVertical:5
  },
  ImgAntonioCont: {
    width: "100%",
    height: 110,
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#B7E0FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 2,
  },
  //----------------------------------

  //---parra las categorias-----------
  ContCat: {
    marginHorizontal: wp("4"),
    marginBottom: 25,
  },

  headerText1: {
    fontSize: 23,
    fontWeight: "500",
    color: colorText.text
  },
  headerText2: {
    fontSize: 23,
    fontWeight: "500",
    color: colorText.title
  },


  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  inputContainer: {
    backgroundColor: colors.violetaclaro2,
    borderRadius: 20,
    height: 50,
  },
  leftIconContainer: {
    marginLeft: 15,
  },
  rightIconContainer: {
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "320",
    color: colorText.text
  },
  carouselItem: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#11394f",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    backgroundColor: "rgb(235, 244, 246)",
    marginHorizontal: 15,
    marginBottom: 18,
  },
  sliderImage: {
    width: 280,
    height: 360,
    borderRadius: 20,
  },
  textContainer: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
    color: colorText.text,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationIcon: {
    marginRight: 5,
  },
  text: {
    fontSize: 15,
  },
  showAllText: {
    fontSize: 15,
    color: colorText.black,
    fontWeight: "300",
    borderBottomWidth: 1,
    borderColor: lineborderColor.linecolor,
  },
  categoryCard: {
    width: "100%",
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    shadowColor: "#B7E0FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  categoryOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    padding: 10,
    width: "100%",
  },
  categoryTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  ContImagCat: {
    flex: 1,
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: wp("1%"),
  },
});

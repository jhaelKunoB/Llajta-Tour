import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import PlaceCards from "./Component/CartsImages";
import CartName from "./Component/CartsName";

import ImgSearch from "./assets/Losearch.gif";

import { getAllPlaces } from "./Controler/firebaseSerch";

import PopUpMenu from '../../../presentation/components/popPu'


const SearchPlace = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [placeData, setPlaceData] = useState(null);
  const [placefind, setPlaceFind] = useState([]);
  const [isName, setName] = useState([]);

  //para busqueda por nombre
  const handleSearch = async (searchText) => {
    setSearchText(searchText);
    setPlaceFind([]);
    if (placeData && searchText !== "") {
      const searchTextUpper = searchText.toUpperCase();
      const filteredPlaces = placeData.filter((item) => {
        const placeNameUpper = item.Name.toUpperCase();
        return placeNameUpper.includes(searchTextUpper);
      });

      const placeNames = filteredPlaces.map((item) => ({
        id: item.id,
        name: item.Name,
      }));
      setName(placeNames);
    } else {
      setName([]);
    }
  };

  const handleSearchSubmit = async () => {
    if (placeData && searchText !== "") {
      const searchTextUpper = searchText.toUpperCase();
      const filteredPlaces = placeData.filter((item) => {
        const placeNameUpper = item.Name.toUpperCase();
        return placeNameUpper.includes(searchTextUpper);
      });
      setPlaceFind(filteredPlaces);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const places = await getAllPlaces();
        setPlaceData(places);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.ContHeader}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle-sharp"
              size={wp("11%")}
              color="#0F1035"
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }} >
          <Text style={styles.titleSearch}>Explorar</Text>
        </View>

        <View style={{ flex: 1, alignItems:'center' }}>
          <PopUpMenu/>
        </View>
      </View>

      <View style={styles.SearchBarContainer}>
        <SearchBar
          placeholder="Buscar..."
          onChangeText={handleSearch}
          onSubmitEditing={handleSearchSubmit}
          value={searchText}
          cancelButtonTitle="Cancelar"
          round
          inputContainerStyle={styles.InputContainer}
          containerStyle={styles.ContainerStyle}
        />
      </View>

      <View style={styles.ConttextResult}>
        {isName.length > 0 ? (
          <>
            <View style={{ flex: 5, alignItems:'flex-start'}}>
              <Text style={styles.textResult} numberOfLines={1}>
                Resultado para "{searchText}"
              </Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end' }}>
              <Text style={styles.textResult}>
                {isName.length} {""} {isName.length === 1 ? "Res." : "Res."}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.textResult}>Sin Resultados</Text>
          </>
        )}
      </View>

      <ScrollView style={styles.SearchBarConten}>
        <View style={styles.CotnCarts}>
          {placefind.length > 0 ? (
            <PlaceCards data={placefind} />
          ) : isName.length > 0 ? (
            <CartName Names={isName} />
          ) : (
            <View>
              <Image source={ImgSearch} style={styles.ContImgSerach}></Image>
            </View>
          )}
        </View>
      </ScrollView>





    </View>
  );
};

export default SearchPlace;

const styles = StyleSheet.create({
  SearchBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.select({
      ios: "10%",
      android: "3%",
      web: "1%",
    }),
    marginHorizontal: wp("4%"),
  },
  CotnCarts: {
    flexDirection: "row",
    flexWrap: "wrap", // Ajusta las tarjetas para ser responsivas
    justifyContent: "center",
    marginTop: 20,
  },
  InputContainer: {
    backgroundColor: "rgb(235, 244, 246)",
    borderWidth: 1,
    borderColor: "#0F1035",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 6,
      },
    }),
    borderRadius: 21,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  ContainerStyle: {
    backgroundColor: "rgba(255, 255, 255,0)",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    flex: 5,
    width: wp("100%"),
  },
  ContImgSerach: {
    width: wp("100%"),
    height: hp("50%"),
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 20,
  },
  SearchBarConten: {
    flex: 1,
  },
  ContHeader: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
  },
  titleSearch: {
    fontSize: wp("5.5%"),
    color: "#0F1035",
    fontWeight: "400",
  },

  //-----para el texto-----------------------
  ConttextResult: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: "7%",
    fontWeight: "300",
  },
  textResult: {
    fontSize: 16,
    fontWeight: "300",
    color: "#0F1035",
  },
});

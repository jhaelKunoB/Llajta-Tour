import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//import Favorite from "../favorite/FavoritesScreen";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";

const Cocha = require("./assets/Ciudad_de_Cochabamba.png");
const Avatar = require("./assets/fondo.jpg");



const HomeScreen = () => {
    return (
      <View>
        <Text>Home Screen</Text>
      </View>
    );
  }
  
const SettingsScreen = () => {
    return (
      <View>
        <Text>Settings Screen</Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    first: HomeScreen,
    second: SettingsScreen
  })

const Profile = () => {
  const navigation = useNavigation();

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: "first", title:"Favoritos"},
    {key: "second", title:"Configuracion"}
  ])

  const renderTabBar = (props) =>(
    <TabBar
        {...props}
        indicatorStyle = {{
            backgroundColor: "red"
        }}
        style={{backgroundColor: "blue", 
                height: 44}}

        renderLabel={({focused, route}) => (
            <Text style={[{color:focused ? 'red' : 'blue'}]}>{route.title}</Text>
        )}
    />
  )

  return (
    <>
      <ImageBackground style={styles.ContImgCocha} source={Cocha}>
        <View style={styles.ContHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle-sharp"
                size={wp("11%")}
                color="#DCF2F1"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerCenter}>
            {/* <Text style={styles.titleSearch}>Tu Perfil</Text> */}
          </View>

          <View style={styles.headerRight}></View>
        </View>

        <View style={styles.ContImag}>
          <Image source={Avatar} style={styles.imgProfile}></Image>
          <View style={styles.ContInfo}>
            <Text style={styles.StytextName}>Jhael Kuno Bustos</Text>
            <Text style={styles.StytxetEmail}>kbj5001497@est.univalle.edu</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.contOptions}>
        <TabView navigationState={{index, routes}}
                 renderScene={renderScene}
                 onIndexChange={setIndex}
                 initialLayout={{width: layout.width}}
                 renderTabBar={renderTabBar}/>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  contOptions: {
    top: 100,
  },

  //para la Inforrmacion
  StytextName: {
    fontSize: 19,
    color: "#365486",
    fontWeight: "600",
  },
  StytxetEmail: {
    fontSize: 10,
    fontWeight: "300",
  },

  ContInfo: {
    marginVertical: 3,
    alignItems: "center",
  },
  //para perfil
  ContImgCocha: {
    height: hp("20%"),
    position: "relative",
  },

  ContImag: {
    alignItems: "center",
    position: "absolute",
    width: wp("100%"),
    top: hp("13%"),
  },

  imgProfile: {
    width: 110,
    height: 110,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#DCF2F1",
    backgroundColor: "#f0f0f0",
  },

  ContHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1%"),
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
});

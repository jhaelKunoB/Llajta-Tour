import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors} from '../styles/GlobalStyle.jsx'
import styles from './styles/NavigationStyle.jsx'

//import UseAuth from '../../../database/userAuth.jsx'
// Importa tus pantallas
import Home from '../screens/home/Home.jsx';
import CategoryScreen from '../screens/category/CategoryScreen.jsx';
import Place from '../screens/place/explore.jsx';
import SearchPlace from '../screens/findplaces/SearchPlace.jsx';
import Info from '../screens/info/InfoScreen.jsx';
import FilteredPlaces from '../screens/filterPlaces/FilterPlaces.jsx';
import SignInScreen from '../screens/SignInScreen/signInScreen.jsx';
import Login from '../screens/login/login.jsx'
import Register from '../screens/register/register.jsx'
//import Favorite from '../screens/favorite/FavoritesScreen.jsx'
import Profile from '../screens/Profile/Profile.jsx'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MyStack({user}) {
    return (
        <Stack.Navigator initialRouteName={user ? "Home" : "SignInScreem"}>
            <Stack.Screen name="SignInScreem" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Home" options={{ headerShown: false }}>
                {props => <MyTabs {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
            <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="FilteredPlaces" component={FilteredPlaces} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const TabButton = ({ label, iconName, onPress, isSelected, iconColor  }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.tabButton}>
            <View style={isSelected ? styles.selectedButton : styles.button}>
                <View style={isSelected ? styles.selectedIconContainer : styles.iconContainer}>
                    <Ionicons name={iconName} size={isSelected ? 27 : 24 } color={iconColor} />
                </View>
                <Text style={isSelected ? styles.selectedLabel : styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

function MyTabs({ user }) {
    return (
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={(props) => <MyTabBar {...props}/>}
      >
        <Tab.Screen name="Inicio" component={Home} options={{ tabBarIcon: 'home-outline' }} />
        <Tab.Screen name="Categorias" component={CategoryScreen} options={{ tabBarIcon: 'list-outline' }} />
        <Tab.Screen name="Lugares" component={Place} options={{ tabBarIcon: 'location-outline' }} />
          {/* Solo muestra la pestaña de perfil si el usuario ha iniciado sesión */}
          {user && (
          <Tab.Screen name="Perfil" component={Profile} options={{ tabBarIcon: 'person-outline' }} />
        )}
        
      </Tab.Navigator>
    );
  }



  const MyTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
          const iconName = options.tabBarIcon !== undefined ? options.tabBarIcon : 'home-outline';
          const isSelected = state.index === index;
          const iconColor = isSelected ? colors.violeta : '#fff';
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          return (
            <TabButton
              key={index}
              label={label}
              iconName={iconName}
              onPress={onPress}
              isSelected={isSelected}
              iconColor={iconColor}
            />
          );
        })}
      </View>
    );
};




const Navigation = ({ user }) => {
    return (
      <NavigationContainer>
        <MyStack user={user} />
      </NavigationContainer>
    );
};
  

export default Navigation;

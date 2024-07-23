import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NavigationStyle from "./styles/NavigationStyle.jsx";
//para lo Iconos
import { Ionicons } from '@expo/vector-icons';

import SignInScreem from '../screens/SignInScreen/signInScreen.jsx'
import Login from '../screens/login/login.jsx'
import Register from '../screens/register/register.jsx'

import Home from '../screens/home/Home.jsx'
import CategoryScreen from '../screens/category/CategoryScreen.jsx'
import Place from '../screens/place/placescreen.jsx'
import SearchPlace from '../screens/findplaces/SearchPlace.jsx'
import Info from '../screens/info/InfoScreen.jsx'
import Favorite from "../screens/favorite/FavoritesScreen.jsx";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack({user}) {
    return (
        <Stack.Navigator initialRouteName={user ? "Home" : "SignInScreem"}>
            <Stack.Screen name="SignInScreem" component={SignInScreem} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={MyTaps} options={{ headerShown: false }} />
            <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
            <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ headerShown: false }} />
          
        </Stack.Navigator>
    );
}


function MyTaps() {
    return (
        <Tab.Navigator initialRouteName="HomeScreen"
            screenOptions={{
                tabBarStyle: NavigationStyle.Tabs,
                tabBarActiveTintColor: '#366273',
                tabBarInactiveTintColor: '#888'
            }}>
            <Tab.Screen name="Categorias" component={CategoryScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[NavigationStyle.Icon, focused && NavigationStyle.activeBackground]}>
                            <Ionicons name="list-outline" size={size} color={color} />
                        </View>)
                }} />
            <Tab.Screen name="HomeScreen" component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[NavigationStyle.Icon, focused && NavigationStyle.activeBackground]}>
                            <Ionicons name="home-outline" size={size} color={color} />
                        </View>)
                }} />


            <Tab.Screen name="Lugares" component={Place}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[NavigationStyle.Icon, focused && NavigationStyle.activeBackground]}>
                            <Ionicons name="location-outline" size={size} color={color} />
                        </View>)
                }} />

              
                        <Tab.Screen
                        name="Favoritos"
                        component={Favorite} // Asegúrate de tener este componente
                        options={{
                            tabBarShowLabel: false,
                            tabBarIcon: ({ color, size, focused }) => (
                            <View style={[NavigationStyle.Icon, focused && NavigationStyle.activeBackground]}>
                                <Ionicons name="heart-outline" size={size} color={color} />
                            </View>
                            ),
                        }}
                        />
        </Tab.Navigator>
    );
}

const Navigation = ({user}) => {

    return (
        <NavigationContainer>
            <MyStack user={user} />
        </NavigationContainer>
    );
}

export default Navigation;

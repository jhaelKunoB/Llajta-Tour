import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NavigationStyle from "./styles/NavigationStyle.jsx";
//para lo Iconos
import { Ionicons } from '@expo/vector-icons';

import Presentation from '../screens/startpage/presentation.jsx'
import Home from '../screens/home/Home.jsx'
import CategoryScreen from '../screens/category/CategoryScreen.jsx'
import Place from '../screens/place/placescreen.jsx'
import SearchPlace from '../screens/findplaces/SearchPlace.jsx'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Presentation">
            <Stack.Screen name="Presentation" component={Presentation} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={MyTaps} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
function MyTaps() {
    return (
        <Tab.Navigator initialRouteName="HomeScreen"
            screenOptions={{
                tabBarStyle: NavigationStyle.Tabs,
                tabBarActiveTintColor: '#366273',
                tabBarInactiveTintColor: '#888'
            }}>
            <Tab.Screen name="HomeScreen" component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[NavigationStyle.Icon, focused && NavigationStyle.activeBackground]}>
                            <Ionicons name="home-outline" size={size} color={color} />
                        </View>)
                }} />
            <Tab.Screen name="Busqueda" component={SearchPlace}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[NavigationStyle.Icon, focused && NavigationStyle.activeBackground]}>
                            <Ionicons name="search" size={size} color={color} />
                        </View>)
                }} />
            <Tab.Screen name="Categorias" component={CategoryScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[NavigationStyle.Icon, focused && NavigationStyle.activeBackground]}>
                            <Ionicons name="list-outline" size={size} color={color} />
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
        </Tab.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

export default Navigation


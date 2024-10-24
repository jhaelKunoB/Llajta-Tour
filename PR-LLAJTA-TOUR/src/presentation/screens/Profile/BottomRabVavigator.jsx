import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Favorite from "../favorite/FavoritesScreen"
import Settings from "./Settings"
import {iconColor} from '../../styles/GlobalStyle'
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
      <Text style={{ color: 'white' }}>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
      <Text style={{ color: 'white' }}>Settings!</Text>
    </View>
  );
}

const BottomRabVavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'favorite') {
            iconName = 'heart';
          } else if (route.name === 'settings') {
            iconName = 'settings';
          }

          return (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name={iconName} size={30} color={focused ? iconColor.colorV : '#B0B0B0'} />
              {focused && (
                <View
                  style={{
                    width: '100%',
                    height: 3,
                    backgroundColor: iconColor.colorV,
                    position: 'absolute',
                    bottom: -10,
                  }}
                />
              )}
            </View>
          );
        },
        tabBarLabelStyle: { display: 'none' },
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0,
          borderTopWidth: 0,
          height: 50, 
          position: 'absolute',
          top: 0
        },
      })}
    >
      <Tab.Screen
        name="favorite"
        component={Favorite}
        options={{ tabBarLabel: 'Pantalla 1' }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{ tabBarLabel: 'Pantalla 2' }}
      />
    </Tab.Navigator>
  );
}

export default BottomRabVavigator;

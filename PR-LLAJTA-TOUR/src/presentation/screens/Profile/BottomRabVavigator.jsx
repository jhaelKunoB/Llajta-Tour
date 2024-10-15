import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Favorite from "../favorite/FavoritesScreen"
import Settings from "./Settings"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Tab = createBottomTabNavigator();

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
              <Ionicons name={iconName} size={30} color={focused ? '#365486' : '#B0B0B0'} />
              {focused && (
                <View
                  style={{
                    width: wp('50%'),
                    height: 3,
                    backgroundColor: '#365486',
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
          height: hp('6%'), 
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

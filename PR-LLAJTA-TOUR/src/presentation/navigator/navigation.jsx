import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importa tus pantallas
import Presentation from '../screens/startpage/presentation.jsx';
import Home from '../screens/home/Home.jsx';
import CategoryScreen from '../screens/category/CategoryScreen.jsx';
import Place from '../screens/place/placescreen.jsx';
import SearchPlace from '../screens/findplaces/SearchPlace.jsx';
import Info from '../screens/info/InfoScreen.jsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Presentation">
            <Stack.Screen name="Presentation" component={Presentation} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={MyTaps} options={{ headerShown: false }} />
            <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
            <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const TabButton = ({ label, iconName, onPress, isSelected }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.tabButton}>
            <View style={isSelected ? styles.selectedButton : styles.button}>
                <View style={isSelected ? styles.selectedIconContainer : styles.iconContainer}>
                    <Ionicons name={iconName} size={24} color={isSelected ? '#366273' : '#fff'} />
                </View>
                <Text style={isSelected ? styles.selectedLabel : styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

function MyTaps() {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarShowLabel: false,
            }}
            tabBar={(props) => <MyTabBar {...props} />}
        >
            <Tab.Screen name="Categorias" component={CategoryScreen} options={{ tabBarLabel: 'Categorias', tabBarIcon: 'list-outline' }} />
            <Tab.Screen name="Inicio" component={Home} options={{ tabBarLabel: 'Inicio', tabBarIcon: 'home-outline' }} />
            <Tab.Screen name="Lugares" component={Place} options={{ tabBarLabel: 'Lugares', tabBarIcon: 'location-outline' }} />
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
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#366273',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
        paddingBottom: 10,
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
        right: 10,
        left: 10,
        borderRadius: 16,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    selectedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#DCF2F0',
        borderRadius: 20,
        position: 'relative',
        bottom: 15, // Aumenta la elevación
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#DCF2F0',
    },
    label: {
        fontSize: 12,
        color: '#fff',
        
    },
    selectedLabel: {
        fontSize: 12,
        color: '#366273',
    },
    tabBarStyle: {
        position: 'absolute',
        height: 60,
        bottom: 24,
        right: 16,
        left: 16,
        borderRadius: 16,
        backgroundColor: '#366273',
        borderTopWidth: 1,
    },
});

const Navigation = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
};

export default Navigation;

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import Favorite from '../screens/favorite/FavoritesScreen.jsx'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//const { userNew } = UseAuth();

function MyStack({user}) {
    return (
        <Stack.Navigator initialRouteName={ "SignInScreem"}>
            <Stack.Screen name="SignInScreem" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
             <Stack.Screen name="Home" component={MyTaps} options={{ headerShown: false }} /> 
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
            <Tab.Screen name="Inicio" component={Home} options={{ tabBarLabel: 'Inicio', tabBarIcon: 'home-outline' }} />
            <Tab.Screen name="Categorias" component={CategoryScreen} options={{ tabBarLabel: 'Categorias', tabBarIcon: 'list-outline'}} />
<<<<<<< HEAD
            <Tab.Screen name="Lugares" component={Place} options={{ tabBarLabel: 'Lugares', tabBarIcon: 'location-outline', headerShown: 'true' }} />
            <Tab.Screen name="Favorite" component={Favorite} options={{ tabBarLabel: 'Favoritos', tabBarIcon: 'heart-outline'}} />
=======
            <Tab.Screen name="Lugares" component={Place} options={{ tabBarLabel: 'Explorar', tabBarIcon: 'location-outline'}} />
            <Tab.Screen name="Favorite" component={Favorite} options={{ tabBarLabel: 'Favoritos', tabBarIcon: 'heart'}} />
            
>>>>>>> main
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

                        // Calculate icon color based on the selection state
                let iconColor = isSelected ? '#5A72A0' : '#fff'; // Default for all icons

                if (route.name === 'Favorite') {
                    iconColor = isSelected ? '#ff0000' : '#ccc'; // Red for selected heart, grey for not selected
                }

                 
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

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 65,
        backgroundColor: '#1A2130',
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
        paddingBottom: 10,
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
        right: 10,
        left: 10,
        borderRadius: 29,
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
        backgroundColor: 'white',
        borderRadius: 90,
        position: 'relative',
        bottom: 16, // Aumenta la elevación
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth:1,
        borderColor:'#5A72A0'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 12,
        color: '#fff',     
    },
    selectedLabel: {
        fontSize: 12,
        color: '#366273',
        display:'none'
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

const Navigation = ({user}) => {

   
    return (
        <NavigationContainer>
            <MyStack user={user} />
        </NavigationContainer>
    );
};

export default Navigation;

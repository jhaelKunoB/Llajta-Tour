import React, { useState, useEffect } from "react";
import {View, StyleSheet, Text} from 'react-native'
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

const GOOGLE_MAPS_APIKEY = "AIzaSyDwDjy2lThsbIR9w2AOHFVFBHUyahu0PJY";

const MapViewMovil = ({ placeDataMap }) => {
  //para poder pedir permisos de localisacion----------------------
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "No se pudo obtener la ubicación");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Destino de ejemplo
      setDestination({
        latitude: -34.609722,
        longitude: -58.377232,
      });
    })();
  }, []);

  // Estilo del mapa para ocultar POI----------------------------------------
  const customMapStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  return (
    <>
      {placeDataMap ? (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: placeDataMap.Coordinates.latitude,
            longitude: placeDataMap.Coordinates.longitude,
            longitudeDelta: 0.05,
            latitudeDelta: 0.05,
          }}
          customMapStyle={customMapStyle}
          showsUserLocation={true}
        >
          {destination && (
            <Marker
              coordinate={{
                latitude: placeDataMap.Coordinates.latitude,
                longitude: placeDataMap.Coordinates.longitude,
              }}
              title="Destino"
              image={
                placeDataMap?.CategoryID?.PinMap
                  ? placeDataMap.CategoryID.PinMap
                  : "https://firebasestorage.googleapis.com/v0/b/llajtatour-57c11.appspot.com/o/IconLocation%2FIconCategori.png?alt=media&token=069218b0-7cc7-4b61-930b-c982c0f47883"
              }
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{placeDataMap.Name}</Text>
                </View>
              </Callout>
            </Marker>
          )}

          {origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={{
                latitude: placeDataMap.Coordinates.latitude,
                longitude: placeDataMap.Coordinates.longitude,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#0F1035"
              onError={(errorMessage) => {
                console.log("Error al trazar la ruta:", errorMessage);
              }}
            />
          )}
        </MapView>
      ) : (
        <></>
      )}
    </>
  );
};

export default MapViewMovil;


const styles = StyleSheet.create({

      calloutContainer: {
        width: 150,
        padding: 5,
        backgroundColor: "#DCF2F1",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
      },
    
      calloutTitle: {
        fontWeight: "600",
        marginVertical: 1,
        textAlign: "center",
        color: "#0F1035",
      },
    
})
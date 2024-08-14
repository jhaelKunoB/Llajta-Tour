import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { View, Text } from "react-native";



const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const mapOptions = {
  //disableDefaultUI: true,
  mapTypeId: "satellite",
  //mapTypeControl: false,
  zoomControl: false, 
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const MapViewWeb = ({locat, placeDataMap}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDwDjy2lThsbIR9w2AOHFVFBHUyahu0PJY",
  });

  const [directions, setDirections] = useState(null);
  //const [currentLocation, setCurrentLocation] = useState(null);
  //const [errorMsg, setErrorMsg] = useState(null);

  const destination = { lat: placeDataMap.Coordinates.latitude, lng: placeDataMap.Coordinates.longitude }; // Punto de destino

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setCurrentLocation({
  //       lat: location.coords.latitude,
  //       lng: location.coords.longitude,
  //     });
  //   })();
  // }, []);



  // useEffect(() => {
  //   if (isLoaded && locat) {
  //     const directionsService = new window.google.maps.DirectionsService();
  //     directionsService.route(
  //       {
  //         origin: locat,
  //         destination: destination,
  //         travelMode: "DRIVING",
  //       },
  //       (result, status) => {
  //         if (status === "OK") {
  //           setDirections(result);
  //           console.log('Dirección obtenida');
  //         } else {
  //           console.error(`Error obteniendo direcciones ${status}`);
  //         }
  //       }
  //     );
  //   }
  // }, [isLoaded, locat]);


  if (!isLoaded) return <><Text>Loading...</Text></>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
        zoom={13}
        center={destination || { lat: -17.3935419, lng: -66.1570139 }}
      >
        
            {/* <Marker position={locat} /> */}
            {/* {directions && <DirectionsRenderer directions={directions} />} */}

            <Marker
                key={placeDataMap.id}
                position={destination}
                title={placeDataMap.Name}
                icon={{
                  url: placeDataMap?.CategoryID?.PinMap
                    ? placeDataMap.CategoryID.PinMap
                    : "https://firebasestorage.googleapis.com/v0/b/llajtatour-57c11.appspot.com/o/IconLocation%2FIconCategori.png?alt=media&token=069218b0-7cc7-4b61-930b-c982c0f47883",
                  scaledSize: new window.google.maps.Size(45, 50), // Ajusta el tamaño del ícono aquí (30x30 píxeles en este caso)
                  anchor: new window.google.maps.Point(5, 5), // Ajusta el punto de anclaje del ícono
                }}
              />

      </GoogleMap>


      {/* {errorMsg && <div>{errorMsg}</div>} */}
    </>
  );
};

export default MapViewWeb;

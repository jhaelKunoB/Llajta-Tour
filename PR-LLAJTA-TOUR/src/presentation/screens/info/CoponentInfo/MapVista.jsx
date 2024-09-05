import { useEffect, useState } from 'react';
//import  MapViewMovil from './MapViewMovil'
import MapViewWeb from './MapViewWeb'
import * as Location from 'expo-location';



const MapVista = () => {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setCurrentLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
        })();
      }, []);

    return(
        <>
            <MapViewWeb locat={currentLocation} />
        </>
    )
}

export default MapVista
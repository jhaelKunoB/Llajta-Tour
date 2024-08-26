import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import {Image } from "react-native";

const imgLoanding = require('../assets/loading copy.gif')
const MapPing = require('../assets/Mappin.png')

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
  const destination = { lat: placeDataMap.Coordinates.latitude, lng: placeDataMap.Coordinates.longitude }; // Punto de destino



   useEffect(() => {
     if (isLoaded && locat) {
       const directionsService = new window.google.maps.DirectionsService();
       directionsService.route(
         {
           origin: locat,
           destination: destination,
           travelMode: "DRIVING",
         },
         (result, status) => {
           if (status === "OK") {
            setDirections(result);
             console.log('Dirección obtenida');
           } else {
            console.error(`Error obteniendo direcciones ${status}`);
          }
        }
      );
     }
   }, [isLoaded, locat]);





 // if (!isLoaded) return <> <Image source={imgLoanding} style={{width:'100%', height:'100%'}} resizeMode='center' /> </>;

 
  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
        zoom={18}
        center={destination || { lat: -17.3935419, lng: -66.1570139 }}
      >
        
            {/* <Marker position={locat} /> */}
             {directions && <DirectionsRenderer directions={directions}  options={{suppressMarkers: true}} />}

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

              <Marker
                key={12}
                position={locat}
                title={'Mi Local'}
                icon={{
                   url: "https://firebasestorage.googleapis.com/v0/b/llajtatour-57c11.appspot.com/o/IconLocation%2FMap%20pin.png?alt=media&token=e40c1124-cd5c-4843-840a-6ef59d2c16ce",
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

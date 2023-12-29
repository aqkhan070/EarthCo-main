// import React, { useContext, useEffect, useRef } from "react";
// import { DataContext } from "../../context/AppData";

// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const defaultCenter = {
//   lat: 31.4237697,
//   lng: 74.2678971,
// };

// function GoogleMapApi() {
//   const { maplatLngs, setMaplatLngs } = useContext(DataContext);

//   const [map, setMap] = React.useState(null);
//   const [markers, setMarkers] = React.useState([
//     {
//       lat: 31.4237697,
//       lng: 74.2678971,
//     },
//   ]);
//   const [selectedMarker, setSelectedMarker] = React.useState(null);
//   const searchInputRef = useRef(null);

//   useEffect(() => {
//     // Load markers from localStorage on component mount

//     const savedMarkers = maplatLngs || [];
//     console.log("map lat longs", markers);
//     const newMarkers = {
//       lat: maplatLngs.lat,
//       lng: maplatLngs.lng,
//     };

//     setMarkers(newMarkers);
//     console.log("map lat longs after", markers);
//   }, [maplatLngs]);

//   const saveMarkersToLocalStorage = (markers) => {
//     localStorage.setItem("markers", JSON.stringify(markers));
//   };

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(defaultCenter);
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback() {
//     setMap(null);
//   }, []);

//   const handleSearch = () => {
//     const input = searchInputRef.current;

//     if (
//       input &&
//       window.google &&
//       window.google.maps &&
//       window.google.maps.places
//     ) {
//       const autocomplete = new window.google.maps.places.Autocomplete(input);
//       autocomplete.addListener("place_changed", () => {
//         const place = autocomplete.getPlace();
//         if (place.geometry) {
//           const newMarkers = [
//             ...markers,
//             {
//               lat: place.geometry.location.lat(),
//               lng: place.geometry.location.lng(),
//             },
//           ];
//           // setMarkers(newMarkers);
//           // saveMarkersToLocalStorage(newMarkers);

//           // Center the map on the selected place
//           if (map) {
//             map.panTo(place.geometry.location);
//           }
//         }
//       });
//     }
//   };

//   const handleMapClick = (event) => {
//     const clickedLat = event.latLng.lat();
//     const clickedLng = event.latLng.lng();

//     // setMarkers((prevMarkers) => {
//     //   // Ensure prevMarkers is an array, or initialize it as an empty array if it's null or undefined
//     //   const newMarkers = Array.isArray(prevMarkers) ? [...prevMarkers] : [];
//     //   newMarkers.push({ lat: clickedLat, lng: clickedLng });
//     //   // saveMarkersToLocalStorage(newMarkers);
//     //   return newMarkers;
//     // });
//   };

//   const handleMarkerClick = (marker) => {
//     setSelectedMarker(marker);
//   };

//   const handleInfoWindowClose = () => {
//     setSelectedMarker(null);
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyD1cYijM9cvPIRkJ3QtNFSMwLzADuO0DiE"
//       libraries={["places"]}
//     >
//       <div>
//         {/* <input
//           ref={searchInputRef}
//           type="text"
//           placeholder="Search for a place"
//           onChange={handleSearch}
//           style={{
//             width: "300px", // Set the width as needed
//             padding: "10px",
//             fontSize: "16px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             margin: "10px 0",
//           }}
//         /> */}

//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={defaultCenter}
//           zoom={1}
//           onLoad={onLoad}
//           onUnmount={onUnmount}
//           onClick={handleMapClick}
//         >
//           {/* Render markers for all clicked locations */}

//           {/* {markers.map((marker, index) => ( */}
//           <Marker
//             // key={index}
//             position={{ lat: markers.lat, lng: markers.lng }}
//             // onClick={() => handleMarkerClick(marker)}
//           />
//           {/* ))} */}

//           {selectedMarker && (
//             <InfoWindow
//               position={selectedMarker}
//               onCloseClick={handleInfoWindowClose}
//             >
//               <div>
//                 <p>Marker Info</p>
//               </div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       </div>
//     </LoadScript>
//   );
// }

// export default React.memo(GoogleMapApi);

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { memo, useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/AppData";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 31.4237697,
  lng: 74.2678971,
};

function GoogleMapApi() {
  const { maplatLngs, setMaplatLngs } = useContext(DataContext);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState({});
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    // Get Current Location in my Browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentMarkers = { lat: latitude, lng: longitude };
          setMarkers(currentMarkers);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [map]);

  useEffect(() => {
    // Adjust Pin Locations in our screen
    let latitude = maplatLngs?.lat ? maplatLngs.lat : markers.lat;
    let longitude = maplatLngs?.lng ? maplatLngs.lng : markers.lng;

    if (map) {
      map.panTo({
        lat: latitude,
        lng: longitude,
      });
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(latitude, longitude));
      map.fitBounds(bounds);
    }
  }, [markers, map, maplatLngs]);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD1cYijM9cvPIRkJ3QtNFSMwLzADuO0DiE"
      libraries={["places"]}
    >
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={1}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {Object.keys(maplatLngs).length ? (
            <Marker position={maplatLngs} />
          ) : (
            <Marker position={markers} />
          )}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <p>Marker Info</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}
export default memo(GoogleMapApi);

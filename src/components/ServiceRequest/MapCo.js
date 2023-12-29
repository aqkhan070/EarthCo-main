// import React, { useContext, useEffect, useRef, useState } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { DataContext } from "../../context/AppData";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
// import { toPng } from "html-to-image";
// import { TextField } from "@mui/material";

// const containerStyle = {
//   width: "100%",
//   height: "300px",
// };

// const defaultCenter = {
//   lat: 31.4237697,
//   lng: 74.2678971,
// };

// function GoogleMapApi() {
//   const { sRMapData, setSRMapData } = useContext(DataContext);

//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [zoom, setZoom] = useState(1);
//   const searchInputRef = useRef(null);
//   const divRef = useRef(null);

//   useEffect(() => {
//     // Load markers from localStorage on component mount
//     // const savedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
//     const savedMarkers = sRMapData || [];
//     setMarkers(savedMarkers);
//     setSRMapData(savedMarkers);

//     if (!sRMapData.length)
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             const currentMarkers = [
//               ...markers,
//               { lat: latitude, lng: longitude },
//             ];
//             // setZoom(15);
//             setMarkers(currentMarkers);
//             // const zoomInterval = setInterval(() => {
//             //   setZoom((prevZoom) => Math.max(prevZoom - 2, 10)); // Decrease by 0.1 units, adjust as needed
//             //   if (zoom <= 10) {
//             //     clearInterval(zoomInterval);
//             //   }
//             // }, 1100);
//           },
//           (error) => {
//             console.error("Error getting user location:", error);
//           }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//       }
//   }, []);

//   const htmlToImageConvert = () => {
//     toPng(divRef.current, { cacheBust: false })
//       .then((dataUrl) => {
//         const link = document.createElement("a");
//         link.download = "map_image.png";
//         link.href = dataUrl;
//         link.click();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

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
//           setMarkers(newMarkers);
//           setSRMapData(newMarkers);
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

//     setMarkers((prevMarkers) => {
//       const newMarkers = [...prevMarkers, { lat: clickedLat, lng: clickedLng }];
//       // saveMarkersToLocalStorage(newMarkers);
//       return newMarkers;
//     });

//     setSRMapData((prevMarkers) => {
//       const newMarkers = [...prevMarkers, { lat: clickedLat, lng: clickedLng }];
//       // saveMarkersToLocalStorage(newMarkers);
//       return newMarkers;
//     });
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
//         <TextField
//           ref={searchInputRef}
//           type="text"
//           placeholder="Search for a place"
//           onChange={handleSearch}
//           size="small"
//           variant="outlined"
//           className="my-3"
//         />

//         <div ref={divRef}>
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={defaultCenter}
//             onLoad={onLoad}
//             onUnmount={onUnmount}
//             onClick={handleMapClick}
//             zoom={11}
//           >
//             {/* Render markers for all clicked locations */}
//             {markers.map((marker, index) => (
//               <Marker
//                 key={index}
//                 position={marker}
//                 onClick={() => handleMarkerClick(marker)}
//               />
//             ))}

//             {selectedMarker && (
//               <InfoWindow
//                 position={selectedMarker}
//                 onCloseClick={handleInfoWindowClose}
//               >
//                 <div>
//                   <p>Marker Info</p>
//                 </div>
//               </InfoWindow>
//             )}
//           </GoogleMap>
//         </div>
//         <button onClick={htmlToImageConvert} className="btn btn-primary mt-2">
//           save
//         </button>
//       </div>
//     </LoadScript>
//   );
// }

// export default React.memo(GoogleMapApi);

import React, { useEffect, useRef, useState, useContext } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { TextField } from "@mui/material";
import { toPng } from "html-to-image";
import { DataContext } from "../../context/AppData";

const containerStyle = {
  width: "100%",
  height: "300px",
};

// const defaultCenter = {
//   lat: 31.4237697,
//   lng: 74.2678971,
// };

function GoogleMapApi() {
  const { sRMapData, setSRMapData } = useContext(DataContext);

  const divRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // useEffect(() => {
  //   const saveLocations = localStorage.getItem("locations");
  //   if (saveLocations == null) {
  //     handleCurrentLocation();
  //   } else {
  //     setMarkers(JSON.parse(saveLocations));
  //   }
  // }, []);

  useEffect(() => {
    handleCurrentLocation();

    // setMarkers(saveLocations);
  }, []);

  useEffect(() => {
    const sRMapDataArray = sRMapData.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
    }));
    setMarkers(sRMapDataArray);

    console.log("markers are", markers);
  }, [sRMapData]);

  useEffect(() => {
    // Adjust Location Pins in our screen
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
      });
      map.fitBounds(bounds);
    }
  }, [markers, map]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentMarkers = [{ lat: latitude, lng: longitude }];
          setMarkers(currentMarkers);
          if (map) {
            map.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
    setSRMapData((prevMarkers) => [...prevMarkers, { lat, lng }]);
    console.log("mapdata is", markers);
  };

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const onhandleSaveLocation = () => {
    // save locations on localstorage
    // localStorage.setItem("locations", JSON.stringify(markers));
    // save map image in browser
    toPng(divRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "map_image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    const input = searchInputRef.current;

    if (
      input &&
      window.google &&
      window.google.maps &&
      window.google.maps.places
    ) {
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const newMarkers = [
            ...markers,
            {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
          ];
          setMarkers(newMarkers);
          setSRMapData(newMarkers);
          // saveMarkersToLocalStorage(newMarkers);

          // Center the map on the selected place
          if (map) {
            map.panTo(place.geometry.location);
          }
        }
      });
    }
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyD1cYijM9cvPIRkJ3QtNFSMwLzADuO0DiE"
        libraries={["places"]}
      >
        <div>
          <TextField
            inputRef={searchInputRef}
            type="text"
            placeholder="Search for a place"
            onChange={handleSearch}
            size="small"
            variant="outlined"
            className="my-3"
          />
          <div ref={divRef}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              // center={defaultCenter}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={handleMapClick}
              zoom={1}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                />
              ))}
            </GoogleMap>
          </div>
          <button
            className="btn btn-primary mt-2"
            onClick={onhandleSaveLocation}
          >
            Save
          </button>
        </div>
      </LoadScript>
    </>
  );
}
export default React.memo(GoogleMapApi);

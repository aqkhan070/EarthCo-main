import React, { useContext, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { DataContext } from "../../context/AppData";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 37.0902,
  lng: 95.7129,
};

function GoogleMapApi() {
  const { sRMapData, setSRMapData } = useContext(DataContext);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Load markers from localStorage on component mount
    // const savedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    const savedMarkers = sRMapData || [];
    setMarkers(savedMarkers);
    setSRMapData(savedMarkers);
  }, []);

  const saveMarkersToLocalStorage = (markers) => {
    localStorage.setItem("markers", JSON.stringify(markers));
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

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

  const handleMapClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    setMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers, { lat: clickedLat, lng: clickedLng }];
      // saveMarkersToLocalStorage(newMarkers);
      return newMarkers;
    });

    setSRMapData((prevMarkers) => {
      const newMarkers = [...prevMarkers, { lat: clickedLat, lng: clickedLng }];
      // saveMarkersToLocalStorage(newMarkers);
      return newMarkers;
    });
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
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
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a place"
          onChange={handleSearch}
          style={{
            width: "300px", // Set the width as needed
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            margin: "10px 0",
          }}
        />

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
        >
          {/* Render markers for all clicked locations */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

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

export default React.memo(GoogleMapApi);

import React, { useState, useEffect, memo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import CircularProgress from "@mui/material/CircularProgress";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 31.4237697,
  lng: 74.2678971,
};

function GoogleMapApi({ mapData = [], toolTipData }) {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (map && mapData && mapData.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      mapData.forEach((location) => {
        if (isFinite(location.lat) && isFinite(location.lng)) {
          bounds.extend(
            new window.google.maps.LatLng(location.lat, location.lng)
          );
        }
      });
      map.fitBounds(bounds);
    }
  }, [map, mapData]);

  useEffect(() => {
    if (
      map &&
      toolTipData &&
      isFinite(toolTipData.lat) &&
      isFinite(toolTipData.lng)
    ) {
      map.panTo(toolTipData);
      map.setZoom(15); // Adjust zoom level as needed
    }
  }, [map, toolTipData]);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const handleMarkerClick = (location) => {
    setSelectedMarker(location);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD1cYijM9cvPIRkJ3QtNFSMwLzADuO0DiE",
    libraries: ["places"],
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div className="map-loader"><CircularProgress /></div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {mapData.length > 0 &&
          mapData.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h6 className="pb-0 mb-0">
                <strong>Service Request Number:</strong>
              </h6>
              <p className="mt-0 pt-0" style={{ lineHeight: "1.3" }}>
                {selectedMarker.ServiceRequestNumber}
              </p>
              <h6 className="pb-0 mb-0">
                <strong>Customer Name:</strong>
              </h6>
              <p className="mt-0 pt-0" style={{ lineHeight: "1.3" }}>
                {selectedMarker.CustomerName}
              </p>
              <h6 className="pb-0 mb-0">
                <strong>Address:</strong>
              </h6>
              <p className="mt-0 pt-0" style={{ lineHeight: "1.3" }}>
                {selectedMarker.Address}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default memo(GoogleMapApi);

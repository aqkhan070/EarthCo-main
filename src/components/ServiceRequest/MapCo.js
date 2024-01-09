import React, { useEffect, useRef, useState, useContext } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { TextField } from "@mui/material";
import { toPng } from "html-to-image";
import { DataContext } from "../../context/AppData";
import SyncIcon from "@mui/icons-material/Sync";
const containerStyle = {
  width: "100%",
  height: "300px",
};

const libraries = ["places"];

function GoogleMapApi() {
  const { sRMapData, setSRMapData } = useContext(DataContext);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD1cYijM9cvPIRkJ3QtNFSMwLzADuO0DiE",
    libraries,
  });

  const divRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    handleCurrentLocation();
  }, []);

  const refreshMap = () => {
    const sRMapDataArray = sRMapData.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
    }));
    setMarkers(sRMapDataArray);

    if (map && sRMapDataArray.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      sRMapDataArray.forEach((marker) => {
        bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
      });
      map.fitBounds(bounds);
    }
  };

  useEffect(() => {
    const sRMapDataArray = sRMapData.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
    }));
    setMarkers(sRMapDataArray);
  }, [sRMapData]);

  useEffect(() => {
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
  };

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const onhandleSaveLocation = () => {
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
    if (!input) return;
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      const newMarkers = [
        ...markers,
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      ];
      setMarkers(newMarkers);
      setSRMapData(newMarkers);
      if (map) {
        map.panTo(place.geometry.location);
      }
    });
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-6">
            {" "}
            <TextField
              inputRef={searchInputRef}
              type="text"
              placeholder="Search for a place"
              onChange={handleSearch}
              size="small"
              variant="outlined"
              className="my-3"
            />
          </div>
          <div className="col-md-6 text-end">
            {" "}
            <span
              className="pt-5"
              style={{ cursor: "pointer" }}
              onClick={refreshMap}
            >
              <SyncIcon
                sx={{
                  color: "black",
                  fontSize: "30px",
                  marginTop: "20px",
                  marginRight: "20px",
                }}
              />
            </span>
          </div>
        </div>

        <div ref={divRef}>
          <GoogleMap
            mapContainerStyle={containerStyle}
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
        <button className="btn btn-primary mt-2" onClick={onhandleSaveLocation}>
          Save
        </button>
      </div>
    </>
  );
}

export default React.memo(GoogleMapApi);

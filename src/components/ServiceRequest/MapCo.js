import React, { useEffect, useRef, useState, useContext } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { CircularProgress, TextField } from "@mui/material";
import { toPng } from "html-to-image";
import { DataContext } from "../../context/AppData";
import SyncIcon from "@mui/icons-material/Sync";
import html2pdf from "html2pdf.js";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/FileDownloadOutlined";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const libraries = ["places"];

function GoogleMapApi() {
  const { sRMapData, setSRMapData } = useContext(DataContext);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD1cYijM9cvPIRkJ3QtNFSMwLzADuO0DiE", // Replace with your API key
    libraries,
  });

  const divRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [zoomLevel, setZoomLevel] = useState(14);
  const handleZoomChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };
  useEffect(() => {
    handleCurrentLocation();
    setTimeout(() => {
      handleZoomChange(zoomLevel - 1);
    }, 1000);
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
    if (map && markers.length > 0) {
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

  const [imgSaveLoading, setImgSaveLoading] = useState(false);

  const onhandleSaveLocation = () => {
    setImgSaveLoading(true);
    toPng(divRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "map_image.png";
        link.href = dataUrl;
        link.click();
        setImgSaveLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setImgSaveLoading(false);
      });
  };
  const [pdfSaveLoading, setPdfSaveLoading] = useState(false);

 
const handleSavePdf = () => {
  setPdfSaveLoading(true);
  const scaleFactor = 2; // Adjust the scale factor as needed

  html2canvas(divRef.current, {
      scale: scaleFactor,
      useCORS: true, // Enable cross-origin resource sharing
      allowTaint: true // Allow images from different origins to be included
  }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');

      const pdf = new jsPDF({
          unit: 'mm',
          format: 'a4',
          orientation: 'landscape'
      });

      const imgWidth = 297; // A4 size in mm
      const imgHeight = 150;

      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save('map_image.pdf');
      setPdfSaveLoading(false);
  }).catch((error) => {
      console.error('Error generating PDF:', error);
      setPdfSaveLoading(false);
  });
};


  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return (
      <div className="map-loader">
        <CircularProgress />
      </div>
    );
  }

  const handleDeleteMarker = () => {
    // Remove the selectedMarker from the markers array and update state
    const updatedMarkers = markers.filter(
      (marker) => marker !== selectedMarker
    );
    setMarkers(updatedMarkers);
    setSRMapData(updatedMarkers);

    // Close the tooltip
    setSelectedMarker(null);
  };

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

        <div id="SR-preview" ref={divRef}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
            zoom={zoomLevel}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => setSelectedMarker(marker)} // Handle marker click
              />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)} // Close the tooltip
              >
                <div>
                  <h5>Remove Marker?</h5>
                  {/* <h6>Location: {selectedMarker}</h6> */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleDeleteMarker}
                  >
                    Delete Marker
                  </button>{" "}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
        <div className="row ">
          <div className="col-md-12 text-end mt-2">
            <LoadingButton
              variant="contained"
              loading={imgSaveLoading}
              startIcon={<SendIcon sx={{ fontSize: 2 }} />}
              onClick={onhandleSaveLocation}
              disableElevation
              sx={{
                marginRight: "0.6em",

                color: "#fff",

                textTransform: "capitalize",
              }}
            >
              PNG
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={pdfSaveLoading}
              startIcon={<SendIcon sx={{ fontSize: 2 }} />}
              onClick={handleSavePdf}
              disableElevation
              sx={{
                marginRight: "0.6em",

                color: "#fff",

                textTransform: "capitalize",
              }}
            >
              PDF
            </LoadingButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(GoogleMapApi);

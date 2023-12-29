import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import MapCo from "./MapCo";
import Cookies from "js-cookie";
import axios from "axios";
import { DataContext } from "../../context/AppData";
import { CircularProgress } from "@mui/material";
import EventPopups from "../Reusable/EventPopups";

const Map = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { maplatLngs, setMaplatLngs } = useContext(DataContext);

  const [selectedType, setSelectedType] = useState("Inspect and Advise.");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSR, setselectedSR] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  // const [filteredMapData, setFilteredMapData] = useState([]);

  const [searchSR, setsearchSR] = useState("");

  const [mapData, setMapData] = useState([]);

  const getSRMap = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestListForMap`,
        {
          headers,
        }
      );
      console.log("map Data", response.data);
      setMapData(response.data);
      setIsLoading(false);
      // window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error("There was angetting map:", error);
    }
  };

  const filteredMapData = mapData.filter((map) => {
    const typeMatches =
      selectedType === "Select Type" || map.Type === selectedType;
    const queryMatches =
      map.ServiceRequestNumber.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      map.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      map.Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      map.Address.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatches && queryMatches;
  });

  const getLatLngs = (map) => {
    if(!map.lat){
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Location not Found");
      return
    }
    console.log("map dataa", map);
    setMaplatLngs({
      lat: map.lat,
      lng: map.lng,
    });
  };

  useEffect(() => {
    getSRMap();
  }, []);

  if (isLoading) {
    return (
      <div className="center-loader">
        <CircularProgress></CircularProgress>
      </div>
    );
  }

  return (
    <>
     <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5">
                <div>
                  <div>
                    <input
                      type="text"
                      className="form-control input-default "
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search something"
                    />
                  </div>
                  <div className="mt-2">
                    <Form.Select
                      className="form-control bg-white"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="Inspect and Advise.">
                        Inspect and Advise
                      </option>
                      <option value="Irrigation">Irrigation</option>
                      <option value="Irrigator Form">Irrigator Form</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Other">Other</option>
                      <option value="Proposal Needed">Proposal Needed</option>
                      <option value="Tree Care">Tree Care</option>
                    </Form.Select>
                  </div>

                  <div className="card mt-2  ">
                    <div className="card-body pt-0">
                      <div className="tab-content">
                        <div style={{ height: "70vh", overflowY: "scroll" }}>
                          {filteredMapData.map((map) => (
                            <div
                              style={{ cursor: "pointer" }}
                              key={map.ServiceRequestId}
                              className="tab-pane active"
                            >
                              <div className="row serviceLocations py-0">
                                <div
                                  onClick={() => {
                                    getLatLngs(map);
                                    setselectedSR(map.ServiceRequestId);
                                  }}
                                  className="col-md-12"
                                >
                                  <div
                                    className={
                                      selectedSR === map.ServiceRequestId
                                        ? "locationInfo selected-map"
                                        : "locationInfo"
                                    }
                                  >
                                    <div className="col-md-3 flex-box">
                                      <p>{map.ServiceRequestNumber}</p>
                                    </div>
                                    <div className="col-md-9">
                                      <div className="media-body">
                                        <h6 className="mb-1">
                                          {map.CustomerName}
                                        </h6>
                                        <p className="mb-1">{map.Address}</p>
                                        <span className="badge badge-primary">
                                          {map.Type}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <MapCo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;

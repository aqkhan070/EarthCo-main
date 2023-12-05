import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import MapCo from "./MapCo";
import Cookies from "js-cookie";
import axios from "axios";
import { DataContext } from "../../context/AppData";
import { CircularProgress } from "@mui/material";

const Map = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { maplatLngs, setMaplatLngs } = useContext(DataContext);

  const [selectedType, setSelectedType] = useState("Inspect and Advise.");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
                      className="bg-white"
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

                  <div className="card mt-2">
                    <div className="card-body">
                      {/* <ul className="nav nav-pills">
                    <li className=" nav-item">
                      <a
                        href="#navpills-1"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        aria-expanded="false"
                      >
                        All
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#navpills-2"
                        className="nav-link"
                        data-bs-toggle="tab"
                        aria-expanded="false"
                      >
                        Assigned
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#navpills-3"
                        className="nav-link"
                        data-bs-toggle="tab"
                        aria-expanded="true"
                      >
                        Un-Assigned
                      </a>
                    </li>
                  </ul> */}
                      <div className="tab-content">
                        {filteredMapData.map((map) => {
                          return (
                            <div
                              style={{ cursor: "pointer" }}
                              key={map.ServiceRequestId}
                              className="tab-pane active"
                            >
                              <div className="row serviceLocations pt-2">
                                <div
                                  onClick={() => {
                                    getLatLngs(map);
                                  }}
                                  className="col-md-12"
                                >
                                  <div className="locationInfo">
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
                          );
                        })}

                        <div id="navpills-2" className="tab-pane">
                          <div className="row serviceLocations pt-2">
                            <div className="col-md-12">
                              <div className="locationInfo">
                                <div className="col-md-3 flex-box">
                                  <p>#646546</p>
                                </div>
                                <div className="col-md-9">
                                  <div className="media-body">
                                    <h6 className="mb-1">Customer 1</h6>
                                    <p className="mb-1">
                                      C-II Block C 2 Phase 1 Johar Town, Lahore,
                                      Punjab 54770
                                    </p>
                                    <span className="badge badge-primary">
                                      Irrigation
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="locationInfo">
                                <div className="col-md-3 flex-box">
                                  <p>#646546</p>
                                </div>
                                <div className="col-md-9">
                                  <div className="media-body">
                                    <h6 className="mb-1">Customer 2</h6>
                                    <p className="mb-1">
                                      C-II Block C 2 Phase 1 Johar Town, Lahore,
                                      Punjab 54770
                                    </p>
                                    <span className="badge badge-primary">
                                      Irrigation
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="navpills-3" className="tab-pane">
                          <div className="row serviceLocations pt-2">
                            <div className="col-md-12">
                              <div className="locationInfo">
                                <div className="col-md-3 flex-box">
                                  <p>#646546</p>
                                </div>
                                <div className="col-md-9">
                                  <div className="media-body">
                                    <h6 className="mb-1">Customer 3</h6>
                                    <p className="mb-1">
                                      C-II Block C 2 Phase 1 Johar Town, Lahore,
                                      Punjab 54770
                                    </p>
                                    <span className="badge badge-primary">
                                      Maintenance
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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

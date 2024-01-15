import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import MapCo from "./MapCo";
import Cookies from "js-cookie";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress } from "@mui/material";
import EventPopups from "../Reusable/EventPopups";

const Map = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSR, setselectedSR] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const [mapData, setMapData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [originalMapData, setOriginalMapData] = useState([]);
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
      setCustomers(response.data);
      setOriginalMapData(response.data);
      setIsLoading(false);
      // window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error("There was an error getting map:", error);
    }
  };

  const filteredMapData =
    selectedType === "All"
      ? mapData
      : mapData
          .filter((map) => {
            if (!map) {
              return false;
            }

            const typeMatches =
              selectedType === "Select Type" || map.Type === selectedType;

            const queryMatches =
              (map.ServiceRequestNumber &&
                map.ServiceRequestNumber.toLowerCase().includes(
                  searchQuery.toLowerCase()
                )) ||
              (map.CustomerName &&
                map.CustomerName.toLowerCase().includes(
                  searchQuery.toLowerCase()
                )) ||
              (map.Type &&
                map.Type.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (map.Address &&
                map.Address.toLowerCase().includes(searchQuery.toLowerCase()));

            return typeMatches && queryMatches;
          })
          .sort((a, b) => b.ServiceRequestId - a.ServiceRequestId);

  const [toolTipData, setToolTipData] = useState({});

  const getLatLngs = (map) => {
    if (!map.lat) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Location not Found");
      return;
    }

    setToolTipData(map);
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
                    {/*  <label>Search</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search SR #, Customer Name, Address, Type "
                    /> */}

                    <label className="form-label">Select Customer</label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={customers.filter(
                        (option, index, self) =>
                          self.findIndex(
                            (item) => item.CustomerName === option.CustomerName
                          ) === index
                      )}
                      getOptionLabel={(option) => option.CustomerName}
                      onChange={(e, value) => {
                        if (value) {
                          // Filter originalMapData based on the selected customer
                          const filteredData = originalMapData.filter(
                            (item) => item.CustomerName === value.CustomerName
                          );
                          setMapData(filteredData); // Update mapData with the filtered data
                        } else {
                          // If value is null (text field cleared), reset mapData to original data
                          setMapData(originalMapData);
                        }
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.CustomerName === value.CustomerName
                      }
                      renderOption={(props, option) => (
                        <li {...props}>
                          <div className="customer-dd-border-map">
                            <h6>{option.CustomerName}</h6>
                          </div>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          fullWidth
                          onClick={() => {}}
                          placeholder="Choose..."
                          className="bg-white"
                        />
                      )}
                    />
                  </div>
                  <div className="mt-2">
                    <label>Select Type</label>
                    <Form.Select
                      className="form-control bg-white"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Inspect and Advise">
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
                          {filteredMapData.length <= 0 ? (
                            <h4 className="mt-3">No Record Found</h4>
                          ) : (
                            filteredMapData.map((map) => (
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
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <MapCo mapData={mapData} toolTipData={toolTipData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;

import React from "react";
import { Print, Email, Download } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomerSearch from "../Hooks/useCustomerSearch";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import {
  Autocomplete,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import Cookies from "js-cookie";
import EventPopups from "../Reusable/EventPopups";
import Contacts from "../CommonComponents/Contacts";
import ServiceLocations from "../CommonComponents/ServiceLocations";
import { DataContext } from "../../context/AppData";
import CircularProgress from "@mui/material/CircularProgress";
import LoaderButton from "../Reusable/LoaderButton";
import useFetchContactEmail from "../Hooks/useFetchContactEmail";

const LandscapeForm = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { loggedInUser, setLoggedInUser } = useContext(DataContext);
  const { customerSearch, fetchCustomers } = useCustomerSearch();
  const { name, setName, fetchName } = useFetchCustomerName();
  const { contactEmail, fetchEmail } = useFetchContactEmail();

  const [customers, setCustomers] = useState([]);
  const [serviceLocations, setServiceLocations] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    StatusId: 1,
  });
  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const navigate = useNavigate();

  const fetchServiceLocations = async (id) => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerServiceLocation?id=${id}`,
        { headers }
      )
      .then((res) => {
        setSLList(res.data);
        console.log("service locations are", res.data);
      })
      .catch((error) => {
        setSLList([]);
        console.log("service locations fetch error", error);
      });
  };

  const fetctContacts = async (id) => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerContact?id=${id}`,
        { headers }
      )
      .then((res) => {
        console.log("contacts data isss", res.data);
        setContactList(res.data);
      })
      .catch((error) => {
        setContactList([]);
        console.log("contacts data fetch error", error);
      });
  };
  const fetchStaffList = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`,
        { headers }
      );
      setStaffData(response.data);

      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
    }
  };

  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    fetchName(formData.CustomerId);
    console.log("selected customer name iss......", name);
    console.log("main payload isss", formData);
  }, [formData.CustomerId]);

  const [loading, setLoading] = useState(true);
  const getLandscape = async () => {
    if (!idParam) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/GetMonthlyLandsacpe?id=${idParam}`,
        { headers }
      );
      setFormData(res.data);
      setLoading(false);
      fetchEmail(res.data.ContactId);

      console.log("reponse landscape is", res.data);
    } catch (error) {
      console.log("api call error", error);
      setLoading(false);
    }
  };

  const handleCustomerAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange

    const simulatedEvent = {
      target: {
        name: "CustomerId",
        value: newValue ? newValue.UserId : "",
      },
    };
    handleInputChange(simulatedEvent);
  };
  const handleSLAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "ServiceLocationId",
        value: newValue ? newValue.ServiceLocationId : "",
      },
    };

    handleInputChange(simulatedEvent);
  };

  const handleContactAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "ContactId",
        value: newValue ? newValue.ContactId : "",
      },
    };

    handleInputChange(simulatedEvent);
  };

  const handleRBAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "RequestBy",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (e, newValue) => {
    const { name, value, type, checked } = e.target;

    setSelectedCustomer(newValue);

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId
    const adjustedValue = ["UserId", "ServiceLocationId", "ContactId"].includes(
      name
    )
      ? Number(value)
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : adjustedValue,
    }));

    // if (name === "UserId" && value != 0) {
    //   console.log(value);
    //   fetchServiceLocations(value);
    //   fetctContacts(value);
    // }
    console.log("landcape payload", formData);
  };

  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async (e) => {
    setSubmitClicked(true);
    setDisableButton(true);
    e.preventDefault();
    if (
      !formData.CustomerId ||
      !formData.ServiceLocationId ||
      !formData.ContactId ||
      !formData.RequestBy
    ) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      setDisableButton(false);
      console.log("Required fields are empty");
      return;
    }

    console.log("payload", formData);

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/AddMonthlyLandsacpe",
        formData,
        { headers }
      );

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);

      setDisableButton(false);
      setTimeout(() => {
        navigate(`/landscape/landscape-report?id=${response.data.Id}`);
      }, 4000);

      // Log the response or handle success
      console.log("Response:", response.data);
    } catch (error) {
      // Handle the error
      setDisableButton(false);
      console.error("API Post Error:", error);
    }
  };

  useEffect(() => {
    fetchStaffList();
    getLandscape();
  }, []);

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="container-fluid">
        {loading ? (
          <div className="center-loader">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="card">
              <div className="itemtitleBar">
                <h4>Customer Information</h4>
              </div>

              <div className="card-body py-0" style={{ position: "relative" }}>
                {loggedInUser.userRole !== "1" && (
                  <div
                    className="overlay"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      zIndex: 999,
                    }}
                  ></div>
                )}
                <div className="estDataBox">
                  <div className="basic-form mb-2">
                    <div className="row mt-2">
                      <div className="col-md-3">
                        <label className="form-label">
                          Customers <span className="text-danger">*</span>
                        </label>
                        <Autocomplete
                          id="staff-autocomplete"
                          size="small"
                          options={customerSearch}
                          getOptionLabel={(option) => option.CompanyName || ""}
                          value={name ? { CompanyName: name } : null}
                          onChange={handleCustomerAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.UserId === value.CustomerId
                          }
                          renderOption={(props, option) => (
                            <li {...props}>
                              <div className="customer-dd-border">
                                <h6> {option.CompanyName}</h6>
                                <small># {option.UserId}</small>
                              </div>
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              onClick={() => {
                                setName("");
                              }}
                              onChange={(e) => {
                                fetchCustomers(e.target.value);
                              }}
                              placeholder="Choose..."
                              error={submitClicked && !formData.CustomerId}
                              className="bg-white"
                            />
                          )}
                        />
                      </div>
                      <div className="col-md-3 ">
                        <div className="row">
                          <div className="col-md-auto">
                            <label className="form-label">
                              Service Locations
                              <span className="text-danger">*</span>{" "}
                            </label>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            {formData.CustomerId ? (
                              <ServiceLocations
                                fetchServiceLocations={fetchServiceLocations}
                                fetchCustomers={fetchCustomers}
                                customerId={formData.CustomerId}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <Autocomplete
                          id="inputState19"
                          size="small"
                          options={sLList}
                          getOptionLabel={(option) => option.Name || ""}
                          value={
                            sLList.find(
                              (customer) =>
                                customer.ServiceLocationId ===
                                formData.ServiceLocationId
                            ) || null
                          }
                          onChange={handleSLAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.ServiceLocationId === value.ServiceLocationId
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder="Service Locations"
                              error={
                                submitClicked && !formData.ServiceLocationId
                              }
                              className="bg-white"
                            />
                          )}
                          aria-label="Default select example"
                        />
                      </div>
                      <div className="col-md-3 ">
                        <div className="row">
                          <div className="col-md-auto">
                            <label className="form-label">
                              Contacts<span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            {formData.CustomerId ? (
                              <Contacts
                                fetctContacts={fetctContacts}
                                fetchCustomers={fetchCustomers}
                                customerId={formData.CustomerId}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <Autocomplete
                          id="inputState299"
                          size="small"
                          options={contactList}
                          getOptionLabel={(option) => option.FirstName || ""}
                          value={
                            contactList.find(
                              (contact) =>
                                contact.ContactId === formData.ContactId
                            ) || null
                          }
                          onChange={handleContactAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.ContactId === value.ContactId
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder="Contacts"
                              error={submitClicked && !formData.ContactId}
                              className="bg-white"
                            />
                          )}
                          aria-label="Contact select"
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">
                          Regional Manager{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Autocomplete
                          id="staff-autocomplete"
                          size="small"
                          options={staffData.filter(
                            (staff) => staff.Role === "Regional Manager"
                          )}
                          getOptionLabel={(option) => option.FirstName || ""}
                          value={
                            staffData.find(
                              (staff) => staff.UserId === formData.RequestBy
                            ) || null
                          }
                          onChange={handleRBAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.UserId === value.RequestedBy
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              error={submitClicked && !formData.RequestBy}
                              placeholder="Choose..."
                              className="bg-white"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {" "}
                <div className="col-lg-3 col-md-3 ms-3 mb-3">
                  <label className="form-label">Status:</label>
                  <FormControl fullWidth>
                    <Select
                      name="StatusId"
                      value={formData.StatusId || 1}
                      onChange={handleInputChange}
                      size="small"
                    >
                      <MenuItem value={1}>Open</MenuItem>
                      <MenuItem value={2}>Closed</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Maintainence Report</h4>
                  </div>
                  <div className="basic-form">
                    <form className="card-body">
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Supervisor Visited the job weekly</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="SupervisorVisitedthejobweekly"
                              value={formData.SupervisorVisitedthejobweekly}
                              checked={formData.SupervisorVisitedthejobweekly}
                              onChange={handleInputChange}
                              className="form-check-input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Completed Litter pickup of ground areas</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="CompletedLitterpickupofgroundareas"
                              value={
                                formData.CompletedLitterpickupofgroundareas
                              }
                              checked={
                                formData.CompletedLitterpickupofgroundareas
                              }
                              onChange={handleInputChange}
                              className="form-check-input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Completed sweeping or blowing of walkways</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Completedsweepingorblowingofwalkways"
                              value={
                                formData.Completedsweepingorblowingofwalkways
                              }
                              checked={
                                formData.Completedsweepingorblowingofwalkways
                              }
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>High priority areas were Visited weekly</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="HighpriorityareaswereVisitedweekly"
                              value={
                                formData.HighpriorityareaswereVisitedweekly
                              }
                              checked={
                                formData.HighpriorityareaswereVisitedweekly
                              }
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>V Ditches were cleaned and inspected</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="VDitcheswerecleanedandinspected"
                              onChange={handleInputChange}
                              value={formData.VDitcheswerecleanedandinspected}
                              checked={formData.VDitcheswerecleanedandinspected}
                              className="form-check-input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="row"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>
                              Weep screen inspectedand cleaned in rotation
                              section
                            </h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              name="WeepscreeninspectedandcleanedinrotationsectionId"
                              onChange={handleInputChange}
                              value={
                                formData.WeepscreeninspectedandcleanedinrotationsectionId
                              }
                              className="datepicker-default form-control form-control-sm"
                              id="datepicker"
                            />

                            {/* <select className="default-select  form-control wide" >
                                                                <option>Select</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                            </select> */}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Lawn Maintainence</h4>
                    </div>
                    <div className="basic-form">
                      <form className="card-body">
                        <div className="col-md-12">
                          <div
                            className="row"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>Fertilization of truf occoured</h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                name="Fertilizationoftrufoccoured"
                                onChange={handleInputChange}
                                value={formData.Fertilizationoftrufoccoured}
                                className="datepicker-default form-control form-control-sm"
                                id="datepicker"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>Truf was moved and edged weekly</h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="checkbox"
                                name="Trufwasmovedandedgedweekly"
                                onChange={handleInputChange}
                                value={formData.Trufwasmovedandedgedweekly}
                                checked={formData.Trufwasmovedandedgedweekly}
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Shrub Maintainence</h4>
                    </div>
                    <div className="basic-form">
                      <form className="card-body">
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>
                                Shrubs trimmed according to rotation schedule
                              </h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="Shrubstrimmedaccordingtorotationschedule"
                                onChange={handleInputChange}
                                value={
                                  formData.Shrubstrimmedaccordingtorotationschedule
                                }
                                checked={
                                  formData.Shrubstrimmedaccordingtorotationschedule
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div
                            className="row"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>Fertilization of Shrubs occoured</h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                name="FertilizationofShrubsoccoured"
                                onChange={handleInputChange}
                                value={formData.FertilizationofShrubsoccoured}
                                className="datepicker-default form-control"
                                id="datepicker"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Ground cover and flowerbed Maintainence</h4>
                    </div>
                    <div className="basic-form">
                      <form className="card-body">
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>
                                Watering of flowerbeds Completed and checked
                              </h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="checkbox"
                                name="WateringofflowerbedsCompletedandchecked"
                                onChange={handleInputChange}
                                value={
                                  formData.WateringofflowerbedsCompletedandchecked
                                }
                                checked={
                                  formData.WateringofflowerbedsCompletedandchecked
                                }
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Irrigation System</h4>
                    </div>
                    <div className="basic-form">
                      <form className="card-body">
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>Heads were adjusted for maximum coverage</h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="checkbox"
                                name="Headswereadjustedformaximumcoverage"
                                onChange={handleInputChange}
                                value={
                                  formData.Headswereadjustedformaximumcoverage
                                }
                                checked={
                                  formData.Headswereadjustedformaximumcoverage
                                }
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>
                                Repairs were made to maintain an effective
                                system
                              </h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="checkbox"
                                name="Repairsweremadetomaintainaneffectivesystem"
                                onChange={handleInputChange}
                                value={
                                  formData.Repairsweremadetomaintainaneffectivesystem
                                }
                                checked={
                                  formData.Repairsweremadetomaintainaneffectivesystem
                                }
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>Controllers were inspected and adjusted</h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="checkbox"
                                name="Controllerswereinspectedandadjusted"
                                onChange={handleInputChange}
                                value={
                                  formData.Controllerswereinspectedandadjusted
                                }
                                checked={
                                  formData.Controllerswereinspectedandadjusted
                                }
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>Main line was repaired</h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="checkbox"
                                name="Mainlinewasrepaired"
                                onChange={handleInputChange}
                                value={formData.Mainlinewasrepaired}
                                checked={formData.Mainlinewasrepaired}
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>Valve(s) was repaired</h5>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="checkbox"
                                name="Valvewasrepaired"
                                onChange={handleInputChange}
                                value={formData.Valvewasrepaired}
                                checked={formData.Valvewasrepaired}
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Rotation</h4>
                    </div>
                    <div className="basic-form">
                      <form className="card-body">
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>This month's expected rotation schedule</h5>
                            </div>
                            <div className="col-md-7">
                              <div className="basic-form">
                                <form>
                                  <div className="mb-3">
                                    <textarea
                                      className="form-txtarea form-control"
                                      name="Thismonthexpectedrotationschedule"
                                      onChange={handleInputChange}
                                      value={
                                        formData.Thismonthexpectedrotationschedule
                                      }
                                      rows="2"
                                      id="comment"
                                    ></textarea>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Extra Information</h4>
                    </div>
                    <div className="basic-form">
                      <form className="card-body">
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-5"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <h5>Notes</h5>
                            </div>
                            <div className="col-md-7">
                              <div className="basic-form">
                                <form>
                                  <div className="mb-3">
                                    <textarea
                                      className="form-txtarea form-control"
                                      rows="2"
                                      name="Notes"
                                      onChange={handleInputChange}
                                      value={formData.Notes}
                                      id="comment"
                                    ></textarea>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row text-end">
              <div className="col-md-9 pe-0">
                {idParam ? (
                  <>
                    <button
                      type="button"
                      className="mt-1 btn btn-sm btn-outline-primary estm-action-btn"
                      onClick={() => {
                        navigate(
                          `/send-mail?title=${"Monthly Landscape"}&mail=${contactEmail}`
                        );
                        // sendEmail(
                        //   `/estimates/estimate-preview?id=${idParam}`,
                        //   formData.CustomerId,
                        //   formData.ContactId,
                        //   false
                        // );
                      }}
                    >
                      <Email />
                    </button>

                    <button
                      type="button"
                      className="mt-1 btn btn-sm btn-outline-primary estm-action-btn"
                      onClick={() => {
                        navigate(`/landscape/landscape-report?id=${idParam}`);
                      }}
                    >
                      <Print></Print>
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-md-3 ps-0">
                <LoaderButton
                  loading={disableButton}
                  handleSubmit={handleSubmit}
                >
                  Save & Perview
                </LoaderButton>

                <button
                  className="btn btn-danger light ms-1"
                  onClick={() => {
                    navigate("/landscape");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LandscapeForm;

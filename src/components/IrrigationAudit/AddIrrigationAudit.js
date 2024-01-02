import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

import { NavLink, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import useCustomerSearch from "../Hooks/useCustomerSearch";
import { CircularProgress } from "@mui/material";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import formatDate from "../../custom/FormatDate";
import AuditController from "./AuditController";
import AuditControllerTable from "./AuditControllerTable";
import Contacts from "../CommonComponents/Contacts";

const AddIrrigationAudit = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [formData, setFormData] = useState({
    ReportDate: new Date().toISOString().substr(0, 10),
  });

  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSL, setSelectedSL] = useState(null);
  const [staffData, setStaffData] = useState([]);

  const [submitClicked, setSubmitClicked] = useState(false);
  const { name, setName, fetchName } = useFetchCustomerName();
  const { customerSearch, fetchCustomers } = useCustomerSearch();

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const [addSucces, setAddSucces] = useState("");

  const navigate = useNavigate();

  const handleCustomerAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    setErrorMessage("");
    const simulatedEvent = {
      target: {
        name: "CustomerId",
        value: newValue ? newValue.UserId : "",
      },
    };

    setSelectedCustomer(newValue);
    console.log("selected customer data", newValue);

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event

    handleInputChange(simulatedEvent);
  };
  const fetctContacts = async (id) => {
    if (!id) {
      return;
    }
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
  const fetchServiceLocations = async (id) => {
    if (!id) {
      return;
    }
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerServiceLocation?id=${id}`
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

  const handleRBAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "RegionalManagerId",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
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

    setFormData({
      ...formData,
      ContactName: newValue.FirstName,
      ContactCompany: newValue.CompanyName,
      ContactEmail: newValue.Email,
    });

    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (e, newValue) => {
    setErrorMessage("");
    setDisableButton(false);
    const { name, value } = e.target;

    setSelectedSL(newValue);

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log("main payload isss", formData);
  };

  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    fetchName(formData.CustomerId);
    console.log("main payload isss", formData);
  }, [formData.CustomerId]);

  const [errorMessage, setErrorMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (selectedCustomer) {
      setFormData((prevData) => ({
        ...prevData,
        CustomerName: selectedCustomer.CompanyName,
      }));
    }
  }, [selectedCustomer]);

  const handleSubmit = async () => {
    setSubmitClicked(true);

    if (
      !formData.CustomerId ||
      !formData.RegionalManagerId ||
      !formData.Title ||
      !formData.ContactId
    ) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("please fill all required Fields");
      setErrorMessage("please fill all required Fields");
      return;
    }
    setDisableButton(true);

    try {
      const res = await axios.post(
        `https://earthcoapi.yehtohoga.com/api/IrrigationAuditReport/AddIrrigationAuditReport`,
        formData,
        { headers }
      );
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(res.data.Message);
      setDisableButton(false);
      console.log("sent payload", formData);
      setTimeout(() => {
        navigate(`/irrigation-audit`);
      }, 4000);

      console.log("data submitted successfuly", res.data);
    } catch (error) {
      console.log("error submitting data", error);
      setDisableButton(false);
    }
  };

  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const [controllerList, setControllerList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchIrrigation = async () => {
    if (!idParam) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/IrrigationAuditReport/GetIrrigationAuditReport?id=${idParam}`,
        { headers }
      );
      console.log("selected irrigation is", res.data);

      setFormData(res.data[0].Data);
      setControllerList(res.data);
      //   setInputValue(res.data.IrrigationData.CustomerId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("fetch irrigation api call error", error);
    }
  };

  useEffect(() => {
    fetchIrrigation();
  }, [idParam]);
  useEffect(() => {
    fetchCustomers();
    fetchStaffList();
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="center-loader">
  //                       <CircularProgress />
  //                     </div>
  //   )
  // }

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="container-fluid">
        {isLoading ? (
          <div className="center-loader">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="card">
              <div className="card-body p-0">
                <div className="itemtitleBar">
                  <h4>General Information</h4>
                </div>
                <div className="card-body">
                  <div className="">
                    {/* {errorMessage ? (
                    <Alert severity="error">{errorMessage}</Alert>
                  ) : null}
                  {addSucces && <Alert severity="success">{addSucces}</Alert>} */}

                    <div className="row mb-2 mx-1">
                      <div className="col-md-3 ">
                        <label className="form-label">Title</label>

                        <TextField
                          type="text"
                          size="small"
                          name="Title"
                          onChange={handleInputChange}
                          value={formData.Title}
                          className="form-control form-control-sm"
                          placeholder="Title"
                          error={submitClicked && !formData.Title}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">
                          Customer<span className="text-danger">*</span>
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

                      {/* <div className="col-md-3">
                        <label className="form-label">Service location</label>
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
                              className="bg-white"
                            />
                          )}
                          aria-label="Default select example"
                        />
                      </div> */}
                      <div className="col-md-3">
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
                              className="bg-white"
                              error={submitClicked && !formData.ContactId}
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
                              (staff) =>
                                staff.UserId === formData.RegionalManagerId
                            ) || null
                          }
                          onChange={handleRBAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.UserId === value.RegionalManagerId
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              error={
                                submitClicked && !formData.RegionalManagerId
                              }
                              placeholder="Choose..."
                              className="bg-white"
                            />
                          )}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Created</label>
                        <input
                          type="date"
                          name="ReportDate"
                          value={formatDate(formData.ReportDate)}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Created"
                        />
                      </div>

                      <div className="col-md-9 text-end mt-4">
                        <div>
                          {idParam === 0 ? null : (
                            <button
                              className="btn btn-dark btn-sm me-2"
                              onClick={toggleShowForm}
                            >
                              Add Controller Info
                            </button>
                          )}
                          {/* <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-primary btn-sm me-1"
                        >
                          Submit
                        </button> */}
                          <LoaderButton
                            varient="small"
                            loading={disableButton}
                            handleSubmit={handleSubmit}
                          >
                            Submit
                          </LoaderButton>

                          {/* <NavLink to="/irrigation">
                    </NavLink> */}

                          <button
                            onClick={() => {
                              // setShowContent(true);
                              // setSelectedIrr(0);
                              navigate(`/irrigation-audit`);
                            }}
                            className="btn btn-danger btn-sm light ms-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showForm && (
              <AuditController
                setAddSucces={setAddSucces}
                fetchIrrigation={fetchIrrigation}
                toggleShowForm={toggleShowForm}
                idParam={idParam}
              />
            )}

            <AuditControllerTable
              setAddSucces={setAddSucces}
              fetchIrrigation={fetchIrrigation}
              headers={headers}
              controllerList={controllerList}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AddIrrigationAudit;

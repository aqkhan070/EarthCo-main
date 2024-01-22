import React, { useEffect, useState } from "react";
import axios from "axios";
import useCustomerSearch from "../Hooks/useCustomerSearch";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import BackButton from "../Reusable/BackButton";

const PunchlistModal2 = ({
  addPunchListData,

  staffData,
  sLList,

  contactList,
  inputValue,
  setInputValue,
  headers,
  setAddPunchListData,
  fetchFilterdPunchList,

  selectedPL,
  setselectedPL,
}) => {
  const { customerSearch, fetchCustomers } = useCustomerSearch();
  const { name, setName, fetchName } = useFetchCustomerName();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedServiceRequest, setSelectedServiceRequest] = useState(null);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);

  const fetchPLData = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlist?id=${selectedPL}`,
        { headers }
      );
      console.log("selected pl is", res.data);
      setAddPunchListData(res.data);
      setSelectedContact(res.data);
      fetchName(res.data.CustomerId);
    } catch (error) {
      console.log("fetch PL api call error", error);
    }
  };

  useEffect(() => {
    fetchPLData();
  }, [selectedPL]);

  const handleCustomerAutocompleteChange = (event, newValue) => {
    fetchName(newValue.UserId);
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "CustomerId",
        value: newValue ? newValue.UserId : "",
      },
    };

    setSelectedCustomer(newValue); // Update selectedCustomer here

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleChange(simulatedEvent);
  };

  const [selectedContact, setSelectedContact] = useState({});
  const handleContactAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "ContactId",
        value: newValue ? newValue.ContactId : "",
      },
    };
    setSelectedContact(newValue);
    setAddPunchListData((prevData) => ({
      ...prevData,
      ContactName: newValue.FirstName,
      ContactCompany: newValue.CompanyName,
      ContactEmail: newValue.Email,
    }));
    console.log("selected contact is", newValue);

    handleChange(simulatedEvent);
  };

  const handleSLAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "ServiceLocationId",
        value: newValue ? newValue.ServiceLocationId : "",
      },
    };

    handleChange(simulatedEvent);
  };

  const handleStaffAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "AssignedTo",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleChange(simulatedEvent);
  };

  const [submitClicked, setSubmitClicked] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDisableButton(false);
    setAddPunchListData((prevState) => ({
      ...prevState,
      [name]: value,
      StatusId: 2,
    }));
    console.log("handle change", addPunchListData);
  };

  const handleSubmit = async (event) => {
    setSubmitClicked(true);
    event.preventDefault();

    if (
      !addPunchListData.CustomerId ||
      !addPunchListData.Title ||
      !addPunchListData.ContactId ||
      !addPunchListData.AssignedTo
    ) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      return;
    }
    setDisableButton(true);

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/PunchList/AddPunchList",
        addPunchListData,
        { headers }
      );
      // Handle success - maybe redirect or show a message
      console.log("successfully posted punch list", addPunchListData);
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      setDisableButton(false);

      setselectedPL(0);
      fetchFilterdPunchList();
      document.getElementById("punchListcloser").click();
    } catch (error) {
      setDisableButton(false);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText(error.response.data);
      console.error("Error sending dataaaaaaaa:", error);
      // console.log("Error sending dataaaaaa:",addPunchListData);

      // Handle error - show an error message to the user
    }
  };

  useEffect(() => {
    console.log("punch list dataaa", addPunchListData);
    console.log("selected contact dataaa", selectedContact);
  }, [addPunchListData, selectedContact]);

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="modal fade modal-lg" id="editPunch">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Punchlist</h5>
              <button
                // type="button"
                className="btn-close"
                onClick={() => {
                  document.getElementById("punchListcloser").click();
                }}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className=" col-md-6 mb-3">
                  <label className="form-label">
                    Title<span className="text-danger">*</span>
                  </label>
                  <TextField
                    type="text"
                    className="form-control"
                    name="Title"
                    size="small"
                    value={addPunchListData.Title}
                    onChange={handleChange}
                    placeholder="Title"
                    error={submitClicked && !addPunchListData.Title}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Customer <span className="text-danger">*</span>
                  </label>

                  <Autocomplete
                    id="staff-autocomplete"
                    size="small"
                    // value={selectedCustomer}
                    options={customerSearch}
                    getOptionLabel={(option) => option.FirstName || ""}
                    value={name ? { FirstName: name } : null}
                    onChange={handleCustomerAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.UserId === value.CustomerId
                    }
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div className="customer-dd-border">
                          <h6> {option.FirstName}</h6>
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
                        onBlur={() => {
                          fetchName(addPunchListData.CustomerId);
                        }}
                        onChange={(e) => {
                          fetchCustomers(e.target.value);
                        }}
                        placeholder="Choose..."
                        error={submitClicked && !addPunchListData.CustomerId}
                        className="bg-white"
                      />
                    )}
                  />
                </div>

                <div className="col-md-6 mb-3 ">
                  <label className="form-label">
                    Contact Name<span className="text-danger">*</span>
                  </label>
                  <Autocomplete
                    size="small"
                    options={contactList}
                    getOptionLabel={(option) => option.FirstName || ""}
                    value={
                      contactList.find(
                        (contact) =>
                          contact.ContactId === addPunchListData.ContactId
                      ) || null
                    }
                    onChange={handleContactAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.ContactId === value.ContactId
                    }
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div className="customer-dd-border">
                          <h6> {option.FirstName}</h6>
                          <small>{option.Email}</small>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        error={submitClicked && !addPunchListData.ContactId}
                        placeholder="Contacts"
                        className="bg-white"
                      />
                    )}
                    aria-label="Contact select"
                  />
                </div>
                {/* <div className="col-md-6 ">
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
                          addPunchListData.ServiceLocationId
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

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Regional Manager <span className="text-danger">*</span>
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
                        (staff) => staff.UserId === addPunchListData.AssignedTo
                      ) || null
                    }
                    onChange={handleStaffAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.UserId === value.AssignedTo
                    }
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div className="customer-dd-border">
                          <div className="row">
                            <div className="col-md-auto">
                              {" "}
                              <h6 className="pb-0 mb-0"> {option.FirstName}</h6>
                            </div>
                            <div className="col-md-auto">
                              <small>
                                {"("}
                                {option.Role}
                                {")"}
                              </small>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        error={submitClicked && !addPunchListData.AssignedTo}
                        placeholder="Choose..."
                        className="bg-white"
                      />
                    )}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Contact Company</label>
                  <TextField
                    size="small"
                    value={
                      selectedContact.CompanyName ||
                      addPunchListData.ContactCompany ||
                      ""
                    }
                    fullWidth
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Contact Email</label>
                  <TextField
                    size="small"
                    value={
                      selectedContact.Email ||
                      addPunchListData.ContactEmail ||
                      ""
                    }
                    fullWidth
                  />
                </div>

                {/* {emptyFieldError && (
                  <div className="col-md-12">
                    <Alert severity="error">
                      {" "}
                      Please fill all required fields
                    </Alert>
                  </div>
                )} */}

                {/* <div className="col-lg-6 col-md-6 ">
                        <label className="form-label">Status:</label>
                        <FormControl fullWidth>
                          <Select
                            name="StatusId"
                            value={addPunchListData.StatusId || ""}
                            onChange={handleChange}
                            size="small"
                          >
                            <MenuItem value={1}>Open</MenuItem>
                            <MenuItem value={2}>Closed</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                     */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                id="punchListcloser"
                data-bs-dismiss="modal"
                data-bs-target="#editPunch"
                onClick={() => {
                  setAddPunchListData((prevData) => ({
                    ...prevData,
                    Title: "",
                    AssignedTo: null,
                    CustomerId: null,
                    ContactEmail: null,
                    ContactId: null,
                    ContactCompany: null,
                  }));
                  setSelectedCustomer("");
                  setselectedPL(0);
                  setName("");

                  // Clear the Contact Email field
                  setSelectedContact((prevData) => ({
                    ...prevData,
                    Email: null,
                    CompanyName: null,
                  }));
                }}
              >
                Close
              </button>
              <LoaderButton loading={disableButton} handleSubmit={handleSubmit}>
                Save
              </LoaderButton>
              {/* <button
              
                className="btn btn-primary"
               
                onClick={handleSubmit}
              >
                Next
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PunchlistModal2;

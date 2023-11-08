import React, { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import TitleBar from "../TitleBar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Print, Email, Download } from "@mui/icons-material";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";

const UpdateSRForm = ({
  serviceRequestId,
  setShowContent,
  setShowCards,
  fetchServiceRequest,
  setSuccessAlert,
}) => {
  const [customersList, setCustomersList] = useState([]);
  const [customer, setCustomer] = useState();

  const [sRList, setSRList] = useState({});

  const [SRData, setSRData] = useState({
    ServiceRequestData: {
      ServiceRequestId: serviceRequestId,

      CustomerId: 0,
      ServiceLocation: "",
      ServiceRequestNumber: "",
      Contact: "",
      DueDate: "",
      SRTypeId: 0,
      SRStatusId: 0,
      Assign: "",
      WorkRequest: "",
      ActionTaken: "",
      CompletedDate: "",
      tblSRItems: [],
    },
  }); // payload

  const [itemInput, setItemInput] = useState({
    Name: "",
    Qty: 1,
    Description: "",
    Rate: null,
  });
  const [tblSRItems, setTblSRItems] = useState([]);

  const [files, setFiles] = useState([]);

  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [sRTypes, setSRTypes] = useState([]);

  const [btnDisable, setBtnDisable] = useState(false);
  const [error, setError] = useState(false);
  const token = Cookies.get("token");

  const inputFile = useRef(null);

  const fetchServiceLocations = async (id) => {
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

    // try {
    //   const res = await axios.get(
    //     `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerServiceLocation?id=${id}`
    //   );
    //   setSLList(res.data);
    //   console.log("service locations are", res.data);
    // } catch (error) {
    //   setSLList([]);
    //   console.log("service locations fetch error", error);
    // }
  };

  const fetctContacts = async (id) => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerContact?id=${id}`
      )
      .then((res) => {
        console.log("contacts data isss", res.data);
        setContactList(res.data);
      })
      .catch((error) => {
        setContactList([]);
        console.log("contacts data fetch error", error);
      });

    // try {
    //   const res = await axios.get(`https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerContact?id=${id}`);
    //   console.log("contacts data isss", res.data);
    //   setContactList(res.data)
    // } catch (error) {
    //   setContactList([])
    //   console.log("contacts data fetch error", error);
    // }
  };
  useEffect(() => {
    fetchServiceLocations(SRData.ServiceRequestData.CustomerId);
    fetctContacts(SRData.ServiceRequestData.CustomerId);
    SRData.ServiceRequestData.ServiceRequestNumber &&
    SRData.ServiceRequestData.ContactId &&
    SRData.ServiceRequestData.ServiceLocationId &&
    SRData.ServiceRequestData.Assign
      ? setDisableSubmit(false)
      : setDisableSubmit(true);
  }, [SRData]);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`
      );
      setStaffData(response.data);

      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
    }
  };

  const fetchSRTypes = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestTypes`,
        { headers }
      );
      console.log("service request types are", res.data);
      setSRTypes(res.data);
    } catch (error) {
      console.log("error fetching SR types", error);
    }
  };

  const [showCustomersList, setShowCustomersList] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleAutocompleteChange = async (e) => {
    inputValue ? setDisableSubmit(false) : setBtnDisable(true);
    setInputValue(e.target.value);
    try {
      setShowCustomersList(true); // Show the list when typing
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetSearchCustomersList?Search=${e.target.value}`
      );
      console.log("customers search list", res.data);
      setCustomersList(res.data);
    } catch (error) {
      console.log("customer search api error", error);
    }
  };
  const selectCustomer = (customer) => {
    // setSRData({ ...SRData, CustomerId: customer.UserId });
    setSRData((prevData) => ({
      ServiceRequestData: {
        ...prevData.ServiceRequestData,
        CustomerId: customer.UserId,
      },
    }));

    setCustomer(customer);
    setInputValue(customer.CompanyName); // Add this line to update the input value
    setShowCustomersList(false);
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

  const handleStaffAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "Assign",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSRData((prevData) => ({
      ServiceRequestData: {
        ...prevData.ServiceRequestData,
        [name]:
          name === "CustomerId" ||
          name === "ServiceLocationId" ||
          name === "ContactId" ||
          name === "Assign" ||
          name === "SRTypeId" ||
          name === "SRStatusId"
            ? Number(value)
            : value,
      },
    }));

    if (name === "CustomerId" && value != 0) {
      console.log(value);
      fetchServiceLocations(value);
      fetctContacts(value);
    }

    console.log("object,,,,,,", SRData);
  };

  const submitHandler = async () => {
    setBtnDisable(true);
    const formData = new FormData();
    SRData.ServiceRequestData.tblSRItems = tblSRItems;

    console.log("servise request data before", SRData);
    formData.append(
      "ServiceRequestData",
      JSON.stringify(SRData.ServiceRequestData)
    );

    // formData.append(
    //   "ServiceRequestData",
    //   JSON.stringify(SRData.ServiceRequestData)
    // );
    files.forEach((fileObj) => {
      formData.append("Files", fileObj);
    });

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
    };

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/ServiceRequest/AddServiceRequest",
        formData,
        {
          headers,
        }
      );
      console.log(response.data);
      console.log("payload izzzzzzz", formData);
      console.log("sussessfully posted service request");

      setTimeout(() => {
        setSuccessAlert(false);
      }, 4000);
      setSuccessAlert(true);
      setShowContent(true);
      setShowCards(true);
      setBtnDisable(false);
      fetchServiceRequest();

      // Handle successful submission
      // window.location.reload();
      setShowCards(true);
    } catch (error) {
      console.error("API Call Error:", error);
      setBtnDisable(false);
      setError(true);
    }
    for (let [key, value] of formData.entries()) {
      console.log("filessss", key, value);
    }
  };

  const removeItem = (index) => {
    const newItems = [...tblSRItems];
    newItems.splice(index, 1);
    setTblSRItems(newItems);
  };

  const trackFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const addFile = () => {
    inputFile.current.click();
  };
  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    const fetchSR = async () => {
      if (serviceRequestId === 0) {
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequest?id=${serviceRequestId}`,
        { headers }
      );
      try {
        setInputValue(response.data.CompanyName);
        setSRList(response.data);
        setSRData((prevData) => ({
          ServiceRequestData: {
            ...prevData.ServiceRequestData,
            CustomerId: response.data.CustomerId,
            ...response.data,
          },
        }));
        // Set the tblSRItems state with the response.data.tblSRItems
        setTblSRItems(response.data.tblSRItems);
        // Set the itemInput state with the first item from the response.data.tblSRItems
        if (response.data.tblSRItems && response.data.tblSRItems.length > 0) {
          setItemInput(response.data.tblSRItems[0]);
        }

        if (response.data.tblSRFiles) {
          setFiles((prevFiles) => [...prevFiles, ...response.data.tblSRFiles]);
        }
        console.log(" list is///////", response.data);
      } catch (error) {
        console.error("API Call Error:", error);
      }
    };

    fetchSR();
  }, [serviceRequestId]);

  // items..........

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItem, setShowItem] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchText) {
      // Make an API request when the search text changes
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `https://earthcoapi.yehtohoga.com/api/Item/GetSearchItemList?Search=${searchText}`,
          { headers }
        )
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching itemss data:", error);
        });
    } else {
      setSearchResults([]); // Clear the search results when input is empty
    }
  }, [searchText]);

  const handleItemChange = (event) => {
    setShowItem(true);
    setSearchText(event.target.value);

    setSelectedItem(null); // Clear selected item when input changes
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSearchText(item.ItemName); // Set the input text to the selected item's name
    setItemInput({
      ...itemInput,
      Name: item.ItemName,
      Description: item.SaleDescription,
      Rate: item.SalePrice,
    });
    setShowItem(false);
    setSearchResults([]); // Clear the search results

    console.log("selected item is", itemInput);
  };

  useEffect(() => {
    setShowCards(false);
    fetchSRTypes();
    fetchStaffList();
  }, []);

  // fileAdd

  return (
    <>
      <div className="">
        <div className="">
          <div className="card-body">
            {/* Add service form */}
            <div className="row mb-3">
              <div className="col-lg-12 col-md-12 mb-2">
                <NavLink to="/Dashboard/Estimates">
                  {" "}
                  <button
                    type="button"
                    className="col-md-2 btn btn-sm btn-primary"
                  >
                    {" "}
                    + Add Estimate{" "}
                  </button>
                </NavLink>
                <button type="button" className="btn btn-sm btn-secondary mx-2">
                  + Add Invoice
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                >
                  <Email></Email>
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary mx-2"
                >
                  <Print></Print>
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                >
                  <Download></Download>
                </button>
              </div>
            </div>
            {error && (
              <Alert className="mb-3" severity="error">
                Adding/Updating Service request Failed
              </Alert>
            )}
            <div className="card">
              <div className="card-body p-0">
                <div className="itemtitleBar">
                  <h4>Service Request Details</h4>
                </div>{" "}
                <br />
                <div className="basic-form">
                  <div className="row">
                    <div className="col-xl-4 mb-2 col-md-9 ">
                      <label className="form-label">Customers</label>

                      <input
                        type="text"
                        name="CustomerId"
                        value={inputValue} // Bind the input value state to the value of the input
                        onChange={handleAutocompleteChange}
                        placeholder="Customers"
                        className="form-control form-control-sm"
                      />
                      {showCustomersList && customersList && (
                        <ul className="search-results-container">
                          {customersList.map((customer) => (
                            <li
                              style={{ cursor: "pointer" }}
                              key={customer.UserId}
                              onClick={() => {
                                selectCustomer(customer);
                              }} // Use the selectCustomer function
                            >
                              {customer.CompanyName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="col-xl-4 mb-2 col-md-9 ">
                      <label className="form-label">Servive Locations</label>

                      <Autocomplete
                        id="inputState19"
                        size="small"
                        options={sLList}
                        getOptionLabel={(option) => option.Name || ""}
                        value={
                          sLList.find(
                            (customer) =>
                              customer.ServiceLocationId ===
                              SRData.ServiceRequestData.ServiceLocationId
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
                    </div>

                    <div className="col-xl-4 mb-2 col-md-9 ">
                      <label className="form-label">Contacts</label>

                      <Autocomplete
                        id="inputState299"
                        size="small"
                        options={contactList}
                        getOptionLabel={(option) => option.FirstName || ""}
                        value={
                          contactList.find(
                            (contact) =>
                              contact.ContactId ===
                              SRData.ServiceRequestData.ContactId
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
                          />
                        )}
                        aria-label="Contact select"
                      />
                    </div>
                  </div>

                  <div className="row  mt-2 mb-2">
                    <div className="col-xl-3 col-md-3">
                      <label className="form-label">Type:</label>
                      <Form.Select
                        name="SRTypeId"
                        value={SRData.ServiceRequestData.SRTypeId || ""}
                        onChange={handleInputChange}
                        size="lg"
                        className="bg-white"
                      >
                        <option value={null}>Choose types...</option>
                        {sRTypes.map((type) => {
                          return (
                            <option value={type.SRTypeId}>{type.Type}</option>
                          );
                        })}
                      </Form.Select>
                    </div>
                    <div className=" col-xl-3 col-md-4">
                      <label className="form-label">Due Date:</label>

                      <input
                        type="date"
                        name="DueDate"
                        value={SRData.ServiceRequestData.DueDate || ""}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                        placeholder={sRList.DueDate || " "}
                      />
                    </div>

                    {/* <div className="col-xl-3 ">
                      <label className="form-label">Notes</label>
                      <textarea
                        name="WorkRequest"
                        value={SRData.ServiceRequestData.WorkRequest || ""}
                        onChange={handleInputChange}
                        className="form-txtarea form-control form-control-sm"
                        placeholder={sRList.WorkRequest || " "}
                        rows="2"
                      ></textarea>
                    </div> */}
                    <div className="col-lg-2 col-md-2 ">
                      <label className="form-label">Status:</label>
                      <Form.Select
                        name="SRStatusId"
                        value={SRData.ServiceRequestData.SRStatusId || ""}
                        onChange={handleInputChange}
                        size="lg"
                        className="bg-white"
                      >
                        <option value={1}>Open</option>
                        <option value={2}>Closed</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Assign and scedule */}
            <div className="card">
              <div className="card-body p-0 pb-4">
                <div className="itemtitleBar">
                  <h4>Assign & Schedule</h4>
                </div>
                <br />
                <div className="basic-form">
                  <div className="row">
                    <div className="col-md-4">
                      {" "}
                      {/* Adjust the column size as needed */}
                      <label className="form-label">
                        Assign / Appointment:
                      </label>
                      <Autocomplete
                        id="staff-autocomplete"
                        size="small"
                        options={staffData}
                        getOptionLabel={(option) => option.FirstName || ""}
                        value={
                          staffData.find(
                            (staff) =>
                              staff.UserId === SRData.ServiceRequestData.Assign
                          ) || null
                        }
                        onChange={handleStaffAutocompleteChange}
                        isOptionEqualToValue={(option, value) =>
                          option.UserId === value.Assign
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            placeholder="Choose..."
                            className="bg-white"
                          />
                        )}
                      />
                      {/* <Form.Select
                        name="Assign"
                        size="lg"
                        className="bg-white"
                        value={SRData.ServiceRequestData.Assign || ""}
                      >
                        <option value={null}>Choose...</option>
                        {staffData.map((staff) => {
                          return (
                            <option key={staff.UserId} value={staff.UserId}>
                              {staff.FirstName}
                            </option>
                          );
                        })}
                      </Form.Select> */}
                    </div>
                    <div className="col-md-6 pt-4">
                      {" "}
                      {/* Adjust the column size as needed */}
                      <button className="btn schedule-btn">Schedule</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* modal */}
            <div className="modal fade" id="basicModal">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Item</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="basic-form">
                      <form>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Name
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name="Name"
                              value={itemInput.Name}
                              onChange={(e) =>
                                setItemInput({
                                  ...itemInput,
                                  Name: e.target.value,
                                })
                              }
                              className="form-control form-control-sm"
                              placeholder="Name"
                            />
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Staff
                          </label>
                          <div className="col-sm-9">
                            <Form.Select
                              name="Assign"
                              size="md"
                              className="bg-white"
                            >
                              <option value={null}>Choose...</option>
                              <option value="option 1">option 1</option>
                              <option value="option 2">option 2</option>
                              <option value="option 3">option 3</option>
                            </Form.Select>
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Quantity
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="number"
                              name="Qty"
                              value={itemInput.Qty}
                              onChange={(e) =>
                                setItemInput({
                                  ...itemInput,
                                  Qty: Number(e.target.value),
                                })
                              }
                              className="form-control form-control-sm"
                              placeholder="Quantity"
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Description
                          </label>
                          <div className="col-sm-9">
                            <textarea
                              name="Description"
                              className="form-txtarea form-control form-control-sm"
                              value={itemInput.Description}
                              onChange={(e) =>
                                setItemInput({
                                  ...itemInput,
                                  Description: e.target.value,
                                })
                              }
                              rows="3"
                              id="comment"
                            ></textarea>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Rate
                          </label>
                          <div className="col-sm-9">
                            <input
                              name="Rate"
                              type="number"
                              value={itemInput.Rate}
                              onChange={(e) =>
                                setItemInput({
                                  ...itemInput,
                                  Rate: Number(e.target.value),
                                })
                              }
                              className="form-control form-control-sm"
                              placeholder="Rate"
                            />
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">Tax</label>
                          <div className="col-sm-9">
                            <Form.Select
                              name="Tax"
                              size="md"
                              className="bg-white"
                            >
                              <option value="option 1">
                                Non (Non-Taxable Sales)
                              </option>
                              <option value="option 2">
                                Tax (Taxable Sales)
                              </option>
                              <option value="option 3">
                                LBR (Non-Taxable Labour)
                              </option>
                            </Form.Select>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label"></label>
                          <div className="col-sm-9">
                            <input
                              type="checkbox"
                              name="isPrimary"
                              className="form-check-input"
                              id="customCheckBox"
                            />

                            <label
                              className="form-check-label"
                              htmlFor="customCheckBox"
                            >
                              Billable
                            </label>
                          </div>
                        </div>

                        <div className="row">
                          <label className="col-sm-3 col-form-label">
                            Item Total
                          </label>
                          <div
                            className="col-sm-9"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <h5 style={{ margin: "0" }}>
                              {itemInput.Rate * itemInput.Qty}
                            </h5>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setTblSRItems([...tblSRItems, itemInput]);
                        setItemInput({
                          Name: "",
                          Qty: 1,
                          Description: "",
                          Rate: 0,
                        }); // Reset the modal input fields
                      }}
                      data-bs-dismiss="modal"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* item table */}
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Items</h4>
                  </div>
                  {/* <NavLink
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                    style={{ margin: "12px 20px" }}
                  >
                    + Add Items
                  </NavLink> */}
                  <div className="table-responsive active-projects style-1 mt-2 ">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Qty / Duration</th>
                          <th>Amount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tblSRItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.Rate}</td>
                            <td>{item.Qty}</td>
                            <td>{item.Qty * item.Rate}</td>
                            <td>
                              <div className="badgeBox">
                                <span
                                  className="actionBadge badge-danger light border-0 badgebox-size"
                                  onClick={() => removeItem(index)}
                                >
                                  <span className="material-symbols-outlined badgebox-size">
                                    delete
                                  </span>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>
                            <>
                              <input
                                type="text"
                                placeholder="Search for items..."
                                className="form-control form-control-sm"
                                name="Name"
                                value={searchText}
                                onChange={handleItemChange}
                                ref={inputRef}
                              />
                              {searchResults.length > 0 && (
                                <ul className="search-results-container">
                                  {searchResults.map((item) => (
                                    <li
                                      style={{ cursor: "pointer" }}
                                      key={item.ItemId}
                                      onClick={() => handleItemClick(item)}
                                    >
                                      {showItem && item.ItemName}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          </td>
                          <td>
                            <textarea
                              name="Description"
                              className="form-txtarea form-control form-control-sm"
                              value={selectedItem?.SaleDescription || " "}
                              rows="2"
                              id="comment"
                              disabled
                            ></textarea>
                          </td>

                          <td>
                            <div className="col-sm-9">
                              <input
                                name="Rate"
                                value={
                                  selectedItem?.SalePrice ||
                                  itemInput.Rate ||
                                  " "
                                }
                                className="form-control form-control-sm"
                                placeholder="Rate"
                                disabled
                              />
                            </div>
                          </td>

                          <td>
                            <input
                              type="number"
                              name="Qty"
                              value={itemInput.Qty}
                              onChange={(e) =>
                                setItemInput({
                                  ...itemInput,
                                  Qty: Number(e.target.value),
                                })
                              }
                              className="form-control form-control-sm"
                              placeholder="Quantity"
                            />
                          </td>
                          <td>
                            <h5 style={{ margin: "0" }}>
                              {itemInput.Rate * itemInput.Qty}
                            </h5>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setTblSRItems([...tblSRItems, itemInput]);
                                setSearchText("");
                                setSelectedItem({
                                  SalePrice: "",
                                  SaleDescription: "",
                                });
                                setItemInput({
                                  Name: "",
                                  Qty: 1,
                                  Description: "",
                                  Rate: 0,
                                }); // Reset the modal input field
                              }}
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* files */}
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Files</h4>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ margin: "12px 20px" }}
                    onClick={addFile}
                  >
                    + Add
                  </button>
                  <input
                    type="file"
                    ref={inputFile}
                    onChange={trackFile}
                    style={{ display: "none" }}
                  />
                  <div className="table-responsive active-projects style-1">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>File Name</th>
                          <th>Last Modified Date</th>
                          <th>Type</th>
                          <th>Size</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.map((file, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{file.FileName || file.name}</td>
                            <td></td>
                            <td>{file.type || "N/A"}</td>
                            <td>{file.size} bytes</td>
                            <td>
                              <div className="badgeBox">
                                <span
                                  className="actionBadge badge-danger light border-0 badgebox-size"
                                  onClick={() => removeFile(index)}
                                >
                                  <span className="material-symbols-outlined badgebox-size">
                                    delete
                                  </span>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Details */}
            <div className="card">
              <div className="card-body p-0 pb-4">
                <div className="itemtitleBar">
                  <h4>Details</h4>
                </div>
                <br />
                <div className="basic-form">
                  <div className="row">
                    <div className="col-md-4">
                      {" "}
                      {/* Adjust the column size as needed */}
                      <label className="form-label">
                        Service Request Number
                      </label>
                      <input
                        name="ServiceRequestNumber"
                        value={
                          SRData.ServiceRequestData.ServiceRequestNumber || ""
                        }
                        onChange={handleInputChange}
                        className="form-txtarea form-control form-control-sm"
                        placeholder={sRList.ServiceRequestNumber || " "}
                        rows="2"
                      />
                    </div>
                    <div className="col-md-4">
                      {" "}
                      {/* Adjust the column size as needed */}
                      <label className="form-label">Work Requested:</label>
                      <textarea
                        name="WorkRequest"
                        value={SRData.ServiceRequestData.WorkRequest || ""}
                        onChange={handleInputChange}
                        className="form-txtarea form-control form-control-sm"
                        placeholder={sRList.WorkRequest || " "}
                        rows="2"
                      ></textarea>
                    </div>
                    <div className="col-md-4 ">
                      {" "}
                      <label className="form-label">Action Taken:</label>
                      {/* Adjust the column size as needed */}
                      <textarea
                        name="ActionTaken"
                        value={SRData.ServiceRequestData.ActionTaken || ""}
                        onChange={handleInputChange}
                        className="form-txtarea form-control form-control-sm"
                        placeholder={sRList.ActionTaken || " "}
                        rows="2"
                      ></textarea>
                    </div>

                    <div className=" col-md-4">
                      <label className="form-label">Date Completed:</label>

                      <input
                        type="date"
                        name="CompletedDate"
                        value={SRData.ServiceRequestData.CompletedDate || ""}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                        placeholder={sRList.CompletedDate || " "}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ;
          </div>

          <div className="mb-2 row text-end">
            <div className="flex-right">
              <button
                type="button"
                className="btn btn-primary me-1"
                disabled={disableSubmit}
                onClick={submitHandler}
              >
                Submit
              </button>

              <button
                className="btn btn-danger light ms-1"
                onClick={() => {
                  setShowContent(true);
                  setShowCards(true);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* <div>{sRList}</div> */}
      </div>
    </>
  );
};

export default UpdateSRForm;

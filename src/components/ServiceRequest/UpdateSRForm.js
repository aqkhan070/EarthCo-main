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
import CircularProgress from "@mui/material/CircularProgress";
import formatDate from "../../custom/FormatDate";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const UpdateSRForm = ({
  headers,
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
      ServiceRequestNumber: "",

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
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const token = Cookies.get("token");

  const inputFile = useRef(null);

  const fetchServiceLocations = async (id) => {
    if (!id) {
      return;
    }
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
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`,
        { headers }
      );
      setStaffData(response.data);

      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
    }
  };

  const fetchSRTypes = async () => {
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
    inputValue ? setDisableSubmit(false) : setDisableSubmit(true);
    setInputValue(e.target.value);
    try {
      setShowCustomersList(true); // Show the list when typing
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetSearchCustomersList?Search=${e.target.value}`,
        { headers }
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
    // setSubmitClicked(false);
    setEmptyFieldsError(false);
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
    setSubmitClicked(true);
    if (
      !SRData.ServiceRequestData.CustomerId ||
      !SRData.ServiceRequestData.ServiceLocationId ||
      !SRData.ServiceRequestData.ContactId ||
      !SRData.ServiceRequestData.ServiceRequestNumber ||
      !SRData.ServiceRequestData.Assign
    ) {
      setEmptyFieldsError(true);
      console.log("Required fields are empty");
      return;
    }

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
    files.forEach((file) => {
      formData.append("Files", file);
    });

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/ServiceRequest/AddServiceRequest",
        formData,
        {
          headers,
        }
      );
      console.log(response.data.Message);
      console.log("payload izzzzzzz", formData);
      console.log("sussessfully posted service request");

      setTimeout(() => {
        setSuccessAlert("");
      }, 4000);
      setSuccessAlert(response.data.Message);
      setShowContent(true);
      setShowCards(true);
      setBtnDisable(false);
      fetchServiceRequest();

      // Handle successful submission
      // window.location.reload();
      setShowCards(true);
    } catch (error) {
      console.error("API Call Error:", error.message);
      setBtnDisable(false);
      setErrorMessage(error.message);
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
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
    console.log("uploaded file is", uploadedFile);
  };
  const addFile = () => {
    inputFile.current.click();
  };
  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const fetchSR = async () => {
    if (serviceRequestId === 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequest?id=${serviceRequestId}`,
        { headers }
      );
      setInputValue(response.data.Data.CustomerId);
      setSRList(response.data.Data);

      setSRData((prevData) => ({
        ServiceRequestData: {
          ...prevData.ServiceRequestData,
          CustomerId: response.data.Data.CustomerId,
          ...response.data.Data,
        },
      }));

      // Set the tblSRItems state with the response.data.tblSRItems
      setTblSRItems(response.data.ItemData);
      setLoading(false);
      console.log("response.data.Data", response.data);

      console.log(" list is///////", response.data.Data);
    } catch (error) {
      setLoading(false);
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchSR();
  }, []);

  useEffect(() => {
    console.log("items are", tblSRItems);
  }, [tblSRItems]);

  // items..........

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItem, setShowItem] = useState(true);
  const [itemBtnDisable, setItemBtnDisable] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchText) {
      // Make an API request when the search text changes

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
      ItemId: item.ItemId,
      Name: item.ItemName,
      Description: item.SaleDescription,
      Rate: item.SalePrice,
    });
    setShowItem(false);
    setSearchResults([]); // Clear the search results
    itemInput.ItemId && setItemBtnDisable(false);
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
      {loading ? (
        <div className="center-loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="">
          <div className="">
            <div className="">
              {/* Add service form */}
              <div className="row mt-3 mx-2 ">
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
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary mx-2"
                  >
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

              <div className="">
                <div className="mx-3">
                  <div className="itemtitleBar">
                    <h4>Service Request Details</h4>
                  </div>{" "}
                  <div className=" my-2">
                    <div className="row">
                      <div className="col-xl-3 mb-2 col-md-3 ">
                        <label className="form-label">
                          Customers<span className="text-danger">*</span>
                        </label>

                        <TextField
                          type="text"
                          name="CustomerId"
                          variant="outlined"
                          size="small"
                          value={inputValue} // Bind the input value state to the value of the input
                          onChange={handleAutocompleteChange}
                          placeholder="Customers"
                          error={
                            submitClicked &&
                            !SRData.ServiceRequestData.CustomerId
                          }
                          // helperText={submitClicked && !SRData.ServiceRequestData.CustomerId ? 'Customer is required' : ''}
                          className="form-control form-control-sm"
                        />
                        {showCustomersList && customersList && (
                          <ul
                            style={{ top: "140px" }}
                            className="search-results-container"
                          >
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
                      <div className="col-xl-3 mb-2 col-md-3 ">
                        <label className="form-label">
                          Service Locations
                          <span className="text-danger">*</span>
                        </label>

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
                              error={
                                submitClicked &&
                                !SRData.ServiceRequestData.ServiceLocationId
                              }
                            />
                          )}
                          aria-label="Default select example"
                        />
                      </div>

                      <div className="col-xl-3 mb-2 col-md-9 ">
                        <label className="form-label">
                          Contacts<span className="text-danger">*</span>
                        </label>

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
                              error={
                                submitClicked &&
                                !SRData.ServiceRequestData.ContactId
                              }
                              placeholder="Contacts"
                              className="bg-white"
                            />
                          )}
                          aria-label="Contact select"
                        />
                      </div>
                      <div className="col-lg-3 col-md-3 ">
                        <label className="form-label">Status:</label>
                        <FormControl fullWidth>
                          <Select
                            name="SRStatusId"
                            value={SRData.ServiceRequestData.SRStatusId || ""}
                            onChange={handleInputChange}
                            size="small"
                          >
                            <MenuItem value={1}>Open</MenuItem>
                            <MenuItem value={2}>Closed</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    <div className="row  mt-2 mb-2">
                      <div className="col-md-3">
                        {" "}
                        {/* Adjust the column size as needed */}
                        <label className="form-label">
                          Service Request Number
                          <span className="text-danger">*</span>
                        </label>
                        <TextField
                          name="ServiceRequestNumber"
                          variant="outlined"
                          size="small"
                          value={
                            SRData.ServiceRequestData.ServiceRequestNumber || ""
                          }
                          onChange={handleInputChange}
                          error={
                            submitClicked &&
                            !SRData.ServiceRequestData.ServiceRequestNumber
                          }
                          className="form-txtarea form-control form-control-sm"
                          placeholder=" Service Request Number"
                        />
                      </div>
                      <div className="col-xl-3 col-md-3">
                        <label className="form-label">Type:</label>
                        <FormControl fullWidth variant="outlined">
                          <Select
                            name="SRTypeId"
                            value={SRData.ServiceRequestData.SRTypeId || ""}
                            onChange={handleInputChange}
                            size="small"
                          >
                            <MenuItem value=""></MenuItem>
                            {sRTypes.map((type) => (
                              <MenuItem
                                key={type.SRTypeId}
                                value={type.SRTypeId}
                              >
                                {type.Type}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className=" col-xl-3 col-md-4">
                        <label className="form-label">Due Date:</label>

                        <TextField
                          type="date"
                          name="DueDate"
                          size="small"
                          value={
                            formatDate(SRData.ServiceRequestData.DueDate) || ""
                          }
                          onChange={handleInputChange}
                          className="form-control form-control-sm"
                          placeholder="DueDate"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Assign and scedule */}
              <div className="">
                <div className="mx-3 mt-3">
                  <div className="itemtitleBar">
                    <h4>Assign & Schedule</h4>
                  </div>
                  <br />
                  <div className="mx-1">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        {/* Adjust the column size as needed */}
                        <label className="form-label">
                          Assign / Appointment:
                          <span className="text-danger">*</span>
                        </label>
                        <Autocomplete
                          id="staff-autocomplete"
                          size="small"
                          options={staffData}
                          getOptionLabel={(option) => option.FirstName || ""}
                          value={
                            staffData.find(
                              (staff) =>
                                staff.UserId ===
                                SRData.ServiceRequestData.Assign
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
                              error={
                                submitClicked &&
                                !SRData.ServiceRequestData.Assign
                              }
                              placeholder="Choose..."
                              className="bg-white"
                            />
                          )}
                        />
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
              {/* item table */}
              <div className="mx-3 mt-3">
                <div className="">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Items</h4>
                    </div>

                    <div className="table-responsive active-projects style-1 mt-2 ">
                      <table id="empoloyees-tblwrapper" className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Rate</th>
                            <th>Qty / Duration</th>
                            <th>Tax</th>
                            <th>Amount</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        {tblSRItems ? (
                          <tbody>
                            {tblSRItems.map((item, index) => (
                              <tr key={index}>
                                <td>{item.Name}</td>
                                <td>{item.Description}</td>
                                <td>{item.Rate}</td>
                                <td>{item.Qty}</td>
                                <td>NaN</td>
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
                              <td className="sr-item-input">
                                <>
                                  <Autocomplete
                                    className="sr-item-input"
                                    id="search-items"
                                    options={searchResults}
                                    getOptionLabel={(item) => item.ItemName}
                                    value={selectedItem}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        handleItemClick(newValue);
                                      } else {
                                        setSelectedItem(null);
                                      }
                                    }}
                                    inputValue={searchText}
                                    onInputChange={(event, newInputValue) => {
                                      setShowItem(true);
                                      setSearchText(newInputValue);
                                      setSelectedItem(null); // Clear selected item when input changes
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Search for items..."
                                        variant="outlined"
                                        className="sr-item-input"
                                        size="small"
                                        fullWidth
                                      />
                                    )}
                                    renderOption={(props, item) => (
                                      <li
                                        style={{ cursor: "pointer" }}
                                        {...props}
                                        onClick={() => handleItemClick(item)}
                                      >
                                        {item.ItemName}
                                      </li>
                                    )}
                                  />
                                </>
                              </td>
                              <td>
                                <p>{selectedItem?.SaleDescription || " "}</p>
                              </td>

                              <td>
                                <div className="col-sm-9">
                                  <p>
                                    {selectedItem?.SalePrice ||
                                      itemInput.Rate ||
                                      " "}
                                  </p>
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
                                  style={{ width: "7em" }}
                                  className="form-control form-control-sm"
                                  placeholder="Quantity"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  name="Tax"
                                  // value={itemInput.Qty}
                                  // onChange={(e) =>
                                  //   setItemInput({
                                  //     ...itemInput,
                                  //     Qty: Number(e.target.value),
                                  //   })
                                  // }
                                  style={{ width: "7em" }}
                                  className="form-control form-control-sm"
                                  placeholder="Tax"
                                  disabled
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
                                    console.log("table items are ", tblSRItems);
                                  }}
                                  // disabled={itemBtnDisable}
                                >
                                  Add
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            <tr>
                              <td colSpan="7">No items found</td>
                            </tr>
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* files */}
              <div className="">
                <div className="mx-3 ">
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
              <div className="mx-3 mt-3">
                <div className="">
                  <div className="itemtitleBar">
                    <h4>Details</h4>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mx-1 mt-2">
                      <div className="row">
                        <div className="col-md-12">
                          {" "}
                          {/* Adjust the column size as needed */}
                          <label className="form-label">Work Requested:</label>
                          <TextField
                            name="WorkRequest"
                            multiline
                            rows={3}
                            value={SRData.ServiceRequestData.WorkRequest || ""}
                            onChange={handleInputChange}
                            variant="outlined"
                            placeholder="Work Requested"
                            size="small"
                            fullWidth
                          />
                        </div>
                        <div className="col-md-12 ">
                          {" "}
                          <label className="form-label">Action Taken:</label>
                          {/* Adjust the column size as needed */}
                          <TextField
                            name="ActionTaken"
                            placeholder="Action Taken"
                            multiline
                            rows={3}
                            value={SRData.ServiceRequestData.ActionTaken || ""}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            size="small"
                          />
                        </div>

                        <div className=" col-md-12">
                          <label className="form-label">Date Completed:</label>

                          <TextField
                            type="date"
                            name="CompletedDate"
                            size="small"
                            value={
                              formatDate(
                                SRData.ServiceRequestData.CompletedDate
                              ) || ""
                            }
                            onChange={handleInputChange}
                            className="form-control form-control-sm"
                            placeholder="Completed Date "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6 mt-3">
                      {SRData.ServiceRequestData.SRTypeId === 2 ? (
                        <iframe
                          className="SRmap"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27233.071725612084!2d74.27175771628481!3d31.437978669606856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190143e0e99feb%3A0xf39379efff4dd86!2sUniversity%20of%20Management%20%26%20Technology!5e0!3m2!1sen!2s!4v1692089484116!5m2!1sen!2s"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 row">
              <div className="col-md-10">
                {error && (
                  <Alert className="mb-3" severity="error">
                    {errorMessage
                      ? errorMessage
                      : "Adding/Updating Service request Failed"}
                  </Alert>
                )}
                {emptyFieldsError && (
                  <Alert className="mb-3" severity="error">
                    Please fill all the required fields
                  </Alert>
                )}
              </div>
              <div className="col-md-2 mb-3">
                <button
                  type="button"
                  className="btn btn-primary me-1"
                  // disabled={disableSubmit}
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
        </div>
      )}
    </>
  );
};

export default UpdateSRForm;

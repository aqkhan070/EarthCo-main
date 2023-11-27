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
import useCustomerSearch from "../Hooks/useCustomerSearch";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import { Delete, Create } from "@mui/icons-material";
import {Button} from "@mui/material";


const UpdateSRForm = ({
  headers,
  serviceRequestId,
  setShowContent,
  setShowCards,
  fetchServiceRequest,
  setSuccessAlert,
}) => {

const {customerSearch, fetchCustomers } = useCustomerSearch();

const { name, setName, fetchName } = useFetchCustomerName();


  const [customersList, setCustomersList] = useState([]);
  const [customer, setCustomer] = useState();

  const [sRList, setSRList] = useState({});

  const [SRData, setSRData] = useState({
    ServiceRequestData: {
      ServiceRequestId: serviceRequestId,

      CustomerId: 0,
      ServiceRequestNumber: "",

      
      SRTypeId: 1,
      SRStatusId: 1,
      Assign: "",
      WorkRequest: "",
      ActionTaken: "",
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
    fetchName(SRData.ServiceRequestData.CustomerId);
   
    SRData.ServiceRequestData.ContactId &&
    SRData.ServiceRequestData.ServiceLocationId &&
    SRData.ServiceRequestData.Assign
      ? setDisableSubmit(false)
      : setDisableSubmit(true);
  }, [SRData.ServiceRequestData.CustomerId]);

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

  const [disableSubmit, setDisableSubmit] = useState(true);

 
 

  const handleCustomerAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "CustomerId",
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
    setErrorMessage("")
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
      console.error("API Call Error:", error.response.data);
      setBtnDisable(false);
      setErrorMessage(error.response.data);
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
  const [PrevFiles, setPrevFiles] = useState([])

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
      setPrevFiles(response.data.FileData)

      console.log(" list is///////", response.data.Data);
    } catch (error) {
      setLoading(false);
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchSR();
    fetchCustomers();
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
  
  const handleAddItem = () => {
    const newItem = { ...itemInput };
  const newAmount = newItem.Qty * newItem.Rate;
  newItem.Amount = newAmount;

  setTblSRItems([...tblSRItems, newItem]);

  // Reset the modal input field and other states
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
  });

  // Enable or disable the button based on your condition
  // setItemBtnDisable(false); // You can add your logic here

  console.log("table items are ", tblSRItems);
  }
  
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

  const handleQuantityChange = (itemId, event) => {
    const updatedItems = tblSRItems.map((item) => {
      if (item.ItemId === itemId) {
        const updatedItem = { ...item };
        updatedItem.Qty = parseInt(event.target.value, 10);
        updatedItem.Amount = updatedItem.Qty * updatedItem.Rate;
        return updatedItem;
      }
      return item;
    });
  
    setTblSRItems(updatedItems);
  };
  
  const handleRateChange = (itemId, event) => {
    const updatedItems = tblSRItems.map((item) => {
      if (item.ItemId === itemId) {
        const updatedItem = { ...item };
        updatedItem.Rate = parseFloat(event.target.value);
        updatedItem.Amount = updatedItem.Qty * updatedItem.Rate;
        return updatedItem;
      }
      return item;
    });
  
    setTblSRItems(updatedItems);
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

                      <div className="col-md-3 mb-2">
                    <label className="form-label">Customers<span className="text-danger">*</span></label>
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
                          error={
                            submitClicked &&
                            !SRData.ServiceRequestData.CustomerId
                          }
                          className="bg-white"
                        />
                      )}
                    />
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
                            value={SRData.ServiceRequestData.SRStatusId || 1}
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
                          
                        </label>
                        <TextField
                          name="ServiceRequestNumber"
                          variant="outlined"
                          size="small"
                          value={
                            SRData.ServiceRequestData.ServiceRequestNumber || ""
                          }
                          onChange={handleInputChange}
                          
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
                <div className=" mt-3">
                  <div className="itemtitleBar">
                    <h4>Assign & Schedule</h4>
                  </div>
                  <br />
                  <div className="">
                    <div className="row">
                      <div className="col-md-4 mx-3 mb-3">
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
                     {/* <div className="col-md-6 pt-4">
                        {" "}
                         Adjust the column size as needed
                        <button className="btn schedule-btn">Schedule</button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              

              {/* item table */}
              <div className="">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Items</h4>
                    </div>
                    <div className="table-responsive active-projects style-1 mt-2">
                      <table id="empoloyees-tblwrapper" className="table">
                        <thead>
                          <tr>
                            <th className="itemName-width">Item</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            <th>Tax</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>

                        {tblSRItems?.map((item, index) => (
  <tr colSpan={2} key={item.ItemId}>
    <td className="itemName-width">{item.Name}</td>
    <td>{item.Description}</td>
    <td>
      <input
        type="number"
        style={{ width: "7em" }}
        className="form-control form-control-sm"
        value={item.Qty}
        onChange={(e) => handleQuantityChange(item.itemId, e)}
      />
    </td>
    <td>
      <input
        type="number"
        style={{ width: "7em" }}
        className="form-control form-control-sm"
        value={item.Rate}
        onChange={(e) => handleRateChange(item.itemId, e)}
      />
    </td>
    <td>{(item.Rate * item.Qty ).toFixed(2)}</td>
    <td>NaN</td>
    <td>
      <div className="badgeBox">
        <Button onClick={() => removeItem(index)}>
          <Delete color="error" />
        </Button>
      </div>
    </td>
  </tr>
))}

                          <tr>
                            <td className="itemName-width">
                              <>
                                <Autocomplete
                                  id="search-items"
                                  options={searchResults}
                                  getOptionLabel={(item) => item.ItemName}
                                  value={selectedItem ||""} // This should be the selected item, not searchText
                                  onChange={(event, newValue) => {
                                    if (newValue) {
                                      handleItemClick(newValue);
                                    } else {
                                      setSelectedItem(null);
                                    }
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Search for items..."
                                      variant="outlined"
                                      size="small"
                                      fullWidth
                                      onChange={handleItemChange}
                                    />
                                  )}
                                  renderOption={(props, item) => (
                                    <li
                                      style={{
                                        cursor: "pointer",
                                        width: "30em",
                                      }}
                                      {...props}
                                      onClick={() => handleItemClick(item)}
                                    >
                                      <div className="customer-dd-border">
                                      <p><strong>{item.ItemName}</strong> </p>
                                        <p>{item.Type}</p>
                                        <small>{item.SaleDescription}</small>
                                      </div>
                                    </li>
                                  )}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      // Handle item addition when Enter key is pressed
                                      e.preventDefault(); // Prevent form submission
                                      handleAddItem();
                                    }
                                  }}
                                />
                              </>
                            </td>
                            <td>
                              <p>{selectedItem?.SaleDescription  || " "}</p>
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
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    // Handle item addition when Enter key is pressed
                                    e.preventDefault(); // Prevent form submission
                                    handleAddItem();
                                  }
                                }}
                              />
                            </td>
                            <td>
                              <div className="col-sm-9">
                                <input type="number" 
                                name="Rate"
                                style={{ width: "7em" }}
                                className="form-control form-control-sm"
                                value={selectedItem?.SalePrice || itemInput.Rate ||""}
                                onChange={(e) =>
                                  setItemInput({
                                    ...itemInput,
                                    Rate: Number(e.target.value),
                                  })
                                }
                                onClick={(e) => {
                                  setSelectedItem({
                                    ...selectedItem,
                                    SalePrice: 0,
                                  })
                                }}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    // Handle item addition when Enter key is pressed
                                    e.preventDefault(); // Prevent form submission
                                    handleAddItem();
                                  }
                                }}
                                />
                            
                              </div>
                            </td>
                            <td>
                              <h5 style={{ margin: "0" }}>
                                {(itemInput.Rate * itemInput.Qty).toFixed(2)}
                              </h5>
                            </td>
                            <td>
                              <input
                                type="number"
                                name="tax"
                                style={{ width: "7em" }}
                                disabled
                                className="form-control form-control-sm"
                                placeholder="tax"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>


              {/* files */}


              <div className="">
                <div className=" ">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Files</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
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
                      </div>
                    
                    
                      {PrevFiles.map((file, index) => (
                            <div
                              key={index}
                              className="col-md-2 col-md-2 mt-3 image-container"
                              style={{
                                width: "150px", // Set the desired width
                                height: "120px", // Set the desired height
                                margin: "1em",
                                position: "relative",
                              }}
                            >
                              <img
                                src={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                                alt={file.FileName}
                                style={{
                                  width: "150px",
                                  height: "120px",
                                  objectFit: "cover",
                                }}
                              />
                              <p
                                className="file-name-overlay"
                                style={{
                                  position: "absolute",
                                  bottom: "0",
                                  left: "13px",
                                  right: "0",
                                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                                  textAlign: "center",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  width: "100%",
                                  textOverflow: "ellipsis",
                                  padding: "5px",
                                }}
                              >
                                {file.FileName}
                              </p>
                              <span
                                className="file-delete-button"
                                style={{
                                  left: "140px"
                                }}
                                // onClick={() => removeFile(index)}
                              >
                                <span>
                                  <Delete color="error" />
                                </span>
                              </span>
                            </div>
                          ))}

                        {files.map((file, index) => (
                            <div
                              key={index}
                              className="col-md-2 col-md-2 mt-3 image-container"
                              style={{
                                width: "150px", // Set the desired width
                                height: "120px", // Set the desired height
                                margin: "1em",
                                position: "relative",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{
                                  width: "150px",
                                  height: "120px",
                                  objectFit: "cover",
                                }}
                              />
                              <p
                                className="file-name-overlay"
                                style={{
                                  position: "absolute",
                                  bottom: "0",
                                  left: "13px",
                                  right: "0",
                                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                                  textAlign: "center",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  width: "100%",
                                  textOverflow: "ellipsis",
                                  padding: "5px",
                                }}
                              >
                                {file.name}
                              </p>
                              <span
                                className="file-delete-button"
                                style={{
                                  left: "140px"
                                }}
                                onClick={() => removeFile(index)}
                              >
                                <span>
                                  <Delete color="error" />
                                </span>
                              </span>
                            </div>
                          ))}

                          {/* {files.map((file, index) => (
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
                          ))} */}
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
                        <div className="col-md-12 mb-1">
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
                        <div className="col-md-12 mb-1">
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
                      {SRData.ServiceRequestData.SRTypeId === 3 ? (
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

            <div className="mt-3 mb-3 row">
              <div className="col-md-8">
                {errorMessage && (
                  <Alert className="" severity="error">
                    
                     {errorMessage}
                    
                  </Alert>
                )}
                {emptyFieldsError && (
                  <Alert className="mb-3" severity="error">
                    Please fill all the required fields
                  </Alert>
                )}
              </div>
              <div className="col-md-4 mb-3 text-right">
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

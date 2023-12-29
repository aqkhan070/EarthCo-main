import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import formatDate from "../../custom/FormatDate";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useFetchInvoices from "../Hooks/useFetchInvoices";
import useFetchBills from "../Hooks/useFetchBills";
import { Delete, Create } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Print, Email, Download } from "@mui/icons-material";
import { useEstimateContext } from "../../context/EstimateContext";
import { useNavigate, NavLink } from "react-router-dom";
import useDeleteFile from "../Hooks/useDeleteFile";
import TitleBar from "../TitleBar";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
export const AddPO = ({}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const currentDate = new Date();

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  // setselectedPo = idParam;

  const initialFormData = {
    PurchaseOrderId: idParam,
    StatusId: 1,
    SupplierId: 0,
    BillId: 0,
    InvoiceId: 0,
    Requestedby: 0,
    TermId: null,
    RegionalManager: 0,
    DueDate: null,

    Date: currentDate,
    Tags: "",
    PurchaseOrderNumber: "",
  };

  const icon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4065 14.8714H7.78821"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14.4065 11.0338H7.78821"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M10.3137 7.2051H7.78827"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5829 2.52066C14.5829 2.52066 7.54563 2.52433 7.53463 2.52433C5.00463 2.53991 3.43805 4.20458 3.43805 6.74374V15.1734C3.43805 17.7254 5.01655 19.3965 7.56855 19.3965C7.56855 19.3965 14.6049 19.3937 14.6168 19.3937C17.1468 19.3782 18.7143 17.7126 18.7143 15.1734V6.74374C18.7143 4.19174 17.1349 2.52066 14.5829 2.52066Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const [formData, setFormData] = useState(initialFormData);

  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [tags, setTags] = useState([]);
  const [terms, setTerms] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [estimates, setEstimates] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSL, setSelectedSL] = useState(null);

  const [staffData, setStaffData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [addCustomerSuccess, setAddCustomerSuccess] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const navigate = useNavigate();

  const { invoiceList, fetchInvoices } = useFetchInvoices();
  const { billList, fetchBills } = useFetchBills();
  const { deletePOFile } = useDeleteFile();

  const { estimateLinkData, setEstimateLinkData } = useEstimateContext();
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  const handleAutocompleteChange = async (e) => {
    // inputValue ? setDisableSubmit(false) : setDisableSubmit(true);
    setInputValue(e.target.value);
    if (!e.target.value) {
      return;
    }
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
    setFormData({ ...formData, CustomerId: customer.UserId });

    setInputValue(customer.CompanyName); // Add this line to update the input value
    setShowCustomersList(false);
  };

  const fetchpoData = async () => {
    if (idParam === 0) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/GetPurchaseOrder?id=${idParam}`,
        { headers }
      );
      setLoading(false);

      console.log("selected purchase order is", res.data);
      setFormData(res.data.Data);
      setInputValue(res.data.Data.CustomerId);
      setItemsList(res.data.ItemData);
      setPrevFiles(res.data.FileData);
    } catch (error) {
      setLoading(false);
      console.log("API call error", error);
    }
  };

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
  const fetchTags = async () => {
    axios
      .get(`https://earthcoapi.yehtohoga.com/api/Estimate/GetTagList`, {
        headers,
      })
      .then((res) => {
        console.log("tags are ", res.data);
        setTags(res.data);
      })
      .catch((error) => {
        setTags([]);
        console.log("contacts data fetch error", error);
      });
  };
  const fetchTerms = async () => {
    axios
      .get(`https://earthcoapi.yehtohoga.com/api/PurchaseOrder/GetTermList`, {
        headers,
      })
      .then((res) => {
        console.log("tags are ", res.data);
        setTerms(res.data);
      })
      .catch((error) => {
        setTerms([]);
        console.log("contacts data fetch error", error);
      });
  };
  const fetchVendors = async () => {
    axios
      .get(`https://earthcoapi.yehtohoga.com/api/Supplier/GetSupplierList`, {
        headers,
      })
      .then((res) => {
        console.log("tags are ", res.data);
        setVendorList(res.data);
      })
      .catch((error) => {
        setVendorList([]);
        console.log("contacts data fetch error", error);
      });
  };

  const getEstimate = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimateList",
        { headers }
      );
      console.log("estimate response is", response.data);
      setEstimates(response.data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  const handleStaffAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "RegionalManager",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };

  const handleTermsAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "TermId",
        value: newValue ? newValue.TermId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };

  const handleTagAutocompleteChange = (event, newValues) => {
    const tagString = newValues.map((tag) => tag.Tag).join(", ");

    setFormData((prevData) => ({
      ...prevData,
      Tags: tagString,
    }));
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
  const [supplierAddress, setSupplierAddress] = useState("");
  const handleVendorAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "SupplierId",
        value: newValue ? newValue.SupplierId : "",
      },
    };
    if (newValue) {
      setSupplierAddress(newValue.Address);
      handleInputChange(simulatedEvent);
    } else {
      // Handle the case where newValue is null or undefined
      setSupplierAddress(""); // Set the supplierAddress to an appropriate default value
      // Optionally, you can call handleInputChange with an appropriate event object
      // handleInputChange(simulatedEvent);
    }

    handleInputChange(simulatedEvent);
  };

  const handleEstimatesAutocompleteChange = (event, newValue) => {
    if (newValue) {
      // Create a simulated event for EstimateNumber
      const simulatedEventForEstimateNumber = {
        target: {
          name: "EstimateNumber",
          value: newValue.EstimateNumber,
        },
      };

      // Create a simulated event for EstimateId
      const simulatedEventForEstimateId = {
        target: {
          name: "EstimateId",
          value: newValue.EstimateId,
        },
      };

      // Update the formData with EstimateNumber
      handleInputChange(simulatedEventForEstimateNumber);

      // Update the formData with EstimateId
      handleInputChange(simulatedEventForEstimateId);
    } else {
      // Handle the case where the newValue is null (e.g., when the selection is cleared)
      // Reset both EstimateNumber and EstimateId in formData
      setFormData((prevData) => ({
        ...prevData,
        EstimateNumber: "",
        EstimateId: "",
      }));
    }
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

  const handleBillAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "BillId",
        value: newValue ? newValue.BillId : "",
      },
    };

    handleInputChange(simulatedEvent);
  };
  const handleInvoiceAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "InvoiceId",
        value: newValue ? newValue.InvoiceId : "",
      },
    };

    handleInputChange(simulatedEvent);
  };

  const handleRBAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "Requestedby",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (e, newValue) => {
    setEmptyFieldsError(false);
    setDisableButton(false);
    const { name, value } = e.target;

    setSelectedCustomer(newValue);
    setSelectedSL(newValue);

    // Initialize parsedValue with the original value
    const parsedValue = value;

    // Check if the field name is "StatusId" and convert the value to a number if it is
    if (name === "StatusId") {
      setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    } else {
      // For other fields, just update them without modifying StatusId
      setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    }
  };

  const handleChange = (e) => {
    setEmptyFieldsError(false);
    setDisableButton(false);
    // Extract the name and value from the event target
    const { name, value } = e.target;

    // Check if the field name is "StatusId"
    if (name === "StatusId") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // For other fields, just update them without modifying StatusId
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    console.log("main payload isss", formData);
  }, [formData]);

  useEffect(() => {
    fetchStaffList();
    fetchTags();
    fetchTerms();
    fetchVendors();
    getEstimate();
    fetchpoData();
    fetchInvoices();
    fetchBills();
    setFormData((prevData) => ({
      ...prevData,
      StatusId: 1,
    }));
    console.log("estimate link data is", estimateLinkData);

    if (estimateLinkData.tblEstimateItems) {
      setItemsList(estimateLinkData.tblEstimateItems);
    }

    setFormData((prevData) => ({
      ...prevData,
      EstimateId: estimateLinkData.EstimateId,
      EstimateNumber: estimateLinkData.EstimateNumber,
    }));
    console.log("item List is", itemsList);
  }, []);

  // items

  const [itemsList, setItemsList] = useState([]);
  const [itemInput, setItemInput] = useState({
    Name: "",
    Qty: 1,
    Description: "",
    Rate: null,
  });
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [showItem, setShowItem] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
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
  }, [searchText]);

  const handleAddItem = () => {
    // Adding the new item to the itemsList

    setItemsList((prevItems) => [
      ...prevItems,
      { ...itemInput }, // Ensure each item has a unique 'id'
    ]);
    // Reset the input fields
    setSearchText("");
    setSelectedItem({});
    setItemInput({
      Name: "",
      Qty: 1,
      Description: "",
      Rate: null,
    });
  };

  const handleQuantityChange = (itemId, event) => {
    const updatedItemsList = itemsList.map((item) => {
      if (item.ItemId === itemId) {
        return {
          ...item,
          Qty: Number(event.target.value),
        };
      }
      return item;
    });
    setItemsList(updatedItemsList);
  };

  const handleRateChange = (itemId, event) => {
    const updatedItemsList = itemsList.map((item) => {
      if (item.ItemId === itemId) {
        return {
          ...item,
          Rate: Number(event.target.value),
        };
      }
      return item;
    });
    setItemsList(updatedItemsList);
  };

  const handleItemChange = (event) => {
    setShowItem(true);
    setSearchText(event.target.value);

    setSelectedItem({}); // Clear selected item when input changes
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
      PurchasePrice: item.PurchasePrice,
    });
    setShowItem(false);
    setSearchResults([]); // Clear the search results

    console.log("selected item is", itemInput);
  };

  const deleteItem = (id) => {
    const updatedItemsList = itemsList.filter((item) => item.ItemId !== id);
    setItemsList(updatedItemsList);
  };

  const calculateTotalAmount = () => {
    if (itemsList) {
      const total = itemsList.reduce((acc, item) => {
        return acc + item.Rate * item.Qty;
      }, 0);
      return total;
    } else {
      return 0;
    }
  };
  useEffect(() => {
    // Calculate the total amount and update the state
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [itemsList]);

  // file
  const [PrevFiles, setPrevFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [lastfile, setLastfile] = useState({});

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    const newFileObjects = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileObject = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
      newFileObjects.push(fileObject);
    }

    // setSelectedFiles([...selectedFiles, ...newFileObjects]);
    setSelectedFiles((prevFiles) => [...prevFiles, files]);
    setLastfile(selectedFiles[selectedFiles.length - 1]);

    console.log("Added files:", newFileObjects);
  };

  const handleDeleteFile = (indexToDelete) => {
    // Create a new array without the file to be deleted
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToDelete
    );

    // Update the selectedFiles state with the new array
    setSelectedFiles(updatedFiles);
    console.log("Deleted file at index:", indexToDelete);
  };

  // submit handler
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    if (
      !formData.Date ||
      !formData.SupplierId ||
      !formData.RegionalManager ||
      !formData.Requestedby
    ) {
      setEmptyFieldsError(true);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      console.log("Required fields are empty");
      return;
    }
    setDisableButton(true);

    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const PurchaseOrderData = {
      ...formData,
      Amount: totalAmount,
      PurchaseOrderId: idParam,
      tblPurchaseOrderItems: itemsList,

      // CreatedBy: 2,
      // EditBy: 2,
      // isActive: true,
    };

    console.log("PurchaseOrderData:", PurchaseOrderData);
    // console.log("data:", data);

    postData.append("PurchaseOrderData", JSON.stringify(PurchaseOrderData));
    console.log(JSON.stringify(PurchaseOrderData));
    // Appending files to postData
    selectedFiles.forEach((fileObj) => {
      postData.append("Files", fileObj);
    });

    submitData(postData);
  };

  // const appendFilesToFormData = (formData) => {
  //   Files.forEach((fileObj) => {
  //     formData.append("Files", fileObj.actualFile);
  //   });
  // };

  const submitData = async (postData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
    };
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/PurchaseOrder/AddPurchaseOrder",
        postData,
        { headers }
      );

      setEstimateLinkData({});
      setDisableButton(false);
      setAddCustomerSuccess(response.data.Message);
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      setTimeout(() => {
        setAddCustomerSuccess("");
        navigate("/purchase-order");
      }, 4000);

      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data);
      setDisableButton(false);

      console.error("API Call Error:", error);
    }

    // Logging FormData contents (for debugging purposes)
    for (let [key, value] of postData.entries()) {
      console.log("fpayload....", key, value);
    }
    // window.location.reload();

    // console.log("post data izzz",postData);
  };

  return (
    <>
      <TitleBar icon={icon} title="Add Purchase order" />
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <EventPopups
        open={showEmailAlert}
        setOpen={setShowEmailAlert}
        color={emailAlertColor}
        text={emailAlertTxt}
      />

      {loading ? (
        <div className="center-loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="add-item">
            <div className="card">
              {" "}
              <div className="itemtitleBar">
                <h4>Purchase Order Details</h4>
              </div>
              <div className="card-body">
                <div className=" row mb-3">
                  {/* <div className="col-xl-3">
                <label className="form-label">Customer<span className="text-danger">*</span></label>
                <TextField
                  type="text"
                  name="CustomerId"
                  value={inputValue} // Bind the input value state to the value of the input
                  onChange={handleAutocompleteChange}
                  error={submitClicked && !formData.CustomerId}
                  placeholder="Customers"
                  size="small"
                  className="form-control form-control-sm"
                />
                {showCustomersList && customersList && (
                  <ul
                    style={{ top: "83px" }}
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
              </div> */}

                  {/* <div className="col-xl-3">
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
                  {/* <div className="col-xl-3">
                <label className="form-label">Contact</label>

                <Autocomplete
                  id="inputState299"
                  size="small"
                  options={contactList}
                  getOptionLabel={(option) => option.FirstName || ""}
                  value={
                    contactList.find(
                      (contact) => contact.ContactId === formData.ContactId
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
              </div> */}
                  <div className="col-md-3">
                    <div className="row">
                      {" "}
                      <div className="col-md-12">
                        <label className="form-label">
                          Vendor<span className="text-danger">*</span>
                        </label>
                        <Autocomplete
                          id="inputState19"
                          size="small"
                          className="mb-2"
                          options={vendorList}
                          getOptionLabel={(option) => option.SupplierName || ""}
                          value={
                            vendorList.find(
                              (customer) =>
                                customer.SupplierId === formData.SupplierId
                            ) || null
                          }
                          onChange={handleVendorAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.SupplierId === value.SupplierId
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              error={submitClicked && !formData.SupplierId}
                              placeholder="Vendors"
                              className="bg-white"
                            />
                          )}
                          aria-label="Default select example"
                        />
                      </div>
                      <div className=" col-md-12">
                        <label className="form-label">
                          Date<span className="text-danger">*</span>
                        </label>
                        <div className="input-group mb-2">
                          <TextField
                            type="date"
                            className="form-control"
                            name="Date"
                            value={formatDate(formData.Date)}
                            size="small"
                            error={submitClicked && !formData.Date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="c-details">
                          <ul>
                            <li>
                              <span>Vendor Address</span>
                              <p>{supplierAddress || ""}</p>
                            </li>
                            <li>
                              <span>Sipping </span>
                              <p>{supplierAddress || ""}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="form-label">Purchase Order #</label>
                        <div className="input-group mb-2">
                          <TextField
                            type="text"
                            size="small"
                            name="PurchaseOrderNumber"
                            onChange={handleChange}
                            value={formData.PurchaseOrderNumber}
                            className="form-control"
                            placeholder="Purchase Order No"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Tags</label>
                        <Autocomplete
                          id="inputState19"
                          size="small"
                          multiple
                          options={tags}
                          getOptionLabel={(option) => option.Tag || ""}
                          value={tags.filter((tag) =>
                            (formData.Tags
                              ? formData.Tags.split(", ")
                              : []
                            ).includes(tag.Tag)
                          )}
                          onChange={handleTagAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.Tag === value.Tag
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder="Tags"
                              className="bg-white"
                            />
                          )}
                          aria-label="Default select example"
                        />
                      </div>
                      <div className="col-md-4"></div>
                      <div className=" col-md-4">
                        <label className="form-label">Due</label>
                        <div className="input-group mb-2">
                          <TextField
                            type="date"
                            className="form-control"
                            name="DueDate"
                            value={formatDate(formData.DueDate)}
                            size="small"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className=" col-md-4">
                        <label className="form-label">
                          Regional Manager<span className="text-danger">*</span>
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
                                staff.UserId === formData.RegionalManager
                            ) || null
                          }
                          onChange={handleStaffAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.UserId === value.RegionalManager
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              error={submitClicked && !formData.RegionalManager}
                              placeholder="Choose..."
                              className="bg-white"
                            />
                          )}
                        />
                      </div>

                      <div className="col-md-4"></div>
                      <div className=" col-md-4">
                        <label className="form-label">Terms</label>
                        <Autocomplete
                          id="inputState19"
                          size="small"
                          options={terms}
                          className="mb-2"
                          getOptionLabel={(option) => option.Term || ""}
                          value={
                            terms.find(
                              (customer) => customer.TermId === formData.TermId
                            ) || null
                          }
                          onChange={handleTermsAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.TermId === value.TermId
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder="Terms"
                              className="bg-white"
                            />
                          )}
                          aria-label="Default select example"
                        />
                      </div>
                      <div className=" col-md-4">
                        <label className="form-label">
                          Requested by<span className="text-danger">*</span>
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
                              (staff) => staff.UserId === formData.Requestedby
                            ) || null
                          }
                          onChange={handleRBAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.UserId === value.Requestedby
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              error={submitClicked && !formData.Requestedby}
                              placeholder="Choose..."
                              className="bg-white"
                            />
                          )}
                        />
                      </div>
                      <div className="col-md-4"></div>
                      <div className=" col-md-4">
                        <label className="form-label">Status</label>
                        <FormControl fullWidth variant="outlined">
                          <Select
                            name="StatusId"
                            size="small"
                            className="mb-2"
                            value={formData.StatusId || 1}
                            onChange={handleChange}
                          >
                            <MenuItem value={1}>Open</MenuItem>
                            <MenuItem value={2}>Closed</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className=" col-md-4 mt-2">
                        <label className="form-label">
                          Invoice Number
                          {formData.InvoiceId ? (
                            <>
                              <a
                                href=""
                                style={{ color: "blue" }}
                                className="ms-2"
                                onClick={() => {
                                  navigate(
                                    `/invoices/add-invoices?id=${formData.InvoiceId}`
                                  );
                                }}
                              >
                                View
                              </a>
                            </>
                          ) : (
                            ""
                          )}
                        </label>

                        <Autocomplete
                          size="small"
                          options={invoiceList}
                          getOptionLabel={(option) =>
                            option.InvoiceNumber || ""
                          }
                          value={
                            invoiceList.find(
                              (invoice) =>
                                invoice.InvoiceId === formData.InvoiceId
                            ) || null
                          }
                          onChange={handleInvoiceAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.InvoiceId === value.InvoiceId
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder="Invoice No"
                              className="bg-white"
                            />
                          )}
                          aria-label="Contact select"
                        />
                      </div>
                      <div className="col-md-4"></div>
                      {/* <div className=" col-md-4 mt-2">
                    <label className="form-label">Ship to</label>
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        name="ShipTo"
                        value={formData.ShipTo}
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}
                      <div className="col-md-4">
                        <label className="form-label">
                          Bill Number
                          {formData.BillId ? (
                            <>
                              <a
                                href=""
                                style={{ color: "blue" }}
                                className="ms-2"
                                onClick={() => {
                                  navigate(
                                    `/bills/addbill?id=${formData.BillId}`
                                  );
                                }}
                              >
                                View
                              </a>
                            </>
                          ) : (
                            ""
                          )}
                        </label>

                        <Autocomplete
                          size="small"
                          options={billList}
                          getOptionLabel={(option) => option.BillNumber || ""}
                          value={
                            billList.find(
                              (bill) => bill.BillId === formData.BillId
                            ) || null
                          }
                          onChange={handleBillAutocompleteChange}
                          isOptionEqualToValue={(option, value) =>
                            option.BillId === value.BillId
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              fullWidth
                              placeholder="Bill No"
                              className="bg-white"
                            />
                          )}
                          aria-label="Contact select"
                        />
                      </div>
                      {/* <div className="mb-3 col-md-4">
                          <label className="form-label">Estimate No</label>

                          <Autocomplete
                            id="inputState19"
                            size="small"
                            options={estimates}
                            getOptionLabel={(option) =>
                              option.EstimateNumber || ""
                            }
                            value={
                              estimates.find(
                                (customer) =>
                                  customer.EstimateNumber ===
                                  formData.EstimateNumber
                              ) || null
                            }
                            onChange={handleEstimatesAutocompleteChange}
                            isOptionEqualToValue={(option, value) =>
                              option.EstimateId === value.EstimateNumber
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                placeholder="Estimate No"
                                className="bg-white"
                              />
                            )}
                            aria-label="Default select example"
                          />
                        </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* item table */}
              <div className="itemtitleBar">
                <h4>Items</h4>
              </div>
              <div className="card-body  pt-0">
                <div className="estDataBox">
                  <div className="table-responsive active-projects style-1 mt-2">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th className="itemName-width">Item</th>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Cost Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsList && itemsList.length > 0 ? (
                          itemsList.map((item, index) => (
                            <tr colSpan={2} key={item.ItemId}>
                              <td className="itemName-width">{item.Name}</td>
                              <td>{item.Description}</td>
                              <td>
                                <input
                                  type="number"
                                  name="Qty"
                                  value={item.Qty}
                                  onChange={(e) =>
                                    handleQuantityChange(item.ItemId, e)
                                  }
                                  style={{ width: "7em" }}
                                  className="form-control form-control-sm"
                                  placeholder="Quantity"
                                />
                              </td>
                              <td>
                                <div className="col-sm-9">
                                  <input
                                    type="number"
                                    name="Rate"
                                    value={item.Rate}
                                    onChange={(e) =>
                                      handleRateChange(item.ItemId, e)
                                    }
                                    style={{ width: "7em" }}
                                    className="form-control form-control-sm"
                                    placeholder="Rate"
                                  />
                                </div>
                              </td>
                              <td>{(item.Rate * item.Qty).toFixed(2)}</td>
                              <td>{item.PurchasePrice}</td>
                              <td>
                                <div className="badgeBox">
                                  <Button
                                    onClick={() => {
                                      deleteItem(item.ItemId);
                                    }}
                                  >
                                    <Delete color="error" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <></>
                        )}
                        <tr>
                          <td className="itemName-width">
                            <>
                              <Autocomplete
                                id="search-items"
                                options={searchResults || ""}
                                getOptionLabel={(item) => item.ItemName}
                                value={selectedItem.ItemName}
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    handleItemClick(newValue);
                                  } else {
                                    setSelectedItem({});
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
                                      <p>
                                        <strong>{item.ItemName}</strong>{" "}
                                      </p>
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
                            <p>{selectedItem?.SaleDescription || " "}</p>
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
                              <input
                                type="number"
                                name="Rate"
                                value={
                                  selectedItem?.SalePrice ||
                                  itemInput.Rate ||
                                  ""
                                }
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
                                  });
                                }}
                                style={{ width: "7em" }}
                                className="form-control form-control-sm"
                                placeholder="Rate"
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
                            <h5 style={{ margin: "0" }}>
                              {itemInput.PurchasePrice}
                            </h5>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {/* <div className="itemtitleBar">
                <h4>Purchase Order Details</h4>
              </div> */}
                <div className=" row">
                  <div className="col-md-5">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12">
                        <div className="basic-form">
                          <label className="form-label">Memo Internal</label>
                          <div className="mb-3">
                            <textarea
                              className=" form-control"
                              rows="3"
                              id="comment"
                              value={formData.MemoInternal}
                              name="MemoInternal"
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12">
                        <div className="basic-form">
                          <label className="form-label">Message</label>
                          <div className="mb-3">
                            <textarea
                              className=" form-control"
                              rows="3"
                              id="comment"
                              name="Message"
                              value={formData.Message}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12">
                        <div className="basic-form">
                          <label className="form-label">Attachments</label>
                          {/* <h4 className="card-title">Attachments</h4> */}
                          <div className="dz-default dlab-message upload-img mb-3">
                            <form action="#" className="dropzone">
                              <svg
                                width="41"
                                height="40"
                                viewBox="0 0 41 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                                  stroke="#DADADA"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M20.5 20V35"
                                  stroke="#DADADA"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                                  stroke="#DADADA"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                                  stroke="#DADADA"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <div className="fallback mb-3">
                                <input
                                  name="file"
                                  type="file"
                                  onChange={handleFileChange}
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                  <div className="col-md-4">
                    <div className="col-md-10 ms-auto sub-total">
                      <table className="table table-clear">
                        <tbody>
                          {/* <tr>
                          <td className="left">
                            <strong>Subtotal</strong>
                          </td>
                          <td className="right">$8.497,00</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>Discount (20%)</strong>
                          </td>
                          <td className="right">$1,699,40</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>VAT (10%)</strong>
                          </td>
                          <td className="right">$679,76</td>
                        </tr> */}

                          <tr style={{ paddingTop: "20em" }}>
                            <td className="left">
                              <strong>Total</strong>
                            </td>
                            <td className="text-right">
                              <strong>${totalAmount.toFixed(2)}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row card-body mx-2">
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
                        <a
                          href={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
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
                        </a>
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
                            left: "140px",
                          }}
                          onClick={() => {
                            deletePOFile(file.PurchaseOrderFileId);

                            setTimeout(() => {
                              fetchpoData();
                            }, 1000);
                          }}
                        >
                          <span>
                            <Delete color="error" />
                          </span>
                        </span>
                      </div>
                    ))}

                    {selectedFiles.map((file, index) => (
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
                            left: "140px",
                          }}
                          onClick={() => {
                            handleDeleteFile(index);
                          }}
                        >
                          <span>
                            <Delete color="error" />
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="col-md-6">
                    {/* {addCustomerSuccess && (
                      <Alert severity="success">
                        {addCustomerSuccess
                          ? addCustomerSuccess
                          : "Successfully added/Updated Purchase order"}
                      </Alert>
                    )}

                    {emptyFieldsError && (
                      <Alert severity="error">
                        Please fill all required fields
                      </Alert>
                    )}
                    {error && (
                      <Alert severity="error">
                        {errorMessage
                          ? errorMessage
                          : "Error submitting Purchase Order Data"}
                      </Alert>
                    )} */}
                  </div>

                  <div className="mb-2  col-md-6 text-end">
                    <div className="mx-2">
                      {idParam ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary estm-action-btn"
                            onClick={() => {
                              navigate(`/send-mail?title=${"Purchase Order"}`);

                              // sendEmail(
                              //   `/purchase-order/purchase-order-preview?id=${idParam}`,
                              //   formData.SupplierId,
                              //   0,
                              //   true
                              // );
                            }}
                          >
                            <Email />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary estm-action-btn me-2"
                            onClick={() => {
                              navigate(
                                `/purchase-order/purchase-order-preview?id=${idParam}`
                              );
                            }}
                          >
                            <Print></Print>
                          </button>
                        </>
                      ) : (
                        <></>
                      )}

                      <button
                        className="btn btn-danger light me-2"
                        onClick={() => {
                          setFormData(initialFormData);

                          navigate("/purchase-order");

                          setEstimateLinkData({});
                        }}
                      >
                        Cancel
                      </button>
                      <LoaderButton
                        loading={disableButton}
                        handleSubmit={handleSubmit}
                      >
                        Save
                      </LoaderButton>

                      {/* 
                      <button
                        type="button"
                        className="btn btn-primary me-2"
                        onClick={handleSubmit}
                      >
                        Save
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

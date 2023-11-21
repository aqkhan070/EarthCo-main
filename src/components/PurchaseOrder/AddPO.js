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



export const AddPO = ({
  selectedPo,
  setShowContent,
  setPostSuccessRes,
  setPostSuccess,
  fetchPo
}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [formData, setFormData] = useState({
    EstimateNumber: "7135",
  });
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

  const [loading, setLoading] = useState(false)

  const { invoiceList, fetchInvoices } = useFetchInvoices();
  const { billList, fetchBills } = useFetchBills();


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
    if (selectedPo === 0) {
      return
    }
    setLoading(true)
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/GetPurchaseOrder?id=${selectedPo}`,
        { headers }
      );
      setLoading(false)

      console.log("selected purchase order is", res.data.Data);
      setFormData(res.data.Data);
      setInputValue(res.data.Data.CustomerId);
      setItemsList(res.data.ItemData);
    } catch (error) {
      setLoading(false)
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
  const [supplierAddress, setSupplierAddress] = useState('')
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
      setSupplierAddress(''); // Set the supplierAddress to an appropriate default value
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
    const { name, value } = e.target;

    setSelectedCustomer(newValue);
    setSelectedSL(newValue);

    // Initialize parsedValue with the original value

    // Check if the field name is "StatusId" and convert the value to a number if it is
    const parsedValue = ["StatusId"].includes(name) ? Number(value) : value;

    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleChange = (e) => {
    setEmptyFieldsError(false);
    // Extract the name and value from the event target
    const { name, value } = e.target;

    // Convert value to a number if the name is "StatusId"
    const parsedValue = name === "StatusId" ? parseInt(value, 10) : value;

    // Create a new copy of formData with the updated key-value pair
    const updatedFormData = { ...formData, [name]: parsedValue };

    // Update the formData state
    setFormData(updatedFormData);
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
    console.log("selected po is", selectedPo);
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItem, setShowItem] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchText) {
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

    console.log("selected item is", itemInput);
  };

  const deleteItem = (id) => {
    const updatedItemsList = itemsList.filter((item) => item.ItemId !== id);
    setItemsList(updatedItemsList);
  };

  const calculateTotalAmount = () => {
    const total = itemsList.reduce((acc, item) => {
      return acc + item.Rate * item.Qty;
    }, 0);
    return total;
  };
  useEffect(() => {
    // Calculate the total amount and update the state
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [itemsList]);
  // file
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newFileObjects = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileObject = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      newFileObjects.push(fileObject);
    }

    setSelectedFiles([...selectedFiles, ...newFileObjects]);
    console.log("Added files:", newFileObjects);
  };

  // submit handler
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    if ( !formData.Date || !formData.SupplierId) {
      setEmptyFieldsError(true);
      console.log("Required fields are empty");
      return;
    }
    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const PurchaseOrderData = {
      ...formData,
      PurchaseOrderId: 0,
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
        {headers}
      );
     
      fetchPo()
      setPostSuccessRes(response.data.Message);
      setPostSuccess(true);
      setShowContent(true);
      setTimeout(() => {
        setPostSuccess(false);
      }, 4000);

      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
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
  <div className="page-titles">
        <ol className="breadcrumb">
          <div className="menu-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.8381 12.7317C16.4566 12.7317 16.9757 13.2422 16.8811 13.853C16.3263 17.4463 13.2502 20.1143 9.54009 20.1143C5.43536 20.1143 2.10834 16.7873 2.10834 12.6835C2.10834 9.30245 4.67693 6.15297 7.56878 5.44087C8.19018 5.28745 8.82702 5.72455 8.82702 6.36429C8.82702 10.6987 8.97272 11.8199 9.79579 12.4297C10.6189 13.0396 11.5867 12.7317 15.8381 12.7317Z"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.8848 9.1223C19.934 6.33756 16.5134 1.84879 12.345 1.92599C12.0208 1.93178 11.7612 2.20195 11.7468 2.5252C11.6416 4.81493 11.7834 7.78204 11.8626 9.12713C11.8867 9.5459 12.2157 9.87493 12.6335 9.89906C14.0162 9.97818 17.0914 10.0862 19.3483 9.74467C19.6552 9.69835 19.88 9.43204 19.8848 9.1223Z"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <li>
            <h5 className="bc-title">Purchase Order # 1001</h5>
          </li>
        </ol>
      </div>
   {loading ? <div className="center-loader">
                      <CircularProgress />
                    </div>: <>
                  

      <div className="add-item">
        <div className="card"> <div className="itemtitleBar">
                <h4>Purchase Order Details</h4>
              </div>
          <div className="m-3">
            <div className="row mb-3">
             
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
                <label className="form-label">Vendor<span className="text-danger">*</span></label>
                <Autocomplete
                  id="inputState19"
                  size="small"
                  options={vendorList}
                  getOptionLabel={(option) => option.SupplierName || ""}
                  value={
                    vendorList.find(
                      (customer) => customer.SupplierId === formData.SupplierId
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

              <div className="col-md-3">
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
              <div className="col-md-3">
                <label className="form-label">Tags</label>
                <Autocomplete
                  id="inputState19"
                  size="small"
                  multiple
                  options={tags}
                  getOptionLabel={(option) => option.Tag || ""}
                  value={tags.filter((tag) =>
                    (formData.Tags ? formData.Tags.split(", ") : []).includes(
                      tag.Tag
                    )
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
              <div className="col-md-3"></div>
              <div className="col-md-3">
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

              <div className="col-md-9">
                <div className="row">
                  <div className=" col-md-4">
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
                    <label className="form-label">Regional Manager</label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={staffData}
                      getOptionLabel={(option) => option.FirstName || ""}
                      value={
                        staffData.find(
                          (staff) => staff.UserId === formData.RegionalManager
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
                          placeholder="Choose..."
                          className="bg-white"
                        />
                      )}
                    />
                  </div>
                  <div className=" col-md-4">
                    <label className="form-label">Terms</label>
                    <Autocomplete
                      id="inputState19"
                      size="small"
                      options={terms}
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
                    <label className="form-label">Requested by</label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={staffData}
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
                          placeholder="Choose..."
                          className="bg-white"
                        />
                      )}
                    />
                  </div>
                  <div className=" col-md-4">
                    <label className="form-label">Status</label>
                    <FormControl fullWidth variant="outlined">
                      <Select
                        name="StatusId"
                        size="small"
                        value={formData.StatusId}
                        onChange={handleChange}
                      >
                        <MenuItem defaultValue>select</MenuItem>
                        <MenuItem value={1}>Open</MenuItem>
                        <MenuItem value={2}>Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className=" col-md-4 mt-2">
                    <label className="form-label">Invoice Number</label>
                    
                    <Autocomplete                      
                      size="small"
                      options={invoiceList}
                      getOptionLabel={(option) => option.InvoiceNumber || ""}
                      value={
                        invoiceList.find(
                          (invoice) => invoice.InvoiceId === formData.InvoiceId
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
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Bill Number</label>
                   
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

            {/* item table */}

            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Items</h4>
                  </div>

                  <div className="table-responsive active-projects style-1 mt-2">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Qty / Duration</th>
                          <th>Tax</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          itemsList && itemsList.length > 0 ? (
                            itemsList.map((item, index) => (
                              <tr key={item.ItemId}>
                                {" "}
                                {/* Make sure item has a unique 'id' or use index as a fallback */}
                                <td>{item.Name}</td>
                                <td>{item.Description}</td>
                                <td>{item.Rate}</td>
                                <td>{item.Qty}</td>
                                <td>NaN</td>
                                <td>{item.Rate * item.Qty}</td>
                                <td>
                                  <div className="badgeBox">
                                    <span
                                      className="actionBadge badge-danger light border-0 badgebox-size"
                                      onClick={() => {
                                        deleteItem(item.ItemId);
                                      }}
                                    >
                                      <span className="material-symbols-outlined badgebox-size">
                                        delete
                                      </span>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <></>
                          ) /* Add a null check or alternative content if formData.tblEstimateItems is empty */
                        }

                        <tr>
                          <td>
                            <>
                              <Autocomplete
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
                                onInputChange={(_, newInputValue) => {
                                  setShowItem(true);
                                  setSearchText(newInputValue);
                                  setSelectedItem(null); // Clear selected item when input changes
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Search for items..."
                                    variant="outlined"
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
                              type="text"
                              name="tax"
                              disabled
                              style={{ width: "7em" }}
                              className="form-control form-control-sm"
                              placeholder="Tax"
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
                                // Adding the new item to the itemsList
                                setItemsList((prevItems) => [
                                  ...prevItems,
                                  { ...itemInput }, // Ensure each item has a unique 'id'
                                ]);
                                // Reset the input fields
                                setSearchText("");
                                setSelectedItem(null);
                                setItemInput({
                                  Name: "",
                                  Qty: 1,
                                  Description: "",
                                  Rate: null,
                                });
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

            <div className="card">
            {/* <div className="itemtitleBar">
                <h4>Purchase Order Details</h4>
              </div> */}
              <div className="card-body row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12">
                      <div className="basic-form">
                        <h4 className="card-title">Memo Internal</h4>
                        <div className="mb-3">
                          <textarea
                            className="form-txtarea form-control"
                            rows="2"
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
                        <h4 className="card-title">Message</h4>
                        <div className="mb-3">
                          <textarea
                            className="form-txtarea form-control"
                            rows="2"
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
                        <h4 className="card-title">Attachments</h4>
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
                            <div className="fallback">
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

                <div className="col-md-8">
                  <div className="row">
                    <div style={{ height: "10em" }} className="col-md-12"></div>

                    <div className="col-md-8"> </div>
                    <div className="col-md-4">
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
                            <td className="right">
                              <strong>${totalAmount}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6"></div>

                    <div
                      style={{ marginTop: "8em" }}
                      className="mb-2 col-md-6 text-end"
                    >
                      <div>
                        <a
                          href="#;"
                          className="btn btn-primary light me-1 px-3"
                          data-bs-toggle="modal"
                        >
                          <i className="fa fa-print m-0"></i>{" "}
                        </a>
                        <a
                          href="#;"
                          className="btn btn-primary light me-1 px-3"
                          data-bs-toggle="modal"
                        >
                          <i className="fa fa-envelope m-0"></i>{" "}
                        </a>

                        <button
                          type="button"
                          className="btn btn-primary me-1"
                          onClick={handleSubmit}
                        >
                          Save
                        </button>

                        <button
                          className="btn btn-danger light ms-1"
                          onClick={() => {
                            setShowContent(true);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-10">
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                    </>}
      
    </>
  );
};

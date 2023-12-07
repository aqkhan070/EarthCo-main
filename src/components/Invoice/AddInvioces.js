import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import formatDate from "../../custom/FormatDate";
import useGetEstimate from "../Hooks/useGetEstimate";
import useFetchBills from "../Hooks/useFetchBills";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import useCustomerSearch from "../Hooks/useCustomerSearch";
import { useNavigate, NavLink } from "react-router-dom";
import { useEstimateContext } from "../../context/EstimateContext";
import useDeleteFile from "../Hooks/useDeleteFile";

import { Delete, Create } from "@mui/icons-material";
import { Button } from "@mui/material";

const AddInvioces = ({
  setShowContent,
  selectedInvoice,
  fetchInvoices,
  setSubmitRes,
  setSelectedInvoice,
  fetchFilterInvoice,
}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const currentDate = new Date();
  const [formData, setFormData] = useState({
    currentDate: currentDate,
    tblInvoiceItems: [],
  });
  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSL, setSelectedSL] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [terms, setTerms] = useState([]);
  const [tags, setTags] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [customerAddress, setCustomerAddress] = useState("");

  const { name, setName, fetchName } = useFetchCustomerName();
  const { customerSearch, fetchCustomers } = useCustomerSearch();

  const [totalItemAmount, setTotalItemAmount] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);

  // const { estimates, getEstimate } = useGetEstimate();
  const { billList, fetchBills } = useFetchBills();
  const { deleteInvoiceFile } = useDeleteFile();

  const navigate = useNavigate();
  const { estimateLinkData, setEstimateLinkData } = useEstimateContext();

  // const [error, seterror] = useState("")

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
    setCustomerAddress(customer.Address);

    setFormData({ ...formData, CustomerId: customer.UserId });

    setInputValue(customer.CompanyName); // Add this line to update the input value
    setShowCustomersList(false);
  };

  const getInvoice = async () => {
    if (idParam === 0) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Invoice/GetInvoice?id=${idParam}`,
        { headers }
      );
      console.log("selected invoice is", res.data);
      // setFormData(res.data.Data);
      setInputValue(res.data.Data.CustomerId);
      setPrevFiles(res.data.FileData);
      setLoading(false);
      // setItemsList(res.data.ItemData)
      const combinedItems = [...res.data.CostItemData, ...res.data.ItemData];

      setFormData((prevState) => ({
        ...prevState,
        ...res.data.Data,
        tblInvoiceItems: combinedItems,
      }));
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.message);
      console.log("API call error", error);
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

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    console.log("Customer data izz", newValue.Address);
    setCustomerAddress(newValue.Address);
    handleChange(simulatedEvent);
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

  useEffect(() => {
    fetchStaffList();
    fetchTerms();
    fetchTags();
    getEstimate();
    getInvoice();
    fetchBills();
    fetchCustomers();
    console.log("link estimate data is", estimateLinkData);
  }, []);

  useEffect(() => {
    setFormData(estimateLinkData);
    setFormData((prevData) => ({
      ...prevData,
      tblInvoiceItems: estimateLinkData.tblEstimateItems,
    }));
  }, [estimateLinkData]);

  const handleBillAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "BillId",
        value: newValue ? newValue.BillId : "",
      },
    };

    handleChange(simulatedEvent);
  };
  const handleEstimatesAutocompleteChange = (event, newValue) => {
    if (newValue) {
      // Update the formData with both EstimateId and EstimateNumber
      setFormData((prevData) => ({
        ...prevData,
        EstimateId: newValue.EstimateId,
        EstimateNumber: newValue.EstimateNumber,
      }));
    } else {
      // Handle the case where the newValue is null (e.g., when the selection is cleared)
      // Reset both EstimateId and EstimateNumber in formData
      setFormData((prevData) => ({
        ...prevData,
        EstimateId: "",
        EstimateNumber: "",
      }));
    }
  };

  const handleStaffAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "AssignTo",
        value: newValue ? newValue.UserId : "",
      },
    };
    handleChange(simulatedEvent);
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
    handleChange(simulatedEvent);
  };
  const handleTagAutocompleteChange = (event, newValues) => {
    const tagString = newValues.map((tag) => tag.Tag).join(", ");

    setFormData((prevData) => ({
      ...prevData,
      Tags: tagString,
    }));
  };
  // const handleSLAutocompleteChange = (event, newValue) => {
  //   const simulatedEvent = {
  //     target: {
  //       name: "ServiceLocationId",
  //       value: newValue ? newValue.ServiceLocationId : "",
  //     },
  //   };

  //   handleInputChange(simulatedEvent);
  // };

  // const handleContactAutocompleteChange = (event, newValue) => {
  //   const simulatedEvent = {
  //     target: {
  //       name: "ContactId",
  //       value: newValue ? newValue.ContactId : "",
  //     },
  //   };

  //   handleInputChange(simulatedEvent);
  // };

  // const handleInputChange = (e, newValue) => {
  //   const { name, value } = e.target;

  //   setSelectedCustomer(newValue);
  //   setSelectedSL(newValue);

  //   // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId

  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const handleChange = (e) => {
    setSubmitClicked(false);
    setEmptyFieldsError(false);
    // Extract the name and value from the event target
    const { name, value } = e.target;

    // Create a new copy of formData with the updated key-value pair
    const updatedFormData = { ...formData, [name]: value };

    // Update the formData state
    setFormData(updatedFormData);
  };
  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    fetchName(formData.CustomerId);
    console.log("main payload isss", formData);
  }, [formData.CustomerId]);

  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    let InvoiceData = {}; // Declare InvoiceData in the outer scope

    if (!formData.CustomerId || !formData.IssueDate) {
      setEmptyFieldsError(true);
      console.log("Required fields are empty");
      return;
    }

    // Merge the current items with the new items for EstimateData
    if (idParam) {
      InvoiceData = {
        ...formData,
        InvoiceId: idParam,
        TotalAmount: totalItemAmount || 0,
        ProfitPercentage: profitPercentage || 0,
      };
    } else {
      InvoiceData = {
        ...formData,
        InvoiceId: idParam || 0,
        TotalAmount: totalItemAmount || 0,
        ProfitPercentage: profitPercentage || 0,
      };
    }

    console.log("InvoiceData:", InvoiceData);

    const postData = new FormData();
    postData.append("InvoiceData", JSON.stringify(InvoiceData));

    console.log(JSON.stringify(InvoiceData));

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
        "https://earthcoapi.yehtohoga.com/api/Invoice/AddInvoice",
        postData,
        {
          headers,
        }
      );

      if (idParam) {
        navigate("/Invoices");
        return;
      }

      setEstimateLinkData({});

      setEstimateLinkData({});
      navigate("/Invoices");

      console.log("Data submitted successfully:", response.data);
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

  // new items
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
      isCost: false,
    });
    itemInput ? setItemBtnDisable(false) : setItemBtnDisable(true);

    setShowItem(false);
    setSearchResults([]); // Clear the search results

    console.log("selected item is", itemInput);
  };

  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      tblInvoiceItems: [...(prevData.tblInvoiceItems || []), itemInput],
    }));

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
    console.log("new items aree", formData);
  };
  const handleQuantityChange = (itemId, event) => {
    const updatedItemsList = formData.tblInvoiceItems.map((item) => {
      if (item.ItemId === itemId) {
        return {
          ...item,
          Qty: Number(event.target.value),
        };
      }
      return item;
    });
    setFormData((prevData) => ({
      ...prevData,
      tblInvoiceItems: updatedItemsList,
    }));
  };

  const handleRateChange = (itemId, event) => {
    const updatedItemsList = formData.tblInvoiceItems.map((item) => {
      if (item.ItemId === itemId) {
        return {
          ...item,
          Rate: Number(event.target.value),
        };
      }
      return item;
    });
    setFormData((prevData) => ({
      ...prevData,
      tblInvoiceItems: updatedItemsList,
    }));
  };

  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalACAmount, setTotalACAmount] = useState(0);

  useEffect(() => {
    const filteredACItems = formData.tblInvoiceItems?.filter(
      (item) => item.isCost === true
    );

    const newACTotalAmount = filteredACItems?.reduce(
      (acc, item) => acc + item.Rate * item.Qty,
      0
    );
    const filteredItems = formData.tblInvoiceItems?.filter(
      (item) => item.isCost === false
    );

    const newTotalAmount = filteredItems?.reduce(
      (acc, item) => acc + item.Rate * item.Qty,
      0
    );

    setSubtotal(newTotalAmount);
    setTotalACAmount(newACTotalAmount);
    const calculatedTotalProfit = newTotalAmount - newACTotalAmount;
    setTotalProfit(calculatedTotalProfit);
    setTotalItemAmount(newTotalAmount);
    const calculatedProfitPercentage =
      (calculatedTotalProfit / newACTotalAmount) * 100;
    setProfitPercentage(calculatedProfitPercentage);

    // console.log("amounts are", calculatedProfitPercentage, shippingCost, calculatedTotalProfit, totalACAmount, totalItemAmount, subtotal);
  }, [formData.tblInvoiceItems]);

  // Calculate the total amount when tblInvoiceItems or formData changes
  useEffect(() => {}, [formData.tblInvoiceItems]);

  // AC

  const [aCInput, setACInput] = useState({
    Name: "",
    Qty: 1,
    Description: "",
    Rate: null,
  });
  const [searchACText, setSearchACText] = useState("");
  const [searchACResults, setSearchACResults] = useState([]);
  const [selectedACItem, setSelectedACItem] = useState(null);
  const [showACItem, setShowACItem] = useState(true);
  const [itemACBtnDisable, setItemACBtnDisable] = useState(true);
  const inputACRef = useRef(null);

  const handleACAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      tblInvoiceItems: [
        ...(prevData.tblInvoiceItems || []), // Initialize as empty array if undefined
        aCInput,
      ],
    }));
    setSearchACText("");
    setSelectedACItem({
      SalePrice: "",
      SaleDescription: "",
    });
    setACInput({
      Name: "",
      Qty: 1,
      Description: "",
      Rate: 0,
    }); // Reset the modal input field
    console.log("new items are", formData);
  };

  useEffect(() => {
    if (searchACText) {
      // Make an API request when the search text changes

      axios
        .get(
          `https://earthcoapi.yehtohoga.com/api/Item/GetSearchItemList?Search=${searchACText}`,
          { headers }
        )
        .then((response) => {
          setSearchACResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching itemss data:", error);
        });
    } else {
      setSearchACResults([]); // Clear the search results when input is empty
    }
  }, [searchACText]);

  const handleACItemChange = (event) => {
    setShowACItem(true);
    setSearchACText(event.target.value);

    setSelectedACItem(null); // Clear selected item when input changes
  };

  const handleACItemClick = (item) => {
    setSelectedACItem(item);
    setSearchACText(item.ItemName); // Set the input text to the selected item's name
    setACInput({
      ...aCInput,
      ItemId: item.ItemId,
      Name: item.ItemName,
      Description: item.SaleDescription,
      Rate: item.PurchasePrice,
      isCost: true,
    });
    aCInput ? setItemACBtnDisable(false) : setItemACBtnDisable(true);

    setShowACItem(false);
    setSearchACResults([]); // Clear the search results
    console.log("selected item is", item);
  };

  const handleACQuantityChange = (itemId, event) => {
    const updatedItemsList = formData.tblInvoiceItems.map((item) => {
      if (item.ItemId === itemId) {
        return {
          ...item,
          Qty: Number(event.target.value),
        };
      }
      return item;
    });
    setFormData((prevData) => ({
      ...prevData,
      tblInvoiceItems: updatedItemsList,
    }));
  };

  const handleACRateChange = (itemId, event) => {
    const updatedItemsList = formData.tblInvoiceItems.map((item) => {
      if (item.ItemId === itemId) {
        return {
          ...item,
          Rate: Number(event.target.value),
        };
      }
      return item;
    });
    setFormData((prevData) => ({
      ...prevData,
      tblInvoiceItems: updatedItemsList,
    }));
  };

  const deleteItem = (itemId) => {
    const updatedArr = formData.tblInvoiceItems.filter(
      (item) => item.ItemId !== itemId
    );

    console.log("Item to delete:", itemId);
    console.log("Updated Array:", updatedArr);

    setFormData((prevData) => ({
      ...prevData,
      tblInvoiceItems: updatedArr,
    }));
  };

  // files

  const [PrevFiles, setPrevFiles] = useState([]);

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
            <h5 className="bc-title">Invoice</h5>
          </li>
        </ol>
      </div>

      {loading ? (
        <div className="center-loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="add-item">
          <div className="card">
            <div className="itemtitleBar">
              <h4>Invoice Details</h4>
            </div>
            <div className="">
              <div className=" card-body row mb-3 ">
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
                <div className=" col-md-3">
                  <label className="form-label">Invoice Number </label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="InvoiceNumber"
                      value={formData.InvoiceNumber}
                      onChange={handleChange}
                      placeholder="Invoice number"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Assigned To</label>
                  <Autocomplete
                    id="staff-autocomplete"
                    size="small"
                    options={staffData}
                    getOptionLabel={(option) => option.FirstName || ""}
                    value={
                      staffData.find(
                        (staff) => staff.UserId === formData.AssignTo
                      ) || null
                    }
                    onChange={handleStaffAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.UserId === value.AssignTo
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
                <div className="col-md-3"></div>

                <div className="col-md-3">
                  <label className="form-label">
                    Issue Date<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-2">
                    <TextField
                      type="date"
                      className="form-control"
                      name="IssueDate"
                      size="small"
                      value={formatDate(formData.IssueDate)}
                      error={submitClicked && !formData.IssueDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" col-md-3">
                  <label className="form-label">Due Date</label>
                  <div className="input-group mb-2">
                    <TextField
                      type="date"
                      className="form-control"
                      name="DueDate"
                      size="small"
                      value={formatDate(formData.DueDate)}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" col-md-3">
                  <label className="form-label">
                    Linked Estimate
                    {formData.EstimateId ? (
                      <>
                        <br />
                        <a
                          href=""
                          style={{ color: "blue" }}
                          onClick={() => {
                            navigate(
                              `/Estimates/Update-Estimate?id=${formData.EstimateId}`
                            );
                          }}
                        >
                          Go to Estimate
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                  </label>

                  <Autocomplete
                    id="inputState19"
                    size="small"
                    options={estimates}
                    getOptionLabel={(option) => option.EstimateNumber || ""}
                    value={
                      estimates.find(
                        (customer) =>
                          customer.EstimateNumber === formData.EstimateNumber
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
                        style={{ width: "20.5em" }}
                        placeholder="Estimate No"
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
                        <span>Billing Address</span>
                        <p>{customerAddress || ""}</p>
                      </li>
                      <li>
                        <span>Shipping Address</span>
                        <p>{customerAddress || ""}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className=" col-md-6">
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
                    <div className=" col-md-6">
                      <label className="form-label">
                        Related Bills
                        {formData.BillId ? (
                          <>
                            <br />
                            <a
                              href=""
                              style={{ color: "blue" }}
                              onClick={() => {
                                navigate(
                                  `/Bills/addbill?id=${formData.BillId}`
                                );
                              }}
                            >
                              Go to Bill
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
                            placeholder="Bill No"
                            className="bg-white"
                          />
                        )}
                        aria-label="Contact select"
                      />
                    </div>
                    <div className=" col-md-6 mt-2">
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
                  </div>
                </div>

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
              </div>
              <div className="col-xl-3">
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
                {/* <div className="col-xl-3">
                <div className="c-details">
                  <ul>
                    <li className="d-flex">
                      <span>
                        <b>Email:</b> email@gmail.com
                      </span>
                    </li>
                    <li className="d-flex">
                      <span>
                        <b>Phone:</b> +92-000-999-8888
                      </span>
                    </li>
                    <li className="d-flex">
                      <span>
                        <b>Address</b>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3">
                <div className="c-details">
                  <ul>
                    <li>
                      <span>Type</span>
                    </li>
                    <li>
                      <span>Term </span>
                    </li>
                  </ul>
                </div>
              </div> */}
              </div>
            </div>

            {/* item table */}

            <div className="itemtitleBar">
              <h4>Items</h4>
            </div>
            <div className="card-body">
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
                        <th>Tax</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.tblInvoiceItems &&
                      formData.tblInvoiceItems.length > 0 ? (
                        formData.tblInvoiceItems
                          .filter((item) => item.isCost === false) // Filter items with isCost equal to false
                          .map((item, index) => (
                            <tr colSpan={2} key={item.ItemId}>
                              <td className="itemName-width">{item.Name}</td>
                              <td>{item.Description}</td>
                              <td>
                                <input
                                  type="number"
                                  style={{ width: "7em" }}
                                  className="form-control form-control-sm"
                                  value={item.Qty}
                                  onChange={(e) =>
                                    handleQuantityChange(item.ItemId, e)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  style={{ width: "7em" }}
                                  className="form-control form-control-sm"
                                  value={item.Rate}
                                  onChange={(e) =>
                                    handleRateChange(item.ItemId, e)
                                  }
                                />
                              </td>
                              <td>{(item.Rate * item.Qty).toFixed(2)}</td>
                              <td>NaN</td>
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
                              options={searchResults}
                              getOptionLabel={(item) => item.ItemName}
                              value={selectedItem} // This should be the selected item, not searchText
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
                                    <h5> {item.ItemName}</h5>
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
                              style={{ width: "7em" }}
                              className="form-control form-control-sm"
                              value={
                                selectedItem?.SalePrice || itemInput.Rate || ""
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
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="itemtitleBar">
              <h4>Additional Costs</h4>
            </div>
            <div className="card-body ">
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.tblInvoiceItems &&
                      formData.tblInvoiceItems.length > 0 ? (
                        formData.tblInvoiceItems
                          .filter((item) => item.isCost === true) // Filter items with isCost equal to true
                          .map((item, index) => (
                            <tr className="itemName-width" key={item.ItemId}>
                              <td>{item.Name}</td>
                              <td>{item.Description}</td>
                              <td>
                                <input
                                  type="number"
                                  style={{ width: "7em" }}
                                  className="form-control form-control-sm"
                                  value={item.Qty}
                                  onChange={(e) =>
                                    handleACQuantityChange(item.ItemId, e)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  style={{ width: "7em" }}
                                  className="form-control form-control-sm"
                                  value={item.Rate}
                                  onChange={(e) =>
                                    handleACRateChange(item.ItemId, e)
                                  }
                                />
                              </td>
                              <td>{(item.Rate * item.Qty).toFixed(2)}</td>
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
                              id="search-ac-items"
                              options={searchACResults}
                              getOptionLabel={(item) => item.ItemName}
                              value={selectedACItem}
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleACItemClick(newValue);
                                } else {
                                  setSelectedACItem(null);
                                }
                              }}
                              inputValue={searchACText}
                              onInputChange={(event, newInputValue) => {
                                setShowACItem(true);
                                setSearchACText(newInputValue);
                                setSelectedACItem(null); // Clear selected item when input changes
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Search for items..."
                                  variant="outlined"
                                  size="small"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      // Handle item addition when Enter key is pressed
                                      e.preventDefault(); // Prevent form submission
                                      handleACAddItem();
                                    }
                                  }}
                                  fullWidth
                                />
                              )}
                              renderOption={(props, item) => (
                                <li
                                  style={{ cursor: "pointer" }}
                                  {...props}
                                  onClick={() => handleACItemClick(item)}
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
                            />
                          </>
                        </td>
                        <td>
                          <p>{selectedACItem?.SaleDescription || " "}</p>
                        </td>
                        <td>
                          <input
                            type="number"
                            name="Qty"
                            value={aCInput.Qty}
                            onChange={(e) =>
                              setACInput({
                                ...aCInput,
                                Qty: Number(e.target.value),
                              })
                            }
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                // Handle item addition when Enter key is pressed
                                e.preventDefault(); // Prevent form submission
                                handleACAddItem();
                              }
                            }}
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
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  // Handle item addition when Enter key is pressed
                                  e.preventDefault(); // Prevent form submission
                                  handleACAddItem();
                                }
                              }}
                              onChange={(e) =>
                                setACInput({
                                  ...aCInput,
                                  Rate: Number(e.target.value),
                                })
                              }
                              onClick={(e) => {
                                setSelectedACItem({
                                  ...selectedACItem,
                                  PurchasePrice: 0,
                                });
                              }}
                              style={{ width: "7em" }}
                              className="form-control form-control-sm"
                              value={
                                selectedACItem?.PurchasePrice ||
                                aCInput.Rate ||
                                " "
                              }
                            />
                          </div>
                        </td>

                        <td>
                          <h5 style={{ margin: "0" }}>
                            {(aCInput.Rate * aCInput.Qty).toFixed(2)}
                          </h5>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12">
                      <div className="basic-form">
                        <form>
                          <h4 className="card-title">Memo Internal</h4>
                          <div className="mb-3">
                            <textarea
                              className="form-txtarea form-control"
                              rows="2"
                              id="comment"
                              name="MemoInternal"
                              value={formData.MemoInternal}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="basic-form">
                        <form>
                          <h4 className="card-title">Customer Message</h4>
                          <div className="mb-3">
                            <textarea
                              className="form-txtarea form-control"
                              rows="2"
                              id="comment"
                              name="CustomerMessage"
                              value={formData.CustomerMessage}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </form>
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

                <div className="col-md-4 ms-auto sub-total">
                  <table className="table table-clear table-borderless">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Subtotal</strong>
                        </td>
                        <td className="right">
                          {subtotal !== undefined
                            ? `$${subtotal.toFixed(2)}`
                            : "$0.00"}
                        </td>
                      </tr>
                      <tr>
                        <td className="left">
                          <label className="form-label">Taxes</label>
                          <div
                            style={{ width: "10em" }}
                            className="input-group"
                          >
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="Taxes"
                              placeholder=""
                            />
                          </div>
                        </td>
                        <td className="right">$00</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <label className="form-label">Discount(%)</label>
                          <div
                            style={{ width: "10em" }}
                            className="input-group"
                          >
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="Discount"
                              placeholder=""
                            />
                          </div>
                        </td>
                        <td className="right">$0.00</td>
                      </tr>

                      <tr>
                        <td className="left">
                          <strong>Total</strong>
                        </td>
                        <td className="right">
                          <strong>
                            {" "}
                            {totalItemAmount !== undefined
                              ? `$${totalItemAmount.toFixed(2)}`
                              : "$0.00"}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="left">Payment/Credit</td>
                        <td className="right">$0.00</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <h3>Balance due</h3>
                        </td>
                        <td className="right">
                          <h3>$0.00</h3>
                        </td>
                      </tr>
                      <tr>
                        <td className="left">Total Expenses</td>
                        <td className="right">$0.00</td>
                      </tr>
                      <tr>
                        <td className="left">Total Profit(%)</td>
                        <td className="right">
                          {" "}
                          {profitPercentage !== undefined
                            ? `${profitPercentage.toFixed(2)}%`
                            : "0.00%"}
                        </td>
                      </tr>
                      <tr>
                        <td className="left">Profit Margin(%)</td>
                        <td className="right">$0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row mx-2">
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
                        left: "140px",
                      }}
                      onClick={() => {
                        deleteInvoiceFile(file.BillFileId);

                        setTimeout(() => {
                          getInvoice();
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
                      src={file.url}
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
            </div>

            <div className="mb-3 row ">
              <div className="col-md-8">
                {emptyFieldsError && (
                  <Alert severity="error">
                    Please fill all required fields
                  </Alert>
                )}
                {error && (
                  <Alert severity="error">
                    {errorMessage
                      ? errorMessage
                      : "Error Adding/Updating Invoice"}
                    -
                  </Alert>
                )}
              </div>

              <div className="col-md-4 text-right">
                <button
                  type="button"
                  className="btn btn-primary me-1"
                  onClick={handleSubmit}
                >
                  Save
                </button>

                <button
                  className="btn btn-danger light me-3 ms-1"
                  onClick={() => {
                    navigate("/Invoices");
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

export default AddInvioces;

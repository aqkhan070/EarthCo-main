import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Cookies from "js-cookie";
import BillTitle from "./BillTitle";
import formatDate from "../../custom/FormatDate";
import Alert from "@mui/material/Alert";
import useFetchPo from "../Hooks/useFetchPo";
import { Delete, Create } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Print, Email, Download } from "@mui/icons-material";
import useDeleteFile from "../Hooks/useDeleteFile";
import { useNavigate, NavLink } from "react-router-dom";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import CircularProgress from "@mui/material/CircularProgress";
import { DataContext } from "../../context/AppData";
import useQuickBook from "../Hooks/useQuickBook";
import useFetchCatagories from "../Hooks/useFetchCatagories";
import BackButton from "../Reusable/BackButton";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import FileUploadButton from "../Reusable/FileUploadButton";
import formatAmount from "../../custom/FormatAmount";
import PrintButton from "../Reusable/PrintButton";
import HandleDelete from "../Reusable/HandleDelete";
import useFetchInvoices from "../Hooks/useFetchInvoices";
import BillPdf from "./BillPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TextArea from "../Reusable/TextArea";

const AddBill = ({}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const currentDate = new Date();

  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const navigate = useNavigate();
  const { loggedInUser } = useContext(DataContext);
  const [formData, setFormData] = useState({
    BillDate: currentDate,
    DueDate: null,
    PurchaseOrderId: null,
  });

  const { syncQB } = useQuickBook();
  const { fetchCatagories, catagories } = useFetchCatagories();
  const { fetchSupplierName, supplierName, setSupplierName } =  
    useFetchCustomerName();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const { invoiceList, fetchInvoices } = useFetchInvoices();

  const [vendorList, setVendorList] = useState([]);
  const [supplierAddress, setSupplierAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [terms, setTerms] = useState([]);
  const [estimates, setEstimates] = useState([]);

  const { PoList, fetchPo } = useFetchPo();
  const { deleteBillFile } = useDeleteFile();

  const [loading, setLoading] = useState(false);
  const [billPreviewData, setBillPreviewData] = useState({});

  const getBill = async () => {
    setLoading(true);
    if (!idParam) {
      setLoading(false);

      return;
    }

    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/GetBill?id=${idParam}`,
        { headers }
      );
      setBillPreviewData(res.data)
      setFormData(res.data.Data);
      fetchSupplierName(res.data.Data.SupplierId);
      setItemsList(res.data.ItemData);
      setCatagoryList(res.data.AccountData);
      setLoading(false);

      setPrevFiles(res.data.FileData);
      console.log("selected bill is", res.data);
    } catch (error) {
      setLoading(false);

      console.log("api call error", error);
    }
  };
  useEffect(() => {
    getBill();
    fetchCatagories();
    fetchVendors();
    fetchTags();
    fetchTerms();
    fetchPo();
    getEstimate();
    fetchInvoices();
  }, []);

  const fetchVendors = async (searchText = "") => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Supplier/GetSearchSupplierList?Search=${searchText}`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("Vendor are ", res.data);
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
  const handleVendorAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "SupplierId",
        value: newValue ? newValue?.UserId : "",
      },
    };
    if (newValue) {
      fetchSupplierName(newValue.UserId);
      setSupplierAddress(newValue.Address);
      handleChange(simulatedEvent);
    } else {
      setSupplierAddress("");
    }

    handleChange(simulatedEvent);
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

  const handleTagAutocompleteChange = (event, newValues) => {
    const tagString = newValues.map((tag) => tag.Tag).join(", ");

    setFormData((prevData) => ({
      ...prevData,
      Tags: tagString,
    }));
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
  const handleTermsAutocompleteChange = (event, newValue) => {
   
    if (newValue) {
      // Update the formData with both EstimateId and EstimateNumber
      setFormData((prevData) => ({
        ...prevData,
        TermId: newValue.TermId,
       
      }));
    } else {
      // Handle the case where the newValue is null (e.g., when the selection is cleared)
      // Reset both EstimateId and EstimateNumber in formData
      setFormData((prevData) => ({
        ...prevData,
       
        TermId: null,
      }));
    }
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

  const handleAutocompleteChange = (
    fieldName,
    valueProperty,
    event,
    newValue
  ) => {
    
    setFormData((prevData) => ({
      ...prevData,
      InvoiceId: newValue.InvoiceId,
      InvoiceNumber: newValue.InvoiceNumber,
    }));

    
  };

  const handlePoAutocompleteChange = (event, newValue) => {
    
    setFormData((prevData) => ({
      ...prevData,
      PurchaseOrderId: newValue.PurchaseOrderId,
      PurchaseOrderNumber: newValue.PurchaseOrderNumber,
    }));

   
  };

  const handleInputChange = (e, newValue) => {
    setSubmitClicked(false);

    setDisableButton(false);
    const { name, value } = e.target;

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId
  };
  const handleChange = (e) => {
    setSubmitClicked(false);

    setDisableButton(false);

    // Extract the name and value from the event target
    const { name, value } = e.target;

    // Create a new copy of formData with the updated key-value pair
    const updatedFormData = {
      ...formData,
      [name]: value,

      Amount: 0.0,
      Currency: "usd",

      Amount: totalAmount,
    };

    // Update the formData state
    setFormData(updatedFormData);
  };

  useEffect(() => {
    fetchSupplierName(formData.SupplierId);
  }, [formData.SupplierId]);

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
    if (!itemInput.ItemId) {
      return;
    }
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
    });

    setItemsList((prevItems) => [
      ...prevItems,
      {
        ...itemInput,
        ItemId: item.ItemId,
      Name: item.ItemName,
      Description: item.SaleDescription,
      Rate: item.SalePrice,
      }, // Ensure each item has a unique 'id'
    ]);

    setSearchResults([]); // Clear the search results

    console.log("selected item is", item);
    setItemInput({
      Name: "",
      Qty: 1,
      Description: "",
      Rate: null,
    });
  };

  const quantityInputRef = useRef(null);
  useEffect(() => {
    if (quantityInputRef.current) {
      quantityInputRef.current.focus();
    }
  }, [itemsList.length]);

  const deleteItem = (id) => {
    const updatedItemsList = itemsList.filter((item, index) => index !== id);
    setItemsList(updatedItemsList);
  };

  const calculateTotalAmount = () => {
    const total = itemsList.reduce((acc, item) => {
      return acc + item.Rate * item.Qty;
    }, 0);
    return total;
  };

  const handleItemDescriptionChange = (itemId, event) => {
    const updatedItemsList = itemsList.map((item, index) => {
      if (index === itemId) {
        return {
          ...item,
          Description: event.target.value,
        };
      }
      return item;
    });
    setItemsList(updatedItemsList);
  };

  const handleQuantityChange = (itemId, event) => {
    const updatedItemsList = itemsList.map((item, index) => {
      if (index === itemId) {
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
    const updatedItemsList = itemsList.map((item, index) => {
      if (index === itemId) {
        return {
          ...item,
          Rate: Number(event.target.value),
        };
      }
      return item;
    });
    setItemsList(updatedItemsList);
  };

  useEffect(() => {
    // Calculate the total amount and update the state
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [itemsList]);

  // Catagories

  const [catagoryList, setCatagoryList] = useState([]);
  const [catagoryInput, setCatagoryInput] = useState({
    AccountId: 0,
    Name: "",
    Description: "",
    Amount: 0,
  });

  const [selectedCatagory, setSelectedCatagory] = useState({});

  const [totalCatagoryAmount, setTotalCatagoryAmount] = useState(0);


  const handleCatagoryClick = (item) => {
    console.log("selected catagory", item);
    setSelectedCatagory(item);
    if (item) {
      setCatagoryList((prevItems) => [...prevItems, {
        AccountId: item.AccountId,
        Name: item.Code + " "+ item.Name,
        Description: "",
        Amount: 0,
      }]);
    
    }
  };

  const handleDescriptionChange = (index, value) => {
    setCatagoryList((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].Description = value;
      return updatedItems;
    });
  };

  // Function to handle amount change in upper rows
  const handleAmountChange = (index, value) => {
    setCatagoryList((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].Amount = parseFloat(value); // Convert value to a float if needed
      return updatedItems;
    });
  };

  const deleteCatagory = (id) => {
    const updatedItemsList = catagoryList.filter((item, index) => index !== id);
    setCatagoryList(updatedItemsList);
  };

  const calculateCategoriesAmount = () => {
    let totalAmount = 0;
    for (const item of catagoryList) {
      totalAmount += item.Amount;
    }
    return totalAmount;
  };
  useEffect(() => {
    const total = calculateCategoriesAmount();
    setTotalCatagoryAmount(total);
  }, [catagoryList]);
  // files

  const [selectedFiles, setSelectedFiles] = useState([]);
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

    // setSelectedFiles([...selectedFiles, ...files]);
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

  // submit handler

  const [submitClicked, setSubmitClicked] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    console.log("formData", formData);

    if (!formData.SupplierId || !formData.BillDate) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      return;
    }
    if (catagoryList.length <= 0) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please Add Atleast one  category");

      return;
    }
    setDisableButton(true);

    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const BillData = {
      ...formData,
      BillId: idParam,
      tblBillItems: itemsList,
      tblBillAccounts: catagoryList,
      Currency: "usd",
      CompanyId: Number(loggedInUser.CompanyId),
    };

    console.log("BillData:", BillData);

    // console.log("data:", data);

    postData.append("BillData", JSON.stringify(BillData));
    console.log(JSON.stringify(BillData));
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
        "https://earthcoapi.yehtohoga.com/api/Bill/AddBill",
        postData,
        {
          headers,
        }
      );
      syncQB(response.data.SyncId);

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      setDisableButton(false);

      setTimeout(() => {
        navigate(`/bills`);
      }, 4000);

      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {
      console.error("API Call Error:", error);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText(error.response.data);
      setDisableButton(false);
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
      <BillTitle />
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

      <div className="add-item">
        {/* <div className="tabSwitch">
          <button type="button" className="btn btn-secondary btn-sm">
            Estimate
          </button>
          <button type="button" className="btn btn-secondary btn-sm">
            + Add Service Request
          </button>
          <button type="button" className="btn btn-secondary btn-sm">
            + Add Invoice
          </button>
        </div> */}
        {loading ? (
          <div className="center-loader">
            <CircularProgress />
          </div>
        ) : (
          <div className="card">
            <div className="itemtitleBar ">
              <h4>Bill Details</h4>
            </div>
            <div className="card-body">
              <div className="row mt-2">
                <div className="basic-form ">
                  <form>
                    <div className="row">
                      <div className="mb-3 col-md-3">
                        <div className="col-md-12">
                          <label className="form-label">
                            Vendor<span className="text-danger">*</span>
                          </label>
                          <Autocomplete
                            id="inputState19"
                            size="small"
                            options={vendorList}
                            getOptionLabel={(option) => option.FirstName || ""}
                            value={
                              supplierName ? { FirstName: supplierName } : ""
                            }
                            onChange={handleVendorAutocompleteChange}
                            isOptionEqualToValue={(option, value) =>
                              option.UserId === value.SupplierId
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                onBlur={() => {
                                  fetchSupplierName(formData.SupplierId);
                                }}
                                onClick={() => {
                                  setSupplierName("");
                                }}
                                onChange={(e) => {
                                  fetchVendors(e.target.value);
                                }}
                                error={submitClicked && !formData.SupplierId}
                                placeholder="Vendors"
                                className="bg-white"
                              />
                            )}
                            aria-label="Default select example"
                          />
                        </div>
                        <div className="col-md-12">
                          <div className="c-details">
                            <ul>
                              <li>
                                <span>Vendor Address</span>
                                <p>
                                  {supplierAddress ||
                                    formData.SupplierAddress ||
                                    " "}
                                </p>
                              </li>
                              <li>
                                <span>Shipping </span>
                                <p>
                                  {" "}
                                  {supplierAddress ||
                                    formData.SupplierAddress ||
                                    " "}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="row">
                          <div className=" col-md-4">
                            <label className="form-label">Bill # </label>
                            <div className="input-group mb-2">
                              <TextField
                                type="text"
                                name="BillNumber"
                                value={formData.BillNumber}
                                onChange={handleChange}
                                size="small"
                                className="form-control"
                                placeholder="Bill No"
                              />
                            </div>
                          </div>
                          <div className=" col-md-4">
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
                          <div className=" col-md-4">
                            <label className="form-label">
                              Date<span className="text-danger">*</span>
                            </label>
                            <div className="input-group mb-2">
                              <TextField
                                type="date"
                                size="small"
                                className="form-control"
                                name="BillDate"
                                error={submitClicked && !formData.BillDate}
                                value={formatDate(formData.BillDate)}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className=" col-md-4">
                            <label className="form-label">Due</label>
                            <div className="input-group mb-2">
                              <input
                                type="date"
                                className="form-control"
                                name="DueDate"
                                value={formatDate(formData.DueDate)}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className=" col-md-4">
                            <label className="form-label">
                              Purchase Order
                              {formData.PurchaseOrderId ? (
                                <>
                                  <a
                                    href=""
                                    style={{ color: "blue" }}
                                    className="ms-2"
                                    onClick={() => {
                                      navigate(
                                        `/purchase-order/add-po?id=${formData.PurchaseOrderId}`
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
                              options={PoList}
                              getOptionLabel={(option) =>
                                option.PurchaseOrderNumber || ""
                              }
                              value={
                                PoList.find(
                                  (po) =>
                                    po.PurchaseOrderId ===
                                    formData.PurchaseOrderId
                                ) || null
                              }
                              onChange={handlePoAutocompleteChange}
                              isOptionEqualToValue={(option, value) =>
                                option.PurchaseOrderId === value.PurchaseOrderId
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label=""
                                  placeholder="Purchase order No"
                                  className="bg-white"
                                />
                              )}
                              aria-label="Contact select"
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
                                  (customer) =>
                                    customer.TermId === formData.TermId
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
                              Linked Estimate
                              {formData.EstimateId ? (
                                <>
                                  <a
                                    href=""
                                    style={{ color: "blue" }}
                                    className="ms-2"
                                    onClick={() => {
                                      navigate(
                                        `/estimates/add-estimate?id=${formData.EstimateId}`
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
                                />
                              )}
                              aria-label="Default select example"
                            />
                          </div>
                          <div className="col-md-4 ">
                            <label className="form-label">
                              Linked Invoice
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
                              onChange={(event, newValue) =>
                                handleAutocompleteChange(
                                  "InvoiceId",
                                  "InvoiceId",
                                  event,
                                  newValue
                                )
                              }
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
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <>
              <div className="itemtitleBar">
                <h4>Categories</h4>
              </div>
              <div className="card-body pt-0">
                <div className="estDataBox">
                  <div className="table-responsive active-projects style-1 mt-2">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th className="itemName-width">Catagory</th>
                          <th>Description</th>

                          <th>Amount</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {catagoryList && catagoryList.length > 0 ? (
                          catagoryList.map((item, index) => (
                            <tr>
                              <td className="itemName-width">
                                {item?.Name || ""}
                              </td>
                              <td>
                                <TextField
                                  size="small"
                                  multiline
                                  style={{ height: "fit-content" }}
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={item.Description}
                                  onChange={(e) =>
                                    handleDescriptionChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Description"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={item.Amount}
                                  onChange={(e) =>
                                    handleAmountChange(index, e.target.value)
                                  }
                                  placeholder="Amount"
                                />
                              </td>
                              <td>
                                <Button onClick={() => deleteCatagory(index)}>
                                  <Delete color="error" />
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <></>
                        )}
                        <tr>
                          <td className="itemName-width">
                            <Autocomplete
                              options={catagories}
                              getOptionLabel={(item) => {
                                return item.Code ? `${item.Code} ${item.Name}` : item.Name;
                            }}
                              value={selectedCatagory?.Name}
                              onChange={(event, newValue) => {
                                handleCatagoryClick(newValue);
                              }}
                              filterOptions={(options, { inputValue }) => {
                                return options.filter(
                                  (option) =>
                                    option.Name?.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    option.Code?.toLowerCase().includes(inputValue.toLowerCase())
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Search for categories..."
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => {fetchCatagories(e.target.value)}}
                                  fullWidth
                                />
                              )}
                            
                            />
                          </td>
                          <td>
                            <TextField
                              size="small"
                              multiline
                              style={{ height: "fit-content" }}
                              type="text"
                              value={catagoryInput.Description}
                              className="form-control form-control-sm"
                              onChange={(e) =>
                                setCatagoryInput({
                                  ...catagoryInput,
                                  Description: e.target.value,
                                })
                              }
                              placeholder="Description"
                            
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={catagoryInput.Amount}
                              onChange={(e) =>
                                setCatagoryInput({
                                  ...catagoryInput,
                                  Amount: Number(e.target.value),
                                })
                              }
                              placeholder="Amount"
                             
                            />
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
            <div className="itemtitleBar">
              <h4>Items</h4>
            </div>
            <div className="card-body pt-0">
              <div className="estDataBox">
                <div className="table-responsive active-projects style-1 mt-2">
                  <table id="empoloyees-tblwrapper" className="table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsList && itemsList.length > 0 ? (
                        itemsList.map((item, index) => (
                          <tr colSpan={2} key={index}>
                            <td>{item.Name}</td>
                            <td>
                              <TextField
                                size="small"
                                multiline
                                style={{ height: "fit-content" }}
                                className="form-control form-control-sm"
                                value={item.Description}
                                onChange={(e) =>
                                  handleItemDescriptionChange(index, e)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.Qty}
                                ref={
                                  index ===
                                  itemsList.length - 1
                                    ? quantityInputRef
                                    : null
                                }
                                onChange={(e) => handleQuantityChange(index, e)}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={item.Rate}
                                className="form-control form-control-sm"
                                onChange={(e) => handleRateChange(index, e)}
                              />
                            </td>
                            <td className="text-right">
                              $ {(item.Rate * item.Qty).toFixed(2)}
                            </td>

                            <td>
                              <div className="badgeBox">
                                <Button
                                  onClick={() => {
                                    deleteItem(index);
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
                        <td>
                          <>
                            <Autocomplete
                              id="search-items"
                              options={searchResults}
                              getOptionLabel={(item) => item.ItemName}
                              value={selectedItem.ItemName} // This should be the selected item, not searchText
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  handleItemClick(newValue);
                                } else {
                                  setSelectedItem({});
                                }
                              }}
                              filterOptions={(options, { inputValue }) => {
                                return options.filter(
                                  (option) =>
                                    option.ItemName?.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    option.SaleDescription?.toLowerCase().includes(inputValue.toLowerCase())
                                );
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
                                  // // onClick={() => handleItemClick(item)}
                                >
                                  <div className="customer-dd-border">
                                    <p>
                                      <strong>{item.ItemName}</strong>{" "}
                                    </p>
                                    <small>{item.Type}</small>
                                    <br />
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
                          <TextField
                            size="small"
                            multiline
                            style={{ height: "fit-content" }}
                            value={itemInput?.Description}
                            onChange={(e) =>
                              setItemInput({
                                ...itemInput,
                                Description: e.target.value,
                              })
                            }
                            className="form-control form-control-sm"
                            placeholder="Description"
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
                          <input
                            type="number"
                            name="Rate"
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
                        </td>
                        <td>
                          <h5 className="text-right" style={{ margin: "0" }}>
                            $ {(itemInput.Rate * itemInput.Qty).toFixed(2)}
                          </h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card-body row">
              <div className="col-md-4">
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <div className="basic-form">
                      <label className="form-label">Memo</label>

                      <div className="mb-3">
                        <TextArea                         
                          name="Memo"
                          value={formData.Memo}
                          onChange={handleChange}
                        ></TextArea>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12">
                    <FileUploadButton onClick={handleFileChange}>
                      Upload File
                    </FileUploadButton>
                  </div>
                </div>
              </div>

              <div className="col-md-4  ms-auto sub-total">
                <table className="table table-borderless table-clear">
                  <tbody>
                    <tr>
                      <td className="left">
                        <strong>Items Subtotal</strong>
                      </td>
                      <td className="right">${formatAmount(totalAmount)}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Categories Total</strong>
                      </td>
                      <td className="right">
                        ${formatAmount(totalCatagoryAmount)}
                      </td>
                    </tr>

                    <tr>
                      <td className="left">
                        <strong>Total</strong>
                      </td>
                      <td className="right">
                        <strong>
                          ${formatAmount(totalAmount + totalCatagoryAmount)}
                        </strong>
                      </td>
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
                      deleteBillFile(file.BillFileId, getBill);
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

            <div className="row mb-3 ">
              <div className="col-md-6">
                <div className="ms-3">
                  <BackButton
                    onClick={() => {
                      navigate(`/bills`);
                    }}
                  >
                    Back
                  </BackButton>
                </div>
                {/* {addCustomerSuccess && (
                <Alert severity="success">
                  {addCustomerSuccess
                    ? addCustomerSuccess
                    : "Susseccfully added/Updated customer"}
                </Alert>
              )}
              {errorMessage && (
                <Alert severity="error">
                  {errorMessage ? errorMessage : "Error Submitting Bill Data"}
                </Alert>
              )}
              {emptyFieldsError && (
                <Alert severity="error">please fill all required fields</Alert>
              )} */}
              </div>
              <div className=" col-md-6 text-end">
                <div>
                  {idParam ? (
                    <>
                      <HandleDelete
                        id={idParam}
                        endPoint={"Bill/DeleteBill?id="}
                        to="/bills"
                        syncQB={syncQB}
                      />
                      <PrintButton
                        varient="mail"
                        onClick={() => {
                          navigate(
                            `/send-mail?title=${"Bill"}&mail=${""}&customer=${supplierName}&number=${
                              formData.BillNumber
                            }`
                          );
                        }}
                      ></PrintButton>
                      <PrintButton
                        varient="print"
                        onClick={() => {
                          navigate(`/bills/bill-preview?id=${idParam}`);
                        }}
                      ></PrintButton>
                      <PDFDownloadLink
                  document={<BillPdf data={{...billPreviewData , Total : totalAmount}} />}
                  fileName="Bill.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      " "
                    ) : (
                      <PrintButton varient="Download" onClick={() => {console.log("error", error)}}></PrintButton>
                    )
                  }
                </PDFDownloadLink>
                    </>
                  ) : (
                    <></>
                  )}

                  <LoaderButton
                    loading={disableButton}
                    handleSubmit={handleSubmit}
                  >
                    Save
                  </LoaderButton>

                  {/* <button
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
        )}
      </div>
    </>
  );
};

export default AddBill;

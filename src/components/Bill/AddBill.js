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

const AddBill = ({
  setshowContent,
  fetchBills,
  selectedBill,
  setSubmitSuccess,
  setselectedBill,
  fetchFilterBills,
}) => {
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
  const [formData, setFormData] = useState({
    BillDate: currentDate,
    DueDate: null,
    PurchaseOrderId: null,
  });
  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [addCustomerSuccess, setAddCustomerSuccess] = useState("");

  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSL, setSelectedSL] = useState(null);
  const [billNumber, setBillNumber] = useState(0);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const [vendorList, setVendorList] = useState([]);
  const [supplierAddress, setSupplierAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [terms, setTerms] = useState([]);

  const { PoList, fetchPo } = useFetchPo();
  const { deleteBillFile } = useDeleteFile();

  const getBill = async () => {
    if (selectedBill === 0 && idParam === 0) {
      return;
    }

    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/GetBill?id=${
          selectedBill || idParam
        }`,
        { headers }
      );
      setFormData(res.data.Data);
      setItemsList(res.data.ItemData);
      setFormData((prevData) => ({ ...prevData, BillId: selectedBill }));
      setPrevFiles(res.data.FileData);
      console.log("selected bill is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };
  useEffect(() => {
    getBill();
    console.log("selectedBill izzzz", selectedBill);
  }, [selectedBill]);

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

  const handlePoAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "PurchaseOrderId",
        value: newValue ? newValue.PurchaseOrderId : null,
      },
    };

    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (e, newValue) => {
    setSubmitClicked(false);
    setEmptyFieldsError(false);
    setDisableButton(false);
    const { name, value } = e.target;

    setSelectedCustomer(newValue);
    setSelectedSL(newValue);

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      BillId: selectedBill,
    }));
  };
  const handleChange = (e) => {
    setSubmitClicked(false);
    setEmptyFieldsError(false);
    setDisableButton(false);

    // Extract the name and value from the event target
    const { name, value } = e.target;

    // Create a new copy of formData with the updated key-value pair
    const updatedFormData = {
      ...formData,
      [name]: value,

      Amount: 0.0,
      Currency: "usd",
      BillId: selectedBill,
      Amount: totalAmount,
    };

    // Update the formData state
    setFormData(updatedFormData);
  };

  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    console.log("main payload isss", formData);
  }, [formData]);
  useEffect(() => {
    fetchVendors();
    fetchTags();
    fetchTerms();
    fetchPo();
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

  useEffect(() => {
    // Calculate the total amount and update the state
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [itemsList]);

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
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    if (!formData.SupplierId || !formData.BillDate) {
      setEmptyFieldsError(true);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      return;
    }
    setDisableButton(true);

    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const BillData = {
      ...formData,
      BillId: selectedBill || idParam,
      tblBillItems: itemsList,
      Currency: "usd",

      // CreatedBy: 2,
      // EditBy: 2,
      // isActive: true,
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

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      setDisableButton(false);

      setAddCustomerSuccess(response.data.Message);
      setTimeout(() => {
        setAddCustomerSuccess("");
        navigate(`/bills`);
      }, 4000);

      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {
      setErrorMessage(error.response.data);
      console.error("API Call Error:", error);
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
      <BillTitle billNumber={billNumber} />
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

        <div className="card">
          <div className="itemtitleBar ">
            <h4>Bill Details</h4>
          </div>
          <div className="card-body">
            {/* <div className="row mb-2 mx-1">
              <div className="col-xl-3">
                <label className="form-label">Customer</label>
                <input
                  type="text"
                  name="CustomerId"
                  value={inputValue} // Bind the input value state to the value of the input
                  onChange={handleAutocompleteChange}
                  placeholder="Customers"
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
              </div>

              <div className="col-xl-3">
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
              </div>
            </div> */}
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
                      <div className="col-md-12">
                        <div className="c-details">
                          <ul>
                            <li>
                              <span>Vendor Address</span>
                              <p>{supplierAddress}</p>
                            </li>
                            <li>
                              <span>Shipping </span>
                              <p>{supplierAddress}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="mb-3 col-md-4">
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
                        <div className="mb-3 col-md-4">
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
                        <div className="mb-3 col-md-4">
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
                        <div className="mb-3 col-md-4">
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

                        <div className="mb-3 col-md-4">
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
                        <div className="mb-3 col-md-4">
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
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="itemtitleBar">
            <h4>Items</h4>
          </div>
          <div className="card-body pt-0">
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
                    {itemsList && itemsList.length > 0 ? (
                      itemsList.map((item, index) => (
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
                              value={item.Rate}
                              style={{ width: "7em" }}
                              className="form-control form-control-sm"
                              onChange={(e) => handleRateChange(item.ItemId, e)}
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
                            value={selectedItem.ItemName} // This should be the selected item, not searchText
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
                      <textarea
                        className="form-txtarea form-control"
                        rows="3"
                        id="comment"
                        name="Memo"
                        value={formData.Memo}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12">
                  <div className="basic-form">
                    <label className="form-label">Attachments</label>

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

            <div className="col-md-4  ms-auto sub-total">
              <table className="table table-borderless table-clear">
                <tbody>
                  <tr>
                    <td className="left">
                      <strong>Subtotal</strong>
                    </td>
                    <td className="right">${totalAmount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Discount (20%)</strong>
                    </td>
                    <td className="right">$0.00</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>VAT (10%)</strong>
                    </td>
                    <td className="right">$0.00</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Total</strong>
                    </td>
                    <td className="right">
                      <strong>${totalAmount.toFixed(2)}</strong>
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
                    deleteBillFile(file.BillFileId);

                    setTimeout(() => {
                      getBill();
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

          <div className="row mb-3 mx-3">
            <div className="col-md-6">
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
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary estm-action-btn"
                      onClick={() => {
                        navigate(`/send-mail?title=${"Bill"}`);
                        // sendEmail(
                        //   `/bills/bill-preview?id=${idParam}`,
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
                        navigate(`/bills/bill-preview?id=${idParam}`);
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
                    navigate(`/bills`);
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
      </div>
    </>
  );
};

export default AddBill;

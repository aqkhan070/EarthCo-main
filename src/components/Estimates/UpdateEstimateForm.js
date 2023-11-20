import React, { useContext, useEffect, useRef, useState } from "react";
import StatusActions from "../StatusActions";
import { Form } from "react-bootstrap";
import { DataContext } from "../../context/AppData";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Print, Email, Download } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Delete, Create } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import formatDate from "../../custom/FormatDate";

const UpdateEstimateForm = ({
  headers,
  setShowContent,
  estimateId,
  setShowStatusCards,
  setSubmitsuccess,
  setUpdateSuccess,
  getEstimate,
}) => {
  const [formData, setFormData] = useState({
    EstimateNumber: "",
    IssueDate: "",
    EstimateNotes: "",
    ServiceLocationNotes: "",

    EstimateStatusId: 0,
    tblEstimateItems: [],
  });

  const inputFile = useRef(null);
  const [Files, setFiles] = useState([]);

  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSL, setSelectedSL] = useState(null);

  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token");

  const fetchEstimates = async () => {
    if (estimateId === 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${estimateId}`,
        { headers }
      );
      console.log("selected estimate is", response.data);

      setInputValue(response.data.EstimateData.CustomerId);

      // Combine EstimateItemData and EstimateCostItemData into tblEstimateItems
      const combinedItems = [
        ...response.data.EstimateItemData,
        ...response.data.EstimateCostItemData,
      ];

      setFormData((prevState) => ({
        ...prevState,
        ...response.data.EstimateData,
        tblEstimateItems: combinedItems,
        CustomerId: response.data.EstimateData.CustomerId,
      }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("API Call Error:", error);
    }
  };

  const fetchServiceLocations = async (id) => {
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

  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [staffData, setStaffData] = useState([]);

  const handleAutocompleteChange = async (e) => {
    // inputValue ? setDisableSubmit(false) : setDisableSubmit(true);
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
    setFormData({ ...formData, CustomerId: customer.UserId });

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
  const handleTagAutocompleteChange = (event, newValues) => {
    const tagString = newValues.map((tag) => tag.Tag).join(", ");

    setFormData((prevData) => ({
      ...prevData,
      Tags: tagString,
      ProfitPercentage: 0,
    }));
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
  const handleStaffAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "AssignTo",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };
  const handleRBAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "RequestedBy",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };

  const handleRMAutocompleteChange = (event, newValue) => {
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

  const handleInputChange = (e, newValue) => {
    setEmptyFieldsError(false);
    const { name, value } = e.target;

    setSelectedCustomer(newValue);
    setSelectedSL(newValue);

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId
    const adjustedValue = [
      "UserId",
      "ServiceLocationId",
      "ContactId",
      "Qty",
      "Rate",
      "EstimateStatusId",
      "RequestedBy",
    ].includes(name)
      ? Number(value)
      : value;

    setFormData((prevData) => ({ ...prevData, [name]: adjustedValue }));

    // if (name === "UserId" && value != 0) {
    //   console.log(value);
    //   fetchServiceLocations(value);
    //   fetctContacts(value);
    // }
    // console.log("opopopopopop", formData);
  };

  const handleSubmit = (e) => {
    setSubmitClicked(true);
    e.preventDefault();
    if (!formData.IssueDate || !formData.CustomerId) {
      setEmptyFieldsError(true);
      console.log("Required fields are empty");
      return;
    }
    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const mergedEstimateData = {
      ...formData,
      EstimateId: estimateId,
      // CreatedBy: 2,
      // EditBy: 2,
      // isActive: true,
    };

    console.log("mergedEstimateData:", mergedEstimateData);
    // console.log("data:", data);

    postData.append("EstimateData", JSON.stringify(mergedEstimateData));
    console.log(JSON.stringify(mergedEstimateData));
    // Appending files to postData
    Files.forEach((fileObj) => {
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
        "https://earthcoapi.yehtohoga.com/api/Estimate/AddEstimate",
        postData,
        {
          headers,
        }
      );
      getEstimate();
      setShowContent(true);
      setShowStatusCards(true);
      formData.CustomerId === 0
        ? setSubmitsuccess(true)
        : setUpdateSuccess(true);
      setTimeout(() => {
        setSubmitsuccess(false);
        setUpdateSuccess(false);
      }, 4000);

      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("API Call Error:", error);
      setErrorMessage(error.message);
      setSubmitError(true);
    }

    // Logging FormData contents (for debugging purposes)
    for (let [key, value] of postData.entries()) {
      console.log("fpayload....", key, value);
    }
    // window.location.reload();

    // console.log("post data izzz",postData);
  };

  useEffect(() => {
    fetchEstimates();
    fetchStaffList();
    fetchTags();

    setShowStatusCards(false);
  }, []);
  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    console.log("main payload isss", formData);
  }, [formData]);

  const handleStatusChange = (e) => {
    const value = parseInt(e.target.value, 10); // This converts the string to an integer

    setFormData((prevData) => ({
      ...prevData,
      EstimateStatusId: value,
    }));
  };

  const deleteItem = (index) => {
    const updatedArr = formData.tblEstimateItems.filter(
      (_, itemIndex) => itemIndex !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      tblEstimateItems: updatedArr,
    }));
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
  const [totalItemAmount, setTotalItemAmount] = useState(0);

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

  useEffect(() => {
    console.log(" testing....", formData);
  }, [formData]);

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
  const [totalACAmount, setTotalACAmount] = useState(0);

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

  useEffect(() => {
    const filteredACItems = formData.tblEstimateItems?.filter(
      (item) => item.isCost === true
    );

    const newACTotalAmount = filteredACItems?.reduce(
      (acc, item) => acc + item.Rate * item.Qty,
      0
    );
    const filteredItems = formData.tblEstimateItems?.filter(
      (item) => item.isCost === false
    );

    const newTotalAmount = filteredItems?.reduce(
      (acc, item) => acc + item.Rate * item.Qty,
      0
    );
    setTotalItemAmount(newTotalAmount);
    setTotalACAmount(newACTotalAmount);
  }, [formData.tblEstimateItems]);

  // filesss........

  const handleDeleteFile = (index) => {
    // Create a copy of the Files array without the file to be deleted
    const updatedFiles = [...Files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const addFile = () => {
    inputFile.current.click();
    // console.log("Filesss are", Files);
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // const newFile = {
      // actualFile: uploadedFile,
      // name: uploadedFile.name,
      // caption: uploadedFile.name,
      // date: new Date().toLocaleDateString(),
      // };
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };

  useEffect(() => {
    formData.CustomerId &&
    formData.ServiceLocationId &&
    formData.ContactId &&
    formData.EstimateNumber
      ? setDisableSubmit(false)
      : setDisableSubmit(true);
  }, [formData]);

  return (
    <>
      <div className="card">
        {/* <div className="row">
          <div className="col-md-3 mt-3 mx-3">
            <button type="button" className="btn btn-sm btn-outline-primary">
              <Email></Email>
            </button><button
              type="button"
              className="btn btn-sm btn-outline-primary mx-2"
            >
              <Print></Print>
            </button><button type="button" className="btn btn-sm btn-outline-primary">
              <Download></Download>
            </button>
          </div>
          
        </div> */}
        {/* mt-2 mx-3 */}
        <div className="itemtitleBar ">
                <h4>Estimate Details</h4>
              </div>

        <div className="mx-3 my-2">
          {loading ? (
            <div className="center-loader">
              <CircularProgress />
            </div>
          ) : (
            <div>
              
              <div>
                <div className="row ">
                  <div className="col-md-3">
                    <label className="form-label">
                      Customer <span className="text-danger">*</span>
                    </label>
                    <TextField
                      type="text"
                      name="CustomerId"
                      value={inputValue}
                      onChange={handleAutocompleteChange}
                      placeholder="Customers"
                      variant="outlined"
                      size="small"
                      error={submitClicked && !formData.CustomerId}
                      // helperText={submitClicked && !formData.CustomerId ? 'Customer is required' : ''}
                      required
                      fullWidth
                    />
                    {showCustomersList && customersList && (
                      <ul
                        style={{ top: "11.5em" }}
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
                  <div className="col-md-3 ">
                    <label className="form-label">Estimate No.</label>
                    <TextField
                      value={formData.EstimateNumber}
                      name="EstimateNumber"
                      onChange={handleInputChange}
                      type="text"
                      variant="outlined"
                      placeholder="Estimate No"
                      size="small"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Tags</label>
                    <Autocomplete
                      id="inputState19"
                      size="small"
                      multiple
                      options={tags}
                      getOptionLabel={(option) => option.Tag || ""}
                      value={tags?.filter((tag) =>
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
                  <div className=" col-md-3">
                    <label className="form-label">
                      Date<span className="text-danger">*</span>
                    </label>
                    <TextField
                      value={formatDate(formData.IssueDate)}
                      name="IssueDate"
                      onChange={handleInputChange}
                      className="input-limit-datepicker"
                      type="date"
                      variant="outlined"
                      size="small"
                      error={submitClicked && !formData.IssueDate}
                      // helperText={
                      //   submitClicked && !formData.CustomerId
                      //     ? "Issue Date is required"
                      //     : ""
                      // }
                      required
                      fullWidth
                    />
                  </div>
                </div>
                <div className="row mt-2 mb-3">
                  <div className="col-md-3 ">
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
                  <div className="col-md-3 ">
                    <label className="form-label">Regional Manager</label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={staffData}
                      getOptionLabel={(option) => option.FirstName || ""}
                      value={
                        staffData.find(
                          (staff) => staff.UserId === formData.RegionalManagerId
                        ) || null
                      }
                      onChange={handleRMAutocompleteChange}
                      isOptionEqualToValue={(option, value) =>
                        option.UserId === value.RegionalManagerId
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
                  <div className="col-md-3 ">
                    <label className="form-label">Linked Invoice</label>
                    <TextField
                      disabled
                      name="EstimateNumber"
                      type="text"
                      variant="outlined"
                      placeholder="Linked Invoice"
                      size="small"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-3 mt-2">
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
                  <div className="col-md-3 mt-2">
                    <label className="form-label">Status</label>
                    <Select
                      aria-label="Default select example"
                      variant="outlined"
                      value={formData.EstimateStatusId}
                      onChange={handleStatusChange}
                      name="Status"
                      size="small"
                      id="inlineFormCustomSelect"
                      placeholder="Select Status"
                      fullWidth
                    >
                      <MenuItem value={null}>Select Status</MenuItem>
                      <MenuItem value={1}>Accepted</MenuItem>
                      <MenuItem value={2}>Closed</MenuItem>
                      <MenuItem value={3}>Converted</MenuItem>
                      <MenuItem value={4}>Pending</MenuItem>
                      <MenuItem value={5}>Rejected</MenuItem>
                    </Select>
                  </div>
                  <div className="col-md-3 mt-2">
                    <label className="form-label">Requested by</label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={staffData}
                      getOptionLabel={(option) => option.FirstName || ""}
                      value={
                        staffData.find(
                          (staff) => staff.UserId === formData.RequestedBy
                        ) || null
                      }
                      onChange={handleRBAutocompleteChange}
                      isOptionEqualToValue={(option, value) =>
                        option.UserId === value.RequestedBy
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
                  <div className="col-md-3 mt-2 ">
                    <label className="form-label">Linked Bill</label>
                    <TextField
                      disabled
                      name="EstimateNumber"
                      type="text"
                      variant="outlined"
                      placeholder="Linked Bill"
                      size="small"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-3 mt-2 ">
                    <label className="form-label">
                      Linked To purchase order
                    </label>
                    <TextField
                      disabled
                      name="EstimateNumber"
                      type="text"
                      variant="outlined"
                      placeholder="546234"
                      size="small"
                      fullWidth
                    />
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
                            {formData.tblEstimateItems &&
                            formData.tblEstimateItems.length > 0 ? (
                              formData.tblEstimateItems
                                .filter((item) => item.isCost === false) // Filter items with isCost equal to 1
                                .map((item, index) => (
                                  <tr key={item.ItemId}>
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
                                            deleteItem(index);
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
                            )}
                            <tr>
                              <td>
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
                                  {selectedItem?.SalePrice ||
                                    itemInput.Rate ||
                                    " "}
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
                                  name="tax"
                                  style={{ width: "7em" }}
                                  disabled
                                  className="form-control form-control-sm"
                                  placeholder="tax"
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
                                    // setTblSRItems([...tblSRItems, itemInput]);
                                    setFormData((prevData) => ({
                                      ...prevData,
                                      tblEstimateItems: [
                                        ...prevData.tblEstimateItems,
                                        itemInput,
                                      ],
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
                                  }}
                                  // disabled={itemBtnDisable}
                                >
                                  Add.
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="card-body p-0">
                    <div className="estDataBox">
                      <div className="itemtitleBar">
                        <h4>Additional Costs</h4>
                      </div>
                      <div className="table-responsive active-projects style-1 mt-2">
                        <table id="empoloyees-tblwrapper" className="table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Rate</th>
                              <th>Qty / Duration</th>
                              <th>Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.tblEstimateItems &&
                            formData.tblEstimateItems.length > 0 ? (
                              formData.tblEstimateItems
                                .filter((item) => item.isCost === true) // Filter items with isCost equal to 1
                                .map((item, index) => (
                                  <tr key={item.ItemId}>
                                    <td>{item.Name}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.Rate}</td>
                                    <td>{item.Qty}</td>
                                    <td>{item.Rate * item.Qty}</td>
                                    <td>
                                      <div className="badgeBox">
                                        <span
                                          className="actionBadge badge-danger light border-0 badgebox-size"
                                          onClick={() => {
                                            deleteItem(index); // Replace 'index' with the actual index of the item
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
                            )}
                            <tr>
                              <td>
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
                                        fullWidth
                                      />
                                    )}
                                    renderOption={(props, item) => (
                                      <li
                                        style={{ cursor: "pointer" }}
                                        {...props}
                                        onClick={() => handleACItemClick(item)}
                                      >
                                        {item.ItemName}
                                      </li>
                                    )}
                                  />
                                </>
                              </td>
                              <td>
                                <p>{selectedACItem?.SaleDescription || " "}</p>
                              </td>
                              <td>
                                <div className="col-sm-9">
                                  {selectedACItem?.PurchasePrice ||
                                    aCInput.Rate ||
                                    " "}
                                </div>
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
                                  style={{ width: "7em" }}
                                  className="form-control form-control-sm"
                                  placeholder="Quantity"
                                />
                              </td>
                              <td>
                                <h5 style={{ margin: "0" }}>
                                  {aCInput.Rate * aCInput.Qty}
                                </h5>
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => {
                                    // setTblSRItems([...tblSRItems, itemInput]);
                                    setFormData((prevData) => ({
                                      ...prevData,
                                      tblEstimateItems: [
                                        ...prevData.tblEstimateItems,
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
                                    console.log("new items aree", formData);
                                  }}
                                  // disabled={itemBtnDisable}
                                >
                                  Add.
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Files */}
                <div className="">
                  <div className="card-body p-0">
                    <div className="estDataBox">
                      <div className="itemtitleBar">
                        <h4>Files</h4>
                      </div>
                      <div>
                        {/* <thead>
                          <tr>
                            <th>#</th>
                            <th>Preview</th>
                            <th>File Name</th>
        
        
                            <th>Action</th>
                          </tr>
                        </thead> */}
                        <div className="row">
                          <div className="col-md-2">
                            <button
                              className="btn btn-primary btn-sm"
                              style={{ margin: "12px 20px" }}
                              onClick={addFile}
                            >
                              + Add File
                            </button>
                            <input
                              type="file"
                              name="Files"
                              ref={inputFile}
                              onChange={trackFile}
                              style={{ display: "none" }}
                            />
                          </div>
                          {Files.map((file, index) => (
                            <div
                              key={index}
                              className="col-md-2 col-md-2 mt-3 image-container"
                              style={{
                                backgroundImage: `url(${URL.createObjectURL(
                                  file
                                )})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "150px", // Set the desired width
                                height: "120px", // Set the desired height
                                margin: "1em",
                                position: "relative",
                              }}
                            >
                              <p
                                className="file-name-overlay"
                                style={{
                                  position: "absolute",
                                  bottom: "0",
                                  left: "0",
                                  right: "0",
                                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                                  textAlign: "center",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  padding: "5px",
                                }}
                              >
                                {file.name}
                              </p>
                              <span
                                className="file-delete-button"
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
                    </div>
                  </div>
                </div>
                <div className="estNotesBox">
                  <div className="row mt-5">
                    <div className="col-md-5">
                      <div className="row">
                        <div className="col-md-12 col-lg-12">
                          <div className="basic-form">
                            <form>
                              {/* <h4 className="card-title">Estimate Notes</h4> */}
                              <label className="form-label">
                                Estimate Notes
                              </label>
                              <div className="mb-3">
                                <textarea
                                  placeholder=" EstimateNotes"
                                  value={formData.EstimateNotes}
                                  name="EstimateNotes"
                                  onChange={handleInputChange}
                                  className="form-txtarea form-control form-control-sm"
                                  rows="6"
                                ></textarea>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12">
                          <div className="basic-form">
                            <form>
                              {/* <h4 className="card-title">Service Location Notes</h4> */}
                              <label className="form-label">
                                Service Location Notes
                              </label>
                              <div className="mb-3">
                                <textarea
                                  placeholder="Service Location Notes"
                                  value={formData.ServiceLocationNotes}
                                  name="ServiceLocationNotes"
                                  onChange={handleInputChange}
                                  className="form-txtarea form-control form-control-sm"
                                  rows="6"
                                ></textarea>
                              </div>
                            </form>
                          </div>
                        </div>
                        {/*<div className="col-md-12 col-lg-12">
                        <div className="basic-form">
                          <form>
                             <h4 className="card-title">Private Notes</h4>
                            <label className="form-label">Private Notes</label>
                            <div className="mb-3">
                              <textarea
                                placeholder= "PrivateNotes"
                                value={formData.PrivateNotes}
                                name="PrivateNotes"
                                onChange={handleInputChange}
                                className="form-txtarea form-control form-control-sm"
                                rows="2"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div> */}
                      </div>
                    </div>
                    <div className="col-md-5">
                      <table className="table table-clear custom-table custom-table-row">
                        <tbody>
                          <tr>
                            <td className="left">
                              <strong>Subtotal</strong>
                            </td>
                            <td className="right text-right">
                              ${totalItemAmount}
                            </td>
                          </tr>
                          <tr>
                            <td className="left custom-table-row">
                              <label className="form-label">Taxes</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm "
                                  name="Taxes"
                                  placeholder="Taxes"
                                />
                              </div>
                            </td>
                            <td className="right text-right">$00</td>
                          </tr>
                          <tr>
                            <td className="left custom-table-row">
                              <label className="form-label">Discount(%)</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  name="Discount"
                                  placeholder="Discount"
                                />
                              </div>
                            </td>
                            <td className="right text-right">$00</td>
                          </tr>
                          <tr>
                            <td className="left custom-table-row">
                              <label className="form-label">Shipping</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  name="Shipping"
                                  placeholder="Shipping"
                                />
                              </div>
                            </td>
                            <td className="right text-right">$00</td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>Total</strong>
                            </td>
                            <td className="right text-right">
                              <strong>${totalItemAmount}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="left">Payment/Credit</td>
                            <td className="right text-right">$00</td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>Balance due</strong>
                            </td>
                            <td className="right text-right">
                              <strong>$00</strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="left">Total Expenses</td>
                            <td className="right text-right">$00</td>
                          </tr>
                          <tr>
                            <td className="left">Total Profit(%)</td>
                            <td className="right text-right">$00</td>
                          </tr>
                          <tr>
                            <td className="left">Profit Margin(%)</td>
                            <td className="right text-right">$00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="mb-2 row text-end">
                  <div className="col-md-8">
                    {submitError && (
                      <Alert severity="error">
                        {errorMessage ? errorMessage : "Error Adding Estimates"}
                      </Alert>
                    )}
                    {emptyFieldsError && (
                      <Alert severity="error">
                        Please fill all required fields
                      </Alert>
                    )}
                  </div>
                  <div className="col-md-2 flex-right ">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary estm-action-btn"
                    >
                      <Email />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary estm-action-btn"
                    >
                      <Print></Print>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary estm-action-btn"
                      // style={{ minWidth: "120px" }}
                    >
                      <Download />
                    </button>
                  </div>
                  <div className="col-md-2 flex-right">
                    <button
                      type="submit"
                      className="btn btn-primary me-1"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <NavLink to="/Dashboard/Estimates">
                      <button
                        className="btn btn-danger light ms-1"
                        onClick={() => {
                          setShowContent(true);
                          setShowStatusCards(true);
                        }}
                      >
                        Cancel
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateEstimateForm;

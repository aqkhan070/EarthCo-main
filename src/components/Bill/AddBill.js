import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Cookies from "js-cookie";
import BillTitle from "./BillTitle";
import formatDate from "../../custom/FormatDate";
import Alert from "@mui/material/Alert";
import useFetchPo from "../Hooks/useFetchPo";



const AddBill = ({ setshowContent, fetchBills, selectedBill, setSubmitSuccess }) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [formData, setFormData] = useState({});
  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSL, setSelectedSL] = useState(null);
  const [billNumber, setBillNumber] = useState(0);

  const [vendorList, setVendorList] = useState([]);
  const [supplierAddress, setSupplierAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [terms, setTerms] = useState([]);

  const { PoList, fetchPo } = useFetchPo();


  const getBill = async () => {
    try {
      const res = await axios.get( `https://earthcoapi.yehtohoga.com/api/Bill/GetBill?id=${selectedBill}`,{headers})
      setFormData(res.data.Data)
      setItemsList(res.data.ItemData)
      setFormData((prevData) => ({ ...prevData, BillId: selectedBill }));
      console.log("selected bill is",res.data)
    } catch (error) {
      console.log("api call error", error)
    }
  };
  useEffect(() => {
    
    getBill()
    console.log("selectedBill izzzz", selectedBill )
  },[selectedBill])

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
        value: newValue ? newValue.PurchaseOrderId : "",
      },
    };

    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (e, newValue) => {
    setSubmitClicked(false)
    setEmptyFieldsError(false)
    const { name, value } = e.target;

    setSelectedCustomer(newValue);
    setSelectedSL(newValue);

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId

    setFormData((prevData) => ({ ...prevData, [name]: value, BillId: selectedBill, }));
  };
  const handleChange = (e) => {
    setSubmitClicked(false)
    setEmptyFieldsError(false)

    // Extract the name and value from the event target
    const { name, value } = e.target;

    // Create a new copy of formData with the updated key-value pair
    const updatedFormData = {
      ...formData,
      [name]: value,
      PurchaseOrderId: 1,
      Amount: 0.0,
      Currency: "usd",
      BillId: selectedBill,
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

  // files

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

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    if (!formData.SupplierId ||!formData.BillNumber ) {
      setEmptyFieldsError(true)
      return
    }

    
    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const BillData = {
      ...formData,
      BillId: selectedBill,
      tblBillItems: itemsList,

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
      fetchBills();
      setshowContent(true);
      setSubmitSuccess(response.data.Message)
      setTimeout(() => {
      setSubmitSuccess("")
        
      }, 4000);

      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {
      
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
      <BillTitle billNumber={billNumber} />

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

        <div className="card"><div className="itemtitleBar ">
              <h4>Bill Details</h4>
            </div>
          <div className="">
          {errorMessage && (
                    <Alert severity="error">
                      {errorMessage? errorMessage: "Error Submitting Bill Data"}
                    </Alert>
                  )}
            
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
                        <label className="form-label">Vendor<span className="text-danger">*</span></label>
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
                          <label className="form-label">Bill # <span className="text-danger">*</span></label>
                          <div className="input-group mb-2">
                            <TextField
                              type="text"
                              name="BillNumber"
                              value={formData.BillNumber}
                              onChange={handleChange}
                              size="small"
                              error={submitClicked && !formData.BillNumber}
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
                          <label className="form-label">Date</label>
                          <div className="input-group mb-2">
                            <input
                              type="date"
                              className="form-control"
                              name="BillDate"
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
                          <label className="form-label">Purchase Order</label>
                          <Autocomplete                      
                      size="small"
                      options={PoList}
                      getOptionLabel={(option) => option.PurchaseOrderNumber || ""}
                      value={
                        PoList.find(
                          (po) => po.PurchaseOrderId === formData.PurchaseOrderId
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
              <div className="card-body row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12">
                      <div className="basic-form">
                        <form>
                          <h4 className="card-title">Memo</h4>
                          <div className="mb-3">
                            <textarea
                              className="form-txtarea form-control"
                              rows="2"
                              id="comment"
                              name="Memo"
                              value={formData.Memo}
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
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Subtotal</strong>
                        </td>
                        <td className="right">${totalAmount}</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Discount (20%)</strong>
                        </td>
                        <td className="right">$00</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>VAT (10%)</strong>
                        </td>
                        <td className="right">$00</td>
                      </tr>
                      <tr>
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
              </div>
              <div className="row mb-3 mx-3">
                <div className="col-md-9">
                  {
                    emptyFieldsError && <Alert severity="error">
                  please fill all required fields
                  </Alert>
                  }
                </div>
<div className=" col-md-3 text-end">
              <div>
                <a
                  href="#"
                  className="btn btn-primary light me-1 px-3"
                  data-bs-toggle="modal"
                >
                  <i className="fa fa-print m-0"></i>{" "}
                </a>
                <a
                  href="#"
                  className="btn btn-primary light me-1 px-3"
                  data-bs-toggle="modal"
                >
                  <i className="fa fa-envelope m-0"></i>{" "}
                </a>
                <a href="#">
                  <button type="button" className="btn btn-primary me-1" onClick={handleSubmit}>
                    Save
                  </button>
                </a>
                <a>
                  {" "}
                  <button
                    className="btn btn-danger light ms-1"
                    onClick={() => {
                      setshowContent(true);
                    }}
                  >
                    Cancel
                  </button>
                </a>
              </div>
            </div>
              </div>
            
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AddBill;

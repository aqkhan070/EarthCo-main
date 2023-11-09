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

const UpdateEstimateForm = ({
  setShowContent,
  estimateId,
  setShowStatusCards,
}) => {
  const [estimates, setEstimates] = useState({});

  const [formData, setFormData] = useState({
    CustomerId: 0,
    ServiceLocation: "",
    Email: "",
    EstimateNumber: "",
    IssueDate: "",
    EstimateNotes: "",
    ServiceLocationNotes: "",
    PrivateNotes: "",
    QBStatus: "",
    EstimateStatusId: 0,
    tblEstimateItems: [],
  });

  const inputFile = useRef(null);
  const [Files, setFiles] = useState([]);

  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSL, setSelectedSL] = useState(null);

  const token = Cookies.get("token");

  const fetchEstimates = async () => {
    if (estimateId === 0) {
      return;
    }
    const response = await axios.get(
      `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${estimateId}`
    );
    try {
      setEstimates(response.data);

      setFormData((prevState) => ({
        ...prevState,
        CustomerId: response.data.CustomerId,
        ...response.data,
      }));

      if (response.data.tblEstimateItems) {
        setFormData((prevState) => ({
          ...prevState,
          CustomerId: response.data.CustomerId,
          tblEstimateItems: response.data.tblEstimateItems,
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          CustomerId: response.data.CustomerId,
          tblEstimateItems: [],
        }));
      }

      console.log("estimateeeeeee list is", response.data.tblEstimateItems);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

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
  };

  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleAutocompleteChange = async (e) => {
    inputValue ? setDisableSubmit(false) : setDisableSubmit(true);
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

  const handleInputChange = (e, newValue) => {
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

  const handleSubmit = () => {
    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const mergedEstimateData = {
      ...formData,
      EstimateId: estimateId,
      CreatedBy: 2,
      EditBy: 2,
      isActive: true,
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

      if (response.status === 200) {
        console.log("Data submitted successfully:", response.data);
      } else {
        console.log("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("API Call Error:", error);
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

  const deleteItem = (id) => {
    const updatedArr = formData.tblEstimateItems.filter(
      (object) => object.id !== id
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

  // useEffect(() => {
  // console.log("Updated formData is:", formData);
  // }, [formData]);

  return (
    <div className="">
      <div className="">
        <div className="row">
          <div className="col-xl-3 mt-2">
            <label className="form-label">Status</label>
            <Form.Select
              aria-label="Default select example"
              className=" form-control-sm bg-white"
              value={formData.EstimateStatusId}
              onChange={handleStatusChange}
              name="Status"
              size="md"
              id="inlineFormCustomSelect"
            >
              <option value={null}>Select</option>
              <option value={1}>Accepted</option>
              <option value={2}>Closed</option>
              <option value={3}>Converted</option>
              <option value={4}>Pending</option>
              <option value={5}>Rejected</option>
             
            </Form.Select>
          </div>
          <div className="col-xl-3 mt-2">
            <label className="form-label">Tags</label>
            <Form.Select
              aria-label="Default select example"
              className=" form-control-sm bg-white"
              // value={formData.EstimateStatusId}
              // onChange={handleStatusChange}
              name="Tags"
              size="md"
              
            >
              <option value={null}>Select</option>
              <option value={1}>Needs PO</option>
              <option value={2}>Pending Approval</option>
              <option value={3}>Ready to Invoice</option>

              {/* <option value={1}>Open</option>
              <option value={2}>Approved</option>
              <option value={3}>Closed Billed</option> */}
            </Form.Select>
          </div>
          <div className="col-xl-4">
            <div
              className="col-lg-4 col-md-12 mb-2"
              style={{ minWidth: "150px" }}
            ></div>
            <div style={{ marginTop: "2.9em" }} className="col-lg-8 col-md-12 ">
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
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-xl-4">
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
              <ul className="estm-search-results-container">
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

          <div className="col-xl-4">
            <label className="form-label">Service location</label>
            <Autocomplete
              id="inputState19"
              size="small"
              options={sLList}
              getOptionLabel={(option) => option.Name || ""}
              value={
                sLList.find(
                  (customer) =>
                    customer.ServiceLocationId === formData.ServiceLocationId
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
          <div className="col-xl-4">
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
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-xl-3">
            <label className="form-label">Email</label>
            <input
              value={formData.Email}
              name="Email"
              onChange={handleInputChange}
              type="text"
              className="form-control form-control-sm"
              placeholder={estimates.Email || "Email"}
            />
          </div>
          <div className="col-xl-3">
            <label className="form-label">Estimate No.</label>
            <input
              value={formData.EstimateNumber}
              name="EstimateNumber"
              onChange={handleInputChange}
              type="text"
              className="form-control form-control-sm"
              placeholder={estimates.EstimateNumber || "Estimate Number"}
            />
          </div>
          <div className=" col-xl-3">
            <label className="form-label">Issued Date</label>
            <input
              value={formData.IssueDate}
              name="IssueDate"
              onChange={handleInputChange}
              className="form-control form-control-sm input-limit-datepicker"
              placeholder={estimates.IssueDate || "Issue Date"}
              type="date"
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
                    {
                      formData.tblEstimateItems &&
                      formData.tblEstimateItems.length > 0 ? (
                        formData.tblEstimateItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.Rate}</td>
                            <td>{item.Qty}</td>
                            <td></td>
                            <td>{item.Rate * item.Qty}</td>
                            <td>
                              <div className="badgeBox">
                                <span
                                  className="actionBadge badge-danger light border-0 badgebox-size"
                                  onClick={() => {
                                    deleteItem(item.id);
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
                        <tr>
                          <td colSpan="8">No items available</td>
                        </tr>
                      ) /* Add a null check or alternative content if formData.tblEstimateItems is empty */
                    }

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
                            <ul className="estm-items-search-results-container">
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
                          rows="1"
                          disabled
                        ></textarea>
                      </td>

                      <td>
                        <div className="col-sm-9">
                          <input
                            name="Rate"
                            value={
                              selectedItem?.SalePrice || itemInput.Rate || " "
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
        {/* Files */}

        <div className="">
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
                + Add File
              </button>
              <input
                type="file"
                name="Files"
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
                      <th>Caption</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Files.map((file, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{file.name}</td>
                        <td>{file.caption}</td>
                        <td>{file.date}</td>
                        <td>
                          <div className="badgeBox">
                            <span
                              className="actionBadge badge-danger light border-0 badgebox-size"
                              onClick={() => {
                                handleDeleteFile(index);
                              }}
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

        <div className="estNotesBox">
          <div className="row">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="basic-form">
                    <form>
                      {/* <h4 className="card-title">Estimate Notes</h4> */}
                      <label className="form-label">Estimate Notes</label>
                      <div className="mb-3">
                        <textarea
                          placeholder={estimates.EstimateNotes || ""}
                          value={formData.EstimateNotes}
                          name="EstimateNotes"
                          onChange={handleInputChange}
                          className="form-txtarea form-control form-control-sm"
                          rows="2"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12">
                  <div className="basic-form">
                    <form>
                      {/* <h4 className="card-title">Service Location Notes</h4> */}
                      <label className="form-label">
                        Service Location Notes
                      </label>
                      <div className="mb-3">
                        <textarea
                          placeholder={estimates.ServiceLocationNotes || ""}
                          value={formData.ServiceLocationNotes}
                          name="ServiceLocationNotes"
                          onChange={handleInputChange}
                          className="form-txtarea form-control form-control-sm"
                          rows="2"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12">
                  <div className="basic-form">
                    <form>
                      {/* <h4 className="card-title">Private Notes</h4> */}
                      <label className="form-label">Private Notes</label>
                      <div className="mb-3">
                        <textarea
                          placeholder={estimates.PrivateNotes || ""}
                          value={formData.PrivateNotes}
                          name="PrivateNotes"
                          onChange={handleInputChange}
                          className="form-txtarea form-control form-control-sm"
                          rows="2"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card" style={{ marginTop: "15px" }}>
                <div className="card-body">
                  <div className="sutotalBox">
                    <div className="basic-form">
                      <form>
                        <Form.Select
                          value={formData.QBStatus}
                          name="QBStatus"
                          onChange={handleInputChange}
                          aria-label="Default select example"
                          id="inputState"
                          className="bg-white"
                        >
                          <option value={null}>select</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </Form.Select>
                      </form>
                    </div>
                    <div className="dataBox">
                      <div className="dataRow">
                        <h5>Subtotal:</h5>
                        <p>10.00$</p>
                      </div>
                      <div className="dataRow">
                        <h5>Tax:</h5>
                        <p>0.00$</p>
                      </div>
                      <div className="dataRow">
                        <h5>Total:</h5>
                        <p>10.00$</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-2 row text-end">
          <div className="flex-right">
            <button
              type="button"
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
  );
};

export default UpdateEstimateForm;

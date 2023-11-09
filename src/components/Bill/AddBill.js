import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Form } from "react-bootstrap";
import axios from "axios";

const AddBill = ({ setshowContent }) => {

  const [formData, setFormData] = useState({});
  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSL, setSelectedSL] = useState(null);

  const handleAutocompleteChange = async (e) => {
    // inputValue ? setDisableSubmit(false) : setDisableSubmit(true);
    setInputValue(e.target.value);
    if(!e.target.value){
      return
    }
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

  const fetchServiceLocations = async (id) => {
    if(!id){
      return
    }
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
    if(!id){
      return
    }
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
    

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    
  };

  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    console.log("main payload isss", formData);
  }, [formData]);


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
                d="M6.64111 13.5497L9.38482 9.9837L12.5145 12.4421L15.1995 8.97684"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <ellipse
                cx="18.3291"
                cy="3.85021"
                rx="1.76201"
                ry="1.76201"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.6808 2.86012H7.01867C4.25818 2.86012 2.54651 4.81512 2.54651 7.57561V14.9845C2.54651 17.7449 4.22462 19.6915 7.01867 19.6915H14.9058C17.6663 19.6915 19.3779 17.7449 19.3779 14.9845V8.53213"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <li>
            <h5 className="bc-title">Bill # 1001</h5>
          </li>
        </ol>
      </div>

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
          <div className="card-body">
          <div className="row mb-2 mx-1">
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
              <ul style={{top: "83px" }} className="search-results-container">
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
          
        </div>
            <div className="row">
              <div className="basic-form ">
                <form>
                  <div className="row">
                    <div className="mb-3 col-md-3">
                      <div className="col-md-12">
                        <label className="form-label">Vendor</label>
                        <select
                          id="inputState"
                          className="default-select form-control wide"
                        >
                          <option defaultValue>Crest DeVille</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <div className="c-details">
                          <ul>
                            <li>
                              <span>Vendor Address</span>
                              <p>1225 E.Wakeham</p>
                              <p>Santa Ana, CA 92705</p>
                              <p>USA</p>
                            </li>
                            <li>
                              <span>Sipping </span>
                              <p>1225 E.Wakeham</p>
                              <p>Santa Ana, CA 92705</p>
                              <p>USA</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Bill #</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">#</div>{" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Leave blank to auto complete"
                            />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Tags</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Date</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">
                              <i className="fa fa-calendar "></i>
                            </div>
                            <input type="date" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Due</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">
                              <i className="fa fa-calendar "></i>
                            </div>
                            <input type="date" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Purchase Order</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">#</div>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Terms</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="modal fade" id="basicModal">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Item</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="basic-form">
                      <form>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Name
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Quantity
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Quantity"
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Description
                          </label>
                          <div className="col-sm-9">
                            <textarea
                              className="form-txtarea form-control"
                              rows="3"
                              id="comment"
                            ></textarea>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Rate
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Rate"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <label className="col-sm-3 col-form-label">
                            Item Total
                          </label>
                          <div className="col-sm-9">
                            <h5>$100.00</h5>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger btn-md light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary btn-md">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Items</h4>
                  </div>
                  <a
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                    style={{ margin: "12px 20px" }}
                  >
                    + Add Items
                  </a>
                  <div className="table-responsive active-projects style-1">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th>Qty / Duration</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Approved</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Liam Antony</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-success light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Noah Oliver</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-danger light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Elijah James</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-success light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Liam Antony</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-success light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
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
                                <input name="file" type="file" multiple="" />
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
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total</strong>
                        </td>
                        <td className="right">
                          <strong>$7.477,36</strong>
                          <br />
                          <strong>0.15050000 BTC</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mb-2 row text-end">
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
                  <button type="button" className="btn btn-primary me-1">
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
    </>
  );
};

export default AddBill;

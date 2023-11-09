import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Form } from "react-bootstrap";
import axios from "axios";

import { NavLink } from "react-router-dom";

const IrrigationForm = () => {

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


  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };



  return (
    <>
      <div className="card-body">
        <div className="card">
          <div className="card-body p-0">
            <div className="itemtitleBar">
              <h4>General Information</h4>
            </div>
            <div className="card-body" >
              <div className="">
                <form>
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
              <ul style={{top: "11.0em" }} className="search-results-container">
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
          
        <div className="col-xl-3 ">
                      <div className="col-md-12">
                      <label className="form-label">Created</label>
                      </div>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        placeholder="Created"
                      />
                    </div>
        </div>


                  
                </form>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-primary mb-3" onClick={toggleShowForm}>
          Add Controller Info
        </button>

        {showForm && (
          <div className="card">
            <div className="card-body p-0">
              <div className="itemtitleBar">
                <h4>Controller Info</h4>
              </div>
              <div className="card-body" style={{ padding: "1.5rem 4rem" }}>
                <div className="basic-form">
                  <form>
                    <div
                      className="row mb-3"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Controller Make and Model</h5>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Customer Name"
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Photo of Controller</h5>
                        </div>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Created"
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Serial Number</h5>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Serial Number"
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Controller Location Closest Adress</h5>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Controller Location Closest Adress"
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Satellite Based</h5>
                        </div>
                        <div className="col-md-12 yesNoBtns">
                          <button
                            type="button"
                            className="btn light btn-dark col-md-6 YNbtn1"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className="btn light btn-dark col-md-6 YNbtn2"
                          >
                            No
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Type of Water</h5>
                        </div>
                        <div className="col-md-12 yesNoBtns">
                          <button
                            type="button"
                            className="btn light btn-dark col-md-6 YNbtn1"
                          >
                            Portable
                          </button>
                          <button
                            type="button"
                            className="btn light btn-dark col-md-6 YNbtn2"
                          >
                            Reclaimed
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Meter Number</h5>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Meter Size</h5>
                        </div>
                        <div className="col-md-12 yesNoBtns">
                          <button
                            type="button"
                            className="btn light btn-dark col-md-2 YNbtn1"
                          >
                            1/2
                          </button>
                          <button
                            type="button"
                            className="btn light btn-dark col-md-3 YNbtnMid borderRight"
                          >
                            3/4 "
                          </button>
                          <button
                            type="button"
                            className="btn light btn-dark col-md-2 YNbtnMid borderRight"
                          >
                            1 "
                          </button>
                          <button
                            type="button"
                            className="btn light btn-dark col-md-3 YNbtnMid borderRight"
                          >
                            11/2 "
                          </button>
                          <button
                            type="button"
                            className="btn light btn-dark col-md-2 YNbtn2"
                          >
                            2 "
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Number of Stations</h5>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Number of Valves</h5>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Number of Broken Main Lines</h5>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Type of Valves</h5>
                        </div>
                        <div className="col-md-12 yesNoBtns">
                          <button
                            type="button"
                            className="btn light btn-dark col-md-4 YNbtn1"
                          >
                            Plastic
                          </button>
                          <button
                            type="button"
                            className="btn light btn-dark col-md-4 YNbtnMid borderRight"
                          >
                            Brass
                          </button>
                          <button
                            type="button"
                            className="btn light btn-dark col-md-4 YNbtn2"
                          >
                            Mixed
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Leaking Valves</h5>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Malfunctioning Valves</h5>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Number of Broken Lateral Lines</h5>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Number of Broken Heads</h5>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Repairs Made</h5>
                        </div>
                        <div className="col-md-12">
                          <textarea
                            className="form-txtarea form-control"
                            rows="4"
                            id="comment"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Upgrades Made</h5>
                        </div>
                        <div className="col-md-12">
                          <textarea
                            className="form-txtarea form-control"
                            rows="4"
                            id="comment"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-sm-5 mx-2 mb-3">
                        <div className="col-md-12">
                          <h5>Photo</h5>
                        </div>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Capture Photo"
                        />
                      </div>
                      <div className="col-sm-5 mx-2 mb-3"></div>
                    </div>
                    <div className="row text-end">
                      <div>
                        <button type="button" className="btn btn-warning me-1">
                          Add
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger light ms-1"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive active-projects style-1">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Controller </th>
                      <th>Meter Info </th>
                      <th>Valve </th>
                      <th>Repairs / Upgrades</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div className="products">
                          <div>
                            <h6>Promenade</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span>Master Valve</span>
                      </td>
                      <td>
                        <span>Evolution DX2</span>
                      </td>
                      <td>Made repairs to the system.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-xl-12 text-right">
                <div>
                  <NavLink to="/Dashboard/Irrigation">
                    <button type="button" className="btn btn-primary me-1">
                      Submit
                    </button>
                  </NavLink>
                  <NavLink to="/Dashboard/Irrigation">
                    <button className="btn btn-danger light ms-1">
                      Cancel
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IrrigationForm;

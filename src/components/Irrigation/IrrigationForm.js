import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import ControllerTable from "./ControllerTable";
import { NavLink } from "react-router-dom";
import IrrigationControler from "./IrrigationControler";
import Alert from '@mui/material/Alert';
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import useCustomerSearch from "../Hooks/useCustomerSearch";

const IrrigationForm = ({ getIrrigationList, setShowContent, selectedIrr, setSelectedIrr, setSuccessres }) => {
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

  const [submitClicked, setSubmitClicked] = useState(false)
  const { name, fetchName } = useFetchCustomerName();
  const { customerSearch, fetchCustomers } = useCustomerSearch();

  const handleCustomerAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    setErrorMessage("")
    const simulatedEvent = {
      target: {
        name: "CustomerId",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };



  const fetchServiceLocations = async (id) => {
    if (!id) {
      return;
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
    if (!id) {
      return;
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
    setErrorMessage("")
    const { name, value } = e.target;

    setSelectedCustomer(newValue);
    setSelectedSL(newValue);

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    fetchName(formData.CustomerId);
    console.log("main payload isss", formData);
  }, [formData.CustomerId]);

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async () => {
    setSubmitClicked(true)
    if (!formData.CustomerId ) {
      setErrorMessage("please fill all required Fields")
      return
    }
    try {
      const res = await axios.post(
        `https://earthcoapi.yehtohoga.com/api/Irrigation/AddIrrigation`,
        formData,
        { headers }
      );
      getIrrigationList()
      setShowContent(true)
      setSuccessres(res.data.Message)
      setTimeout(() => {
      setSuccessres("")
        
      }, 4000);
      console.log("data submitted successfuly", res.data);
    } catch (error) {
      console.log("error submitting data", error);
    }
  };

  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const [controllerList, setControllerList] = useState([])

  const fetchIrrigation = async () => {
    if (selectedIrr === 0) {
      return
    }
    try {
      const res = await axios.get(`https://earthcoapi.yehtohoga.com/api/Irrigation/GetIrrigation?id=${selectedIrr}`,{headers});
      console.log("selected irrigation is", res.data);
      setFormData(res.data.IrrigationData)
      setControllerList(res.data.ControllerData)
      setInputValue(res.data.IrrigationData.CustomerId)
    } catch (error) {
      console.log("fetch irrigation api call error", error);
    }
  };

  useEffect(() => {
    fetchIrrigation()
    
  },[selectedIrr])
  useEffect(() => {
    fetchCustomers()
  },[])


  return (
    <>
      <div className="card-body">
        <div className="card">
          <div className="card-body p-0">
            <div className="itemtitleBar">
              <h4>General Information</h4>
            </div>
            <div className="card-body">
              <div className="">
                {errorMessage? <Alert severity="error">{errorMessage}</Alert>: null }
                
               
                  <div className="row mb-2 mx-1">
                    <div className="col-md-3">
                      <label className="form-label">Customer<span className="text-danger">*</span></label>
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
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
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

                    {/* <div className="col-md-3">
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
                    {/* <div className="col-md-3">
                      <label className="form-label">Contact</label>

                      <Autocomplete
                        id="inputState299"
                        size="small"
                        options={contactList}
                        getOptionLabel={(option) => option.FirstName || ""}
                        value={
                          contactList.find(
                            (contact) =>
                              contact.ContactId === formData.ContactId
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

                    <div className="col-md-3 ">
                      <div className="col-md-12">
                        <label className="form-label">Irrigation number<span className="text-danger">*</span></label>
                      </div>
                      <TextField
                        type="text"
                        size="small"
                        name="IrrigationNumber"
                        onChange={handleInputChange}
                        value={formData.IrrigationNumber}
                       
                        className="form-control form-control-sm"
                        placeholder="Irrigation Number"
                      />
                    </div>
                    <div className="col-md-6 text-right mt-3">
                      <div>
                        {selectedIrr === 0 ? null : (
                          <button
                            className="btn btn-dark me-2"
                            onClick={toggleShowForm}
                          >
                            Add Controller Info
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-primary me-1"
                        >
                          Submit
                        </button>
                        {/* <NavLink to="/Dashboard/Irrigation">
                  </NavLink> */}

                        <button
                          onClick={() => {
                            setShowContent(true);
                            setSelectedIrr(0);
                          }}
                          className="btn btn-danger light ms-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
               
              </div>
            </div>
          </div>
        </div>

        {showForm && (
          <IrrigationControler
          fetchIrrigation={fetchIrrigation}
            toggleShowForm={toggleShowForm}
            selectedIrr={selectedIrr}
          />
        )}

        <ControllerTable fetchIrrigation={fetchIrrigation} headers={headers} controllerList={controllerList} />
      </div>
    </>
  );
};

export default IrrigationForm;

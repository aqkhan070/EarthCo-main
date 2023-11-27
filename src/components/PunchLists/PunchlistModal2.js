import React, { useEffect, useState } from "react";
import axios from "axios";
import useCustomerSearch from "../Hooks/useCustomerSearch";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const PunchlistModal2 = ({
  addPunchListData,
  handleChange,
  staffData,
  sLList,
  contactList,
  inputValue,
  setInputValue,
  headers,
  setAddPunchListData,
  handleSubmit,
  selectedPL

}) => {

  const { customerSearch, fetchCustomers } = useCustomerSearch();
  const { name, fetchName } = useFetchCustomerName();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedServiceRequest, setSelectedServiceRequest] = useState(null);

  const [customersList, setCustomersList] = useState([]);
  const [showCustomersList, setShowCustomersList] = useState(true);

  const fetchPLData = async () => {
    try {
      const res = await axios.get(`https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlist?id=${selectedPL}`,{headers});
        console.log("selected pl is", res.data)
        setAddPunchListData(res.data)
        setSelectedContact(res.data)
        setInputValue(res.data.CustomerId)
    } catch (error) {
      console.log("fetch PL api call error", error)
    }
  };

  useEffect(() => {    
  
    fetchPLData()
  }, [selectedPL])

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
    handleChange(simulatedEvent);
  };
  
  



  const [selectedContact, setSelectedContact] = useState({})
  const handleContactAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "ContactId",
        value: newValue ? newValue.ContactId : "",

      },
    };
    setSelectedContact(newValue)
    setAddPunchListData((prevData) => ({
      ...prevData,
      ContactName: newValue.FirstName,
      ContactCompany: newValue.CompanyName,
      ContactEmail: newValue.Email

    }))
    console.log("selected contact is", newValue)

    handleChange(simulatedEvent);
  };

  const handleSLAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "ServiceLocationId",
        value: newValue ? newValue.ServiceLocationId : "",
      },
    };

    handleChange(simulatedEvent);
  };

  const handleStaffAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "AssignedTo",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleChange(simulatedEvent);
  };
  useEffect(() => {
    
    console.log("punch list dataaa",addPunchListData);
    console.log("selected contact dataaa",selectedContact);
      
    }, [addPunchListData, selectedContact])

  return (
    <div className="modal fade modal-lg" id="editPunch">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Punchlist</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <form>
            <div className="modal-body">
              <div className="row">
                <div className=" col-md-6 mb-3">
                  <label className="form-label">
                    Title<span className="text-danger">*</span>
                  </label>
                  <TextField
                    type="text"
                    className="form-control"
                    name="Title"
                    size="small"
                    value={addPunchListData.Title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Customer <span className="text-danger">*</span>
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
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          onChange={(e) => {
                            fetchCustomers(e.target.value);
                          }}
                          placeholder="Choose..."
                          // error={submitClicked && !formData.CustomerId}
                          className="bg-white"
                        />
                      )}
                    />
                 
                </div>

                <div className="col-md-6 mb-3 ">
                  <label className="form-label">Contact Name</label>
                  <Autocomplete
                    size="small"
                    options={contactList}
                    getOptionLabel={(option) => option.FirstName || ""}
                    value={
                      contactList.find(
                        (contact) =>
                          contact.ContactId === addPunchListData.ContactId
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
                {/* <div className="col-md-6 ">
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
                          addPunchListData.ServiceLocationId
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

                <div className="col-md-6 mb-3">
                  <label className="form-label">Assigned To</label>
                  <Autocomplete
                    id="staff-autocomplete"
                    size="small"
                    options={staffData}
                    getOptionLabel={(option) => option.FirstName || ""}
                    value={
                      staffData.find(
                        (staff) => staff.UserId === addPunchListData.AssignedTo
                      ) || null
                    }
                    onChange={handleStaffAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.UserId === value.AssignedTo
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

                <div className="col-md-6 mb-3">
                  <label className="form-label">Contact Company</label>
                  <TextField
                  size="small"
                  value={selectedContact.CompanyName||  addPunchListData.ContactCompany}
                  
                  fullWidth
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Contact Email</label>
                  <TextField
                  size="small"
                  value={selectedContact.Email || addPunchListData.ContactEmail}                  
                  fullWidth
                  />
                </div>

                {/* <div className="col-lg-6 col-md-6 ">
                        <label className="form-label">Status:</label>
                        <FormControl fullWidth>
                          <Select
                            name="StatusId"
                            value={addPunchListData.StatusId || ""}
                            onChange={handleChange}
                            size="small"
                          >
                            <MenuItem value={1}>Open</MenuItem>
                            <MenuItem value={2}>Closed</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                     */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                data-bs-dismiss="modal"
                data-bs-target="#editPunch"
              >
                Close
              </button>
              <button
                type="submit"
                id="closer"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editPunch"
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PunchlistModal2;

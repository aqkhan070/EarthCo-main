import React from "react";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const LandscapeForm = () => {
  const [customers, setCustomers] = useState([]);
  const [serviceLocations, setServiceLocations] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [contacts, setContacts] = useState([])
  const [monthlyLandscape, setMonthlyLandscape] = useState({
    CustomerId: null,
    ContactId: null,
    SupervisorVisitedthejobweekly: false,
    CompletedLitterpickupofgroundareas: false,
    Completedsweepingorblowingofwalkways: false,
    HighpriorityareaswereVisitedweekly: false,
    VDitcheswerecleanedandinspected: false,
    Fertilizationoftrufoccoured: " ",
    WeepscreeninspectedandcleanedinrotationsectionId: null,
    Trufwasmovedandedgedweekly: false,
    Shrubstrimmedaccordingtorotationschedule: false,
    FertilizationofShrubsoccoured: " ",
    WateringofflowerbedsCompletedandchecked: false,
    Headswereadjustedformaximumcoverage: false,
    Repairsweremadetomaintainaneffectivesystem: false,
    Controllerswereinspectedandadjusted: false,
    Mainlinewasrepaired: false,
    Valvewasrepaired: false,
    Thismonthexpectedrotationschedule: " ",
    Notes: " ",
    isActive: false
  })

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );
    try {
      setCustomers(response.data);
      //   console.log("shdwihduq",customers);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  const fetchServiceLocations = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestList"
    );
    try {
      setServiceLocations(response.data);
      // console.log(".........",serviceLocations);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  const fetchContacts = async () => {
    const response = await axios.get(
      `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomer?id=${selectedCustomer}`
    );
    try {
      setContacts(response.data.tblContacts);
      console.log(".........",contacts);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };


  useEffect(() => {
    fetchCustomers();
    fetchServiceLocations();
  }, []);

  const handleCustomerChange = (event) => {
    const selectedCustomerId = event.target.value; // Get the selected CustomerId
    setSelectedCustomer(selectedCustomerId); // Update the selectedCustomer state
  };

  useEffect(() => {
    // console.log("'''''''''''object'''''''''''", selectedCustomer);
    selectedCustomer && fetchContacts();
  },[selectedCustomer])


  const handleInputChange = (event) => {
    const { name, type } = event.target;
    const value = type === 'checkbox' ? event.target.checked : event.target.value;

    setMonthlyLandscape(prevState => ({
        ...prevState,
        [name]: value
    }));
    // console.log(",,,,,,,,,", monthlyLandscape);
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(",,,,,,,,,,",monthlyLandscape);
  }

  return (
    <>
      <div className="card-body container-fluid">
        <div className="basic-form">
          <form>
            <div className="row">
              <div className="mb-3 col-md-4">
                <label className="form-label">Customer</label>
                <Form.Select
                  className="bg-white"
                  aria-label="Default select example"
                  size="md"
                  name="CustomerId"
                  onChange={handleInputChange}
                  id="inlineFormCustomSelect"
                  value={selectedCustomer || ""} 
                >
                  <option value={null} selected>
                    Select Customer
                  </option>

                  {customers.map((customer) => {
                    return (
                      <option
                        value={customer.CustomerId}
                        key={customer.CustomerId}
                      >
                        {customer.CustomerName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label">Service Location</label>
                <Form.Select
                    name="ServiceLocation"
                  className="bg-white"
                  aria-label="Default select example"
                  size="md"
                  id="inlineFormCustomSelect"
                >
                  <option value={null} selected>
                    Select Service Location
                  </option>
                  {serviceLocations.map((srLocation) => {
                    return (
                      <option key={srLocation.ServiceRequestId}>
                        {srLocation.ServiceLocation}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="mb-3 col-md-4">
                <label>Contact</label>
                <Form.Select
                  className="bg-white"
                  aria-label="Default select example"
                  size="md"
                  name="ContactId"
                  onChange={handleInputChange}
                  id="inlineFormCustomSelect"
                >
                    {contacts.map((contact) => {
                        return(
                            <option key={contact.ContactId}>{contact.FirstName}</option>
                        )
                    })}
                </Form.Select>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Maintainence Report</h4>
                  </div>
                  <div className="basic-form">
                    <form className="SRdetailsForm srReportForm">
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Supervisor Visited the job weekly</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="SupervisorVisitedthejobweekly"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Completed Litter pickup of ground areas</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="CompletedLitterpickupofgroundareas"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Completed sweeping or blowing of walkways</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              name="Completedsweepingorblowingofwalkways"
                              onChange={handleInputChange}
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>High priority areas were Visited weekly</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              name="HighpriorityareaswereVisitedweekly"
                              onChange={handleInputChange}
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>V Ditches were cleaned and inspected</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="VDitcheswerecleanedandinspected"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="row"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>
                              Weep screen inspectedand cleaned in rotation
                              section
                            </h5>
                          </div>
                          <div className="col-md-7">
                            <form>
                              <Form.Select
                                aria-label="Default select example"
                                size="md"
                                name="WeepscreeninspectedandcleanedinrotationsectionId"
                                onChange={handleInputChange}
                                id="inlineFormCustomSelect"
                              >
                                <option>Select</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              </Form.Select>
                              {/* <select className="default-select  form-control wide" >
                                                                <option>Select</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                            </select> */}
                            </form>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Lawn Maintainence</h4>
                  </div>
                  <div className="basic-form">
                    <form className="SRdetailsForm srReportForm">
                      <div className="col-md-12">
                        <div
                          className="row"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Fertilization of truf occoured</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              name="Fertilizationoftrufoccoured"
                              onChange={handleInputChange}
                              class="datepicker-default form-control form-control-sm"
                            
                              id="datepicker"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Truf was moved and edged weekly</h5>
                          </div>
                          <div className="col-md-7">
                            <input

                              type="checkbox"
                              name="Trufwasmovedandedgedweekly"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Shrub Maintainence</h4>
                  </div>
                  <div className="basic-form">
                    <form className="SRdetailsForm srReportForm">
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>
                              Shrubs trimmed according to rotation schedule
                            </h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              name="Shrubstrimmedaccordingtorotationschedule"
                              onChange={handleInputChange}
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="row"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Fertilization of Shrubs occoured</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              name="FertilizationofShrubsoccoured"
                              onChange={handleInputChange}
                              class="datepicker-default form-control"
                              id="datepicker"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Ground cover and flowerbed Maintainence</h4>
                  </div>
                  <div className="basic-form">
                    <form className="SRdetailsForm srReportForm">
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>
                              Watering of flowerbeds Completed and checked
                            </h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="WateringofflowerbedsCompletedandchecked"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Irrigation System</h4>
                  </div>
                  <div className="basic-form">
                    <form className="SRdetailsForm srReportForm">
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Heads were adjusted for maximum coverage</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="Headswereadjustedformaximumcoverage"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>
                              Repairs were made to maintain an effective system
                            </h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="Repairsweremadetomaintainaneffectivesystem"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Controllers were inspected and adjusted</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="Controllerswereinspectedandadjusted"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Main line was repaired</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="Mainlinewasrepaired"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Valve(s) was repaired</h5>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="checkbox"
                              name="Valvewasrepaired"
                              onChange={handleInputChange}
                              class="form-check-input"
                              id="customCheckBox2"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Rotation</h4>
                  </div>
                  <div className="basic-form">
                    <form className="SRdetailsForm srReportForm">
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>This month's expected rotation schedule</h5>
                          </div>
                          <div className="col-md-7">
                            <div class="basic-form">
                              <form>
                                <div class="mb-3">
                                  <textarea
                                    class="form-txtarea form-control"
                                    name="Thismonthexpectedrotationschedule"
                                    onChange={handleInputChange}
                                    rows="2"
                                    id="comment"
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Extra Information</h4>
                  </div>
                  <div className="basic-form">
                    <form className="SRdetailsForm srReportForm">
                      <div className="col-md-12">
                        <div className="row">
                          <div
                            className="col-md-5"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>Notes</h5>
                          </div>
                          <div className="col-md-7">
                            <div class="basic-form">
                              <form>
                                <div class="mb-3">
                                  <textarea
                                    class="form-txtarea form-control"
                                    rows="2"
                                    name="Notes"
                                    onChange={handleInputChange}
                                    id="comment"
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row text-end">
          <div>
            <NavLink to="/Dashboard/Landscape">
              <button type="button" onClick={handleSubmit} class="btn btn-primary me-1">
                Submit
              </button>
            </NavLink>
            <button class="btn btn-danger light ms-1">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandscapeForm;

import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AdressModal from "../Modals/AdressModal";

const UpdateCustomer = ({ selectedItem, setShowContent }) => {
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [loginState, setLoginState] = useState("dontallow");
  const [showLogin, setShowLogin] = useState(false);
  const [primary, setPrimary] = useState(false);

  const [apiKeys, setapiKeys] = useState([]);
  const [inputNames, setinputNames] = useState([]);
  const [mainObj, setmainObj] = useState({});

  const [showContacts, setShowContacts] = useState(false);
  const [showSRLocation, setShowSRLocation] = useState(false);

  const [formData, setFormData] = useState({
    CustomerData: {
      CustomerName: "",
    },
    ContactData: customerData.tblContacts,
  });

  const [serviceLocations, setServiceLocations] = useState({});
  const [adress1, setAdress1] = useState("");
  const [adress2, setAdress2] = useState("");

  const [showPop1, setShowPop1] = useState(true);
  const [showPop2, setShowPop2] = useState(true);

  const [SLadress, setSLadress] = useState({});

 

 
  


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "CustomerName") {
      setFormData((prevState) => ({
        ...prevState,
        CustomerData: {
          CustomerName: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        ContactData: {
          ...formData.ContactData,
          [name]: value,
        },
      });
    }
    console.log(formData);
  };

  const delContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const deleteContact = (index) => {
    if (window.confirm("Are you sure you want to delete this Contact?")) {
      delContact(index);
    }
  };

  const addSRLocation = () => {
    setShowSRLocation(false);
  };

  useEffect(() => {console.log("././././.", adress2)},[adress2])

  return (
    <div className="">
   

      <form>
        <div className="card">
          <div className="card-header">
            <h4 className="modal-title" id="#gridSystemModal">
              Service Locations
            </h4>
          </div>
          <div className="card-body">
            {showSRLocation ? null : (
              <button
                onClick={() => {
                  setShowSRLocation(true);
                }}
                className="btn btn-primary"
              >
                Add
              </button>
            )}

            {showSRLocation && (
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-xl-4 mb-3">
                      <label className="form-label">
                        Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="SRName"
                        className="form-control form-control-sm"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div className="col-xl-6 mb-5">
                      <div className="form-check form-check-inline radio-margin">
                        <label className="form-check-label" for="inlineRadio1">
                          Bill to:
                        </label>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="BillToCustomer"
                            id="inlineRadio1"
                            value="option1"
                          />
                          <label
                            className="form-check-label"
                            for="inlineRadio1"
                          >
                            Customer
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="BillToSRLocation"
                            id="inlineRadio2"
                            value="option2"
                          />
                          <label
                            className="form-check-label"
                            for="inlineRadio2"
                          >
                            This service Location
                          </label>
                        </div>
                      </div>
                    </div>
                    <h4>Details</h4>{" "}
                    <hr
                      style={{
                        border: "none", // Remove the default border
                        backgroundColor: "#d9d9d9", // Set the background color to create the line
                        height: "1px", // Set the height to 1px for a thin line
                        margin: " 0px 0px 19px", // Add margin for spacing
                      }}
                    />
                    <div className="row">
                    <div
                    className="col-xl-3 mb-3"
                    style={{ position: "relative" }}
                  >
                    <label className="form-label">
                      Address<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="SRinput2"
                      onClick={() => {
                        setShowPop2(!showPop2);
                        
                      }}
                      style={{ cursor: "pointer" }}
                      name="SLAddress"
                      className="form-control form-control-sm"
                      value={adress2}
                      placeholder="Address"
                      readOnly
                    />
                    {showPop2 || (
                      <AdressModal
                        boolState={setShowPop2}
                        handleAdress={setAdress2}
                        adress={SLadress}
                        setAdress={setSLadress}
                      />
                    )}
                  </div>
                      <div className="col-xl-3 mb-3">
                        <label className="form-label">
                          Phone<span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          onChange={handleChange}
                          name="SRPhone"
                          className="form-control form-control-sm"
                          placeholder="Phone"
                        />
                      </div>
                      <div className="col-xl-3 mb-3">
                        <label className="form-label">
                          Alt Phone<span className="text-danger">*</span>
                        </label>
                        <input
                          id="contactInp4"
                          name="AltPhone"
                          className="form-control form-control-sm"
                          placeholder="Alt Phone"
                          required
                        />
                      </div>
                      <div
                        className="col-xl-3 mb-3"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "26px",
                        }}
                      >
                        <button
                          onClick={addSRLocation}
                          className="btn btn-primary"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="table-responsive active-projects style-1">
                      <table id="empoloyees-tblwrapper" className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Alt Phone</th>
                            <th>Bill to</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Phone</td>
                            <td>Alt Phone</td>
                            <td>Bill to</td>

                            <td>
                              <div className="badgeBox">
                                <span className="actionBadge badge-danger light border-0 badgebox-size">
                                  <span className="material-symbols-outlined badgebox-size">
                                    delete
                                  </span>
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <button className="btn btn-primary me-1" onClick={handleSubmit}>
                  Submit
                </button>
                <NavLink to="/Dashboard/Customers">
                  <button
                    className="btn btn-danger light ms-1"
                    onClick={() => {
                      setShowContent(true);
                    }}
                  >
                    Cancel
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCustomer;

import React, { useEffect, useState } from "react";
import AdressModal from "../Modals/AdressModal";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCutomer = () => {
  const navigate = useNavigate();

  const [customerAdress, setCustomerAdress] = useState({});
  // const [SLadress, setSLadress] = useState({})

  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});

  const [serviceLocations, setServiceLocations] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [SRlocation, setSRlocation] = useState([]);
  const [serviceLocArr, setServiceLocArr] = useState([]);

  const [adress1, setAdress1] = useState("");
  const [adress2, setAdress2] = useState("");

  const [showPop1, setShowPop1] = useState(true);
  const [showPop2, setShowPop2] = useState(true);

  const [SLadress, setSLadress] = useState({});
  const [loginState, setLoginState] = useState("dontallow");
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({});

  const handleCustomerInfo = (event) => {
    const value = event.target.value;
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: value,
    });
  };

  // contacts

  const handleContacts = (event) => {
    const value = event.target.value;
    setContact({
      ...contact,
      [event.target.name]: value,
    });
  };

  const addContact = (e) => {
    e.preventDefault();
    setContacts([
      ...contacts,
      { ...contact, id: Math.round(Math.random() * 9999) },
    ]);

    for (let n = 1; n <= 4; n++) {
      document.getElementById(`contactInp${n}`).value = "";
    }
  };

  // service Locations

  const handleServiceLocation = (event) => {
    const value = event.target.value;
    setSRlocation({
      ...SRlocation,
      adress: adress2,
      [event.target.name]: value,
    });
  };

  const addServiceLocation = (e) => {
    e.preventDefault();
    setServiceLocations([
      ...serviceLocations,
      { ...SRlocation, id: Math.round(Math.random() * 9999) },
    ]);
    setServiceLocArr([...serviceLocArr, { ...SRlocation, adress: SLadress }]);
    for (let n = 1; n <= 4; n++) {
      document.getElementById(`SRinput${n}`).value = "";
    }
    setAdress2("");
    setSLadress({});
  };

  const postCustomer = async () => {
    // const response = await axios.post('http://localhost:8001/AddCustomer', {
    //     ...customerInfo,
    //     userLogin: loginData,
    //     contacts,
    //     customerAdress,
    //     serviceLocation: serviceLocArr
    // })
    // if (response.status === 200) {
    navigate("/Dashboard/Customers");
    // }
  };

  const addUser = async () => {
    // await axios.post('http://localhost:8001/AddUser', {
    //     fullName: customerInfo.customerName,
    //     userName: loginData.email,
    //     ...loginData
    // })
  };

  const handleSubmit = () => {
    if (contacts[0] !== undefined && serviceLocArr[0] !== undefined) {
      postCustomer();
    }
    if (loginData.email !== undefined) {
      addUser();
    }
  };

  const deleteContact = (id) => {
    const updatedArr = contacts.filter((item) => {
      return item.id !== id;
    });
    setContacts(updatedArr);
  };

  const deleteLocation = (id) => {
    const updatedArr = serviceLocations.filter((item) => {
      return item.id !== id;
    });
    setServiceLocations(updatedArr);
  };

  const changeLogin = (event) => {
    setLoginState(event.target.value);
  };

  useEffect(() => {
    if (loginState === "allow") {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [loginState]);

  const handleLoginData = (event) => {
    const value = event.target.value;
    setLoginData({
      ...loginData,
      [event.target.name]: value,
    });
  };

  return (
    <div className="container-fluid">
      {/* <form onSubmit={(e) => e.preventDefault()}> */}
      <div className="card">
        <div className="card-header">
          <h4 className="modal-title" id="#gridSystemModal">
            Customer Info
          </h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-4 mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Customer Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="customerName"
                id="exampleFormControlInput1"
                onChange={handleCustomerInfo}
                placeholder="Customer Name"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={addContact}>
        <div className="card">
          <div className="card-header">
            <h4 className="modal-title" id="#gridSystemModal">
              Contact
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-xl-4 mb-3">
                    <label className="form-label">
                      First Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleContacts}
                      name="FirstName"
                      className="form-control"
                      placeholder="Firs tName"
                      required
                    />
                  </div>

                  <div className="col-xl-4 mb-3">
                    <label className="form-label">
                      Last Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleContacts}
                      name="LastName"
                      className="form-control"
                      placeholder="Last Name"
                      required
                    />
                  </div>

                  <div className="col-xl-4 mb-3">
                    <label className="form-label">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactInp2"
                      className="form-control"
                      onChange={handleContacts}
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label className="form-label">
                      Phone<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      id="contactInp3"
                      onChange={handleContacts}
                      name="phone"
                      className="form-control"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label className="form-label">
                      Company Name<span className="text-danger">*</span>
                    </label>
                    <input
                      id="contactInp4"
                      onChange={handleContacts}
                      name="Company Name"
                      className="form-control"
                      placeholder="Company Name"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label className="form-label">
                      Address<span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={handleContacts}
                      name="Address"
                      className="form-control"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div
                    className="col-xl-4 mb-3"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "26px",
                    }}
                  >
                    <button className="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="itemtitleBar">
                      <h4>Contacts</h4>
                    </div>
                    <div className="table-responsive active-projects style-1">
                      <table id="empoloyees-tblwrapper" className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Contact Name</th>
                            <th>E-mail</th>
                            <th>Phone</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map((contact, index) => {
                            return (
                              <>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{contact.contactName}</td>
                                  <td>{contact.email}</td>
                                  <td>{contact.phone}</td>
                                  <td>{contact.mobile}</td>
                                  <td>
                                    <div className="badgeBox">
                                      <span
                                        className="actionBadge badge-danger light border-0"
                                        onClick={() =>
                                          deleteContact(contact.id)
                                        }
                                      >
                                        <span className="material-symbols-outlined">
                                          delete
                                        </span>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="text-end">
        <button className="btn btn-primary me-1" onClick={handleSubmit}>
          Submit
        </button>
        <NavLink to="/Dashboard/Customers">
          <button className="btn btn-danger light ms-1">Cancel</button>
        </NavLink>
      </div>
      {/* </form> */}
    </div>
  );
};

export default AddCutomer;

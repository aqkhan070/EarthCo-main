import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCustomer = () => {
  const navigate = useNavigate();

 
const [customerName, setCustomerName] = useState()
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [contactFirstname, setContactFirstname] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactCompanyName, setContactCompanyName] = useState("");
  const [contactAddress, setContactAddress] = useState("");

  const [customerData, setCustomerData] = useState({});
  const [customerKeys, setCustomerKeys] = useState([]);

  

  const [serviceLocations, setServiceLocations] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});

  const [loginState, setLoginState] = useState("dontallow");
  const [showLogin, setShowLogin] = useState(false);
  const [primary, setprimary] = useState(true);

  const [formData, setFormData] = useState({
    CustomerData: {
      CustomerName: "",
    },
    ContactData: [],
  });

  const fetchCustomers = async () => {
    
      try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomer?id=5"
      );
      // Extract keys from the response data
      const keys = Object.keys(response.data);
      const keys = Object.keys(response.data);
      console.log(keys);

    //   Create a state containing those keys with empty values
    //   const initialData = {};
    //   keys.forEach((key) => {
    //     initialData[key] = "";
    //   });

    //   setCustomerData(initialData);
    //   setCustomerKeys(customerKeys);
    //   console.log(customerKeys);
    } catch (error) {
      console.log("API Call Error:", error);
    }
  };


  useEffect(() => {
    fetchCustomers();
   
  }, []);
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Customer/AddCustomer",
        {
          CustomerData: {
            CustomerName: formData.CustomerData.CustomerName,
          },
          ContactData: formData.ContactData.map((contact) => ({
            FirstName: contact.FirstName,
            LastName: contact.LastName,
            Email: contact.Email,
            CompanyName: contact.CompanyName,
            Address: contact.Address,
            isPrimary: contact.isPrimary,
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
        // Assuming the response.data is your JSON object
        const jsonObject = response.data;
    
        // Get all the keys (property names) of the JSON object
        const keys = Object.keys(jsonObject[0]);
    
        // Log the keys to the console
        console.log('Keys of the JSON object:', keys);
    
        // Now you can use the keys as needed
      })
      
      ;

      // Handle the response here (e.g., show a success message)
      console.log("API response:", response.data);
      

      // Clear the form or perform other actions as needed
      setFormData({
        CustomerData: {
          CustomerName: "",
        },
        ContactData: [],
      });

      // Redirect to another page or perform other actions after successful submission
      navigate("/Dashboard/Customers");
    } catch (error) {
      // Handle any errors here (e.g., show an error message)
      console.error("Error submitting data:", error);
    }
  };

  const handleCustomerInfo = (event) => {
    const value = event.target.value;
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: value,
    });
  };

  // contacts

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

  const changePrimary = (event) => {
    const value = event.target.value;
    setprimary(value === "dontallow");
    console.log("primary", primary);
  };

  useEffect(() => {
    if (loginState === "allow") {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [loginState]);

  useEffect(() => {
    // to render primary state
  }, [primary]);

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
                      onChange={(e) => {
                        setContactFirstname(e.target.value);
                      }}
                      name="FirstName"
                      className="form-control"
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className="col-xl-4 mb-3">
                    <label className="form-label">
                      Last Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setContactLastName(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setContactPhone(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setContactCompanyName(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setContactAddress(e.target.value);
                      }}
                      name="Address"
                      className="form-control"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="row">
  <label className="col-form-label col-form-label-lg">
    Set as Primary
  </label>
  <div className="mb-3 mb-0">
    <form>
      <div className="form-check custom-checkbox form-check-inline">
        <input
          type="checkbox"
          className="form-check-input"
          id="customCheckBox"
          checked={primary}
          onChange={(e) => {
            setprimary(e.target.checked);
            setprimary(!primary);
            
          }}
        />
        <label
          className="form-check-label"
          htmlFor="customCheckBox"
        >
          Set as Primary
        </label>
      </div>
    </form>
  </div>
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
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{`${contactFirstname} ${contactLastName}`}</td>
                                <td>{contactEmail}</td>
                                <td>{contactPhone}</td>
                                <td>{contact.mobile}</td>
                                <td>
                                  <div className="badgeBox">
                                    <span
                                      className="actionBadge badge-danger light border-0"
                                      onClick={() => deleteContact(contact.id)}
                                    >
                                      <span className="material-symbols-outlined">
                                        delete
                                      </span>
                                    </span>
                                  </div>
                                </td>
                              </tr>
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

export default AddCustomer;

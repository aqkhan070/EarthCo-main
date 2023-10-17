import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCustomer = () => {
  const navigate = useNavigate();

  const initialState = {
    customerName: "",
    contactFirstname: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    contactCompanyName: "",
    contactAddress: "",
    primary: false,
  };

  const [formData, setFormData] = useState(initialState);

  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
 

  

  const [serviceLocations, setServiceLocations] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});

  const [loginState, setLoginState] = useState("dontallow");
  const [showLogin, setShowLogin] = useState(false);
  const [primary, setprimary] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Customer/AddCustomer",
        {
          CustomerData: {
            CustomerName: formData.customerName,
          },
          ContactData: contacts.map((contact) => ({
            FirstName: contact.contactFirstname,
            LastName: contact.contactLastName,
            Email: contact.contactEmail,
            CompanyName: contact.contactCompanyName,
            Address: contact.contactAddress,
            isPrimary: formData.primary,
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
    // Handle the response here (e.g., show a success message)
    console.log("API response:", response.data);

    // Extract keys from the response data
    const responseKeys = Object.keys(response.data);

    // Update initialState object with responseKeys
    const updatedInitialState = { ...initialState };
    responseKeys.forEach((key) => {
      updatedInitialState[key] = "";
    });

    // Update the form data with the updated initialState
    setFormData(updatedInitialState);

    // Clear the contacts array
    setContacts([]);

    // Redirect to another page or perform other actions after successful submission
    navigate("/Dashboard/Customers");
  } catch (error) {
    // Handle any errors here (e.g., show an error message)
    console.error("Error submitting data:", error);
  }
};

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
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
                      onChange={handleChange}
                      name="contactFirstname"
                      value={formData.contactFirstname}
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
                      onChange={handleChange}
                      name="contactLastName"
                      value={formData.contactLastName}
                      className="form-control"
                      placeholder="Last Name"
                      required
                    />
                  </div>

                  {/* Rest of your input fields */}
                  {/* ... */}

                  <div className="row">
                    <label className=" col-form-label col-form-label-lg">
                      Set as Primary
                    </label>
                    <div className="mb-3 mb-0">
                      <form>
                        <div className="form-check custom-checkbox form-check-inline">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckbox"
                            name="primary"
                            checked={formData.primary}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckbox"
                          >
                            Primary
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
            {/* ... */}
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

import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AdressModal from "../Modals/AdressModal";
import { Form } from "react-bootstrap";

const UpdateCustomer = ({ selectedItem, setShowContent }) => {
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [loginState, setLoginState] = useState("dontallow");
  const [showLogin, setShowLogin] = useState(false);
  const [primary, setPrimary] = useState(false);
  const [alowContactLogin, setAlowContactLogin] = useState(false);
  const [allowLogin, setAllowLogin] = useState(false);

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
    ServiceLocationData: customerData.tblServiceLocations,
  });

  // company data
  const [companyData, setCompanyData] = useState({
    CompanyName: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Address: "",
    Phone: "",
    AltPhone: "",
    Fax: "",
    CustomerTypeId: "",
    Notes: "",
    username: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [customerType, setCustomerType] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({})
  const [responseid, setresponseid] = useState(0)
  // updated contacts
  const [contactData, setContactData] = useState({});
  const [contactDataList, setContactDataList] = useState([]);
  // service Locations
  const [serviceLocations, setServiceLocations] = useState({});
  const [slForm, setSlForm] = useState([]);
  const [adress1, setAdress1] = useState("");
  const [adress2, setAdress2] = useState("");

  const [showPop1, setShowPop1] = useState(false);
  const [showPop2, setShowPop2] = useState(false);

  const [SLadress, setSLadress] = useState({});

  const inputReffname = useRef();
  const inputReflname = useRef();
  const inputRefemail = useRef();
  const inputRefphone = useRef();
  const inputRefCname = useRef();
  const inputRefaddress = useRef();
  const clearInput = () => {
    // Step 3: Access the current property and set it to an empty string
    inputReffname.current.value = "";
    inputReflname.current.value = "";
    inputRefemail.current.value = "";
    inputRefphone.current.value = "";
    inputRefCname.current.value = "";
    inputRefaddress.current.value = "";
  };

  useEffect(() => {
    const dataObject = {};
    inputNames.forEach((name) => {
      dataObject[name] = "";
    });

    setmainObj(dataObject);
    // console.log("object is ,,,", mainObj);
  }, []);

  const getCustomerType = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerTypes`
      );
      console.log("getCustomerType", response.data);
      setCustomerType(response.data);
      console.log(".............", customerType);
    } catch (error) {
      console.log("getCustomerType api call error", error);
    }
  };
  useEffect(() => {
    console.log("typess are", customerType);
  }, [customerType]);

  const getCustomerData = async () => {
    if (selectedItem === 0) {
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomer?id=${selectedItem}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      // Handle the response. For example, you can reload the customers or show a success message
      console.log("Customer zzzzzzzz:", response.data);
      setSelectedCompany(response.data)
      setAllowLogin(response.data.isLoginAllow)
      setCompanyData(response.data)
      
    } catch (error) {
      console.error("There was an error updating the customer:", error);
    }
  };

  const extractInputNames = () => {
    const inputElements = document.querySelectorAll("form input");

    setinputNames(
      Array.from(inputElements).map((input) => input.getAttribute("name"))
    );
    console.log("Input array is", inputNames);
  };
  useEffect(() => {
    getCustomerData();
    getCustomerType();

    extractInputNames();
  }, []);

  

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Customer/AddCustomer",
        companyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("postData,,,,,,,,,:", postData);

      navigate("/Dashboard/Customers");
      setShowContent(true);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

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

  // company
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      isLoginAllow: allowLogin,
    }));
    console.log("cdcdcdcdcdcdc", companyData);
  };

  //  Contacts
  const handleContactChange = (e) => {
    const { name, value, type } = e.target;

    // Check if the input type is "number" and convert the value to a number
    // const parsedValue = type === 'number' ? parseFloat(value) : value;
    setContactData({
      ...contactData,
      [name]: value,
      CustomerId: selectedItem,
      ContactId: 0,
    });
    console.log("contact data,,,,,,", contactData)
  };

  useEffect(() => {
    // This effect will run whenever state.data is updated
    console.log("contactDataList", contactData)
    console.log("contactDataList \First", contactDataList)
    setContactDataList([...contactDataList, contactData]);
    console.log("contactDataList izzzzzz", contactData)
    console.log("contactDataList Last", contactDataList)
    setContactData({
      FirstName: "",
      LastName: "",
      Phone: "",
      AltPhone: "",
      Email: "",
      Address: "",
      Comments: "",
    }); 
  }, [responseid]);
  
  const handleContactSave = async () => {
    
    try{

      const response = await axios.post('https://earthcoapi.yehtohoga.com/api/Customer/AddContact',contactData );
      console.log("successfull contact api call", response.data.Id);
      setresponseid(response.data.Id);
      setContactData(prevState => ({
        ...prevState,
        ContactId: response.data.Id,
      }), () => {
   
      });
      

    }catch(error){
      console.log("api call error", error)
    }

  };

  const addContact = (e) => {
    e.preventDefault();

    const newContact = {
      FirstName: formData.ContactData.FirstName,
      LastName: formData.ContactData.LastName,
      Email: formData.ContactData.Email,
      Phone: formData.ContactData.Phone,
      CompanyName: formData.ContactData.CompanyName,
      Address: formData.ContactData.Address,
      isPrimary: primary,
    };

    setContacts([...contacts, newContact]);

    // Clear the form fields
    setFormData((prevState) => ({
      ...prevState,
      ContactData: {
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        CompanyName: "",
        Address: "",
      },
    }));

    setPrimary(true);
    clearInput();
    setShowContacts(false);
  };

  const delContact = (index) => {
    const updatedContacts = [...contactDataList];
    updatedContacts.splice(index, 1);
    setContactDataList(updatedContacts);
  };

  const deleteContact = (index) => {
    if (window.confirm("Are you sure you want to delete this Contact?")) {
      delContact(index);
    }
  };

  useEffect(() => {
    if (loginState === "allow") {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [loginState]);

  const handleSLChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      // Handle radio button inputs
      setServiceLocations((prevLocations) => ({
        ...prevLocations,
        [name]: checked ? value : "", // Only update the value if the radio button is checked
      }));
    } else {
      // Handle text inputs
      setServiceLocations((prevLocations) => ({
        ...prevLocations,
        [name]: value,
      }));
    }
    console.log("<><><><><<", serviceLocations);
  };

  const addServiceLocation = (e) => {
    e.preventDefault();
    // Check if serviceLocations has data to add
    if (Object.keys(serviceLocations).length === 0) {
      alert("Service Locations data is empty");
      return;
    }
    // Create a new object containing the serviceLocations data
    const newObject = serviceLocations;

    // Append the new object to the array
    setSlForm((prevObjects) => [...prevObjects, newObject]);

    // Clear the serviceLocations state after adding it to the array
    setServiceLocations({
      SRName: "",
      SLAddress: "",
      BillTo: "",
      SLPhone: "",
      AltPhone: "",
      // Reset other fields as necessary
    });
    console.log("><><><><><", slForm);
    setShowSRLocation(false);
  };

  const handleDelete = (index) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this Service Location?"
    );

    if (shouldDelete) {
      // Create a copy of the slForm array
      const updatedSlForm = [...slForm];

      // Remove the element at the specified index
      updatedSlForm.splice(index, 1);

      // Update the state with the modified array
      setSlForm(updatedSlForm);
    }
  };

  // useEffect(() => {console.log("././././.", adress2)},[adress2])

  return (
    <div className="">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="card mt-3">
          <div className="">
            <h4 className="modal-title itemtitleBar" id="#gridSystemModal">
              Customer Info
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              {/* {formData.CustomerData.CustomerName && (
                <div className="col-xl-4 mb-3">
                  <div className="form-check custom-checkbox form-check-inline message-customer">
                    <input
                      type="checkbox"
                      name="isPrimary"
                      className="form-check-input"
                      id="customCheckBox"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="customCheckBox"
                    >
                      Send text message to {formData.CustomerData.CustomerName}
                    </label>
                  </div>
                </div>
              )} */}
            </div>

            <div class="row">
              <div class="col-9">
                <div className="row">
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="CompanyName"
                      value={companyData.CompanyName}
                      onChange={handleCompanyChange}
                      placeholder="Company Name"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="FirstName"
                      value={companyData.FirstName}
                      onChange={handleCompanyChange}
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="LastName"
                      value={companyData.LastName}
                      onChange={handleCompanyChange}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="Email"
                      value={companyData.Email}
                      onChange={handleCompanyChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="Address"
                      value={companyData.Address}
                      onChange={handleCompanyChange}
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="Phone"
                      value={companyData.Phone}
                      onChange={handleCompanyChange}
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      AltPhone
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="AltPhone"
                      value={companyData.AltPhone}
                      onChange={handleCompanyChange}
                      placeholder="Alternate Phone"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Customer Fax
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="Fax"
                      value={companyData.Fax}
                      onChange={handleCompanyChange}
                      placeholder="Customer Fax"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label className="form-label">Customer Type</label>
                    <Form.Select
                      size="md"
                      name="CustomerTypeId"
                      aria-label="Default select example"
                      id="inputState"
                      className="bg-white"
                    >
                      {customerType.map((customer, index) => {
                        return (
                          <option
                            key={customer.CustomerTypeId}
                            value={customer.CustomerTypeId}
                          >
                            {customer.CustomerType}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </div>

                  <div className="col-xl-4 mb-3">
                    <label className="form-label">Notes</label>
                    <textarea
                      name="Notes"
                      value={companyData.Notes}
                      onChange={handleCompanyChange}
                      className="form-txtarea form-control form-control-sm"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div className="col-xl-12 mb-3 ">
                  <div className="form-check form-check-inline radio-margin">
                    <label className="form-check-label " htmlFor="inlineRadio1">
                      Allow Login:
                    </label>
                    <div className="form-check form-check-inline radio-margin-div">
                      <input
                        className="form-check-input ml-2 pl-2"
                        type="radio"
                        id="inlineRadio1"
                        value="Customer"
                        checked={allowLogin === true} // Check the "yes" radio button if allowLogin is true
                        onChange={() => {
                          setAllowLogin(true);
                        }}
                      />
                      <label
                        className="form-check-label allow-customer-login"
                        htmlFor="inlineRadio1"
                      >
                        yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        value="BillToServiceLocation"
                        checked={allowLogin === false} // Check the "no" radio button if allowLogin is false
                        onChange={() => {
                          setAllowLogin(false);
                        }}
                      />
                      <label
                        className="form-check-label allow-customer-login"
                        htmlFor="inlineRadio2"
                      >
                        no
                      </label>
                    </div>
                  </div>
                </div>
                {allowLogin && (
                  <div className="row">
                    <div className="col-xl-12 mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="username"
                        value={companyData.username}
                        onChange={handleCompanyChange}
                        placeholder="User Name"
                        required
                      />
                    </div>
                    <div className="col-xl-12 mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        name="Password"
                        value={companyData.Password}
                        onChange={handleCompanyChange}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="col-xl-12 mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        name="ConfirmPassword"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* contact modal */}
      <div className="modal fade" id="basicModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Add Contact</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="basic-form">
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">FirstName</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="FirstName"
                        className="form-control form-control-sm"
                        placeholder="First Name"
                        onChange={handleContactChange}
                        value={contactData.FirstName}
                        required
                      />
                      <input
                        type="text"
                        name="ContactId"
                        className="form-control form-control-sm"
                        onChange={handleContactChange}
                        value={contactData.ContactId}
                        hidden
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Last Name</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="LastName"
                        className="form-control form-control-sm"
                        placeholder="Last Name"
                        onChange={handleContactChange}
                        value={contactData.LastName}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Phone</label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        id="contactInp3"
                        name="Phone"
                        className="form-control form-control-sm"
                        placeholder="Phone"
                        onChange={handleContactChange}
                        value={contactData.Phone}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Alt Phone</label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        id="contactInp3"
                        name="AltPhone"
                        className="form-control form-control-sm"
                        placeholder=" Alt Phone"
                        onChange={handleContactChange}
                        value={contactData.AltPhone}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        id="contactInp2"
                        className="form-control form-control-sm"
                        name="Email"
                        placeholder="Email"
                        onChange={handleContactChange}
                        value={contactData.Email}
                        required
                      />
                    </div>
                  </div>
                  <div className=" mb-3 row">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-9">
                      <input
                        name="Address"
                        className="form-control form-control-sm"
                        placeholder="Address"
                        onChange={handleContactChange}
                        value={contactData.Address}
                        required
                      />
                    </div>
                  </div>
                  <div className=" mb-3 row">
                    <label className="col-sm-3 col-form-label">Comments</label>
                    <div className="col-sm-9">
                      <textarea
                        name="Comments"
                        className="form-txtarea form-control form-control-sm"
                        onChange={handleContactChange}
                        value={contactData.Comments}
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="closer"
                  className="btn btn-danger light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleContactSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {selectedItem === 0 ? null : (
        <div>
          {/* Contacts Table */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="card">
              <div className="">
                <h4 className="modal-title itemtitleBar" id="#gridSystemModal">
                  Contacts
                </h4>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                  style={{ margin: "12px 20px" }}
                >
                  + Add Contacts
                </button>

                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <div className="estDataBox">
                        <div className="table-responsive active-projects style-1">
                          <table id="empoloyees-tblwrapper" className="table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>

                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contactDataList.map((contact, index) => (
                                <tr key={index}>
                                  <td>{contact.ContactId}</td>
                                  <td>{contact.FirstName}</td>
                                  <td>{contact.LastName}</td>
                                  <td>{contact.Email}</td>
                                  <td>{contact.Phone}</td>
                                  <td>{contact.Address}</td>
                                  <td>
                                    <div className="badgeBox">
                                      <span
                                        className="actionBadge badge-danger light border-0 badgebox-size"
                                        onClick={() => deleteContact(index)}
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
                </div>
              </div>
            </div>
          </form>

          {/* servive location */}

          <div className="modal fade" id="basicModal2">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Add Service location</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="basic-form">
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="SRName"
                            onChange={handleSLChange}
                            className="form-control form-control-sm"
                            placeholder="Name"
                            value={serviceLocations.SRName}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                          Bill To
                        </label>
                        <div className="col-sm-9">
                          <div className="row">
                            <div className="col-5">
                              <input
                                className="form-check-input radio-margin-top"
                                type="radio"
                                name="BillTo"
                                id="inlineRadio1"
                                onChange={handleSLChange}
                                value="Customer"
                                checked={serviceLocations.BillTo === "Customer"}
                              />
                              <label
                                className="form-check-label"
                                for="inlineRadio1"
                              >
                                Customer
                              </label>
                            </div>
                            <div className="col-7">
                              <input
                                className="form-check-input radio-margin-top"
                                type="radio"
                                name="BillTo"
                                id="inlineRadio2"
                                onChange={handleSLChange}
                                value="BillToServiceLocation"
                                checked={
                                  serviceLocations.BillTo ===
                                  "BillToServiceLocation"
                                }
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
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                          Address
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            onChange={handleSLChange}
                            name="SLAddress"
                            value={serviceLocations.SLAddress}
                            className="form-control form-control-sm"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Phone</label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            onChange={handleSLChange}
                            value={serviceLocations.SLPhone}
                            name="SLPhone"
                            className="form-control form-control-sm"
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                          Alt Phone
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            name="AltPhone"
                            onChange={handleSLChange}
                            value={serviceLocations.AltPhone}
                            className="form-control form-control-sm"
                            placeholder="Alt Phone"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      id="closer"
                      className="btn btn-danger light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={addServiceLocation}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <form>
            <div className="card">
              <div className="">
                <h4 className="modal-title itemtitleBar" id="#gridSystemModal">
                  Service Locations
                </h4>
              </div>
              <div className="card-body">
                {showSRLocation ? null : (
                  <>
                    {/* <button
                      onClick={() => {
                        setShowSRLocation(true);
                      }}
                      className="btn btn-primary mb-3"
                    >
                      Add
                    </button> */}
                    <button
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#basicModal2"
                      style={{ margin: "12px 20px" }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      + Add Service Locations
                    </button>
                  </>
                )}

                {showSRLocation && (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-xl-4 mb-1">
                          <label className="form-label">
                            Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="SRName"
                            onChange={handleSLChange}
                            className="form-control form-control-sm"
                            placeholder="Name"
                            required
                          />
                        </div>
                        <div className="col-xl-6 mb-3">
                          <div className="form-check form-check-inline radio-margin">
                            <label
                              className="form-check-label"
                              for="inlineRadio1"
                            >
                              Bill to:
                            </label>
                            <div className="form-check form-check-inline radio-margin-div">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="BillTo"
                                id="inlineRadio1"
                                onClick={handleSLChange}
                                value="Customer"
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
                                name="BillTo"
                                id="inlineRadio2"
                                onClick={handleSLChange}
                                value="BillToServiceLocation"
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
                        {/* <h4>Details</h4>{" "}
              <hr
                style={{
                  border: "none", // Remove the default border
                  backgroundColor: "#d9d9d9", // Set the background color to create the line
                  height: "1px", // Set the height to 1px for a thin line
                  margin: " 0px 0px 19px", // Add margin for spacing
                }}
              /> */}
                        <div className="row">
                          {/* <div
                            className="col-xl-3 mb-3"
                            style={{ position: "relative" }}
                          >
                            <label className="form-label">Address</label>
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
                          </div> */}
                          <div className="col-xl-3 mb-3">
                            <label className="form-label">Phone</label>
                            <input
                              type="number"
                              onChange={handleSLChange}
                              name="SLPhone"
                              className="form-control form-control-sm"
                              placeholder="Phone"
                            />
                          </div>
                          <div className="col-xl-3 mb-3">
                            <label className="form-label">Alt Phone</label>
                            <input
                              type="number"
                              name="AltPhone"
                              onChange={handleSLChange}
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
                              onClick={addServiceLocation}
                              className="btn btn-primary"
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-danger light ms-1"
                              onClick={() => {
                                setShowSRLocation(false);
                              }}
                            >
                              Cancel
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
                              {slForm.map((slData, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{slData.SRName}</td>
                                  <td>{slData.SLAddress}</td>
                                  <td>{slData.SLPhone}</td>
                                  <td>{slData.AltPhone}</td>
                                  <td>{slData.BillTo}</td>
                                  <td>
                                    <div className="badgeBox">
                                      <span className="actionBadge badge-danger light border-0 badgebox-size">
                                        <span
                                          className="material-symbols-outlined badgebox-size"
                                          onClick={() => handleDelete(index)}
                                        >
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
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

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
  );
};

export default UpdateCustomer;

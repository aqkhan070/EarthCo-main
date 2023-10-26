import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCustomer = ({selectedItem, setShowContent}) => {
  const navigate = useNavigate();

  
const [customerData, setCustomerData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [loginState, setLoginState] = useState("dontallow");
  const [showLogin, setShowLogin] = useState(false);
  const [primary, setPrimary] = useState(false);

  const [apiKeys, setapiKeys] = useState([]);
  const [inputNames, setinputNames] = useState([]);
  const [mainObj, setmainObj] = useState({});

  

  const [formData, setFormData] = useState({
    CustomerData: {
      CustomerName: "",
    },
    ContactData: customerData.tblContacts,
  });

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


  const getCustomerData = async () => {
    try {
        const response = await axios.get(`https://earthcoapi.yehtohoga.com/api/Customer/GetCustomer?id=${selectedItem}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });


        setCustomerData(response.data) ;
        setFormData((prevState) => ({
          ...prevState,
          CustomerName: response.data.CustomerName,
        }))
        

        // Handle the response. For example, you can reload the customers or show a success message
        console.log("Customer zzzzzzzz:", customerData.tblContacts);
        setContacts(response.data.tblContacts);
       

    } catch (error) {
        console.error("There was an error deleting the customer:", error);
    }
};

  const fetchCustomers = async () => {
    try {
      const responses = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomer?id=0"
      );
    } catch (error) {
      // console.log("API Call Error:", error.response.data);
      const keys = Object.keys(error.response.data.ContactData[0]);
      setapiKeys(keys);
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
    fetchCustomers();
    getCustomerData();

    extractInputNames();
  }, []);

  const setMainObjValues = () => {
    let updatedObj = { ...mainObj };
    inputNames.forEach((name) => {
      const inputValue = document.querySelector(`input[name="${name}"]`).value;
      updatedObj[name] = inputValue;
      // console.log(updatedObj[name]);
    });
    setmainObj(updatedObj);
    console.log(mainObj);
  };

  const handleSubmit = async () => {
    setMainObjValues();

    // Prepare the CustomerData and ContactData payload
    const customerPayload = {
      CustomerId: selectedItem,
      CustomerName: formData.CustomerData.CustomerName,
      CreatedBy: 1, // Set this as per your need
      EditBy: 1, // Set this as per your need
      isActive: true,
    };

    // This function filters out the mainObj based on the apiKeys and returns the valid payload object.
    const preparePayload = (obj) => {
      let payload = {};
      apiKeys.forEach((key) => {
        if (obj[key]) {
          payload[key] = obj[key];
        }
      });
      return payload;
    };

    const contactPayload = contacts.map((contact) => {
      return {
        ...preparePayload(contact),
        isPrimary: contact.isPrimary || false,
        isActive: true,
        CreatedBy: "2", // Set this as per your need
      };
    });

    // POST request payload
    const postData = {
      CustomerData: customerPayload,
      ContactData: contacts,
    };

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Customer/AddCustomer",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("postData,,,,,,,,,:", postData);

      setFormData({
        CustomerData: {
          CustomerName: "",
        },
        ContactData: [],
      });

      setContacts([]); // Clear the contacts array
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
        setFormData(prevState => ({
            ...prevState,
            CustomerData: {
                CustomerName: value,
            }
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

  const addContact = (e) => {
    e.preventDefault();

    const newContact = {
      FirstName: formData.ContactData.FirstName,
      LastName: formData.ContactData.LastName,
      Email: formData.ContactData.Email,
      Phone: formData.ContactData.Phone,
      CompanyName: formData.ContactData.CompanyName,
      Address: formData.ContactData.Address,
      isPrimary: primary
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
  };

  const deleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  useEffect(() => {
    if (loginState === "allow") {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [loginState]);

  return (
    <div className="col-xl-4 mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Customer Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="CustomerName"
                  value={formData.CustomerName}
                  // onClick={(e) => {e.target.value = ""}}
                  placeholder={ customerData.CustomerName}
                  onChange={handleChange}
                  required
                />
              </div>
  );
};

export default UpdateCustomer;

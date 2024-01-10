import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AdressModal from "../Modals/AdressModal";
import { Form } from "react-bootstrap";
import { Create, Delete, Update } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import validator from "validator";
import CircularProgress from "@mui/material/CircularProgress";
import AddressInputs from "../Modals/AddressInputs";

import Cookies from "js-cookie";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import Contacts from "./Contacts";
import ServiceLocations from "./ServiceLocations";
import { DataContext } from "../../context/AppData";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AddCustomer = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const navigate = useNavigate();
  const { loggedInUser } = useContext(DataContext);

  const [allowLogin, setAllowLogin] = useState(false);

  // company data
  const [companyData, setCompanyData] = useState({
    CustomerTypeId: 1,
  });
  const [customerType, setCustomerType] = useState([]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(true);

  // updated contacts
  const [contactDataList, setContactDataList] = useState([]);
  const [sLAddress, setSLAddress] = useState({});
  // service Locations
  const [slForm, setSlForm] = useState([]);

  // tabs
  const [value, setValue] = useState(0);

  const getCustomerData = async () => {
    if (idParam === 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomer?id=${idParam}`,
        {
          headers,
        }
      );
      setLoading(false);

      // AhsanModel
      // Handle the response. For example, you can reload the customers or show a success message
      console.log("Customer zzzzzzzz:", response.data);
      setAllowLogin(response.data.isLoginAllow);
      setCompanyData(response.data.Data);
      setContactDataList(response.data.ContactData);
      setSlForm(response.data.ServiceLocationData);
      // setSLAddress((prevData) => ({
      //   ...prevData,
      //   Address: response.data.Data.Address,
      // }));
      console.log(response.data.ServiceLocationData);
    } catch (error) {
      setLoading(false);
      console.error("There was an error updating the customer:", error);
    }
  };
  useEffect(() => {
    getCustomerData();
    getCustomerType();
  }, []);

  // validation logic
  useEffect(() => {
    // Check if allowLogin is true
    if (allowLogin) {
      // Check if username is not null and passwords match
      if (
        companyData.username &&
        companyData.Password &&
        companyData.Password === companyData.ConfirmPassword
      ) {
      } else {
      }
    } else {
      // Check if company name, first name, last name, and email are not empty
      if (
        companyData.CompanyName &&
        companyData.FirstName &&
        companyData.Email
      ) {
      } else {
      }
    }
  }, [companyData, allowLogin]);

  // company logic
  const getCustomerType = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerTypes`,
        { headers }
      );
      console.log("getCustomerType", response.data);
      setCustomerType(response.data);
      console.log(".............", customerType);
    } catch (error) {
      console.log("getCustomerType api call error", error);
    }
  };
  const [submitClicked, setSubmitClicked] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async () => {
    console.log("check1");
    setSubmitClicked(true);
    if (
      !companyData.CompanyName ||
      !companyData.FirstName ||
      !companyData.ContactName ||
      !companyData.Email ||
      !companyData.Address
    ) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      console.log("check2 ");

      return; // Return early if any required field is empty
    }

    if (
      allowLogin &&
      (!companyData.username ||
        !companyData.Password ||
        !companyData.ConfirmPassword)
    ) {
      console.log("check3");

      return; // Return early if login fields are empty
    }
    if (allowLogin && companyData.Password !== companyData.ConfirmPassword) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Password and Confirm Password Should Be same");
      console.log("check4");
      return; // Return early if passwords do not match
    }

    if (!validator.isLength(companyData.CompanyName, { min: 3, max: 30 })) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Company name should be 3 to 30 characters");
      console.log("Company name should be between 3 and 30 characters");
      return;
    }

    // Validate first name length
    if (!validator.isLength(companyData.FirstName, { min: 3, max: 30 })) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Customer name should be between 3 and 30 characters");
      console.log("First name should be 3 to 30 characters");
      return;
    }

    // Validate last name length
    // if (!validator.isLength(companyData.LastName, { min: 3, max: 30 })) {
    //   setOpenSnackBar(true);
    //   setSnackBarColor("error");
    //   setSnackBarText("Last name should be between 3 and 30 characters");
    //   console.log("Last name should be between 3 and 30 characters");
    //   return;
    // }

    if (!validator.isLength(companyData.ContactName, { min: 3, max: 30 })) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Contact Name should be between 3 and 30 characters");
      console.log("Last name should be between 3 and 30 characters");
      return;
    }

    if (!validator.isEmail(companyData.Email)) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Email must contain the @ symbol");
      console.log("Email must contain the @ symbol");
      return;
    }
    if (
      companyData.Phone &&
      !validator.isMobilePhone(companyData.Phone, "any", { max: 20 })
    ) {
      setPhoneError(true);

      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Phone number is not valid");

      return;
    }

    setDisableButton(true);
    console.log("companyData", companyData);
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Customer/AddCustomer",
        companyData,
        {
          headers,
        }
      );

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);

      setDisableButton(false);
      console.log("sussess add customer response", response.data);
      navigate(`/customers/add-customer?id=${response.data.Id}`);
      // window.location.reload();
    } catch (error) {
      setDisableButton(false);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText(error.response.data);

      console.error("Error submitting data:", error.response.data);
      // console.log("customer payload is", companyData);
    }
  };
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;

    setCompanyData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
        isLoginAllow: allowLogin,
        CompanyId: Number(loggedInUser.CompanyId),
      };

      // Additional checks for the username and password fields
      if (name === "Password" || name === "ConfirmPassword") {
        // Check if the passwords match
        const isMatching =
          name === "Password"
            ? value === prevFormData.ConfirmPassword
            : prevFormData.Password === value;

        setPasswordsMatch(isMatching);

        // Disable button if passwords don't match when allowLogin is true
        if (allowLogin && !isMatching) {
          // setDisableButton(true);
        }
      } else if (allowLogin && name === "username" && !value) {
        // Disable button if username is empty when allowLogin is true
        // setDisableButton(true);
      }

      console.log("company data is", updatedFormData);

      return updatedFormData;
    });
  };

  return (
    <>
      {loading ? (
        <div className="center-loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="container-fluid">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="card ">
              <div className="">
                <h4 className="modal-title itemtitleBar" id="#gridSystemModal">
                  Customer Info
                </h4>
              </div>
              <div className="card-body">
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

                <div className="row">
                  <div className="col-9">
                    <div className="row"></div>
                    <div className="row">
                      <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Customer Name <span className="text-danger">*</span>
                        </label>
                        <TextField
                          type="text"
                          className="form-control"
                          name="FirstName"
                          variant="outlined"
                          size="small"
                          value={companyData.FirstName || ""}
                          error={submitClicked && !companyData.FirstName}
                          onChange={handleCompanyChange}
                          placeholder="Customer Name"
                        />
                      </div>
                      <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Contact Name <span className="text-danger">*</span>
                        </label>
                        <TextField
                          type="text"
                          className="form-control"
                          name="ContactName"
                          variant="outlined"
                          size="small"
                          value={companyData.ContactName || ""}
                          onChange={handleCompanyChange}
                          error={submitClicked && !companyData.ContactName}
                          placeholder="Contact Name"
                        />
                      </div>
                      <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Contact Company <span className="text-danger">*</span>
                        </label>

                        <TextField
                          type="text"
                          className="form-control"
                          name="CompanyName"
                          variant="outlined"
                          size="small"
                          error={submitClicked && !companyData.CompanyName}
                          value={companyData?.CompanyName || ""}
                          onChange={handleCompanyChange}
                          placeholder="Contact Company"
                        />
                      </div>
                      {/* <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <TextField
                          type="text"
                          className="form-control"
                          name="LastName"
                          variant="outlined"
                          size="small"
                          value={companyData.LastName}
                          onChange={handleCompanyChange}
                          error={submitClicked && !companyData.LastName}
                          placeholder="Last Name"
                        />
                      </div> */}
                      <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Email <span className="text-danger">*</span>
                        </label>
                        <TextField
                          type="text"
                          className="form-control"
                          name="Email"
                          variant="outlined"
                          size="small"
                          value={companyData.Email || ""}
                          error={submitClicked && !companyData.Email}
                          onChange={handleCompanyChange}
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Address<span className="text-danger">*</span>
                        </label>
                        <AddressInputs
                          address={companyData.Address}
                          name="Address"
                          handleChange={handleCompanyChange}
                          emptyError={submitClicked && !companyData.Address}
                        />
                        {/* <TextField
                          type="text"
                          className="form-control"
                          name="Address"
                          variant="outlined"
                          size="small"
                          value={companyData.Address}
                          onChange={handleCompanyChange}
                          placeholder="Address"
                        /> */}
                        {/* <MapCo /> */}
                      </div>
                      {/* <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Phone
                        </label>
                        <TextField
                          type="text"
                          className="form-control"
                          name="Phone"
                          variant="outlined"
                          size="small"
                          value={companyData.Phone}
                          error={phoneError}
                          onChange={handleCompanyChange}
                          placeholder="Phone"
                        />
                      </div>
                      <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Alt Phone
                        </label>
                        <TextField
                          type="text"
                          className="form-control"
                          name="AltPhone"
                          variant="outlined"
                          size="small"
                          value={companyData.AltPhone}
                          onChange={handleCompanyChange}
                          placeholder="Alternate Phone"
                        />
                      </div>
                      <div className="col-xl-4 mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Customer Fax
                        </label>
                        <TextField
                          type="text"
                          className="form-control"
                          name="Fax"
                          variant="outlined"
                          size="small"
                          value={companyData.Fax}
                          onChange={handleCompanyChange}
                          placeholder="Customer Fax"
                        />
                      </div> */}
                      {/* <div className="col-xl-4 mb-3">
                        <FormControl fullWidth variant="outlined">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Customer Type
                          </label>
                          <Select
                            labelId="customer-type-label"
                            id="customer-type-select"
                            variant="outlined"
                            name="CustomerTypeId"
                            value={companyData.CustomerTypeId}
                            onChange={handleCompanyChange}
                            size="small"
                          >
                            {customerType.map((customer, index) => (
                              <MenuItem
                                key={customer.CustomerTypeId}
                                value={customer.CustomerTypeId}
                              >
                                {customer.CustomerType}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div> */}

                      <div className="col-xl-4 mb-3">
                        <label className="form-label">Notes</label>
                        <textarea
                          name="Notes"
                          value={companyData.Notes || ""}
                          onChange={handleCompanyChange}
                          className=" form-control "
                          rows="2"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-3">
                    <div className="col-xl-12 mb-3 ">
                      <div className="form-check form-check-inline radio-margin">
                        <label
                          className="form-check-label "
                          htmlFor="inlineRadio1"
                        >
                          Allow Login:
                        </label>
                        <div className="form-check form-check-inline radio-margin-div">
                          <input
                            className="form-check-input ml-2 pl-2"
                            type="radio"
                            id="inlineRadio1"
                            name="isLoginAllow"
                            value="Customer"
                            checked={allowLogin === true} // Check the "yes" radio button if allowLogin is true
                            onChange={() => {
                              setAllowLogin(true);
                              // setDisableButton(true);
                            }}
                          />
                          <label
                            className="form-check-label allow-customer-login"
                            htmlFor="inlineRadio1"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="inlineRadio2"
                            name="isLoginAllow"
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
                            No
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
                          <TextField
                            type="text"
                            className="form-control"
                            name="username"
                            variant="outlined"
                            size="small"
                            error={submitClicked && !companyData.username}
                            value={companyData.username}
                            onChange={handleCompanyChange}
                            placeholder="User Name"
                          />
                        </div>
                        <div className="col-xl-12 mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Password <span className="text-danger">*</span>
                          </label>
                          <TextField
                            type="password"
                            className="form-control"
                            name="Password"
                            variant="outlined"
                            size="small"
                            error={submitClicked && !companyData.Password}
                            onChange={handleCompanyChange}
                            placeholder="Password"
                          />
                        </div>
                        <div className="col-xl-12 mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <TextField
                            type="password"
                            className="form-control"
                            name="ConfirmPassword"
                            variant="outlined"
                            size="small"
                            error={
                              submitClicked && !companyData.ConfirmPassword
                            }
                            onChange={handleCompanyChange}
                            placeholder="Confirm Password"
                          />
                          {!passwordsMatch && (
                            <div className="text-danger">
                              Passwords do not match.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div> */}
                </div>
                {/* <div className="col-md-6">
                  <label className="col-sm-4 col-form-label">
                    Address<span className="text-danger">*</span>
                  </label>
                  <AddressInputs />
                </div> */}
                <div className="row">
                  <div className="col-md-9">
                    <EventPopups
                      open={openSnackBar}
                      setOpen={setOpenSnackBar}
                      color={snackBarColor}
                      text={snackBarText}
                    />
                  </div>
                  <div className="col-md-3 text-end">
                    <NavLink to="/customers">
                      <button className="btn btn-danger light  m-1 ">
                        Cancel
                      </button>
                    </NavLink>

                    <LoaderButton
                      loading={disableButton}
                      handleSubmit={handleSubmit}
                    >
                      Save
                    </LoaderButton>

                    {/* <button
                      className="btn btn-primary m-1"
                      onClick={handleSubmit}
                      disabled={disableButton}
                    >
                      Submit
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* contact modal */}
          {/* AhsanModel */}

          {idParam === 0 ? (
            <></>
          ) : (
            <>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Contacts" {...a11yProps(0)} />
                    <Tab label="Service Locations" {...a11yProps(1)} />
                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <Contacts
                    contactDataList={contactDataList}
                    setContactDataList={setContactDataList}
                    getCustomerData={getCustomerData}
                  />
                </CustomTabPanel>
                {/* AhsanModel */}
                <CustomTabPanel value={value} index={1}>
                  <ServiceLocations
                    getCustomerData={getCustomerData}
                    sLAddress={sLAddress}
                    setSLAddress={setSLAddress}
                    slForm={slForm}
                    setSlForm={setSlForm}
                  />
                </CustomTabPanel>
                {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
              </Box>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AddCustomer;

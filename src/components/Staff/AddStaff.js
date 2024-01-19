import React, { useEffect, useState, useContext } from "react";
import AdressModal from "../Modals/AdressModal";
import TitleBar from "../TitleBar";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import validator from "validator";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AddressInputs from "../Modals/AddressInputs";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import { DataContext } from "../../context/AppData";
import Autocomplete from "@mui/material/Autocomplete";
import useFetchCompanyList from "../Hooks/useFetchCompanyList";
import useQuickBook from "../Hooks/useQuickBook";
import BackButton from "../Reusable/BackButton";

const AddStaff = ({}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const icon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const { loggedInUser } = useContext(DataContext);

  const [customerInfo, setCustomerInfo] = useState({
    RoleId: 4,
  });

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const { fetchCompanies, companies } = useFetchCompanyList();
  const { syncQB } = useQuickBook();

  const [userRoles, setUserRoles] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addCustomerSuccess, setAddCustomerSuccess] = useState("");

  const [formValid, setFormValid] = useState(false);
  const [staffAddress, setStaffAddress] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const getRoles = async () => {
    try {
      // Set up the headers with the token
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/UserManagement/Roles`,
        { headers }
      );
      console.log("user roles areee", response.data);
      setUserRoles(response.data);
    } catch (error) {
      console.log("erroor ", error);
    }
  };

  useEffect(() => {
    console.log("address is", staffAddress);
  }, [staffAddress]);

  useEffect(() => {
    getRoles();
    fetchCompanies();
  }, []);

  const handleCompanyChange = (event, newValue) => {
    setEmptyFieldsError(false);
    setEmailError(false);
    setPhoneError(false);
    setFirstNameError("");
    setLastNameError("");
    setLoadingButton(false);
    setSelectedCompanies(newValue.map((company) => company.CompanyId));
  };

  const handleCustomerInfo = (event) => {
    setEmptyFieldsError(false);
    setEmailError(false);
    setPhoneError(false);
    setFirstNameError("");
    setLastNameError("");
    setLoadingButton(false);
    const { name, value } = event.target;

    const newValue = name === "RoleId" ? parseInt(value, 10) : value;

    setCustomerInfo((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: newValue,
        CompanyId: Number(loggedInUser.CompanyId),
      };

      if (name === "Password" || name === "ConfirmPassword") {
        // Check if the passwords match
        const isMatching =
          name === "Password"
            ? value === updatedData.ConfirmPassword
            : updatedData.Password === value;

        setPasswordMatch(!isMatching);
      }

      return updatedData; // Return the updated state
    });

    console.log("customer info", customerInfo);
    setAlert(false);
  };

  const addStaff = async () => {
    setSubmitClicked(true);
    setLoadingButton(true);

    if (
      !customerInfo.FirstName ||
      !customerInfo.LastName ||
      !customerInfo.Email ||
      !customerInfo.RoleId ||
      selectedCompanies.length <= 0
    ) {
      setEmptyFieldsError(true);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("please fill all required fields");

      console.log("Required fields are empty");
      return;
    }

    if (idParam === 0 && !customerInfo.Password) {
      setEmptyFieldsError(true);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("please fill all required fields");
      console.log("Required fields are empty");
      return;
    }

    if (
      idParam === 0 &&
      customerInfo.Password !== customerInfo.ConfirmPassword
    ) {
      // Handle password and confirm password mismatch
      // setConfirmPasswordError(true);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Password and Confirm Password do not match");
      console.log("Password and Confirm Password do not match");
      return; // Terminate the function here
    }

    if (!validator.isLength(customerInfo.FirstName, { min: 3, max: 30 })) {
      setFirstNameError("First name should be between 3 and 30 characters");
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("First name should be 3 to 30 characters");
      console.log("First name should be between 3 and 30 characters");
      return;
    }

    if (!validator.isLength(customerInfo.LastName, { min: 3, max: 30 })) {
      setLastNameError("Last name should be between 3 and 30 characters");
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Last name should be 3 to 30 characters");
      console.log("Last name should be between 3 and 30 characters");
      return;
    }

    if (!validator.isEmail(customerInfo.Email)) {
      setEmailError(true);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Email must contain the @ symbol");
      console.log("Email must contain the @ symbol");
      return;
    }

    if (
      customerInfo.Phone &&
      !validator.isMobilePhone(customerInfo.Phone, "any", { max: 20 })
    ) {
      setPhoneError(true);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Phone number is not valid");
      console.log("Phone number is not valid");
      return;
    }

    try {
      const response = await axios.post(
        `https://earthcoapi.yehtohoga.com/api/Staff/AddStaff`,
        { StaffData: customerInfo, CompanyIds: selectedCompanies },
        { headers }
      );

      setAddCustomerSuccess(response.data.Message);
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      setLoadingButton(false);
      syncQB(response.data.SyncId);

      setTimeout(() => {
        setAddCustomerSuccess("");
        loggedInUser.userRole == "1"
          ? navigate(`/staff`)
          : navigate(`/dashboard`);
      }, 4000);

      // setTimeout(() => {
      //   setAlertSuccess(false);
      // }, 3000);

      // setAlertSuccess(true);

      console.log("Staff added successfully", customerInfo);
    } catch (error) {
      setLoadingButton(false);
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(error.response.data);

      console.log("staff API call error", error);
    }
  };

  const getStaffData = async () => {
    if (idParam === 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaff?id=${idParam}`,
        { headers }
      );

      console.log("staffdata izzzzzz", response.data);
      setCustomerInfo(response.data.Data);
      setSelectedCompanies(response.data.CompanyIds);
      setLoading(false);
    } catch (error) {
      console.log("error fetching staff data", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getStaffData();
  }, [idParam]);

  return (
    <>
      <TitleBar icon={icon} title="Add Staff" />
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      {loading ? (
        <div className="center-loader">
          <CircularProgress style={{ color: "#789a3d" }} />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="card">
            <div className="itemtitleBar">
              <h4>User Info</h4>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      First Name <span className="text-danger">*</span>
                    </label>
                    <TextField
                      type="text"
                      className="form-control"
                      name="FirstName"
                      variant="outlined"
                      size="small"
                      onChange={handleCustomerInfo}
                      value={customerInfo.FirstName}
                      error={submitClicked && !customerInfo.FirstName}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label
                      htmlFor="exampleFormControlInput4"
                      className="form-label"
                    >
                      Last Name<span className="text-danger">*</span>
                    </label>
                    <TextField
                      type="text"
                      className="form-control"
                      variant="outlined"
                      size="small"
                      onChange={handleCustomerInfo}
                      name="LastName"
                      value={customerInfo.LastName}
                      error={submitClicked && !customerInfo.LastName}
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Email / Username<span className="text-danger">*</span>
                    </label>
                    <TextField
                      className="form-control"
                      variant="outlined"
                      size="small"
                      onChange={handleCustomerInfo}
                      name="Email"
                      value={customerInfo.Email}
                      error={
                        emailError || (submitClicked && !customerInfo.Email)
                      }
                      placeholder="Email / Username"
                    />
                  </div>
                  {loggedInUser.userRole == "1" && (
                    <div className="col-md-3 mb-3">
                      <FormControl fullWidth variant="outlined">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label"
                        >
                          User Role <span className="text-danger">*</span>
                        </label>

                        <Select
                          labelId="role-label"
                          name="RoleId"
                          value={customerInfo.RoleId}
                          error={submitClicked && !customerInfo.RoleId}
                          onChange={handleCustomerInfo}
                          label=""
                          size="small"
                        >
                          {userRoles.map((roles) => (
                            <MenuItem key={roles.RoleId} value={roles.RoleId}>
                              {roles.Role}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}

                  <div className="col-md-3 mb-3">
                    <label
                      htmlFor="exampleFormControlInput4"
                      className="form-label"
                    >
                      Phone
                    </label>
                    <TextField
                      type="tel"
                      className="form-control"
                      onChange={handleCustomerInfo}
                      name="Phone"
                      variant="outlined"
                      size="small"
                      error={phoneError}
                      value={customerInfo.Phone}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label
                      htmlFor="exampleFormControlInput4"
                      className="form-label"
                    >
                      Alt Phone
                    </label>
                    <TextField
                      type="tel"
                      className="form-control"
                      onChange={handleCustomerInfo}
                      name="AltPhone"
                      variant="outlined"
                      size="small"
                      value={customerInfo.AltPhone}
                      placeholder="Alt Phone"
                    />
                  </div>
                  <div className="col-md-3" style={{ position: "relative" }}>
                    <label className="form-label">Address</label>

                    <AddressInputs
                      address={customerInfo.Address}
                      handleChange={handleCustomerInfo}
                      name="Address"
                    />

                    {/*<TextField
                      type="text"
                      onChange={handleCustomerInfo}
                      className="form-control "
                      name="Address"
                      variant="outlined"
                      size="small"
                      value={customerInfo.Address}
                     
                      placeholder="Address"
                    />
                     {showPop1 || (
                  <AdressModal
                    topClass="staffAdress"
                    adress={customerAdress}
                    setAdress={setCustomerAdress}
                    boolState={setShowPop1}
                    handleAdress={setAdress1}
                  />
                )} */}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      Select Company<span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      multiple
                      size="small"
                      options={companies}
                      getOptionLabel={(option) => option.CompanyName || ""}
                      onChange={handleCompanyChange}
                      value={companies.filter((company) =>
                        selectedCompanies.includes(company.CompanyId)
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Select Company"
                          className="bg-white"
                          error={submitClicked && selectedCompanies.length <= 0}
                        />
                      )}
                      aria-label="Contact select"
                    />
                  </div>

                  <div className="itemtitleBar">
                    <h4>Security Info</h4>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          Password<span className="text-danger">*</span>
                        </label>
                        <TextField
                          type="password"
                          className="form-control"
                          variant="outlined"
                          size="small"
                          error={
                            idParam === 0 &&
                            submitClicked &&
                            !customerInfo.Password
                          }
                          onChange={handleCustomerInfo}
                          name="Password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          Confirm Password<span className="text-danger">*</span>
                        </label>
                        <TextField
                          type="password"
                          className="form-control"
                          variant="outlined"
                          size="small"
                          onChange={handleCustomerInfo}
                          // error={idParam !== 0 && submitClicked && !customerInfo.ConfirmPassword}

                          name="ConfirmPassword"
                          placeholder="Confirm Password"
                        />
                        {passwordMatch && (
                          <div style={{ color: "red" }}>
                            Passwords do not match.
                          </div>
                        )}
                        {/* <div>{customerInfo.Password} {customerInfo.ConfirmPassword}</div> */}
                      </div>

                      <div className=" mt-4 col-md-6 text-end">
                        <BackButton
                          onClick={() => {
                            loggedInUser.userRole == "1"
                              ? navigate(`/staff`)
                              : navigate(`/dashboard`);
                          }}
                        >
                          back
                        </BackButton>{" "}
                        {/* <button className="btn btn-primary me-1" onClick={addStaff}>
                      Submit
                    </button> */}
                        <LoaderButton
                          loading={loadingButton}
                          handleSubmit={addStaff}
                        >
                          Save
                        </LoaderButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStaff;

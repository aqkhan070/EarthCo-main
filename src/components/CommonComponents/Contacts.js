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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import validator from "validator";
import CircularProgress from "@mui/material/CircularProgress";
import AddressInputs from "../Modals/AddressInputs";
import { useFormik } from "formik";
import { ServiceValidation, ValidationCustomer } from "./ValidationCustomer";

import Cookies from "js-cookie";

import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";

const Contacts = ({ customerId, fetchCustomers, fetctContacts }) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [formData, setFormData] = useState({});
  const [contactAddress, setContactAddress] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = async () => {
    setSubmitClicked(true);

    const CId = customerId;

    const updatedValues = {
      ...formData,
      CustomerId: CId,
      Address: contactAddress.Address || "",
    };

    console.log("contact payload izzzz", updatedValues);

    if (!formData.Email || !formData.FirstName || !formData.LastName) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      console.log("check2 ");

      return; // Return early if any required field is empty
    }

    if (!validator.isLength(formData.FirstName, { min: 3, max: 30 })) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Name should be 3 to 30 characters");
      console.log("Company name should be between 3 and 30 characters");
      return;
    }

    if (!validator.isLength(formData.LastName, { min: 3, max: 30 })) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Name should be 3 to 30 characters");
      console.log("Company name should be between 3 and 30 characters");
      return;
    }

    if (!validator.isEmail(formData.Email)) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Email must contain the @ symbol");
      console.log("Email must contain the @ symbol");
      return;
    }

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Customer/AddContact",
        updatedValues,
        {
          headers,
        }
      );

      setContactAddress({});
      setOpenSnackBar(true);
      setSubmitClicked(false);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      fetchCustomers();
      fetctContacts(CId);

      const closeButton = document.getElementById("closer");
      if (closeButton) {
        closeButton.click();
      }
    } catch (error) {
      console.log("error adding SL", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      CustomerId: customerId,
      [name]: value,
    }));
    console.log("handle change form data", formData);
  };

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="modal fade" id="basicModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
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
                  <label className="col-sm-4 col-form-label">
                    Contact Company
                  </label>
                  <div className="col-sm-8">
                    <TextField
                      type="text"
                      size="small"
                      name="CompanyName"
                      className="form-control"
                      placeholder="Contact Company"
                      // onChange={handleContactChange}
                      value={formData.CompanyName}
                      onChange={handleChange}

                      //required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">
                    First Name<span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-8">
                    <TextField
                      type="text"
                      size="small"
                      name="FirstName"
                      className="form-control"
                      placeholder="First Name"
                      error={submitClicked && !formData.FirstName}
                      onChange={handleChange}
                      value={formData.FirstName}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">
                    Last Name<span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-8">
                    <TextField
                      type="text"
                      name="LastName"
                      size="small"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={handleChange}
                      error={submitClicked && !formData.LastName}
                      value={formData.LastName}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">
                    Email<span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-8">
                    <TextField
                      type="email"
                      size="small"
                      id="contactInp2"
                      className="form-control"
                      name="Email"
                      placeholder="Email"
                      error={submitClicked && !formData.Email}
                      onChange={handleChange}
                      value={formData.Email}

                      //required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Phone</label>
                  <div className="col-sm-8">
                    <TextField
                      type="text"
                      size="small"
                      id="contactInp3"
                      name="Phone"
                      className="form-control"
                      placeholder="Phone"
                      onChange={handleChange}
                      value={formData.Phone}
                    />
                  </div>
                </div>
                {/* <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Alt Phone</label>
                  <div className="col-sm-8">
                    <TextField
                      type="text"
                      size="small"
                      id="contactInp3"
                      name="AltPhone"
                      className="form-control"
                      placeholder=" Alt Phone"
                      onChange={handleChange}
                      value={formData.AltPhone}
                      //required
                    />
                  </div>
                </div> */}

                <div className=" mb-3 row">
                  <label className="col-sm-4 col-form-label">Address</label>
                  <div className="col-sm-8">
                    <AddressInputs
                      address={formData.Address}
                      name="Address"
                      handleChange={handleChange}
                      addressValue={formData.Address}
                    />
                  </div>
                </div>
                <div className=" mb-3 row">
                  <label className="col-sm-4 col-form-label">Comments</label>
                  <div className="col-sm-8">
                    <textarea
                      name="Comments"
                      className="form-txtarea form-control"
                      onChange={handleChange}
                      value={formData.Comments}
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
                onClick={() => {
                  setFormData({
                    CompanyName: "",
                    FirstName: "",
                    LastName: "",
                    Phone: "",
                    AltPhone: "",
                    Email: "",
                    Address: "",
                    Comments: "",
                  });
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <span
        style={{ cursor: "pointer", color: "#779A3D" }}
        data-bs-toggle="modal"
        data-bs-target="#basicModal"
      >
        <strong>+ Add</strong>
      </span>
    </>
  );
};

export default Contacts;

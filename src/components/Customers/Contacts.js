import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Create, Delete, Update } from "@mui/icons-material";
import validator from "validator";
import { Button, TextField } from "@mui/material";
import AddressInputs from "../Modals/AddressInputs";
import { useFormik } from "formik";
import { ValidationCustomer } from "./ValidationCustomer";
import Cookies from "js-cookie";
import EventPopups from "../Reusable/EventPopups";

const Contacts = ({ getCustomerData, contactDataList, setContactDataList }) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const [formData, setFormData] = useState({
    tblUserAddresses: []
  });
  const [contactAddress, setContactAddress] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = async () => {
    setSubmitClicked(true);
    setFormData((prevFormData) => ({
      ...prevFormData,
      CustomerId: idParam,
      Address: contactAddress.Address || "",
    }));

    console.log("contact payload izzzz", formData);

    if (!formData.Email || !formData.FirstName || !formData.LastName) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      console.log("check2 ");

      return; // Return early if any required field is empty
    }

    if (formData.CompanyName &&!validator.isLength(formData.CompanyName, { min: 3, max: 30 })) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Company Name should be 3 to 30 characters");
      console.log("Company name should be between 3 and 30 characters");
      return;
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

    if (
      formData.Phone &&
      !validator.isMobilePhone(formData.Phone, "any", { max: 20 })
    ) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Phone number is not valid");

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
        formData,
        {
          headers,
        }
      );
      getCustomerData();

      setContactAddress({});
      setOpenSnackBar(true);
      setSubmitClicked(false);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);

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
      CustomerId: idParam,
      [name]: value,
    }));
    console.log("handle change form data", formData);
  };

  useEffect(() => {
    console.log("contact payload izzzz", formData);
  }, [formData]);

  const delContact = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/DeleteContact?id=${id}`,
        { headers }
      );

      const updatedContacts = contactDataList.filter(
        (contact) => contact.ContactId !== id
      );
      setContactDataList(updatedContacts);

      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Contact Deleted Successfully");
      console.log("contact deleted sussessfully", id, response);
    } catch (error) {
      console.log("error deleting contact", error);
    }
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
                      setCompanyData={setFormData}
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
                  getCustomerData();
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

      <div className="card">
        <h4 className="modal-title itemtitleBar" id="#gridSystemModal1">
          Contacts
        </h4>

        <div className="card-body">
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4 text-end">
              <button
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#basicModal"
                style={{ margin: "0px 20px 12px" }}
              >
                + Add Contacts
              </button>
            </div>
          </div>

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

                          <th className="actions-head ">Actions</th>
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
                            <td
                              className="contact-actions"
                              style={{ cursor: "pointer" }}
                            >
                              <Create
                                className="custom-create-icon"
                                data-bs-toggle="modal"
                                data-bs-target="#basicModal"
                                onClick={() => {
                                  setFormData(contact);
                                }}
                              ></Create>
                              <Button
                                color="error"
                                className="delete-button"
                                data-bs-toggle="modal"
                                data-bs-target={`#contactDeleteModal${contact.ContactId}`}
                              >
                                <Delete />
                              </Button>

                              {/* <Delete
                          color="error" 

                           onClick={() =>
                           deleteContact(contact.ContactId)
                           }
                        ></Delete>*/}

                              <div
                                className="modal fade"
                                id={`contactDeleteModal${contact.ContactId}`}
                                tabIndex="-1"
                                aria-labelledby="deleteModalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title">
                                        Are you sure you want to delete
                                        {contact.FirstName}?
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="basic-form text-center">
                                        <button
                                          type="button"
                                          id="closer"
                                          className="btn btn-danger light m-3"
                                          data-bs-dismiss="modal"
                                          onClick={() => {}}
                                        >
                                          Close
                                        </button>
                                        <button
                                          className="btn btn-primary m-3"
                                          data-bs-dismiss="modal"
                                          onClick={() =>
                                            delContact(contact.ContactId)
                                          }
                                        >
                                          Yes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
    </>
  );
};

export default Contacts;

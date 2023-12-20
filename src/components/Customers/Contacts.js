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
import MapCo from "./MapCo";
import Cookies from "js-cookie";
import CustomerAddress from "./CustomerAddress/CustomerAddress";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";

const Contacts = ({ getCustomerData, contactDataList, setContactDataList }) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const [contactData, setContactData] = useState({});
  //   const [contactDataList, setContactDataList] = useState([]);
  const [contactAddSuccess, setContactAddSuccess] = useState(false);
  const [contactDelSuccess, setContactDelSuccess] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [responseid, setresponseid] = useState(0);

  // AhsanModel
  const formInitialValues = {
    CompanyName: "",
    FirstName: "",
    LastName: "",
    Phone: "",
    AltPhone: "",
    Email: "",
    Address: "",
    Comments: "",
  };

  useEffect(() => {
    //console.log("Service Locations in useEffect:", serviceLocations);
    formik.setValues({
      CompanyName: contactData.CompanyName,
      FirstName: contactData.FirstName,
      LastName: contactData.LastName,
      Phone: contactData.Phone,
      AltPhone: contactData.AltPhone,
      Email: contactData.Email,
      Address: contactData.Address,
      Comments: contactData.Comments,
      ContactId: contactData.ContactId,
    });
  }, [contactData]);

  const resetForm = () => {
    formik.resetForm();
    //setContactAddSuccess(false);
  };

  const handleAddContactsClick = () => {
    resetForm();
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: ValidationCustomer,

    onSubmit: async (values, action) => {
      console.log(values);

      const CId = idParam;

      const updatedValues = {
        ...values,
        CustomerId: CId,
      };
      console.log(updatedValues);

      try {
        const response = await axios.post(
          "https://earthcoapi.yehtohoga.com/api/Customer/AddContact",
          updatedValues,
          { headers }
        );
        console.log("successful contact api", response.data.Id);
        //setShouldCloseModal(true);
        setOpenSnackBar(true);
        setSnackBarColor("success");
        setSnackBarText(response.data.Message);

        // Update the contactData with the response id, then add to list
        setContactData((prevState) => ({
          ...prevState,
          ContactId: response.data.Id,
        }));

        // Consider moving response id state update and contactDataList update here after the contactData state is guaranteed to be set
        setresponseid(response.data.Id);
        getCustomerData();

        const closeButton = document.getElementById("closer");
        if (closeButton) {
          closeButton.click();
        }

        action.resetForm();

        setTimeout(() => {
          setContactAddSuccess(false);
        }, 3000);
        setContactAddSuccess(true);
        // Adding to contactDataList can be here as well to ensure it's added after contactData is set with new ContactId
      } catch (error) {
        console.log("api call error", error);
      }
    },
  });

  // const handleContactChange = (e) => {
  //   const { name, value, type } = e.target;

  //   // Check if the input type is "number" and convert the value to a number
  //   // const parsedValue = type === 'number' ? parseFloat(value) : valu

  //   setContactData({
  //     ...contactData,
  //     [name]: value,
  //     CustomerId: selectedItem,
  //   });
  //   console.log("contact data,,,,,,", contactData);
  // };

  // useEffect(() => {
  //   // Only add to contactDataList if contactData is not empty
  //   if (
  //     contactData.FirstName ||
  //     contactData.LastName ||
  //     contactData.Phone ||
  //     contactData.Email
  //   ) {
  //     console.log("contactDataList", contactDataList);
  //     console.log("Adding to contactDataList: ", contactData);
  //     setContactDataList((prevList) => [...prevList, contactData]);
  //   }
  //   setContactData({
  //     FirstName: "",
  //     LastName: "",
  //     Phone: "",
  //     AltPhone: "",
  //     Email: "",
  //     Address: "",
  //     Comments: "",
  //   });
  // }, [responseid]); // Depends on when responseid is set

  // const [shouldCloseModal, setShouldCloseModal] = useState(false); // close modal
  // const handleContactSave = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "https://earthcoapi.yehtohoga.com/api/Customer/AddContact",
  //       contactData,
  //       { headers }
  //     );
  //     console.log("successful contact api", response.data.Id);
  //     setShouldCloseModal(true);

  //     // Update the contactData with the response id, then add to list
  //     setContactData((prevState) => ({
  //       ...prevState,
  //       ContactId: response.data.Id,
  //     }));

  //     // Consider moving response id state update and contactDataList update here after the contactData state is guaranteed to be set
  //     setresponseid(response.data.Id);
  //     getCustomerData();
  //     setTimeout(() => {
  //       setContactAddSuccess(false);
  //     }, 3000);
  //     setContactAddSuccess(true);
  //     // Adding to contactDataList can be here as well to ensure it's added after contactData is set with new ContactId
  //   } catch (error) {
  //     console.log("api call error", error);
  //   }
  // };

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
      setContactDelSuccess(true);
      setTimeout(() => {
        setContactDelSuccess(false);
      }, 4000);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Contact Deleted Successfully");
      console.log("contact deleted sussessfully", id, response);
    } catch (error) {
      console.log("error deleting contact", error);
    }
  };

  const deleteContact = (id) => {
    delContact(id);
  };

  const updateContact = (id) => {
    console.log(id);
    const updatedContacts = contactDataList.filter(
      (contact) => contact.ContactId !== id
    );
    setContactDataList(updatedContacts);
  };

  //   useEffect(() => {
  //     if (loginState === "allow") {
  //       setShowLogin(true);
  //     } else {
  //       setShowLogin(false);
  //     }
  //   }, [loginState]);

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
            <form onSubmit={formik.handleSubmit}>
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
                      Contact Company<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="CompanyName"
                        className="form-control"
                        placeholder="Contact Company"
                        // onChange={handleContactChange}
                        value={formik.values.CompanyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        //required
                      />
                      {formik.errors.CompanyName &&
                      formik.touched.CompanyName ? (
                        <small style={{ color: "red" }}>
                          {formik.errors.CompanyName}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">
                      First Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="FirstName"
                        className="form-control"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        value={formik.values.FirstName}
                        onBlur={formik.handleBlur}
                        //required
                      />
                      {formik.errors.FirstName && formik.touched.FirstName ? (
                        <small style={{ color: "red" }}>
                          {formik.errors.FirstName}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">
                      Last Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="LastName"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        value={formik.values.LastName}
                        onBlur={formik.handleBlur}
                        //required
                      />
                      {formik.errors.LastName && formik.touched.LastName ? (
                        <small style={{ color: "red" }}>
                          {formik.errors.LastName}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">
                      Phone<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="contactInp3"
                        name="Phone"
                        className="form-control"
                        placeholder="Phone"
                        onChange={formik.handleChange}
                        value={formik.values.Phone}
                        onBlur={formik.handleBlur}
                        //required
                      />
                      {formik.errors.Phone && formik.touched.Phone ? (
                        <small style={{ color: "red" }}>
                          {formik.errors.Phone}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">Alt Phone</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="contactInp3"
                        name="AltPhone"
                        className="form-control"
                        placeholder=" Alt Phone"
                        onChange={formik.handleChange}
                        value={formik.values.AltPhone}
                        //required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">
                      Email<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        id="contactInp2"
                        className="form-control"
                        name="Email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.Email}
                        onBlur={formik.handleBlur}
                        //required
                      />
                      {formik.errors.Email && formik.touched.Email ? (
                        <small style={{ color: "red" }}>
                          {formik.errors.Email}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className=" mb-3 row">
                    <label className="col-sm-4 col-form-label">
                      Address<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-8">
                      <AddressInputs
                        address={formik.values.Address}
                        name="Address"
                        handleChange={formik.handleChange}
                      />
                      {/* <input
                            name="Address"
                            className="form-control"
                            placeholder="Address"
                            onChange={formik.handleChange}
                            value={formik.values.Address}
                            onBlur={formik.handleBlur}
                            //required
                          /> */}
                      {/* {formik.errors.Address && formik.touched.Address ? (
                            <small style={{ color: "red" }}>
                              {formik.errors.Address}
                            </small>
                          ) : null} */}
                    </div>
                  </div>
                  <div className=" mb-3 row">
                    <label className="col-sm-4 col-form-label">Comments</label>
                    <div className="col-sm-8">
                      <textarea
                        name="Comments"
                        className="form-txtarea form-control"
                        onChange={formik.handleChange}
                        value={formik.values.Comments}
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
                    setContactData({
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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="card">
          <div className="">
            <h4 className="modal-title itemtitleBar" id="#gridSystemModal1">
              Contacts
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4 text-end">
                <button
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                  style={{ margin: "0px 20px 12px" }}
                  onClick={handleAddContactsClick}
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
                            <th style={{ maxWidth: "20px" }}>Address</th>

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
                                    setContactData(contact);
                                    updateContact(contact.ContactId);
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
                              </td>
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
                                        Are you sure you want to delete{" "}
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
                                            deleteContact(contact.ContactId)
                                          }
                                        >
                                          Yes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
    </>
  );
};

export default Contacts;

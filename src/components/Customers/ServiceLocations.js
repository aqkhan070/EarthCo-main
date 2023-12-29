import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AdressModal from "../Modals/AdressModal";
import { Create, Delete, Update } from "@mui/icons-material";

import { Button } from "@mui/material";


import { useFormik } from "formik";
import { ServiceValidation, ValidationCustomer } from "./ValidationCustomer";
import MapCo from "./MapCo";
import Cookies from "js-cookie";
import CustomerAddress from "./CustomerAddress/CustomerAddress";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import SLAddress from "./CustomerAddress/SLAddress";


const ServiceLocations = ({
  getCustomerData,
  sLAddress,
  setSLAddress,
  slForm,
  setSlForm,
}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const [serviceLocations, setServiceLocations] = useState({});
  const [addSLSuccess, setAddSLSuccess] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [showSRLocation, setShowSRLocation] = useState(false);

  const handleSLChange = (e) => {
    const { name, type, value } = e.target;

    const updatedValue = e.target.value;

    setServiceLocations((prevLocations) => ({
      ...prevLocations,
      CustomerId: idParam,
      [name]: updatedValue,
    }));
    console.log("ssssssss", serviceLocations);
  };

  const serviceFromInitialValue = {
    Name: "",
    Address: "",
    Phone: "",
    AltPhone: "",
    isBilltoCustomer: null,
    ServiceLocationId: null,
  };
  //   const [sLAddress, setSLAddress] = useState({})

  const resetFormLocation = () => {
    formikAddService.resetForm();
    //setContactAddSuccess(false);
  };

  useEffect(() => {
    console.log("lat lng data", sLAddress);
  }, [sLAddress]);

  const handleAddLocationClick = () => {
    resetFormLocation();
  };

  const [sLSubmitClicked, setSLSubmitClicked] = useState(false);
  // const [emptyAddress, setEmptyAddress] = useState(false);

  const formikAddService = useFormik({
    initialValues: serviceFromInitialValue,
    // validationSchema: ServiceValidation,

    onSubmit: async (values, action) => {
      setSLSubmitClicked(true);
      console.log("Form value", values);

      const CId = idParam;
      const updatedValues = {
        ...values,
        CustomerId: CId,
        Address: sLAddress.Address,
        lat: sLAddress.lat,
        lng: sLAddress.lng,
      };

      console.log("service location payload is", updatedValues);

      // if (!sLAddress.Address) {
      //   setEmptyAddress(true);
      //   return;
      // }

      try {
        const response = await axios.post(
          `https://earthcoapi.yehtohoga.com/api/Customer/AddServiceLocation`,
          updatedValues,
          { headers }
        );

        setSLAddress({});
        setOpenSnackBar(true);
        setSnackBarColor("success");
        setSnackBarText(response.data.Message);

        // Assuming that the response data has an ID that you want to append
        const serviceLocationWithId = {
          ...values, // spread the existing serviceLocations fields
          ServiceLocationId: response.data.Id, // add the new ID from the response
        };
        console.log("New service location to add:", serviceLocationWithId);

        // Find the index of the item to update in slForm
        const indexOfItemToUpdate = slForm.findIndex(
          (item) => item.ServiceLocationId === values.ServiceLocationId
        );

        if (indexOfItemToUpdate !== -1) {
          // Update the item at the found index
          setSlForm((prevObjects) => {
            const updatedSlForm = [...prevObjects];
            updatedSlForm[indexOfItemToUpdate] = serviceLocationWithId;
            console.log("Updated slForm:", updatedSlForm);
            return updatedSlForm;
          });
        } else {
          // Add the new item if it doesn't exist
          setSlForm((prevObjects) => [...prevObjects, serviceLocationWithId]);
        }

        getCustomerData();

        const closeButton = document.getElementById("closerLocation");
        if (closeButton) {
          closeButton.click();
        }

        action.resetForm();

        setTimeout(() => {
          setAddSLSuccess(false);
        }, 3000);
        setAddSLSuccess(true);

        console.log("successfully sent service locations", response.data.Id);
      } catch (error) {
        console.log("service locations Post error", error);
      }
    },
  });

  // const addServiceLocation = async (e) => {
  //   e.preventDefault();
  //   // Check if serviceLocations has data to add
  //   if (Object.keys(serviceLocations).length === 0) {
  //     alert("Service Locations data is empty");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(
  //       `https://earthcoapi.yehtohoga.com/api/Customer/AddServiceLocation`,
  //       serviceLocations,
  //       { headers }
  //     );

  //     // Assuming that the response data has an ID that you want to append
  //     const serviceLocationWithId = {
  //       ...serviceLocations, // spread the existing serviceLocations fields
  //       ServiceLocationId: response.data.Id, // add the new ID from the response
  //     };
  //     console.log("New service location to add:", serviceLocationWithId);
  //     // Update your form state with the new service location object that includes the response ID
  //     setSlForm((prevObjects) => {
  //       const updatedSlForm = [...prevObjects, serviceLocationWithId];
  //       console.log("Updated slForm:", updatedSlForm);
  //       return updatedSlForm;
  //     });

  //     // Reset serviceLocations state to clear the form or set it for a new entry
  //     setServiceLocations({
  //       Name: "",
  //       Address: "",
  //       Phone: "",
  //       AltPhone: "",
  //       isBilltoCustomer: null,
  //     });
  //     getCustomerData();
  //     setTimeout(() => {
  //       setAddSLSuccess(false);
  //     }, 3000);
  //     setAddSLSuccess(true);

  //     console.log("successfully sent service locations", response.data.Id);
  //   } catch (error) {
  //     console.log("service locations Post error", error);
  //   }
  // };

  const handleDelete = async (serviceLocationId) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/DeleteServiceLocation?id=${serviceLocationId}`,
        { headers }
      );
      const updatedSlForm = slForm.filter(
        (sl) => sl.ServiceLocationId !== serviceLocationId
      );
      setSlForm(updatedSlForm);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Successfully Deleted Service Location");
      console.log("successfully deleted service location", response);
    } catch (error) {
      console.log("error deleting service location", error);
    }
  };
  const updateSL = (serviceLocationId) => {
    console.log(serviceLocationId);
    const updatedSlForm = slForm.filter(
      (sl) => sl.ServiceLocationId !== serviceLocationId
    );
    setSlForm(updatedSlForm);
    console.log(updatedSlForm);
  };

  // const isFormInvalid = () => {
  //   // Check if any of these fields are empty or in the case of isBilltoCustomer, undefined
  //   return (
  //     !serviceLocations.Name ||
  //     !serviceLocations.Address ||
  //     !serviceLocations.Phone ||
  //     serviceLocations.isBilltoCustomer === undefined
  //   ); // Explicitly check for undefined
  // };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    formikAddService.handleChange(e);
    formikAddService.setFieldValue(name, value);
  };

  useEffect(() => {
    //console.log("Service Locations in useEffect:", serviceLocations);
    formikAddService.setValues({
      Name: serviceLocations.Name,
      Address: serviceLocations.Address,
      Phone: serviceLocations.Phone,
      AltPhone: serviceLocations.AltPhone,
      isBilltoCustomer: serviceLocations.isBilltoCustomer,
      ServiceLocationId: serviceLocations.ServiceLocationId,
    });
  }, [serviceLocations]);

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div style={{ zIndex: "100" }} className="modal fade " id="basicModal2">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={formikAddService.handleSubmit}>
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
                    <label className="col-sm-3 col-form-label">
                      Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="Name"
                        onChange={formikAddService.handleChange}
                        className="form-control"
                        placeholder="Name"
                        value={formikAddService.values.Name}
                        onBlur={formikAddService.handleBlur}
                        //required
                      />
                      {formikAddService.errors.Name &&
                      formikAddService.touched.Name ? (
                        <small style={{ color: "red" }}>
                          {formikAddService.errors.Name}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                      Bill To<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <div className="row">
                        <div className="col-5">
                          <input
                            className="form-check-input radio-margin-top"
                            type="radio"
                            name="isBilltoCustomer"
                            id="inlineRadio11"
                            onChange={handleRadioChange}
                            onBlur={formikAddService.handleBlur}
                            value={true}
                            // checked={
                            //   serviceLocations.isBilltoCustomer === true
                            // }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio11"
                          >
                            Customer
                          </label>
                        </div>
                        <div className="col-7">
                          <input
                            className="form-check-input radio-margin-top"
                            type="radio"
                            name="isBilltoCustomer"
                            id="inlineRadio22"
                            onChange={handleRadioChange}
                            onBlur={formikAddService.handleBlur}
                            value={false}
                            // checked={
                            //   serviceLocations.isBilltoCustomer ===
                            //   false
                            // }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio22"
                          >
                            This service Location
                          </label>
                        </div>
                      </div>
                      {formikAddService.errors.isBilltoCustomer &&
                      formikAddService.touched.isBilltoCustomer ? (
                        <small style={{ color: "red" }}>
                          {formikAddService.errors.isBilltoCustomer}
                        </small>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                      Address<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      {/* <MapCo
                        setSLAddress={setSLAddress}
                        sLAddress={sLAddress}
                      /> */}

                      <SLAddress
                       address={formikAddService.values.Address}
                       name="Address"
                       handleChange={formikAddService.handleChange}
                       setSLAddress={setSLAddress}
                      />

                      {/* <input
                        type="text"
                        onChange={formikAddService.handleChange}
                        name="Address"
                        value={formikAddService.values.Address}
                        className="form-control"
                        placeholder="Address"
                        onBlur={formikAddService.handleBlur}
                      /> */}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                      Phone<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        onChange={formikAddService.handleChange}
                        value={formikAddService.values.Phone}
                        name="Phone"
                        className="form-control"
                        placeholder="Phone"
                        onBlur={formikAddService.handleBlur}
                      />
                      {formikAddService.errors.Phone &&
                      formikAddService.touched.Phone ? (
                        <small style={{ color: "red" }}>
                          {formikAddService.errors.Phone}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Alt Phone</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="AltPhone"
                        onChange={formikAddService.handleChange}
                        value={formikAddService.values.AltPhone}
                        className="form-control"
                        placeholder="Alt Phone"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="closerLocation"
                  className="btn btn-danger light"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    getCustomerData();
                    setSLAddress({});
                    setServiceLocations({
                      Name: "",
                      Address: "",
                      Phone: "",
                      AltPhone: "",
                      isBilltoCustomer: null,
                    });
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  //data-bs-dismiss="modal"
                  // onClick={addServiceLocation}
                  // disabled={isFormInvalid()}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
        <div className="card">
          <div className="">
            <h4 className="modal-title itemtitleBar" id="#gridSystemModal">
              Service Locations
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4 text-end">
                {" "}
                <button
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal2"
                  style={{ margin: "0px 20px 12px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddLocationClick();
                  }}
                >
                  + Add Service Locations
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
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Alt Phone</th>
                            <th>Bill to Customer</th>
                            <th className="actions-head">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {slForm.map((slData, index) => (
                            <tr key={slData.ServiceLocationId}>
                              <td>{slData.ServiceLocationId}</td>
                              <td>{slData.Name}</td>
                              <td>{slData.Address}</td>
                              <td>{slData.Phone}</td>
                              <td>{slData.AltPhone}</td>
                              <td>
                                {slData.isBilltoCustomer
                                  ? "Customer"
                                  : "Service Location"}
                              </td>

                              <td
                                className="contact-actions"
                                style={{ cursor: "pointer" }}
                              >
                                <Create
                                  className="custom-create-icon"
                                  data-bs-toggle="modal"
                                  data-bs-target="#basicModal2"
                                  onClick={() => {
                                    console.log("sl data", slData);
                                    setSLAddress((prevData) => ({
                                      ...prevData,
                                      Address: slData.Address,
                                      lat: slData.lat,
                                      lng: slData.lng,
                                    }));
                                    setServiceLocations(slData);
                                    updateSL(slData.ServiceLocationId);
                                  }}
                                ></Create>
                                {/* <Delete
                                          color="error"
                                          onClick={() =>
                                            handleDelete(
                                              slData.ServiceLocationId
                                            )
                                          }
                                        ></Delete> */}
                                <Button
                                  color="error"
                                  className="delete-button"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#sLDeleteModal${slData.ServiceLocationId}`}
                                >
                                  <Delete />
                                </Button>
                              </td>
                              <div
                                className="modal fade"
                                id={`sLDeleteModal${slData.ServiceLocationId}`}
                                tabIndex="-1"
                                aria-labelledby="deleteModalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title">
                                        Are you sure you want to delete{" "}
                                        {slData.Name}?
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
                                        >
                                          Close
                                        </button>
                                        <button
                                          className="btn btn-primary m-3"
                                          data-bs-dismiss="modal"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete(
                                              slData.ServiceLocationId
                                            );
                                          }}
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
   
    </>
  );
};

export default ServiceLocations;

import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AdressModal from "../Modals/AdressModal";
import { Create, Delete, Update } from "@mui/icons-material";

import { Button } from "@mui/material";

import { useFormik } from "formik";
import { ServiceValidation, ValidationCustomer } from "./ValidationCustomer";

import Cookies from "js-cookie";

import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import SLAddress from "./CustomerAddress/SLAddress";

const ServiceLocations = ({
  customerId,
  fetchCustomers,
  fetchServiceLocations,
}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };


  const [serviceLocations, setServiceLocations] = useState({});


  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [sLAddress, setSLAddress] = useState({});

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

      const CId = customerId;
      const updatedValues = {
        ...values,
        CustomerId: CId,
        Address: sLAddress.Address,
        lat: sLAddress.lat,
        lng: sLAddress.lng,
      };

      console.log("service location payload is", updatedValues);

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
        fetchCustomers();
        fetchServiceLocations(CId);

        // Assuming that the response data has an ID that you want to append
        const serviceLocationWithId = {
          ...values, // spread the existing serviceLocations fields
          ServiceLocationId: response.data.Id, // add the new ID from the response
        };
        console.log("New service location to add:", serviceLocationWithId);

        const closeButton = document.getElementById("closerLocation");
        if (closeButton) {
          closeButton.click();
        }

        action.resetForm();

        console.log("successfully sent service locations", response.data.Id);
      } catch (error) {
        console.log("service locations Post error", error);
      }
    },
  });

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

      <span
        style={{ cursor: "pointer", color: "blue" }}
        data-bs-toggle="modal"
        data-bs-target="#basicModal2"
        onClick={(e) => {
          e.preventDefault();
          handleAddLocationClick();
        }}
      >
        + Add
      </span>
    </>
  );
};

export default ServiceLocations;

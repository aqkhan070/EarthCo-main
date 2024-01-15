import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import validator from "validator";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import EventPopups from "../Reusable/EventPopups";
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

  const [formData, setFormData] = useState({});

  const [submitClicked, setSubmitClicked] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [sLAddress, setSLAddress] = useState({});

  const handleSubmit = async () => {
    setSubmitClicked(true);

    const CId = customerId;
    const updatedValues = {
      ...formData,
      CustomerId: CId,
      Name: sLAddress.Address,
      Address: sLAddress.Address,
      lat: sLAddress.lat,
      lng: sLAddress.lng,
    };

    console.log("Sl payload izzzz", updatedValues);

    if (!updatedValues.Name || !updatedValues.Address) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      console.log("check2 ");

      return; // Return early if any required field is empty
    }

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Customer/AddServiceLocation",
        updatedValues,
        {
          headers,
        }
      );

      setSLAddress({});
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      fetchCustomers();
      fetchServiceLocations(customerId);

      const closeButton = document.getElementById("closerLocation");
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
      [name]: value,

      lat: sLAddress.lat,
      lng: sLAddress.lng,
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
      <div style={{ zIndex: "100" }} className="modal fade " id="basicModal2">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
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
                    Address<span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-9">
                    <SLAddress
                      address={formData.Address}
                      name="Address"
                      handleChange={handleChange}
                      setSLAddress={setSLAddress}
                      addressValue={formData}
                      emptyerror={submitClicked && !formData.Address}
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
                  setSubmitClicked(false);
                  setSLAddress({}); // Resetting SLAddress
                  setFormData({
                    // Resetting formData
                    Name: "",
                    Address: "",
                    Phone: "",
                    AltPhone: "",
                    isBilltoCustomer: null,
                    ServiceLocationId: null,
                  });
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                //data-bs-dismiss="modal"
                onClick={handleSubmit}
                // disabled={isFormInvalid()}
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
        data-bs-target="#basicModal2"
        onClick={(e) => {
          e.preventDefault();
        }}
      ><strong>
        + Add</strong>
      </span>
    </>
  );
};

export default ServiceLocations;

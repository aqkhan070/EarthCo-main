import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import { Delete, Create } from "@mui/icons-material";

const AuditController = ({
  setAddSucces,
  idParam,
  toggleShowForm,
  fetchIrrigation,
}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [formData, setFormData] = useState({});
  const [addError, setAddError] = useState("");
  const [showAdditional, setShowAdditional] = useState(false);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const handleChange = (e) => {
    setEmptyFieldError(false);
    setDisableButton(false);
    const { name, value } = e.target;
    const parsedValue =
      name === "NumberofBrokenHeads" ||
      name === "NumberofBrokenLateralLines" ||
      name === "NumberofStation" ||
      name === "NumberofValves" ||
      name === "HowMany"
        ? parseInt(value, 10) // Use parseInt to parse as integers
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
      IrrigationAuditReportId: idParam,
    }));
    console.log("main payload is", formData);
  };

  const [controllerPhoto, setControllerPhoto] = useState(null);

  // Step 2: Create an event handler function
  const handleControllerphotoInputChange = (event) => {
    // Step 3: Access the selected file
    const file = event.target.files[0];

    // Step 4: Update the state with the selected file
    setControllerPhoto(file);
  };

  const [Photo, setPhoto] = useState(null);

  // Step 2: Create an event handler function
  const handlePhotoInputChange = (event) => {
    // Step 3: Access the selected file
    const file = event.target.files[0];

    // Step 4: Update the state with the selected file
    setPhoto(file);
  };

  const handleAdditionalFile = (index) => {
    // Create a copy of the Files array without the file to be deleted
    const updatedFiles = [...additionalFiles];
    updatedFiles.splice(index, 1);
    setAdditionalFiles(updatedFiles);
  };

  const [submitClicked, setSubmitClicked] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    if (!formData.ControllerName) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      setEmptyFieldError(true);
      return;
    }
    setDisableButton(true);

    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const IrrigationControllerData = {
      ...formData,
    };

    console.log("IrrigationControllerData:", IrrigationControllerData);
    // console.log("data:", data);

    postData.append(
      "IrrigationControllerAuditReportData",
      JSON.stringify(IrrigationControllerData)
    );

    if (Photo) {
      postData.append("Photo", Photo);
    }

    // Append selectedAfterFile if it exists
    if (controllerPhoto) {
      postData.append("ControllerPhoto", controllerPhoto);
    }

    additionalFiles.forEach((fileObj) => {
      postData.append("MorePhoto", fileObj);
    });

    console.log(JSON.stringify(IrrigationControllerData));

    submitData(postData);
  };

  // const appendFilesToFormData = (formData) => {
  //   Files.forEach((fileObj) => {
  //     formData.append("Files", fileObj.actualFile);
  //   });
  // };

  const trackAdditionalFile = (e) => {
   
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setAdditionalFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };

  const submitData = async (postData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
    };
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/IrrigationAuditReport/AddControllerAuditReport",
        postData,
        { headers }
      );
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      setDisableButton(false);

      setFormData({});
      fetchIrrigation(idParam);
      setTimeout(() => {
        setAddSucces("");
        toggleShowForm();
      }, 3000);

      setAddSucces(response.data.Message);
      document.getElementById("photo").value = "";
      document.getElementById("controllerPhoto").value = "";

      for (const entry of postData.entries()) {
        console.log(`FormData Entry - ${entry[0]}: ${entry[1]}`);
      }

      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {
      console.error("API Call Error:", error);
      setDisableButton(false);
      setAddError(error.response.data);
    }
  };

  return (
    <div className="card">
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="itemtitleBar">
        <h4>Controller Info</h4>
      </div>

      <div className="card-body">
        <div className="row ">
          <div className="col-sm-5 col-md-4 mb-3 ">
            <div className="col-md-12">
              <label className="form-label">
                Controller Name<span className="text-danger">*</span>
              </label>
            </div>
            <TextField
              type="text"
              size="small"
              className="form-control"
              name="ControllerName"
              onChange={handleChange}
              placeholder="Controller Make and Model"
              error={submitClicked && !formData.ControllerName}
            />
          </div>
          <div className="col-sm-5 col-md-4 mb-3 ">
            <div className="col-md-12">
              <label className="form-label">Photo of Controller</label>
            </div>
            <input
              type="file"
              id="controllerPhoto"
              className="form-control"
              placeholder="Created"
              onChange={handleControllerphotoInputChange}
            />
          </div>
          <div className="col-sm-5 col-md-4 mb-3 ">
            <div className="col-md-12">
              <label className="form-label">Broken Valves?</label>
            </div>
            <div className="col-md-12 yesNoBtns">
              <button
                type="button"
                className={`btn light col-md-4 YNbtn1 ${
                  formData.BrokenValve == true && "btn-primary"
                }`}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    BrokenValve: true,
                  }));
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className={`btn light col-md-4  YNbtn1 ${
                  formData.BrokenValve == false && "btn-primary"
                }`}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    BrokenValve: false,
                  }));
                }}
              >
                No
              </button>
            </div>
          </div>
          <div className="col-sm-5 col-md-4 mb-3 ">
            <div className="col-md-12">
              <label className="form-label">How Many?</label>
            </div>
            <input
              type="number"
              name="HowMany"
              onChange={handleChange}
              className="form-control"
              placeholder=""
            />
          </div>
          <div className="col-sm-5 col-md-4 mb-3 ">
            <div className="col-md-12">
              <label className="form-label">Photo</label>
            </div>
            <input
              type="file"
              id="photo"
              className="form-control"
              onChange={handlePhotoInputChange}
              placeholder="Capture Photo"
            />
          </div>
          <div className="col-sm-5 col-md-4 mb-3 ">
            <div className="col-md-12">
              <label className="form-label">Broken Latrals?</label>
            </div>
            <div className="col-md-12 yesNoBtns">
              <button
                type="button"
                className={`btn light col-md-4 YNbtn1 ${
                  formData.BrokenLaterals == true && "btn-primary"
                }`}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    BrokenLaterals: true,
                  }));
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className={`btn light col-md-4  YNbtn1 ${
                  formData.BrokenLaterals == false && "btn-primary"
                }`}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    BrokenLaterals: false,
                  }));
                }}
              >
                No
              </button>
            </div>
          </div>
          <div className="col-sm-5 col-md-4 mb-3 ">
            <div className="col-md-12">
              <label className="form-label">
                Repair Made or Needed / Recommmendations
              </label>
            </div>
            <div className="col-md-12">
              <textarea
                name="RepairMadeOrNeeded"
                onChange={handleChange}
                className="form-txtarea form-control"
                rows="4"
                id="comment"
              ></textarea>
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-sm-5 col-md-4 mb-3 ">
            <div className="col-md-12">
              <label className="form-label">Broken Heads?</label>
            </div>
            <div className="col-md-12 yesNoBtns">
              <button
                type="button"
                className={`btn light col-md-4 YNbtn1 ${
                  formData.BrokenHeads == true && "btn-primary"
                }`}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    BrokenHeads: true,
                  }));
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className={`btn light col-md-4  YNbtn1 ${
                  formData.BrokenHeads == false && "btn-primary"
                }`}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    BrokenHeads: false,
                  }));
                }}
              >
                No
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row my-2">
              <div className="col-md-1 pe-0 text-end mt-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Didyoucheckirrigationclock"
                  value={showAdditional}
                  checked={showAdditional}
                  onChange={() => {
                    setShowAdditional(!showAdditional);
                    setAdditionalFiles([]);
                  }}
                />
              </div>{" "}
              <div className="col-md-11  mt-2">
                <h5>More Photos</h5>
              </div>
              {showAdditional ? (
                <div className="row mt-3 ">
                  <div className="col-md-12">
                    <div className="basic-form">
                      <h4>Additional Photos(up to 10)</h4>
                      <div className="dz-default dlab-message upload-img mb-3">
                        <form action="#" className="dropzone">
                          <svg
                            width="41"
                            height="40"
                            viewBox="0 0 41 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                              stroke="#DADADA"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M20.5 20V35"
                              stroke="#DADADA"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                              stroke="#DADADA"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                              stroke="#DADADA"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <div className="fallback mb-3">
                            <input
                              name="file"
                              type="file"
                              onChange={trackAdditionalFile}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {additionalFiles.map((file, index) => (
            <div
              key={index}
              className="col-md-2  mt-5  image-container"
              style={{
                width: "150px", // Set the desired width
                height: "120px", // Set the desired height
                margin: "1em",
                position: "relative",
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{
                  width: "150px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
              <p
                className="file-name-overlay"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "13px",
                  right: "0",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  textAlign: "center",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  width: "100%",
                  textOverflow: "ellipsis",
                  padding: "5px",
                }}
              >
                {file.name}
              </p>
              <span
                className="file-delete-button"
                style={{
                  left: "140px",
                }}
                onClick={() => {
                  handleAdditionalFile(index);
                }}
              >
                <span>
                  <Delete color="error" />
                </span>
              </span>
            </div>
          ))}{" "}
        </div>
        <div className="row ">
          <div className="col-md-8">
            {/* {addError && <Alert severity="error">{addError}</Alert>}
              {emptyFieldError && (
                <Alert severity="error">Please fill all required fields</Alert>
              )} */}
          </div>
          <div className=" col-md-4 mb-3 text-right">
            <LoaderButton loading={disableButton} handleSubmit={handleSubmit}>
              Add
            </LoaderButton>{" "}
            <button
              onClick={toggleShowForm}
              type="button"
              className="btn btn-danger light me-1"
            >
              Clear
            </button>
            {/* <button
                type="button"
                className="btn btn-primary me-1"
                onClick={handleSubmit}
              >
                Add
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditController;

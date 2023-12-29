import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import useCustomerSearch from "../Hooks/useCustomerSearch";
import { Delete, Create } from "@mui/icons-material";
import { useNavigate } from "react-router";
import axios from "axios";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import TitleBar from "../TitleBar";

const AddPLPhotoOnly = () => {
  const icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.634 13.4211C18.634 16.7009 16.7007 18.6342 13.4209 18.6342H6.28738C2.99929 18.6342 1.06238 16.7009 1.06238 13.4211V6.27109C1.06238 2.99584 2.26688 1.06259 5.54763 1.06259H7.38096C8.03913 1.06351 8.65879 1.37242 9.05296 1.89951L9.88988 3.01234C10.2859 3.53851 10.9055 3.84834 11.5637 3.84926H14.1579C17.446 3.84926 18.6596 5.52309 18.6596 8.86984L18.634 13.4211Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M5.85754 12.2577H13.8646"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const navigate = useNavigate();
  const { name, setName, fetchName } = useFetchCustomerName();
  const { customerSearch, fetchCustomers } = useCustomerSearch();
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const [formData, setFormData] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [Files, setFiles] = useState([]);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [moreFiles, setMoreFiles] = useState([]);
  const [showAdditional, setShowAdditional] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const handleCustomerAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "CustomerId",
        value: newValue ? newValue.UserId : "",
      },
    };
    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (e, newValue) => {
    const { name, value } = e.target;

    setSelectedCustomer(newValue);

    const adjustedValue = [
      "UserId",
      "ServiceLocationId",
      "ContactId",
      "Qty",
      "Rate",
      "EstimateStatusId",
      "RequestedBy",
    ].includes(name)
      ? Number(value)
      : value;

    setFormData((prevData) => ({ ...prevData, [name]: adjustedValue }));
  };
  const handleDeleteFile = (index) => {
    // Create a copy of the Files array without the file to be deleted
    const updatedFiles = [...Files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const handleAdditionalFile = (index) => {
    // Create a copy of the Files array without the file to be deleted
    const updatedFiles = [...additionalFiles];
    updatedFiles.splice(index, 1);
    setAdditionalFiles(updatedFiles);
  };
  const handleMoreFile = (index) => {
    // Create a copy of the Files array without the file to be deleted
    const updatedFiles = [...Files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const trackFile = (e) => {
    if (Files.length >= 10) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("You can add file upto 10");
      return;
    }
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };

  const trackAdditionalFile = (e) => {
    if (additionalFiles.length >= 10) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("You can add file upto 10");
      return;
    }
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setAdditionalFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };

  const trackMoreFile = (e) => {
    if (moreFiles.length >= 10) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("You can add file upto 10");
      return;
    }
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setMoreFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };

  const handleSubmit = () => {
    setSubmitClicked(true);
    if (!formData.CustomerId) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      return;
    }

    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const WeeklyReportData = {
      ...formData,
      CustomerName: name,
    };

    console.log("PunchlistPhotoOnlyData:", WeeklyReportData);
    // console.log("data:", data);

    postData.append("PunchlistPhotoOnlyData", JSON.stringify(WeeklyReportData));
    console.log(JSON.stringify(WeeklyReportData));
    // Appending files to postData
    Files.forEach((fileObj) => {
      postData.append("Photos", fileObj);
    });
    additionalFiles.forEach((fileObj) => {
      postData.append("AdditionalPhotos", fileObj);
    });
    //   moreFiles.forEach((fileObj) => {
    //     postData.append("Photos", fileObj);
    //   });

    submitData(postData);
  };

  // const appendFilesToFormData = (formData) => {
  //   Files.forEach((fileObj) => {
  //     formData.append("Files", fileObj.actualFile);
  //   });
  // };

  const submitData = async (postData) => {
    setDisableButton(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
    };
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/PunchlistPhotoOnly/AddPunchlistPhotoOnly",
        postData,
        {
          headers,
        }
      );

      setTimeout(() => {
        navigate(`/punchList-photos-only`);
      }, 4000);
      setDisableButton(false);

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);

      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {
      console.error("API Call Error:", error);
      setDisableButton(false);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("error Adding Weekly Report Rising-canes");
    }

    // Logging FormData contents (for debugging purposes)
    for (let [key, value] of postData.entries()) {
      console.log("fpayload....", key, value);
    }
    // window.location.reload();

    // console.log("post data izzz",postData);
  };

  useEffect(() => {
    fetchName(formData.CustomerId);
  }, [formData.CustomerId]);

  return (
    <>
      <TitleBar icon={icon} title="Punchlist - Photos Only" />
      <div className="container-fluid">
        <EventPopups
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          color={snackBarColor}
          text={snackBarText}
        />
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">
                  Customers<span className="text-danger">*</span>
                </label>
                <Autocomplete
                  id="staff-autocomplete"
                  size="small"
                  options={customerSearch}
                  getOptionLabel={(option) => option.CompanyName || ""}
                  value={name ? { CompanyName: name } : null}
                  onChange={handleCustomerAutocompleteChange}
                  isOptionEqualToValue={(option, value) =>
                    option.UserId === value.CustomerId
                  }
                  renderOption={(props, option) => (
                    <li {...props}>
                      <div className="customer-dd-border">
                        <h6> {option.CompanyName}</h6>
                        <small># {option.UserId}</small>
                      </div>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      onClick={() => {
                        setName("");
                      }}
                      onChange={(e) => {
                        fetchCustomers(e.target.value);
                      }}
                      placeholder="Choose..."
                      error={submitClicked && !formData.CustomerId}
                      className="bg-white"
                    />
                  )}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Notes (optional)</label>
                <div className="mb-3">
                  <textarea
                    placeholder=" Notes"
                    value={formData.Notes}
                    name="Notes"
                    onChange={handleInputChange}
                    className=" form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
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
                    <h5>Additional Photos Needed</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mt-3 ">
                  <div className="col-md-12 col-lg-12">
                    <div className="basic-form">
                      <h4>Photos(up to 10)</h4>
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
                              onChange={trackFile}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {Files.map((file, index) => (
                    <div
                      key={index}
                      className="col-md-4  mt-3 image-container"
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
                          handleDeleteFile(index);
                        }}
                      >
                        <span>
                          <Delete color="error" />
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
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

                    {additionalFiles.map((file, index) => (
                      <div
                        key={index}
                        className="col-md-4  mt-3 image-container"
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
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* <div className="row">
            <div className="col-md-1 pe-0 text-end mt-1">
              <input
                type="checkbox"
                className="form-check-input"
                name="Didyoucheckirrigationclock"
                value={showMore}
                checked={showMore}
                onChange={() => {
                  setShowMore(!showMore);
                  setMoreFiles([]);
                }}
              />
            </div>{" "}
            <div className="col-md-11  mt-2">
              <h5>Additional Photos Needed</h5>
            </div>
          </div>
          {showMore ? (
            <div className="row mt-3 ">
              <div className="col-md-4 col-lg-4">
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
                          onChange={trackMoreFile}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {moreFiles.map((file, index) => (
                <div
                  key={index}
                  className="col-md-2 col-md-2 mt-3 image-container"
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
                      handleMoreFile(index);
                    }}
                  >
                    <span>
                      <Delete color="error" />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )} */}

            <div className="row">
              <div className="col-md-12 text-end">
                <button
                  className="btn btn-danger light me-2"
                  onClick={() => {
                    navigate(`/punchList-photos-only`);
                  }}
                >
                  Cancel
                </button>
                <LoaderButton
                  loading={disableButton}
                  handleSubmit={handleSubmit}
                >
                  Save
                </LoaderButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPLPhotoOnly;

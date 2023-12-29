import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import EventPopups from "../Reusable/EventPopups";
import { Delete, Create } from "@mui/icons-material";
import Cookies from "js-cookie";
import LoaderButton from "../Reusable/LoaderButton";
import ReactQuill from "react-quill"; // Import the rich text editor component
import "react-quill/dist/quill.snow.css"; // Import styles for the rich text editor
import axios from "axios";

const SendMail = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const title = queryParams.get("title");
  const mail = queryParams.get("mail");
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [Files, setFiles] = useState([]);
  const [CCInput, setCCInput] = useState("");
  const [CCs, setCCs] = useState([]);
  const [editorContent, setEditorContent] = useState("");

  const [disableButton, setDisableButton] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
    setDisableButton(false);
  };
  const handleEditorChange = (value) => {
    setEditorContent(value);
    setDisableButton(false);
  };

  const handleEmailInputKeyPress = (event) => {
    if (event.key === "Enter" && emailInput.trim() !== "") {
      setEmails([...emails, emailInput.trim()]);
      setEmailInput("");
      setDisableButton(false);
    }
  };
  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleCCInputChange = (event) => {
    setCCInput(event.target.value);
    setDisableButton(false);
  };

  const handleCCInputKeyPress = (event) => {
    if (event.key === "Enter" && CCInput.trim() !== "") {
      setCCs((prevCCs) => [...prevCCs, CCInput.trim()]);
      setCCInput("");
      setDisableButton(false);
    }
  };
  const handleRemoveCC = (CCToRemove) => {
    setCCs(CCs.filter((CC) => CC !== CCToRemove));
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };
  const handleDeleteFile = (index) => {
    // Create a copy of the Files array without the file to be deleted
    const updatedFiles = [...Files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const [subject, setSubject] = useState(title);

  const handleSubmit = () => {
    const postData = new FormData();

    // Merge the current items with the new items for EmailData
    const mergedEmailData = {
      Email: emails.join(","),
      CCEmail: CCs.join(","),
      Subject: subject,
      Body: editorContent,
    };

    console.log("mergedEmailData:", mergedEmailData);

    postData.append("EmailData", JSON.stringify(mergedEmailData));
    console.log(JSON.stringify(mergedEmailData));
    // Appending files to postData
    Files.forEach((fileObj) => {
      postData.append("Files", fileObj);
    });

    submitData(postData);
  };

  const submitData = async (postData) => {
    setDisableButton(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
    };
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Email/SendEmailWithFile",
        postData,
        {
          headers,
        }
      );

      setDisableButton(false);

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data);
      console.log("successfull api call", response.data);
    } catch (error) {
      console.error("API Call Error:", error);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setDisableButton(false);
      setSnackBarText(error.response.data);
    }

    // Logging FormData contents (for debugging purposes)
    for (let [key, value] of postData.entries()) {
      console.log("fpayload....", key, value);
    }
  };

  useEffect(() => {
    if (mail) {
      setEmails([...emails, mail]);
    }
  }, []);

  return (
    <div className="container-fluid">
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="card">
        <div className="card-header">
          <h4>Email {title}</h4>
        </div>
        <div className="card-body ">
          <div className="row text-center">
            <div className="col-md-2">
              {" "}
              <label className="form-label">To</label>
            </div>
            <div className="col-md-8">
              <TextField
                fullWidth
                variant="outlined"
                label=""
                size="small"
                value={emailInput}
                onChange={handleEmailInputChange}
                onKeyPress={handleEmailInputKeyPress}
                InputProps={{
                  startAdornment: emails.map((email) => (
                    <Chip
                      key={email}
                      label={email}
                      size="small"
                      onDelete={() => handleRemoveEmail(email)}
                      color="primary"
                    />
                  )),
                }}
                placeholder="Enter email and press Enter"
              />
            </div>
          </div>

          <div className="row mt-2 text-center">
            <div className="col-md-2">
              {" "}
              <label className="form-label">Cc</label>
            </div>
            <div className="col-md-8">
              <TextField
                fullWidth
                variant="outlined"
                label=""
                size="small"
                value={CCInput}
                onChange={handleCCInputChange}
                onKeyPress={handleCCInputKeyPress}
                InputProps={{
                  startAdornment: CCs.map((CC) => (
                    <Chip
                      key={CC}
                      label={CC}
                      size="small"
                      onDelete={() => handleRemoveCC(CC)}
                      color="primary"
                    />
                  )),
                }}
                placeholder="Enter CC and press Enter"
              />
            </div>
          </div>

          <div className="row mt-2 text-center">
            <div className="col-md-2">
              <label className="form-label">Subject</label>
            </div>
            <div className="col-md-8">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Proposal for"
                label=""
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>

            <div className="row mt-2">
              <div className="col-md-2">
                <label className="form-label">Attachments</label>
              </div>
              <div className="col-md-4">
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
                      <input name="file" type="file" onChange={trackFile} />
                    </div>
                  </form>
                </div>
              </div>
              {Files.map((file, index) => (
                <div
                  key={index}
                  className="col-md-2 mt-3 image-container"
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

            <div className="row mt-2">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <ReactQuill
                  value={editorContent}
                  onChange={handleEditorChange}
                  placeholder="Write your message here..."
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-end">
              {" "}
              <LoaderButton
                disable={btnDisable}
                loading={disableButton}
                handleSubmit={() => {
                  handleSubmit();
                }}
              >
                Send
              </LoaderButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMail;

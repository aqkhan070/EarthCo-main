import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import EventPopups from "../Reusable/EventPopups";
import { Delete, Create } from "@mui/icons-material";
import Cookies from "js-cookie";
import LoaderButton from "../Reusable/LoaderButton";
import ReactQuill from "react-quill"; // Import the rich text editor component
import "react-quill/dist/quill.snow.css"; // Import styles for the rich text editor
import axios from "axios";
import { DataContext } from "../../context/AppData";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import BackButton from "../Reusable/BackButton";
import CustomizedTooltips from "../Reusable/CustomizedTooltips";

const SendMail = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const title = queryParams.get("title");
  const mail = queryParams.get("mail");
  const customer = queryParams.get("customer");
  const number = queryParams.get("number");
  const isOpen = queryParams.get("isOpen");
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { selectedImages, setSelectedImages, loggedInUser } =
    useContext(DataContext);

  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [Files, setFiles] = useState([]);
  const [CCInput, setCCInput] = useState("");
  const [CCs, setCCs] = useState([]);

  const [editorContent, setEditorContent] = useState(
    `Dear  ${
      customer ? customer : ""
    } <br>Your ${title} has been created against ${title} number:${
      number ? number : ""
    }. We understand the importance of creating a beautiful and sustainable environment for your commercial space, and we are committed to delivering exceptional landscaping services that meet your unique needs.<br>Our dedicated team of experts is here to ensure that your landscaping dreams come to life, making your property not only aesthetically pleasing but also environmentally responsible.<br>Should you have any questions or require further assistance, please do not hesitate to contact our friendly customer support team. <br>Best Reguards <br>EarthCo Comercial Landscape`
  );
  const [subject, setSubject] = useState(
    `${customer} ${title} #${number} is ${"" + isOpen}`
  );

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

  const handleSubmit = () => {
    const postData = new FormData();

    const filePathsArray = selectedImages.map((image) => image.FilePath);

    // Merge the current items with the new items for EmailData
    const mergedEmailData = {
      Email: emails.join(","),
      CCEmail: CCs.join(","),
      Subject: subject,
      ReplyTo: loggedInUser.userEmail,
      ReplyToName: loggedInUser.userName,
      Body: editorContent,
      FilePaths: filePathsArray,
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

  const handleDeleteImage = (indexToDelete) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(indexToDelete, 1);
    setSelectedImages(updatedImages);
  };

  useEffect(() => {
    if (mail) {
      setEmails([...emails, mail]);
    }
    if (!number) {
      setEditorContent(``);
    }

    if (title == `Invoice`) {
      setEditorContent(`<p>
      
      
        <strong>Dear  ${customer ? customer : ""}</strong>,<br />
      
      Please find your invoice attached.
      <br />
        If there are any questions with this invoice(s) please feel free to contact
        me. If not please remit payment at your earliest convenience.
      <br />
      We appreciate your immediate attention to this matter.
      *Please send payments to 1225 E. Wakeham, Santa Ana, CA 92705
      *Please send service requests to service@earthcompany.org
      
        <br />
      
       Regards, <br />
       Yisel Ferreyra, <br />
       Accounts Receivable <br />
       ${loggedInUser.CompanyName} <br />
       O 714.571.0455 F <br />
       714.571.0580 <br />
    </p>`);

      setSubject(`Invoice #${number} for ${customer}`);
    }

    if (title == `Service Request` && isOpen == "Open") {
      setEditorContent(`<p>
      <strong>Dear ${
        customer ? customer : ""
      }</strong>, <br/><br/>Thank you for submitting your submitting your Service Request. We have processed your request, and have listed some important information attached to this e-mail.
      <br/><br/>If you have any additional questions or concerns, please contact us at ${
        loggedInUser.userEmail
      }. You can also reach us by telephone at 714.571.0455.
      <br/><br/>Thank you for choosing Earthco.
      <br/><br/>Sincerely,<br/>${loggedInUser.userName},</p>`);
    }
    if (title == `Service Request` && isOpen == "Closed") {
      setEditorContent(`   <p>
      <strong>Dear ${
         customer ? customer : ""
       },</strong> <br/><br/>The following Service Request - #${number} has been Closed.  We have completed your request, and have listed some important information attached to this e-mail.
       <br/><br/>If you have any additional questions or concerns, please contact us at ${
         loggedInUser.userEmail
       }. You can also reach us by telephone at 714.571.0455.
       <br/><br/>Thank you for choosing Earthco.
       <br/><br/>Sincerely,
       <br/>${loggedInUser.userName},</p>`);
    }
    if (title == `Estimate`) {
      setEditorContent(`<p>Hello ${customer ? customer : ""},
        <br/><br/>Please see the attached proposal.  Please confirm receipt.
        <br/><br/>Contact me if you have any questions.
        <br/><br/>Thank you!<br/><br/> 
        
        <br/>${loggedInUser.userName}
        <br/>EarthCo`);
  
        setSubject(`Proposal ${number} for ${customer}
        `);
    }

    return () => {
      setSelectedImages([]);
    };
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
          <h4>
            Email {title} #{number}
          </h4>
        </div>
        <div className="card-body ">
          <div className="row text-center">
            <div className="col-md-1"></div>
            <div className="col-md-1 text-start">
              {" "}
              <label className="form-label">To</label>
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                variant="standard"
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
            <div className="col-md-1"></div>
            <div className="col-md-1 text-start">
              {" "}
              <label className="form-label">Cc</label>
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                variant="standard"
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
            <div className="col-md-1"></div>

            <div className="col-md-1 text-start">
              <label className="form-label">Subject</label>
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                variant="standard"
                size="small"
                placeholder="Proposal for"
                label=""
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>

            <div className="row mt-2"></div>

            <div className="row mt-2">
              <div className="col-md-2 text-start"></div>
              <div className="col-md-8">
                <ReactQuill
                  className="text-start"
                  value={editorContent}
                  onChange={handleEditorChange}
                  placeholder="Write your message here..."
                  theme="snow"
                />
              </div>
              <div className="col-md-2 text-start"></div>
              <div className="col-md-2 text-start"></div>
              <div className="col-md-3 text-start mt-2">
              <CustomizedTooltips
                  title="Click To Attach Files"
                  placement="top"
                >
                  <AttachFileIcon
                    sx={{
                      fontSize: 23,
                      color: "black",
                      marginRight: "0.5em",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const fileInput = document.createElement("input");
                      fileInput.type = "file";
                      fileInput.multiple = true;
                      fileInput.click(); // Trigger the file input click event
                      fileInput.addEventListener("change", trackFile);
                    }}
                  />
                </CustomizedTooltips>
                {selectedImages.map((file, index) => (
                  <div className="card" style={{ height: "fit-content" }}>
                    <div
                      className="row g-0"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="col-md-4">
                        <img
                          src={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                          alt={file.name}
                          className="img-fluid rounded-start "
                        />
                      </div>
                      <div
                        className="col-md-6 ps-1"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {file.FileName}
                      </div>
                      <div className="col-md-2 text-end">
                        {" "}
                        <Delete
                          color="error"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleDeleteImage(index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {Files.map((file, index) => (
                  <div className="card" style={{ height: "fit-content" }}>
                    <div
                      className="row g-0"
                      style={{
                        display: "flex", // Add flex display
                        alignItems: "center", // Align items vertically in the middle
                      }}
                    >
                      <div className="col-md-4">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div
                        className="ps-1 col-md-6"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {file.name}
                      </div>
                      <div className="col-md-2 text-end">
                        {" "}
                        <Delete
                          color="error"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleDeleteFile(index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-5 text-end mt-3">
               
                <BackButton
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  Back
                </BackButton>
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
    </div>
  );
};

export default SendMail;

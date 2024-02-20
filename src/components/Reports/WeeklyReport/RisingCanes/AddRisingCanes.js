import React, { useEffect, useContext, useState } from "react";
import TitleBar from "../../../TitleBar";
import useCustomerSearch from "../../../Hooks/useCustomerSearch";
import useFetchCustomerName from "../../../Hooks/useFetchCustomerName";
import {
  Autocomplete,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import Cookies from "js-cookie";
import { Delete, Create } from "@mui/icons-material";
import axios from "axios";
import EventPopups from "../../../Reusable/EventPopups";
import { Print, Email, Download } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import formatDate from "../../../../custom/FormatDate";
import LoaderButton from "../../../Reusable/LoaderButton";
import Contacts from "../../../CommonComponents/Contacts";
import ServiceLocations from "../../../CommonComponents/ServiceLocations";
import { DataContext } from "../../../../context/AppData";
import CircularProgress from "@mui/material/CircularProgress";
import useDeleteFile from "../../../Hooks/useDeleteFile";
import useFetchContactEmail from "../../../Hooks/useFetchContactEmail";
import BackButton from "../../../Reusable/BackButton";
import FileUploadButton from "../../../Reusable/FileUploadButton";
import PrintButton from "../../../Reusable/PrintButton";

const AddRisingCanes = () => {
  const icon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5096 2.53165H7.41104C5.50437 2.52432 3.94146 4.04415 3.89654 5.9499V15.7701C3.85437 17.7071 5.38979 19.3121 7.32671 19.3552C7.35512 19.3552 7.38262 19.3561 7.41104 19.3552H14.7343C16.6538 19.2773 18.1663 17.6915 18.1525 15.7701V7.36798L13.5096 2.53165Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2688 2.52084V5.18742C13.2688 6.48909 14.3211 7.54417 15.6228 7.54784H18.1482"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0974 14.0786H8.1474"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2229 10.6388H8.14655"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const navigate = useNavigate();

  const { customerSearch, fetchCustomers } = useCustomerSearch();
  const { name, setName, fetchName } = useFetchCustomerName();
  const { deleteReportFile } = useDeleteFile();
  const { contactEmail, fetchEmail } = useFetchContactEmail();

  const { loggedInUser, setLoggedInUser } = useContext(DataContext);

  const [formData, setFormData] = useState({
    ReportForWeekOf: new Date().toISOString().substr(0, 10),
    StatusId: 1,
  });
  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [staffData, setStaffData] = useState([]);

  const [Files, setFiles] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [prevFiles, setPrevFiles] = useState([]);

  const [loading, setLoading] = useState(true);

  const getWeeklyPreview = async () => {
    if (!idParam) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/WeeklyReport/GetWeeklyReportRC?id=${idParam}`,
        { headers }
      );

      setFormData(res.data.Data);
      fetchEmail(res.data.Data.ContactId);
      setPrevFiles(res.data.FileData);
      setLoading(false);
      setSelectedContact({
        ...selectedContact,
        Email: res.data.Data.ContactEmail,
        CompanyName: res.data.Data.ContactCompany,
      });

      console.log("reponse weekly is", res.data);
    } catch (error) {
      setLoading(false);

      console.log("api call error", error);
    }
  };

  const fetchServiceLocations = async (id) => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerServiceLocation?id=${id}`,
        { headers }
      )
      .then((res) => {
        setSLList(res.data);
        console.log("service locations are", res.data);
      })
      .catch((error) => {
        setSLList([]);
        console.log("service locations fetch error", error);
      });
  };
  const [storeLocations, setStoreLocations] = useState([]);

  const fetchStoreLocations = async () => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/WeeklyReport/GetStoreLocationList`,
        { headers }
      )
      .then((res) => {
        console.log("store locations are", res.data);
        setStoreLocations(res.data);
      })
      .catch((error) => {
        console.log("store locations fetch error", error);
      });
  };

  const fetctContacts = async (id) => {
    if (!id) {
      return;
    }
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerContact?id=${id}`,
        { headers }
      )
      .then((res) => {
        console.log("contacts data isss", res.data);
        setContactList(res.data);
      })
      .catch((error) => {
        setContactList([]);
        console.log("contacts data fetch error", error);
      });
  };
  const fetchStaffList = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`,
        { headers }
      );
      setStaffData(response.data);

      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
    }
  };

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
  const handleSLAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "ServiceLocationId",
        value: newValue ? newValue.ServiceLocationId : "",
      },
    };

    handleInputChange(simulatedEvent);
  };

  const handleStoreAutocompleteChange = (event, newValue) => {
    const simulatedEvent = {
      target: {
        name: "StoreLocationId",
        value: newValue ? newValue.StoreLocationId : "",
      },
    };

    handleInputChange(simulatedEvent);
  };

  const handleContactAutocompleteChange = (event, newValue) => {
    console.log("contact", newValue);
    setSelectedContact(newValue);
    const simulatedEvent = {
      target: {
        name: "ContactId",
        value: newValue ? newValue.ContactId : "",
      },
    };

    handleInputChange(simulatedEvent);
  };

  const handleRBAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    const simulatedEvent = {
      target: {
        name: "RegionalManagerId",
        value: newValue ? newValue.UserId : "",
      },
    };

    // Assuming handleInputChange is defined somewhere within YourComponent
    // Call handleInputChange with the simulated event
    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (e, newValue) => {
    const { name, value, type, checked } = e.target;

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId
    const adjustedValue = [
      "UserId",
      "ServiceLocationId",
      "ContactId",
      "Nextweekrotation",
      "Thisweekrotation",
    ].includes(name)
      ? Number(value)
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : adjustedValue,
    }));

    // if (name === "UserId" && value != 0) {
    //   console.log(value);
    //   fetchServiceLocations(value);
    //   fetctContacts(value);
    // }
    console.log("Weakly payload", formData);
  };

  const handleDeleteFile = (index) => {
    // Create a copy of the Files array without the file to be deleted
    const updatedFiles = [...Files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // const newFile = {
      // actualFile: uploadedFile,
      // name: uploadedFile.name,
      // caption: uploadedFile.name,
      // date: new Date().toLocaleDateString(),
      // };
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };
  const [submitClicked, setSubmitClicked] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = () => {
    setSubmitClicked(true);
    if (
      !formData.CustomerId ||
      !formData.StoreLocationId ||
      !formData.ContactId ||
      !formData.RegionalManagerId
    ) {
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
      ContactName: selectedContact.FirstName,
      ContactCompany: selectedContact.CompanyName,
      ContactEmail: selectedContact.Email,
    };

    console.log("WeeklyReportData:", WeeklyReportData);
    // console.log("data:", data);

    postData.append("WeeklyReportRCData", JSON.stringify(WeeklyReportData));
    console.log(JSON.stringify(WeeklyReportData));
    // Appending files to postData
    Files.forEach((fileObj) => {
      postData.append("Files", fileObj);
    });

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
      "Content-Type": "multipart/form-data",
    };
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/WeeklyReport/AddWeeklyReportRC",
        postData,
        {
          headers,
        }
      );

      setTimeout(() => {
        navigate(`/weekly-reports/rising-canes-preview?id=${response.data.Id}`);
      }, 4000);
      setDisableButton(false);

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);

      console.log("Data submitted successfully:", response.data.Id);
    } catch (error) {
      console.error("API Call Error:", error);
      setDisableButton(false);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText(error.response.data);
    }

    // Logging FormData contents (for debugging purposes)
    for (let [key, value] of postData.entries()) {
      console.log("fpayload....", key, value);
    }
    // window.location.reload();

    // console.log("post data izzz",postData);
  };

  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    fetchName(formData.CustomerId);
    console.log("selected customer name iss......", name);
    console.log("main payload isss", formData);
  }, [formData.CustomerId]);

  useEffect(() => {
    fetchStaffList();
    getWeeklyPreview();
    fetchStoreLocations();
  }, []);

  return (
    <>
      <TitleBar icon={icon} title="Weekly Report- Rising Canes" />
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="container-fluid">
        {loading ? (
          <div className="center-loader">
            <CircularProgress />
          </div>
        ) : (
          <div className="card">
            <div className="card-body p-0 " style={{ position: "relative" }}>
              {loggedInUser.userRole !== "1" && (
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "200%",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    zIndex: 999,
                  }}
                ></div>
              )}
              <div className="row mx-2 mt-3">
                <div className="col-md-3">
                  <label className="form-label">
                    Customers <span className="text-danger">*</span>
                  </label>
                  <Autocomplete
                    id="staff-autocomplete"
                    size="small"
                    options={customerSearch}
                    getOptionLabel={(option) => option.FirstName || ""}
                    value={name ? { FirstName: name } : null}
                    onChange={handleCustomerAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.UserId === value.CustomerId
                    }
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div className="customer-dd-border">
                          <h6> {option.FirstName}</h6>
                          <small># {option.UserId}</small>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        onBlur={() => {
                          fetchName(formData.CustomerId);
                        }}
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

                <div className="col-md-3 ">
                  <div className="row">
                    <label className="form-label">
                      Store Location
                      <span className="text-danger">*</span>{" "}
                    </label>
                  </div>
                  <Autocomplete
                    id="inputState19"
                    size="small"
                    options={storeLocations}
                    getOptionLabel={(option) => option.Location || ""}
                    value={
                      storeLocations.find(
                        (customer) =>
                          customer.StoreLocationId === formData.StoreLocationId
                      ) || null
                    }
                    onChange={handleStoreAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.StoreLocationId === value.StoreLocationId
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Store Locations"
                        error={submitClicked && !formData.StoreLocationId}
                        className="bg-white"
                      />
                    )}
                    aria-label="Default select example"
                  />
                </div>

                {/* <div className="col-md-3 ">
                  <div className="row">
                    <div className="col-md-auto">
                      <label className="form-label">
                        Service Location
                        <span className="text-danger">*</span>{" "}
                      </label>
                    </div>
                    <div className="col-md-3">
                      {" "}
                      {formData.CustomerId ? (
                        <ServiceLocations
                          fetchServiceLocations={fetchServiceLocations}
                          fetchCustomers={fetchCustomers}
                          customerId={formData.CustomerId}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <Autocomplete
                    id="inputState19"
                    size="small"
                    options={sLList}
                    getOptionLabel={(option) => option.Name || ""}
                    value={
                      sLList.find(
                        (customer) =>
                          customer.ServiceLocationId ===
                          formData.ServiceLocationId
                      ) || null
                    }
                    onChange={handleSLAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.ServiceLocationId === value.ServiceLocationId
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Service Locations"
                        error={submitClicked && !formData.ServiceLocationId}
                        className="bg-white"
                      />
                    )}
                    aria-label="Default select example"
                  />
                </div> */}
                <div className="col-md-3 ">
                  <div className="row">
                    <div className="col-md-auto">
                      <label className="form-label">
                        Contact<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-md-3">
                      {" "}
                      {formData.CustomerId ? (
                        <Contacts
                          fetctContacts={fetctContacts}
                          fetchCustomers={fetchCustomers}
                          customerId={formData.CustomerId}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <Autocomplete
                    id="inputState299"
                    size="small"
                    options={contactList}
                    getOptionLabel={(option) => option.FirstName || ""}
                    value={
                      contactList.find(
                        (contact) => contact.ContactId === formData.ContactId
                      ) || null
                    }
                    onChange={handleContactAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.ContactId === value.ContactId
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Contacts"
                        error={submitClicked && !formData.ContactId}
                        className="bg-white"
                      />
                    )}
                    aria-label="Contact select"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    By Regional Manager <span className="text-danger">*</span>
                  </label>
                  <Autocomplete
                    id="staff-autocomplete"
                    size="small"
                    options={staffData.filter(
                      (staff) =>
                      staff.Role === "Regional Manager" ||
                      staff.UserId === 1593 ||
                      staff.UserId === 3252 ||
                      staff.UserId ===6146
                  )}
                    getOptionLabel={(option) => option.FirstName || ""}
                    value={
                      staffData.find(
                        (staff) => staff.UserId === formData.RegionalManagerId
                      ) || null
                    }
                    onChange={handleRBAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.UserId === value.RegionalManagerId
                    }
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div className="customer-dd-border">
                          <div className="row">
                            <div className="col-md-auto">
                              {" "}
                              <h6 className="pb-0 mb-0"> {option.FirstName}</h6>
                            </div>
                            <div className="col-md-auto">
                              <small>
                                {"("}
                                {option.Role}
                                {")"}
                              </small>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        error={submitClicked && !formData.RegionalManagerId}
                        placeholder="Choose..."
                        className="bg-white"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="row m-2">
                <div className="col-md-3">
                  <label className="form-label">Contact Email</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={
                      selectedContact?.Email || formData?.ContactEmail || ""
                    }
                    placeholder="Contact Email"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Contact Company</label>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Contact Company"
                    value={
                      selectedContact?.CompanyName ||
                      formData?.ContactCompany ||
                      ""
                    }
                  />
                </div>
              </div>

              <div className="row mt-4 mx-2 ">
                <div className="col-lg-3 col-md-3  mb-2">
                  <label className="form-label">Status:</label>
                  <FormControl fullWidth>
                    <Select
                      name="StatusId"
                      value={formData.StatusId || 1}
                      onChange={handleInputChange}
                      size="small"
                    >
                      <MenuItem value={1}>Open</MenuItem>
                      <MenuItem value={2}>Closed</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 mb-2">
                  <label className="form-label">Report For Week of:</label>
                  <input
                    type="date"
                    name="ReportForWeekOf"
                    value={formatDate(formData.ReportForWeekOf)}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Created"
                  />
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Didyoucheckthehealthofalltheplantsandtreesontheproperty"
                        value={
                          formData.Didyoucheckthehealthofalltheplantsandtreesontheproperty
                        }
                        checked={
                          formData.Didyoucheckthehealthofalltheplantsandtreesontheproperty
                        }
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>
                        Did you check the health of all the plants and trees on
                        the property?
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Didyouremovealldeceasedplantsortrees"
                        value={formData.Didyouremovealldeceasedplantsortrees}
                        checked={formData.Didyouremovealldeceasedplantsortrees}
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>Did you remove all deceased plants or trees?</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Didyoucheckirrigationtomakesureallplantsarereceivingwater"
                        value={
                          formData.Didyoucheckirrigationtomakesureallplantsarereceivingwater
                        }
                        checked={
                          formData.Didyoucheckirrigationtomakesureallplantsarereceivingwater
                        }
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>
                        Did you check irrigation to make sure all plants are
                        receiving water?
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Didyoucheckirrigationclock"
                        value={formData.Didyoucheckirrigationclock}
                        checked={formData.Didyoucheckirrigationclock}
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>Did you check irrigation clock?</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Didyoufixallleaksorflooding"
                        value={formData.Didyoufixallleaksorflooding}
                        checked={formData.Didyoufixallleaksorflooding}
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>Did you fix all leaks or flooding?</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Weretheweedspulledorsprayed"
                        value={formData.Weretheweedspulledorsprayed}
                        checked={formData.Weretheweedspulledorsprayed}
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>Were the weeds pulled or sprayed?</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Wasthetrashanddebriscollectedandproperlydisposedof"
                        value={
                          formData.Wasthetrashanddebriscollectedandproperlydisposedof
                        }
                        checked={
                          formData.Wasthetrashanddebriscollectedandproperlydisposedof
                        }
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>
                        Was the trash and debr is collected and properly
                        disposed of?
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Didthedoorentrywayplantersgetaddressed"
                        value={formData.Didthedoorentrywayplantersgetaddressed}
                        checked={
                          formData.Didthedoorentrywayplantersgetaddressed
                        }
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>Did the door entry way planters get addressed?</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Didtheparkinglotgetcleaned"
                        value={formData.Didtheparkinglotgetcleaned}
                        checked={formData.Didtheparkinglotgetcleaned}
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>Did the parking lot get cleaned?</h5>{" "}
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-2">
                  <div className="row">
                    <div className="col-md-1 pe-0 text-end mt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="Isthemulchsufficient"
                        value={formData.Isthemulchsufficient}
                        checked={formData.Isthemulchsufficient}
                        onChange={handleInputChange}
                      />
                    </div>{" "}
                    <div className="col-md-11  mt-2">
                      <h5>Is the mulch sufficient?</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mt-2">
                  <label className="form-label">
                    Are there any areas of concern?
                  </label>
                  <input
                    className="form-control form-control-sm"
                    name="Arethereanyareasofconcern"
                    value={formData.Arethereanyareasofconcern}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mt-2">
                  <label className="form-label">
                    Describe the mulch condition and if we need to add any
                  </label>

                  <input
                    className="form-control form-control-sm"
                    name="Describethemulchconditionandifweneedtoaddany"
                    value={
                      formData.Describethemulchconditionandifweneedtoaddany
                    }
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mt-2">
                  <label className="form-label">
                    Describe the entrance condition
                  </label>

                  <input
                    className="form-control form-control-sm"
                    name="Describetheentrancecondition"
                    value={formData.Describetheentrancecondition}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label className="form-label">
                    Describe the drive-through condition
                  </label>

                  <input
                    className="form-control form-control-sm"
                    name="Describethedrivethroughcondition"
                    value={formData.Describethedrivethroughcondition}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mt-2">
                  <label className="form-label">
                    Any additional notes management should be aware of
                  </label>

                  <input
                    className="form-control form-control-sm"
                    name="Anyadditionalnotesmanagementshouldbeawareof"
                    value={formData.Anyadditionalnotesmanagementshouldbeawareof}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mt-2">
                  <label className="form-label">
                    Signature of RC on site manager
                  </label>

                  <input
                    className="form-control form-control-sm"
                    name="SignatureofRConsitemanager"
                    value={formData.SignatureofRConsitemanager}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label className="form-label">
                    Name of RC on site manager
                  </label>

                  <input
                    className="form-control form-control-sm"
                    name="NameofRConsitemanager"
                    value={formData.NameofRConsitemanager}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label className="form-label">
                    Describe the parameter of building including sign age street
                    facing planter set condition
                  </label>

                  <input
                    className="form-control form-control-sm"
                    name="Describetheperimeterofbuildingincludingsignagestreetfacingplantersetccondition"
                    value={
                      formData.Describetheperimeterofbuildingincludingsignagestreetfacingplantersetccondition
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mt-2 mx-2">
                <div className="col-md-2 col-lg-2">
                  <FileUploadButton onClick={trackFile}>
                    Site Photos
                  </FileUploadButton>
                  {/* <div className="basic-form">
                    <label className="form-label">Site Photos</label>
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
                  </div> */}
                </div>

                {Files.map((file, index) => (
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
                        handleDeleteFile(index);
                      }}
                    >
                      <span>
                        <Delete color="error" />
                      </span>
                    </span>
                  </div>
                ))}
                {prevFiles.map((file, index) => {
                  return (
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
                      <a
                        href={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                          style={{
                            width: "150px",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
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
                      ></p>
                      <span
                        className="file-delete-button"
                        style={{
                          left: "140px",
                        }}
                        onClick={() => {
                          deleteReportFile(
                            "WeeklyReport/DeleteWeeklyReportRCFile?FileId=",
                            file.WeeklyReportRCFileId,
                            getWeeklyPreview
                          );
                        }}
                      >
                        <span>
                          <Delete color="error" />
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="row m-2">
                <div className="col-md-4 ps-0 mt-2 ">
                  {" "}
                  <div className="ms-2">
                    <BackButton
                      onClick={() => {
                        navigate(`/weekly-reports/rising-canes`);
                      }}
                    >
                      Back
                    </BackButton>
                  </div>
                </div>
                <div className="col-md-8 ps-0 mt-2  text-end">
                  {idParam ? (
                    <>
                      <PrintButton
                        varient="mail"
                        onClick={() => {
                          navigate(
                            `/send-mail?title=${"Weekly Report - Rising Canes"}&mail=${contactEmail}`
                          );
                        }}
                      >
                        <Email />
                      </PrintButton>

                      <PrintButton
                        varient="print"
                        onClick={() => {
                          navigate(
                            `/weekly-reports/rising-canes-preview?id=${idParam}`
                          );
                        }}
                      ></PrintButton>
                    </>
                  ) : (
                    <></>
                  )}

                  <LoaderButton
                    loading={disableButton}
                    handleSubmit={handleSubmit}
                  >
                    Save and Preview
                  </LoaderButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddRisingCanes;

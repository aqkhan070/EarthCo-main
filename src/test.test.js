import React, { useState } from "react";
// ... other imports ...

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c9c3d",
    },
  },
  typography: {
    fontSize: 16,  // Making font a bit larger
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px 16px',  // Adjust cell padding to reduce height
        },
      },
    },
  },
});

// ... unchanged code ...

const EstimateTR = ({ estimates }) => {
  // ... unchanged code ...

  const filteredEstimates = estimates
    .filter((e) => e.CustomerName.toLowerCase().includes(filtering.toLowerCase()))
    .sort(getSorting(order, orderBy));  // Moved sorting here so it always sorts after filtering

  return (
    <>
      {showContent ? (
        <ThemeProvider theme={theme}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12} className="container text-center">
              <TextField
                fullWidth  // Makes the TextField take the full width on small screens
                label="Search"
                variant="outlined"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  {/* ... rest of the table ... */}
                </Table>
              </TableContainer>
              {/* ... TablePagination ... */}
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : (
        <UpdateEstimateForm
          setShowContent={setShowContent}
          estimateId={selectedItem}
        />
      )}
    </>
  );
};

export default EstimateTR;


import React, { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import TitleBar from "../TitleBar";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import { Autocomplete, TextField } from '@mui/material';

const UpdateSRForm = ({serviceRequestId, setShowContent}) => {
  const [customers, setCustomers] = useState([]);

  const [sRList, setSRList] = useState({})

  const [SRData, setSRData] = useState({
    ServiceRequestData: {
      ServiceRequestId: serviceRequestId,
      ServiceRequestId: serviceRequestId,
     
      ServiceRequestId: serviceRequestId,     
     
      CustomerId: 0,
      ServiceLocation: "",
      Contact: "",
      JobName: "",
      DueDate: "",
      SRTypeId: 0,
      SRStatusId: 0,
      Assign: "",
      WorkRequest: "",
      ActionTaken: "",
      CompletedDate: "",
      tblSRItems: [],
    },
  });

  const [itemInput, setItemInput] = useState({
    Name: "",
    Qty: 0,
    Description: "",
    Rate: 0,
  });
  const [tblSRItems, setTblSRItems] = useState([]);

  const [files, setFiles] = useState([]);
  const inputFile = useRef(null);


 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSRData((prevData) => ({
      ServiceRequestData: {
        ...prevData.ServiceRequestData,
        [name]:
          name === "CustomerId" || name === "SRTypeId" || name === "SRStatusId"
            ? Number(value)
            : value,
      },
    }));
    // console.log("object,,,,,,", SRData);
  };

  const submitHandler = async () => {
    const formData = new FormData();
    SRData.ServiceRequestData.tblSRItems = tblSRItems;

    formData.append(
      "ServiceRequestData", JSON.stringify(SRData.ServiceRequestData)
    );

  
    files.forEach((fileObj) => {
      formData.append("Files", fileObj);
    });

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/ServiceRequest/AddServiceRequest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Handle successful submission
      window.location.reload();
    } catch (error) {
      console.error("API Call Error:", error);
    }
    for (let [key, value] of formData.entries()) {
      console.log("filessss", key, value);
    }


  };

  const removeItem = (index) => {
    const newItems = [...tblSRItems];
    newItems.splice(index, 1);
    setTblSRItems(newItems);
  };

  const trackFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const addFile = () => {
    inputFile.current.click();
  };
  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };


  
  useEffect(() => {
    const fetchSR = async () => {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequest?id=${serviceRequestId}`
      );
      try {     
  
         setSRList(response.data)


         setSRData(prevData => ({
          ServiceRequestData: {
            ...prevData.ServiceRequestData,
            CustomerId: response.data.CustomerId,
            ...response.data,
          }
        }));

         console.log(" list is///////", response.data.tblSRItems);
  
      } catch (error) {
        console.error("API Call Error:", error);
      }
  
    };
  
    const fetchCustomers = async () => {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
      );
      try {
        setCustomers(response.data);
        // console.log(response.data);
        console.log(customers);
        //   console.log("Custommer list is", customers[1].CustomerName);
      } catch (error) {
        console.error("API Call Error:", error);
      }
    };
  
    fetchSR();
    fetchCustomers();
  }, [serviceRequestId]);



 

  return (
    <>
      <TitleBar icon={icon} title=" Add Service Request" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            {/* Add service form */}
 
            {/* item table */}
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Items</h4>
                  </div>
                  <NavLink
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                    style={{ margin: "12px 20px" }}
                  >
                    + Add Items
                  </NavLink>
                  <div className="table-responsive active-projects style-1">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th>Qty / Duration</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tblSRItems.map((item, index) => (
                          <tr key={index}>
                            <td>{item.Qty}</td>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.Rate}</td>
                            <td>{item.Qty * item.Rate}</td>
                            <td>
                              <div className="badgeBox">
                                <span
                                  className="actionBadge badge-danger light border-0 badgebox-size"
                                  onClick={() => removeItem(index)}
                                >
                                  <span className="material-symbols-outlined badgebox-size">
                                    delete
                                  </span>
                                </span>
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


          <div class="mb-2 row text-end">
            <div className="flex-right">
              <button
                type="button"
                class="btn btn-primary me-1"
                onClick={submitHandler}
              >
                Submit
              </button>
              
                <button class="btn btn-danger light ms-1" onClick={() => {setShowContent(true)}}>Cancel</button>
              
            </div>
          </div>
        </div>
        {/* <div>{sRList}</div> */}
      </div>
    </>
  );
};

export default UpdateSRForm;


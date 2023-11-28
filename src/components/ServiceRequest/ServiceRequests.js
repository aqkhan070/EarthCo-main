import React from "react";
import ServiceRequestTR from "./ServiceRequestTR";
import { useEffect, useState } from "react";
import StatusCards from "./StatusCards";
import { Form } from "react-bootstrap";
import "datatables.net";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import useFetchServiceRequests from "../Hooks/useFetchServiceRequests";

const ServiceRequests = () => {
 

  const {isLoading, fetchServiceRequest,totalRecords , serviceRequest, sRfetchError} = useFetchServiceRequests();

  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const userdata = Cookies.get("userData");
  const [showCards, setShowCards] = useState(true);

  // const [locationOptions, setLocationOptions] = useState();
  const [open, setOpen] = useState(0)
  const [closed, setClosed] = useState(0)

  const [statusId, setStatusId] = useState(0)

 


  useEffect(() => {
    // Filter the estimates array to get only the entries with Status === "Pending"
    const pendingEstimates = serviceRequest.filter(estimate => estimate.Status === "Open");
    const pendingClosed = serviceRequest.filter(estimate => estimate.Status === "Closed");
   

    // Update the state variable with the number of pending estimates
    setOpen(pendingEstimates.length);
    setClosed(pendingClosed.length);
   
  }, [serviceRequest]);

  useEffect(() => {
    fetchServiceRequest();  
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {showCards && (
          <StatusCards
          setStatusId={setStatusId}
          statusId={statusId}
          totalRecords
            newData={1178}
            open={totalRecords.totalOpenRecords}
            closed={totalRecords.totalClosedRecords}
            total={78178}
          />
        )}
        <div className="col-xl-12">
          <div className="card">
            <div className="">
              {isLoading ? (
                <div className="center-loader">
                  <CircularProgress style={{ color: "#789a3d" }} />
                </div>
              ) : (
                <div>
                  <ServiceRequestTR
                  sRfetchError={sRfetchError}
                  headers={headers}
                    serviceRequest={serviceRequest}
                    setShowCards={setShowCards}
                    fetchServiceRequest={fetchServiceRequest}
                    statusId={statusId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <div className="modal fade" id="basicModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Service Request</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="basic-form">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">Customer</label>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">
                      Service Location
                    </label>
                    <div className="col-sm-8">
                      {/* <Form.Select aria-label="Default select example" size="md" value={serviceLocation} onChange={(e) => setServiceLocation(e.target.value)} id="inlineFormCustomSelect">
                                                <option value="Select Customer First">Select Customer First...</option>
                                                {locationOptions}
                                            </Form.Select> */}
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        // value={serviceLocation}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            label="Service Location"
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {/* <NavLink to='/Dashboard/Service-Requests/Add'>
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary">Save</button>
                                </NavLink> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequests;

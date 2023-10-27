import React from "react";
import ServiceRequestTR from "./ServiceRequestTR";
import { useEffect, useState } from "react";
import StatusCards from "./StatusCards";
import { Form } from "react-bootstrap";
import "datatables.net";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const ServiceRequests = () => {
  const [serviceRequest, setserviceRequest] = useState();

  // const [locationOptions, setLocationOptions] = useState();

  const fetchServiceRequest = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestList"
    );
    try {
      setserviceRequest(response.data);
      console.log("zzzzzzzzzzzzzzz", response.data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchServiceRequest();
  }, []);

  return (
    <div className="container-fluid">
       <CircularProgress color="success" />
      <div className="row">
        <StatusCards newData={1178} open={5142} closed={71858} total={78178} />
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="tbl-caption">
                <div className="row p-3 ">
                  {/* <div className="col-md-3">
                    <a
                      href="/"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#basicModal"
                    >
                      + Add Service Request
                    </a>
                  </div> */}
                  <div className="col-md-7"></div>
                  {/* <div
                    class="col-md-2"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div className="col-md-12">
                      <Form.Select
                        aria-label="Default select example"
                        size="md"
                      >
                        <option selected>All</option>
                        <option value="1">Current Month</option>
                        <option value="2">Previous Month</option>
                      </Form.Select>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="">
                {serviceRequest && (
                  <ServiceRequestTR serviceRequest={serviceRequest} />
                )}
              </div>
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

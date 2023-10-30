import React, { useEffect, useState } from "react";
import TitleBar from "../TitleBar";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
import PunchTR from "./PunchTR";
import punchList from "../../assets/images/1.jpg";
import axios from "axios";

const PunchListIndex = () => {
  const [punchData, setPunchData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedServiceRequest, setSelectedServiceRequest] = useState(null);
  const [serviceRequest, setServiceRequest] = useState([]);
  const [addPunchListData, setAddPunchListData] = useState({
    Title: "",
    ContactName: "",
    ContactCompany: "",
    ContactEmail: "",
    AssignedTo: "",
    CustomerId: null,
    ServiceRequestId: null,
    CreatedBy: 2,
    EditBy: 2,
    isActive: true,
  });

  const fetchPunchList = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlistList"
      );
      setPunchData(response.data);
      // console.log("punch data izzzzzzzzzzzzzzz", punchData);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );
    try {
      setCustomers(response.data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  const fetchServiceLocations = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestList"
    );
    try {
      setServiceRequest(response.data);
      // console.log("sssssssssrrrrrrrrrrr.",response.data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchServiceLocations();
    fetchPunchList();
  }, []);

  const handleCustomerChange = (event) => {
    const selectedCustomerId = parseInt(event.target.value, 10);

    setSelectedCustomer(selectedCustomerId); // Update the selectedCustomer state
    setAddPunchListData((prevState) => ({
      ...prevState,
      CustomerId: selectedCustomerId,
    }));
  };
  const handleServiceRequestChange = (event) => {
    const selectedServiceRequestId = parseInt(event.target.value, 10);
    setSelectedServiceRequest(selectedServiceRequestId);
    // Update the addPunchListData with the selected ServiceRequestId
    console.log("Selected Service Request ID:", selectedServiceRequestId);
    setAddPunchListData((prevState) => ({
      ...prevState,
      ServiceRequestId: selectedServiceRequestId,
    }));
    // console.log(".............,,,", addPunchListData)
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddPunchListData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("https://earthcoapi.yehtohoga.com/api/PunchList/AddPunchList", addPunchListData);
      // Handle success - maybe redirect or show a message
      console.log("successfully posted ",addPunchListData);
    } catch (error) {
      console.error("Error sending data:", error);
      console.log("Error sending dataaaaaa:",addPunchListData);

      // Handle error - show an error message to the user
    }
  };

  const [returnElement, setReturnElement] = useState();
  const hideOptional = () => {
    const checkbox = document.getElementById("customCheckBox1");
    if (checkbox.checked) {
      setReturnElement(
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Photo (After)</label>
          <div className="col-sm-9">
            <input type="file" className="form-control" placeholder="" />
          </div>
        </div>
      );
    } else {
      setReturnElement(false);
    }
  };

 

  return (
    <>
      <TitleBar icon={icon} title="Punchlists" />
      <div className="container-fluid">
        

       
        {/* modal2 */}
        <div className="modal fade modal-lg" id="editPunch">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Punchlist</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className=" col-md-6 mb-3">
                      <label className="form-label">
                        Title<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="Title"
                        onChange={handleChange}
                        placeholder="Title"
                        required
                      />
                    </div>
                    <div className=" col-md-6 mb-3">
                      <label className="form-label">Customer</label>
                      <Form.Select
                        className="bg-white"
                        aria-label="Default select example"
                        size="md"
                        name="CustomerId"
                        onChange={handleCustomerChange}
                        value={selectedCustomer || ""}
                      >
                        <option value={null} selected>
                          Select Customer
                        </option>

                        {customers.map((customer) => {
                          return (
                            <option
                              value={customer.CustomerId}
                              key={customer.CustomerId}
                            >
                              {customer.CustomerName}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </div>
                    <div className=" col-md-6 mb-3">
                      <label className="form-label">
                        Contact Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="ContactName"
                        onChange={handleChange}
                        placeholder="Contact Name"
                        required
                      />
                    </div>
                    <div className=" col-md-6 mb-3">
                      <label className="form-label">
                        Contact Company<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="ContactCompany"
                        onChange={handleChange}
                        placeholder="Company Company"
                      />
                    </div>
                    <div className=" col-md-6 mb-3">
                      <label className="form-label">
                        Contact Email<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="ContactEmail"
                        onChange={handleChange}
                        placeholder="Contact Email"
                        required=""
                      />
                    </div>
                    <div className=" col-md-6 mb-3">
                      <label className="form-label">
                        Date Created<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Phone"
                      />
                    </div>

                    <div className=" col-md-6 mb-3">
                      <label className="form-label">
                        Assigned to<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="AssignedTo"
                        onChange={handleChange}
                        placeholder="Assigned to"
                      />
                    </div>
                    <div className=" col-md-6">
                      <label className="form-label">Service Request</label>

                      <Form.Select
                        className="bg-white"
                        size="lg"
                        name="ServiceRequestId"
                        onChange={handleServiceRequestChange}
                      >
                        <option value={null} selected>
                          Select Service Location
                        </option>
                        {serviceRequest.map((srLocation) => {
                          return (
                            <option
                              key={srLocation.ServiceRequestId}
                              value={srLocation.ServiceRequestId || ""}
                            >
                              {srLocation.ServiceLocation}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger light"
                    data-bs-dismiss="modal"
                    data-bs-target="#editPunch"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editPunch"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PunchListIndex;

import React, { useContext, useEffect, useRef, useState } from "react";
import StatusActions from "../StatusActions";
import { Form } from "react-bootstrap";
import { DataContext } from "../../context/AppData";
import { NavLink } from "react-router-dom";
import axios from "axios";

const UpdateEstimateForm = ({ setShowContent, estimateId }) => {
  const [estimates, setEstimates] = useState({});

  const [formData, setFormData] = useState({
    CustomerId: 0,
    ServiceLocation: "",
    Email: "",
    EstimateNumber: "",
    IssueDate: "",
    EstimateNotes: "",
    ServiceLocationNotes: "",
    PrivateNotes: "",
    QBStatus: "",
    EstimateStatusId: 0,
    tblEstimateItems: [],
  });
  const [itemForm, setItemForm] = useState({
    Name: "",
    Qty: 0,
    Description: "",
    Address: "12345",
    Rate: 0,
    isActive: true,
    CreatedBy: 2,
  });

  const inputFile = useRef(null);
  const [Files, setFiles] = useState([]);

  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );
    try {
      setCustomers(response.data);
      //   console.log("Custommer list is", customers[1].CustomerName);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  const fetchEstimates = async () => {
    const response = await axios.get(
      `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${estimateId}`
    );
    try {
      setEstimates(response.data);

      setFormData((prevState) => ({
        ...prevState,
        CustomerId: response.data.CustomerId,
        ...response.data,

      }))

      if (response.data.tblEstimateItems) {
        setFormData((prevState) => ({
          ...prevState,
          CustomerId: response.data.CustomerId,
          tblEstimateItems: response.data.tblEstimateItems,
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          CustomerId: response.data.CustomerId,
          tblEstimateItems: [],
        }));
      }

      console.log("estimateeeeeee list is", response.data.tblEstimateItems);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId
    const adjustedValue = [
      "CustomerId",
      "Qty",
      "Rate",
      "EstimateStatusId",
    ].includes(name)
      ? Number(value)
      : value;

    setFormData((prevData) => ({ ...prevData, [name]: adjustedValue }));
  };

  const handleSubmit = () => {
    const postData = new FormData();

    // Before merging, filter out the unnecessary fields from each item in tblEstimateItems
    const filteredItems = formData.tblEstimateItems.map((item) => {
      const { id, Amount, Approved, ...rest } = item;
      return rest;
    });

    // Merge the current items with the new items for EstimateData
    const mergedEstimateData = {
      ...formData,
      EstimateId: estimateId,
      CreatedBy: 2,
      EditBy: 2,
      isActive: true,
      tblEstimateItems: [...filteredItems, itemForm], // using the filteredItems here
    };

    console.log("mergedEstimateData:", mergedEstimateData);
    // console.log("data:", data);

    postData.append("EstimateData", JSON.stringify(mergedEstimateData));
    console.log(JSON.stringify(mergedEstimateData));
    // Appending files to postData
    Files.forEach((fileObj) => {
      postData.append("Files", fileObj);
    });

    submitData(postData);
  };

 

  const submitData = async (postData) => {
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Estimate/AddEstimate",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Data submitted successfully:", response.data);
      } else {
        console.log("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("API Call Error:", error);
    }

    // Logging FormData contents (for debugging purposes)
    for (let [key, value] of postData.entries()) {
      console.log("fpayload....", key, value);
    }
    // window.location.reload();

    // console.log("post data izzz",postData);
  };

  useEffect(() => {
    fetchEstimates();
    fetchCustomers();
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: formData.tblEstimateItems.length + 1,
      ...itemForm,
      Amount: Number(itemForm.Qty) * Number(itemForm.Rate),
      Approved: false,
    };

    // Clear itemForm fields after adding the new item
    setFormData((prevData) => ({
      ...prevData,
      tblEstimateItems: [...prevData.tblEstimateItems, newItem],
    }));
    setItemForm({
      Name: "",
      Qty: 0,
      Description: "",
      Address: "12345",
      Rate: 0,
      isActive: true,
      CreatedBy: 2,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert to number if the field is Qty or Rate
    const adjustedValue = ["Qty", "Rate", "EstimateStatusId"].includes(name)
      ? Number(value)
      : value;

    setItemForm((prevState) => ({ ...prevState, [name]: adjustedValue }));
  };

  const addFile = () => {
    inputFile.current.click();
    // console.log("Filesss are", Files);
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
 
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };


  return (
    <div class="card">
      <div className="card-body">
       
      
       
        {/* Files */}
        <div className="">
          <div className="card-body p-0">
            <div className="estDataBox">
              <div className="itemtitleBar">
                <h4>Files</h4>
              </div>
              <button
                className="btn btn-primary btn-sm"
                style={{ margin: "12px 20px" }}
                onClick={addFile}
              >
                + Add File
              </button>
              <input
                type="file"
                name="Files"
                ref={inputFile}
                onChange={trackFile}
                style={{ display: "none" }}
              />
              <div className="table-responsive active-projects style-1">
                <table id="empoloyees-tblwrapper" className="table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Caption</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Files.map((file, index) => (
                      <tr key={index}>
                        <td>{file.name}</td>
                        <td>{file.caption}</td>
                        <td>{file.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="estNotesBox">
          <div className="row">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="basic-form">
                    <form>
                      <h4 className="card-title">Estimate Notes</h4>
                      <div className="mb-3">
                        <textarea
                          placeholder={estimates.EstimateNotes || ""}
                          value={formData.EstimateNotes}
                          name="EstimateNotes"
                          onChange={handleInputChange}
                          className="form-txtarea form-control"
                          rows="2"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12">
                  <div className="basic-form">
                    <form>
                      <h4 className="card-title">Service Location Notes</h4>
                      <div className="mb-3">
                        <textarea
                          placeholder={estimates.ServiceLocationNotes || ""}
                          value={formData.ServiceLocationNotes}
                          name="ServiceLocationNotes"
                          onChange={handleInputChange}
                          className="form-txtarea form-control"
                          rows="2"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12">
                  <div className="basic-form">
                    <form>
                      <h4 className="card-title">Private Notes</h4>
                      <div className="mb-3">
                        <textarea
                          placeholder={estimates.PrivateNotes || ""}
                          value={formData.PrivateNotes}
                          name="PrivateNotes"
                          onChange={handleInputChange}
                          className="form-txtarea form-control"
                          rows="2"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card" style={{ marginTop: "15px" }}>
                <div className="card-body">
                  <div className="sutotalBox">
                    <div className="basic-form">
                      <form>
                        <Form.Select
                          value={formData.QBStatus}
                          name="QBStatus"
                          onChange={handleInputChange}
                          aria-label="Default select example"
                          id="inputState"
                          className="bg-white"
                        >
                          <option value={null}>select</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </Form.Select>
                      </form>
                    </div>
                    <div className="dataBox">
                      <div className="dataRow">
                        <h5>Subtotal:</h5>
                        <p>10.00$</p>
                      </div>
                      <div className="dataRow">
                        <h5>Tax:</h5>
                        <p>0.00$</p>
                      </div>
                      <div className="dataRow">
                        <h5>Total:</h5>
                        <p>10.00$</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

     
    </div>
    </div>
  );
};

export default UpdateEstimateForm;

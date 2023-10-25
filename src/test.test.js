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

  const fetchEstimates = async () => {
    const response = await axios.get(
      `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${estimateId}`
    );
    try {
      setEstimates(response.data);

      // console.log("estimateeeeeee list is",estimates);
      console.log("estimateeeeeee list is", response.data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };
  useEffect(() => {fetchEstimates},[]) 
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

    submitData(postData);  };

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
      console.log("filessss", key, value);
    }
    window.location.reload();

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
  };

 

  const handleChange = (e) => {
    const adjustedValue = ["Qty", "Rate", "EstimateStatusId"].includes(name)
      ? Number(value)
      : value;

    setItemForm((prevState) => ({ ...prevState, [name]: adjustedValue }));
  };

  const deleteItem = (id) => {
    const updatedArr = formData.tblEstimateItems.filter(
      (object) => object.id !== id
    );
    setFormData((prevData) => ({
      ...prevData,
      tblEstimateItems: updatedArr,
    }));
  };

  return (
    <div class="card">
      <div className="card-body">
        

        {/* add item modal */}
        <div className="modal fade" id="basicModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={addItem}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Item</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="basic-form">
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">Name</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          value={itemForm.Name}
                          onChange={handleChange}
                          name="Name"
                          className="form-control"
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">
                        Quantity
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          value={itemForm.Qty}
                          onChange={handleChange}
                          name="Qty"
                          className="form-control"
                          placeholder="Quantity"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">
                        Description
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-txtarea form-control"
                          value={itemForm.Description}
                          onChange={handleChange}
                          name="Description"
                          rows="3"
                          id="comment"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">Rate</label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          value={itemForm.Rate}
                          onChange={handleChange}
                          name="Rate"
                          className="form-control"
                          placeholder="Rate"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-sm-3 col-form-label">
                        Item Total
                      </label>
                      <div
                        className="col-sm-9"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <h5 style={{ margin: "0" }}>
                          {itemForm.Rate * itemForm.Qty}
                        </h5>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="closer"
                    className="btn btn-danger light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* item table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="estDataBox">
              <div className="itemtitleBar">
                <h4>Items</h4>
              </div>
              <button
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#basicModal"
                style={{ margin: "12px 20px" }}
              >
                + Add Items
              </button>
              <div className="table-responsive active-projects style-1">
              <table id="empoloyees-tblwrapper" className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Qty / Duration</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>Approved</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.tblEstimateItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.Qty}</td>
                        <td>{item.Name}</td>
                        <td>{item.Description}</td>
                        <td>{item.Rate}</td>
                        <td>{item.Amount}</td>
                        <td>{item.Approved ? "Yes" : "No"}</td>
                        <td>
                                <div className="badgeBox">
                                  <span
                                    className="actionBadge badge-danger light border-0 badgebox-size"
                                    onClick={deleteItem}
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
    </div>
    </div>
  );
};

export default UpdateEstimateForm;

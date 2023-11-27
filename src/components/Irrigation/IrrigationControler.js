import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Alert from "@mui/material/Alert";


const IrrigationControler = ({ selectedIrr , toggleShowForm, fetchIrrigation }) => {
    const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [formData, setFormData] = useState({});
  const [addError, setAddError] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "NumberofBrokenHeads" ||
      name === "NumberofBrokenLateralLines" ||
      name === "NumberofStation" ||
      name === "NumberofValves" || 
      name === "NumberofBrokenMainLines"
     
        ? parseInt(value, 10) // Use parseInt to parse as integers
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
      IrrigationId: selectedIrr,
    }));
    console.log("main payload is", formData);
  };

  const [controllerPhoto, setControllerPhoto] = useState(null);

  // Step 2: Create an event handler function
  const handleControllerphotoInputChange = (event) => {
    // Step 3: Access the selected file
    const file = event.target.files[0];

    // Step 4: Update the state with the selected file
    setControllerPhoto(file);
  };

  const [Photo, setPhoto] = useState(null);

  // Step 2: Create an event handler function
  const handlePhotoInputChange = (event) => {
    // Step 3: Access the selected file
    const file = event.target.files[0];

    // Step 4: Update the state with the selected file
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();  

   
    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const IrrigationControllerData = {
      ...formData,    
      

      
    };

    console.log("IrrigationControllerData:", IrrigationControllerData);
    // console.log("data:", data);

    postData.append("IrrigationControllerData", JSON.stringify(IrrigationControllerData));

    if (Photo) {
      postData.append("Photo", Photo);
    }
  
    // Append selectedAfterFile if it exists
    if (controllerPhoto) {
      postData.append("ControllerPhoto", controllerPhoto);
    }

    console.log(JSON.stringify(IrrigationControllerData));
   

    submitData(postData);
  };

  // const appendFilesToFormData = (formData) => {
  //   Files.forEach((fileObj) => {
  //     formData.append("Files", fileObj.actualFile);
  //   });
  // };

  const submitData = async (postData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
    };
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Irrigation/AddController",
        postData,
        {headers}
      ); 
      setFormData({      
      })
      fetchIrrigation(selectedIrr)
      toggleShowForm()
      document.getElementById("photo").value = '';
      document.getElementById("controllerPhoto").value = '';
      
      for (const entry of postData.entries()) {
        console.log(`FormData Entry - ${entry[0]}: ${entry[1]}`);
      }


      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {     
      console.error("API Call Error:", error.response.data);
      setAddError(error.response.data)
    }

  
  };

  return (
    <div className="card">
      <div className="card-body p-0">
        <div className="itemtitleBar">
          <h4>Controller Info</h4>
        </div>
        <div className="card-body" style={{ padding: "1.5rem 4rem" }}>
          <div className="basic-form">
            <form>
              <div
                className="row mb-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Controller Make and Model</h5>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="MakeAndModel"
                    onChange={handleChange}
                    placeholder="Controller Make and Model"
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Photo of Controller</h5>
                  </div>
                  <input
                    type="file"
                    id="controllerPhoto"
                    className="form-control"
                    placeholder="Created"
                    onChange={handleControllerphotoInputChange}
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Serial Number</h5>
                  </div>
                  <input
                    type="text"
                    name="SerialNumber"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Serial Number"
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Controller Location Closest Adress</h5>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="LoacationClosestAddress"
                    onChange={handleChange}
                    placeholder="Controller Location Closest Adress"
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Satellite Based</h5>
                  </div>
                  <div className="col-md-12 yesNoBtns">
                    <button
                      type="button"
                      className={`btn light  col-md-6 YNbtn2 ${formData.isSatelliteBased && "btn-dark"}`}
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            isSatelliteBased: true,
                          }));
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`btn light  col-md-6 YNbtn2 ${!formData.isSatelliteBased && "btn-dark"}`}
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            isSatelliteBased: false,
                          }));
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Type of Water</h5>
                  </div>
                  <div className="col-md-12 yesNoBtns">
                    <button
                      type="button"
                      className="btn light btn-dark col-md-6 YNbtn1"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            TypeofWater: "Portable",
                          }));
                      }}
                    >
                      Portable
                    </button>
                    <button
                      type="button"
                      className="btn light btn-dark col-md-6 YNbtn2"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            TypeofWater: "Reclaimed",
                          }));
                      }}

                    >
                      Reclaimed
                    </button>
                  </div>
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Meter Number</h5>
                  </div>
                  <input
                    type="text"
                    name="MeterNumber"
                    onChange={handleChange}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Meter Size</h5>
                  </div>
                  <div className="col-md-12 yesNoBtns">
                    <button
                      type="button"
                      className="btn light btn-dark col-md-2 YNbtn1"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            MeterSize: "1/2",
                          }));
                      }}
                    >
                      1/2
                    </button>
                    <button
                      type="button"
                      className="btn light btn-dark col-md-3 YNbtnMid borderRight"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            MeterSize: "3/4",
                          }));
                      }}
                    >
                      3/4 "
                    </button>
                    <button
                      type="button"
                      className="btn light btn-dark col-md-2 YNbtnMid borderRight"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            MeterSize: "1",
                          }));
                      }}
                    >
                      1 "
                    </button>
                    <button
                      type="button"
                      className="btn light btn-dark col-md-3 YNbtnMid borderRight"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            MeterSize: "11/2",
                          }));
                      }}
                    >
                      11/2 "
                    </button>
                    <button
                      type="button"
                      className="btn light btn-dark col-md-2 YNbtn2"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            MeterSize: "2",
                          }));
                      }}
                    >
                      2 "
                    </button>
                  </div>
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Number of Stations</h5>
                  </div>
                  <input
                    type="number"
                    name="NumberofStation"
                    onChange={handleChange}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Number of Valves</h5>
                  </div>
                  <input
                    type="number"
                    name="NumberofValves"
                    onChange={handleChange}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Number of Broken Main Lines</h5>
                  </div>
                  <input
                    type="number"
                    name="NumberofBrokenMainLines"
                    onChange={handleChange}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Type of Valves</h5>
                  </div>
                  <div className="col-md-12 yesNoBtns">
                    <button
                      type="button"
                      className="btn light btn-dark col-md-4 YNbtn1"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            TypeofValves: "Plastic",
                          }));
                      }}
                    >
                      Plastic
                    </button>
                    <button
                      type="button"
                      className="btn light btn-dark col-md-4 YNbtnMid borderRight"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            TypeofValves: "Brass",
                          }));
                      }}
                    >
                      Brass
                    </button>
                    <button
                      type="button"
                      className="btn light btn-dark col-md-4 YNbtn2"
                      onClick={() => {
                        setFormData((prevData) => ({
                            ...prevData,
                            TypeofValves: "Mixed",
                          }));
                      }}
                    >
                      Mixed
                    </button>
                  </div>
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Leaking Valves</h5>
                  </div>
                  <input
                    type="text"
                    name="LeakingValves"
                    onChange={handleChange}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Malfunctioning Valves</h5>
                  </div>
                  <input
                    type="text"
                    name="MalfunctioningValves"
                    onChange={handleChange}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Number of Broken Lateral Lines</h5>
                  </div>
                  <input
                    type="number"
                    name="NumberofBrokenLateralLines"
                    onChange={handleChange}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Number of Broken Heads</h5>
                  </div>
                  <input
                    type="number"
                    name="NumberofBrokenHeads"
                    onChange={handleChange}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Repairs Made</h5>
                  </div>
                  <div className="col-md-12">
                    <textarea
                      name="RepairsMade"
                      onChange={handleChange}
                      className="form-txtarea form-control"
                      rows="4"
                      id="comment"
                    ></textarea>
                  </div>
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Upgrades Made</h5>
                  </div>
                  <div className="col-md-12">
                    <textarea
                      name="UpgradesMade"
                      onChange={handleChange}
                      className="form-txtarea form-control"
                      rows="4"
                      id="comment"
                    ></textarea>
                  </div>
                </div>
                <div className="col-sm-5 mx-2 mb-3">
                  <div className="col-md-12">
                    <h5>Photo</h5>
                  </div>
                  <input
                    type="file"
                    id="photo"
                    className="form-control"
                    onChange={handlePhotoInputChange}
                    placeholder="Capture Photo"
                  />
                </div>
                <div className="col-sm-5 mx-2 mb-3"></div>
              </div>
              <div className="row ">
                <div className="col-md-8">
                  {addError && <Alert severity="error">{addError}</Alert>}
                </div>
                <div className=" col-md-4 text-right">
                  <button type="button" className="btn btn-warning me-1" onClick={handleSubmit}>
                    Add
                  </button>
                  <button type="button" className="btn btn-danger light ms-1">
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationControler;

const handleSLChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "radio") {
    // Handle radio button inputs
    setServiceLocations((prevLocations) => ({
      ...prevLocations,
      [name]: checked ? value : "", // Only update the value if the radio button is checked
    }));
  } else {
    // Handle text inputs
    setServiceLocations((prevLocations) => ({
      ...prevLocations,
      [name]: value,
    }));
  }
  // console.log("<><><><><<", serviceLocations)
};

const addServiceLocation = (e) => {
  e.preventDefault();
  // Check if serviceLocations has data to add
  if (Object.keys(serviceLocations).length === 0) {
    alert("Service Locations data is empty");
    return;
  }
  // Create a new object containing the serviceLocations data
  const newObject = serviceLocations;

  // Append the new object to the array
  setSlForm((prevObjects) => [...prevObjects, newObject]);

  // Clear the serviceLocations state after adding it to the array
  setServiceLocations({});
  console.log("><><><><><", slForm);
  setShowSRLocation(false);
};


<div className="modal fade" id="basicModal2">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="modal-header">
        <h5 className="modal-title">Add Service location</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div className="modal-body">
        <div className="basic-form">
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">
              Name
            </label>
            <div className="col-sm-9">
            <input
                type="text"
                name="SRName"
                onChange={handleSLChange}                            
                className="form-control form-control-sm"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">
              Bill To
            </label>
            <div className="col-sm-9">
              <div className="row">
              <div className="col-5">
                  <input
                    className="form-check-input radio-margin-top"
                    type="radio"
                    name="BillTo"
                    id="inlineRadio1"
                    onClick={handleSLChange}
                    value="Customer"
                  />
                  <label
                    className="form-check-label"
                    for="inlineRadio1"
                  >
                    Customer
                  </label>
                </div>
                <div className="col-7">
                  <input
                    className="form-check-input radio-margin-top"
                    type="radio"
                    name="BillTo"
                    id="inlineRadio2"
                    onClick={handleSLChange}
                    value="BillToServiceLocation"
                  />
                  <label
                    className="form-check-label"
                    for="inlineRadio2"
                  >
                    This service Location
                  </label>
                </div>

              </div>
           
                
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">Address</label>
            <div className="col-sm-9">
            <input
                  type="text"
                  id="SRinput2"                          
                 
                  name="SLAddress"
                  className="form-control form-control-sm"
                  
                  placeholder="Address"
                  
                />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">
              Phone
            </label>
            <div className="col-sm-9">
            <input
                  type="number"
                  onChange={handleSLChange}
                  name="SLPhone"
                  className="form-control form-control-sm"
                  placeholder="Phone"
                />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">
              Alt Phone
            </label>
            <div className="col-sm-9">
            <input
                  type="number"
                  name="AltPhone"
                  onChange={handleSLChange}
                  className="form-control form-control-sm"
                  placeholder="Alt Phone"
                  required
                />
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
        <button
          className="btn btn-primary"
          data-bs-dismiss="modal"
          onClick={addServiceLocation}
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>
</div>
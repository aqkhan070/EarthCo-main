

const AddSRform = () => {
  const [customers, setCustomers] = useState([]);

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

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <TitleBar icon={icon} title=" Add Service Request" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-lg-12 col-md-12 mb-2">
                
                <NavLink to="/Dashboard/Estimates">
                  {" "}
                  <button
                    type="button"
                    className="col-md-2 btn btn-sm btn-primary"
                  >
                    {" "}
                    + Add Estimate{" "}
                  </button>
                </NavLink>
                <button type="button" className="btn btn-sm btn-secondary mx-2">
                  + Add Invoice
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                >
                  Email
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary mx-2"
                >
                  Print
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-body p-0">
                <div className="itemtitleBar">
                  <h4>Service Request Details</h4>
                </div>{" "}
                <br />
                <div className="basic-form">
                  <div className="row">
                    <div className="mb-2 col-md-9 SrCustomerList">
                      <label className="form-label">Customers</label>
                      <Form.Select
                        size="lg"
                        name="CustomerId"
                        aria-label="Default select example"
                        id="inputState"
                        className="bg-white"
                      >
                        <option value="">Customer</option>{" "}
                        {customers.map((customer) => (
                          <option
                            key={customer.CustomerId}
                            value={customer.CustomerId}
                          >
                            {customer.CustomerName}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    <div className="mb-3 col-md-4">
                      <label className="form-label">Service Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ServiceLocation"
                        placeholder="Service Location"
                      />
                    </div>
                    <div className="mb-3 col-md-4">
                      <label>Contact</label>
                      <input
                        type="text"
                        name="Contact"
                        className="form-control"
                        placeholder="Example@Example.com"
                      />
                    </div>
                  </div>
                  <div className="row  mt-2 mb-2">
                    <div className="col-md-4">
                      <label className="form-label">Job Name:</label>
                      <input
                        type="text"
                        name="JobName"
                        className="form-control"
                        placeholder="Job Name"
                      />
                    </div>
                    <div className=" col-md-4">
                      <label className="form-label">Due Date:</label>

                      <input
                        type="date"
                        name="DueDate"
                        className="form-control"
                        placeholder="Due Date"
                      />
                    </div>
                    <div className=" col-md-4">
                      <label className="form-label">Type:</label>
                      <Form.Select name="SRTypeId" size="lg" className="bg-white">
                        <option value="Inspect and Advise">
                          Inspect and Advise
                        </option>
                        <option value="Irrigation">Irrigation</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Other">Other</option>
                        <option value="Proposal Needed">Proposal Needed</option>
                        <option value="Tree Care">Tree Care</option>
                      </Form.Select>
                    </div>
                    <div className="col-lg-2 col-md-2 mt-2">
                      <label className="form-label">Status:</label>
                      <Form.Select name="SRStatusId" size="lg" className="bg-white">
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Assign and scedule */}
            <div className="card">
              <div className="card-body p-0 pb-4">
                <div className="itemtitleBar">
                  <h4>Assign & Schedule</h4>
                </div>
                <br />
                <div className="basic-form">
                  <div className="row">
                    <div className="col-md-4">
                      {" "}
                      {/* Adjust the column size as needed */}
                      <label className="form-label">
                        Assign / Appointment:
                      </label>
                      <Form.Select name="Assign" size="lg" className="bg-white">
                        <option value={null}>Choose...</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                      </Form.Select>
                    </div>
                    <div className="col-md-6 pt-4">
                      {" "}
                      {/* Adjust the column size as needed */}
                      <button className="btn schedule-btn">Schedule</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
   
 
            <div className="card">
              <div className="card-body p-0 pb-4">
                <div className="itemtitleBar">
                  <h4>Details</h4>
                </div>
                <br />
                <div className="basic-form">
                  <div className="row">
                    <div className="col-md-4">
                      {" "}
                      {/* Adjust the column size as needed */}
                      <label className="form-label">
                      Work Requested:
                      </label>
                      <textarea
                        name="WorkRequest"
                        className="form-txtarea form-control"
                        rows="2"
                      ></textarea>
                    </div>
                    <div className="col-md-4 ">
                      {" "}
                      <label className="form-label">
                      Action Taken:
                      </label>
                      {/* Adjust the column size as needed */}
                      <textarea
                        name="ActionTaken"
                        className="form-txtarea form-control"
                        rows="2"
                      ></textarea>
                    </div>

                    <div className=" col-md-4">
                      <label className="form-label">Date Completed:</label>

                      <input
                        type="date"
                        className="form-control"
                        placeholder="CompletedDate"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ;
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSRform;

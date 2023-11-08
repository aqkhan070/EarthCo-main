
const AddStaff = ({selectedStaff, settoggleAddStaff, setAddStaffSuccess,getStaffList}) => {
  

  //   const [showPop1, setShowPop1] = useState(true);
  //   const [adress1, setAdress1] = useState("");
  //   const [customerAdress, setCustomerAdress] = useState({});
  const [customerInfo, setCustomerInfo] = useState({});
  const [userRoles, setUserRoles] = useState([]);
  const [alert, setAlert] = useState(false)
  const [alertSuccess, setAlertSuccess] = useState(false)


  const token = Cookies.get("token");

  const getRoles = async () => {
    console.log("token izzz", token);
    try {
      // Set up the headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/UserManagement/Roles`,
        { headers }
      );
      console.log("user roles areee", response.data);
      setUserRoles(response.data);
    } catch (error) {
        console.log("erroor ", error)
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleCustomerInfo = (event) => {
    const { name, value } = event.target;
    const newValue = name === "RoleId" ? parseInt(value, 10) : value;

    setCustomerInfo({
      ...customerInfo,
      [name]: newValue,
    });

    console.log("customer info", {
      ...customerInfo,
      [name]: newValue,
    });
    setAlert(false)
  };

  const addStaff = async () => {
    try {
      const response = await axios.post(
        `https://earthcoapi.yehtohoga.com/api/Staff/AddStaff`,
        customerInfo
      );
      // window.location.reload();
      setTimeout(() => {
        setAlertSuccess(false)
      }, 3000);
      
      setTimeout(() => {
        setAddStaffSuccess(false)
        
      }, 4000);
      setAddStaffSuccess(true)
      setAlertSuccess(true)
      getStaffList();
      settoggleAddStaff(true)

      console.log("staff added successfully", customerInfo);
    } catch (error) {

      if (error.response.status === 409) {
            setAlert(true)
        }
      console.log("roles api call error", error.response.status);
    }
  };

  const getStaffData = async () => {
    try {
      const response = await axios.get(`https://earthcoapi.yehtohoga.com/api/Staff/GetStaff?id=${selectedStaff}`);
      console.log("staffdata izzzzzz",response.data)
      setCustomerInfo(response.data)
    } catch (error) {
      console.log("error fetching staff data", error)
    }
  };
  useEffect(() => {
    getStaffData();
  },[selectedStaff])

  return (
    <>
      <TitleBar icon={icon} title="Add Staff" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h4 className="modal-title" id="#gridSystemModal">
              User Info
            </h4>
          </div>
          <div className="card-body">
            {alert && 
              <Alert severity="error">
                The Email/User already exists
              </Alert>
           }
           {alertSuccess && <Alert severity="success">Successfuly Added/Updated staff</Alert>}
            
            <div className="row">
              <div className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="FirstName"
                  id="exampleFormControlInput1"
                  onChange={handleCustomerInfo}
                  value={customerInfo.FirstName}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput4"
                  className="form-label"
                >
                  Last Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleCustomerInfo}
                  name="LastName"
                  value={customerInfo.LastName}
                  id="exampleFormControlInput4"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label className="form-label">
                  Email / User Name<span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleCustomerInfo}
                  name="Email"
                  value={customerInfo.Email}
                  id="exampleFormControlInput3"
                  placeholder="Email / User Name Name"
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label className="form-label">
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleCustomerInfo}
                  name="Password"
                  
                  id="exampleFormControlInput3"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label className="form-label">
                  Confirm Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput3"
                  
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput4"
                  className="form-label"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  onChange={handleCustomerInfo}
                  name="Phone"
                  value={customerInfo.Phone}
                  id="exampleFormControlInput4"
                  placeholder="Phone 1"
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput4"
                  className="form-label"
                >
                  Alt Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  onChange={handleCustomerInfo}
                  name="AltPhone"
                  value={customerInfo.AltPhone}
                  id="exampleFormControlInput4"
                  placeholder="Alt Phone"
                  required
                />
              </div>
              <div className="col-xl-6" style={{ position: "relative" }}>
                <label className="form-label">
                  Adress<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  onChange={handleCustomerInfo}
                  className="form-control"
                  name="Address"
                  value={customerInfo.Address}
                  id="exampleFormControlInput3"
                  placeholder="Address"
                  required
                />
                {/* {showPop1 || (
                  <AdressModal
                    topClass="staffAdress"
                    adress={customerAdress}
                    setAdress={setCustomerAdress}
                    boolState={setShowPop1}
                    handleAdress={setAdress1}
                  />
                )} */}
              </div>
              <div className="col-xl-6 mb-3">
                <label
                  htmlFor="exampleFormControlInput4"
                  className="form-label"
                >
                  User Role
                </label>
                <Form.Select
                  name="RoleId"
                  size="lg"
                  className="bg-white"
                  value={customerInfo.RoleId}
                  onChange={handleCustomerInfo}
                >
                  <option value="">Select Role ...</option>
                  {userRoles.map((roles) => {
                    return (
                      <option key={roles.RoleId} value={roles.RoleId}>
                        {roles.Role}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className=" mt-4 col-xl-6 text-end">
          <NavLink>
            <button className="btn btn-primary me-1" onClick={addStaff}>
              Submit
            </button>
          </NavLink>
         
            <button className="btn btn-danger light ms-1" onClick={() => {settoggleAddStaff(true)}}  >Cancel</button>
         
        </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </>
  );
};

export default AddStaff;

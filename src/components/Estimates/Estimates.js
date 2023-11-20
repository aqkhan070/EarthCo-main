import EstimateTR from "./EstimateTR";
import "./Estimates.css";
import { useContext, useEffect, useRef, useState } from "react";
import StatusCardsEst from "./StatusCardsEst";
import { DataContext } from "../../context/AppData";
import { RoutingContext } from "../../context/RoutesContext";
import { Form } from "react-bootstrap";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import { Autocomplete, TextField } from "@mui/material";
import StatusCards from "./StatusCards";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import useGetEstimate from "../Hooks/useGetEstimate";

const Estimates = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const activeRef = useRef(null);

  const { estimates, isLoading, tableError, getEstimate } = useGetEstimate();

  // const { estimates, setSingleObj } = useContext(DataContext);
  const { setEstimateRoute } = useContext(RoutingContext);

 
  const [selectedCustomer, setSelectCustomer] = useState({});

  const [customer, setCustomer] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [opacity, setOpacity] = useState("50%");

  const [locations, setLocations] = useState(["Select Customer First"]);

 
  const [showStatusCards, setShowStatusCards] = useState(true);
 

  const navigate = useNavigate();

 
  useEffect(() => {
    getEstimate();
    setShowStatusCards(true);
  }, []);

  useEffect(() => {
    if (customer !== "" && serviceLocation !== "Select Customer First") {
      setOpacity("100%");
    } else {
      setOpacity("50%");
    }
  }, [serviceLocation, customer]);

  const popUpData = estimates.map((object) => {
    return {
      name: object.customerName,
      quantity: object.quantity,
    };
  });

  const handleCatClick = (type, id) => {
    setEstimateRoute(type);
    const updatedArr = estimates.filter((object) => {
      if (id === object.estimateID) {
        return object;
      }
      return null;
    });
    // setSingleObj(updatedArr);
  };

  const customerOptions = estimates.map((item) => {
    return item.customerName;
  });
  const qtyOptions = estimates.map((item) => {
    return item.quantity;
  });

  const openModal = () => {};

  const handleSelectCustomer = (name) => {
    const updatedArr = popUpData.filter((object) => {
      if (object.name === name) {
        return object;
      }
      return null;
    });
    setSelectCustomer(updatedArr[0] || []);
    // setServiceLocation('Select Customer First')
  };

  useEffect(() => {
    if (selectedCustomer.locations !== undefined) {
      const updatedArr = selectedCustomer.locations.map((loc) => {
        return loc.name;
      });
      setLocations(updatedArr);
    }
  }, [selectedCustomer]);

  console.log(locations);

  const handleChangeCustomer = (e, value) => {
    setCustomer(value);
    setServiceLocation("");
    handleSelectCustomer(value);
    // if (e.target.value === 'Select Customer')
    //     setLocationLabel('Select Customer First...')
    // else
    //     setLocationLabel('Select Service Location...')
  };
  console.log(selectedCustomer);
  const goToAddEst = () => {
    if (
      customer !== "Select Customer" &&
      serviceLocation !== "Select Customer First" &&
      serviceLocation !== ""
    ) {
      document.getElementById("closer").click();
      navigate("/Dashboard/Estimates/Add-Estimate");
    }
  };

  const saveAddEstPop = () => {};

  return (
    <div className="container-fluid">
      <div className="row">
        {showStatusCards && <StatusCards />}

        {/* <StatusCardsEst
          drafts={28102}
          sent={7089}
          approved={4576}
          rejected={145}
          total={39912}
        /> */}
        <div className="col-xl-12">
          <div className="">
            <div className="">
              {tableError && (
                <Alert severity="error">Error Loading Estimates!</Alert>
              )}

              {isLoading ? (
                <div className="center-loader">
                  <CircularProgress style={{ color: "#789a3d" }} />
                </div>
              ) : (
                <div>
                  <EstimateTR
                    headers={headers}
                    getEstimate={getEstimate}
                    estimates={estimates}
                    setShowStatusCards={setShowStatusCards}
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
              <h5 className="modal-title">Add Estimate</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={saveAddEstPop}>
              <div className="modal-body">
                <div className="basic-form">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label">Customer</label>
                    <div className="col-sm-8">
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={customerOptions}
                        value={customer}
                        onChange={handleChangeCustomer}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Customer"
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <label className="col-sm-4 col-form-label">Quantity</label>
                    <div className="col-sm-8">
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo cutomerAF"
                        size="small"
                        options={qtyOptions}
                        value={serviceLocation}
                        onChange={(e, val) => setServiceLocation(val)}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Quantity"
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
                  id="closer"
                  className="btn btn-danger light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/Dashboard/Estimates/Add-Estimate");
                  }}
                  style={{ opacity: opacity }}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimates;

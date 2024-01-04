import EstimateTR from "./EstimateTR";
import "./Estimates.css";
import { useContext, useEffect, useRef, useState } from "react";
import StatusCardsEst from "./StatusCardsEst";
import { DataContext } from "../../context/AppData";
import { RoutingContext } from "../../context/RoutesContext";

import { NavLink, useNavigate } from "react-router-dom";

import { Autocomplete, TextField } from "@mui/material";
import StatusCards from "./StatusCards";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import useGetEstimate from "../Hooks/useGetEstimate";

const Estimates = ({ setestmPreviewId }) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const {
    estimates,
    estmRecords,
    isLoading,
    tableError,
    getEstimate,
    getFilteredEstimate,
  } = useGetEstimate();

  // const { estimates, setSingleObj } = useContext(DataContext);
  const { setEstimateRoute } = useContext(RoutingContext);

  const [open, setOpen] = useState(0);
  const [closed, setClosed] = useState(0);
  const [accepted, setAccepted] = useState(0);
  useEffect(() => {
    // Filter the estimates array to get only the entries with Status === "Pending"
    const pendingEstimates = estimates.filter(
      (estimate) => estimate.Status === "Pending"
    );
    const pendingClosed = estimates.filter(
      (estimate) => estimate.Status === "Closed"
    );
    const pendingAccepted = estimates.filter(
      (estimate) => estimate.Status === "Accepted"
    );

    // Update the state variable with the number of pending estimates
    setOpen(pendingEstimates.length);
    setClosed(pendingClosed.length);
    setAccepted(pendingAccepted.length);
  }, [estimates]);

  const [statusId, setStatusId] = useState(0);
  const [selectedCustomer, setSelectCustomer] = useState({});

  const [customer, setCustomer] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [opacity, setOpacity] = useState("50%");

  const [locations, setLocations] = useState(["Select Customer First"]);

  const [showStatusCards, setShowStatusCards] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getEstimate();
    // getFilteredEstimate();
    console.log("Test", estimates);
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
      navigate("/estimates/add-estimate");
    }
  };

  const saveAddEstPop = () => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {showStatusCards && (
            <StatusCards
              estmRecords={estmRecords}
              statusId={statusId}
              setStatusId={setStatusId}
              closed={closed}
              accepted={accepted}
              open={open}
            />
          )}

        
          
        </div>

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
              tableError={tableError}
              setShowStatusCards={setShowStatusCards}
              setestmPreviewId={setestmPreviewId}
              statusId={statusId}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Estimates;

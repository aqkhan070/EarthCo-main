import React, { useContext } from "react";
import ServiceRequestTR from "./ServiceRequestTR";
import { useEffect, useState } from "react";
import StatusCards from "./StatusCards";
import { Form } from "react-bootstrap";
import "datatables.net";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import useFetchServiceRequests from "../Hooks/useFetchServiceRequests";
import { DataContext } from "../../context/AppData";

const ServiceRequests = () => {
  const {
    isLoading,
    fetchServiceRequest,
    totalRecords,
    fetchFilterServiceRequest,
    sRFilterList,
    serviceRequest,
    sRfetchError,
  } = useFetchServiceRequests();

  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const userdata = Cookies.get("userData");
  const [showCards, setShowCards] = useState(true);

  // const [locationOptions, setLocationOptions] = useState();
  const [open, setOpen] = useState(0);
  const [closed, setClosed] = useState(0);
  const { statusId, setStatusId } = useContext(DataContext);

  useEffect(() => {
    // Filter the estimates array to get only the entries with Status === "Pending"
    const pendingEstimates = serviceRequest.filter(
      (estimate) => estimate.Status === "Open"
    );
    const pendingClosed = serviceRequest.filter(
      (estimate) => estimate.Status === "Closed"
    );

    // Update the state variable with the number of pending estimates
    setOpen(pendingEstimates.length);
    setClosed(pendingClosed.length);
  }, [serviceRequest]);

  useEffect(() => {
  
    return () => {
      setStatusId(0);
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {showCards && (
            <StatusCards
              setStatusId={setStatusId}
              statusId={statusId}
              totalRecords
              newData={1178}
              open={totalRecords.totalOpenRecords}
              closed={totalRecords.totalClosedRecords}
              total={78178}
            />
          )}

          {isLoading ? (
            <div className="center-loader">
              <CircularProgress style={{ color: "#789a3d" }} />
            </div>
          ) : (
            <div>
              <ServiceRequestTR
                sRfetchError={sRfetchError}
                headers={headers}
                serviceRequest={serviceRequest}
                setShowCards={setShowCards}
   
                statusId={statusId}
                fetchFilterServiceRequest={fetchFilterServiceRequest}
                sRFilterList={sRFilterList}
                totalRecords={totalRecords}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceRequests;

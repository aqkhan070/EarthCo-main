import EstimateTR from "./EstimateTR";
import "./Estimates.css";
import { useContext, useEffect, useRef, useState } from "react";

import { DataContext } from "../../context/AppData";
import StatusCards from "./StatusCards";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";

import useGetEstimate from "../Hooks/useGetEstimate";

const Estimates = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const {
    estmRecords,
    isLoading,
    tableError,
    filterdEstm,
    getFilteredEstimate,
  } = useGetEstimate();

  const { statusId, setStatusId } = useContext(DataContext);

  useEffect(() => {
    return () => {
      setStatusId(0);
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <StatusCards
            estmRecords={estmRecords}
            statusId={statusId}
            setStatusId={setStatusId}
          />
        </div>

        {isLoading ? (
          <div className="center-loader">
            <CircularProgress style={{ color: "#789a3d" }} />
          </div>
        ) : (
          <div>
            <EstimateTR
              headers={headers}
              statusId={statusId}
              estmRecords={estmRecords}
              tableError={tableError}
              filterdEstm={filterdEstm}
              getFilteredEstimate={getFilteredEstimate}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Estimates;

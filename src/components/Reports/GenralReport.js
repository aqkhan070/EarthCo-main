import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/AppData";
import SummaryReportPreview from "./SummaryReportPreview";
import ProposalSummary from "./ProposalSummary";
import Landscape from "../Landscape/Landscape";
import { Print, Email, Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const GenralReport = () => {
  const {
    sRProposalData,
    setsRProposalData,
    toggleFullscreen,
    setToggleFullscreen,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const handlePrint = () => {
    setToggleFullscreen(false);
    setTimeout(() => {
      window.print();
    }, 1000);
    setTimeout(() => {
      setToggleFullscreen(true);
    }, 3000);
  };

  useEffect(() => {
    console.log("sr data", sRProposalData);
  }, []);

  return (
    <>
    <div className="container-fluid ">
          {toggleFullscreen  ? (
      <div className="row me-4">
       
        <div className="col-md-11 text-end">
          {" "}
          <button
            className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
            onClick={() => {
              navigate(`/SummaryReport`);
            }}
          >
            <i className="fa fa-backward"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
            onClick={handlePrint}
          >
           <i className="fa fa-print"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
            
          >
            <i className="fa fa-download"></i>
          </button>
        </div>
      </div>
    ) : (
      <></>
    )}

      <div className={toggleFullscreen ? "" : "full-page-print-height"}>
        <SummaryReportPreview />
      </div>
      <div className={toggleFullscreen ? "" : "full-page-print-height"}>
        <ProposalSummary />
      </div>
      <div className={toggleFullscreen ? "" : "full-page-print-height"}>
        <Landscape />
      </div>
      </div>
    </>
  );
};

export default GenralReport;

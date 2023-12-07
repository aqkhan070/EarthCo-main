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
      {toggleFullscreen ? (
        <div  className="container-fluid">
          <div className="row justify-content-between ">
            <div className="col-md-3 text-start pb-0">
              <button
                className="btn btn-secondary btn-sm mb-0 mt-3 ms-2"
                onClick={() => {
                  navigate(`/SummaryReport`);
                }}
              >
                &#60; Back
              </button>
            </div>
            <div className="col-md-3 text-end">
              {" "}
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                onClick={handlePrint}
              >
                <Print />
              </button>
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                //   onClick={handleDownload}
              >
                <Download />
              </button>
            </div>
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
    </>
  );
};

export default GenralReport;

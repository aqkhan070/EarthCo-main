import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/AppData";
import SummaryReportPreview from "./SummaryReportPreview";
import ProposalSummary from "./ProposalSummary";
import Landscape from "../Landscape/Landscape";
import { Print, Email, Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import useFetchCustomerEmail from "../Hooks/useFetchCustomerEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";

const GenralReport = () => {
  const {
    sRProposalData,
    setsRProposalData,
    toggleFullscreen,
    setToggleFullscreen,
  } = useContext(DataContext);

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const customerParam = Number(queryParams.get("Customer"));
  const MonthParam = Number(queryParams.get("Month"));
  const yearParam = Number(queryParams.get("Year"));
  const {customerMail, fetchCustomerEmail} = useFetchCustomerEmail();
  const { name, setName, fetchName} = useFetchCustomerName()

  const isMail = queryParams.get("isMail");

  const navigate = useNavigate();
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  const handlePrint = () => {
    setToggleFullscreen(false);
    setTimeout(() => {
      window.print();
    }, 1000);
    setTimeout(() => {
      setToggleFullscreen(true);
    }, 3000);
  };


  const handleDownload = async () => {
    const input = document.getElementById("General-preview");
  
    input.style.fontFamily = "Times New Roman";
  
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "landscape",
    });
  
    const contentHeight = input.offsetHeight;
    const pageHeightInPixels = 1122; // Approximate pixel height of an A4 page in landscape at 300 DPI
    let remainingHeight = contentHeight;
  
    let position = 0; // Position to start slicing the content vertically
  
    while (remainingHeight > 0) {
        // Create a canvas for each page segment
        const canvas = await html2canvas(input, {
            dpi: 300,
            scale: 3,
            windowHeight: pageHeightInPixels,
            y: position,
        });
  
        // Add the canvas to the PDF
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const imgWidth = 297; // A4 width in mm in landscape mode
        let imgHeight = 650;
  
        if (position !== 0) {
            // Add a new page after the first
            pdf.addPage();
        }
  
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  
        // Update the position and remaining height
        position += pageHeightInPixels;
        remainingHeight -= pageHeightInPixels;
    }
  
    pdf.save("General.pdf");
  
    input.style.fontFamily = ""; // Reset font style
  };

  useEffect(() => {
    console.log("sr data", sRProposalData);
    fetchCustomerEmail(customerParam);
    fetchName(customerParam)
  }, []);

  return (
    <>
      <EventPopups
        open={showEmailAlert}
        setOpen={setShowEmailAlert}
        color={emailAlertColor}
        text={emailAlertTxt}
      />
      <div className="container-fluid ">
        {toggleFullscreen ? (
        <div className="print-page-width">
        <div style={{ width: "28.7cm" }}>
          <div className="row ">
            <div className="col-md-1">
              {isMail ? (
                <></>
              ) : (
                <button
                          className="btn btn-sm btn-outline-secondary custom-csv-link estm-action-btn mb-2 mt-3 "
                          onClick={() => {
                            navigate(`/summary-report`);
                          }}
                          style={{ padding: "5px 10px" }}
                        >
                          <ArrowBackIcon sx={{ fontSize: 17 }} />
                        </button>
              )}
            </div>
            <div className="col-md-11 text-end">
              {" "}
              <button
                        className="btn btn-sm btn-outline-secondary custom-csv-link mb-2 mt-3 estm-action-btn"
                        onClick={handlePrint}
                      >
                        <i className="fa fa-print"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary custom-csv-link mb-2 mt-3 estm-action-btn"
                        onClick={handleDownload}
                      >
                        <i className="fa fa-download"></i>
                      </button>
              {isMail ? (
                <></>
              ) : (
                <button
                          className="btn btn-sm btn-outline-secondary custom-csv-link mb-2 mt-3 estm-action-btn"
                          onClick={() => {
                            // sendEmail(
                            //   `/general-report?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                            //   customerParam,
                            //   0,
                            //   false
                            // );
                            navigate(`/send-mail?title=${"Report"}&mail=${customerMail}&customer=${name}`);
                          }}
                        >
                          <i className="fa-regular fa-envelope"></i>
                        </button>
              )}
            </div>
          </div>
        </div>
        </div>
        ) : (
          <></>
        )}
        <div id="General-preview">
          <div style={{minHeight : "30cm"}} className={toggleFullscreen ? "" : "full-page-print-height "}>
            <SummaryReportPreview />
          </div>
          <div style={{minHeight : "30cm"}} className={toggleFullscreen ? "" : "full-page-print-height"}>
            <ProposalSummary />
          </div>
          <div className={toggleFullscreen ? "" : "full-page-print-height"}>
            <Landscape />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenralReport;

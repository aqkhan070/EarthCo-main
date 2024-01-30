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
  
    // Explicitly set the font for the PDF generation
    input.style.fontFamily = "Times New Roman";
  
    // Use html2canvas to capture the content as an image with higher DPI
    const canvas = await html2canvas(input, { dpi: 300, scale: 4 }); // Adjust DPI as needed
  
    // Calculate the width and height of the PDF based on the A4 landscape format
    const pdfWidth = 297; // A4 width in mm
    const pdfHeight = 210; // A4 height in mm
  
    // Create a new jsPDF instance with landscape orientation
    const pdf = new jsPDF({
      unit: "mm",
      format: [pdfWidth, pdfHeight],
      orientation: "landscape",
    });
  
    // Add the captured image to the PDF
    pdf.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, pdfWidth, pdfHeight);
  
    // Save the PDF
    pdf.save("General.pdf");
  
    // Reset the font to its default value
    input.style.fontFamily = "";
  };

  useEffect(() => {
    console.log("sr data", sRProposalData);
    fetchCustomerEmail(customerParam);
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
          <div className="row me-4">
            <div className="col-md-11 text-end">
              {" "}
              {isMail ? (
                <></>
              ) : (
                <button
                  className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
                  onClick={() => {
                    navigate(`/summary-report`);
                  }}
                  style={{ padding: "5px 10px" }}
                >
                  <ArrowBackIcon sx={{ fontSize: 17 }} />
                </button>
              )}
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                onClick={handlePrint}
              >
                <i className="fa fa-print"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                onClick={handleDownload}
              >
                <i className="fa fa-download"></i>
              </button>
              {isMail ? (
                <></>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                  onClick={() => {
                    // sendEmail(
                    //   `/general-report?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                    //   customerParam,
                    //   0,
                    //   false
                    // );
                    navigate(`/send-mail?title=${"Report"}&mail=${customerMail}`);
                  }}
                >
                  <i className="fa-regular fa-envelope"></i>
                </button>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div id="General-preview">
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
      </div>
    </>
  );
};

export default GenralReport;

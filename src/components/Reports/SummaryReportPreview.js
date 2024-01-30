import React, { useContext, useEffect } from "react";
import formatDate from "../../custom/FormatDate";
import logo from "../../assets/images/logo/earthco_logo.png";
import useFetchProposalReports from "../Hooks/useFetchProposalReports";
import { CircularProgress } from "@mui/material";
import { DataContext } from "../../context/AppData";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import useFetchCustomerEmail from "../Hooks/useFetchCustomerEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";

const SummaryReportPreview = () => {
  const {
    sRProposalData,
    setsRProposalData,
    toggleFullscreen,
    setToggleFullscreen,
  } = useContext(DataContext);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  const customerParam = Number(queryParams.get("Customer"));
  const MonthParam = Number(queryParams.get("Month"));
  const yearParam = Number(queryParams.get("Year"));
  const isMail = queryParams.get("isMail");

  const { loading, reportError, reportData, fetchReport } =
    useFetchProposalReports();
    const {customerMail, fetchCustomerEmail} = useFetchCustomerEmail();
    const { name, setName, fetchName} = useFetchCustomerName()

  const isGeneralReport = window.location.pathname.includes("general-report");

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
    const input = document.getElementById("summeryReport-preview");
  
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
    pdf.save("Summary Report.pdf");
  
    // Reset the font to its default value
    input.style.fontFamily = "";
  };
  

  useEffect(() => {
    fetchReport(customerParam, yearParam, MonthParam, "Service Request");
    fetchCustomerEmail(customerParam);
    console.log("sr propoal dala", sRProposalData);
  }, []);
  useEffect(() => {
    if (reportData[0]?.CustomerId) {
       fetchName(reportData[0].CustomerId || 0)
    }
  
  }, [reportData]);


  if (reportError) {
    return (
      <div className="text-center">
        {" "}
        <h3>No record found</h3>
      </div>
    );
  }

  return (
    <>
      <EventPopups
        open={showEmailAlert}
        setOpen={setShowEmailAlert}
        color={emailAlertColor}
        text={emailAlertTxt}
      />
      {loading ? (
        <div className="center-loader">
          <CircularProgress style={{ color: "#789a3d" }} />
        </div>
      ) : (
        <div className="container-fluid ">
          {toggleFullscreen && !isGeneralReport ? (
            <div className="row me-3">
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
                      navigate(
                        `/send-mail?title=${"Service Request Summary Report"}&mail=${customerMail}`
                      );

                      // sendEmail(
                      //   `/summary-report-preview?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                      //   customerParam,
                      //   0,
                      //   false
                      // );
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

          <div  style={{ fontFamily: "Times New Roman" }} className="print-page-width">
            <div className="PageLandscape mt-2">
              <div className="card">
                {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                    <strong>Status:</strong> Pending</span> </div> */}
                <div
                  id="summeryReport-preview"
                  className="card-body perview-pd get-preview"
                >
                  <div className="row mb-5">
                    <div className="mt-2 col-xl-3 col-lg-3 col-md-3 col-sm-3">
                      <div style={{ color: "black" }}>EarthCo <br />1225 E Wakeham <br />Santa Ana , Ca 92705</div>
                     
                     

                      <div style={{ color: "black" }} className="mt-4">Submitted To: </div>
                      <div style={{ color: "black" }}> {name} {reportData[0].CompanyName}</div>
                      <div style={{ color: "black" }}>
                        {reportData[0].Address}
                      </div>
                    </div>
                    <div className="mt-3 col-xl-7 col-lg-7 col-md-7 col-sm-6 px-0 text-center">
                      <h3 className="table-cell-align">
                        {" "}
                        <strong>Service Request Summary Report</strong>{" "}
                      </h3>
                      <h3>Grandview Crest</h3>
                    </div>
                    <div className="mt-2 col-xl-2 col-lg-2 col-md-2 col-sm-3 ">
                      <div className="brand-logo mb-2 inovice-logo">
                        <img
                          className="preview-Logo"
                          style={{ width: "12em" }}
                          src={logo}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="col-sm-12 col-md-12">
                    <table className="text-center table table-bordered ">
                      <thead>
                        <tr className="preview-table-head">
                          <th>RECEIVED:</th>
                          <th>W/O #:</th>
                          <th style={{ maxWidth: "15em" }}>REQUESTED WORK:</th>
                          <th style={{ maxWidth: "15em" }}>
                            EARTHCO'S ACTION TAKEN
                          </th>
                          <th>STATUS: </th>
                          <th>COMPLETED:</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((report, index) => {
                          return (
                            <tr className="preview-table-row" key={index}>
                              <td>{formatDate(report.CreatedDate, false)}</td>
                              <td className="left strong">
                                {report.ServiceRequestNumber}
                              </td>
                              <td style={{ maxWidth: "15em" }}>
                                {report.WorkRequest}
                              </td>
                              <td style={{ maxWidth: "15em" }}>
                                {report.ActionTaken}
                              </td>
                              <td>{report.Status}</td>
                              <td>{formatDate(report.CompletedDate, false)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryReportPreview;

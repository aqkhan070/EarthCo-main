import React, { useContext, useEffect } from "react";
import useFetchProposalReports from "../Hooks/useFetchProposalReports";
import { DataContext } from "../../context/AppData";
import { CircularProgress } from "@mui/material";
import formatDate from "../../custom/FormatDate";
import logo from "../../assets/images/logo/earthco_logo.png";
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

const ProposalSummary = () => {
  const {
    sRProposalData,
    setsRProposalData,
    toggleFullscreen,
    setToggleFullscreen,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const isGeneralReport = window.location.pathname.includes("general-report");

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const customerParam = Number(queryParams.get("Customer"));
  const MonthParam = Number(queryParams.get("Month"));
  const yearParam = Number(queryParams.get("Year"));
  const isMail = queryParams.get("isMail");

  const { loading, reportError, reportData, fetchReport } =
    useFetchProposalReports();
  const { customerMail, fetchCustomerEmail } = useFetchCustomerEmail();
  const { name, setName, fetchName} = useFetchCustomerName()
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  useEffect(() => {
    fetchReport(customerParam, yearParam, MonthParam, "proposal");
    // fetchEmail(reportData[0].ContactId);
    fetchCustomerEmail(customerParam);

    console.log("sr propoal dala", reportData);
  }, []);

  useEffect(() => {
    if (reportData[0]?.CustomerId) {
       fetchName(reportData[0].CustomerId || 0)
    }
  
  }, [reportData]);

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
    const input = document.getElementById("PS-preview");
  
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
    pdf.save("Proposal Summary.pdf");
  
    // Reset the font to its default value
    input.style.fontFamily = "";
  };
  
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
                      // sendEmail(
                      //   `/proposal-summary?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                      //   customerParam,
                      //   0,
                      //   false
                      // );
                      navigate(
                        `/send-mail?title=${"Proposal Summary"}&mail=${customerMail}`
                      );
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
                  id="PS-preview"
                  className="card-body perview-pd get-preview"
                >
                  <div className="row mb-5">
                    <div className="mt-2 col-xl-3 col-lg-3 col-md-3 col-sm-3 ">
                      <div style={{ color: "black" }}>EarthCo <br />1225 E Wakeham <br />Santa Ana , Ca 92705</div>
                      <div style={{ color: "black" }}>
                        
                      </div>
                      <div style={{ color: "black" }}>
                        {reportData[0].Address}
                      </div>
                      <div className="mt-4" style={{ color: "black" }}>Submitted To: </div>
                      <div style={{ color: "black" }}>
                      {name}
                      </div>
                    </div>
                    <div className="mt-5 col-xl-7 col-lg-7 col-md-7 col-sm-6 text-center">
                      <h3>
                        {" "}
                        <strong>Proposal Summary Report</strong>{" "}
                      </h3>
                      <h3>Grandview Crest</h3>
                    </div>
                    <div className="mt-2 col-xl-2 col-lg-2 col-md-2 col-sm-3 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                      <div className="brand-logo mb-2 inovice-logo">
                        <img
                          className="preview-Logo"
                          style={{ width: "13em" }}
                          src={logo}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="table-responsive">
                    <table className="text-center table table-bordered ">
                      <thead>
                        <tr className="preview-table-head text-start">
                          <th>SUBMITTED</th>
                          <th>PROPOSAL #</th>
                          <th style={{ maxWidth: "20em" }}>DESCRIPTION</th>
                          <th className="text-end">AMOUNT</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((report, index) => {
                          return (
                            <tr className="preview-table-row text-start" key={index}>
                              <td>{formatDate(report.CreatedDate, false)}</td>
                              <td className="left strong">
                                {report.EstimateNumber}
                              </td>
                              <td style={{ maxWidth: "20em" }}>
                                {report.EstimateNotes}
                              </td>
                              <td className="text-end">
                                $
                                {report.TotalAmount.toFixed(2).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}
                              </td>
                              <td>{report.Status}</td>
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

export default ProposalSummary;

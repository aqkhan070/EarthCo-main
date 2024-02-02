import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import formatDate from "../../custom/FormatDate";
import logo from "../../assets/images/logo/earthco_logo.png";
import { DataContext } from "../../context/AppData";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import TblDateFormat from "../../custom/TblDateFormat";
import useFetchContactEmail from "../Hooks/useFetchContactEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";

const Landscape = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  const {
    sRProposalData,
    setsRProposalData,
    toggleFullscreen,
    setToggleFullscreen,
    loggedInUser,
    setLoggedInUser,
  } = useContext(DataContext);

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");

  const customerParam = Number(queryParams.get("Customer"));
  const MonthParam = Number(queryParams.get("Month"));
  const yearParam = Number(queryParams.get("Year"));

  const isGeneralReport = window.location.pathname.includes("general-report");

  const [landscapeData, setLandscapeData] = useState({});
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();
  const { contactEmail, fetchEmail } = useFetchContactEmail();
  const { name, setName, fetchName} = useFetchCustomerName()

  const getLandscape = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/GetMonthlyLandsacpe?id=${idParam}&CustomerId=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
        { headers }
      );
      setLandscapeData(res.data);
      fetchEmail(res.data.ContactId);
      fetchName(res.data.CustomerId)
      console.log("reponse landscape is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };
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
    const input = document.getElementById("landscape-preview");
  
    // Explicitly set the font for the PDF generation
    input.style.fontFamily = "Times New Roman";
  
    // Use html2canvas to capture the content as an image with higher DPI
    const canvas = await html2canvas(input, { dpi: 300, scale: 4 }); // Adjust DPI as needed
  
    // Calculate the height of the PDF based on the content
    const pdfHeight = (canvas.height * 210) / canvas.width; // Assuming 'a4' format
  
    // Create a new jsPDF instance
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });
  
    // Add the captured image to the PDF
    pdf.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, 210, pdfHeight);
  
    // Save the PDF
    pdf.save("Landscape.pdf.pdf");
  
    // Reset the font to its default value
    input.style.fontFamily = "";
  };
  
  const getLandscapebyCustomerId = async () => {
    if (!idParam) {
      return;
    }
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/GetMonthlyLandsacpe?id=${idParam}`,
        { headers }
      );
      setLandscapeData(res.data);
      console.log("reponse landscape is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  useEffect(() => {
    getLandscape();
    // getLandscapebyCustomerId();
    console.log("landscap data", sRProposalData);
  }, [sRProposalData]);
 

  return (
    <>
      {" "}
      <EventPopups
        open={showEmailAlert}
        setOpen={setShowEmailAlert}
        color={emailAlertColor}
        text={emailAlertTxt}
      />
      <div
        style={{ fontFamily: "Times New Roman" }}
        className="container-fluid "
      >
        {toggleFullscreen && !isGeneralReport ? (
          <div className="row me-4">
            <div className="col-md-10 text-end">
              {" "}
              {isMail ? (
                <></>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary custom-csv-link estm-action-btn mb-2 mt-3 "
                  style={{ padding: "5px 10px" }}
                  onClick={() => {
                    navigate(`/landscape`);
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: 17 }} />
                </button>
              )}
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
                    //   `/landscape/landscape-report?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                    //   customerParam,
                    //   0,
                    //   false
                    // );
                    navigate(
                      `/send-mail?title=${"Monthly Landscape"}&mail=${contactEmail}`
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

        <div className="print-page-width">
          <div className="PageA4 mt-2">
            <div className="card">
              {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                    <strong>Status:</strong> Pending</span> </div> */}
              <div
                id="landscape-preview"
                className={
                  !toggleFullscreen
                    ? "get-preview"
                    : "card-body perview-pd get-preview"
                }
              >
                <div className="row mb-2">
                  <div className="mt-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 text-start">
                    <div style={{ color: "black" }}>
                      {" "}
                      <>EarthCo <br />1225 E Wakeham <br />Santa Ana , Ca 92705</>{" "}
                    </div>
                    <div className="mt-4" style={{ color: "black" }}>
                      Submitted To: <br />
                      {name}
                    </div>
                    <div style={{ color: "black" }}>
                      {landscapeData.Address}
                    </div>

                    <div style={{ color: "black" }}>
                      <>Phone:</> {landscapeData.Phone}{" "}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-5 mt-5 ">
                    {" "}
                    <h2 className="text-center"><strong> Landscape Report</strong></h2>
                  </div>

                  <div className=" col-xl-2 col-lg-2 col-md-2 col-sm-4 text-end ">
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

                <div className="row my-2">
                  <div className="col-md-7 col-sm-7">
                    {/* <div className="table-responsive">
                      <table className=" table-striped table table-bordered text-start">
                        <thead>
                          <tr
                            style={{ backgroundColor: "gray" }}
                            className="preview-table-head LandScape-TablePadding"
                          >
                            <th className="landscap-preview-heading">
                              Requested By:
                            </th>
                            <th className="landscap-preview-heading">
                              Service Location:
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="preview-table-row">
                            <td style={{ color: "black" }}>
                              {landscapeData.RequestByName} <br />
                              {landscapeData.ServiceLocationName}
                            </td>
                            <td
                              style={{ color: "black" }}
                              className="left strong"
                            >
                              {landscapeData.ServiceLocationName}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div> */}
                  </div>

                  <div
                    style={{ color: "black" }}
                    className="col-md-3 col-sm-3 text-end"
                  >
                    {" "}
                    <strong>Date Created:</strong>
                  </div>
                  <div className="col-md-2 col-sm-2">
                    <div style={{ color: "black" }} className="text-start">
                      <p className="">
                        {" "}
                        {formatDate(landscapeData.CreatedDate, false)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table-bordered table  LandScape-TablePadding table-50-percent-tds"  >
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td className="landscap-preview-heading" colSpan={2}>
                          <>Maintenance Report</>
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Supervisor visited the job weekly:</strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.SupervisorVisitedthejobweekly
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr  className="preview-table-row">
                        <td >
                          <strong>
                            Completed litter pickup of grounds areas:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.CompletedLitterpickupofgroundareas
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            Completed sweeping or blowing of walkways:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Completedsweepingorblowingofwalkways
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            High priority areas were visited weekly:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.HighpriorityareaswereVisitedweekly
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            V ditches were cleaned and inspected:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.VDitcheswerecleanedandinspected
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            Weep screens inspected and cleaned in rotation
                            section:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {
                            landscapeData.WeepscreeninspectedandcleanedinrotationsectionId
                          }
                        </td>
                      </tr>

                      <tr className="landscap-preview-heading">
                        <td colSpan={2}>
                          <>Lawn Maintenance</>
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Fertilization of turf occurred: </strong>{" "}
                        </td>
                        <td> {landscapeData.Fertilizationoftrufoccoured}</td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Turf was mowed and edged weekly: </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Trufwasmovedandedgedweekly
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="landscap-preview-heading">
                        <td colSpan={2}>
                          <>Shrub Maintenance</>
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            Shrubs trimmed according to rotation schedule:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Shrubstrimmedaccordingtorotationschedule
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Fertilization of shrubs occurred: </strong>{" "}
                        </td>
                        <td> {landscapeData.FertilizationofShrubsoccoured}</td>
                      </tr>
                      <tr className="landscap-preview-heading">
                        <td colSpan={2}>
                          <>Ground Cover and Flowerbed Maint.</>
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            Watering of flowerbeds was completed and checked:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.WateringofflowerbedsCompletedandchecked
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="landscap-preview-heading">
                        <td colSpan={2}>
                          <>Irrigation System</>
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            Heads were adjusted for maximum coverage:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Headswereadjustedformaximumcoverage
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            Repairs were made to maintain an effective system:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Repairsweremadetomaintainaneffectivesystem
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            Controllers were inspected and adjusted:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Controllerswereinspectedandadjusted
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Main line was repaired: </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Mainlinewasrepaired ? "Yes" : "No"}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Valve(s) was repaired: </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Valvewasrepaired ? "Yes" : "No"}
                        </td>
                      </tr>
                      <tr className="landscap-preview-heading">
                        <td colSpan={2}>
                          <>Rotation</>
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            This months expected rotation schedule:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.Thismonthexpectedrotationschedule}
                        </td>
                      </tr>
                      <tr className="landscap-preview-heading">
                        <td colSpan={2}>
                          <>Extra Information</>
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Notes: </strong>{" "}
                        </td>
                        <td> {landscapeData.Notes}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-2">
                  *Note Beginning October 1, Earthco will commence annual skip
                  mowing of the grass due to the winter season
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landscape;

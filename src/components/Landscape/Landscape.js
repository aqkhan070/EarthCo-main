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
  } = useContext(DataContext);

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");

  const customerParam = Number(queryParams.get("Customer"));
  const MonthParam = Number(queryParams.get("Month"));
  const yearParam = Number(queryParams.get("Year"));


  const isGeneralReport = window.location.pathname.includes("general-report");

  const [landscapeData, setLandscapeData] = useState({});
  const { sendEmail } = useSendEmail();

  const getLandscape = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/GetMonthlyLandsacpe?id=${idParam}&CustomerId=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
        { headers }
      );
      setLandscapeData(res.data);
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
  const handleDownload = () => {
    const input = document.getElementById("landscape-preview");

    html2pdf(input, {
      margin: 10,
      filename: "Landscape.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });

    // // Create a jsPDF instance with custom font and font size
    // const pdf = new jsPDF({
    //   orientation: "p",
    //   unit: "mm",
    //   format: "a4",
    // });

    // const scale = 2; // Adjust the scale factor as needed

    // // Calculate the new width and height based on the scale
    // const scaledWidth = pdf.internal.pageSize.getWidth() * scale;
    // const scaledHeight = pdf.internal.pageSize.getHeight() * scale;

    // pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    // pdf.setFont("Roboto");
    // pdf.setFontSize(3); // Adjust the font size as needed

    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const width = pdf.internal.pageSize.getWidth();
    //   const height = pdf.internal.pageSize.getHeight();

    //   pdf.addImage(imgData, "PNG", 0, 0, width, height);
    //   pdf.save("landscape.pdf");
    // });
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
  useEffect(() => {
    console.log("yesr is", yearParam);
  });

  return (
    <>
      <div className="container-fluid ">
        {toggleFullscreen && !isGeneralReport ? (
          <div className="row me-4">
            <div className="col-md-10 text-end">
              {" "}
              {isMail ? <></> : <button
                className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
                onClick={() => {
                  navigate(`/summary-report`);
                }}
              >
                <i className="fa fa-backward"></i>
              </button>}
              
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
              {isMail ? <></> : <button
              className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
              onClick={() => {
                sendEmail(
                  `/landscape/landscape-report?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                  customerParam,
                  0,
                  false
                );
              }}
            >
              <i class="fa-regular fa-envelope"></i>
            </button>}
              
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
                className="card-body perview-pd get-preview"
              >
                <div className="row mb-5">
                  <div className="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-3 text-start">
                    <div style={{ color: "black" }}>
                      {" "}
                      <strong>Earthco</strong>{" "}
                    </div>
                    <div style={{ color: "black" }}>
                      {landscapeData.CompanyName}
                    </div>
                    <div style={{ color: "black" }}>
                      {landscapeData.Address}
                    </div>

                    <div style={{ color: "black" }}>
                      <strong>Phone:</strong> {landscapeData.Phone}{" "}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 mt-5">
                    {" "}
                    <h2 className="text-center">Landscape Report</h2>
                  </div>

                  <div className="mt-4 col-xl-2 col-lg-2 col-md-2 col-sm-3 text-end d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                    <div className="brand-logo mb-2 inovice-logo">
                      <img className="preview-Logo" src={logo} alt="" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <div className="table-responsive">
                      <table className="text-center table-striped table table-bordered ">
                        <thead>
                          <tr
                            style={{ backgroundColor: "gray" }}
                            className="preview-table-head"
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
                              {landscapeData.RequestByName}
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
                    </div>{" "}
                  </div>
                  <div
                    style={{ color: "black" }}
                    className="col-md-2 col-sm-1 text-end"
                  >
                    {" "}
                  </div>
                  <div
                    style={{ color: "black" }}
                    className="col-md-2 col-sm-3 text-end"
                  >
                    {" "}
                    <strong>Date Created:</strong>
                  </div>
                  <div className="col-md-2 col-sm-2">
                    <div style={{ color: "black" }} className="text-start">
                      <p className="">
                        {" "}
                        {formatDate(landscapeData.CreatedDate)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table-bordered table  ">
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
                        <td> {landscapeData.SupervisorVisitedthejobweekly}</td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>
                            Completed litter pickup of grounds areas:{" "}
                          </strong>{" "}
                        </td>
                        <td>
                          {" "}
                          {landscapeData.CompletedLitterpickupofgroundareas}
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
                          {landscapeData.Completedsweepingorblowingofwalkways}
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
                          {landscapeData.HighpriorityareaswereVisitedweekly}
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
                          {landscapeData.VDitcheswerecleanedandinspected}
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
                        <td> {landscapeData.Trufwasmovedandedgedweekly}</td>
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
                          {
                            landscapeData.Shrubstrimmedaccordingtorotationschedule
                          }
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
                          {
                            landscapeData.WateringofflowerbedsCompletedandchecked
                          }
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
                          {landscapeData.Headswereadjustedformaximumcoverage}
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
                          {
                            landscapeData.Repairsweremadetomaintainaneffectivesystem
                          }
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
                          {landscapeData.Controllerswereinspectedandadjusted}
                        </td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Main line was repaired: </strong>{" "}
                        </td>
                        <td> {landscapeData.Mainlinewasrepaired}</td>
                      </tr>
                      <tr className="preview-table-row">
                        <td>
                          <strong>Valve(s) was repaired: </strong>{" "}
                        </td>
                        <td> {landscapeData.Valvewasrepaired}</td>
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

                <p className="mt-5">
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

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

const Landscape = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  const { sRProposalData, setsRProposalData } = useContext(DataContext);

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const [landscapeData, setLandscapeData] = useState({});

  const getLandscape = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/GetMonthlyLandsacpe?id=${idParam}&CustomerId=${sRProposalData.formData.CustomerId}&Year=${sRProposalData.formData.Year}&Month=${sRProposalData.formData.Month}`,
        { headers }
      );
      setLandscapeData(res.data);
      console.log("reponse landscape is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };
  const handlePrint = () => {
    window.print();
  };
  const handleDownload = () => {
    const input = document.getElementById("landscape-preview");

    // Create a jsPDF instance with custom font and font size
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const scale = 2; // Adjust the scale factor as needed

    // Calculate the new width and height based on the scale
    const scaledWidth = pdf.internal.pageSize.getWidth() * scale;
    const scaledHeight = pdf.internal.pageSize.getHeight() * scale;

    pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    pdf.setFont("Roboto");
    pdf.setFontSize(3); // Adjust the font size as needed

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("landscape.pdf");
    });
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
      <div style={{ maxWidth: "70em" }} className="container-fluid">
        <div className="row justify-content-between ">
          <div className="col-md-3 text-start pb-0">
            <button
              className="btn btn-secondary btn-sm mb-0 mt-3 ms-2"
              onClick={() => {
                navigate(`/Dashboard/SummaryReport`);
              }}
            >
              &#60; Back
            </button>
          </div>
          <div className="col-md-3 text-end">
            {" "}
            <button
              className="btn btn-sm btn-outline-primary mb-2 mt-3 mx-3 estm-action-btn"
              onClick={handlePrint}
            >
              <Print />
            </button>
            <button
              className="btn btn-sm btn-outline-primary mb-2 mt-3 mx-3 estm-action-btn"
              onClick={handleDownload}
            >
              <Download />
            </button>
          </div>
        </div>

        <div className="card mt-3">
          {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                    <strong>Status:</strong> Pending</span> </div> */}
          <div id="landscape-preview" className="card-body get-preview">
            <div className="row mb-5">
              <div className="mt-4 col-xl-10 col-lg-10 col-md-10 col-sm-6 text-start">
                <div>
                  {" "}
                  <strong>Earthco</strong>{" "}
                </div>
                <div>{landscapeData.CompanyName}</div>
                <div>{landscapeData.Address}</div>

                <div>
                  <strong>Phone:</strong> {landscapeData.Phone}{" "}
                </div>
              </div>

              <div className="mt-4 col-xl-2 col-lg-2 col-md-2 col-sm-6 text-end d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                <div className="brand-logo mb-2 inovice-logo">
                  <img className="preview-Logo" src={logo} alt="" />
                </div>
              </div>
            </div>
            <h2 className="text-center">Landscape Report</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="table-responsive">
                  <table className="text-center table-striped table table-bordered ">
                    <thead>
                      <tr>
                        <th>Requested By:</th>
                        <th>Service Location: </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{landscapeData.RequestByName}</td>
                        <td className="left strong">
                          {landscapeData.ServiceLocationName}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>{" "}
              </div>
              <div className="col-md-6">
                <div className="text-right">
                  <strong>Date Created:</strong>{" "}
                  {formatDate(landscapeData.CreatedDate)}
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table-bordered table  ">
                <thead></thead>
                <tbody>
                  <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                    <td colSpan={2}>
                      <strong>Maintenance Report</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Supervisor visited the job weekly:</strong>{" "}
                    </td>
                    <td> {landscapeData.SupervisorVisitedthejobweekly}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        Completed litter pickup of grounds areas:{" "}
                      </strong>{" "}
                    </td>
                    <td> {landscapeData.CompletedLitterpickupofgroundareas}</td>
                  </tr>
                  <tr>
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
                  <tr>
                    <td>
                      <strong>High priority areas were visited weekly: </strong>{" "}
                    </td>
                    <td> {landscapeData.HighpriorityareaswereVisitedweekly}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>V ditches were cleaned and inspected: </strong>{" "}
                    </td>
                    <td> {landscapeData.VDitcheswerecleanedandinspected}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        Weep screens inspected and cleaned in rotation section:{" "}
                      </strong>{" "}
                    </td>
                    <td>
                      {" "}
                      {
                        landscapeData.WeepscreeninspectedandcleanedinrotationsectionId
                      }
                    </td>
                  </tr>

                  <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                    <td colSpan={2}>
                      <strong>Lawn Maintenance</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Fertilization of turf occurred: </strong>{" "}
                    </td>
                    <td> {landscapeData.Fertilizationoftrufoccoured}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Turf was mowed and edged weekly: </strong>{" "}
                    </td>
                    <td> {landscapeData.Trufwasmovedandedgedweekly}</td>
                  </tr>
                  <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                    <td colSpan={2}>
                      <strong>Shrub Maintenance</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        Shrubs trimmed according to rotation schedule:{" "}
                      </strong>{" "}
                    </td>
                    <td>
                      {" "}
                      {landscapeData.Shrubstrimmedaccordingtorotationschedule}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Fertilization of shrubs occurred: </strong>{" "}
                    </td>
                    <td> {landscapeData.FertilizationofShrubsoccoured}</td>
                  </tr>
                  <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                    <td colSpan={2}>
                      <strong>Ground Cover and Flowerbed Maint.</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        Watering of flowerbeds was completed and checked:{" "}
                      </strong>{" "}
                    </td>
                    <td>
                      {" "}
                      {landscapeData.WateringofflowerbedsCompletedandchecked}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                    <td colSpan={2}>
                      <strong>Irrigation System</strong>
                    </td>
                  </tr>
                  <tr>
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
                  <tr>
                    <td>
                      <strong>
                        Repairs were made to maintain an effective system:{" "}
                      </strong>{" "}
                    </td>
                    <td>
                      {" "}
                      {landscapeData.Repairsweremadetomaintainaneffectivesystem}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Controllers were inspected and adjusted: </strong>{" "}
                    </td>
                    <td>
                      {" "}
                      {landscapeData.Controllerswereinspectedandadjusted}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Main line was repaired: </strong>{" "}
                    </td>
                    <td> {landscapeData.Mainlinewasrepaired}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Valve(s) was repaired: </strong>{" "}
                    </td>
                    <td> {landscapeData.Valvewasrepaired}</td>
                  </tr>
                  <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                    <td colSpan={2}>
                      <strong>Rotation</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>This months expected rotation schedule: </strong>{" "}
                    </td>
                    <td> {landscapeData.Thismonthexpectedrotationschedule}</td>
                  </tr>
                  <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                    <td colSpan={2}>
                      <strong>Extra Information</strong>
                    </td>
                  </tr>
                  <tr>
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
    </>
  );
};

export default Landscape;

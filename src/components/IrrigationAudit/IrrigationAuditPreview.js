import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import formatDate from "../../custom/FormatDate";
import { CircularProgress } from "@mui/material";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/earthco_logo.png";
import { DataContext } from "../../context/AppData";
import html2pdf from "html2pdf.js";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import useFetchContactEmail from "../Hooks/useFetchContactEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const IrrigationAuditPreview = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  const { toggleFullscreen, setToggleFullscreen } = useContext(DataContext);
  const { contactEmail, fetchEmail } = useFetchContactEmail();

  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");

  const [irrDetails, setIrrDetails] = useState({});
  const [controllerData, setControllerData] = useState([]);

  const fetchIrrigation = async () => {
    if (idParam === 0) {
      return;
    }
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/IrrigationAuditReport/GetIrrigationAuditReport?id=${idParam}`,
        { headers }
      );
      console.log("selected irrigation is", res.data);
      setIrrDetails(res.data[0]);
      fetchEmail(res.data[0].Data.ContactId);
      setControllerData(res.data);
    } catch (error) {
      console.log("fetch irrigation api call error", error);
    }
  };

  useEffect(() => {
    fetchIrrigation();
  }, []);

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
    const input = document.getElementById("irrigation-audit-preview");
  
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
    pdf.save("Irrigation-Audit.pdf");
  
    // Reset the font to its default value
    input.style.fontFamily = "";
  };
  
  if (!irrDetails.Data) {
    return (
      <div className="center-loader">
        <CircularProgress></CircularProgress>
      </div>
    );
  }

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
        {toggleFullscreen ? (
          <div className="print-page-width">
            <div style={{ width: "28.7cm" }}>
              <div className="row ">
                <div className="col-md-1">
                  {isMail ? (
                    <></>
                  ) : (
                    <button
                      className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
                      onClick={() => {
                        navigate(`/irrigation-audit`);
                      }}
                    >
                      <ArrowBackIcon sx={{ fontSize: 17 }} />
                    </button>
                  )}
                </div>
                <div className="col-md-12 text-end">
                  {" "}
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
                  </button>{" "}
                  {isMail ? (
                    <></>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                      onClick={() => {
                        // sendEmail(
                        //   `/irrigation/audit-report?id=${idParam}`,
                        //   irrDetails.Data.CustomerId,
                        //   0,
                        //   false
                        // );
                        navigate(
                          `/send-mail?title=${"Irrigation-Audit"}&mail=${contactEmail}`
                        );
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

        <div className="print-page-width">
          {irrDetails ? (
            <div className="PageLandscape mt-2">
              <div className="card">
                {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                  <strong>Status:</strong> Pending</span> </div> */}
                <div
                  id="irrigation-audit-preview"
                  className="card-body get-preview perview-pd"
                >
                  <div className="row mb-2">
                    <div className="mt-5  col-md-9 col-sm-9 text-center">
                      <h3>
                        {" "}
                        <strong>Irrigation Audit Form</strong>{" "}
                      </h3>
                    </div>
                    <div className="mt-4  py-0  col-md-3 col-sm-3 text-end">
                      <div className="brand-logo me-3 mb-2 inovice-logo">
                        <img
                          className="irr-preview-Logo ms-3"
                          src={logo}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="row mb-2 mx-2"
                    style={{ padding: "2px", border: "1px solid #789a3d" }}
                  >
                    <div
                      style={{
                        color: "black",
                        borderRight: "1px solid #789a3d",
                      }}
                      className="col-md-4 col-sm-6"
                    >
                      {" "}
                      <strong>Customer Name</strong>{" "}
                      <div>{irrDetails?.Data.CustomerName}</div>
                    </div>
                    <div
                      style={{
                        color: "black",
                        borderRight: "1px solid #789a3d",
                      }}
                      className="col-md-4 col-sm-6"
                    >
                      {" "}
                      <strong>Contact Name</strong>{" "}
                      <div>{irrDetails?.Data.ContactName}</div>
                      <strong>Contact Company</strong>{" "}
                      <div>{irrDetails?.Data.ContactCompany}</div>
                    </div>
                    <div
                      style={{ color: "black" }}
                      className="col-md-4 col-sm-4"
                    >
                      {" "}
                      <strong>By Regional Manager</strong>{" "}
                      <div>{irrDetails?.Data.RegionalManagerName}</div>
                      <strong>Created</strong>{" "}
                      <div>
                        {formatDate(irrDetails?.Data.CreatedDate, false)}
                      </div>
                    </div>
                  </div>
                  <div className="row mx-2">
                    <div className="col-md-4 col-sm-4">
                      <h5>
                        <strong>Controller Name</strong>
                      </h5>
                      <h5>{irrDetails?.Data.Title}</h5>
                    </div>
                    <div className="col-md-4 col-sm-4"></div>
                    <div className="col-md-4 col-sm-4"></div>
                  </div>
                  {/* controller table  */}

                  <div className="mx-2">
                    <table className="table table-bordered ">
                      <thead>
                        <tr
                          className="preview-table-row"
                          style={{
                            backgroundColor: "#789a3d",
                            color: "white",
                            verticalAlign: "top",
                          }}
                        >
                          <th className="text-center">Station #</th>
                          <th className="text-center">Broken Valve?</th>
                          <th className="text-center">Broken Latrals?</th>
                          <th className="text-center">Broken Heads?</th>
                          <th className="text-center">How many?</th>
                          <th className="text-center">
                            Repairs Made or Needed / <br /> Recommendations
                          </th>
                          <th className="text-center">Photo</th>
                          <th className="text-center">Photo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {controllerData ? (
                          controllerData?.map((item) => {
                            if (item.ControllerData) {
                              return (
                                <tr
                                  key={
                                    item.ControllerData.ControllerAuditReportId
                                  }
                                  className="Irr-preview-table-row"
                                >
                                  <td
                                    style={{ verticalAlign: "top" }}
                                    className="tdbreak"
                                  >
                                    {
                                      item.ControllerData
                                        .ControllerAuditReportId
                                    }
                                  </td>
                                  <td
                                    style={{ verticalAlign: "top" }}
                                    className="tdbreak"
                                  >
                                    {item.ControllerData.BrokenValve
                                      ? "Yes"
                                      : "No"}
                                  </td>
                                  <td
                                    style={{ verticalAlign: "top" }}
                                    className="tdbreak"
                                  >
                                    {item.ControllerData.BrokenLaterals
                                      ? "Yes"
                                      : "No"}
                                  </td>
                                  <td
                                    style={{ verticalAlign: "top" }}
                                    className="tdbreak"
                                  >
                                    {item.ControllerData.BrokenHeads
                                      ? "Yes"
                                      : "No"}
                                  </td>
                                  <td
                                    style={{ verticalAlign: "top" }}
                                    className="tdbreak"
                                  >
                                    {item.ControllerData.HowMany}
                                  </td>
                                  <td
                                    style={{ verticalAlign: "top" }}
                                    className="tdbreak"
                                  >
                                    {item.ControllerData.RepairMadeOrNeeded}
                                  </td>
                                  <td
                                    style={{ verticalAlign: "top" }}
                                    className="tdbreak"
                                  >
                                    {item.ControllerData.ControllerPhotoPath ? (
                                      <>
                                        <img
                                          src={`https://earthcoapi.yehtohoga.com/${item.ControllerData.ControllerPhotoPath}`}
                                          style={{
                                            width: "150px",
                                            height: "120px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                  <td
                                    style={{ verticalAlign: "top" }}
                                    className="tdbreak"
                                  >
                                    {item.ControllerData.PhotoPath ? (
                                      <>
                                        <img
                                          src={`https://earthcoapi.yehtohoga.com/${item.ControllerData.PhotoPath}`}
                                          style={{
                                            width: "150px",
                                            height: "120px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          })
                        ) : (
                          <></>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading....</div>
          )}
        </div>
      </div>
    </>
  );
};

export default IrrigationAuditPreview;

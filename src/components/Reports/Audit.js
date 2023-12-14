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
const Audit = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  const { toggleFullscreen, setToggleFullscreen } = useContext(DataContext);

  const { sendEmail } = useSendEmail();

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");

  const [irrDetails, setIrrDetails] = useState({});

  const fetchIrrigation = async () => {
    if (idParam === 0) {
      return;
    }
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Irrigation/GetIrrigation?id=${idParam}`,
        { headers }
      );
      console.log("selected irrigation is", res.data);
      setIrrDetails(res.data);
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
    const input = document.getElementById("irrigation-preview");

    html2pdf(input, {
      margin: 10,
      filename: "Irrigation-Audit.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    });

    // const pdf = new jsPDF({
    //   orientation: "p",
    //   unit: "mm",
    //   format: "a4",
    // });

    // const scale = 1;
    // const width = pdf.internal.pageSize.getWidth();
    // const height = pdf.internal.pageSize.getHeight() / 2.2;

    // try {
    //   const canvas = await html2canvas(input);

    //   // Create an Image object and wait for it to load
    //   const img = new Image();
    //   img.src = canvas.toDataURL("image/png");
    //   console.log("image data is", img.src);

    //   await new Promise((resolve) => {
    //     img.onload = resolve;
    //   });

    //   // Add the image to the PDF
    //   pdf.addImage(img, "PNG", 0, 0, width, height);

    //   // Save the PDF
    //   pdf.save("irrigation.pdf");
    // } catch (error) {
    //   console.error("Error generating PDF:", error);
    // }
  };

  if (!irrDetails.IrrigationData) {
    return (
      <div className="center-loader">
        <CircularProgress></CircularProgress>
      </div>
    );
  }

  return (
    <div className="container-fluid ">
      {toggleFullscreen ? (
        <div className="row me-3">
          <div className="col-md-11 text-end">
            {" "}
            {isMail ? (
              <></>
            ) : (
              <button
                className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
                onClick={() => {
                  navigate(`/irrigation`);
                }}
              >
                <i className="fa fa-backward"></i>
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
            </button>{" "}
            {isMail ? (
              <></>
            ) : (
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                onClick={() => {
                  sendEmail(
                    `/irrigation/audit-report?id=${idParam}`,
                    irrDetails.IrrigationData.CustomerId,
                    0,
                    false
                  );
                }}
              >
                <i class="fa-regular fa-envelope"></i>
              </button>
            )}
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
                id="irrigation-preview"
                className="card-body get-preview perview-pd"
              >
                <div className="row mb-5">
                  <div className="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                    <div className="brand-logo mb-2 inovice-logo">
                      <img
                        className="irr-preview-Logo ms-3"
                        src={logo}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mt-5 col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center">
                    <h3>
                      {" "}
                      <strong>Irrigation Audit</strong>{" "}
                    </h3>
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
                    <div>{irrDetails?.IrrigationData.CompanyName}</div>
                  </div>
                  <div style={{ color: "black" }} className="col-md-8 col-sm-6">
                    {" "}
                    <strong>Created</strong>{" "}
                    <div>
                      {formatDate(irrDetails?.IrrigationData.CreatedDate)}
                    </div>
                  </div>
                </div>

                {/* controller table  */}

                <div className="mx-2">
                  <table className="table table-bordered ">
                    <thead>
                      <tr
                        className="preview-table-row"
                        style={{
                          backgroundColor: "#789a3d",
                          color: "black",
                        }}
                      >
                        <th className="text-center">Controller</th>
                        <th className="text-center">Meter Info</th>
                        <th className="text-center">Valve</th>
                        <th className="text-center">Repairs / Upgrades</th>
                      </tr>
                    </thead>
                    <tbody>
                      {" "}
                      {irrDetails.ControllerData.map((item) => {
                        return (
                          <tr
                            key={item.ControllerId}
                            className="Irr-preview-table-row"
                          >
                            <td
                              style={{ verticalAlign: "top" }}
                              className="tdbreak"
                            >
                              <strong>Controller Number:</strong>
                              <br />
                              {item.ControllerId}
                              <br />
                              <strong>Controller Make/ Model:</strong>
                              <br />
                              {item.MakeAndModel}
                              <br />
                              <strong>Serial:</strong>
                              <br />
                              {item.SerialNumber}
                              <br />
                              <strong>Location:</strong>
                              <br />
                              {item.LoacationClosestAddress}
                              <br />
                              <strong>Satellite Based?:</strong>
                              <br />
                              {item.isSatelliteBased ? "yes" : "No"}
                              <br />
                              <strong>Type of Water:</strong>
                              <br />
                              {item.TypeofWater}
                              <br />

                              <strong>Controller photo:</strong>
                              <br />
                              <img
                                src={`https://earthcoapi.yehtohoga.com/${item.ControllerPhotoPath}`}
                                style={{
                                  width: "150px",
                                  height: "120px",
                                  objectFit: "cover",
                                }}
                              />
                              <br />
                            </td>
                            <td
                              style={{ verticalAlign: "top" }}
                              className="tdbreak"
                            >
                              <strong>Meter Number:</strong>
                              <br />
                              {item.MeterNumber}
                              <br />
                              <strong>Meter Size:</strong>
                              <br />
                              rt-454
                              <br />
                            </td>
                            <td
                              style={{ verticalAlign: "top" }}
                              className="tdbreak"
                            >
                              <strong>Master Valve?:</strong>
                              <br />
                              {item.MakeAndModel}
                              <br />
                              <strong>Flow Sensor?:</strong>
                              <br />
                              dxdiag123
                              <br />
                              <strong>No. of Valves:</strong>
                              <br />
                              {item.NumberofValves}
                              <br />
                              <strong>No. Stations:</strong>
                              <br />
                              {item.NumberofStation}
                              <br />
                              <strong>Number of Broken Main Lines:</strong>
                              <br />
                              {item.NumberofBrokenMainLines}
                              <br />
                              <strong>Type of Valves</strong>
                              <br />
                              {item.TypeofValves}
                              <br />
                              <strong>Number of Leaking Valves:</strong>
                              <br />
                              {item.LeakingValves}
                              <br />
                              <strong>Number Malfunctioning:</strong>
                              <br />
                              {item.MalfunctioningValves}
                              <br />
                              <strong>Number of Broken Lateral Lines:</strong>
                              <br />
                              {item.NumberofBrokenLateralLines}
                              <br />
                              <strong>Number of Broken Heads:</strong>
                              <br />
                              {item.NumberofBrokenHeads}
                              <br />
                            </td>
                            <td
                              style={{ verticalAlign: "top" }}
                              className="tdbreak"
                            >
                              <strong>Repairs:</strong>
                              <br />
                              {item.RepairsMade}
                              <br />
                              <strong>Upgrades:</strong>
                              <br />
                              {item.UpgradesMade}

                              <br />
                              <strong>photo:</strong>
                              <br />
                              <img
                                src={`https://earthcoapi.yehtohoga.com/${item.PhotoPath}`}
                                style={{
                                  width: "150px",
                                  height: "120px",
                                  objectFit: "cover",
                                }}
                              />
                              <br />
                            </td>
                          </tr>
                        );
                      })}
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
  );
};

export default Audit;

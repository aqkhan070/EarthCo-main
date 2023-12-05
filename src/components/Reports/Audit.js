import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import formatDate from "../../custom/FormatDate";
import { CircularProgress } from "@mui/material";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const Audit = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

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
    window.print();
  };

  const handleDownload = async () => {
    const input = document.getElementById("irrigation-preview");
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const scale = 1;
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight() / 2.2;

    try {
      const canvas = await html2canvas(input);

      // Create an Image object and wait for it to load
      const img = new Image();
      img.src = canvas.toDataURL("image/png");
      console.log("image data is", img.src);

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Add the image to the PDF
      pdf.addImage(img, "PNG", 0, 0, width, height);

      // Save the PDF
      pdf.save("irrigation.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (!irrDetails.IrrigationData) {
    return (
      <div className="center-loader">
        <CircularProgress></CircularProgress>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "70em" }} className="container-fluid">
      <div className="row justify-content-between ">
        <div className="col-md-3 text-start pb-0">
          <button
            className="btn btn-secondary btn-sm mb-0 mt-3 ms-2"
            onClick={() => {
              navigate(`/Dashboard/Irrigation`);
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

      {irrDetails ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mt-3">
                {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                <strong>Status:</strong> Pending</span> </div> */}
                <div id="irrigation-preview" className="card-body get-preview">
                  <div className="row mb-5">
                    <div className="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                      <div className="brand-logo mb-2 inovice-logo">
                        <img
                          src="./assets/images/background/earthco_logo.png"
                          alt=""
                          className="light-logo"
                          style={{ width: "70%" }}
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
                    className="row mb-2"
                    style={{ padding: "2px", border: "1px solid #789a3d" }}
                  >
                    <div className="col-md-6 col-sm-6">
                      <div>
                        {" "}
                        <strong>Customer Name</strong>{" "}
                      </div>
                      <div>{irrDetails?.IrrigationData.CustomerId}</div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div>
                        {" "}
                        <strong>Created</strong>{" "}
                      </div>
                      <div>
                        {formatDate(irrDetails?.IrrigationData.CreatedDate)}
                      </div>
                    </div>
                  </div>

                  {/* controller table  */}

                  {irrDetails.ControllerData.map((item) => {
                    return (
                      <div key={item.ControllerId} className="table-responsive">
                        <table className="table table-bordered ">
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "#789a3d",
                                color: "black",
                              }}
                            >
                              <th>Controller</th>
                              <th>Meter Info</th>
                              <th>Valve</th>
                              <th>Repairs / Upgrades</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="tdbreak">
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
                                <strong>Photo:</strong>
                                <br />
                                <br />
                              </td>
                              <td className="tdbreak">
                                <strong>Meter Number:</strong>
                                <br />
                                {item.MeterNumber}
                                <br />
                                <strong>Meter Size:</strong>
                                <br />
                                rt-454
                                <br />
                              </td>
                              <td className="tdbreak">
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
                              <td className="tdbreak">
                                <strong>Repairs:</strong>
                                <br />
                                {item.RepairsMade}
                                <br />
                                <strong>Upgrades:</strong>
                                <br />
                                {item.UpgradesMade}
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
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default Audit;

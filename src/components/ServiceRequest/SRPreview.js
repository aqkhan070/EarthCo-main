import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../../assets/images/logo/earthco_logo.png";
import { DataContext } from "../../context/AppData";
import formatDate from "../../custom/FormatDate";
import { CircularProgress } from "@mui/material";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const SRPreview = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { sRData } = useContext(DataContext);
  const [sRPreviewData, setSRPreviewData] = useState({});

  const [printClicked, setPrintClicked] = useState(false);

  const handlePrint = () => {
    setPrintClicked(true);
    setTimeout(() => {
      window.print();
    }, 1000);
  };
  const handleDownload = () => {
    const input = document.getElementById("SR-preview");

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
      const height = pdf.internal.pageSize.getHeight() / 2.2;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("Service request.pdf");
    });
  };

  const fetchSR = async () => {
    if (sRData.ServiceRequestId === 0) {
      return;
    }

    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequest?id=${sRData.ServiceRequestId}`,
        { headers }
      );
      setSRPreviewData(response.data);

      console.log("response.data.Data", response.data);

      console.log(" list is///////", response.data.Data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchSR();
    console.log(sRData);
  }, []);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate the total amount when previewData changes
    if (sRPreviewData && sRPreviewData.ItemData) {
      const total = sRPreviewData.ItemData.reduce(
        (accumulator, item) => accumulator + item.Qty * item.Rate,
        0
      );
      setTotalAmount(total);
    }
  }, [sRPreviewData]);

  if (!sRPreviewData || Object.keys(sRPreviewData).length === 0) {
    return (
      <div className="center-loader">
        <CircularProgress></CircularProgress>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: "70em" }} className="container-fluid">
        <div className="row justify-content-between ">
          <div className="col-md-3 text-start pb-0">
            <button
              className="btn btn-secondary btn-sm mb-0 mt-3 ms-2"
              onClick={() => {
                navigate(`/Dashboard/Service-Requests`);
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
        <div className="card ">
          <div className={!printClicked ? "mx-3  mt-3" : ""}>
            <div id="SR-preview" className=" get-preview">
              <div className="card-body">
                <div
                  style={{
                    borderBottom: "5px solid #0394fc",
                    margin: "1em 0em 3em 0em",
                  }}
                ></div>
                <div className="row">
                  <div className="col-md-2 col-sm-5">
                    {" "}
                    <img className="preview-Logo" src={logo} alt="" />
                  </div>
                  <div className="col-md-6 col-sm-2"></div>
                  <div className="col-md-4 col-sm-5 text-center">
                    <h2 className="table-cell-align">Service Request</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 col-sm-6">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            {" "}
                            <h5 className="mb-0">EarthCo</h5>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h6 className="mb-0">
                              {sRData.CustomerName || ""}
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <h6 className="mb-0">
                              {sRPreviewData.Data.Address}
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 className="me-5 mb-0">
                              <strong>Bill to</strong>
                            </h6>
                          </td>
                          <td>
                            <h6 className="mb-0">
                              <strong>Ship to</strong>
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td className="me-5">
                            <h6>
                              <>{sRPreviewData.Data.Address}</>
                            </h6>
                          </td>
                          <td>
                            <h6>
                              <>{sRPreviewData.Data.Address}</>
                            </h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-4 col-sm-6 text-right">
                    <table className="preview-table">
                      <thead>
                        <tr>
                          <th>
                            {" "}
                            <h6 className="table-cell-align me-2">Date</h6>{" "}
                          </th>
                          <th>
                            {" "}
                            <h6>{formatDate(sRData.CreatedDate)}</h6>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h6 className="table-cell-align me-2">
                              Service request#
                            </h6>{" "}
                          </td>
                          <td>
                            {" "}
                            <h6 className="table-cell-align">
                              {sRData.ServiceRequestNumber}
                            </h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <table id="empoloyees-tblwrapper" className="table ">
                  <thead className="table-header">
                    <tr>
                      <th>Description</th>
                      <th className="text-right">Qty</th>
                      <th className="text-right">Rate</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sRPreviewData?.ItemData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.Description}</td>
                          <td className="text-right">{item.Qty}</td>
                          <td className="text-right">{item.Rate}</td>
                          <td className="text-right">{item.Amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="card-body">
                <div className="row  text-end">
                  <div className="col-md-8  col-sm-6"></div>
                  <div className="col-md-2 col-sm-3">
                    <h6 className="mb-0">SubTotal:</h6>
                  </div>
                  <div className="col-md-2 col-sm-3">
                    {" "}
                    <h6 className="mb-0">{totalAmount.toFixed(2)}</h6>
                  </div>
                  <div className="col-md-8 col-sm-6"></div>
                  <div className="col-md-2 col-sm-3">
                    <h6 className="mb-0">Discount:</h6>
                  </div>{" "}
                  <hr className="mb-0" />
                  <div className="col-md-8 col-sm-6"></div>
                  <div className="col-md-2 col-sm-3">
                    <h6 className="table-cell-align mb-0">Total Amount:</h6>
                  </div>
                  <div className="col-md-2 col-sm-3">
                    {" "}
                    <h6 className="mb-0">{totalAmount.toFixed(2)}</h6>
                  </div>
                  <div
                    style={{
                      borderBottom: "5px solid #012a47",
                      margin: "0em 0em 3em 0em",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SRPreview;

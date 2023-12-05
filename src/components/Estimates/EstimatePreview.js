import React, { useContext, useEffect, useState } from "react";
import { RoutingContext } from "../../context/RoutesContext";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../../assets/images/logo/earthco_logo.png";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import formatDate from "../../custom/FormatDate";
import { CircularProgress } from "@mui/material";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const EstimatePreview = () => {
  const { name, setName, fetchName } = useFetchCustomerName();
  const navigate = useNavigate();
  const { estmPreviewId } = useContext(RoutingContext);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [previewData, setPreviewData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const [printClicked, setPrintClicked] = useState(false);

  const handlePrint = () => {
    setPrintClicked(true);
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const handleDownload = () => {
    const input = document.getElementById("estimate-preview");

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
      pdf.save("estimate.pdf");
    });
  };

  const fetchEstimates = async () => {
    if (estmPreviewId === 0) {
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${estmPreviewId}`,
        { headers }
      );
      setPreviewData(response.data);

      console.log("selected estimate is", response.data);
      console.log("selected estimate is", previewData);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchEstimates();
  }, []);
  useEffect(() => {
    if (previewData && previewData.EstimateData) {
      fetchName(previewData.EstimateData.CustomerId);
    }
  }, [previewData]);
  useEffect(() => {
    // Calculate the total amount when previewData changes
    if (previewData && previewData.EstimateItemData) {
      const total = previewData.EstimateItemData.reduce(
        (accumulator, item) => accumulator + item.Amount,
        0
      );
      setTotalAmount(total);
    }
  }, [previewData]);

  if (!previewData || Object.keys(previewData).length === 0) {
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
                navigate(`/Dashboard/Estimates`);
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
        <div className="card">
          <div className={!printClicked ? "mx-3  mt-3" : ""}>
            <div id="estimate-preview" className=" get-preview ">
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
                  <div className="col-md-7 col-sm-2"></div>
                  <div className="col-md-3 col-sm-4 text-center table-cell-align">
                    <h1>Estimate</h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8  col-sm-6">
                    <table>
                      <tbody>
                        <tr>
                          <td className="p-0">
                            {" "}
                            <h5 className="mb-0">EarthCo</h5>{" "}
                            <h6 className="mb-0">{name || ""}</h6>{" "}
                            <h6 className="mb-0">
                              {previewData.EstimateData.Address}
                            </h6>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-0"></td>
                        </tr>
                        <tr>
                          <td className="p-0"> </td>
                        </tr>
                        <tr>
                          <td className="me-5 pe-2">
                            <h6 className="mb-0">
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
                          <td>
                            <h6 className="me-5 pe-2">
                              <>{previewData.EstimateData.Address}</>
                            </h6>
                          </td>

                          <td>
                            <h6>
                              <>{previewData.EstimateData.Address}</>
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
                            <h6>Date</h6>{" "}
                          </th>
                          <th>
                            {" "}
                            <h6>
                              {formatDate(previewData.EstimateData.CreatedDate)}
                            </h6>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="table-cell-align me-2">
                            <h6>Estimate #</h6>{" "}
                          </td>

                          <td className="table-cell-align">
                            <h6>{previewData.EstimateData.EstimateNumber}</h6>
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
                    {previewData.EstimateItemData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.Description}</td>
                          <td className="text-right">{item.Qty}</td>
                          <td className="text-right">{item.Rate}</td>
                          <td className="text-right">
                            {item.Amount.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="card-body">
                <div className="row text-end">
                  <div className="col-md-8 col-sm-6"></div>
                  <div className="col-md-2 col-sm-3">
                    <h6 className="mb-0">SubTotal:</h6>
                  </div>
                  <div className="col-md-2 col-sm-3">
                    <h6 className="mb-0">{totalAmount.toFixed(2)}</h6>
                  </div>
                  <div className="col-md-8 col-sm-6"></div>
                  <div className="col-md-2 col-sm-3">
                    <h6 className="mb-0">Discount:</h6>
                  </div>{" "}
                  <hr className="mb-0" />
                  <div className="col-md-8 col-sm-6"></div>
                  <div className="col-md-2 col-sm-3 mb-0">
                    <h6 className="table-cell-align mb-0">Total Amount:</h6>
                  </div>
                  <div className="col-md-2 col-sm-3">
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
        </div>{" "}
      </div>
    </>
  );
};

export default EstimatePreview;

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

const BillPreview = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { billData } = useContext(DataContext);

  const [billPreviewData, setBillPreviewData] = useState({});
  const [printClicked, setPrintClicked] = useState(false);

  const handlePrint = () => {
    setPrintClicked(true);
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const handleDownload = () => {
    const input = document.getElementById("bill-preview");

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
      pdf.save("bill.pdf");
    });
  };

  const getBill = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/GetBill?id=${billData.BillId}`,
        { headers }
      );

      console.log("selected bill is", res.data);
      setBillPreviewData(res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  useEffect(() => {
    getBill();
    // console.log("billData", billData);
  }, []);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate the total amount when previewData changes
    if (billPreviewData && billPreviewData.ItemData) {
      const total = billPreviewData.ItemData.reduce(
        (accumulator, item) => accumulator + item.Qty * item.Rate,
        0
      );
      setTotalAmount(total);
    }
  }, [billPreviewData]);

  if (!billPreviewData || Object.keys(billPreviewData).length === 0) {
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
              navigate(`/Dashboard/Bills`);
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
          <div id="bill-preview" className=" get-preview ">
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
                <div className="col-md-3 col-sm-5 text-center">
                  <h1>Bill</h1>
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
                          <h6 className="text-wrap-preview mb-0">
                            {billData.SupplierName || ""}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <h6 className="mb-0 text-wrap-preview">
                            {billPreviewData.Data.Address}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td className="me-5">
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
                        <td className="me-5 text-wrap-preview">
                          <h6>
                            <>{billPreviewData.Data.Address}</>
                          </h6>
                        </td>
                        <td className="text-wrap-preview">
                          <h6>
                            <>{billPreviewData.Data.Address}</>
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
                          <h6>Date</h6>{" "}
                        </th>
                        {/* <th>
                      <h6>Expiration Date</h6>{" "}
                    </th> */}
                        <th>
                          <h6>{formatDate(billPreviewData.Data.BillDate)}</h6>{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h6>Bill #</h6>{" "}
                        </td>
                        {/* <td>
                      <h6></h6>
                    </td> */}
                        <td>
                          <h6>{billPreviewData.Data.BillNumber}</h6>
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
                    <th className="text-right">Qty </th>
                    <th className="text-right">Rate</th>

                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {billPreviewData.ItemData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.Description}</td>
                        <td className="text-right">{item.Qty}</td>
                        <td className="text-right">{item.Rate}</td>
                        <td className="text-right">{item.Amount.toFixed(2)}</td>
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
  );
};

export default BillPreview;

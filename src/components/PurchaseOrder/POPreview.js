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

const POPreview = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { POData, toggleFullscreen, setToggleFullscreen } =
    useContext(DataContext);
  const [PoPreviewData, setPoPreviewData] = useState({});
  const [printClicked, setPrintClicked] = useState(false);

  const fetchPo = async () => {
    if (POData.PurchaseOrderId === 0) {
      return;
    }

    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/GetPurchaseOrder?id=${POData.PurchaseOrderId}`,
        { headers }
      );
      setPoPreviewData(response.data);

      console.log("response.data.Data", response.data);

      console.log(" list is///////", response.data.Data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchPo();
    console.log(POData);
  }, []);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate the total amount when previewData changes
    if (PoPreviewData && PoPreviewData.ItemData) {
      const total = PoPreviewData.ItemData.reduce(
        (accumulator, item) => accumulator + item.Qty * item.Rate,
        0
      );
      setTotalAmount(total);
    }
  }, [PoPreviewData]);

  if (!PoPreviewData || Object.keys(PoPreviewData).length === 0) {
    return (
      <div className="center-loader">
        <CircularProgress></CircularProgress>
      </div>
    );
  }

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
    const input = document.getElementById("PO-preview");

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
      pdf.save("purchase order.pdf");
    });
  };

  return (
    <div
      
      className={toggleFullscreen ? "container-fluid custom-font-style" : ""}
    >
      {toggleFullscreen ? (
        <div className={toggleFullscreen ? "row justify-content-between" : ""}>
          <div className="col-md-3 text-start pb-0">
            <button
              className="btn btn-secondary btn-sm mb-0 mt-3 ms-2"
              onClick={() => {
                navigate(`/Purchase-Order`);
              }}
            >
              &#60; Back
            </button>
          </div>
          <div className="col-md-3 text-end">
            {" "}
            <button
              className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
              onClick={handlePrint}
            >
              <Print />
            </button>
            <button
              className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
              onClick={handleDownload}
            >
              <Download />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="card">
        <div className={toggleFullscreen ? "" : ""}>
          <div id="PO-preview" className=" get-preview ">
            <div className="card-body">
              <div className="row mt-2">
                {/* <div className="col-md-12 mb-5"
                  style={{
                    borderBottom: "5px solid #5d9dd5",
                 
                  }}
                ></div> */}
                <div className="col-md-2 col-sm-5">
                  {" "}
                  <img className="preview-Logo" src={logo} alt="" />
                </div>
                <div className="col-md-6 col-sm-2"></div>
                <div className="col-md-4 col-sm-4 text-center table-cell-align">
                  <h2 className="table-cell-align">Purchase Order</h2>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-8  col-sm-6">
                  <table>
                    <tbody>
                      <tr>
                        <td className="p-0">
                          {" "}
                          <h5 className="mb-0">EarthCo</h5>{" "}
                          <h6 className="mb-0">
                            {POData.SupplierId}. {POData.SupplierName || ""}
                          </h6>{" "}
                          <h6 className="mb-2">{PoPreviewData.Data.Address}</h6>
                        </td>
                      </tr>
                      {/* <tr>
                        <td className="p-0"></td>
                      </tr>
                      <tr>
                        <td className="p-0"> </td>
                      </tr>
                      <tr>
                        <td className="me-5 pe-2">
                          <h5 className="mb-0">
                            <strong>BILL TO</strong>
                          </h5>
                        </td>

                        <td>
                          <h5 className="mb-0">
                            <strong>SHIP To</strong>
                          </h5>
                        </td>
                      </tr>
                      <tr style={{ maxHeight: "3em" }}>
                        <td
                          style={{
                            verticalAlign: "top",
                            maxWidth: "15em",
                            width: "15em",
                          }}
                        >
                          <h6 className="me-3 pe-1 pt-0">
                            {PoPreviewData.Data.Address}
                          </h6>
                        </td>

                        <td
                          style={{
                            verticalAlign: "top",
                            maxWidth: "15em",
                            width: "15em",
                          }}
                        >
                          <h6>{PoPreviewData.Data.Address}</h6>
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>

                <div className="col-md-4 col-sm-6 ">
                  <table className="preview-table">
                    <thead>
                      <tr>
                        <th>
                          {" "}
                          <h6 className="mb-0">Date</h6>{" "}
                        </th>
                        <th>
                          {" "}
                          <h6 className="text-right mb-0">
                            {formatDate(POData.Date)}
                          </h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table-cell-align me-2">
                          <h6>Purchase Order #</h6>{" "}
                        </td>

                        <td className="table-cell-align text-right">
                          <h6> {POData.PurchaseOrderNumber}</h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <table id="empoloyees-tblwrapper" className="table ">
                <thead className="table-header">
                  <tr className="preview-table-head">
                    <th>
                      <strong>DESCRIPTION</strong>
                    </th>
                    <th className="text-right">
                      <strong>QTY</strong>
                    </th>
                    <th className="text-right">
                      <strong>RATE</strong>
                    </th>

                    <th className="text-right">
                      <strong>AMOUNT</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PoPreviewData?.ItemData.map((item, index) => {
                    return (
                      <tr className="preview-table-row" key={index}>
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
              <div className="row ">
                <div className="col-md-8 col-sm-6"></div>
                <div className="col-md-2 col-sm-3">
                  <h6 className="mb-0">
                    {" "}
                    <strong>SUBTOTAL:</strong>
                  </h6>
                </div>
                <div className="col-md-2 col-sm-3">
                  <h6 className="mb-0 text-end">{totalAmount.toFixed(2)}</h6>
                </div>

                {/* <div className="col-md-2 col-sm-3">
                    <h6 className="mb-0">
                      {" "}
                      <strong>DISCOUNT:</strong>
                    </h6>
                  </div>{" "} */}
                <hr className="mb-1" />
                <div className="col-md-8 col-sm-6 text-end"></div>
                <div className="col-md-2 col-sm-3 ">
                  <h6 className="table-cell-align mt-2">
                    <strong>TOTAL USD</strong>
                  </h6>
                </div>
                <div className="col-md-2 col-sm-3 mt-2">
                  <h6 className=" text-end">{totalAmount.toFixed(2)}</h6>
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
  );
};

export default POPreview;

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

  
const queryParams = new URLSearchParams(window.location.search);
const idParam = Number(queryParams.get("id"));

  const { billData, toggleFullscreen, setToggleFullscreen } =
    useContext(DataContext);

  const [billPreviewData, setBillPreviewData] = useState({});
  const [printClicked, setPrintClicked] = useState(false);

  const [showbuttons, setShowButtons] = useState(true);

const handlePrint = () => {
  // setToggleFullscreen(false);
  setShowButtons(false);
  setTimeout(() => {
    window.print();
  }, 1000);
  setTimeout(() => {
    //setToggleFullscreen(true);
    setShowButtons(true);
  }, 3000);
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
      const height = pdf.internal.pageSize.getHeight() ;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("bill.pdf");
    });
  };

  const getBill = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/GetBill?id=${idParam}`,
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
    <>
    <div
      className={
        toggleFullscreen
          ? "container-fluid custom-font-style print-page-width "
          : ""
      }
    >
      {" "}
      <div className="row PageA4 mt-2">
        <div className="card">
          <div className={toggleFullscreen ? "" : ""}>
            <div id="estimate-preview" className=" get-preview ">
              <div className="card-body perview-pd">
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
                  <div className="col-md-7 col-sm-2"></div>
                  <div className="col-md-3 col-sm-4 text-center table-cell-align">
                    <h2 className="table-cell-align">Bills</h2>
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
                            {billPreviewData.Data.SupplierId}.{" "}
                              {billPreviewData.Data.SupplierName || ""}
                            </h6>{" "}
                            <h6 className="mb-2">
                            {billPreviewData.Data.SupplierAddress}
                            </h6>
                          </td>
                        </tr>
                      
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
                              {formatDate(
                                billPreviewData.Data.CreatedDate
                              )}
                            </h6>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="table-cell-align me-2">
                            <h6>Bill #</h6>{" "}
                          </td>

                          <td className="table-cell-align text-right">
                            <h6>{billPreviewData.Data.BillNumber}</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <table id="empoloyees-tblwrapper" className="table mt-2">
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
                    {billPreviewData.ItemData.map((item, index) => {
                      return (
                        <tr className="preview-table-row" key={index}>
                          <td>{item.Description}</td>
                          <td className="text-right">{item.Qty}</td>
                          <td className="text-right">{item.Rate}</td>
                          <td className="text-right">
                            {(item.Qty * item.Rate).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="row ">
                  <div className="col-md-8 col-sm-6"></div>
                  <div className="col-md-2 col-sm-3">
                    <h6 className="mb-0">
                      {" "}
                      <strong>SUBTOTAL:</strong>
                    </h6>
                  </div>
                  <div className="col-md-2 col-sm-3">
                    <h6 className="mb-0 text-end">
                      {totalAmount.toFixed(2)}
                    </h6>
                  </div>
                  <div className="col-md-8 col-sm-6"></div>
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
        </div>
      </div>{" "}
      {showbuttons ? (
        <div className={toggleFullscreen ? "row ms-2" : ""}>
          <div className="d-flex align-items-end flex-column bd-highlight mb-3">
            <div className="p-2 bd-highlight">
              <button
                className="btn btn-outline-primary btn-sm estm-action-btn"
                onClick={() => {
                  navigate(`/Bills`);
                }}
              >
                <i className="fa fa-backward"></i>
              </button>
            </div>
            <div className="p-2 bd-highlight">
              {" "}
              <button
                className="btn btn-sm btn-outline-primary   estm-action-btn"
                onClick={handlePrint}
              >
                <i className="fa fa-print"></i>
              </button>
            </div>
            <div className="p-2 bd-highlight">
              {" "}
              <button
                className="btn btn-sm btn-outline-primary  estm-action-btn"
                onClick={handleDownload}
              >
                <i className="fa fa-download"></i>
              </button>
            </div>
          </div>
          ;
        </div>
      ) : (
        <></>
      )}
    </div>
  </>
  );
};

export default BillPreview;

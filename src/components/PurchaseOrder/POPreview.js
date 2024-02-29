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
import html2pdf from "html2pdf.js";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import formatAmount from "../../custom/FormatAmount";
import { PDFDownloadLink } from "@react-pdf/renderer";
import POPdf from "./POPdf";

const POPreview = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");
  const { POData, toggleFullscreen, setToggleFullscreen } =
    useContext(DataContext);
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();
  const [PoPreviewData, setPoPreviewData] = useState({});
  const [printClicked, setPrintClicked] = useState(false);
  const [showbuttons, setShowButtons] = useState(true);
  const [pdfClicked, setPdfClicked] = useState(false);

  const fetchPo = async () => {
    if (idParam === 0) {
      return;
    }

    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/GetPurchaseOrder?id=${idParam}`,
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
    // console.log(POData);
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

  const pdfDownload = () => {
    setPdfClicked(true);
    setTimeout(() => {
      handleDownload();
    }, 1000);
  };

  const handleDownload = async () => {
    const input = document.getElementById("PO-preview");

    input.style.fontFamily = "Arial";

    const canvas = await html2canvas(input, { dpi: 300, scale: 3 });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("purchase order.pdf");
    setTimeout(() => {
      setPdfClicked(false);
    }, 3000);

    input.style.fontFamily = "";
  };

  return (
    <>
      <EventPopups
        open={showEmailAlert}
        setOpen={setShowEmailAlert}
        color={emailAlertColor}
        text={emailAlertTxt}
      />

      <div
        className={
          toggleFullscreen
            ? "container-fluid custom-font-style print-page-width "
            : ""
        }
      >
        <div
          style={{ fontFamily: "Arial", fontSize: "0.8rem" }}
          className="row PageA4 mt-2"
        >
          <div className="card">
            <div className={toggleFullscreen ? "" : ""}>
              <div id="PO-preview" className=" get-preview ">
                <div className="card-body perview-pd">
                  <div className="row mt-2">
                    <div className="col-md-4 col-sm-4">
                      {/* <h5 className="mb-0 mt-3">EarthCo</h5> */}
                      {/* <h6 className="mb-0">
                        1225 East Wakeham Avenue <br />
                        Santa Ana, California <br /> 92705 O 714.571.0455 F
                        714.571.0580 CL# C27 823185 / D49 1025053
                      </h6> */}
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                      <h3>
                        <strong>Purchase Order</strong>
                      </h3>
                    </div>
                    <div className="col-md-4 col-sm-4 text-center table-cell-align">
                      <img
                        className="preview-Logo"
                        style={{ width: "160px" }}
                        src={logo}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-8  col-sm-6">
                      <table>
                        <tbody>
                          <tr>
                            <td className="p-0">
                              <h6 className="mb-0 mt-3">
                                {/* {PoPreviewData.Data.SupplierId}. */}
                                {PoPreviewData.Data.SupplierName || ""}
                              </h6>
                              <h6 className="mb-3">
                                {PoPreviewData.Data.SupplierAddress}
                              </h6>
                              <h6>{PoPreviewData.Data.CustomerName}</h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-md-4 col-sm-6 pt-2 ">
                      <table className="preview-table">
                        <thead>
                          <tr className=" ">
                            <th className="">
                              <h6 className="mb-0">
                                <strong>Date: </strong>
                              </h6>
                            </th>
                            <th>
                              <h6 className="text-start mb-0">
                                &nbsp;
                                {formatDate(
                                  PoPreviewData.Data.CreatedDate,
                                  false
                                )}
                              </h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="table-cell-align me-2 ">
                              <h6>
                                <strong>PO #: </strong>
                              </h6>
                            </td>

                            <td className="table-cell-align text-start">
                              <h6>
                                &nbsp;{PoPreviewData.Data.PurchaseOrderNumber}
                              </h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <table id="empoloyees-tblwrapper" className="table mt-2">
                    <thead className="preview-table-header">
                      <tr className="preview-table-head preview-table-header">
                        <th>
                          <strong>Item Code</strong>
                        </th>
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
                      {PoPreviewData.ItemData.map((item, index) => {
                        return (
                          <>
                            <tr className="preview-table-row" key={index}>
                              <td>{item.ItemId}</td>
                              <td> {index}{item.Description}</td>
                              <td className="text-right">{item.Qty}</td>
                              <td className="text-right">{item.Rate}</td>
                              <td className="text-right">
                                ${formatAmount(item.Qty * item.Rate)}
                              </td>
                            </tr>
                            {index === 32 && pdfClicked && (
                              <tr
                                style={{ height: "7em" }}
                                className="preview-table-row"
                                key={`empty-row-${index}`}
                              ></tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="row ">
                    <div className="col-md-8 col-sm-6"></div>
                    <div className="col-md-2 col-sm-3">
                      <h6 className="mb-0">
                        <strong>SUBTOTAL:</strong>
                      </h6>
                    </div>
                    <div className="col-md-2 col-sm-3">
                      <h6 className="mb-0 text-end">
                        ${formatAmount(totalAmount)}
                      </h6>
                    </div>
                    <div className="col-md-8 col-sm-6"></div>
                    {/* <div className="col-md-2 col-sm-3">
                  <h6 className="mb-0">
                    
                    <strong>DISCOUNT:</strong>
                  </h6>
                </div> */}
                    <div className="col-md-12 py-0">
                      <hr className="mb-1" />
                    </div>

                    <div className="col-md-8 col-sm-6 text-end"></div>
                    <div className="col-md-2 col-sm-3 ">
                      <h6 className="table-cell-align mt-2">
                        <strong>TOTAL USD</strong>
                      </h6>
                    </div>
                    <div className="col-md-2 col-sm-3 mt-2">
                      <h6 className=" text-end">
                        ${formatAmount(totalAmount)}
                      </h6>
                    </div>
                    <div className="col-md-12 py-0">
                      <div
                        style={{
                          borderBottom: "5px solid #012a47",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showbuttons ? (
          <div className={toggleFullscreen ? "row ms-2" : ""}>
            <div className="d-flex align-items-end flex-column bd-highlight mb-3">
              {isMail ? (
                <></>
              ) : (
                <div className="p-2 bd-highlight">
                  <button
                    className="btn btn-sm btn-outline-secondary custom-csv-link estm-action-btn"
                    style={{ padding: "5px 10px" }}
                    onClick={() => {
                      navigate(`/purchase-order`);
                    }}
                  >
                    <ArrowBackIcon sx={{ fontSize: 17 }} />
                  </button>
                </div>
              )}

              <div className="p-2 pt-0 bd-highlight">
                <button
                  className="btn btn-sm btn-outline-secondary custom-csv-link   estm-action-btn"
                  onClick={handlePrint}
                >
                  <i className="fa fa-print"></i>
                </button>
              </div>
              <div className="p-2 pt-0 bd-highlight">
                {/* <button
                  className="btn btn-sm btn-outline-secondary custom-csv-link  estm-action-btn"
                  onClick={pdfDownload}
                >
                  <i className="fa fa-download"></i>
                </button> */}

                <PDFDownloadLink
                  document={<POPdf data={{...PoPreviewData , Total : totalAmount}} />}
                  fileName="Purchase Order.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      " "
                    ) : (
                      <button className="btn btn-sm btn-outline-secondary custom-csv-link  estm-action-btn">
                        <i className="fa fa-download"></i>
                      </button>
                    )
                  }
                </PDFDownloadLink> 

              </div>
              {isMail ? (
                <></>
              ) : (
                <div className="p-2 pt-0 bd-highlight">
                  <button
                    className="btn btn-sm btn-outline-secondary custom-csv-link estm-action-btn"
                    onClick={() => {
                      // sendEmail(
                      //   `/purchase-order/purchase-order-preview?id=${idParam}`,
                      //   PoPreviewData.Data.SupplierId,
                      //   0,
                      //   true
                      // );
                      navigate(`/send-mail?title=${"Puechase Order"}`);
                    }}
                  >
                    <i className="fa-regular fa-envelope"></i>
                  </button>
                </div>
              )}
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

export default POPreview;

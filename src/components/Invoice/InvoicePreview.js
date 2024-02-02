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
import useFetchCustomerEmail from "../Hooks/useFetchCustomerEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import formatAmount from "../../custom/FormatAmount";

const InvoicePreview = () => {
  const { InvoiceData, toggleFullscreen, setToggleFullscreen, loggedInUser } =
    useContext(DataContext);
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

  const [InvoicePreviewData, setInvoicePreviewData] = useState({});
  const [printClicked, setPrintClicked] = useState(false);
  const { name, setName, fetchName } = useFetchCustomerName();

  const [showbuttons, setShowButtons] = useState(true);
  const { customerMail, fetchCustomerEmail } = useFetchCustomerEmail();
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

  const token = Cookies.get("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [pdfClicked, setPdfClicked] = useState(false);

  const pdfDownload = () => {
    setPdfClicked(true);
    setTimeout(() => {
      handleDownload();
    }, 1000);
  };
  
  const handleDownload = async () => {
    const input = document.getElementById("invoice-preview");
  
    input.style.fontFamily = "Times New Roman";
  
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
  
    pdf.save("Invoice.pdf");
    setTimeout(() => {
      setPdfClicked(false);
    }, 3000);
  
    input.style.fontFamily = "";
  };

  const fetchInvoice = async () => {
    if (idParam === 0) {
      return;
    }

    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Invoice/GetInvoice?id=${idParam}`,
        { headers }
      );
      setInvoicePreviewData(response.data);

      console.log("response.data.Data", response.data);

      console.log(" list is///////", response.data.Data);
      fetchCustomerEmail(response.data.Data.CustomerId);
      fetchName(response.data.Data.CustomerId);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchInvoice();
    console.log(InvoicePreviewData.Data);
  }, []);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate the total amount when previewData changes
    if (InvoicePreviewData && InvoicePreviewData.ItemData) {
      const total = InvoicePreviewData.ItemData.reduce(
        (accumulator, item) => accumulator + item.Qty * item.Rate,
        0
      );
      setTotalAmount(total);
    }
  }, [InvoicePreviewData]);

  if (!InvoicePreviewData || Object.keys(InvoicePreviewData).length === 0) {
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
              <div id="invoice-preview" className=" get-preview ">
                <div  style={{ minHeight: "23cm" }} className="card-body perview-pd">
                  <div className="row mt-2">
                    <div className="col-md-5 col-sm-5">
                      <h5 className="mb-0">{loggedInUser.CompanyName}</h5>{" "}
                      <h6 className="mb-0" style={{ width: "13em" }}>
                        1225 E. Wakeham Avenue <br /> Santa Ana CA 92705 US{" "}
                        <br /> lolas@earthcompany.org <br />
                        www.earthcompany.org
                      </h6>
                    </div>
                    <div className="col-md-3 col-sm-3 text-center">
                      {" "}
                      <h3>
                        <strong>INVOICE</strong>
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
                            <td className="">
                              <h5 className="mb-0">
                                <strong>BILL TO</strong>
                              </h5>
                              <h6 className="p-0 m-0">
                                {name} <br />
                                {InvoicePreviewData.Data.CustomerAddress?.split(
                                  ", "
                                )
                                  .slice(0, 2)
                                  .join(", ")}
                                <br />
                                {InvoicePreviewData.Data.CustomerAddress?.split(
                                  ", "
                                )
                                  .slice(2)
                                  .join(", ")}
                              </h6>
                            </td>

                            {/* <td>
                              <h5 className="mb-0">
                                <strong>SHIP To</strong>
                              </h5>
                            </td> */}
                          </tr>
                          <tr className="py-0" style={{ maxHeight: "3em" }}>
                            <td
                              className="py-0"
                              style={{
                                verticalAlign: "top",
                                maxWidth: "19em",
                                width: "19em",
                              }}
                            >
                              <h6 className="mb-0">
                                <>
                                  {InvoicePreviewData.Data.ContactCompanyName}
                                </>
                              </h6>
                              <h6 className="mb-0">
                                <>{InvoicePreviewData.Data.ContactName}</>
                              </h6>
                              <h6 className="mb-0">
                                <>{InvoicePreviewData.Data.ContactAddress}</>
                              </h6>
                            </td>

                            {/* <td
                              className="py-0"
                              style={{
                                verticalAlign: "top",
                                maxWidth: "19em",
                                width: "19em",
                              }}
                            >
                              <h6 className="mb-0">
                                <>
                                  {InvoicePreviewData.Data.ContactCompanyName}
                                </>
                              </h6>
                              <h6 className="mb-0">
                                <>{InvoicePreviewData.Data.ContactName}</>
                              </h6>
                              <h6 className="mb-0">
                                <>{InvoicePreviewData.Data.ContactAddress}</>
                              </h6>
                            </td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <table id="empoloyees-tblwrapper" className="table mt-4">
                    <thead className="preview-table-header">
                      <tr className="preview-table-head preview-table-header">
                        <th>
                          <strong>INVOICE #</strong>
                        </th>
                        <th className="text-right">
                          <strong>DATE</strong>
                        </th>
                        <th className="text-right">
                          <strong>TOTAL DUE</strong>
                        </th>

                        <th className="text-right">
                          <strong>DUE DATE</strong>
                        </th>
                        <th className="text-right">
                          <strong>TERMS</strong>
                        </th>
                        <th className="text-right">
                          <strong>Enclosed</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="preview-table-row">
                        <td>{InvoicePreviewData.Data.InvoiceNumber}</td>
                        <td className="text-right">
                          {formatDate(
                            InvoicePreviewData.Data.CreatedDate,
                            false
                          )}
                        </td>
                        <td className="text-right"></td>
                        <td className="text-right">
                          {formatDate(InvoicePreviewData.Data.DueDate, false)}
                        </td>
                        <td className="text-right">
                          {InvoicePreviewData.Data.Term}
                        </td>
                        <td className="text-right">
                          {InvoicePreviewData.Data.StatusId === 0
                            ? "Closed"
                            : "Open"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col-md-12">
                      <h4 className="mb-0">
                        <strong>Description of work</strong>
                      </h4>
                      <h6 className="">
                        {InvoicePreviewData.Data.CustomerMessage}
                      </h6>
                    </div>
                  </div>

                  <table id="empoloyees-tblwrapper" className="table mt-4">
                    <thead className="preview-table-header">
                      <tr className="preview-table-head preview-table-header">
                        <th className="text-start">
                          <strong>QTY</strong>
                        </th>{" "}
                        <th>
                          <strong>DESCRIPTION</strong>
                        </th>
                        <th className="text-right">
                          <strong>AMOUNT</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {InvoicePreviewData.ItemData.map((item, index) => {
                        return (
                          <>
                          <tr className="preview-table-row" key={index}>
                            <td className="text-start">{item.Qty}</td>
                            <td>{item.Description}</td>
                            <td className="text-right">
                              {(item.Qty * item.Rate).toFixed(2)}
                            </td>
                          </tr>
                          {index === 17 && pdfClicked && (
  <tr
    style={{ height: "9em" }}
    className="preview-table-row"
    key={`empty-row-${index}`}
  >
    <td className="text-start"></td>
    <td></td>
    <td className="text-right"></td>
  </tr>
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
                        {" "}
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
                    {" "}
                    <strong>DISCOUNT:</strong>
                  </h6>
                </div>{" "} */}
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
                      <h6 className=" text-end">${formatAmount(totalAmount)}</h6>
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
                <div className="card-footer border-0 text-center">
                  <h6 style={{ fontSize: "12px" }}>
                For invoice questions please contact Yisel Ferreyra at Yiself@earthcompany.org</h6>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
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
                      navigate(`/invoices`);
                    }}
                  >
                    <ArrowBackIcon sx={{ fontSize: 17 }} />
                  </button>
                </div>
              )}

              <div className="p-2 pt-0 bd-highlight">
                {" "}
                <button
                  className="btn btn-sm btn-outline-secondary custom-csv-link   estm-action-btn"
                  onClick={handlePrint}
                >
                  <i className="fa fa-print"></i>
                </button>
              </div>
              <div className="p-2 pt-0 bd-highlight">
                {" "}
                <button
                  className="btn btn-sm btn-outline-secondary custom-csv-link  estm-action-btn"
                  onClick={pdfDownload}
                >
                  <i className="fa fa-download"></i>
                </button>
              </div>
              {isMail ? (
                <></>
              ) : (
                <div className="p-2 pt-0 bd-highlight">
                  <button
                    className="btn btn-sm btn-outline-secondary custom-csv-link  estm-action-btn"
                    onClick={() => {
                      // sendEmail(
                      //   `/invoices/invoice-preview?id=${idParam}`,
                      //   InvoicePreviewData.Data.CustomerId,
                      //   InvoicePreviewData.Data.ContactId,
                      //   false
                      // );
                      navigate(
                        `/send-mail?title=${"Invoice"}&mail=${customerMail}&customer=${
                          InvoicePreviewData.Data.CustomerName
                        }&number=${InvoicePreviewData.Data.InvoiceNumber}`
                      );
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

export default InvoicePreview;

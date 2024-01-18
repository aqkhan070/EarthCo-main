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

const InvoicePreview = () => {
  const { InvoiceData, toggleFullscreen, setToggleFullscreen } =
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

  const handleDownload = () => {
    const input = document.getElementById("invoice-preview");

    html2pdf(input, {
      margin: 10,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });

    // // Create a jsPDF instance with custom font and font size
    // const pdf = new jsPDF({
    //   orientation: "p",
    //   unit: "mm",
    //   format: "a4",
    // });

    // const scale = 2; // Adjust the scale factor as needed

    // // Calculate the new width and height based on the scale
    // const scaledWidth = pdf.internal.pageSize.getWidth() * scale;
    // const scaledHeight = pdf.internal.pageSize.getHeight() * scale;

    // pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    // pdf.setFont("Roboto");
    // pdf.setFontSize(3); // Adjust the font size as needed

    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const width = pdf.internal.pageSize.getWidth();
    //   const height = pdf.internal.pageSize.getHeight();

    //   pdf.addImage(imgData, "PNG", 0, 0, width, height);
    //   pdf.save("invoice.pdf");
    // });
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
        style={{ fontFamily: "Arial" }}
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
                <div className="card-body perview-pd">
                  <div className="row mt-2">
                    <div className="col-md-5 col-sm-5">
                      <h5 className="mb-0">EarthCo Commercial Landscape</h5>{" "}
                      <h6 className="mb-0" style={{ width: "12em" }}>
                        1225 E. Wakeham Santa Ana CA 92705 US
                        lolas@earthcompany.org 714-571-0455
                      </h6>
                    </div>
                    <div className="col-md-3 col-sm-3 text-center">
                      {" "}
                      <h3>INVOICE</h3>
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
                            <td className="me-5 pe-2">
                              <h5 className="mb-0">
                                <strong>BILL TO</strong>
                              </h5>
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
                    <thead className="table-header">
                      <tr className="preview-table-head">
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
                      {InvoicePreviewData.ItemData.map((item, index) => {
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
                      <h6 className=" text-end">{totalAmount.toFixed(2)}</h6>
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
        </div>{" "}
        {showbuttons ? (
          <div className={toggleFullscreen ? "row ms-2" : ""}>
            <div className="d-flex align-items-end flex-column bd-highlight mb-3">
              {isMail ? (
                <></>
              ) : (
                <div className="p-2 bd-highlight">
                  <button
                    className="btn btn-outline-primary btn-sm estm-action-btn"
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
                  className="btn btn-sm btn-outline-primary   estm-action-btn"
                  onClick={handlePrint}
                >
                  <i className="fa fa-print"></i>
                </button>
              </div>
              <div className="p-2 pt-0 bd-highlight">
                {" "}
                <button
                  className="btn btn-sm btn-outline-primary  estm-action-btn"
                  onClick={handleDownload}
                >
                  <i className="fa fa-download"></i>
                </button>
              </div>
              {isMail ? (
                <></>
              ) : (
                <div className="p-2 pt-0 bd-highlight">
                  <button
                    className="btn btn-sm btn-outline-primary  estm-action-btn"
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

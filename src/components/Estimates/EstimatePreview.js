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
import { DataContext } from "../../context/AppData";
import html2pdf from "html2pdf.js";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import useFetchContactEmail from "../Hooks/useFetchContactEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import formatAmount from "../../custom/FormatAmount";

const EstimatePreview = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");

  const { name, setName, fetchName, staffName, fetchStaffName } =
    useFetchCustomerName();
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  const navigate = useNavigate();
  const { estmPreviewId } = useContext(RoutingContext);
  const { toggleFullscreen, setToggleFullscreen } = useContext(DataContext);

  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { contactEmail, fetchEmail } = useFetchContactEmail();

  const [previewData, setPreviewData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

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
  const [pdfClicked, setPdfClicked] = useState(false);

  const pdfDownload = () => {
    setPdfClicked(true);
    setTimeout(() => {
      handleDownload();
    }, 1000);
  };

  const handleDownload = async () => {
    const input = document.getElementById("estimate-preview");

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

    pdf.save("Estimate.pdf");
    setTimeout(() => {
      setPdfClicked(false);
    }, 3000);

    input.style.fontFamily = "";
  };

  const fetchEstimates = async () => {
    if (idParam === 0) {
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${idParam}`,
        { headers }
      );
      setPreviewData(response.data);
      fetchEmail(response.data.EstimateData.ContactId);

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
      fetchStaffName(previewData.EstimateData.RegionalManagerId);
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
            ? "container-fluid custom-font-style print-page-width"
            : ""
        }
      >
        {" "}
        <div className="row PageA4 mt-2">
          <div className="card">
            <div className={toggleFullscreen ? "" : ""}>
              <div id="estimate-preview" className=" get-preview ">
                <div
                  style={{ minHeight: "20cm" }}
                  className="card-body perview-pd"
                >
                  <div className="row mt-2">
                    <div className="col-md-4 col-sm-4">
                      <h5 className="mb-0">EarthCo</h5>{" "}
                      <h6 className="mb-0">
                        1225 East Wakeham Avenue
                        <br /> Santa Ana, California 92705 <br /> O 714.571.0455
                        F 714.571.0580 <br /> CL# C27 823185 / D49 1025053
                      </h6>{" "}
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                      {" "}
                      <h3>
                        {" "}
                        <strong>Proposal</strong>
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

                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <h5 className="p-0 pt-4 mb-0 ">
                        <strong>Submitted to</strong>
                      </h5>
                      <h6 className="p-0 " style={{ maxWidth: " 18em" }}>
                        {previewData.EstimateData.ContactName}
                        <br />
                        {previewData.EstimateData.ContactAddress?.split(", ")
                          .slice(0, 2)
                          .join(", ")}
                        <br />
                        {previewData.EstimateData.ContactAddress?.split(", ")
                          .slice(2)
                          .join(", ")}
                        <br />
                        {/* {previewData.EstimateData.ContactEmail} <br />
                        {previewData.EstimateData.ContactPhone}*/}
                      </h6>
                    </div>

                    <div className="col-md-2 col-sm-2"></div>
                    <div className="col-md-4 col-sm-4">
                      <table className="preview-table">
                        <thead>
                          <tr>
                            <th>
                              {" "}
                              <h6 className="mb-0">
                                {" "}
                                <strong>Date</strong>
                              </h6>{" "}
                            </th>
                            <th>
                              {" "}
                              <h6 className="text-right mb-0">
                                {formatDate(
                                  previewData.EstimateData.IssueDate,
                                  false
                                )}
                              </h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="table-cell-align mb-0 me-2">
                              <h6 className="mb-0">
                                <strong>Estimate #</strong>
                              </h6>{" "}
                            </td>

                            <td className="table-cell-align mb-0 text-right">
                              <h6 className="mb-0">
                                {previewData.EstimateData.EstimateNumber}
                              </h6>
                            </td>
                          </tr>
                          <tr>
                            <td className="table-cell-align me-2">
                              <h6 className="mb-0">
                                <strong>Submitted by</strong>
                              </h6>{" "}
                            </td>

                            <td className="table-cell-align text-right">
                              <h6 className="mb-0"> {staffName}</h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-12 col-sm-12 text-center">
                      {" "}
                      <h3 className="mb-0">
                        <strong>South Peak</strong>
                      </h3>{" "}
                      <hr className="mt-0" />
                    </div>
                    <div className="col-md-12 col-sm-12">
                      {" "}
                      <h4 className="mb-0">
                        <strong>Description of work</strong>
                      </h4>
                      <h6 className="mb-0">
                        {" "}
                        {previewData.EstimateData.EstimateNotes}
                      </h6>
                    </div>
                  </div>
                  <h5 className="mb-0 mt-3">
                    <strong>Item(s)</strong>
                  </h5>
                  <table id="empoloyees-tblwrapper" className="table mt-2">
                    <thead className="">
                      <tr className="preview-table-head preview-table-header">
                        <th className="text-start">
                          <strong>QTY</strong>
                        </th>{" "}
                        <th>
                          <strong>DESCRIPTION</strong>
                        </th>
                        {/* <th className="text-right">
                          <strong>RATE</strong>
                        </th> */}
                        <th className="text-right">
                          <strong>AMOUNT</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.EstimateItemData.map((item, index) => {
                        return (
                          <>
                            <tr className="preview-table-row" key={index}>
                              <td className="text-start">{item.Qty}</td>
                              <td>{item.Description}</td>
                              {/* <td className="text-right">{item.Rate}</td> */}
                              <td className="text-right">
                                {item.Amount.toFixed(2)}
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
                </div>

                <div className="card-footer border-0">
                  {" "}
                  <div className="row text-end px-5">
                    <div className="col-md-9 col-sm-8"></div>
                    <div
                      style={{ whiteSpace: "nowrap" }}
                      className="col-md-3 col-sm-4 text-end"
                    >
                      <div
                        style={{
                          borderBottom: "1px solid #b7b4b4",

                          width: "fit-content",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "16px",
                            color: "black",
                            marginRight: "4em",
                          }}
                        >
                          <strong>Total:</strong>
                        </span>
                        <span style={{ fontSize: "16px", color: "black" }}>
                          {formatAmount(totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row mt-5"
                    style={{
                      borderTop: "1px solid #b7b4b4",
                    }}
                  >
                    <div className="col-md-3 col-sm-3">
                      <h6>ACCEPTED BY:</h6>
                    </div>
                    <div className="col-md-3 col-sm-3">
                      <h6>Buyer/Agent Signature</h6>
                    </div>
                    <div className="col-md-2 col-sm-2">
                      <h6>Print Name</h6>
                    </div>
                    <div className="col-md-2 col-sm-2">
                      <h6>Title</h6>
                    </div>
                    <div className="col-md-2 col-sm-2">
                      <h6>Date</h6>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <span
                        style={{
                          fontSize: "7px",
                          color: "black",
                          fontWeight: "600",
                        }}
                      >
                        Payment Terms and Conditions: Please be advised that
                        payments are due upon receipt of the invoice, with any
                        payment made beyond thirty ﴾30﴿ days from the billing
                        date considered overdue and subject to interest at the
                        maximum legally permissible rate. In the event of legal
                        action for collection, Earthco is entitled to
                        reimbursement of all legal fees. Failure to make payment
                        within a thirty ﴾30﴿‐day period will be deemed a major
                        breach. This proposal assumes no preexisting conditions
                        detrimental to labor and materials during installation,
                        replacement, and repair, specifically for work conducted
                        by Earthco Commercial Landscape or Earthco Arbor Care,
                        with a 30‐day lead time for tree work. Earthco Arbor
                        Care disclaims responsibility for damage to underground
                        utilities, and work will adhere to ANSI A300 Arbor
                        Standards. Requests for crown thinning exceeding 25% may
                        incur additional costs and release Earthco Arbor Care
                        from liability. The proposal excludes permits, traffic
                        control, or engineering, with the client responsible for
                        associated costs. Cancellation of work incurs a 20% fee,
                        and tree work inspections must be conducted within 30
                        days of completion; otherwise, the work is deemed final.
                        The client acknowledges the potential placement of a
                        mechanics lien on the property as per the California
                        Civil Code for non‐payment within the specified terms.
                        The signing party affirms authorization to obligate the
                        client to these terms.
                      </span>
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
                    className="btn btn-sm btn-outline-secondary custom-csv-link estm-action-btn"
                    style={{ padding: "5px 10px" }}
                    onClick={() => {
                      navigate(`/estimates`);
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
                      navigate(
                        `/send-mail?title=${"Estimate"}&mail=${contactEmail}&customer=${name}&number=${
                          previewData.EstimateData.EstimateNumber
                        }`
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

export default EstimatePreview;

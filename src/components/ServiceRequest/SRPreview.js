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
import useFetchContactEmail from "../Hooks/useFetchContactEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SRPreview = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");

  const { sRData, toggleFullscreen, setToggleFullscreen } =
    useContext(DataContext);
  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();
  const [sRPreviewData, setSRPreviewData] = useState({});

  const [showbuttons, setShowButtons] = useState(true);

  const { contactEmail, fetchEmail } = useFetchContactEmail();

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
    const input = document.getElementById("SR-preview");

    html2pdf(input, {
      margin: 10,
      filename: "Service request.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });

    // Create a jsPDF instance with custom font and font size
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
    //   pdf.save("Service request.pdf");
    // });
  };

  const fetchSR = async () => {
    if (idParam === 0) {
      return;
    }

    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequest?id=${idParam}`,
        { headers }
      );
      setSRPreviewData(response.data);
      fetchEmail(response.data.Data.ContactId);

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
              <div id="SR-preview" className=" get-preview ">
                <div
                  className="card-body perview-pd"
                  style={{ minHeight: "23cm" }}
                >
                  <div className="row mt-2">
                    <div className="col-md-4 col-sm-4">
                      <h5 className="mb-0">EarthCo</h5>{" "}
                      <h6 className="mb-0">
                        1225 East Wakeham Avenue Santa Ana, California 92705
                      </h6>
                      <h6 className="mb-0">
                        <strong>Phone: </strong> 714.571.0455
                      </h6>
                      <h6 className="mb-0">
                        <strong>Fax: </strong> 714.571.0580
                      </h6>
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                      {" "}
                      <h3>Service Request</h3>
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

                  <div className="row my-2">
                    <div className="col-md-7 col-sm-7">
                      <div className="table-responsive">
                        <table className=" table-striped table table-bordered text-start">
                          <thead>
                            <tr
                              style={{ backgroundColor: "gray" }}
                              className="preview-table-head LandScape-TablePadding"
                            >
                              <th className="landscap-preview-heading">
                                Requested By:
                              </th>
                              <th className="landscap-preview-heading">
                                Service Location:
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="preview-table-row">
                              <td style={{ color: "black" }}>
                                {sRPreviewData.Data.CustomerName}
                                <br />
                                {sRPreviewData.Data.ServiceLocationAddress}
                              </td>
                              <td
                                style={{ color: "black" }}
                                className="left strong"
                              >
                                {sRPreviewData.Data.ServiceLocationAddress}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>{" "}
                    </div>

                    <div
                      style={{ color: "black" }}
                      className="col-md-5 col-sm-4 text-end"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <strong>Date Created:</strong>
                        </div>
                        <div className="col-md-6">
                          {" "}
                          <div
                            style={{ color: "black" }}
                            className="text-start"
                          >
                            <p className="">
                              {" "}
                              {formatDate(
                                sRPreviewData.Data.CreatedDate,
                                false
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <strong>Target completion:</strong>
                        </div>
                        <div className="col-md-6">
                          {" "}
                          <div
                            style={{ color: "black" }}
                            className="text-start"
                          >
                            <p className="">
                              {" "}
                              {formatDate(sRPreviewData.Data.DueDate, false)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table-bordered table  LandScape-TablePadding">
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td className="landscap-preview-heading" colSpan={2}>
                            <>Service Request Details</>
                          </td>
                        </tr>
                        <tr className="preview-table-row">
                          <td style={{ width: "18em" }}>
                            <strong>Service Request Number: </strong>{" "}
                          </td>
                          <td> {sRPreviewData.Data.ServiceRequestNumber}</td>
                        </tr>
                        <tr className="preview-table-row">
                          <td style={{ width: "18em" }}>
                            <strong>Second Request: </strong>{" "}
                          </td>
                          <td> NO</td>
                        </tr>
                        <tr className="preview-table-row">
                          <td style={{ width: "18em" }}>
                            <strong>Date Completed: </strong>{" "}
                          </td>
                          <td> {sRPreviewData.Data.CompletedDate}</td>
                        </tr>
                        <tr>
                          <td className="landscap-preview-heading" colSpan={2}>
                            <>Actions</>
                          </td>
                        </tr>

                        <tr className="preview-table-row">
                          <td style={{ width: "18em" }}>
                            <strong>Work Requested: </strong>{" "}
                          </td>
                          <td> {sRPreviewData.Data.WorkRequest}</td>
                        </tr>
                        <tr className="preview-table-row">
                          <td style={{ width: "18em" }}>
                            <strong>Action taken </strong>{" "}
                          </td>
                          <td> {sRPreviewData.Data.ActionTaken}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <table id="empoloyees-tblwrapper" className="table mt-2">
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
                      {sRPreviewData.ItemData.map((item, index) => {
                        return (
                          <tr className="preview-table-row" key={index}>
                            <td>{item.Description}</td>
                            <td className="text-right">{item.Qty}</td>
                            <td className="text-right">{item.Rate}</td>
                            <td className="text-right">
                              {(item.Rate * item.Qty).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table> */}

                  {/* <div className="row ">
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
                    <div className="col-md-2 col-sm-3">
                  <h6 className="mb-0">
                    {" "}
                    <strong>DISCOUNT:</strong>
                  </h6>
                </div>{" "} 
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
                  </div>*/}
                </div>
                <div className="card-footer border-0 text-center">
                  <h6 style={{ fontSize: "12px" }}>
                    *Note Beginning October 1, Earthco will commence annual skip
                    mowing of the grass due to the winter season
                  </h6>
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
                      navigate(`/service-requests`);
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
                </button>{" "}
              </div>
              {isMail ? (
                <></>
              ) : (
                <div className="p-2 pt-0 bd-highlight">
                  {" "}
                  <button
                    className="btn btn-sm btn-outline-primary estm-action-btn"
                    onClick={() => {
                      // sendEmail(
                      //   `/service-requests/service-request-preview?id=${idParam}`,
                      //   sRPreviewData.Data.CustomerId,
                      //   sRPreviewData.Data.ContactId,
                      //   false
                      // );
                      navigate(
                        `/send-mail?title=${"Service Request"}&mail=${contactEmail}&customer=${
                          sRPreviewData.Data.CustomerName
                        }&number=${sRPreviewData.Data.ServiceRequestNumber}`
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

export default SRPreview;

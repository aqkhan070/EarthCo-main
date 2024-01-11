import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import formatDate from "../../custom/FormatDate";
import { CircularProgress } from "@mui/material";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/earthco_logo.png";
import { DataContext } from "../../context/AppData";
import html2pdf from "html2pdf.js";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import TblDateFormat from "../../custom/TblDateFormat";
import useFetchContactEmail from "../Hooks/useFetchContactEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PunchlistPreview = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  const { toggleFullscreen, setToggleFullscreen } = useContext(DataContext);

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
  const [pLData, setPLData] = useState({});
  const [pLDetailData, setPLDetailData] = useState([]);
  const { contactEmail, fetchEmail } = useFetchContactEmail();

  const fetchPLData = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlist?id=${idParam}`,
        { headers }
      );
      console.log("selected pl is", res.data);
      fetchEmail(res.data.ContactId);
      setPLData(res.data);
    } catch (error) {
      console.log("fetch PL api call error", error);
    }
  };

  const fetchPLDetailData = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlistDetailList?PunchlistId=${idParam}`,
        { headers }
      );
      console.log("selected pl detail is", res.data);
      setPLDetailData(res.data);
    } catch (error) {
      console.log("fetch PL detail api call error", error);
    }
  };

  useEffect(() => {
    fetchPLData();
    fetchPLDetailData();
  }, []);

  if (!pLData || !pLDetailData) {
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

  const handleDownload = async () => {
    const input = document.getElementById("PL-preview");

    html2pdf(input, {
      margin: 10,
      filename: "PunchList.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    });

    // const pdf = new jsPDF({
    //   orientation: "p",
    //   unit: "mm",
    //   format: "a4",
    // });

    // const scale = 1;
    // const width = pdf.internal.pageSize.getWidth();
    // const height = pdf.internal.pageSize.getHeight() / 2.2;

    // try {
    //   const canvas = await html2canvas(input);

    //   // Create an Image object and wait for it to load
    //   const img = new Image();
    //   img.src = canvas.toDataURL("image/png");
    //   console.log("image data is", img.src);

    //   await new Promise((resolve) => {
    //     img.onload = resolve;
    //   });

    //   // Add the image to the PDF
    //   pdf.addImage(img, "PNG", 0, 0, width, height);

    //   // Save the PDF
    //   pdf.save("irrigation.pdf");
    // } catch (error) {
    //   console.error("Error generating PDF:", error);
    // }
  };

  return (
    <>
      <EventPopups
        open={showEmailAlert}
        setOpen={setShowEmailAlert}
        color={emailAlertColor}
        text={emailAlertTxt}
      />
      <div className="container-fluid">
        {toggleFullscreen ? (
          <div className="row me-3">
            <div className="col-md-11 text-end">
              {" "}
              {isMail ? (
                <></>
              ) : (
                <button
                  className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
                  style={{ padding: "5px 10px" }}
                  onClick={() => {
                    navigate(`/punchlist`);
                  }}
                >
                <ArrowBackIcon sx={{ fontSize: 17 }} />
                </button>
              )}
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                onClick={handlePrint}
              >
                <i className="fa fa-print"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                onClick={handleDownload}
              >
                <i className="fa fa-download"></i>
              </button>{" "}
              {isMail ? (
                <></>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                  onClick={() => {
                    // sendEmail(
                    //   `/PunchlistPreview?id=${idParam}`,
                    //   pLData.CustomerId,
                    //   pLData.ContactId,
                    //   false
                    // );
                    navigate(
                      `/send-mail?title=${"Punch List"}&mail=${contactEmail}`
                    );
                  }}
                >
                  <i className="fa-regular fa-envelope"></i>
                </button>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="print-page-width Pl-preview">
          <div className="PageLandscape mt-2">
            <div className="card">
              <div id="PL-preview" className="card-body get-preview perview-pd">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row mb-5">
                      <div className="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-3 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                        <div className="brand-logo mb-2 inovice-logo">
                          <img
                            className="irr-preview-Logo ms-3"
                            src={logo}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="mt-5 col-xl-6 col-lg-6 col-md-6 col-sm-6 text-center">
                        <h3>
                          {" "}
                          <strong>Punchlist</strong>{" "}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2" style={{ margin: "10px 0" }}>
                    <div
                      className="col-md-4 col-sm-4 p-2"
                      style={{
                        padding: "2px",
                        border: "1px solid #789a3d",
                      }}
                    >
                      <div>
                        {" "}
                        <strong>Customer Name</strong>{" "}
                      </div>
                      <div>
                        <p>{pLData.CustomerCompanyName}</p>
                      </div>
                      <div>
                        {" "}
                        <strong>Title</strong>{" "}
                      </div>
                      <div>
                        <p>{pLData.Title}</p>
                      </div>
                    </div>
                    <div
                      className="col-md-4 col-sm-4 p-2"
                      style={{
                        padding: "2px",
                        border: "1px solid #789a3d",
                        borderLeft: "0px",
                      }}
                    >
                      <div>
                        {" "}
                        <strong>Contact Name</strong>{" "}
                      </div>
                      <div>
                        <p>{pLData.ContactName}</p>
                      </div>
                      <div>
                        {" "}
                        <strong>Contact Company</strong>{" "}
                      </div>
                      <div>
                        <p>{pLData.ContactCompany}</p>
                      </div>
                    </div>
                    <div
                      className="col-md-4 col-sm-4 p-2"
                      style={{
                        padding: "2px",
                        border: "1px solid #789a3d",
                        borderLeft: "0px",
                      }}
                    >
                      <div>
                        {" "}
                        <strong>By Account Manager:</strong>{" "}
                      </div>
                      <div>
                        <p>{pLData.AssignToName}</p>
                      </div>
                      <div>
                        {" "}
                        <strong>Created</strong>{" "}
                      </div>
                      <div>
                        <p>{formatDate(pLData.CreatedDate, false)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered ">
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "#789a3d",
                            color: "white",
                          }}
                        >
                          <th>#</th>
                          <th>Photo</th>
                          <th>Address</th>
                          <th>Notes</th>
                          <th>Complete</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {pLDetailData.map((item, index) => (
                          <tr key={index}>
                            <td
                              style={{ verticalAlign: "middle" }}
                              className="tdbreak text-center"
                            >
                              {/* <strong>Controller Number:</strong><br />1<br />
                                        <strong>Controller Make/ Model:</strong><br />Evolution DX2<br />
                                        <strong>Serial:</strong><br />03023<br />
                                        <strong>Location:</strong><br />9 Durango Ct Aliso Viejo Ca 92656<br />
                                        <strong>Satellite Based?:</strong><br />No<br />
                                        <strong>Type of Water:</strong><br />Reclaimed<br />
                                        <strong>Photo:</strong><br /><br /> */}
                              <strong>
                                {item.DetailData.PunchlistDetailId}
                              </strong>
                            </td>
                            <td className="tdbreak">
                              {item.DetailData.PhotoPath? <>
                              <img
                                style={{ width: "200px" }}
                                src={`https://earthcoapi.yehtohoga.com/${item.DetailData.PhotoPath}`}
                                alt=""
                              /></>: <></>}
                            </td>
                            <td className="tdbreak">
                              <strong>{item.DetailData.Address}</strong>
                            </td>
                            <td className="tdbreak">
                              <p>{item.DetailData.Notes}</p>
                            </td>
                            <td>
                              {" "}
                              <p>{item.DetailData.PunchlichlistDetailStatus}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PunchlistPreview;

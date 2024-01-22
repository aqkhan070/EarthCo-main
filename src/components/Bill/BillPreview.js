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

const BillPreview = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));
  const isMail = queryParams.get("isMail");

  const { billData, toggleFullscreen, setToggleFullscreen } =
    useContext(DataContext);

  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

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

    html2pdf(input, {
      margin: 10,
      filename: "bill.pdf",
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
    //   const height = pdf.internal.pageSize.getHeight() ;

    //   pdf.addImage(imgData, "PNG", 0, 0, width, height);
    //   pdf.save("bill.pdf");
    // });
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
        {" "}
        <div
          style={{ fontFamily: "Times New Roman" }}
          className="row PageA4 mt-2"
        >
          <div className="card">
            <div className={toggleFullscreen ? "" : ""}>
              <div id="bill-preview" className=" get-preview ">
                <div className="card-body perview-pd">
                  <div className="row mt-2">
                    <div className="col-md-4 col-sm-4">
                      <h5 className="mb-0 ">EarthCo</h5>{" "}
                      <h6 className="mb-0">
                        1225 East Wakeham Avenue
                        <br /> Santa Ana, California <br /> 92705 O 714.571.0455
                        F 714.571.0580 CL# C27 823185 / D49 1025053
                      </h6>
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                      {" "}
                      <h3>
                        {" "}
                        <strong>Bills</strong>
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
                    <div className="col-md-8  col-sm-8">
                      <table>
                        <tbody>
                          <tr>
                            <td className="p-0 pt-2">
                              {" "}
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

                    <div className="col-md-4 col-sm-4 ">
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
                                  billPreviewData.Data.CreatedDate,
                                  false
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
                    <thead className="preview-table-header">
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
              {isMail ? (
                <></>
              ) : (
                <div className="p-2 bd-highlight">
                  <button
                    className="btn btn-outline-primary btn-sm estm-action-btn"
                    style={{ padding: "5px 10px" }}
                    onClick={() => {
                      navigate(`/bills`);
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
                  <button
                    className="btn btn-sm btn-outline-primary  estm-action-btn"
                    onClick={() => {
                      // sendEmail(
                      //   `/bills/bill-preview?id=${idParam}`,
                      //   billPreviewData.Data.SupplierId,
                      //   0,
                      //   true
                      // );
                      navigate(`/send-mail?title=${"Bill"}`);
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

export default BillPreview;

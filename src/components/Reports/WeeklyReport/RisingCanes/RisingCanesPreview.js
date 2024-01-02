import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import formatDate from "../../../../custom/FormatDate";
import logo from "../../../../assets/images/logo/earthco_logo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Print, Email, Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../../context/AppData";
import html2pdf from "html2pdf.js";
import useSendEmail from "../../../Hooks/useSendEmail";
import EventPopups from "../../../Reusable/EventPopups";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
const RisingCanesPreview = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

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

  const customerParam = Number(queryParams.get("Customer"));
  const MonthParam = Number(queryParams.get("Month"));
  const yearParam = Number(queryParams.get("Year"));
  const isMail = queryParams.get("isMail");

  const [weeklyPreviewData, setWeeklyPreviewData] = useState({});
  const [files, setFiles] = useState([]);
  const getWeeklyPreview = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/WeeklyReport/GetWeeklyReportRC?id=${idParam}`,
        { headers }
      );
      setWeeklyPreviewData(res.data.Data);
      setFiles(res.data.FileData);
      console.log("reponse weekly is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

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
    const input = document.getElementById("WR-RC-preview");

    html2pdf(input, {
      margin: 10,
      filename: "Weekly report - Rising Canes.pdf",
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
    //   const height = pdf.internal.pageSize.getHeight() / 2.2;

    //   pdf.addImage(imgData, "PNG", 0, 0, width, height);
    //   pdf.save("weekly report.pdf");
    // });
  };

  useEffect(() => {
    getWeeklyPreview();
  }, []);

  return (
    <>
      <EventPopups
        open={showEmailAlert}
        setOpen={setShowEmailAlert}
        color={emailAlertColor}
        text={emailAlertTxt}
      />
      <div className="container-fluid print-page-width">
        <div className="row PageA4 mt-2">
          <div className="card">
            <div
              id="WR-RC-preview"
              className="card-body perview-pd get-preview"
            >
              <div className="row ">
                <div className="pt-4 col-xl-10 col-lg-10 col-md-10 col-sm-9 text-center">
                  <h3 className=" pb-4">
                    {" "}
                    <strong>Weekly Report - Rising Canes</strong>{" "}
                  </h3>
                </div>
                <div className="mt-4 p-0 col-xl-2 col-lg-2 col-md-2 col-sm-3 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                  <div className="brand-logo mb-2 inovice-logo">
                    <img className="preview-Logo" src={logo} alt="" />
                  </div>
                </div>
              </div>
              <div className="row ">
                <div
                  className="col-md-4 col-sm-4 addborder border-bottom-0 border-end-0"
                  style={{ padding: "1%" }}
                >
                  <div>
                    <h5>
                      {" "}
                      <strong>Customer Name</strong>
                    </h5>{" "}
                  </div>
                  <div>
                    <h5>{weeklyPreviewData.CompanyName}</h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      <strong>Store Location</strong>
                    </h5>{" "}
                  </div>
                  <div>
                    <h5>{weeklyPreviewData.ServiceLocationName}</h5>
                  </div>
                </div>
                <div
                  className="col-md-4 col-sm-4 border-bottom-0 border-end-0 addborder"
                  style={{ padding: "1%" }}
                >
                  <div>
                    {" "}
                    <h5>
                      <strong>Contact Name</strong>
                    </h5>{" "}
                  </div>
                  <div>
                    <h5>{weeklyPreviewData.ContactName}</h5>{" "}
                  </div>
                  <div>
                    <h5>
                      {" "}
                      <strong>Contact Company</strong>
                    </h5>{" "}
                  </div>
                  <div>
                    <h5>{weeklyPreviewData.ContactCompany}</h5>{" "}
                  </div>
                </div>
                <div
                  className="col-md-4 col-sm-4 border-bottom-0  addborder"
                  style={{ padding: "1%" }}
                >
                  <div>
                    {" "}
                    <h5>
                      <strong>By Regional Manager</strong>
                    </h5>{" "}
                  </div>
                  <div>
                    <h5>{weeklyPreviewData.RegionalManagerName}</h5>{" "}
                  </div>
                  <div>
                    {" "}
                    <h5>
                      <strong>Report for week of</strong>
                    </h5>{" "}
                  </div>
                  <div>
                    <h5>{formatDate(weeklyPreviewData.ReportForWeekOf, false)}</h5>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="pt-2 col-md-12 border-bottom-0  addborder">
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Didyoucheckthehealthofalltheplantsandtreesontheproperty ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Did you check the health of all the plants and trees on
                      the property?
                    </h5>
                  </div>

                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Didyouremovealldeceasedplantsortrees ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Did you remove all deceased plants or trees?
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Didyoucheckirrigationtomakesureallplantsarereceivingwater ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Did you check irrigation to make sure all plants are
                      receiving water?
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Didyoucheckirrigationclock ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Did you check irrigation clock?
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Didyoufixallleaksorflooding ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Did you fix all leaks or flooding?
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Weretheweedspulledorsprayed ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Were the weeds pulled or sprayed?
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Wasthetrashanddebriscollectedandproperlydisposedof ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Was the trash and debris collected and properly disposed
                      of?
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Isthemulchsufficient ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Is the mulch sufficient?
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Didtheparkinglotgetcleaned ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Did the parking lot get cleaned?
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {" "}
                      {weeklyPreviewData.Didthedoorentrywayplantersgetaddressed ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      Did the door entry way planters get addressed?
                    </h5>
                  </div>
                </div>
                <div className=" pt-2 col-md-12 border-bottom-0 addborder">
                  <div>
                    {" "}
                    <h5>
                      <strong>Are there any areas of concern?</strong>
                    </h5>{" "}
                    <h6>{weeklyPreviewData.Arethereanyareasofconcern}</h6>
                  </div>
                </div>
                <div className="pt-2 col-md-12 border-bottom-0 addborder">
                  <div>
                    {" "}
                    <h5>
                      <strong>
                        Describe the mulch condition and if we need to add any:
                      </strong>
                    </h5>{" "}
                    <h6>
                      {
                        weeklyPreviewData.Describethemulchconditionandifweneedtoaddany
                      }
                    </h6>
                  </div>
                </div>
                <div className="pt-2 col-md-12 border-bottom-0 addborder">
                  <div>
                    {" "}
                    <h5>
                      <strong>Are there any areas of concern?</strong>
                    </h5>{" "}
                    <h6>{weeklyPreviewData.Arethereanyareasofconcern}</h6>
                  </div>
                </div>
                <div className=" pt-2 col-md-12 border-bottom-0 addborder">
                  <div>
                    {" "}
                    <h5>
                      <strong>Describe the drive-through condition:</strong>
                    </h5>{" "}
                    <h6>
                      {weeklyPreviewData.Describethedrivethroughcondition}
                    </h6>
                  </div>
                </div>
                <div className=" pt-2 col-md-12 border-bottom-0 addborder">
                  <div>
                    {" "}
                    <h5>
                      <strong>
                        Describe the perimeter of building including signage,
                        street facing planters, etc condition:
                      </strong>
                    </h5>{" "}
                    <h6>
                      {
                        weeklyPreviewData.Describetheperimeterofbuildingincludingsignagestreetfacingplantersetccondition
                      }
                    </h6>
                  </div>
                </div>
                <div className=" pt-2 col-md-12 border-bottom-0 addborder">
                  <div>
                    {" "}
                    <h5>
                      <strong>
                        Any additional notes management should be aware of:
                      </strong>
                    </h5>{" "}
                    <h6>
                      {
                        weeklyPreviewData.Anyadditionalnotesmanagementshouldbeawareof
                      }
                    </h6>
                  </div>
                </div>
                <div className=" pt-2 col-md-12  addborder">
                  <div>
                    {" "}
                    <h5>
                      <strong>Signature of RC onsite manager:</strong>
                    </h5>{" "}
                    <h6>{weeklyPreviewData.SignatureofRConsitemanager}</h6>
                  </div>
                  <div>
                    {" "}
                    <h5>
                      <strong>Name of RC onsite manager:</strong>
                    </h5>{" "}
                    <h6>{weeklyPreviewData.NameofRConsitemanager}</h6>
                  </div>
                </div>

                <div className="col-md-12">
                  <div>
                    {" "}
                    <h5>
                      <strong>Photos:</strong>
                    </h5>{" "}
                  </div>
                </div>

                {files.map((file, index) => {
                  return (
                    <div key={index} className="col-md-3 col-sm-4">
                      <img
                        src={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                        className="weeklyimages"
                        alt="weeklyimages"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {toggleFullscreen ? (
          <div className="row ms-2">
            <div className="d-flex align-items-end flex-column bd-highlight mb-3">
              {isMail ? (
                <></>
              ) : (
                <div className="p-2 bd-highlight">
                  <button
                    className="btn btn-outline-primary btn-sm estm-action-btn"
                    onClick={() => {
                      navigate(`/weekly-reports/rising-canes`);
                    }}
                  >
                    <i className="fa fa-backward"></i>
                  </button>
                </div>
              )}

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

              {isMail ? (
                <></>
              ) : (
                <div className="p-2 bd-highlight">
                  <button
                    className="btn btn-sm btn-outline-primary  estm-action-btn"
                    onClick={() => {
                      navigate(
                        `/send-mail?title=${"Weekly Report - Rising Canes"}`
                      );
                      //   sendEmail(
                      //     `/weekly-reports/weekly-report-preview?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                      //     customerParam,
                      //     0,
                      //     false
                      //   );
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

export default RisingCanesPreview;

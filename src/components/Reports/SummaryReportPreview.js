import React, { useContext, useEffect } from "react";
import formatDate from "../../custom/FormatDate";
import logo from "../../assets/images/logo/earthco_logo.png";
import useFetchProposalReports from "../Hooks/useFetchProposalReports";
import { CircularProgress } from "@mui/material";
import { DataContext } from "../../context/AppData";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const SummaryReportPreview = () => {
  const { sRProposalData, setsRProposalData } = useContext(DataContext);
  const navigate = useNavigate();

  const { loading, reportError, reportData, fetchReport } =
    useFetchProposalReports();

  const handlePrint = () => {
    window.print();
  };
  const handleDownload = () => {
    const input = document.getElementById("summeryReport-preview");

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
      const height = pdf.internal.pageSize.getHeight() / 1.9;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("Summery Report.pdf");
    });
  };

  useEffect(() => {
    fetchReport(
      sRProposalData.formData.CustomerId,
      sRProposalData.formData.Year,
      sRProposalData.formData.Month,
      "Service Request"
    );

    console.log("sr propoal dala", sRProposalData);
  }, []);

  if (reportError) {
    return (
      <div className="text-center">
        {" "}
        <h3>No record found</h3>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="center-loader">
          <CircularProgress style={{ color: "#789a3d" }} />
        </div>
      ) : (
        <div style={{ maxWidth: "70em" }} className="container-fluid">
          <div className="row justify-content-between ">
            <div className="col-md-3 text-start pb-0">
              <button
                className="btn btn-secondary btn-sm mb-0 mt-3 ms-2"
                onClick={() => {
                  navigate(`/Dashboard/SummaryReport`);
                }}
              >
                &#60; Back
              </button>
            </div>
            <div className="col-md-3 text-end">
              {" "}
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 mx-3 estm-action-btn"
                onClick={handlePrint}
              >
                <Print />
              </button>
              <button
                className="btn btn-sm btn-outline-primary mb-2 mt-3 mx-3 estm-action-btn"
                onClick={handleDownload}
              >
                <Download />
              </button>
            </div>
          </div>

          <div className="row">
            <div className="card mt-3">
              {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                    <strong>Status:</strong> Pending</span> </div> */}
              <div id="summeryReport-preview" className="card-body get-preview">
                <div className="row mb-5">
                  <div className="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-4">
                    <div>
                      {" "}
                      <strong>{reportData[0].CompanyName}</strong>{" "}
                    </div>
                    <div>{reportData[0].Address}</div>

                    <div>Submitted To: </div>
                    <div>Christian Walton</div>
                    <div>Optimum</div>
                  </div>
                  <div className="mt-5 col-xl-7 col-lg-7 col-md-7 col-sm-4 text-center">
                    <h3>
                      {" "}
                      <strong>Service Request Summary Report</strong>{" "}
                    </h3>
                    <h3>Grandview Crest</h3>
                  </div>
                  <div className="mt-4 col-xl-2 col-lg-2 col-md-2 col-sm-4 text-right d-flex justify-content-lg-end justify-content-md-center">
                    <div className="brand-logo mb-2 inovice-logo">
                      <img className="preview-Logo" src={logo} alt="" />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-sm-12 me-1">
                  <table className="text-center table table-bordered ">
                    <thead>
                      <tr>
                        <th>RECEIVED:</th>
                        <th>W/O #:</th>
                        <th>REQUESTED WORK:</th>
                        <th>EARTHCO'S ACTION TAKEN</th>
                        <th>STATUS: </th>
                        <th>COMPLETED:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.map((report, index) => {
                        return (
                          <tr key={index}>
                            <td>{formatDate(report.CreatedDate)}</td>
                            <td className="left strong">
                              {report.ServiceRequestNumber}
                            </td>
                            <td>{report.WorkRequest}</td>
                            <td>{report.ActionTaken}</td>
                            <td>{report.Status}</td>
                            <td>{formatDate(report.CompletedDate)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryReportPreview;

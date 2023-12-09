import React, { useContext, useEffect } from "react";
import useFetchProposalReports from "../Hooks/useFetchProposalReports";
import { DataContext } from "../../context/AppData";
import { CircularProgress } from "@mui/material";
import formatDate from "../../custom/FormatDate";
import logo from "../../assets/images/logo/earthco_logo.png";
import { Print, Email, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const ProposalSummary = () => {
  const {
    sRProposalData,
    setsRProposalData,
    toggleFullscreen,
    setToggleFullscreen,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const isGeneralReport = window.location.pathname.includes("GeneralReport");

  const { loading, reportError, reportData, fetchReport } =
    useFetchProposalReports();
  useEffect(() => {
    fetchReport(
      sRProposalData.formData.CustomerId,
      sRProposalData.formData.Year,
      sRProposalData.formData.Month,
      "proposal"
    );

    console.log("sr propoal dala", reportData);
  }, []);

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
    const input = document.getElementById("PS-preview");

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
      const height = pdf.internal.pageSize.getHeight() / 2.2;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("ProposalSummary.pdf");
    });
  };

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
        <div className="container-fluid ">
    {toggleFullscreen && !isGeneralReport ? (
      <div className="row me-3">
       
        <div className="col-md-11 text-end">
          {" "}
          <button
            className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
            onClick={() => {
              navigate(`/SummaryReport`);
            }}
          >
            <i className="fa fa-backward"></i>
          </button>
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
          </button>
        </div>
      </div>
    ) : (
      <></>
    )}

    <div className="print-page-width">

          <div className="PageLandscape mt-2">
            <div className="card">
              {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                    <strong>Status:</strong> Pending</span> </div> */}
              <div id="PS-preview" className="card-body perview-pd get-preview">
                <div className="row mb-5">
                  <div className="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-3">
                    <div style={{ color: "black" }}>
                      <strong>EarthCo</strong>{" "}
                    </div>
                    <div style={{ color: "black" }}>
                      <strong>
                        {reportData[0].CustomerId} {reportData[0].CompanyName}
                      </strong>{" "}
                    </div>
                    <div style={{ color: "black" }}>
                      {reportData[0].Address}
                    </div>
                  </div>
                  <div className="mt-5 col-xl-7 col-lg-7 col-md-7 col-sm-7 text-center">
                    <h3>
                      {" "}
                      <strong>Proposal Summary Report</strong>{" "}
                    </h3>
                    <h3>Grandview Crest</h3>
                  </div>
                  <div className="mt-4 col-xl-2 col-lg-2 col-md-2 col-sm-2 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                    <div className="brand-logo mb-2 inovice-logo">
                      <img className="preview-Logo" src={logo} alt="" />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="table-responsive">
                  <table className="text-center table table-bordered ">
                    <thead>
                      <tr className="preview-table-head">
                        <th>SUBMITTED:</th>
                        <th>PROPOSAL #:</th>
                        <th>DESCRIPTION:</th>
                        <th>AMOUNT:</th>
                        <th>STATUS: </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.map((report, index) => {
                        return (
                          <tr className="preview-table-row" key={index}>
                            <td>{formatDate(report.CreatedDate)}</td>
                            <td className="left strong">
                              {report.EstimateNumber}
                            </td>
                            <td>{report.EstimateNotes}</td>
                            <td>{report.TotalAmount.toFixed(2)}</td>
                            <td>{report.Status}</td>
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
        </div>
      )}
    </>
  );
};

export default ProposalSummary;

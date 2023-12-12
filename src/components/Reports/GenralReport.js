import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/AppData";
import SummaryReportPreview from "./SummaryReportPreview";
import ProposalSummary from "./ProposalSummary";
import Landscape from "../Landscape/Landscape";
import { Print, Email, Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import useSendEmail from "../Hooks/useSendEmail";

const GenralReport = () => {
  const {
    sRProposalData,
    setsRProposalData,
    toggleFullscreen,
    setToggleFullscreen,
  } = useContext(DataContext);

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const customerParam = Number(queryParams.get("Customer"));
  const MonthParam = Number(queryParams.get("Month"));
  const yearParam = Number(queryParams.get("Year"));

  const isMail = queryParams.get("isMail");

  const navigate = useNavigate();
  const { sendEmail } = useSendEmail();

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
    const input = document.getElementById("General-preview");

    html2pdf(input, {
      margin: 10,
      filename: "General.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
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
    //   const height = pdf.internal.pageSize.getHeight() / 1.8;

    //   pdf.addImage(imgData, "PNG", 0, 0, width, height);
    //   pdf.save("Summery Report.pdf");
    // });
  };

  useEffect(() => {
    console.log("sr data", sRProposalData);
  }, []);

  return (
    <>
      <div className="container-fluid ">
        {toggleFullscreen ? (
          <div className="row me-4">
            <div className="col-md-11 text-end">
              {" "}
              {isMail ? (
                <></>
              ) : (
                <button
                  className="btn btn-outline-primary btn-sm estm-action-btn mb-2 mt-3 "
                  onClick={() => {
                    navigate(`/SummaryReport`);
                  }}
                >
                  <i className="fa fa-backward"></i>
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
              </button>
              {isMail ? (
                <></>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary mb-2 mt-3 estm-action-btn"
                  onClick={() => {
                    sendEmail(
                      `/GeneralReport?Customer=${customerParam}&Year=${yearParam}&Month=${MonthParam}`,
                      customerParam,
                      0,
                      false
                    );
                  }}
                >
                  <i class="fa-regular fa-envelope"></i>
                </button>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div id="General-preview">
          <div className={toggleFullscreen ? "" : "full-page-print-height"}>
            <SummaryReportPreview />
          </div>
          <div className={toggleFullscreen ? "" : "full-page-print-height"}>
            <ProposalSummary />
          </div>
          <div className={toggleFullscreen ? "" : "full-page-print-height"}>
            <Landscape />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenralReport;

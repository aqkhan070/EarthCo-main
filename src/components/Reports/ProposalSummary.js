import React, { useContext, useEffect } from "react";
import useFetchProposalReports from "../Hooks/useFetchProposalReports";
import { DataContext } from "../../context/AppData";
import { CircularProgress } from "@mui/material";
import formatDate from "../../custom/FormatDate";
import logo from "../../assets/images/logo/earthco_logo.png";

const ProposalSummary = () => {
  const { sRProposalData, setsRProposalData } = useContext(DataContext);
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

  return (
    <>
      {loading ? (
        <div className="center-loader">
          <CircularProgress style={{ color: "#789a3d" }} />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mt-3">
                {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                    <strong>Status:</strong> Pending</span> </div> */}
                <div className="card-body">
                  <div className="row mb-5">
                    <div className="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-12">
                      <div>
                        <strong>{reportData[0].CompanyName}</strong>{" "}
                      </div>
                      <div>{reportData[0].Address}</div>
                    </div>
                    <div className="mt-5 col-xl-7 col-lg-7 col-md-7 col-sm-12 text-center">
                      <h3>
                        {" "}
                        <strong>Proposal Summary Report</strong>{" "}
                      </h3>
                      <h3>Grandview Crest</h3>
                    </div>
                    <div className="mt-4 col-xl-2 col-lg-2 col-md-2 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                      <div className="brand-logo mb-2 inovice-logo">
                        <img style={{ width: "70%" }} src={logo} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="table-responsive">
                    <table className="text-center table table-bordered ">
                      <thead>
                        <tr>
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
                            <tr key={index}>
                              <td>{formatDate(report.CreatedDate)}</td>
                              <td className="left strong">
                                {report.EstimateNumber}
                              </td>
                              <td>{report.EstimateNotes}</td>
                              <td>${report.TotalAmount}</td>
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

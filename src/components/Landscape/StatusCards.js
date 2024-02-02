import React, { useEffect, useState } from "react";
import OpenWithIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
const StatusCards = ({ statusId, setStatusId, records }) => {
  useEffect(() => {
    console.log("jhaduqhwwe", records);
  }, [records]);

  return (
    <>
      <div className="col-xl-3  col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div
            className={
              statusId === 2 ? "card-body selected-Card " : "card-body "
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              setStatusId(2);
            }}
          >
            <div className="media ai-icon">
              <span className="me-3 bgl-primary text-primary">
                {/* <i className="ti-user"></i>  */}
                <TaskIcon fontSize="large" />
              </span>
              <div className="media-body">
                <p className="mb-1">closed</p>
                <div className="row">
                  <div className="col-md-4 col-sm-4">
                    {" "}
                    <h4 className="mb-0">{records.closed}</h4>
                    {/* <span className="badge badge-primary">15%</span> */}
                  </div>
                  <div className="col-md-8 col-sm-8 mt-2 text-end">
                    {/* <p>
                      {" "}
                      $
                      {estmRecords.totalNewRecordsSum
                        ? estmRecords.totalNewRecordsSum.toFixed(2)
                        : "0.00"}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3  col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div
            className={
              statusId === 1 ? "card-body selected-Card " : "card-body"
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              setStatusId(1);
            }}
          >
            <div className="media ai-icon">
              <span className="me-3 bgl-warning text-warning">
              <OpenWithIcon fontSize="large" />
              </span>
              <div className="media-body">
                <p className="mb-1">Open</p>
                <div className="row">
                  <div className="col-md-4 col-sm-4">
                    <h4 className="mb-0">{records.open}</h4>
                    {/* <span className="badge badge-warning">30%</span> */}
                  </div>
                  <div className="col-md-8 col-sm-8 mt-2 text-end">
                    {/* <p>
                      $
                      {estmRecords.totalApprovedRecordsSum
                        ? estmRecords.totalApprovedRecordsSum.toFixed(2)
                        : "0.00"}
                    </p> */}
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

export default StatusCards;

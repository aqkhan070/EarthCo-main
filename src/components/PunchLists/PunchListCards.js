import React from "react";

const PunchListCards = ({ totalRecords, statusId, setStatusId }) => {
  return (
    <div className="row">
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
              <svg id="icon-orders" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
              </span>
              <div className="media-body">
                <p className="mb-1">new</p>
                <h4 className="mb-0">{totalRecords.totalNewRecords}</h4>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3  col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div
            className={
              statusId === 3 ? "card-body selected-Card " : "card-body "
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              setStatusId(3);
            }}
          >
            <div className="media ai-icon">
              <span className="me-3 bgl-warning text-warning">
                <svg
                  id="icon-orders"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-file-text"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              <div className="media-body">
                <p className="mb-1">Open</p>
                <h4 className="mb-0">{totalRecords.totalOpenRecords}</h4>
         
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3  col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div
            className={
              statusId === 1 ? "card-body selected-Card " : "card-body "
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              setStatusId(1);
            }}
          >
            <div className="media ai-icon">
              <span className="me-3 bgl-danger text-danger">
              <svg id="icon-orders" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
              </span>
              <div className="media-body">
                <p className="mb-1">Closed</p>
                <h4 className="mb-0">{totalRecords.totalClosedRecords}</h4>
      
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3  col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div
            className={
              statusId === 0 ? "card-body selected-Card " : "card-body "
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              setStatusId(0);
            }}
          >
            <div className="media ai-icon">
              <span className="me-3 bgl-success text-success">
                <svg
                  id="icon-database-widget"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-database"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </span>
              <div className="media-body">
                <p className="mb-1">Total</p>
                <h4 className="mb-0">{totalRecords.totalRecords}</h4>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchListCards;

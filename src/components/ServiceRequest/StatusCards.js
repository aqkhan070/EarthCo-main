import React from "react";

const StatusCards = ({
  setStatusId,
  statusId,
  newData,
  open,
  closed,
  total,
}) => {
  return (
    <>
      {/* <div className="col-xl-3 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-primary-light rounded-circle flex-box">
                                <span className="material-symbols-outlined" style={{ fontSize: '30px', color: '#0d99ff' }}>
                                    edit
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="text-primary count">{newData}</h3>
                                <span>New</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-danger-light rounded-circle flex-box">
                                
                                <span className="material-symbols-outlined" style={{ fontSize: '30px', color: '#e3952e' }}>
                                    file_open
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="count" style={{ color: '#e3952e' }}>{open}</h3>
                                <span>Open</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle flex-box">
                                <span className="material-symbols-outlined" style={{ fontSize: '35px', color: '#3ac977' }}>
                                    gpp_bad
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="text-success count">{closed}</h3>
                                <span>Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-purple-light rounded-circle flex-box">
                                <span className="material-symbols-outlined" style={{ fontSize: '35px', color: 'black' }}>
                                    person
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="text-secondary count">{total}</h3>
                                <span>Total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

      {/*<div className="col-xl-3  col-lg-6 col-sm-6">
                <div className="widget-stat card">
                    <div className="card-body ">
                        <div className="media ai-icon">
                            <span className="me-3 bgl-primary text-primary">
                                <i className="ti-user"></i> 
                                <svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </span>
                            <div className="media-body">
                                <p className="mb-1">New</p>
                                <h4 className="mb-0">779</h4>
                                <span className="badge badge-primary">15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

      <div className="col-xl-3  col-lg-6 col-sm-6 ">
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
                <h4 className="mb-0">{open}</h4>
                {/* <span className="badge badge-warning">30%</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3  col-lg-6 col-sm-6 ">
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
              <span className="me-3 bgl-danger text-danger">
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
                <p className="mb-1">Closed</p>
                <h4 className="mb-0">{closed}</h4>
                {/* <span className="badge badge-danger">55%</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-xl-3  col-lg-6 col-sm-6">
                <div className="widget-stat card">
                    <div className="card-body ">
                        <div className="media ai-icon">
                            <span className="me-3 bgl-success text-success">
                                <svg id="icon-database-widget" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-database">
                                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                </svg>
                            </span>
                            <div className="media-body">
                                <p className="mb-1">Total</p>
                                <h4 className="mb-0">77799</h4>
                                <span className="badge badge-success">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </>
  );
};

export default StatusCards;

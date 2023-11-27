import React from "react";

const PoCards = ({closed, open}) => {
  return (
    <>
      <div className="col-xl-3  col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div className="card-body p-4">
            <div className="media ai-icon">
              <span className="me-3 bgl-primary text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <div className="media-body">
                <p className="mb-1">Open</p>
                <h4 className="mb-0">{open}</h4>
               
              </div>
            </div>
          </div>
        </div>{" "}
      </div>

      <div className="col-xl-3  col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div className="card-body p-4">
            <div className="media ai-icon">
              <span className="me-3 bgl-warning text-warning">
                <svg
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
                <p className="mb-1">Open Approved</p>
                <h4 className="mb-0">{open}</h4>
          
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3  col-lg-6 col-sm-6">
        <div className="widget-stat card">
          <div className="card-body  p-4">
            <div className="media ai-icon">
              <span className="me-3 bgl-danger text-danger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-dollar-sign"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </span>
              <div className="media-body">
                <p className="mb-1">Closed Billed</p>
                <h4 className="mb-0">{closed}</h4>
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoCards;
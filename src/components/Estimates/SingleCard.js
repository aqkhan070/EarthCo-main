import React from 'react'
import formatAmount from '../../custom/FormatAmount';
const SingleCard = ({setStatusId, statusId, status, title, number, amount, color}) => {
  return (
    <div className='col'>
    <div className="widget-stat card">
      <div
        className={
          statusId === status ? "card-body ps-2 pe-1 selected-Card " : "card-body ps-2 pe-1 "
        }
        style={{ cursor: "pointer" }}
        onClick={() => {
          setStatusId(status);
        }}
      >
        <div className="media ai-icon">
          <span
            style={{
              minWidth: "4.3rem",
              height: "4.3rem",
              width: "4.3rem",
            }}
            className={`me-1 bgl-${color} text-${color}`}
          >
            {/* <i className="ti-user"></i>  */}
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
            <p style={{whiteSpace : "nowrap"}} >{title}</p>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h4 className="mb-0">{number}</h4>
                {/* <span className="badge badge-primary">15%</span> */}
              </div>
              <div className="col-md-12 col-sm-12 text-end">
                <p style={{ color: "black" }}>
                  ${formatAmount(amount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SingleCard
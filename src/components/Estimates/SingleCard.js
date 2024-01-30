import React from 'react'
import formatAmount from '../../custom/FormatAmount';
import { Icon } from '@mui/material';
const SingleCard = ({setStatusId, statusId, status, title, number, amount, color, icon}) => {
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
        <div className="media ai-icon mb-2">
          <span
            style={{
              minWidth: "4.3rem",
              height: "4.3rem",
              width: "4.3rem",
            }}
            className={`me-1 bgl-${color} text-${color}`}
          >
            {/* <i className="ti-user"></i>  */}
            <Icon component={icon} fontSize='large' />
          </span>
          <div className="media-body">
            <p style={{whiteSpace : "nowrap"}} >{title}</p>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h4 className="mb-0">{number}</h4>
                {/* <span className="badge badge-primary">15%</span> */}
              </div>
              <div className="col-md-12 col-sm-12  text-end">
                <p style={{ color: "black", marginRight: "8px" }}>
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
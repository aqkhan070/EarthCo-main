import React from 'react'
import formatAmount from '../../custom/FormatAmount'

const SingleCard = ({title , count, total, color,onClick ,children}) => {
  return (
    <div className={`card bg-${color}`}>
                <div
                  className="card-body"
                  style={{ cursor: "pointer" }}
                  onClick={onClick}
                >
                  <div className="row">
                    <div className="col-md-9">
                      
                      <h4 className="my-0 py-0" style={{ color: "white" }}>
                        {count}
                      </h4>
                      <h5 className="my-0 py-0" style={{ color: "white" }}>{title}</h5>
                      
                      <h5 className="my-0 py-0 text-end" style={{ color: "white"}}>{total? "$"+formatAmount(total) : ""}</h5>
                    </div>
                    <div  className={`col-md-3 pt-3`} >{children}
                     
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default SingleCard
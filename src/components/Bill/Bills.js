import React, { useState } from "react";
import AddBill from "./AddBill";

const Bills = () => {
  const [showContent, setshowContent] = useState(true)
  return (
    <>
    {showContent ? 
    <>
      <div className="page-titles">
        <ol className="breadcrumb">
          <div className="menu-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.64111 13.5497L9.38482 9.9837L12.5145 12.4421L15.1995 8.97684"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <ellipse
                cx="18.3291"
                cy="3.85021"
                rx="1.76201"
                ry="1.76201"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.6808 2.86012H7.01867C4.25818 2.86012 2.54651 4.81512 2.54651 7.57561V14.9845C2.54651 17.7449 4.22462 19.6915 7.01867 19.6915H14.9058C17.6663 19.6915 19.3779 17.7449 19.3779 14.9845V8.53213"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <li>
            <h5 className="bc-title">Bills</h5>
          </li>
        </ol>
        
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card dz-card" id="bootstrap-table2">
              <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                <h4 className="heading mb-0">Bills</h4>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                   onClick={() => {setshowContent(false)}}

                  >
                    + Add New Bill
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="table-responsive active-projects style-1 shorting dt-filter exports">
                  <table
                    className="table table-responsive-md table-bordered"
                    id="contacts-tbl"
                  >
                    <thead>
                      <tr>
                        <th style={{width:'50px;'}}>
                          <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkAll"
                              required=""
                            />
                            <label
                              className="form-check-label"
                              for="checkAll"
                            ></label>
                          </div>
                        </th>
                        <th>
                          <strong>Vendor</strong>
                        </th>
                        <th>
                          <strong>Date</strong>
                        </th>

                        <th>
                          <strong>Amount</strong>
                        </th>
                        <th>
                          <strong>Memo</strong>
                        </th>
                        <th>
                          <strong>Currency</strong>
                        </th>
                        <th>
                          <strong>Tags</strong>
                        </th>
                        <th>
                          <strong></strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheckBox2"
                              required=""
                            />
                            <label
                              className="form-check-label"
                              for="customCheckBox2"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <div className="align-items-center">
                            <h6>SiteOne Landscape Supply</h6>
                            <span className="w-space-no">#OC47704</span>
                          </div>
                        </td>
                        <td>Oct-30-2023 </td>

                        <td>1.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i className="fa fa-pencil"></i>
                            </a>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheckBox2"
                              required=""
                            />
                            <label
                              className="form-check-label"
                              for="customCheckBox2"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <div className="align-items-center">
                            <h6>SiteOne Landscape Supply</h6>
                            <span className="w-space-no">#OC47703</span>
                          </div>
                        </td>
                        <td>Oct-30-2023 </td>

                        <td>1.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i className="fa fa-pencil"></i>
                            </a>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheckBox2"
                              required=""
                            />
                            <label
                              className="form-check-label"
                              for="customCheckBox2"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <div className="align-items-center">
                            <h6>SiteOne Landscape Supply</h6>
                            <span className="w-space-no">#OC47702</span>
                          </div>
                        </td>
                        <td>Oct-30-2023 </td>

                        <td>1.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="d-flex">
                            <a
                              href="#"
                              className="btn btn-primary shadow btn-xs sharp me-1"
                            >
                              <i className="fa fa-pencil"></i>
                            </a>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </> : <AddBill setshowContent={setshowContent}/> }
    
    </>
  );
};

export default Bills;

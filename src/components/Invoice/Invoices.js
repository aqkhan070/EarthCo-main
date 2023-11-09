import React, { useState } from "react";
import AddInvioces from "./AddInvioces";

const Invoices = () => {
  const [showContent, setShowContent] = useState(true);

  return (
    <>
      {showContent ? (
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
                <h5 className="bc-title">Invoice</h5>
              </li>
            </ol>
            {/* <a
          className="text-primary fs-13"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample1"
          role="button"
          aria-controls="offcanvasExample1"
        >
          + Add Task
        </a> */}
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2 col-sm-3">
                <div className="widget-stat card">
                  <div className="card-body p-3">
                    <div className="media ai-icon smaller-widget">
                      <span className=" bgl-primary text-primary smaller-widget">
                        <i className="la la-edit smaller-widget"></i>
                      </span>
                      <div className="media-body">
                        <p className="mb-1 ">Draft</p>
                        <h4 className="mb-0 smaller-widget">779</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-3">
                <div className="widget-stat card">
                  <div className="card-body p-3">
                    <div className="media ai-icon smaller-widget">
                      <span className=" bgl-warning text-warning smaller-widget">
                        <i className="la la-send smaller-widget"></i>
                      </span>
                      <div className="media-body">
                        <p className="mb-1">Sent</p>
                        <h4 className="mb-0 smaller-widget">5131</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2  ">
                <div className="widget-stat card">
                  <div className="card-body  p-3 ">
                    <div className="media ai-icon smaller-widget">
                      <span className=" bgl-danger text-danger smaller-widget">
                        <i className="la la-stack-overflow "></i>
                      </span>
                      <div className="media-body">
                        <p className="mb-1 ">Overdue</p>
                        <h4 className="mb-0 smaller-widget">71889</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2  ">
                <div className="widget-stat card">
                  <div className="card-body  p-3">
                    <div className="media ai-icon smaller-widget">
                      <span className=" bgl-success text-success smaller-widget">
                        <i className="la la-thumbs-up"></i>
                      </span>
                      <div className="media-body">
                        <p className="mb-1 ">Paid</p>
                        <h4 className="mb-0 smaller-widget">71889</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2  ">
                <div className="widget-stat card">
                  <div className="card-body  p-3">
                    <div className="media ai-icon smaller-widget">
                      <span className=" bgl-secondary text-secondary smaller-widget">
                        <i className="la la-dollar-sign"></i>
                      </span>
                      <div className="media-body">
                        <p className="mb-1">Total</p>
                        <h4 className="mb-0 smaller-widget">71889</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="card dz-card" id="bootstrap-table2">
                  <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                    <h4 className="heading mb-0">Invoices</h4>
                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setShowContent(false);
                        }}
                      >
                        + Add New Invoice
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
                            <th style={{ width: "50px;" }}>
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
                              <strong>Invoice</strong>
                            </th>
                            <th>
                              <strong>Issue Date</strong>
                            </th>
                            <th>
                              <strong>Customer</strong>
                            </th>
                            <th>
                              <strong>Balance</strong>
                            </th>
                            <th>
                              <strong>Total</strong>
                            </th>
                            <th>
                              <strong>Service#</strong>
                            </th>
                            <th>
                              <strong>Status</strong>
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
                                <span className="w-space-no">#OC47704</span>
                              </div>
                            </td>
                            <td>Oct-30-2023 </td>
                            <td>Manny</td>
                            <td>800</td>
                            <td>800</td>
                            <td></td>
                            <td>
                              <div className="d-flex align-items-center">
                                <i className="fa fa-circle text-success me-1"></i>{" "}
                                Open
                              </div>
                            </td>
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
                                <span className="w-space-no">#OC47703</span>
                              </div>
                            </td>
                            <td>Oct-30-2023 </td>
                            <td>Manny</td>
                            <td>800</td>
                            <td>800</td>
                            <td></td>
                            <td>
                              <div className="d-flex align-items-center">
                                <i className="fa fa-circle text-success me-1"></i>{" "}
                                Open
                              </div>
                            </td>
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
                                <span className="w-space-no">#OC47703</span>
                              </div>
                            </td>
                            <td>Oct-30-2023 </td>
                            <td>Linda Isle</td>
                            <td>800</td>
                            <td>800</td>
                            <td></td>
                            <td>
                              <div className="d-flex align-items-center">
                                <i className="fa fa-circle text-success me-1"></i>{" "}
                                Open
                              </div>
                            </td>
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
        </>
      ) : (
        <AddInvioces setShowContent={setShowContent} />
      )}
    </>
  );
};

export default Invoices;

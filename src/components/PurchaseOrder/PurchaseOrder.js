import React, { useContext, useEffect, useRef, useState } from "react";
import { AddPO } from "./AddPO";

const PurchaseOrder = () => {
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
                    d="M14.4065 14.8714H7.78821"
                    stroke="#888888"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14.4065 11.0338H7.78821"
                    stroke="#888888"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10.3137 7.2051H7.78827"
                    stroke="#888888"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5829 2.52066C14.5829 2.52066 7.54563 2.52433 7.53463 2.52433C5.00463 2.53991 3.43805 4.20458 3.43805 6.74374V15.1734C3.43805 17.7254 5.01655 19.3965 7.56855 19.3965C7.56855 19.3965 14.6049 19.3937 14.6168 19.3937C17.1468 19.3782 18.7143 17.7126 18.7143 15.1734V6.74374C18.7143 4.19174 17.1349 2.52066 14.5829 2.52066Z"
                    stroke="#888888"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <li>
                <h5 className="bc-title">Purchase Order</h5>
              </li>
            </ol>
          </div>
          <div className="container-fluid">
            <div className="row">
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
                          stroke-width="2"
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
                        <h4 className="mb-0">779</h4>
                        <span className="badge badge-primary">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                          stroke-width="2"
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
                        <h4 className="mb-0">5131</h4>
                        <span className="badge badge-warning">30%</span>
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
                          stroke-width="2"
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
                        <h4 className="mb-0">71889</h4>
                        <span className="badge badge-danger">55%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 mb-3 text-right"></div>
              <div className="col-xl-12">
                <div className="card dz-card">
                  <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                    <h4 className="heading mb-0">Purchase Order</h4>
                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                         
                          setShowContent(false);
                        }}
                      >
                        + Add New Purchase Order
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive active-projects style-1 shorting dt-filter exports">
                      <table className="table table-responsive-md table-bordered">
                        <thead>
                          <tr>
                            <th style={{ width: "50px" }}>
                              <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
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
                              <strong>Status</strong>
                            </th>
                            <th>
                              <strong>R-Manager</strong>
                            </th>
                            <th>
                              <strong>R-By</strong>
                            </th>
                            <th>
                              <strong>Estimate#</strong>
                            </th>
                            <th>
                              <strong>Bill#</strong>
                            </th>
                            <th>
                              <strong>Invoice#</strong>
                            </th>
                            <th>
                              <strong>Amount</strong>
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
                            <td>
                              <div className="d-flex align-items-center">
                                <i className="fa fa-circle text-success me-1"></i>{" "}
                                Open
                              </div>
                            </td>
                            <td>Manny</td>
                            <td>Julio Cesar</td>
                            <td>1031</td>
                            <td></td>
                            <td></td>
                            <td>1.00</td>
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
                            <td>
                              <div className="d-flex align-items-center">
                                <i className="fa fa-circle text-success me-1"></i>{" "}
                                Open
                              </div>
                            </td>
                            <td>Manny</td>
                            <td>Julio Cesar</td>
                            <td>1031</td>
                            <td></td>
                            <td></td>
                            <td>1.00</td>
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
                            <td>
                              <div className="d-flex align-items-center">
                                <i className="fa fa-circle text-success me-1"></i>{" "}
                                Open
                              </div>
                            </td>
                            <td>Manny</td>
                            <td>Julio Cesar</td>
                            <td>1031</td>
                            <td></td>
                            <td></td>
                            <td>1.00</td>
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
                                <span className="w-space-no">#OC47701</span>
                              </div>
                            </td>
                            <td>Oct-30-2023 </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <i className="fa fa-circle text-success me-1"></i>{" "}
                                Open
                              </div>
                            </td>
                            <td>Manny</td>
                            <td>Julio Cesar</td>
                            <td>1031</td>
                            <td></td>
                            <td></td>
                            <td>1.00</td>
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
        <AddPO setShowContent={setShowContent} />
      )}
    </>
  );
};

export default PurchaseOrder;

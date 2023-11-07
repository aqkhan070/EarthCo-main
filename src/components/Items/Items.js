import React, { useState } from "react";
import AddItem from "./AddItem";

const Items = () => {
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.8381 12.7317C16.4566 12.7317 16.9757 13.2422 16.8811 13.853C16.3263 17.4463 13.2502 20.1143 9.54009 20.1143C5.43536 20.1143 2.10834 16.7873 2.10834 12.6835C2.10834 9.30245 4.67693 6.15297 7.56878 5.44087C8.19018 5.28745 8.82702 5.72455 8.82702 6.36429C8.82702 10.6987 8.97272 11.8199 9.79579 12.4297C10.6189 13.0396 11.5867 12.7317 15.8381 12.7317Z"
                    stroke="#888888"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.8848 9.1223C19.934 6.33756 16.5134 1.84879 12.345 1.92599C12.0208 1.93178 11.7612 2.20195 11.7468 2.5252C11.6416 4.81493 11.7834 7.78204 11.8626 9.12713C11.8867 9.5459 12.2157 9.87493 12.6335 9.89906C14.0162 9.97818 17.0914 10.0862 19.3483 9.74467C19.6552 9.69835 19.88 9.43204 19.8848 9.1223Z"
                    stroke="#888888"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <li>
                <h5 className="bc-title">Items</h5>
              </li>
            </ol>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card dz-card" id="bootstrap-table2">
                  <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                    <h4 className="heading mb-0">Items</h4>
                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {setShowContent(false)}}
                        
                      >
                        + Add New
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
                              <strong>Name</strong>
                            </th>
                            <th>
                              <strong>SKU</strong>
                            </th>
                            <th>
                              <strong>Account#</strong>
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
                            <td>Manny</td>
                            <td>
                              <div className="align-items-center">
                                <span className="w-space-no">#OC47704</span>
                              </div>
                            </td>
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
        </>
      ) : (
        <AddItem setShowContent={setShowContent}/>
      )}
    </>
  );
};

export default Items;

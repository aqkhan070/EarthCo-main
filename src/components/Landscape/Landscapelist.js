import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import LandscapeTR from "./LandscapeTR";


const Landscapelist = () => {

  
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div class="col-xl-3  col-lg-6 col-sm-6">
            <div class="widget-stat card">
              <div class="card-body p-4">
                <div class="media ai-icon">
                  <span class="me-3 bgl-warning text-warning">
                    <svg
                      id="icon-orders"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-file-text"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </span>
                  <div class="media-body">
                    <p class="mb-1">Open</p>
                    <h4 class="mb-0">5131</h4>
                    <span class="badge badge-warning">30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3  col-lg-6 col-sm-6">
            <div class="widget-stat card">
              <div class="card-body p-4">
                <div class="media ai-icon">
                  <span class="me-3 bgl-success text-success">
                    <svg
                      id="icon-database-widget"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-database"
                    >
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </svg>
                  </span>
                  <div class="media-body">
                    <p class="mb-1">Total</p>
                    <h4 class="mb-0">777</h4>
                    <span class="badge badge-success">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="">
                  <div className="">
                    
                    {/* <div
                      class="col-md-6"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <div className="col-md-3">
                        <Form.Select
                          aria-label="Default select example"
                          size="md"
                        >
                          <option>All</option>
                          <option value="1">Current Month</option>
                          <option value="2">Previous Month</option>
                        </Form.Select>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="table-responsive">
                  <LandscapeTR></LandscapeTR>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landscapelist;

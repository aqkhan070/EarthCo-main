import React from "react";
import { Form } from "react-bootstrap";
import MapCo from "./MapCo";

const Map = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <div className="my-3">
              {/* <div className="search-adress">
                                <input type="text" className="form-control input-default " placeholder="Search something" />
                                <button type="button" className="btn btn-primary btn-icon-md">
                                    <span className="material-symbols-sharp">
                                        search
                                    </span>
                                </button>
                            </div> */}
              <div>
                <input
                  type="text"
                  className="form-control input-default "
                  placeholder="Search something"
                />
              </div>
              <div className="mt-2">
                <Form.Select className="bg-white">
                  <option value="Inspect and Advise">Select Type</option>
                  <option value="Inspect and Advise">Inspect and Advise</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Other">Other</option>
                  <option value="Proposal Needed">Proposal Needed</option>
                  <option value="Tree Care">Tree Care</option>
                </Form.Select>
              </div>
              <div className="card mt-2">
                <div className="card-body">
                  <ul className="nav nav-pills">
                    <li className=" nav-item">
                      <a
                        href="#navpills-1"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        aria-expanded="false"
                      >
                        All
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#navpills-2"
                        className="nav-link"
                        data-bs-toggle="tab"
                        aria-expanded="false"
                      >
                        Assigned
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#navpills-3"
                        className="nav-link"
                        data-bs-toggle="tab"
                        aria-expanded="true"
                      >
                        Un-Assigned
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div id="navpills-1" className="tab-pane active">
                      <div className="row serviceLocations pt-2">
                        <div className="col-md-12">
                          <div className="locationInfo">
                            <div className="col-md-3 flex-box">
                              <p>#646546</p>
                            </div>
                            <div className="col-md-9">
                              <div className="media-body">
                                <h6 className="mb-1">Customer 1</h6>
                                <p className="mb-1">
                                  C-II Block C 2 Phase 1 Johar Town, Lahore,
                                  Punjab 54770
                                </p>
                                <span className="badge badge-primary">
                                  Irrigation
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="locationInfo">
                            <div className="col-md-3 flex-box">
                              <p>#646546</p>
                            </div>
                            <div className="col-md-9">
                              <div className="media-body">
                                <h6 className="mb-1">Customer 2</h6>
                                <p className="mb-1">
                                  C-II Block C 2 Phase 1 Johar Town, Lahore,
                                  Punjab 54770
                                </p>
                                <span className="badge badge-primary">
                                  Irrigation
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="locationInfo">
                            <div className="col-md-3 flex-box">
                              <p>#646546</p>
                            </div>
                            <div className="col-md-9">
                              <div className="media-body">
                                <h6 className="mb-1">Customer 3</h6>
                                <p className="mb-1">
                                  C-II Block C 2 Phase 1 Johar Town, Lahore,
                                  Punjab 54770
                                </p>
                                <span className="badge badge-primary">
                                  Maintenance
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="navpills-2" className="tab-pane">
                      <div className="row serviceLocations pt-2">
                        <div className="col-md-12">
                          <div className="locationInfo">
                            <div className="col-md-3 flex-box">
                              <p>#646546</p>
                            </div>
                            <div className="col-md-9">
                              <div className="media-body">
                                <h6 className="mb-1">Customer 1</h6>
                                <p className="mb-1">
                                  C-II Block C 2 Phase 1 Johar Town, Lahore,
                                  Punjab 54770
                                </p>
                                <span className="badge badge-primary">
                                  Irrigation
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="locationInfo">
                            <div className="col-md-3 flex-box">
                              <p>#646546</p>
                            </div>
                            <div className="col-md-9">
                              <div className="media-body">
                                <h6 className="mb-1">Customer 2</h6>
                                <p className="mb-1">
                                  C-II Block C 2 Phase 1 Johar Town, Lahore,
                                  Punjab 54770
                                </p>
                                <span className="badge badge-primary">
                                  Irrigation
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="navpills-3" className="tab-pane">
                      <div className="row serviceLocations pt-2">
                        <div className="col-md-12">
                          <div className="locationInfo">
                            <div className="col-md-3 flex-box">
                              <p>#646546</p>
                            </div>
                            <div className="col-md-9">
                              <div className="media-body">
                                <h6 className="mb-1">Customer 3</h6>
                                <p className="mb-1">
                                  C-II Block C 2 Phase 1 Johar Town, Lahore,
                                  Punjab 54770
                                </p>
                                <span className="badge badge-primary">
                                  Maintenance
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 py-3">
            <MapCo/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;

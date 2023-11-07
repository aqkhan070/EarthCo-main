import React, { useContext, useEffect, useRef, useState } from "react";

export const AddPO = ({setShowContent}) => {
  return (
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
            <h5 className="bc-title">Purchase Order # 1001</h5>
          </li>
        </ol>
      </div>

      <div className="add-item">        

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="basic-form ">
                <form>
                  <div className="row">
                    <div className="mb-3 col-md-3">
                      <div className="col-md-12">
                        <label className="form-label">Vendor</label>
                        <select
                          id="inputState"
                          className="default-select form-control wide"
                        >
                          <option selected>Crest DeVille</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <div className="c-details">
                          <ul>
                            <li>
                              <span>Vendor Address</span>
                              <p>1225 E.Wakeham</p>
                              <p>Santa Ana, CA 92705</p>
                              <p>USA</p>
                            </li>
                            <li>
                              <span>Sipping </span>
                              <p>1225 E.Wakeham</p>
                              <p>Santa Ana, CA 92705</p>
                              <p>USA</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Purchase Order</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">#</div>{" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Leave blank to auto complete"
                            />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Tags</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Date</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">
                              <i className="fa fa-calendar "></i>
                            </div>
                            <input type="date" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Due</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">
                              <i className="fa fa-calendar "></i>
                            </div>
                            <input type="date" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Regional Manager</label>
                          <select
                            id="inputState"
                            className="default-select form-control wide"
                          >
                            <option selected>RM 1</option>
                            <option>RM 2</option>
                            <option>RM 3</option>
                          </select>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Terms</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Requested by</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Status</label>
                          <select className="default-select  form-control wide">
                            <option value="Open">Open</option>
                            <option value="Approved">Approved</option>
                            <option value="Closed Billed">Closed Billed</option>
                            <option value="Closed Not Approved">
                              Closed Not Approved
                            </option>
                          </select>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Invoice Number</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">#</div>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Ship to</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">
                              <i className="fa fa-map-pin "></i>
                            </div>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label className="form-label">Bill Number</label>
                          <div className="input-group mb-2">
                            <div className="input-group-text">#</div>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="modal fade" id="basicModal">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Item</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="basic-form">
                      <form>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">Name</label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Quantity
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Quantity"
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            Description
                          </label>
                          <div className="col-sm-9">
                            <textarea
                              className="form-txtarea form-control"
                              rows="3"
                              id="comment"
                            ></textarea>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">Rate</label>
                          <div className="col-sm-9">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Rate"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <label className="col-sm-3 col-form-label">
                            Item Total
                          </label>
                          <div className="col-sm-9">
                            <h5>$100.00</h5>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger btn-md light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary btn-md">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Items</h4>
                  </div>
                  <a
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                    style={{margin: '12px 20px'}}
                  >
                    + Add Items
                  </a>
                  <div className="table-responsive active-projects style-1">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th>Qty / Duration</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Approved</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Liam Antony</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-success light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Noah Oliver</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-danger light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Elijah James</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-success light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Liam Antony</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-success light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body p-0">
                <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Add lines</h4>
                  </div>
                  <a
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#basicModal"
                    style={{margin: '12px 20px'}}
                  >
                    + Add Items
                  </a>
                  <div className="table-responsive active-projects style-1">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th>Qty / Duration</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Approved</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span>1001</span>
                          </td>
                          <td>
                            <div className="products">
                              <div>
                                <h6>Liam Antony</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>Computer Science</span>
                          </td>
                          <td>
                            <span className="text-primary">20</span>
                          </td>
                          <td>
                            <span>20</span>
                          </td>

                          <td>
                            <span className="badge badge-success light border-0">
                              Active
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12">
                      <div className="basic-form">
                        <form>
                          <h4 className="card-title">Memo Internal</h4>
                          <div className="mb-3">
                            <textarea
                              className="form-txtarea form-control"
                              rows="2"
                              id="comment"
                            ></textarea>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="basic-form">
                        <form>
                          <h4 className="card-title">Message</h4>
                          <div className="mb-3">
                            <textarea
                              className="form-txtarea form-control"
                              rows="2"
                              id="comment"
                            ></textarea>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                      <div className="basic-form">
                        <form>
                          <h4 className="card-title">Attachments</h4>
                          <div className="dz-default dlab-message upload-img mb-3">
                            <form action="#" className="dropzone">
                              <svg
                                width="41"
                                height="40"
                                viewBox="0 0 41 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                                  stroke="#DADADA"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M20.5 20V35"
                                  stroke="#DADADA"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                                  stroke="#DADADA"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                                  stroke="#DADADA"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                              <div className="fallback">
                                <input name="file" type="file" multiple="" />
                              </div>
                            </form>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Subtotal</strong>
                        </td>
                        <td className="right">$8.497,00</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Discount (20%)</strong>
                        </td>
                        <td className="right">$1,699,40</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>VAT (10%)</strong>
                        </td>
                        <td className="right">$679,76</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total</strong>
                        </td>
                        <td className="right">
                          <strong>$7.477,36</strong>
                          <br />
                          <strong>0.15050000 BTC</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mb-2 row text-end">
              <div>
                <a
                  href="javascript:void(0);"
                  className="btn btn-primary light me-1 px-3"
                  data-bs-toggle="modal"
                >
                  <i className="fa fa-print m-0"></i>{" "}
                </a>
                <a
                  href="javascript:void(0);"
                  className="btn btn-primary light me-1 px-3"
                  data-bs-toggle="modal"
                >
                  <i className="fa fa-envelope m-0"></i>{" "}
                </a>
                <a href="#">
                  <button type="button" className="btn btn-primary me-1">
                    Save
                  </button>
                </a>
                <a href="">
                  {" "}
                  <button className="btn btn-danger light ms-1" onClick={setShowContent(true)}>Cancel</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

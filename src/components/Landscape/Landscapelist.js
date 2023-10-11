import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';

const Landscapelist = () => {

    useEffect(() => {
        $('#landscapeTbl').DataTable();
    })

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div class="col-xl-3  col-lg-6 col-sm-6">
                        <div class="widget-stat card">
                            <div class="card-body p-4">
                                <div class="media ai-icon">
                                    <span class="me-3 bgl-warning text-warning">
                                        <svg id="icon-orders" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text">
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
                                        <svg id="icon-database-widget" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database">
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
                                <div className="tbl-caption">
                                    <div className="row p-3 ">
                                        <div className="col-md-6">
                                            <NavLink to="/Dashboard/Landscape/Add-Landscape">   <a href='/' className="btn btn-primary btn-md"  >+ Add </a></NavLink>
                                        </div>
                                        <div class="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <div className="col-md-3">
                                                <Form.Select aria-label="Default select example" size="md">
                                                    <option>All</option>
                                                    <option value="1">Current Month</option>
                                                    <option value="2">Previous Month</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table id="landscapeTbl" className="display table" style={{ minWidth: '845px' }}>
                                        <thead>
                                            <tr className='serviceRequestRecords'>
                                                <th>
                                                    #
                                                </th>


                                                <th>Customer Name</th>
                                                <th>Type</th>
                                                <th>Assigned to</th>

                                                <th>Status</th>
                                                <th>Date Created</th>
                                                <th>Report</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    1
                                                </td>
                                                <td>Vincente, Allan</td>
                                                <td>
                                                    PL-1001
                                                </td>

                                                <td>Sunrise Lane</td>
                                                <td>Closed</td>
                                                <td>1/17/2014</td>

                                                <td>
                                                    <NavLink to='/Dashboard/Landscape/PunchList-Report'>
                                                        <span class="badge badge-primary light border-0 me-1">Open</span>
                                                    </NavLink>
                                                </td>
                                                <td>
                                                    <div className="flex-box">
                                                        <button title="Edit" type="button" className="btn btn-warning btn-sm mx-1" >
                                                            <i className="fa fa-pen"></i>
                                                        </button>

                                                        <button title="Delete" type="button" className="btn btn-danger btn-sm mx-1">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
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
    )
}

export default Landscapelist
import React, { useEffect, useState } from 'react'
import TitleBar from '../TitleBar';
import { NavLink } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import $ from 'jquery';
import 'datatables.net';
import punchList from '../../assets/images/1.jpg'

const PunchListIndex = () => {

    const icon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.634 13.4211C18.634 16.7009 16.7007 18.6342 13.4209 18.6342H6.28738C2.99929 18.6342 1.06238 16.7009 1.06238 13.4211V6.27109C1.06238 2.99584 2.26688 1.06259 5.54763 1.06259H7.38096C8.03913 1.06351 8.65879 1.37242 9.05296 1.89951L9.88988 3.01234C10.2859 3.53851 10.9055 3.84834 11.5637 3.84926H14.1579C17.446 3.84926 18.6596 5.52309 18.6596 8.86984L18.634 13.4211Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M5.85754 12.2577H13.8646" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const [returnElement, setReturnElement] = useState();
    const hideOptional = () => {
        const checkbox = document.getElementById('customCheckBox1');
        if (checkbox.checked) {
            setReturnElement(
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Photo (After)</label>
                    <div className="col-sm-9">
                        <input type="file" className="form-control" placeholder="" />
                    </div>
                </div>
            )
        }
        else {
            setReturnElement(false)
        }
    }

    useEffect(() => {
        $('#punchListTbl').DataTable();
    }, [])

    const toggleRow = () => {
        document.getElementById('subRow').classList.toggle('dispNone')
    }

    return (
        <>
            <TitleBar icon={icon} title='Punchlists' />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3  col-lg-6 col-sm-6">
                        <div className="widget-stat card">
                            <div className="card-body p-4">
                                <div className="media ai-icon">
                                    <span className="me-3 bgl-warning text-warning">
                                        <svg id="icon-orders" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file-text">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="16" y1="13" x2="8" y2="13"></line>
                                            <line x1="16" y1="17" x2="8" y2="17"></line>
                                            <polyline points="10 9 9 9 8 9"></polyline>
                                        </svg>
                                    </span>
                                    <div className="media-body">
                                        <p className="mb-1">Open</p>
                                        <h4 className="mb-0">5131</h4>
                                        <span className="badge badge-warning">30%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3  col-lg-6 col-sm-6">
                        <div className="widget-stat card">
                            <div className="card-body p-4">
                                <div className="media ai-icon">
                                    <span className="me-3 bgl-success text-success">
                                        <svg id="icon-database-widget" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-database">
                                            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                        </svg>
                                    </span>
                                    <div className="media-body">
                                        <p className="mb-1">Total</p>
                                        <h4 className="mb-0">77799</h4>
                                        <span className="badge badge-success">100%</span>
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
                                            <a href='/' className="btn btn-primary btn-md" data-bs-toggle="modal" data-bs-target="#editPunch">+ Add Punchlist</a>
                                        </div>
                                        <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <div className="col-md-4">
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
                                    <table id="punchListTbl" className="display table" style={{ minWidth: '845px' }}>
                                        <thead>
                                            <tr className='serviceRequestRecords'>
                                                <th>
                                                    #
                                                </th>


                                                <th>Customer Name</th>
                                                <th>Title</th>
                                                <th>Assigned to</th>
                                                <th>Date Created</th>
                                                <th>Status</th>
                                                <th>Report</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td onClick={toggleRow}>
                                                    1
                                                </td>
                                                <td>Vincente, Allan</td>
                                                <td>
                                                    PL-1001
                                                </td>

                                                <td>Sunrise Lane</td>

                                                <td>1/17/2014</td>
                                                <td>Closed</td>
                                                <td>
                                                    <NavLink to='/Dashboard/Irrigation/PunchlistPreview'>
                                                        <span className="badge badge-primary light border-0 me-1">Open</span>
                                                    </NavLink>
                                                </td>
                                                <td>
                                                    <div className="flex-box">
                                                        <button title="Add punchlist" type="button" className="btn btn-secondary btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#addPhotos">
                                                            <i className="fa fa-plus"></i>
                                                        </button>

                                                        <button title="Edit" type="button" className="btn btn-warning btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#editPunch">
                                                            <i className="fa fa-pen"></i>
                                                        </button>

                                                        <button title="Delete" type="button" className="btn btn-danger btn-sm mx-1">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr id='subRow'>
                                                <td colSpan={4}>
                                                    <div className="products">
                                                        <img src={punchList} className="avatar avatar-md" alt="lazy" />
                                                        <div>
                                                            <h6>Keep plants</h6>
                                                            <span>Pool</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='visNo'></td>
                                                <td className='visNo'></td>
                                                <td className='visNo'></td>
                                                <td className='visNo'></td>
                                                <td className='visNo'></td>
                                                <td className='visNo'></td>
                                                <td colSpan={3}>
                                                    <Form.Select className='bg-white'>
                                                        <option value="complete">Complete</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="Estimate">Estimate</option>
                                                        <option value="Service Request">Service Request</option>
                                                    </Form.Select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal */}
                <div className="modal fade" id="addPhotos">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Punchlist</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="basic-form">
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Photo</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="file" id="formFile" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Notes</label>
                                            <div className="col-sm-9">
                                                <textarea className="form-control" placeholder=""></textarea>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Adress</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" placeholder="" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-check custom-checkbox mx-3 mb-3" onClick={hideOptional}>
                                                {/* <div className="col-sm-3"> */}
                                                <input type="checkbox" className="form-check-input" id="customCheckBox1" />
                                                {/* </div> */}
                                                {/* <div className="col-sm-9"> */}
                                                <label className="form-check-label" htmlFor="customCheckBox1">After Photo</label>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        {/* <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">After Photo</label>
                                    </div> */}

                                        {returnElement}
                                        <div className="row">
                                            <div className="form-check custom-checkbox mx-3">
                                                {/* <div className="col-sm-3"> */}
                                                <input type="checkbox" className="form-check-input" id="customCheckBox2" />
                                                {/* </div> */}
                                                {/* <div className="col-sm-9"> */}
                                                <label className="form-check-label" htmlFor="customCheckBox2">Complete ?</label>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                                    {/* <NavLink to='/PunchlistPreview'> */}
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                    {/* </NavLink> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* modal2 */}
                <div className="modal fade modal-lg" id="editPunch">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Punchlist</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className=" col-md-6 mb-3">
                                            <label className="form-label">Title<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" placeholder="Title" required />
                                        </div>
                                        <div className=" col-md-6 mb-3">
                                            <label className="form-label">Customer Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" placeholder="Customer Name" required />
                                        </div>
                                        <div className=" col-md-6 mb-3">
                                            <label className="form-label">Contact Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" placeholder="Contact Name" required />
                                        </div>
                                        <div className=" col-md-6 mb-3">
                                            <label className="form-label">Contact Company<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="Company Company" />
                                        </div>
                                        <div className=" col-md-6 mb-3">
                                            <label className="form-label">Contact Email<span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" placeholder="Contact Email" required="" />
                                        </div>
                                        <div className=" col-md-6 mb-3">
                                            <label className="form-label">Date Created<span className="text-danger">*</span></label>
                                            <input type="date" className="form-control" placeholder="Phone" />
                                        </div>

                                        <div className=" col-md-6 mb-3">
                                            <label className="form-label">Assigned to<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="Assigned to" />

                                        </div>
                                        <div className=" col-md-6">
                                            <label className="form-label">Service Request</label>

                                            <Form.Select className='bg-white' size='lg'>
                                                <option value="Select Customer First">Select Service Request</option>
                                                <option value="Select Customer First">00010</option>
                                                <option value="Select Customer First">00020</option>
                                            </Form.Select>
                                        </div>

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger light" data-bs-dismiss="modal" data-bs-target="#editPunch">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPunch">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PunchListIndex
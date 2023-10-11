import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import { Form } from 'react-bootstrap';

const Irrigationlist = () => {

    useEffect(() => {
        $('#irrigationTbl').DataTable();
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive active-projects style-1">
                                <div className="tbl-caption">
                                    <h4 className="heading mb-0">Irrigation</h4>
                                    <div>
                                        <NavLink to='/Dashboard/Irrigation/Add-Irrigation'>
                                            <a href='/' className="btn btn-primary btn-sm" role="button">+ Add New</a>
                                        </NavLink>
                                    </div>
                                </div>
                                <table id="irrigationTbl" className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>Customer Name </th>
                                            <th>Created Date </th>
                                            <th>Controller Number </th>
                                            <th>Report</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                1
                                            </td>
                                            <td>
                                                <div className="products">
                                                    <div>
                                                        <h6>Promenade</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span>7/10/2023</span></td>
                                            <td>
                                                <Form.Select>
                                                    <option value="">Evolution DX1</option>
                                                    <option value="">Evolution DX2</option>
                                                    <option value="">Evolution DX3</option>
                                                    <option value="">Evolution DX4</option>
                                                </Form.Select>
                                            </td>
                                            <td><NavLink to='/Dashboard/Irrigation/Audit-Report'>
                                                <span class="badge badge-primary light border-0 me-1">Open</span>
                                            </NavLink></td>
                                            <td>
                                                <div className="flex-box">
                                                    <button title="Edit" type="button" className="btn btn-warning btn-sm mx-1">
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
    )
}

export default Irrigationlist

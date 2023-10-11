import React from 'react'
import TitleBar from '../TitleBar'
import { Link } from 'react-router-dom'

const StaffList = () => {

    const icon = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    return (
        <>
            <TitleBar icon={icon} title='Staff Management' />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive active-projects style-1">
                                    <div className="tbl-caption mb-3">
                                        <h4 className="heading mb-0">Staff</h4>
                                        <div>
                                            <Link to='/Dashboard/Staff/Add-Staff'>
                                                <button className="btn btn-primary btn-sm" role="button">+ Add Staff</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <table id="customerTbl" className="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    #
                                                </th>
                                                <th>First Name </th>
                                                <th>Last Name</th>
                                                <th>User Name</th>
                                                <th>Role </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>John</td>
                                                <td>Doe</td>
                                                <td>
                                                    <span className="text-primary">morrison@eartho.com</span>
                                                </td>
                                                <td>Regional Manager</td>
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



                {/* #modal */}

                {/* <div className="modal fade" id="deleteConfirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
            </div>
        </>
    )
}

export default StaffList
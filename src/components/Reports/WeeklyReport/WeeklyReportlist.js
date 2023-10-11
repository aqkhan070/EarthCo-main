import React, { useEffect } from 'react'
import StatusCards from '../../ServiceRequest/StatusCards'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import TitleBar from '../../TitleBar'
import { DataContext } from '../../../context/AppData'
import { Form } from 'react-bootstrap';
import $ from 'jquery';
import 'datatables.net';

const WeeklyReportlist = () => {
    const icon = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.5096 2.53165H7.41104C5.50437 2.52432 3.94146 4.04415 3.89654 5.9499V15.7701C3.85437 17.7071 5.38979 19.3121 7.32671 19.3552C7.35512 19.3552 7.38262 19.3561 7.41104 19.3552H14.7343C16.6538 19.2773 18.1663 17.6915 18.1525 15.7701V7.36798L13.5096 2.53165Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.2688 2.52084V5.18742C13.2688 6.48909 14.3211 7.54417 15.6228 7.54784H18.1482" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.0974 14.0786H8.1474" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.2229 10.6388H8.14655" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    const { wReportData } = useContext(DataContext);

    useEffect(() => {
        $('#weeklyTbl').DataTable();
    }, [])

    const renderReports = wReportData.map((item, index) => {
        return (
            <tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    {item.id}
                </td>
                <td>{item.assign}</td>
                <td>{item.customer}</td>
                <td>{item.status}</td>
                <td>{item.created}</td>
                <td>
                    <NavLink to='/Dashboard/Weekly-Reports/WeeklyReport'>
                        <span class="badge badge-primary light border-0 me-1">Open Report</span>
                    </NavLink>
                </td>
            </tr>
        )
    })
    return (
        <>
            <TitleBar icon={icon} title='Weekly Reports' />
            <div className="container-fluid">
                <div className="row">
                    <StatusCards newData={1178} open={5142} closed={71858} total={78178} />
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="tbl-caption">
                                    <div className="row p-3 ">
                                        <div className="col-md-6">
                                            <NavLink to='/Dashboard/Weekly-Reports/Add-Weekly-Report'>
                                                <a href='/' className="btn btn-primary btn-md">+ Add Weekly Report</a>
                                            </NavLink>
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
                                    <table id="weeklyTbl" className="display table" style={{ minWidth: '845px' }}>
                                        <thead>
                                            <tr className='serviceRequestRecords'>
                                                <th>
                                                    #
                                                </th>
                                                <th>ID</th>
                                                <th>Assign / Appointment</th>
                                                <th>Customer</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderReports}
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

export default WeeklyReportlist

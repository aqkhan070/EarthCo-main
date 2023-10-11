import React, { useContext, useEffect, useState } from 'react'
import CustomerTR from './CustomerTR';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import CustomerModal from '../Modals/CustomerModal';
import { CustomerContext } from '../../context/CustomerData';
import { DataContext } from '../../context/AppData';

const CustomersTable = () => {

    const { selectedCustomer } = useContext(CustomerContext);

    const { customers, setCustomers } = useContext(DataContext);

    const fetchCustomers = async () => {
        const response = await axios.get('http://localhost:8001/Customers');
        setCustomers(response.data);
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    let showIt = <td colSpan={6} className='text-center'>No Records Found</td>
    useEffect(() => {
        if (customers[0] !== undefined) {
            $('#customerTbl').DataTable();
        }
    }, [customers]);

    console.log(customers);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive active-projects style-1">
                                <div className="tbl-caption mb-3">
                                    <h4 className="heading mb-0">Customers</h4>
                                    <div>
                                        <Link to='/Dashboard/Customers/Add-Customer'>
                                            <button className="btn btn-primary btn-sm" role="button">+ Add Customer</button>
                                        </Link>
                                    </div>
                                </div>
                                <table id="customerTbl" className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>Customer Name </th>
                                            <th>Contact Name</th>
                                            <th>Contact Company </th>
                                            <th>Contact E-mail</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers && customers.map((customer, index) => {
                                            return <CustomerTR key={customer._id} index={index} customer={customer} contact={customer.contacts[0]} />
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* #modal */}

            <div className="modal fade bd-example-modal-lg" tabindex="-1" id='customerShow' role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header"><h5 className="modal-title">Customer</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body longModal">
                            {selectedCustomer ? <CustomerModal /> : 'Loading Please Wait...'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomersTable

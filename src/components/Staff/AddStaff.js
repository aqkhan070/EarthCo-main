import React, { useState } from 'react'
import AdressModal from '../Modals/AdressModal'
import TitleBar from '../TitleBar';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AddStaff = () => {

    const icon = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    const [showPop1, setShowPop1] = useState(true);
    const [adress1, setAdress1] = useState('')
    const [customerAdress, setCustomerAdress] = useState({})
    const [customerInfo, setCustomerInfo] = useState([]);

    const handleCustomerInfo = (event) => {
        const value = event.target.value;
        setCustomerInfo({
            ...customerInfo,
            [event.target.name]: value
        })
    }

    return (
        <>
            <TitleBar icon={icon} title='Add Staff' />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h4 className="modal-title" id="#gridSystemModal">Customer Info</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-6 mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">First Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name='firstName' id="exampleFormControlInput1" onChange={handleCustomerInfo} placeholder="First Name" required />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <label htmlFor="exampleFormControlInput4" className="form-label">Last Name<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" onChange={handleCustomerInfo} name='lastName' id="exampleFormControlInput4" placeholder="Last Name" required />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <label className="form-label">Email / User Name<span className="text-danger">*</span></label>
                                <input type='email' className="form-control" onChange={handleCustomerInfo} name='userName' id="exampleFormControlInput3" placeholder="Email / User Name Name" required />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <label className="form-label">Password<span className="text-danger">*</span></label>
                                <input type='password' className="form-control" onChange={handleCustomerInfo} name='password' id="exampleFormControlInput3" placeholder="Password" required />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <label className="form-label">Confirm Password<span className="text-danger">*</span></label>
                                <input type='password' className="form-control" onChange={handleCustomerInfo} name='confPassword' id="exampleFormControlInput3" placeholder="Confirm Password" required />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <label htmlFor="exampleFormControlInput4" className="form-label">Phone 1</label>
                                <input type='tel' className="form-control" onChange={handleCustomerInfo} name='phone1' id="exampleFormControlInput4" placeholder="Phone 1" required />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <label htmlFor="exampleFormControlInput4" className="form-label">Phone 2</label>
                                <input type='tel' className="form-control" onChange={handleCustomerInfo} name='phone2' id="exampleFormControlInput4" placeholder="Phone 2" required />
                            </div>
                            <div className="col-xl-6" style={{ position: 'relative' }}>
                                <label className="form-label">Adress<span className="text-danger">*</span></label>
                                <input type="text" value={adress1} onClick={() => { setShowPop1(!showPop1) }} style={{ cursor: 'pointer' }} className="form-control" id="exampleFormControlInput3" placeholder="Adress" readOnly required />
                                {showPop1 || <AdressModal topClass='staffAdress' adress={customerAdress} setAdress={setCustomerAdress} boolState={setShowPop1} handleAdress={setAdress1} />}
                            </div>
                            <div className="col-xl-6 mb-3">
                                <label htmlFor="exampleFormControlInput4" className="form-label">Time Zone</label>
                                <input type='text' className="form-control" onChange={handleCustomerInfo} name='timeZone' id="exampleFormControlInput4" placeholder="Time Zone" required />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <label htmlFor="exampleFormControlInput4" className="form-label">User Role</label>
                                <Form.Select size='lg' className='bg-white'>
                                    <option value="">Select Role ...</option>
                                    <option value="">Admin</option>
                                    <option value="">Manager</option>
                                    <option value="">Staff</option>
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <NavLink to="/Dashboard/Staff">
                        <button className="btn btn-primary me-1">Submit</button>
                    </NavLink>
                    <NavLink className="active" to="/Dashboard/Staff">
                        <button className="btn btn-danger light ms-1">Cancel</button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default AddStaff
import React, { useEffect, useState } from 'react'
import AdressModal from '../Modals/AdressModal';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCutomer = () => {

    const navigate = useNavigate();

    const [customerAdress, setCustomerAdress] = useState({})
    // const [SLadress, setSLadress] = useState({})

    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState({})

    const [serviceLocations, setServiceLocations] = useState([]);
    const [customerInfo, setCustomerInfo] = useState([]);
    const [SRlocation, setSRlocation] = useState([]);
    const [serviceLocArr, setServiceLocArr] = useState([]);

    const [adress1, setAdress1] = useState('')
    const [adress2, setAdress2] = useState('')

    const [showPop1, setShowPop1] = useState(true);
    const [showPop2, setShowPop2] = useState(true);

    const [SLadress, setSLadress] = useState({});
    const [loginState, setLoginState] = useState('dontallow');
    const [showLogin, setShowLogin] = useState(false);
    const [loginData, setLoginData] = useState({});

    const handleCustomerInfo = (event) => {
        const value = event.target.value;
        setCustomerInfo({
            ...customerInfo,
            [event.target.name]: value
        })
    }

    // contacts

    const handleContacts = (event) => {
        const value = event.target.value;
        setContact({
            ...contact,
            [event.target.name]: value
        })
    }

    const addContact = (e) => {
        e.preventDefault();
        setContacts([
            ...contacts,
            { ...contact, id: Math.round(Math.random() * 9999) }
        ])

        for (let n = 1; n <= 4; n++) {
            document.getElementById(`contactInp${n}`).value = '';
        }
    }

    // service Locations

    const handleServiceLocation = (event) => {
        const value = event.target.value;
        setSRlocation({
            ...SRlocation,
            adress: adress2,
            [event.target.name]: value,
        })
    }

    const addServiceLocation = (e) => {
        e.preventDefault();
        setServiceLocations([
            ...serviceLocations,
            { ...SRlocation, id: Math.round(Math.random() * 9999) }
        ]);
        setServiceLocArr([
            ...serviceLocArr,
            { ...SRlocation, adress: SLadress }
        ])
        for (let n = 1; n <= 4; n++) {
            document.getElementById(`SRinput${n}`).value = '';
        }
        setAdress2('');
        setSLadress({});
    }


    const postCustomer = async () => {
        const response = await axios.post('http://localhost:8001/AddCustomer', {
            ...customerInfo,
            userLogin: loginData,
            contacts,
            customerAdress,
            serviceLocation: serviceLocArr
        })
        if (response.status === 200) {
            navigate('/Dashboard/Customers')
        }
    }

    const addUser = async () => {
        await axios.post('http://localhost:8001/AddUser', {
            fullName: customerInfo.customerName,
            userName: loginData.email,
            ...loginData
        })
    }

    const handleSubmit = () => {
        if (contacts[0] !== undefined && serviceLocArr[0] !== undefined) {
            postCustomer();
        }
        if (loginData.email !== undefined) {
            addUser();
        }
    }

    const deleteContact = (id) => {
        const updatedArr = contacts.filter((item) => {
            return item.id !== id;
        })
        setContacts(
            updatedArr
        )
    }

    const deleteLocation = (id) => {
        const updatedArr = serviceLocations.filter((item) => {
            return item.id !== id;
        })
        setServiceLocations(updatedArr)
    }

    const changeLogin = (event) => {
        setLoginState(event.target.value);
    }

    useEffect(() => {
        if (loginState === 'allow') {
            setShowLogin(true)
        }
        else {
            setShowLogin(false)
        }
    }, [loginState])

    const handleLoginData = (event) => {
        const value = event.target.value;
        setLoginData({
            ...loginData,
            [event.target.name]: value
        })
    }


    return (
        <div className="container-fluid">
            {/* <form onSubmit={(e) => e.preventDefault()}> */}
            <div className="card">
                <div className="card-header">
                    <h4 className="modal-title" id="#gridSystemModal">Customer Info</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-6 mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Customer Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name='customerName' id="exampleFormControlInput1" onChange={handleCustomerInfo} placeholder="Customer Name" required />
                        </div>
                        <div className="col-xl-6 mb-3">
                            <label htmlFor="exampleFormControlInput4" className="form-label">Title<span className="text-danger">*</span></label>
                            <input type="text" className="form-control" onChange={handleCustomerInfo} name='title' id="exampleFormControlInput4" placeholder="Title" required />
                        </div>
                        <div className="col-xl-6 mb-3">
                            <label className="form-label">Company Name<span className="text-danger">*</span></label>
                            <input type="text" className="form-control" onChange={handleCustomerInfo} name='companyName' id="exampleFormControlInput3" placeholder="Company Name" required />
                        </div>
                        <div className="col-xl-6" style={{ position: 'relative' }}>
                            <label className="form-label">Adress<span className="text-danger">*</span></label>
                            <input type="text" value={adress1} onClick={() => { setShowPop1(!showPop1) }} style={{ cursor: 'pointer' }} className="form-control" id="exampleFormControlInput3" placeholder="Adress" readOnly required />
                            {showPop1 || <AdressModal adress={customerAdress} setAdress={setCustomerAdress} boolState={setShowPop1} handleAdress={setAdress1} />}
                        </div>
                        <div className="col-xl-6 ">
                            <label className="form-label">Description<span className="text-danger">*</span></label>
                            <textarea className="form-txtarea form-control" name='description' onChange={handleCustomerInfo} rows="4" id="comment"></textarea>
                        </div>
                        <div className='col-xl-6'>
                            <div className="row">
                                <label className=" col-form-label col-form-label-lg">Allow User Login</label>
                                <div className="mb-3 mb-0">
                                    <form>
                                        <div className="form-check custom-checkbox form-check-inline">
                                            <input type="radio" className="form-check-input" onChange={changeLogin} value='dontallow' id="customRadioBox7" name="login" checked={loginState === 'dontallow'} />
                                            <label className="form-check-label" for="customRadioBox7">Don't Allow</label>
                                        </div>
                                        <div className="form-check custom-checkbox form-check-inline">
                                            <input type="radio" className="form-check-input" value='allow' onChange={changeLogin} id="customRadioBox8" name="login" checked={loginState === 'allow'} />
                                            <label className="form-check-label" for="customRadioBox8">Allow</label>
                                        </div>
                                    </form>
                                </div>
                                {showLogin && <>
                                    <div class="mb-3 row">
                                        <label class="col-sm-3 text-right col-form-label">Email</label>
                                        <div class="col-sm-9">
                                            <input type="email" onChange={handleLoginData} name='email' class="form-control form-control-sm" placeholder="Email" required />
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label class="col-sm-3 text-right col-form-label">Password</label>
                                        <div class="col-sm-9">
                                            <input type='password' onChange={handleLoginData} name='password' class="form-control form-control-sm" placeholder="Password" required />
                                        </div>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={addContact}>
                <div className="card">
                    <div className="card-header">
                        <h4 className="modal-title" id="#gridSystemModal">Contact</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-xl-4 mb-3">
                                        <label className="form-label">Contact Name<span className="text-danger">*</span></label>
                                        <input type="text" id='contactInp1' onChange={handleContacts} name='contactName' className="form-control" placeholder="Contact Name" required />
                                    </div>
                                    <div className="col-xl-4 mb-3">
                                        <label className="form-label">Email<span className="text-danger">*</span></label>
                                        <input type="email" id='contactInp2' className="form-control" onChange={handleContacts} name='email' placeholder="Email" required />
                                    </div>
                                    <div className="col-xl-4 mb-3">
                                        <label className="form-label">Phone<span className="text-danger">*</span></label>
                                        <input type="number" id='contactInp3' onChange={handleContacts} name='phone' className="form-control" placeholder="Phone" />
                                    </div>
                                    <div className="col-xl-4 mb-3">
                                        <label className="form-label">Mobile<span className="text-danger">*</span></label>
                                        <input type="number" id='contactInp4' onChange={handleContacts} name='mobile' className="form-control" placeholder="Mobile" required />
                                    </div>
                                    <div className="col-xl-4 mb-3" style={{ display: 'flex', alignItems: 'center', paddingTop: '26px' }}>
                                        <button className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="estDataBox">
                                        <div className="itemtitleBar">
                                            <h4>Contacts</h4>
                                        </div>
                                        <div className="table-responsive active-projects style-1">
                                            <table id="empoloyees-tblwrapper" className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Contact Name</th>
                                                        <th>E-mail</th>
                                                        <th>Phone</th>
                                                        <th>Mobile</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {contacts.map((contact, index) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{contact.contactName}</td>
                                                                    <td>{contact.email}</td>
                                                                    <td>{contact.phone}</td>
                                                                    <td>{contact.mobile}</td>
                                                                    <td>
                                                                        <div className='badgeBox'>
                                                                            <span className="actionBadge badge-danger light border-0" onClick={() => deleteContact(contact.id)}>
                                                                                <span className="material-symbols-outlined">
                                                                                    delete
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <form onSubmit={addServiceLocation}>
                <div className="card">
                    <div className="card-header">
                        <h4 className="modal-title" id="#gridSystemModal">Service Locations</h4>
                    </div>
                    <div className="card-body" id=''>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-xl-4 mb-3">
                                        <label className="form-label">Name<span className="text-danger">*</span></label>
                                        <input type="text" id='SRinput1' name='name' className="form-control" onChange={handleServiceLocation} placeholder="Name" required />
                                    </div>
                                    <div className="col-xl-4 mb-3" style={{ position: 'relative' }}>
                                        <label className="form-label">Adress<span className="text-danger">*</span></label>
                                        <input type="text" id='SRinput2' onClick={() => { setShowPop2(!showPop2) }} style={{ cursor: 'pointer' }} name='adress' className="form-control" value={adress2} placeholder="Adress" readOnly />
                                        {showPop2 || <AdressModal boolState={setShowPop2} handleAdress={setAdress2} adress={SLadress} setAdress={setSLadress} />}

                                    </div>
                                    <div className="col-xl-4 mb-3">
                                        <label className="form-label">Phone<span className="text-danger">*</span></label>
                                        <input type="text" id='SRinput3' name='phone' className="form-control" onChange={handleServiceLocation} placeholder="Phone" />
                                    </div>
                                    <div className="col-xl-4 mb-3">
                                        <label className="form-label">Customer Fax<span className="text-danger">*</span></label>
                                        <input type="text" id='SRinput4' name='fax' className="form-control" onChange={handleServiceLocation} placeholder="Fax" required />
                                    </div>
                                    <div className="col-xl-4 mb-3" style={{ display: 'flex', alignItems: 'center', paddingTop: '26px' }}>
                                        <button className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="estDataBox">
                                        <div className="itemtitleBar">
                                            <h4>Service Locations</h4>
                                        </div>
                                        <div className="table-responsive active-projects style-1">
                                            <table id="empoloyees-tblwrapper" className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Address</th>
                                                        <th>Phone</th>
                                                        <th>Customer Fax</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {serviceLocations.map((contact, index) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{contact.name}</td>
                                                                    <td>{contact.adress}</td>
                                                                    <td>{contact.phone}</td>
                                                                    <td>{contact.fax}</td>
                                                                    <td>
                                                                        <div className='badgeBox'>
                                                                            <span className="actionBadge badge-danger light border-0" onClick={() => deleteLocation(contact.id)}>
                                                                                <span className="material-symbols-outlined">
                                                                                    delete
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* <div className="card">
                <div className="card-header">
                    <h4 className="modal-title" id="#gridSystemModal">User Login</h4>
                </div>
                <div className="card-body" id=''>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="mb-3 mb-0">
                                    <label className="col-sm-2 col-form-label col-form-label-lg">Allow User Login</label>
                                    <div className="form-check custom-checkbox form-check-inline">
                                        <input type="radio" className="form-check-input" onChange={changeLogin} value='dontallow' id="customRadioBox7" name="login" checked />
                                        <label className="form-check-label" for="customRadioBox7">Don't Allow</label>
                                    </div>
                                    <div className="form-check custom-checkbox form-check-inline">
                                        <input type="radio" className="form-check-input" value='allow' onChange={changeLogin} id="customRadioBox8" name="login" />
                                        <label className="form-check-label" for="customRadioBox8">Allow</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='text-end'>
                <button className="btn btn-primary me-1" onClick={handleSubmit}>Submit</button>
                <NavLink to='/Dashboard/Customers'>
                    <button className="btn btn-danger light ms-1">Cancel</button>
                </NavLink>
            </div>
            {/* </form> */}
        </div >
    )
}

export default AddCutomer

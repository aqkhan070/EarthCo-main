import React, { useContext, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { DataContext } from '../../context/AppData';
import TitleBar from '../TitleBar';
import { NavLink } from 'react-router-dom';
// import { Autocomplete, TextField } from '@mui/material';

const AddSRform = () => {

    const { estimateItems } = useContext(DataContext);

    const inputFile = useRef(null);

    const [itemObj, setItemObj] = useState(estimateItems)
    const [itemName, setItemName] = useState();
    const [itemQty, setItemQty] = useState();
    const [itemDesc, setItemDesc] = useState();
    const [rate, setRate] = useState();
    const [files, setFiles] = useState([]);

    const addItem = () => {
        const updatedArr = [
            ...itemObj, {
                id: `item${Math.round(Math.random() * 999)}`,
                name: itemName,
                qty: itemQty,
                description: itemDesc,
                rate: rate,
            }
        ]
        setItemObj(updatedArr)
        setItemName('');
        setItemQty('');
        setItemDesc('');
        setRate('')
    }

    const renderItems = itemObj.map((item) => {
        return (
            <tr>
                <td><span>{item.qty}</span></td>
                <td>
                    <div className="products">
                        <div>
                            <h6>{item.name}</h6>
                        </div>
                    </div>
                </td>
                <td><span>{item.description}</span></td>
                <td><span className="text-primary">${item.rate}</span></td>
                <td>
                    <span>${item.rate}</span>
                </td>
                <td>
                    <input type='checkbox' checked />
                </td>
            </tr>
        )
    })

    const icon = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.64111 13.5497L9.38482 9.9837L12.5145 12.4421L15.1995 8.97684" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="18.3291" cy="3.85021" rx="1.76201" ry="1.76201" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.6808 2.86012H7.01867C4.25818 2.86012 2.54651 4.81512 2.54651 7.57561V14.9845C2.54651 17.7449 4.22462 19.6915 7.01867 19.6915H14.9058C17.6663 19.6915 19.3779 17.7449 19.3779 14.9845V8.53213" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    // fileAdd
    const addFile = () => {
        inputFile.current.click();
    }

    const trackFile = (event) => {
        const file = event.target.files[0];
        setFiles([
            ...files,
            file
        ])
    }

    const deleteFile = (id) => {
        const updatedArr = files.filter((file) => {
            return file.name !== id;
        });
        setFiles(updatedArr);
    }

    return (
        <>
            <TitleBar icon={icon} title=' Add Service Request' />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-lg-12 col-md-12 mb-2">
                                {/* <Form.Select aria-label="Default select example" className='bg-white' size="md">
                                    <option value='Draft'>Draft</option>
                                    <option value='Sent'>Sent</option>
                                    <option value='Approved'>Approved</option>
                                    <option value='Rejected'>Rejected</option>
                                </Form.Select> */}
                                <NavLink to="/Dashboard/Estimates"> <button type="button" className="col-md-2 btn btn-sm btn-primary"> + Add Estimate  </button></NavLink>
                                <button type="button" className="btn btn-sm btn-secondary mx-2">+ Add Invoice</button>
                                <button type="button" className="btn btn-sm btn-outline-primary">Email</button>
                                <button type="button" className="btn btn-sm btn-outline-primary mx-2">Print</button>
                                <button type="button" className="btn btn-sm btn-outline-primary">Download</button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="itemtitleBar">
                                    <h4>Service Request Details</h4>
                                </div>
                                <div className="basic-form">
                                    <div className="row">
                                        <div className="mb-3 col-md-4">
                                            <label className="form-label">Customer</label>
                                            <input type="text" className="form-control" placeholder="Service Location" />
                                        </div>
                                        <div className="mb-3 col-md-4">
                                            <label className="form-label">Service Location</label>
                                            <input type="text" className="form-control" placeholder="Service Location" />
                                        </div>
                                        <div className="mb-3 col-md-4">
                                            <label>Contact</label>
                                            <input type="text" className="form-control" placeholder="aspyn@marandassociates.com" />
                                        </div>
                                    </div>
                                    <div className="row  mt-2 mb-2">

                                        <div className="col-md-4">
                                            <label className="form-label">Job Name:</label>
                                            <input type="text" className="form-control" placeholder="Job Name" />
                                        </div>
                                        <div className=" col-md-4">
                                            <label className="form-label">Due Date:</label>

                                            <input type="date" className="form-control" placeholder="Due Date" />

                                        </div>
                                        <div className=" col-md-4">
                                            <label className="form-label">Type:</label>
                                            <Form.Select size='lg' className='bg-white'>
                                                <option value="Inspect and Advise">Inspect and Advise</option>
                                                <option value="Irrigation">Irrigation</option>
                                                <option value="Maintenance">Maintenance</option>
                                                <option value="Other">Other</option>
                                                <option value="Proposal Needed">Proposal Needed</option>
                                                <option value="Tree Care">Tree Care</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-lg-2 col-md-2 mt-2">
                                            <label className="form-label">Status:</label>
                                            <Form.Select size='lg' className='bg-white'>
                                                <option value="Open">Open</option>
                                                <option value="Closed">Closed</option>
                                            </Form.Select>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* modal */}
                        <div className="modal fade" id="basicModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Item</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="basic-form">
                                            <form>
                                                <div className="mb-3 row">
                                                    <label className="col-sm-3 col-form-label">Name</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="form-control" placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-sm-3 col-form-label">Quantity</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" value={itemQty} onChange={(e) => setItemQty(e.target.value)} className="form-control" placeholder="Quantity" />
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-sm-3 col-form-label">Description</label>
                                                    <div className="col-sm-9">
                                                        <textarea className="form-txtarea form-control" value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} rows="3" id="comment"></textarea>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-sm-3 col-form-label">Rate</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="form-control" placeholder="Rate" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label">Item Total</label>
                                                    <div className="col-sm-9" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <h5 style={{ margin: '0' }}>$100.00</h5>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={addItem} data-bs-dismiss="modal">Save</button>
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
                                    <NavLink className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#basicModal" style={{ margin: '12px 20px' }}>+ Add Items</NavLink>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {renderItems}
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
                                        <h4>Files</h4>
                                    </div>
                                    <button className="btn btn-primary btn-sm" style={{ margin: '12px 20px' }} onClick={addFile}>+ Add</button>
                                    <input type='file' ref={inputFile} onChange={trackFile} style={{ display: 'none' }} />
                                    <div className="table-responsive active-projects style-1">
                                        <table id="empoloyees-tblwrapper" className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>File Name</th>
                                                    <th>Last Modified Date</th>
                                                    <th>Type</th>
                                                    <th>Size</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {files && files.map((file, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><h5>{file.name}</h5></td>
                                                            <td><span>{file.lastModifiedDate.toLocaleDateString()}</span></td>
                                                            <td>
                                                                <div className="products">
                                                                    <div>
                                                                        {file.type}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><span className="text-primary">{(file.size / 1024).toFixed(2)} kb</span></td>
                                                            <td>
                                                                <div className='badgeBox' onClick={() => deleteFile(file.name)}>
                                                                    <span className="actionBadge badge-danger light border-0">
                                                                        <span className="material-symbols-outlined">
                                                                            delete
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
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
                                        <h4>Sites</h4>
                                    </div>
                                    <NavLink className="btn btn-primary btn-sm" style={{ margin: '12px 20px' }}>+ Add</NavLink>
                                    <div className="table-responsive active-projects style-1">
                                        <table id="empoloyees-tblwrapper" className="table">
                                            <thead>
                                                <tr>
                                                    <th>Barcode ID</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><span>1001</span></td>
                                                    <td>
                                                        <div className="products">
                                                            <div>
                                                                <h6>Liam Antony</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span>Computer Science</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>1001</span></td>
                                                    <td>
                                                        <div className="products">
                                                            <div>
                                                                <h6>Noah Oliver</h6>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span>Computer Science</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>1001</span></td>
                                                    <td>
                                                        <div className="products">
                                                            <div>
                                                                <h6>Elijah James</h6>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span>Computer Science</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>1001</span></td>
                                                    <td>
                                                        <div className="products">
                                                            <div>
                                                                <h6>Liam Antony</h6>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span>Computer Science</span></td>
                                                </tr>


                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AddSRform

import React, { useContext, useRef, useState } from 'react'
import StatusActions from '../StatusActions'
import { Form } from 'react-bootstrap'
import { DataContext } from '../../context/AppData';
import { NavLink } from 'react-router-dom';

const AddEstimateForm = () => {

    const { estimateItems } = useContext(DataContext);

    const inputFile = useRef(null);

    const [itemObj, setItemObj] = useState(estimateItems);
    const [date, setDate] = useState('2023-09-10')
    const [itemName, setItemName] = useState();
    const [itemQty, setItemQty] = useState();
    const [itemDesc, setItemDesc] = useState();
    const [rate, setRate] = useState();
    const [files, setFiles] = useState([]);

    const addItem = (event) => {
        event.preventDefault();
        const updatedArr = [
            ...itemObj, {
                id: `item${Math.round(Math.random() * 999)}`,
                name: itemName,
                qty: itemQty,
                description: itemDesc,
                rate: rate,
            }
        ]
        setItemObj(updatedArr);
        setItemName('');
        setItemQty('');
        setItemDesc('');
        setRate('');
        document.getElementById('closer').click();
    }

    const deleteItem = (id) => {
        const updatedArr = itemObj.filter((object) => {
            return object.id !== id;
        })
        setItemObj(updatedArr)
    }

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

    const renderItems = itemObj.map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td className='text-center'><span>{item.qty}</span></td>
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
                <td className='text-center'>
                    <input type='checkbox' checked readOnly />
                </td>
                <td>
                    <div className='badgeBox' onClick={() => deleteItem(item.id)}>
                        <span className="actionBadge badge-danger light border-0">
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </span>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div class="card">
            <div className="card-body" >
                <div className="row">
                    <div className="basic-form col-md-6">
                        <div className="row">
                            <div className="col-md-8 mb-3">
                                <div className="row statusRow">
                                    <StatusActions />
                                </div>
                            </div>
                        </div>
                        <form>
                            <div className="row">
                                <div className="mb-3 col-md-9">
                                    <Form.Select aria-label="Default select example" id="inputState" className='bg-white'>
                                        <option selected>Customer</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </Form.Select>
                                </div>
                                <div className="mb-3 col-md-9">
                                    <Form.Select aria-label="Default select example" id="inputState" className='bg-white'>
                                        <option value="Customer">Service Location</option>
                                    </Form.Select>
                                </div>
                                <div className="mb-3 col-md-9">
                                    <Form.Select aria-label="Default select example" id="inputState" className='bg-white'>
                                        <option value="Service Location">Contact</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="basic-form col-md-6">
                        <form>
                            <div className="row" style={{ display: 'flex', justifyContent: 'end' }}>
                                <div className="mb-3 col-md-9">
                                    <label className="form-label">Estimate No.</label>
                                    <input type="text" className="form-control" placeholder="Estimate No." />
                                </div>
                                <div className="mb-3 col-md-9">
                                    <label className="form-label">Issued Date</label>
                                    <input className="form-control input-limit-datepicker" placeholder='Issued Date' onChange={(e) => setDate(e.target.value)} type="date" name="daterange" value={date} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* modal */}
                {/* <div className="modal fade" id="basicModal">
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
                                                <input type="text" className="form-control" placeholder="Name" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Quantity</label>
                                            <div className="col-sm-9">
                                                <input type="number" className="form-control" placeholder="Quantity" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Description</label>
                                            <div className="col-sm-9">
                                                <textarea className="form-txtarea form-control" rows="3" id="comment"></textarea>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Rate</label>
                                            <div className="col-sm-9">
                                                <input type="number" className="form-control" placeholder="Rate" />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Tax</label>
                                            <div className="col-sm-9">
                                                <Form.Select aria-label="Default select example" id="inputState" className='bg-white'>
                                                    <option>Non (Non - Taxable Sales)</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </Form.Select>
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
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="modal fade" id="basicModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={addItem}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Item</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="basic-form">
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Name</label>
                                            <div className="col-sm-9">
                                                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="form-control" placeholder="Name" required />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Quantity</label>
                                            <div className="col-sm-9">
                                                <input type="number" value={itemQty} onChange={(e) => setItemQty(e.target.value)} className="form-control" placeholder="Quantity" required />
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
                                                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="form-control" placeholder="Rate" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-sm-3 col-form-label">Item Total</label>
                                            <div className="col-sm-9" style={{ display: 'flex', alignItems: 'center' }}>
                                                <h5 style={{ margin: '0' }}>$100.00</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" id='closer' className="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body p-0">
                        <div className="estDataBox">
                            <div className="itemtitleBar">
                                <h4>Items</h4>
                            </div>
                            <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#basicModal" style={{ margin: '12px 20px' }}>+ Add Items</button>
                            <div className="table-responsive active-projects style-1">
                                <table id="empoloyees-tblwrapper" className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Qty / Duration</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Rate</th>
                                            <th>Amount</th>
                                            <th>Approved</th>
                                            <th>Action</th>
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

                <div className="estNotesBox">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="basic-form">
                                        <form>
                                            <h4 className="card-title">Estimate Notes</h4>
                                            <div className="mb-3">
                                                <textarea className="form-txtarea form-control" rows="2" id="comment"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12">
                                    <div className="basic-form">
                                        <form>
                                            <h4 className="card-title">Service Location Notes</h4>
                                            <div className="mb-3">
                                                <textarea className="form-txtarea form-control" rows="2" id="comment"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12">
                                    <div className="basic-form">
                                        <form>
                                            <h4 className="card-title">Private Notes</h4>
                                            <div className="mb-3">
                                                <textarea className="form-txtarea form-control" rows="2" id="comment"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="card" style={{ marginTop: '15px' }}>
                                <div className="card-body">
                                    <div className="sutotalBox">
                                        <div className="basic-form">
                                            <form>
                                                <Form.Select aria-label="Default select example" id="inputState" className='bg-white'>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </Form.Select>
                                                {/* <select className="default-select  form-control wide" >
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select> */}
                                            </form>
                                        </div>
                                        <div className="dataBox">
                                            <div className="dataRow">
                                                <h5>Subtotal:</h5>
                                                <p>10.00$</p>
                                            </div>
                                            <div className="dataRow">
                                                <h5>Tax:</h5>
                                                <p>0.00$</p>
                                            </div>
                                            <div className="dataRow">
                                                <h5>Total:</h5>
                                                <p>10.00$</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-2 row text-end">
                    <div className='flex-right'>
                        <button type='button' class="btn btn-primary me-1">Submit</button>
                        <NavLink to='/Dashboard/Estimates'>
                            <button class="btn btn-danger light ms-1">Cancel</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEstimateForm

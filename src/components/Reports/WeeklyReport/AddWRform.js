import React, { useContext, useState } from 'react'
import TitleBar from '../../TitleBar'
import { DataContext } from '../../../context/AppData'
import { NavLink } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const AddWRform = () => {
    const icon = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.5096 2.53165H7.41104C5.50437 2.52432 3.94146 4.04415 3.89654 5.9499V15.7701C3.85437 17.7071 5.38979 19.3121 7.32671 19.3552C7.35512 19.3552 7.38262 19.3561 7.41104 19.3552H14.7343C16.6538 19.2773 18.1663 17.6915 18.1525 15.7701V7.36798L13.5096 2.53165Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.2688 2.52084V5.18742C13.2688 6.48909 14.3211 7.54417 15.6228 7.54784H18.1482" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.0974 14.0786H8.1474" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.2229 10.6388H8.14655" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    const { estimateItems } = useContext(DataContext);

    const [itemObj, setItemObj] = useState(estimateItems)
    const [itemName, setItemName] = useState();
    const [itemQty, setItemQty] = useState();
    const [itemDesc, setItemDesc] = useState();
    const [rate, setRate] = useState();

    const addItem = () => {
        const updatedArr = [
            ...itemObj, {
                id: `item${Math.round(Math.random() * 999)}`,
                name: itemName,
                qty: itemQty,
                description: itemDesc,
                rate: rate,
                tax: 'Non',
            }
        ]
        setItemObj(updatedArr)
        setItemName('');
        setItemQty('');
        setItemDesc('');
        setRate('')
    }

    // const renderItems = itemObj.map((item) => {
    //     return (
    //         <tr>
    //             <td><span>{item.qty}</span></td>
    //             <td>
    //                 <div className="products">
    //                     <div>
    //                         <h6>{item.name}</h6>
    //                     </div>
    //                 </div>
    //             </td>
    //             <td><span>{item.description}</span></td>
    //             <td><span className="text-primary">${item.rate}</span></td>
    //             <td>
    //                 <span>${item.rate}</span>
    //             </td>
    //             <td>
    //                 <span>{item.tax}</span>
    //             </td>
    //             <td>
    //                 <input type='checkbox' checked />
    //             </td>
    //         </tr>
    //     )
    // })
    return (
        <>
            <TitleBar icon={icon} title='Add Weekly Report' />
            <div className="card-body">
                <div className="basic-form">
                    <form>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Customer</label>
                                <Form.Select aria-label="Default select example" className='bg-white' size="md">
                                    <option>Select Custmer...</option>
                                    <option>Hillandale Ave</option>
                                    <option>Crest DeVille</option>
                                </Form.Select>
                                {/* <select class="me-sm-2 default-select form-control wide" id="inlineFormCustomSelect">
                                        <option>Select Custmer...</option>
                                        <option>Hillandale Ave</option>
                                        <option>Crest DeVille</option>
                                    </select> */}
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Service Location</label>
                                <Form.Select aria-label="Default select example" className='bg-white' size="md">
                                    <option>Select Service Location...</option>
                                    <option>Keystone Pacific</option>
                                    <option>Brian Jacobs</option>
                                </Form.Select>
                                {/* <select class="me-sm-2 default-select form-control wide" id="inlineFormCustomSelect">
                                        <option>Select Service Location...</option>
                                        <option>Keystone Pacific</option>
                                        <option>Brian Jacobs</option>
                                    </select> */}
                            </div>
                            <div className="mb-3 col-md-4">
                                <label>Contact</label>
                                <Form.Select aria-label="Default select example" className='bg-white' size="md">
                                    <option>Select Contact...</option>
                                    <option>mark334@gmail.com</option>
                                    <option>Jchavis@keystonepacific.com</option>
                                </Form.Select>
                                {/* <select class="me-sm-2 default-select form-control wide" id="inlineFormCustomSelect">
                                        <option>Select Contact...</option>
                                        <option>mark334@gmail.com</option>
                                        <option>Jchavis@keystonepacific.com</option>
                                    </select> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body p-0">
                        <div className="itemtitleBar">
                            <h4>General Information</h4>
                        </div>
                        <div className="card-body" style={{ padding: '1.5rem 5rem' }}>
                            <div class="basic-form">
                                <form>
                                    <div class="row flexCenter">
                                        <div class="col-sm-5 mx-2 mb-3">
                                            <div className="col-md-12">
                                                <h5>Job Name</h5>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Customer Name" />
                                        </div>
                                        <div class="col-sm-5 mx-2 mb-3">
                                            <div className="col-md-12">
                                                <h5>Created</h5>
                                            </div>
                                            <input type="date" class="form-control" placeholder="Created" />
                                        </div>
                                        <div className="col-sm-5 mx-2 mb-3">
                                            <h5 className="form-label">Notes:</h5>
                                            <div className="col-md-12">
                                                <textarea className="form-txtarea form-control" rows="4" id="comment"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-sm-5 mx-2 mb-3">
                                            <h5 className="form-label">Assign / Apointment :</h5>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <Form.Select aria-label="Default select example" size="md">
                                                        <option selected>Choose...</option>
                                                        <option>Option 1</option>
                                                        <option>Option 2</option>
                                                        <option>Option 3</option>
                                                    </Form.Select>
                                                    {/* <select id="inputState" className="default-select form-control wide">
                                                            <option selected>Choose...</option>
                                                            <option>Option 1</option>
                                                            <option>Option 2</option>
                                                            <option>Option 3</option>
                                                        </select> */}
                                                </div>
                                                <div className="col-md-12 mt-3 text-end">
                                                    <button type="button" class="btn btn-outline-dark btn-md scheduleBTN">Schedule</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
                                        <div className="mb-3 row">
                                            <label className="col-sm-3 col-form-label">Tax</label>
                                            <div className="col-sm-9">
                                                <select className="default-select  form-control wide" >
                                                    <option>Non (Non - Taxable Sales)</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
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
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addItem}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body p-0">
                        <div className="itemtitleBar">
                            <h4>General Information</h4>
                        </div>
                        <div className="card-body" style={{ padding: '1.5rem 5rem' }}>
                            <div class="basic-form">
                                <form>
                                    <div class="row flexCenter">
                                        <div class="col-sm-4">
                                            <div className="col-md-12">
                                                <h5>Report for Week of:</h5>
                                            </div>
                                            <input type="date" class="form-control" placeholder="Created" />
                                        </div>
                                        <div class="col-sm-4">
                                            <div className="col-md-12">
                                                <h5>This week's rotation:</h5>
                                            </div>
                                            <input type="number" class="form-control" value={4} />
                                        </div>
                                        <div className="col-sm-4">
                                            <h5 className="form-label">Next weeks rotation: </h5>
                                            <input type="number" class="form-control" value={5} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="card">
                        <div className="card-body p-0">
                            <div className="estDataBox">
                                <div className="itemtitleBar">
                                    <h4>Items</h4>
                                </div>
                                <a className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#basicModal" style={{ margin: '12px 20px' }}>+ Add Items</a>
                                <div className="table-responsive active-projects style-1">
                                    <table id="empoloyees-tblwrapper" className="table">
                                        <thead>
                                            <tr>
                                                <th>Qty / Duration</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Rate</th>
                                                <th>Amount</th>
                                                <th>Tax</th>
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
                    </div> */}

                <div className="card">
                    <div className="card-body p-0">
                        <div className="estDataBox">
                            <div className="itemtitleBar">
                                <h4>Proposals</h4>
                            </div>
                            <div className="basic-form">
                                <form className='SRdetailsForm srReportForm'>
                                    {/* <div className="col-md-12"> */}
                                    <div className="row" style={{ width: '100%' }}>
                                        <div className="col-md-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <h5>Proposals Completed</h5>
                                        </div>
                                        <div className="col-md-8">
                                            <div class="basic-form">
                                                <form>
                                                    <div class="mb-3">
                                                        <textarea class="form-txtarea form-control" rows="3" id="comment"></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <h5>Proposals Submitted</h5>
                                        </div>
                                        <div className="col-md-8">
                                            <div class="basic-form">
                                                <form>
                                                    <div class="mb-3">
                                                        <textarea class="form-txtarea form-control" rows="3" id="comment"></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <h5>Notes</h5>
                                        </div>
                                        <div className="col-md-8">
                                            <div class="basic-form">
                                                <form>
                                                    <div class="mb-3">
                                                        <textarea class="form-txtarea form-control" rows="3" id="comment"></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </form>
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
                            <a href='/' className="btn btn-primary btn-sm" style={{ margin: '12px 20px' }}>+ Add</a>
                            <div className="table-responsive active-projects style-1">
                                <table id="empoloyees-tblwrapper" className="table">
                                    <thead>
                                        <tr>
                                            <th>File Name</th>
                                            <th>Caption</th>
                                            <th>Date</th>
                                            <th>Share</th>
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
                                            <td><span className="text-primary">abc@gmail.com</span></td>
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
                                            <td><span className="text-primary">abc@gmail.com</span></td>

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
                                            <td><span className="text-primary">abc@gmail.com</span></td>

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
                                            <td><span className="text-primary">abc@gmail.com</span></td>

                                        </tr>


                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row text-end">
                    <div>
                        <NavLink to='/Dashboard/Weekly-Reports'><button type='button' class="btn btn-primary me-1">Submit</button></NavLink>
                        <button class="btn btn-danger light ms-1">Cancel</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddWRform

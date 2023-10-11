import React from 'react'
import { Form } from 'react-bootstrap'

const Map = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5">
                        <div className="my-3">
                            {/* <div className="search-adress">
                                <input type="text" className="form-control input-default " placeholder="Search something" />
                                <button type="button" className="btn btn-primary btn-icon-md">
                                    <span className="material-symbols-sharp">
                                        search
                                    </span>
                                </button>
                            </div> */}
                            <div>
                                <input type="text" className="form-control input-default " placeholder="Search something" />

                            </div>
                            <div className="mt-2">
                                <Form.Select className="bg-white">
                                    <option value='Inspect and Advise'>Select Type</option>
                                    <option value='Inspect and Advise'>Inspect and Advise</option>
                                    <option value='Irrigation'>Irrigation</option>
                                    <option value='Maintenance'>Maintenance</option>
                                    <option value='Other'>Other</option>
                                    <option value='Proposal Needed'>Proposal Needed</option>
                                    <option value='Tree Care'>Tree Care</option>
                                </Form.Select>
                            </div>
                            <div className="card mt-2">
                                <div className="card-body">
                                    <ul className="nav nav-pills">
                                        <li className=" nav-item">
                                            <a href="#navpills-1" className="nav-link active" data-bs-toggle="tab" aria-expanded="false">All</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#navpills-2" className="nav-link" data-bs-toggle="tab" aria-expanded="false">Assigned</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#navpills-3" className="nav-link" data-bs-toggle="tab" aria-expanded="true">Un-Assigned</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="navpills-1" className="tab-pane active">
                                            <div className="row serviceLocations pt-2">
                                                <div className="col-md-12">
                                                    <div className="locationInfo">
                                                        <div className="col-md-3 flex-box">
                                                            <p>#646546</p>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="media-body">
                                                                <h6 className="mb-1">Customer 1</h6>
                                                                <p className="mb-1">C-II Block C 2 Phase 1 Johar Town, Lahore, Punjab 54770</p>
                                                                <span className="badge badge-primary">Irrigation</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="locationInfo">
                                                        <div className="col-md-3 flex-box">
                                                            <p>#646546</p>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="media-body">
                                                                <h6 className="mb-1">Customer 2</h6>
                                                                <p className="mb-1">C-II Block C 2 Phase 1 Johar Town, Lahore, Punjab 54770</p>
                                                                <span className="badge badge-primary">Irrigation</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="locationInfo">
                                                        <div className="col-md-3 flex-box">
                                                            <p>#646546</p>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="media-body">
                                                                <h6 className="mb-1">Customer 3</h6>
                                                                <p className="mb-1">C-II Block C 2 Phase 1 Johar Town, Lahore, Punjab 54770</p>
                                                                <span className="badge badge-primary">Maintenance</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="navpills-2" className="tab-pane">
                                            <div className="row serviceLocations pt-2">
                                                <div className="col-md-12">
                                                    <div className="locationInfo">
                                                        <div className="col-md-3 flex-box">
                                                            <p>#646546</p>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="media-body">
                                                                <h6 className="mb-1">Customer 1</h6>
                                                                <p className="mb-1">C-II Block C 2 Phase 1 Johar Town, Lahore, Punjab 54770</p>
                                                                <span className="badge badge-primary">Irrigation</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="locationInfo">
                                                        <div className="col-md-3 flex-box">
                                                            <p>#646546</p>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="media-body">
                                                                <h6 className="mb-1">Customer 2</h6>
                                                                <p className="mb-1">C-II Block C 2 Phase 1 Johar Town, Lahore, Punjab 54770</p>
                                                                <span className="badge badge-primary">Irrigation</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <div id="navpills-3" className="tab-pane">
                                            <div className="row serviceLocations pt-2">


                                                <div className="col-md-12">
                                                    <div className="locationInfo">
                                                        <div className="col-md-3 flex-box">
                                                            <p>#646546</p>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="media-body">
                                                                <h6 className="mb-1">Customer 3</h6>
                                                                <p className="mb-1">C-II Block C 2 Phase 1 Johar Town, Lahore, Punjab 54770</p>
                                                                <span className="badge badge-primary">Maintenance</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div className="col-md-7 py-3">
                        <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27233.071725612084!2d74.27175771628481!3d31.437978669606856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190143e0e99feb%3A0xf39379efff4dd86!2sUniversity%20of%20Management%20%26%20Technology!5e0!3m2!1sen!2s!4v1692089484116!5m2!1sen!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Map
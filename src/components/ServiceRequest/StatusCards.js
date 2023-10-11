import React from 'react'

const StatusCards = ({ newData, open, closed, total }) => {
    return (
        <>
            {/* <div class="col-xl-3 col-sm-6">
                <div class="card box-hover">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="icon-box icon-box-lg bg-primary-light rounded-circle flex-box">
                                <span class="material-symbols-outlined" style={{ fontSize: '30px', color: '#0d99ff' }}>
                                    edit
                                </span>
                            </div>
                            <div class="total-projects ms-3">
                                <h3 class="text-primary count">{newData}</h3>
                                <span>New</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="card box-hover">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="icon-box icon-box-lg bg-danger-light rounded-circle flex-box">
                                
                                <span class="material-symbols-outlined" style={{ fontSize: '30px', color: '#e3952e' }}>
                                    file_open
                                </span>
                            </div>
                            <div class="total-projects ms-3">
                                <h3 class="count" style={{ color: '#e3952e' }}>{open}</h3>
                                <span>Open</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="card box-hover">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="icon-box icon-box-lg bg-success-light rounded-circle flex-box">
                                <span class="material-symbols-outlined" style={{ fontSize: '35px', color: '#3ac977' }}>
                                    gpp_bad
                                </span>
                            </div>
                            <div class="total-projects ms-3">
                                <h3 class="text-success count">{closed}</h3>
                                <span>Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="card box-hover">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="icon-box icon-box-lg bg-purple-light rounded-circle flex-box">
                                <span class="material-symbols-outlined" style={{ fontSize: '35px', color: 'black' }}>
                                    person
                                </span>
                            </div>
                            <div class="total-projects ms-3">
                                <h3 class="text-secondary count">{total}</h3>
                                <span>Total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div class="col-xl-3  col-lg-6 col-sm-6">
                <div class="widget-stat card">
                    <div class="card-body p-4">
                        <div class="media ai-icon">
                            <span class="me-3 bgl-primary text-primary">
                                {/* <i class="ti-user"></i>  */}
                                <svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-user">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </span>
                            <div class="media-body">
                                <p class="mb-1">New</p>
                                <h4 class="mb-0">779</h4>
                                <span class="badge badge-primary">15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3  col-lg-6 col-sm-6">
                <div class="widget-stat card">
                    <div class="card-body p-4">
                        <div class="media ai-icon">
                            <span class="me-3 bgl-warning text-warning">
                                <svg id="icon-orders" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-file-text">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </span>
                            <div class="media-body">
                                <p class="mb-1">Open</p>
                                <h4 class="mb-0">5131</h4>
                                <span class="badge badge-warning">30%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3  col-lg-6 col-sm-6">
                <div class="widget-stat card">
                    <div class="card-body  p-4">
                        <div class="media ai-icon">
                            <span class="me-3 bgl-danger text-danger">
                                <svg id="icon-revenue" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-dollar-sign">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </span>
                            <div class="media-body">
                                <p class="mb-1">Closed</p>
                                <h4 class="mb-0">71889</h4>
                                <span class="badge badge-danger">55%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3  col-lg-6 col-sm-6">
                <div class="widget-stat card">
                    <div class="card-body p-4">
                        <div class="media ai-icon">
                            <span class="me-3 bgl-success text-success">
                                <svg id="icon-database-widget" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-database">
                                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                </svg>
                            </span>
                            <div class="media-body">
                                <p class="mb-1">Total</p>
                                <h4 class="mb-0">77799</h4>
                                <span class="badge badge-success">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatusCards

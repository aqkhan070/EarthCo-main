import React from 'react'

const StatusCardsEst = ({ drafts, sent, approved, rejected, total }) => {
    return (
        <>
            {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-primary-light rounded-circle flex-box">
                                <span className="material-symbols-outlined" style={{ fontSize: '25px', color: '#0d99ff' }}>
                                    edit
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="text-primary count">{drafts}</h3>
                                <span>Drafts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-danger-light rounded-circle flex-box">
                                <span className="material-symbols-outlined" style={{ fontSize: '30px', color: '#e3952e' }}>
                                    file_open
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="count" style={{ color: '#e3952e' }}>{sent}</h3>
                                <span>Sent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle flex-box">
                                <span className="material-symbols-outlined" style={{ fontSize: '35px', color: '#3ac977' }}>
                                    gpp_bad
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="text-success count">{approved}</h3>
                                <span>Approved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-danger-light rounded-circle flex-box">

                                <span className="material-symbols-outlined" style={{ fontSize: '30px', color: '#ff5e5e' }}>
                                    block
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="text-danger count">{rejected}</h3>
                                <span>Rejected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card box-hover">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="icon-box icon-box-lg bg-purple-light rounded-circle flex-box">
                                <span className="material-symbols-outlined" style={{ fontSize: '35px', color: 'black' }}>
                                    person
                                </span>
                            </div>
                            <div className="total-projects ms-3">
                                <h3 className="text-secondary count">{total}</h3>
                                <span>Total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row task">
                            <div className="col-xl-2 col-sm-4 col-6">
                                <div className="task-summary">
                                    <div className="d-flex align-items-baseline">
                                        <h2 className="text-purple count">28,1045</h2>
                                    </div>
                                    <span>Open Estimates</span>
                                    {/* <p>Tasks assigne</p> */}
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-4 col-6">
                                <div className="task-summary">
                                    <div className="d-flex align-items-baseline">
                                        <h2 className="text-warning count">7,092</h2>
                                    </div>
                                    <span>Total Estimates</span>
                                    {/* <p>Tasks assigne</p> */}
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-4 col-6">
                                <div className="task-summary">
                                    <div className="d-flex align-items-baseline">
                                        <h2 className="text-secondary count">478,000 $</h2>
                                    </div>
                                    <span>Amount of Opened Estimats</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatusCardsEst

import React from 'react'

const WeeklyReport = () => {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-5">
                                    <div className="mt-5 col-xl-10 col-lg-10 col-md-10 col-sm-12 text-center">
                                        <h2> <strong>Weekly Report</strong> </h2>
                                    </div>
                                    <div className="mt-4 col-xl-2 col-lg-2 col-md-2 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                                        <div className="brand-logo mb-2 inovice-logo">
                                            <img src='./assets/images/background/earthco_logo.png' alt="" className="light-logo" style={{ width: "100%" }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2" style={{ padding: "2px" }}>
                                    <div className="col-md-4 addborder" style={{ padding: "1%" }}>
                                        <div><h5> <strong>Customer Name</strong></h5> </div>
                                        <div><h5>3 Faraday</h5></div>
                                    </div>
                                    <div className="col-md-4 addborder" style={{ padding: "1%" }}>
                                        <div> <h5><strong>Contact Name</strong></h5>  </div>
                                        <div><h5>Matt Bovee</h5> </div>
                                        <div><h5> <strong>Contact Company</strong></h5>  </div>
                                        <div><h5>Idaho Cal Partners</h5> </div>
                                    </div>
                                    <div className="col-md-4 addborder" style={{ padding: "1%" }}>
                                        <div> <h5><strong>By Regional Manager</strong></h5>  </div>
                                        <div><h5>Dan Morrison</h5> </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 addborder">
                                        <div><h5> <strong>Report for Week of:</strong></h5> </div>
                                        <div><h5>07/14/2023</h5></div>
                                    </div>
                                    <div className="col-md-4 addborder">
                                        <div> <h5><strong>This week rotation:</strong></h5>  </div>
                                        <div><h5>4</h5> </div>
                                    </div>
                                    <div className="col-md-4 addborder">
                                        <div> <h5><strong>Next weeks rotation:</strong></h5>  </div>
                                        <div><h5>5</h5> </div>
                                    </div>
                                    <div className="col-md-12 addborder">
                                        <div> <h5><strong>Service Requests:</strong></h5>  </div>
                                        <div><h5>Blah Blaah Blah</h5> </div>
                                    </div>
                                    <div className="col-md-12 addborder">
                                        <div> <h5><strong>Proposals:</strong></h5>  </div>
                                        <div><h5>Blah Blaah Blah</h5> </div>
                                    </div>
                                    <div className="col-md-12 addborder">
                                        <div> <h5><strong>Notes:</strong></h5>  </div>
                                        <div><h5>Blah Blaah Blah</h5> </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div> <h5><strong>Photos:</strong></h5>  </div>
                                    </div>
                                    <div className="col-md-3">
                                        <img src="./assets/images/1.jpg" className="weeklyimages" alt="weeklyimages" />
                                    </div>
                                    <div className="col-md-3" >
                                        <img src="./assets/images/2.jpg" className="weeklyimages" alt="iweeklyimagesmage" />
                                    </div>
                                    <div className="col-md-3" >
                                        <img src="./assets/images/3.jpg" className="weeklyimages" alt="weeklyimages" />
                                    </div>
                                    <div className="col-md-3" >
                                        <img src="./assets/images/4.jpg" className="weeklyimages" alt="weeklyimages" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeeklyReport

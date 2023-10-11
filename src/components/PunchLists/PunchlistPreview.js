import React from 'react'

const PunchlistPreview = () => {
    return (
        <>
            <div class="container-fluid" >
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card mt-3">
                            <div class="card-body">
                                <div class="row mb-5">
                                    <div class="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                                        <div class="brand-logo mb-2 inovice-logo">
                                            <img src='./assets/images/background/earthco_logo.png' alt="" className="light-logo" style={{ width: '70%' }} />
                                        </div>
                                    </div>
                                    <div class="mt-5 col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center">
                                        <h3> <strong>Punchlist</strong> </h3>
                                    </div>
                                </div>
                                <div class="row mb-2" style={{ margin: '10px 0' }}>
                                    <div class="col-md-4 p-2" style={{ padding: "2px", border: "1px solid #789a3d" }}>
                                        <div> <strong>Customer Name</strong> </div>
                                        <div>Silver Oaks at Westridge</div>
                                        <div> <strong>Title</strong> </div>
                                        <div>January Walk</div>
                                    </div>
                                    <div class="col-md-4 p-2" style={{ padding: "2px", border: "1px solid #789a3d", borderLeft: '0px' }}>
                                        <div> <strong>Contact Name</strong> </div>
                                        <div>Nadia Ndeze</div>
                                        <div> <strong>Contact Company</strong> </div>
                                        <div>Keystone Pacific Property Management</div>
                                    </div>
                                    <div class="col-md-4 p-2" style={{ padding: "2px", border: "1px solid #789a3d", borderLeft: '0px' }}>
                                        <div> <strong>By Account Manager:</strong> </div>
                                        <div>Manny Vargas</div>
                                        <div> <strong>Created</strong> </div>
                                        <div>01/09/2023</div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-bordered ">
                                        <thead>
                                            <tr style={{ backgroundColor: "#789a3d", color: "black" }}>
                                                <th>#</th>
                                                <th>Photo</th>
                                                <th>Adress</th>
                                                <th>Notes</th>
                                                <th>Cmplt</th>
                                            </tr>
                                        </thead>
                                        <tbody className='punchlistTable'>
                                            <tr>
                                                <td class="tdbreak">
                                                    {/* <strong>Controller Number:</strong><br />1<br />
                                        <strong>Controller Make/ Model:</strong><br />Evolution DX2<br />
                                        <strong>Serial:</strong><br />03023<br />
                                        <strong>Location:</strong><br />9 Durango Ct Aliso Viejo Ca 92656<br />
                                        <strong>Satellite Based?:</strong><br />No<br />
                                        <strong>Type of Water:</strong><br />Reclaimed<br />
                                        <strong>Photo:</strong><br /><br /> */}
                                                    <strong>1</strong>
                                                </td>
                                                <td class="tdbreak">
                                                    <img style={{ width: '400px' }} src="./assets/images/product/punchlist1.jpeg" alt="" />
                                                </td>
                                                <td class="tdbreak">
                                                    <strong>Pool</strong>
                                                </td>
                                                <td class="tdbreak">
                                                    Keep plants below the inside the pool
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PunchlistPreview

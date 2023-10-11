import React from 'react'


const Audit = () => {

    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card mt-3">
                            {/* <div class="card-header"> Invoice <strong>01/01/01/2018</strong> <span class="float-end">
                                <strong>Status:</strong> Pending</span> </div> */}
                            <div class="card-body">
                                <div class="row mb-5">
                                    <div class="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                                        <div class="brand-logo mb-2 inovice-logo">
                                            <img src='./assets/images/background/earthco_logo.png' alt="" className="light-logo" style={{ width: '70%' }} />
                                        </div>
                                    </div>
                                    <div class="mt-5 col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center">
                                        <h3> <strong>Irrigation Audit</strong> </h3>
                                    </div>
                                </div>
                                <div class="row mb-2" style={{ padding: "2px", border: "1px solid #789a3d" }}>
                                    <div class="col-md-6">
                                        <div> <strong>Customer Name</strong> </div>
                                        <div>Silver Oaks at Westridge</div>
                                    </div>
                                    <div class="col-md-6">
                                        <div> <strong>Created</strong> </div>
                                        <div>11/03/2022</div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-bordered ">
                                        <thead>
                                            <tr style={{ backgroundColor: "#789a3d", color: "black" }}>
                                                <th >Controller</th>
                                                <th>Meter Info</th>
                                                <th>Valve</th>
                                                <th >Repairs / Upgrades</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="tdbreak">
                                                    <strong>Controller Number:</strong><br />1<br />
                                                    <strong>Controller Make/ Model:</strong><br />Evolution DX2<br />
                                                    <strong>Serial:</strong><br />03023<br />
                                                    <strong>Location:</strong><br />9 Durango Ct Aliso Viejo Ca 92656<br />
                                                    <strong>Satellite Based?:</strong><br />No<br />
                                                    <strong>Type of Water:</strong><br />Reclaimed<br />
                                                    <strong>Photo:</strong><br /><br />
                                                </td>
                                                <td class="tdbreak">
                                                    <strong>Meter Number:</strong><br />1592805<br />
                                                    <strong>Meter Size:</strong><br />2<br />
                                                </td>
                                                <td class="tdbreak">
                                                    <strong>Master Valve?:</strong><br />YES<br />
                                                    <strong>Flow Sensor?:</strong><br />YES<br />
                                                    <strong>No. of Valves:</strong><br />25<br />
                                                    <strong>No. Stations:</strong><br />25<br />
                                                    <strong>Number of Broken Main Lines:</strong><br />0<br />
                                                    <strong>Type of Valves</strong><br />Mixed<br />
                                                    <strong>Number of Leaking Valves:</strong><br />0<br />
                                                    <strong>Number Malfunctioning:</strong><br />0<br />
                                                    <strong>Number of Broken Lateral Lines:</strong><br />6<br />
                                                    <strong>Number of Broken Heads:</strong><br />3<br />
                                                </td>
                                                <td class="tdbreak">
                                                    <strong>Repairs:</strong><br />Repairs were made on every broken
                                                    stations Lateral line. Lateral line
                                                    repairs on stations 9, 24 and 25.
                                                    Sprinkler repairs on stations
                                                    2,6,7,23,25.<br />
                                                    <strong>Upgrades:</strong><br />Made repairs to the system. Talk
                                                    about upgrading to satellite based
                                                    controllers.<br />
                                                    <strong>Photos:</strong><br /><br />
                                                </td>
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

export default Audit

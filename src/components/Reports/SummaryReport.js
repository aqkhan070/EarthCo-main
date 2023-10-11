import React from 'react'


const SummaryReport = () => {

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
                                    <div class="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                        <div> <strong>Webz Poland</strong> </div>
                                        <div>1225 E. Wakeham Avenue</div>
                                        <div>71-101 Szczecin, Poland</div>
                                        <div>O 714.571.0455 F 714.571.0580</div>
                                        <div>Submitted To: </div>
                                        <div>Christian Walton</div>
                                        <div>Optimum</div>
                                    </div>
                                    <div class="mt-5 col-xl-7 col-lg-7 col-md-7 col-sm-12 text-center">
                                        <h3> <strong>Service Request Summary Report</strong> </h3>
                                        <h3>Grandview Crest</h3>
                                    </div>
                                    <div class="mt-4 col-xl-2 col-lg-2 col-md-2 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                                        <div class="brand-logo mb-2 inovice-logo">
                                            <img src='./assets/images/background/earthco_logo.png' alt="" className="light-logo" style={{ width: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="table-responsive">
                                    <table class="text-center table table-bordered ">
                                        <thead>
                                            <tr>
                                                <th >RECEIVED:</th>
                                                <th>W/O #:</th>
                                                <th>REQUESTED WORK:</th>
                                                <th >EARTHCO'S ACTION TAKEN</th>
                                                <th >STATUS: </th>
                                                <th >COMPLETED:</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td >2/13/2023</td>
                                                <td class="left strong">XN2172549</td>
                                                <td >22016 Newbridge Dr<br />
                                                    Please inspect and check soil level around the <br />
                                                    chimney at 22016<br />
                                                    Newbridge Dr. It has been reported that water is <br />
                                                    coming through the walls. Please assure soil isnt <br />
                                                    covering the
                                                    weep screed</td>
                                                <td >The soil level was corrected by 22016 Newbridge Dr</td>
                                                <td >Closed </td>
                                                <td >02/28/2023</td>
                                            </tr>
                                            <tr>
                                                <td >2/14/2023 </td>
                                                <td >XN2211991</td>
                                                <td >26347 Spring Creek Cir<br />
                                                    Please inspect and advise if any damage was done to <br />
                                                    the newly installed kurapia on the
                                                    greenbelt.
                                                </td>
                                                <td >The new kurapia ground cover by 26347 Spring <br />
                                                    Creek Cir was fertilized ( looks like dog and kids <br />
                                                    activity on the new ground cover)</td>
                                                <td >Closed</td>
                                                <td >02/17/2023</td>
                                            </tr>
                                            <tr>
                                                <td >2/17/2023</td>
                                                <td >XN2220737</td>
                                                <td >Please inspect area between 22191 and 22185 <br />
                                                    Summit Hill, as its been reported that there<br />
                                                    is wrongful grass removal.</td>
                                                <td >New seed and topper was applied for new grass <br />
                                                    area between 22191 and 22185 Summit Hill.</td>
                                                <td >Closed</td>
                                                <td >02/17/2023</td>
                                            </tr>
                                            <tr>
                                                <td >2/21/2023</td>
                                                <td >XN2225566</td>
                                                <td >26331 Spring Creek Cir<br />
                                                    Please inspect and re-grade the soil outside this home <br />
                                                    outside the crawl space to be sure<br />
                                                    that the water doesn’t intrude into the garage this <br />
                                                    next rain.</td>
                                                <td >Extra soil was removed</td>
                                                <td >Open </td>
                                                <td >44981</td>
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

export default SummaryReport

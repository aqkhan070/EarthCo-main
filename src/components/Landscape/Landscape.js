import React from 'react'

const Landscape = () => {

    return (
        <>

            <div class="container-fluid">

                <div class="row">
                    <div class="col-lg-2"></div>
                    <div class="col-lg-8">

                        <div class="card mt-3">
                            {/* <div class="card-header"> Invoice <strong>01/01/01/2018</strong> <span class="float-end">
                                    <strong>Status:</strong> Pending</span> </div> */}
                            <div class="card-body">
                                <div class="row mb-5">
                                    <div class="mt-4 col-xl-10 col-lg-10 col-md-10 col-sm-12">

                                        <div> <strong>Earthco</strong> </div>
                                        <div>1225 E. Wakeham Avenue</div>
                                        <div>Santa Ana, California 92705</div>

                                        <div><strong>Phone:</strong> 714.571.0455 </div>
                                        <div><strong>Fax:</strong> 714.571.0580</div>
                                    </div>

                                    <div class="mt-4 col-xl-2 col-lg-2 col-md-2 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">

                                        <div class="brand-logo mb-2 inovice-logo">
                                            <img src='./assets/images/background/earthco_logo.png' alt="" className="light-logo" style={{ width: '100%' }} />
                                        </div>

                                    </div>
                                </div>
                                <h2 class="text-center">Landscape Report</h2>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="table-responsive">
                                            <table class="text-center table-striped table table-bordered ">
                                                <thead>
                                                    <tr>
                                                        <th >Requested By:</th>
                                                        <th>Service Location: </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td >Monarch Bay Terrace HOA<br />
                                                            Donna Depledge, Keystone<br />
                                                            Pacific</td>
                                                        <td class="left strong">Donna Depledge,<br /> Keystone
                                                            Pacific</td>

                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div> </div>
                                    <div class="col-md-6">

                                        <div class="text-right" ><strong>Date Created:</strong> 11/3/2014 </div>
                                        <div class="text-right"><strong>Target Completion:</strong> 11/7/2014</div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table-bordered table  ">
                                        <thead>

                                        </thead>
                                        <tbody>
                                            <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                                                <td colSpan={2}><strong>Maintenance Report</strong></td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Supervisor visited the job weekly:</strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Completed litter pickup of grounds areas: </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Completed sweeping or blowing of walkways: </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>High priority areas were visited weekly:  </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>V ditches were cleaned and inspected:  </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Weep screens inspected and cleaned in rotation section:  </strong> </td>
                                                <td ></td>

                                            </tr>

                                            <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                                                <td colSpan={2}><strong>Lawn Maintenance</strong></td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Fertilization of turf occurred: </strong> </td>
                                                <td ></td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Turf was mowed and edged weekly:   </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                                                <td colSpan={2}><strong>Shrub Maintenance</strong></td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Shrubs trimmed according to rotation schedule:   </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Fertilization of shrubs occurred:    </strong> </td>
                                                <td ></td>

                                            </tr>
                                            <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                                                <td colSpan={2}><strong>Ground Cover and Flowerbed Maint.</strong></td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Watering of flowerbeds was completed and checked:     </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                                                <td colSpan={2}><strong>Irrigation System</strong></td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Heads were adjusted for maximum coverage:     </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Repairs were made to maintain an effective system:      </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Controllers were inspected and adjusted:     </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Main line was repaired:     </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Valve(s) was repaired:      </strong> </td>
                                                <td >NO</td>

                                            </tr>
                                            <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                                                <td colSpan={2}><strong>Rotation</strong></td>

                                            </tr>
                                            <tr>
                                                <td ><strong>This months expected rotation schedule:    </strong> </td>
                                                <td ></td>

                                            </tr>
                                            <tr style={{ backgroundColor: "#cccccc", color: "black" }}>
                                                <td colSpan={2}><strong>Extra Information</strong></td>

                                            </tr>
                                            <tr>
                                                <td ><strong>Notes:    </strong> </td>
                                                <td ></td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <p class="mt-5">*Note Beginning October 1, Earthco will commence annual skip mowing of the grass due to the winter season
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landscape

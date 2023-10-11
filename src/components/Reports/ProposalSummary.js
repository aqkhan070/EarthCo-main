import React from 'react'

const ProposalSummary = () => {

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
                                        <h3> <strong>Proposal Summary Report</strong> </h3>
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
                                                <th >SUBMITTED:</th>
                                                <th>PROPOSAL #:</th>
                                                <th>DESCRIPTION:</th>
                                                <th >AMOUNT:</th>
                                                <th >STATUS: </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td >2/13/2023</td>
                                                <td class="left strong">76990</td>
                                                <td >This proposal is to trim the heavily leaning Pine tree along El Toro close to Aliso Park. <br />
                                                    This tree was inspected by Will Morrison, ISA Certified Arborist, WE-14244A</td>
                                                <td >$675.00</td>
                                                <td >Sent </td>
                                            </tr>
                                            <tr>
                                                <td >2/14/2023 </td>
                                                <td >77022</td>
                                                <td >This proposal is to trim the heavily leaning Pine tree along El Toro close to Aliso Park. <br />
                                                    This tree was inspected by Will Morrison, ISA Certified Arborist, WE-14244A</td>
                                                <td >$1,570.00</td>
                                                <td >Sent</td>
                                            </tr>
                                            <tr>
                                                <td >2/17/2023</td>
                                                <td >77217</td>
                                                <td >This proposal is to install straw waddle on the Aliso park slope to help with the the soil erosion</td>
                                                <td >$1,9970.00</td>
                                                <td >Sent</td>
                                            </tr>
                                            <tr>
                                                <td >2/21/2023</td>
                                                <td >77614</td>
                                                <td >This proposal is to install a new controller to replace the broken non working <br /> controller #3 by 26352
                                                    Mountain Grove Circle . </td>
                                                <td >$2,225.00</td>
                                                <td >Approved </td>
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

export default ProposalSummary

import axios from "axios";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import formatDate from "../../custom/FormatDate";

const Audit = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const [irrDetails, setIrrDetails] = useState({});

  const fetchIrrigation = async () => {
    if (idParam === 0) {
      return;
    }
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Irrigation/GetIrrigation?id=${idParam}`,
        { headers }
      );
      console.log("selected irrigation is", res.data);
      setIrrDetails(res.data);
    } catch (error) {
      console.log("fetch irrigation api call error", error);
    }
  };

  useEffect(() => {
    fetchIrrigation();
  }, []);

  if (!irrDetails.IrrigationData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {irrDetails ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mt-3">
                {/* <div className="card-header"> Invoice <strong>01/01/01/2018</strong> <span className="float-end">
                                <strong>Status:</strong> Pending</span> </div> */}
                <div className="card-body">
                  <div className="row mb-5">
                    <div className="mt-4 col-xl-3 col-lg-3 col-md-3 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                      <div className="brand-logo mb-2 inovice-logo">
                        <img
                          src="./assets/images/background/earthco_logo.png"
                          alt=""
                          className="light-logo"
                          style={{ width: "70%" }}
                        />
                      </div>
                    </div>
                    <div className="mt-5 col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center">
                      <h3>
                        {" "}
                        <strong>Irrigation Audit</strong>{" "}
                      </h3>
                    </div>
                  </div>
                  <div
                    className="row mb-2"
                    style={{ padding: "2px", border: "1px solid #789a3d" }}
                  >
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <strong>Customer Name</strong>{" "}
                      </div>
                      <div>{irrDetails?.IrrigationData.CustomerId}</div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        {" "}
                        <strong>Created</strong>{" "}
                      </div>
                      <div>
                        {formatDate(irrDetails?.IrrigationData.CreatedDate)}
                      </div>
                    </div>
                  </div>

                  {/* controller table  */}

                  {irrDetails.ControllerData.map((item) => {
                    return (
                      <div key={item.ControllerId} className="table-responsive">
                        <table className="table table-bordered ">
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "#789a3d",
                                color: "black",
                              }}
                            >
                              <th>Controller</th>
                              <th>Meter Info</th>
                              <th>Valve</th>
                              <th>Repairs / Upgrades</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="tdbreak">
                                <strong>Controller Number:</strong>
                                <br />
                                {item.ControllerId}
                                <br />
                                <strong>Controller Make/ Model:</strong>
                                <br />
                                {item.MakeAndModel}
                                <br />
                                <strong>Serial:</strong>
                                <br />
                                {item.SerialNumber}
                                <br />
                                <strong>Location:</strong>
                                <br />
                                {item.LoacationClosestAddress}
                                <br />
                                <strong>Satellite Based?:</strong>
                                <br />
                                {item.isSatelliteBased? "yes": "No"}
                                <br />
                                <strong>Type of Water:</strong>
                                <br />
                                {item.TypeofWater}
                                <br />
                                <strong>Photo:</strong>
                                <br />
                                <br />
                              </td>
                              <td className="tdbreak">
                                <strong>Meter Number:</strong>
                                <br />
                                {item.MeterNumber}
                                <br />
                                <strong>Meter Size:</strong>
                                <br />
                                rt-454
                                <br />
                              </td>
                              <td className="tdbreak">
                                <strong>Master Valve?:</strong>
                                <br />
                                {item.MakeAndModel}
                                <br />
                                <strong>Flow Sensor?:</strong>
                                <br />
                                dxdiag123
                                <br />
                                <strong>No. of Valves:</strong>
                                <br />
                                {item.NumberofValves}
                                <br />
                                <strong>No. Stations:</strong>
                                <br />
                                {item.NumberofStation}
                                <br />
                                <strong>Number of Broken Main Lines:</strong>
                                <br />
                                {item.NumberofBrokenMainLines}
                                <br />
                                <strong>Type of Valves</strong>
                                <br />
                                {item.TypeofValves}
                                <br />
                                <strong>Number of Leaking Valves:</strong>
                                <br />
                                {item.LeakingValves}
                                <br />
                                <strong>Number Malfunctioning:</strong>
                                <br />
                                {item.MalfunctioningValves}
                                <br />
                                <strong>Number of Broken Lateral Lines:</strong>
                                <br />
                                {item.NumberofBrokenLateralLines}
                                <br />
                                <strong>Number of Broken Heads:</strong>
                                <br />
                                {item.NumberofBrokenHeads}
                                <br />
                              </td>
                              <td className="tdbreak">
                                <strong>Repairs:</strong>
                                <br />
                                {item.RepairsMade}
                                <br />
                                <strong>Upgrades:</strong>
                                <br />
                                {item.UpgradesMade}
                                <br />
                                <strong>Controller photo:</strong>
                                <br />
                                <img
                                  src={`https://earthcoapi.yehtohoga.com/${item.ControllerPhotoPath}`}
                                  style={{
                                    width: "150px",
                                    height: "120px",
                                    objectFit: "cover",
                                  }}
                                />
                                <br />
                                <strong>photo:</strong>
                                <br />
                                <img
                                  src={`https://earthcoapi.yehtohoga.com/${item.PhotoPath}`}
                                  style={{
                                    width: "150px",
                                    height: "120px",
                                    objectFit: "cover",
                                  }}
                                />
                                <br />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
};

export default Audit;

import axios from 'axios';
import React from 'react'
import { Delete, Create } from "@mui/icons-material";
import {
  Button,
 } from "@mui/material";


const ControllerTable = ({ fetchIrrigation, controllerList, headers}) => {

    const deleteController = async (id) => {
      try {
        const res = await axios.get(`https://earthcoapi.yehtohoga.com/api/Irrigation/DeleteController?id=${id}`,{headers});
        console.log("successfully deleted controller", res.data);
        fetchIrrigation();

      } catch (error) {
        console.log("delete api error", error);
      }
    };

  return (
    <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive active-projects style-1">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Controller </th>
                      <th>Meter Info </th>
                      <th>Valve </th>
                      <th>Repairs / Upgrades</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {controllerList.map((controller, index) => {
                    return(
                      <tr key={index}>
                        <td>{controller.ControllerId}</td>
                        <td>{controller.MakeAndModel}</td>
                        <td>{controller.MeterSize}</td>
                        <td>{controller.TypeofValves}</td>
                        <td>{controller.RepairsMade}</td>
                        <td>
                        <Button
                                title="Delete"
                                type="button"
                                // className="btn btn-danger btn-icon-xxs mx-1"
                                onClick={() => {
                                  deleteController(controller.ControllerId)
                                }}
                              >
                                {/* <i className="fa fa-trash"></i> */}
                                <Delete color='error'></Delete>
                              </Button>
                        </td>
                      </tr>
                    )
                  })}

                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ControllerTable
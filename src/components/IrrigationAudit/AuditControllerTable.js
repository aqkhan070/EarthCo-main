import axios from "axios";
import React, { useState } from "react";
import { Delete, Create } from "@mui/icons-material";
import { Button } from "@mui/material";
import EventPopups from "../Reusable/EventPopups";

const AuditControllerTable = ({
  setAddSucces,
  fetchIrrigation,
  controllerList,
  headers,
}) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const deleteController = async (id) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/IrrigationAuditReport/DeleteControllerAuditReport?id=${id}`,
        { headers }
      );
      console.log("successfully deleted controller", res.data);
      fetchIrrigation();
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Irrigation controller Deleted successfully");
      setTimeout(() => {
        setAddSucces("");
      }, 3000);

      setAddSucces(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("delete api error", error);
    }
  };

  return (
    <div className="col-md-12">
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="card">
        <div className="card-body">
          <div className="table-responsive active-projects style-1">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Controller Name</th>
                  <th>Broken Valves</th>
                  <th>Broken Laterals</th>
                  <th>Broken Heads</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {controllerList ? (
                  controllerList.map((controller, index) => {
                    if (controller.ControllerData) {
                      return (
                        <tr key={index}>
                          <td>
                            {controller.ControllerData?.ControllerAuditReportId}
                          </td>
                          <td>{controller.ControllerData?.ControllerName}</td>
                          <td>
                            {" "}
                            {controller.ControllerData?.BrokenValve
                              ? "Yes"
                              : "No"}
                          </td>
                          <td>
                            {controller.ControllerData?.BrokenLaterals
                              ? "Yes"
                              : "No"}
                          </td>
                          <td>
                            {controller.ControllerData?.BrokenHeads
                              ? "Yes"
                              : "No"}
                          </td>
                          <td>
                            <Button
                              title="Delete"
                              type="button"
                              // className="btn btn-danger btn-icon-xxs mx-1"
                              onClick={() => {
                                deleteController(
                                  controller.ControllerData
                                    ?.ControllerAuditReportId
                                );
                              }}
                            >
                              {/* <i className="fa fa-trash"></i> */}
                              <Delete color="error"></Delete>
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditControllerTable;

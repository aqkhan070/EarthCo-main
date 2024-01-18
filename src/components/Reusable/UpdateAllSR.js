import React, { useEffect, useState, useRef, useContext } from "react";
import EventPopups from "../Reusable/EventPopups";
import useBulkActions from "../Hooks/useBulkActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const UpdateAllSR = ({ selectedItems, endpoint, bindingFunction }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(0);

  const { bulkActions } = useBulkActions();

  const handleSnackbar = (open, color, text, closeModal = false) => {
    setOpenSnackBar(open);
    setSnackBarColor(color);
    setSnackBarText(text);
    if (closeModal) {
      document.getElementById("updateModalCloser").click();
      bindingFunction();
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id={`deleteModal3`}
        tabIndex="-1"
        aria-labelledby="deleteModal3"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Update All</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body  ">
              <div className="row">
                <div className="col-md-4 mt-2 text-end">
                  <h5>Status</h5>
                </div>
                <div className="col-md-6 text-start">
                  <Select
                    aria-label="Default select example"
                    variant="outlined"
                    onChange={(e) => {
                      setSelectedStatus(parseInt(e.target.value, 10));
                    }}
                    name="Status"
                    size="small"
                    placeholder="Select Status"
                    fullWidth
                  >
                    <MenuItem value={1}>Open</MenuItem>
                    <MenuItem value={2}>Closed</MenuItem>
                  </Select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                id="updateModalCloser"
                className="btn btn-danger light "
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary "
                onClick={() => {
                  bulkActions(
                    endpoint,
                    {
                      id: selectedItems,
                      StatusId: selectedStatus,
                    },
                    handleSnackbar
                  );
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-warning me-2"
        data-bs-toggle="modal"
        data-bs-target={`#deleteModal3`}
      >
        <EventPopups
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          color={snackBarColor}
          text={snackBarText}
        />
        Change Status
      </button>
    </>
  );
};

export default UpdateAllSR;

import React, { useState } from "react";
import EventPopups from "../Reusable/EventPopups";
import useBulkActions from "../Hooks/useBulkActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const UpdateAllModal = ({ selectedItems, endpoint, bindingFunction }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const { bulkActions } = useBulkActions();

  const handleSnackbar = (open, color, text, closeModal = false) => {
    setOpenSnackBar(open);
    setSnackBarColor(color);
    setSnackBarText(text);
    if (closeModal) {
      setOpenModal(false);
      bindingFunction();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="btn btn-warning mx-1 mt-2"
      >
        <EventPopups
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          color={snackBarColor}
          text={snackBarText}
        />
        Change Status
      </button>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <DialogTitle id="update-modal-title">Update All</DialogTitle>
        <DialogContent sx={{ width: "100em" }}>
          <div className="row">
            <div className="col-md-1 mt-2 text-end">
              <h5>Status</h5>
            </div>
            <div className="col-md-6 text-start">
              <Select
                aria-label="Select Status"
                variant="outlined"
                size="small"
                value={selectedStatus}
                sx={{ width: "15em" }}
                onChange={(e) => {
                  setSelectedStatus(parseInt(e.target.value, 10));
                }}
                fullWidth
              >
                <MenuItem value={1}>Accepted</MenuItem>
                <MenuItem value={2}>Closed - Billed</MenuItem>
                <MenuItem value={3}>Converted</MenuItem>
                <MenuItem value={4}>Pending</MenuItem>
                <MenuItem value={5}>Rejected</MenuItem>
              </Select>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button
          variant="contained"
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
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateAllModal;

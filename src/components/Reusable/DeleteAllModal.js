import React, { useEffect, useState, useRef, useContext } from "react";
import EventPopups from "../Reusable/EventPopups";
import useBulkActions from "../Hooks/useBulkActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteAllModal = ({ selectedItems, endpoint, bindingFunction }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
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
        className="btn btn-danger mx-1 mt-2"
        onClick={() => setOpenModal(true)}
      >
        <EventPopups
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          color={snackBarColor}
          text={snackBarText}
        />
        Delete Selected
      </button>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <DialogTitle sx={{ backgroundColor: "#77993d ", color: "white" }}>
          Delete All
        </DialogTitle>
        <DialogContent sx={{ margin: "2em 5em 0em 5em" }}>
          <DialogContentText>
            <h6>Are you sure you want to delete all selected items?</h6>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              bulkActions(
                endpoint,
                {
                  id: selectedItems,
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

export default DeleteAllModal;

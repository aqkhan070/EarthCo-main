import React, { useEffect, useState, useRef, useContext } from "react";
import EventPopups from "../Reusable/EventPopups";
import useBulkActions from "../Hooks/useBulkActions";

const DeleteAllModal = ({ selectedItems, endpoint, bindingFunction }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const { bulkActions } = useBulkActions();

  const handleSnackbar = (open, color, text, closeModal = false) => {
    setOpenSnackBar(open);
    setSnackBarColor(color);
    setSnackBarText(text);
    if (closeModal) {
      document.getElementById("deleteModalCloser").click();
      bindingFunction();
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id={`deleteModal2`}
        tabIndex="-1"
        aria-labelledby="deleteModal2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Delete All</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>Are you sure you want to delete All selected items? </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                id="deleteModalCloser"
                className="btn btn-danger light "
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  bulkActions(
                    endpoint,
                    {
                      id: selectedItems,
                    },
                    handleSnackbar
                  );
                }}
                className="btn btn-primary "
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        data-bs-toggle="modal"
        data-bs-target={`#deleteModal2`}
        className="btn btn-danger me-2"
      >
        <EventPopups
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          color={snackBarColor}
          text={snackBarText}
        />
        Delete Selected
      </button>
    </>
  );
};

export default DeleteAllModal;

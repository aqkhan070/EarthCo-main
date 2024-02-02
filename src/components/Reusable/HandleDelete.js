import React, { useEffect, useState, useRef, useContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Delete} from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import EventPopups from "../Reusable/EventPopups";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
  } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
  
const HandleDelete = ({id , endPoint, to, syncQB}) => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const navigate = useNavigate();

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarColor, setSnackBarColor] = useState("");
    const [snackBarText, setSnackBarText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const handleSnackbar = (open, color, text, closeModal = false) => {
        setOpenSnackBar(open);
        setSnackBarColor(color);
        setSnackBarText(text);
        if (closeModal) {
          setOpenModal(false);
        
        }
      };
    const deletePo = async () => {
        try {
          const res = await axios.get(
            `https://earthcoapi.yehtohoga.com/api/${endPoint}${id}`,
            { headers }
          );
          handleSnackbar(true, "error", res.data.Message, true)
          syncQB(res.data.SyncId)
          setTimeout(() => {
            navigate(to);
          }, 3000);
          console.log("delete response", res.data);
        } catch (error) {
         
            handleSnackbar(true, "error", "Error deleting Item", true)
          console.log("error deleting PO", error);
        }
      };

  return (<>
  
        
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <DialogTitle sx={{ backgroundColor: "#77993d ", color: "white" }}>
          Delete
        </DialogTitle>
        <DialogContent sx={{ margin: "2em 5em 0em 5em" }}>
          <DialogContentText>
            <h5><ErrorOutlineIcon sx={{fontSize : 30}} color="error"/> Are you sure you want to delete selected item?</h5>
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
                deletePo()
            }}
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>


    <LoadingButton
    variant="outlined"
    // loading={loading}
    color="error"
    onClick={() => setOpenModal(true)}
    startIcon={<Delete sx={{ fontSize: 2 }} />}
    // onClick={handleSubmit}
    // disabled={disable}
    disableElevation
    sx={{
      marginRight: "0.6em",
      color: "red",    
      textTransform: "capitalize",
    }}
  >
     <EventPopups
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          color={snackBarColor}
          text={snackBarText}
        />
    Delete
  </LoadingButton></>
  )
}

export default HandleDelete
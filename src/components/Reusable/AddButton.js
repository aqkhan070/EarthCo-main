import { Button } from "@mui/material";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/Add";
import Print from "@mui/icons-material/Article";
const AddButton = ({ onClick, children,varient, icon }) => {
  return (
    <Button
      sx={{ textTransform: "capitalize", padding: "8px 10px", border: "1px solid #77993D", "&:hover": {
        backgroundColor: "#77993D",
        color: "white",
        border: "1px solid #77993D",
        outlineColor: "black",
      }, }}
      variant={varient == "outlined"? varient:"contained"}
      onClick={onClick}
      className="me-2"
      
      disableElevation
      startIcon={icon==="print"? <Print/> :<ArrowBackRoundedIcon sx={{ padding: 0 }} />}
    >
      {children}
    </Button>
  );
};

export default AddButton;

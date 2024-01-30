import { Button } from "@mui/material";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/Print";
const PreviewButtons = ({children, onClick}) => {
  return (
    <Button
    sx={{ textTransform: "capitalize", padding: "8px 10px", color: "#171717",
        border: "1px solid #171717",
        marginRight: "0.5em",
       
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#171717",
          color: "white",
          border: "1px solid black",
          outlineColor: "black",
        }, }}
    variant="outlined"
   
    onClick={onClick}
    className="me-2"
    color="primary"
    disableElevation
    startIcon={<ArrowBackRoundedIcon sx={{ padding: 0 }} />}
  >
    {children}
  </Button>
  )
}

export default PreviewButtons
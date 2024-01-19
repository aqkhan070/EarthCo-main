import { Button } from "@mui/material";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/Add";

const AddButton = ({ onClick, children }) => {
  return (
    <Button
      sx={{ textTransform: "capitalize", padding: "8px 10px" }}
      variant="contained"
      onClick={onClick}
      className="me-2"
      color="primary"
      disableElevation
      startIcon={<ArrowBackRoundedIcon sx={{ padding: 0 }} />}
    >
      {children}
    </Button>
  );
};

export default AddButton;

import { Button } from "@mui/material";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
const BackButton = ({ onClick, children }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        color: "#171717",
        border: "1px solid #171717",
        marginRight: "0.5em",
       
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#171717",
          color: "white",
          border: "1px solid black",
          outlineColor: "black",
        },
      }}
      onClick={onClick}
      color="primary"
      startIcon={<ArrowBackRoundedIcon sx={{ padding: 0 }} />}
    >
      {children}
    </Button>
  );
};

export default BackButton;

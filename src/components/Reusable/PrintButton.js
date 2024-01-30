import { Button } from "@mui/material";
import React from "react";
import { Print, Email, Download } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const PrintButton = ({ onClick, varient }) => {
  if ((varient === "mail")) {
    return (
      <IconButton
        sx={{
          color: "#171717",
          border: "1px solid #171717",
          borderRadius: "5px",
          marginRight: "0.5em",
          padding: "5px 12px",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#171717",
            color: "white",
            border: "1px solid black",
            outlineColor: "black",
          },
        }}
        onClick={onClick}
      >
        <Email sx={{ padding: 0 }} />
      </IconButton>
    );
  } else if(varient === "print") {
    return (
      <IconButton
        sx={{
          color: "#171717",
          border: "1px solid #171717",
          borderRadius: "5px",
          marginRight: "0.5em",
          padding: "5px 12px",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#171717",
            color: "white",
            border: "1px solid black",
            outlineColor: "black",
          },
        }}
        onClick={onClick}
      >
        <Print sx={{ padding: 0 }} />
      </IconButton>
    );
  }
};

export default PrintButton;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploadButton = ({ onClick, children }) => {
  return (
    <Button
      component="label"
      variant="outlined"
      startIcon={<CloudUploadIcon sx={{ fontSize: 2 }} />}
      sx={{
        color: "#171717",
        border: "1px solid black",
        marginRight: "0.5em",
       
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#171717",
          color: "white",
          border: "1px solid black",
          outlineColor: "black",
        },
      }}
    >
      &nbsp;{children}
      <VisuallyHiddenInput type="file" onChange={onClick} />
    </Button>
  );
};

export default FileUploadButton;

import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/SaveOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const LoaderButton = ({
  disable,
  varient,
  color,
  handleSubmit,
  loading,
  children,
}) => {
  if (varient == "small") {
    return (
      <LoadingButton
        variant="contained"
        size="small"
        loading={loading}
        color={color}
        startIcon={<SendIcon />}
        onClick={handleSubmit}
        disableElevation
        sx={{
          padding: "5px 17px",
          marginRight: "0.6em",
          color: "#fff",
          textTransform: "capitalize",
        }}
      >
        {children}
      </LoadingButton>
    );
  } else if (children.includes("copy")) {
    return (
      <LoadingButton
        variant="contained"
        loading={loading}
        // color={color}
        // loadingIndicator="Saving…"
        // startIcon={<DeleteIcon />}
        // loadingPosition="start"
        startIcon={<ContentCopyIcon sx={{ fontSize: 2 }} />}
        onClick={handleSubmit}
        disabled={disable}
        disableElevation
        sx={{
          marginRight: "0.6em",

          color: "#fff",
          backgroundColor : "#5C636A",
         
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#474d52",
                   
           
          },
        }}
      >
        {children}
      </LoadingButton>
    );
  } else {
    return (
      <LoadingButton
        variant="contained"
        loading={loading}
        color={color}
        // loadingIndicator="Saving…"
        // startIcon={<DeleteIcon />}
        // loadingPosition="start"
        startIcon={<SendIcon sx={{ fontSize: 2 }} />}
        onClick={handleSubmit}
        disabled={disable}
        disableElevation
        sx={{
          marginRight: "0.6em",

          color: "#fff",
          border: "0.5px solid #77993D",
          textTransform: "capitalize",
        }}
      >
        {children}
      </LoadingButton>
    );
  }
};

export default LoaderButton;

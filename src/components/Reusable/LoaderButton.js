import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const LoaderButton = ({disable, varient, color, handleSubmit, loading, children }) => {
  if (varient == "small") {
    return (
      <LoadingButton
        variant="contained"
        size="small"
        loading={loading}
        color={color}
        // loadingIndicator="Saving…"
        // startIcon={<DeleteIcon />}
        // loadingPosition="start"
        onClick={handleSubmit}
        sx={{ padding: "5px 17px", marginRight: "0.6em", color: "#fff" }}
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
        onClick={handleSubmit}
        disabled={disable}
        sx={{ padding: "0.5rem 1.5rem", marginRight: "0.6em", color: "#fff" }}
      >
        {children}
      </LoadingButton>
    );
  }
};

export default LoaderButton;

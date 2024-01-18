import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/SaveOutlined";
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
        sx={{
          marginRight: "0.6em",
          color: "#fff",
          textTransform: "capitalize",
        }}
      >
        {children}
      </LoadingButton>
    );
  }
};

export default LoaderButton;

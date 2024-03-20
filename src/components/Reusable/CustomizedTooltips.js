import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export default function CustomizedTooltips({ children, title, placement }) {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      arrow
      classes={{ popper: className }}
      placement={placement}
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return <HtmlTooltip title={title}>{children}</HtmlTooltip>;
}
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function ActivityLog() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <h4 className="ms-3 mt-3">Activity Log</h4>
      <List className="mx-2">
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="row mx-2 mt-3">
              <div className="col-md-12">
                <h5 className="mb-0 pb-0">
                  <>Customer Name</>
                </h5>
              </div>
              <div className="col-md-12">
                <p>
                 Estimate was sent to dummy@gmail.com on 24/6/2024
                </p>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Button
        className="me-2"
        variant="outlined"
        color="info"
        onClick={toggleDrawer("right", true)}
      >
        Activity
      </Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        // hideBackdrop={true}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </>
  );
}

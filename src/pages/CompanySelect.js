import React, { useContext, useEffect, useState } from "react";
import logo1 from "../assets/images/background/earthco_logo.png";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useFetchCompanyList from "../components/Hooks/useFetchCompanyList";
import { DataContext } from "../context/AppData";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventPopups from "../components/Reusable/EventPopups";
import LoadingButton from "@mui/lab/LoadingButton";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import BusinessIcon from "@mui/icons-material/Business";
import { CircularProgress } from "@mui/material";

const CompanySelect = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { fetchCompanies, companies, loading, setloading } =
    useFetchCompanyList();
  const { loggedInUser, setLoggedInUser } = useContext(DataContext);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const navigate = useNavigate();

  const handleConfirmClick = async (id) => {
    setloading(true);
    if (!id) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please Select Company");
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/SelectCompany?CompanyId=${id}`,
        { headers }
      );
      setLoggedInUser({
        ...loggedInUser,
        CompanyName: response.data.CompanyName,
        CompanyId: response.data.CompanyId,
      });
      Cookies.set("CompanyName", response.data.CompanyName, { expires: 7 });
      Cookies.set("CompanyId", response.data.CompanyId, { expires: 7 });
      console.log("Company response is", response.data.message);
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.message);

      navigate(`/Dashboard`);
      setloading(false);
    } catch (error) {
      console.log("api call error", error);
      setloading(false);

      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText(error.response.data);
    }
  };

  useEffect(() => {
    fetchCompanies();
    console.log("loggedInUser is", loggedInUser);
  }, []);

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="page-wraper">
        <div className="browse-job login-style3">
          <div
            className="bg-white row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh",
              marginRight: "20%",
            }}
          >
            <div className="login-form style-2" style={{ maxWidth: "500px" }}>
              {loading ? (
                <>
                  {" "}
                  <div className="center-loader">
                    <CircularProgress />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="card-body">
                    <div className="logo-header">
                      <img
                        src={logo1}
                        alt=""
                        className="width-230 light-logo"
                        style={{ width: "35%", marginLeft: "30%" }}
                      />
                      <img
                        src={logo1}
                        alt=""
                        className="width-230 dark-logo"
                        style={{ width: "35%", marginLeft: "30%" }}
                      />
                    </div>

                    <Box
                      sx={{
                        width: "100%",

                        bgcolor: "background.paper",
                      }}
                    >
                      <List>
                        {companies.map((company) => (
                          <>
                            <ListItemButton
                              key={company.CompanyId}
                              onClick={(event) => {
                                handleConfirmClick(company.CompanyId);
                              }}
                            >
                              <ListItemIcon>
                                <BusinessIcon
                                  sx={{
                                    fontSize: 30,
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                sx={{
                                  color: "#303030",
                                  fontSize: 30,
                                 
                                }}
                                primary={company.CompanyName}
                              />
                            </ListItemButton>
                            <Divider
                              sx={{
                                width: "25vw",
                              }}
                            />
                          </>
                        ))}
                      </List>
                    </Box>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySelect;

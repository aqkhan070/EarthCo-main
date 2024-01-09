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

const CompanySelect = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { fetchCompanies, companies } = useFetchCompanyList();
  const { loggedInUser, setLoggedInUser } = useContext(DataContext);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const navigate = useNavigate();

  const handleCompanyChange = (event, newValue) => {
    setSelectedCompany(newValue);
    console.log(newValue);
  };

  const [btndisable, setBtndisable] = useState(false);

  const handleConfirmClick = async () => {
    setBtndisable(true);
    if (!selectedCompany.CompanyId) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please Select Company");
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/SelectCompany?CompanyId=${selectedCompany.CompanyId}`,
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
      setBtndisable(false);
      navigate(`/Dashboard`);
    } catch (error) {
      setBtndisable(false);
      console.log("api call error", error);
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

                <div>
                  <div>
                    <div>
                      <div>
                        <div className="row">
                          <div className="col-md-11 col-sm-11">
                            <h4>Select Company</h4>
                          </div>
                          <div className="col-md-12 col-sm-11">
                            <Autocomplete
                              size="small"
                              options={companies}
                              getOptionLabel={(option) =>
                                option.CompanyName || ""
                              }
                              onChange={handleCompanyChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label=""
                                  placeholder="Select Company"
                                  className="bg-white"
                                />
                              )}
                              aria-label="Contact select"
                            />
                          </div>
                          <div className="col-md-12 mt-3 text-end">
                            <LoadingButton
                              size="large"
                              variant="contained"
                              loading={btndisable}
                              loadingPosition="start"
                              fullWidth
                              onClick={handleConfirmClick}
                            >
                              <span>Confirm</span>
                            </LoadingButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySelect;

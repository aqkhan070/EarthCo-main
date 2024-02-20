import React, { useEffect, useState } from "react";
import logo1 from "../assets/images/background/earthco_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import TermsAndConditions from "../components/CommonComponents/TermsAndConditions";
import Privacypolicy from "../components/CommonComponents/Privacypolicy";
import Verification from "../components/CommonComponents/Verification";
import EventPopups from "../components/Reusable/EventPopups";
import LoaderButton from "../components/Reusable/LoaderButton";

const LoginPage = () => {
  const token = Cookies.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [resetEmail, setResetEmail] = useState("");
  const [resetRes, setResetRes] = useState("");
  const [resetError, setResetError] = useState("");

  const [fName, setFName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailSIn, setEmailSI] = useState("");
  const [passSignIn, setPassSignIn] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [reTypePass, setReTypePass] = useState("");
  const [signError, setSignError] = useState("");

  const [btndisable, setBtndisable] = useState(false);

  const [privacypolicy, setPrivacypolicy] = useState(false);

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setSignError("");
    setResetError("");
    setResetRes("");
  }, [
    email,
    password,
    resetEmail,
    fName,
    userName,
    emailSIn,
    passSignIn,
    lastName,
    address,
    phone,
    reTypePass,
  ]);

  const urlParams = new URLSearchParams(window.location.hash);
  const accessToken = urlParams.get("#access_token");
  useEffect(() => {
    const hash = window.location.hash;
    if (token) {
      // navigate(`/Dashboard`);
    }
    if (accessToken) {
      navigate(`/dashboard${hash}`);
      localStorage.setItem("access_token", accessToken);
    }
    // console.log("Full URL:", hash);
    // console.log("accessToken", accessToken);
  }, []);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setBtndisable(true);

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Account/Login",
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("login response", response.data);
      if (response.data.MultipleCompanies) {
        navigate("/company-select");
      } else {
        navigate("/dashboard");
      }
      if (response.data.status === "success") {
        // if (response.status === 200){
        Cookies.set("userEmail", email, { expires: 7 });
        Cookies.set(
          "userName",
          response.data.Data.FirstName + " " + response.data.Data.LastName,
          { expires: 7 }
        );
        Cookies.set("userRole", response.data.Data.RoleId, { expires: 7 });
        Cookies.set("userId", response.data.Data.UserId, { expires: 7 });
        Cookies.set("CompanyName", response.data.CompanyName, { expires: 7 });
        Cookies.set("CompanyId", response.data.CompanyId, { expires: 7 });
        Cookies.set("ProviderToken", response.data.ProviderToken, { expires: 7 });
        Cookies.set("UserEmailGoogle", response.data.UserEmail, { expires: 7 });
        setBtndisable(false);
        setError("");
        const token = response.data.token.data;
        Cookies.set("token", token, { expires: 7 });
        // Cookies.set("userData", response.data.Data, { expires: 7 });
        // console.log("login response iss", Cookies.get('token'))
        // console.log("login response is", response.data);
      } else {
        setError("Invalid email or password. Please try again.");
        setBtndisable(false);
      }
    } catch (error) {
      console.log("Error logging in:", error);
      if (error.message == "Network Error") {
        handlePopup(true, "error", "Login failed (Network Error)");
      } else if (error.response.status === 500) {
        handlePopup(true, "error", "Login failed (Server Side Error)");
      } else {
        handlePopup(true, "error", error.response.data);
      }
      setBtndisable(false);
    }
  };

  const [toggleVerification, setToggleVerification] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Account/ForgetPassword",
        {
          Email: resetEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResetRes(response.data.status);
      setToggleVerification(true);
      // document.getElementById("nav-personal-tab").click();

      console.log("Password reset request successful", response.data.status);
      handlePopup(true, "success", response.data.status);
    } catch (error) {
      // Handle any errors here
      console.error("Error:", error.response.data);
      setResetError(error.response.data);
      handlePopup(true, "error", error.response.data);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    if (passSignIn !== reTypePass) {
      setSignError("Passwords do not match.");
      return;
    }
    if (!privacypolicy) {
      setSignError(
        "Please Agree to the Privacy Policy and Terms and Conditions"
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Account/Register",
        {
          username: fName,
          FirstName: userName,
          LastName: lastName,
          Email: emailSIn,
          Password: passSignIn,
          Address: address,
          Phone: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      document.getElementById("backLogin").click();
      setFName("");
      setLastName("");
      setAddress("");
      setPhone("");
      console.log(response.data);
    } catch (error) {
      console.log("Error during registration:", error.response.data);
      setSignError(error.response.data);
    }
  };

  const handleChangePass2 = (e) => {
    const newPassword = e.target.value;
    setReTypePass(newPassword);

    // Check if the new password matches the previously entered password (passSignIn)
    if (newPassword !== passSignIn) {
      setSignError("Passwords do not match.");
    } else {
      setSignError(""); // Clear the error message if passwords match
    }
  };
  const clearInputs = () => {
    setError("");
    setSignError("");
    setEmailSI("");
    setFName("");
    setUserName("");
    setPassSignIn("");
    setReTypePass("");
  };

  const handlePopup = (open = false, color, text) => {
    setOpenSnackBar(open);
    setSnackBarColor(color);
    setSnackBarText(text);
  };

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
              minHeight: "100vh",
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

                <nav>
                  <div
                    className="nav nav-tabs border-bottom-0"
                    id="nav-tab"
                    role="tablist"
                  >
                    <div className="tab-content w-100" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-personal"
                        role="tabpanel"
                        aria-labelledby="nav-personal-tab"
                      >
                        <form
                          onSubmit={handleSubmitLogin}
                          action=""
                          className="dz-form pb-3"
                        >
                          <h3 className="form-title m-t0">
                            Personal Information
                          </h3>

                          <div className="dz-separator-outer m-b5">
                            <div className="dz-separator bg-primary style-liner"></div>
                          </div>
                          <p>Enter your e-mail address and your password. </p>
                          <div className="form-group mb-3">
                            <input
                              type="email"
                              placeholder="E-mail..."
                              className="form-control"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-group mb-3">
                            <input
                              type="password"
                              placeholder="Password..."
                              className="form-control"
                              required
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                              }}
                            />
                          </div>
                          {/* <h5 className="authError mb-2">{error}</h5> */}

                          <div className="form-group text-left mb-3 forget-main">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span className="form-check d-inline-block">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="check1"
                                  name="example1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="check1"
                                >
                                  Remember me
                                </label>
                              </span>
                              <button
                                style={{ padding: "0px" }}
                                className="nav-link btn tp-btn-light btn-primary forget-tab"
                                id="nav-forget-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-forget"
                                type="button"
                                role="tab"
                                aria-controls="nav-forget"
                                aria-selected="false"
                              >
                                Forget Password ?
                              </button>
                            </div>
                          </div>
                          <div className="text-center bottom">
                            <LoadingButton
                              size="large"
                              variant="contained"
                              loading={btndisable}
                              loadingPosition="start"
                              fullWidth
                              type="submit"
                            >
                              <span>Sign Me In</span>
                            </LoadingButton>
                          </div>
                        </form>
                        <button
                          style={{ width: "100%" }}
                          className="text-center nav-link btn tp-btn-light btn-primary forget-tab"
                          id="nav-sign-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-sign"
                          type="button"
                          role="tab"
                          aria-controls="nav-sign"
                          aria-selected="false"
                        >
                          Create an account
                        </button>
                      </div>

                      {/* Forgot password */}
                      <div
                        className="tab-pane fade"
                        id="nav-forget"
                        role="tabpanel"
                        aria-labelledby="nav-forget-tab"
                      >
                        {!toggleVerification && (
                          <form
                            className="dz-form"
                            onSubmit={handleForgotPassword}
                          >
                            <h3 className="form-title m-t0">
                              Forget Password?
                            </h3>

                            <div className="dz-separator-outer m-b5">
                              <div className="dz-separator bg-primary style-liner"></div>
                            </div>
                            <p>
                              Enter your e-mail address below to reset your
                              password.
                            </p>
                            <div className="form-group mb-4">
                              <input
                                name="dzName"
                                required
                                className="form-control"
                                placeholder="Email Address"
                                type="text"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                              />
                              {/* <div className="text-primary"> {resetRes}</div> */}
                              {/* <div className="text-danger">{resetError}</div> */}
                            </div>
                            <div className="form-group clearfix text-left">
                              <button
                                className="active btn btn-primary"
                                id="nav-personal-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-personal"
                                type="button"
                                role="tab"
                                aria-controls="nav-personal"
                                aria-selected="true"
                              >
                                Back
                              </button>
                              <button
                                className="btn btn-primary float-end"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        )}
                        {toggleVerification && (
                          <Verification
                            setToggleVerification={setToggleVerification}
                            resetEmail={resetEmail}
                            handlePopup={handlePopup}
                          />
                        )}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-sign"
                        role="tabpanel"
                        aria-labelledby="nav-sign-tab"
                      >
                        {/* signup form */}
                        {showPrivacyPolicy ? (
                          <Privacypolicy
                            setShowPrivacyPolicy={setShowPrivacyPolicy}
                          />
                        ) : (
                          <></>
                        )}
                        {showTerms ? (
                          <TermsAndConditions setShowTerms={setShowTerms} />
                        ) : (
                          <></>
                        )}
                        {showPrivacyPolicy || showTerms ? (
                          <></>
                        ) : (
                          <>
                            <form
                              className="dz-form py-2"
                              onSubmit={handleSubmitSignUp}
                            >
                              <h3 className="form-title">Sign Up</h3>
                              {signError && (
                                <Alert severity="error">
                                  {signError
                                    ? signError
                                    : "Error Adding Estimates"}
                                </Alert>
                              )}
                              <div className="dz-separator-outer m-b5">
                                <div className="dz-separator bg-primary style-liner"></div>
                              </div>
                              <p>Enter your personal details below: </p>
                              {/* <div className="form-group mt-3">
                          <input
                            name="fullName"
                            required
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                            className="form-control"
                            placeholder="Full Name"
                            type="text"
                          />
                        </div> */}
                              <div className="form-group mt-3">
                                <input
                                  name="userName"
                                  required
                                  value={userName}
                                  onChange={(e) => {
                                    setUserName(e.target.value);
                                    setSignError("");
                                  }}
                                  className="form-control"
                                  placeholder="First name"
                                  type="text"
                                />
                              </div>
                              <div className="form-group mt-3">
                                <input
                                  name="lastName"
                                  required
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  className="form-control"
                                  placeholder="Last Name"
                                  type="text"
                                />
                              </div>
                              <div className="form-group mt-3">
                                <input
                                  name="email"
                                  required
                                  value={emailSIn}
                                  onChange={(e) => {
                                    setEmailSI(e.target.value);
                                    setSignError("");
                                  }}
                                  className="form-control"
                                  placeholder="Email Address"
                                  type="email"
                                />
                              </div>
                              <div className="form-group mt-3">
                                <input
                                  name="password"
                                  required
                                  value={passSignIn}
                                  onChange={(e) => {
                                    setPassSignIn(e.target.value);
                                    setSignError("");
                                  }}
                                  className="form-control"
                                  placeholder="Password"
                                  type="password"
                                />
                              </div>
                              <div className="form-group mt-3 mb-2">
                                <input
                                  name="dzName"
                                  required
                                  value={reTypePass}
                                  onChange={handleChangePass2}
                                  className="form-control"
                                  placeholder="Re-type Your Password"
                                  type="password"
                                />
                              </div>

                              <div className="form-group mt-3">
                                <input
                                  name="address"
                                  required
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  className="form-control"
                                  placeholder="Address"
                                  type="text"
                                />
                              </div>
                              <div className="form-group mt-3">
                                <input
                                  name="phone"
                                  required
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="form-control"
                                  placeholder="Phone"
                                  type="text"
                                />
                              </div>

                              {/* <h4 className="authError mb-1">{signError}</h4> */}
                              {/* <div className="mb-3">
                          <span className="form-check float-start me-2 ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="check2"
                              name="example1"
                            />
                            <label
                              className="form-check-label d-unset"
                              htmlFor="check2"
                            >
                              I agree to the Terms of Service Privacy Policy
                            </label>
                          </span>
                        </div> */}
                              <br />
                              <span className="form-check d-inline-block">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="Terms"
                                  checked={privacypolicy}
                                  onChange={() => {
                                    setPrivacypolicy(!privacypolicy);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="check1"
                                >
                                  I agree to{" "}
                                  <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      // setShowPrivacyPolicy(true);
                                      navigate(`/privacy-policy`);
                                      // window.open(
                                      //   `/privacy-policy`,
                                      //   "_blank"
                                      // );
                                    }}
                                  >
                                    Privacy Policy
                                  </span>{" "}
                                  and{" "}
                                  <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      // setShowTerms(true);
                                      navigate(`/terms-and-conditions`);
                                      // window.open(
                                      //   `/terms-and-conditions`,
                                      //   "_blank"
                                      // );
                                    }}
                                  >
                                    Terms & Conditions
                                  </span>
                                </label>
                              </span>

                              <div className="form-group signBtns mt-3">
                                <button
                                  onClick={clearInputs}
                                  className="btn btn-primary outline gray"
                                  id="backLogin"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-personal"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-personal"
                                  aria-selected="true"
                                >
                                  Back
                                </button>
                                <button className="btn btn-primary float-end">
                                  Submit
                                </button>
                              </div>
                            </form>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

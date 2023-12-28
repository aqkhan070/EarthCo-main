import React, { useEffect, useState } from "react";
import logo1 from "../assets/images/background/earthco_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

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

  const navigate = useNavigate();

  useEffect(() => {
    setSignError("");
    setResetError("");
    setResetRes("");
    setError("");
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
      navigate(`/Dashboard${hash}`);
      localStorage.setItem("access_token", accessToken);
    }
    console.log("Full URL:", hash);
    console.log("accessToken", accessToken);
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

      if (response.data.status === "success") {
        // if (response.status === 200){
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userName", response.data.Data.FirstName);
        sessionStorage.setItem("userRole", response.data.Data.RoleId);
        sessionStorage.setItem("userId", response.data.Data.UserId);
        setBtndisable(false);
        setError("");
        const token = response.data.token.data;
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("userData", response.data.Data, { expires: 7 });
        // console.log("login response iss", Cookies.get('token'))
        console.log("login response is", response.data);

        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
        setBtndisable(false);
      }
    } catch (error) {
      console.log("Error logging in:", error);
      setError(error.response.data);
      setBtndisable(false);
    }
  };

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
      document.getElementById("nav-personal-tab").click();

      if (response.status === 200) {
        // Password reset request successful, you can display a success message or take other actions.
        console.log("Password reset request successful", response.data);
      } else {
        // Password reset request failed, display an error message.
        console.error("Password reset request failed:", response.data);
      }
    } catch (error) {
      // Handle any errors here
      console.error("Error:", error.response.data);
      setResetError(error.response.data);
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

  return (
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
                        {error && (
                          <Alert severity="error">
                            {error ? error : "Error Adding Estimates"}
                          </Alert>
                        )}
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
                      <form className="dz-form" onSubmit={handleForgotPassword}>
                        <h3 className="form-title m-t0">Forget Password?</h3>
                        {resetRes && (
                          <Alert severity="success">
                            {resetRes ? resetRes : "Error Adding Estimates"}
                          </Alert>
                        )}
                        {resetError && (
                          <Alert severity="error">
                            {resetError ? resetError : "Error Adding Estimates"}
                          </Alert>
                        )}
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
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-sign"
                      role="tabpanel"
                      aria-labelledby="nav-sign-tab"
                    >
                      {/* signup form */}
                      <form
                        className="dz-form py-2"
                        onSubmit={handleSubmitSignUp}
                      >
                        <h3 className="form-title">Sign Up</h3>
                        {signError && (
                          <Alert severity="error">
                            {signError ? signError : "Error Adding Estimates"}
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
                            id="check1"
                            name="Terms"
                            checked={privacypolicy}
                            onChange={() => {
                              setPrivacypolicy(!privacypolicy);
                            }}
                          />
                          <label className="form-check-label" htmlFor="check1">
                            I agree to{" "}
                            <span
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              data-bs-toggle="modal"
                              data-bs-target={`#privacyPolicy`}
                            >
                              Privacy Policy
                            </span>{" "}
                            and{" "}
                            <span
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              data-bs-toggle="modal"
                              data-bs-target={`#termsAndConditions`}
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
                      <div
                        className="modal fade"
                        id="privacyPolicy"
                        tabIndex="-1"
                        aria-labelledby="privacyPolicyLabel"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Privacy Policy</h5>

                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <h4>Introduction</h4>
                              <li>
                                Earthco Landscape ("we," "us," or "our")
                                operates Earthco Web Application
                                ("Application"). This Privacy Policy outlines
                                the types of information collected from users of
                                the Application and how we use, disclose, and
                                protect that information.
                              </li>
                              <h5 className="mb-0">Information We Collect</h5>
                              <div className="row">
                                <div className="col-md-1 text-end">&#9679;</div>
                                <div className="col-md-11">
                                  <strong>Personal Information:</strong> When
                                  you use the Application, we may collect
                                  certain personally identifiable information,
                                  such as names, email addresses, or other
                                  contact information voluntarily provided by
                                  users.
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-1 text-end">&#9679;</div>
                                <div className="col-md-11">
                                  <strong>Usage Data: </strong>: We may collect
                                  information on how the Application is accessed
                                  and used ("Usage Data"). This Usage Data may
                                  include information such as your computer's
                                  Internet Protocol address, browser type,
                                  browser version, pages visited, time and date
                                  of your visit, and other diagnostic data.
                                </div>
                              </div>

                              <h5 className="mb-0">Use of Information</h5>
                              <div className="row">
                                <div className="col-md-1 text-end">&#9679;</div>
                                <div className="col-md-11">
                                  We may use the collected information for
                                  various purposes, including but not limited to
                                  providing and maintaining the Application,
                                  improving user experience, sending updates or
                                  notifications, and analyzing usage trends.
                                </div>
                              </div>
                              <h5 className="mb-0">Data Security</h5>
                              <div className="row">
                                <div className="col-md-1 text-end">&#9679;</div>
                                <div className="col-md-11">
                                  EarthCo takes reasonable measures to secure
                                  and protect the information collected.
                                  However, no method of transmission over the
                                  internet or electronic storage is completely
                                  secure. We cannot guarantee absolute security
                                  of your data.
                                </div>
                              </div>

                              <h5 className="mb-0">
                                Disclosure of Information
                              </h5>
                              <div className="row">
                                <div className="col-md-1 text-end">&#9679;</div>
                                <div className="col-md-11">
                                  We do not disclose or share personal
                                  information except in cases required by law or
                                  to protect our rights or property.
                                </div>
                              </div>

                              <h5 className="mb-0">
                                Changes to This Privacy Policy
                              </h5>
                              <div className="row">
                                <div className="col-md-1 text-end">&#9679;</div>
                                <div className="col-md-11">
                                  We reserve the right to update or change our
                                  Privacy Policy at any time. Your continued use
                                  of the Application after we post any
                                  modifications to the Privacy Policy on this
                                  page will constitute your acknowledgment of
                                  the modifications and your consent to abide
                                  and be bound by the updated Privacy Policy.
                                </div>
                              </div>

                              <h5 className="mb-0">Contact Us</h5>
                              <div className="row">
                                <div className="col-md-1 text-end">&#9679;</div>
                                <div className="col-md-11">
                                  If you have any questions about this Privacy
                                  Policy, please contact us at [Contact
                                  Information]
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="modal fade"
                        id="termsAndConditions"
                        tabIndex="-1"
                        aria-labelledby="privacyPolicyLabel"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title">
                                Application Name: Earthco Web App
                              </h4>

                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>

                            <div className="modal-body">
                              <h5>
                                IMPORTANT: READ CAREFULLY BEFORE USING THE
                                APPLICATION
                              </h5>
                              <>
                                This End User License Agreement ("Agreement") is
                                a legal agreement between you (either an
                                individual or an entity) and Earthco Landscape
                                governing your use of Earthco Web Application
                                ("Application"). By accessing or using this
                                Application, you agree to be bound by the terms
                                and conditions of this Agreement.
                              </>
                              <div className="row mt-2">
                                <div className="col-md-1 text-end">1.</div>
                                <div className="col-md-11">
                                  {" "}
                                  <strong>License Grant: </strong>Earthco grants
                                  you a non-exclusive, non-transferable, limited
                                  license to use the Application solely for
                                  internal purposes in accordance with this
                                  Agreement.{" "}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-1 text-end">2.</div>
                                <div className="col-md-11">
                                  {" "}
                                  <strong>Restrictions: </strong>You shall not
                                  (a) sublicense, sell, rent, lease, or
                                  distribute the Application; (b) modify, adapt,
                                  translate, reverse engineer, decompile, or
                                  disassemble the Application; (c) remove any
                                  copyright, trademark, or other proprietary
                                  rights notices contained in or on the
                                  Application; (d) use the Application in any
                                  unlawful manner or for any illegal purpose;
                                  (e) use the Application to infringe upon any
                                  third-party rights; (f) use the Application to
                                  transmit viruses or any harmful code that may
                                  damage the Application or third-party systems.
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-1 text-end">3.</div>
                                <div className="col-md-11">
                                  {" "}
                                  <strong>Intellectual Property: </strong>
                                  Earthco retains all rights, title, and
                                  interest in and to the Application, including
                                  all intellectual property rights. This
                                  Agreement does not grant you any rights to
                                  patents, copyrights, trade secrets,
                                  trademarks, or any other rights in respect to
                                  the Application.
                                </div>
                              </div>{" "}
                              <div className="row">
                                <div className="col-md-1 text-end">4.</div>
                                <div className="col-md-11">
                                  {" "}
                                  <strong>Termination: </strong>This Agreement
                                  is effective until terminated. Earthco may
                                  terminate this Agreement at any time without
                                  notice if you fail to comply with any term of
                                  this Agreement. Upon termination, you must
                                  cease all use of the Application and destroy
                                  all copies of the Application in your
                                  possession or control.
                                </div>
                              </div>{" "}
                              <div className="row">
                                <div className="col-md-1 text-end">5.</div>
                                <div className="col-md-11">
                                  {" "}
                                  <strong>Disclaimer of Warranty: </strong>The
                                  Application is provided "as is" without any
                                  warranty, express or implied. Earthco
                                  disclaims all warranties and conditions with
                                  regard to the Application, including but not
                                  limited to, fitness for a particular purpose,
                                  merchantability, non-infringement, or
                                  accuracy.
                                </div>
                              </div>{" "}
                              <div className="row">
                                <div className="col-md-1 text-end">6.</div>
                                <div className="col-md-11">
                                  {" "}
                                  <strong>Limitation of Liability: </strong>no
                                  event shall Earthco be liable for any direct,
                                  indirect, incidental, special, consequential,
                                  or punitive damages arising out of or in any
                                  way connected with the use or inability to use
                                  the Application.
                                </div>
                              </div>{" "}
                              <div className="row">
                                <div className="col-md-1 text-end">7.</div>
                                <div className="col-md-11">
                                  {" "}
                                  <strong>Governing Law: </strong>This Agreement
                                  shall be governed by and construed in
                                  accordance with the laws of California,
                                  without regard to its conflict of law
                                  principles.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

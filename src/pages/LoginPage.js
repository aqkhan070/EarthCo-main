import React, { useState } from "react";
import logo1 from "../assets/images/background/earthco_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [resetEmail, setResetEmail] = useState("");

  const [fName, setFName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailSIn, setEmailSI] = useState("");
  const [passSignIn, setPassSignIn] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [reTypePass, setReTypePass] = useState("");
  const [signError, setSignError] = useState("");

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

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

      // if (response.data.status === "success") {
        if (response.status === 200){
        setError("");

        // console.log(response);
        navigate("/Dashboard"); // Navigation
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.log("Error logging in:", error);
      setError("An error occurred while logging in. Please try again later.");
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

      if (response.status === 200) {
        // Password reset request successful, you can display a success message or take other actions.
        console.log("Password reset request successful");
      } else {
        // Password reset request failed, display an error message.
        console.error("Password reset request failed:", response.data);
      }
    } catch (error) {
      // Handle any errors here
      console.error("Error:", error);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    if (passSignIn !== reTypePass) {
      setSignError("Passwords do not match.");
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

      if (response.data.status === "success") {
        // Registration successful, you can redirect the user to the dashboard or perform other actions
        setSignError("");
        console.log("Registration successful");
        // Redirect the user to the dashboard or other pages as needed.
      } else {
        // Registration failed, display an error message
        setSignError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Error during registration:", error);
      setSignError(
        "An error occurred during registration. Please try again later."
      );
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
          className="bg-white"
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
                            onChange={(e) => {setPassword(e.target.value); setError("")}}
                          />
                        </div>
                        <h5 className="authError mb-2">{error}</h5>
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
                          <button
                            className="btn btn-primary button-md btn-block"
                            type="submit"
                          >
                            Sign Me In
                          </button>
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
                            required=""
                            className="form-control"
                            placeholder="Email Address"
                            type="text"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                          />
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
                        <div className="dz-separator-outer m-b5">
                          <div className="dz-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your personal details below: </p>
                        <div className="form-group mt-3">
                          <input
                            name="fullName"
                            required=""
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                            className="form-control"
                            placeholder="Full Name"
                            type="text"
                          />
                        </div>
                        <div className="form-group mt-3">
                          <input
                            name="userName"
                            required=""
                            value={userName}
                            onChange={(e) => {
                              setUserName(e.target.value);
                              setSignError("");
                            }}
                            className="form-control"
                            placeholder="User Name"
                            type="text"
                          />
                        </div>
                        <div className="form-group mt-3">
                          <input
                            name="lastName"
                            required=""
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
                            required=""
                            value={emailSIn}
                            onChange={(e) => {
                              setEmailSI(e.target.value);
                              setSignError("");
                            }}
                            className="form-control"
                            placeholder="Email Address"
                            type="text"
                          />
                        </div>
                        <div className="form-group mt-3">
                          <input
                            name="password"
                            required=""
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
                            required=""
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
                            required=""
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
                            required=""
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            placeholder="Phone"
                            type="text"
                          />
                        </div>

                        <h4 className="authError mb-1">{signError}</h4>
                        <div className="mb-3">
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
                        </div>
                        <br />
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

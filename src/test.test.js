
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
                        {/* <button
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
                        </button> */}
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
  </>
)}

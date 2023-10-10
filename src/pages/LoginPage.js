import React from 'react';
import logo1 from '../assets/images/background/earthco_logo.png';

const LoginPage = () => {
  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-white"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <div className="login-form style-2" style={{ maxWidth: '500px' }}>
            <div className="card-body">
              <div className="logo-header">
                <img
                  src={logo1}
                  alt=""
                  className="width-230 light-logo"
                  style={{ width: '35%', marginLeft: '30%' }}
                />
                <img
                  src={logo1}
                  alt=""
                  className="width-230 dark-logo"
                  style={{ width: '35%', marginLeft: '30%' }}
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
                        onSubmit={(e) => {
                          e.preventDefault();
                          // Add logic for form submission here
                        }}
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
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            type="password"
                            placeholder="Password..."
                            className="form-control"
                            required
                          />
                        </div>
                        <h5 className="authError mb-2">{/* Display error here */}</h5>
                        <div className="form-group text-left mb-3 forget-main">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
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
                              style={{ padding: '0px' }}
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
                          <button className="btn btn-primary button-md btn-block" type="submit">
                            Sign Me In
                          </button>
                        </div>
                      </form>
                      <button
                        style={{ width: '100%' }}
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
                    <div
                      className="tab-pane fade"
                      id="nav-forget"
                      role="tabpanel"
                      aria-labelledby="nav-forget-tab"
                    >
                      <form className="dz-form">
                        <h3 className="form-title m-t0">Forget Password ?</h3>
                        <div className="dz-separator-outer m-b5">
                          <div className="dz-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your e-mail address below to reset your password. </p>
                        <div className="form-group mb-4">
                          <input
                            name="dzName"
                            required=""
                            className="form-control"
                            placeholder="Email Address"
                            type="text"
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
                          <button className="btn btn-primary float-end">Submit</button>
                        </div>
                      </form>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-sign"
                      role="tabpanel"
                      aria-labelledby="nav-sign-tab"
                    >
                      <form className="dz-form py-2" onSubmit={(e) => {
                        e.preventDefault();
                        // Add logic for sign up form submission here
                      }}>
                        <h3 className="form-title">Sign Up</h3>
                        <div className="dz-separator-outer m-b5">
                          <div className="dz-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your personal details below: </p>
                        <div className="form-group mt-3">
                          <input
                            name="fullName"
                            required=""
                            className="form-control"
                            placeholder="Full Name"
                            type="text"
                          />
                        </div>
                        <div className="form-group mt-3">
                          <input
                            name="userName"
                            required=""
                            className="form-control"
                            placeholder="User Name"
                            type="text"
                          />
                        </div>
                        <div className="form-group mt-3">
                          <input
                            name="email"
                            required=""
                            className="form-control"
                            placeholder="Email Address"
                            type="text"
                          />
                        </div>
                        <div className="form-group mt-3">
                          <input
                            name="password"
                            required=""
                            className="form-control"
                            placeholder="Password"
                            type="password"
                          />
                        </div>
                        <div className="form-group mt-3 mb-2">
                          <input
                            name="dzName"
                            required=""
                            className="form-control"
                            placeholder="Re-type Your Password"
                            type="password"
                          />
                        </div>
                        <h4 className="authError mb-1">{/* Display error here */}</h4>
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
                          <button onClick={() => { /* Add function to clear inputs here */ }} className="btn btn-primary outline gray" id='backLogin' data-bs-toggle="tab" data-bs-target="#nav-personal" type="button" role="tab" aria-controls="nav-personal" aria-selected="true">
                            Back
                          </button>
                          <button className="btn btn-primary float-end">Submit</button>
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
}

export default LoginPage;

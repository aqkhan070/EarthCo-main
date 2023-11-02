<form onSubmit={(e) => e.preventDefault()}>
        <div className="card mt-3">
          <div className="">
            <h4 className="modal-title itemtitleBar" id="#gridSystemModal">
              Customer Info
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-4 mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Company Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="CompanyName"
                  placeholder="Company Name"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="col-9">
                <div className="row">
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="FirstName"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="LastName"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="Email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="Address"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="Phone"
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      AltPhone
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="AltPhone"
                      placeholder="Alternate Phone"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Customer Fax
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="Fax"
                      placeholder="Customer Fax"
                      required
                    />
                  </div>
                  <div className="col-xl-4 mb-3">
                    <label className="form-label">Customer Type</label>
                    <Form.Select
                      size="md"
                      name="CustomerTypeId"
                      aria-label="Default select example"
                      id="inputState"
                      className="bg-white"
                    >
                      <option value="">Customer Type</option>
                    </Form.Select>
                  </div>

                  <div className="col-xl-4 mb-3">
                    <label className="form-label">Notes</label>
                    <textarea
                      name="Notes"
                      className="form-txtarea form-control form-control-sm"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div className="col-xl-12 mb-3 ">
                  <div className="form-check form-check-inline radio-margin">
                    <label className="form-check-label " htmlFor="inlineRadio1">
                      Allow Login:
                    </label>
                    <div className="form-check form-check-inline radio-margin-div">
                      <input
                        className="form-check-input ml-2 pl-2"
                        type="radio"
                        id="inlineRadio1"
                        value="Customer"
                        checked={allowLogin === true} // Check the "yes" radio button if allowLogin is true
                        onChange={() => {
                          setAllowLogin(true);
                        }}
                      />
                      <label
                        className="form-check-label allow-customer-login"
                        htmlFor="inlineRadio1"
                      >
                        yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        value="BillToServiceLocation"
                        checked={allowLogin === false} // Check the "no" radio button if allowLogin is false
                        onChange={() => {
                          setAllowLogin(false);
                        }}
                      />
                      <label
                        className="form-check-label allow-customer-login"
                        htmlFor="inlineRadio2"
                      >
                        no
                      </label>
                    </div>
                  </div>
                </div>
                {allowLogin && (
                  <div className="row">
                    <div className="col-xl-12 mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="UserName"
                        placeholder="User Name"
                        required
                      />
                    </div>
                    <div className="col-xl-12 mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        name="Password"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="col-xl-12 mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        name="ConfirmPassword"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
<div className="modal fade" id="basicModal2">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Add Service location</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="basic-form">
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="Name"
                            onChange={handleSLChange}
                            className="form-control form-control-sm"
                            placeholder="Name"
                            value={serviceLocations.Name}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                          Bill To
                        </label>
                        <div className="col-sm-9">
                          <div className="row">
                            <div className="col-5">
                              <input
                                className="form-check-input radio-margin-top"
                                type="radio"
                                name="isBilltoCustomer"
                                id="inlineRadio1"
                                onChange={handleSLChange}
                                value={true}
                                // checked={serviceLocations.isBilltoCustomer === true}
                              />
                              <label
                                className="form-check-label"
                                for="inlineRadio1"
                              >
                                Customer
                              </label>
                            </div>
                            <div className="col-7">
                              <input
                                className="form-check-input radio-margin-top"
                                type="radio"
                                name="isBilltoCustomer"
                                id="inlineRadio2"
                                onChange={handleSLChange}
                                value={false}
                                // checked={serviceLocations.isBilltoCustomer === false}
                              />
                              <label
                                className="form-check-label"
                                for="inlineRadio2"
                              >
                                This service Location
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                          Address
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            onChange={handleSLChange}
                            name="Address"
                            value={serviceLocations.Address}
                            className="form-control form-control-sm"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Phone</label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            onChange={handleSLChange}
                            value={serviceLocations.Phone}
                            name="Phone"
                            className="form-control form-control-sm"
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                          Alt Phone
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            name="AltPhone"
                            onChange={handleSLChange}
                            value={serviceLocations.AltPhone}
                            className="form-control form-control-sm"
                            placeholder="Alt Phone"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      id="closer"
                      className="btn btn-danger light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={addServiceLocation}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <form>
            <div className="card">
              <div className="">
                <h4 className="modal-title itemtitleBar" id="#gridSystemModal">
                  Service Locations
                </h4>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal2"
                  style={{ margin: "12px 20px" }}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  + Add Service Locations
                </button>

                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <div className="estDataBox">
                        <div className="table-responsive active-projects style-1">
                          <table id="empoloyees-tblwrapper" className="table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Alt Phone</th>
                                <th>Bill to Customer</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {slForm.map((slData, index) => (
                                <tr key={slData.ServiceLocationId}>
                                  <td>{slData.ServiceLocationId}</td>
                                  <td>{slData.Name}</td>
                                  <td>{slData.Address}</td>
                                  <td>{slData.Phone}</td>
                                  <td>{slData.AltPhone}</td>
                                  <td>
                                    {slData.isBilltoCustomer
                                      ? "Customer"
                                      : "Service Location"}
                                  </td>

                                  <td style={{ cursor: 'pointer' }}>
                                    
                                    <Create  onClick={() => {}}></Create>
                                    <Delete
                                      color="error"
                                      onClick={() =>
                                        handleDelete(slData.ServiceLocationId)
                                      }
                                    ></Delete>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
import React from "react";

const AddItem = ({setShowContent}) => {
  return (
    <>
      <div className=" add-item mr-2">
        <div className="card">
          <div className="card-header">Non-Inventory Item</div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Name / Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      value=""
                      required=""
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">
                      SKU
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      value=""
                      required=""
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Income Account
                    </label>
                    <div className="dropdown bootstrap-select default-select form-control wide w-100">
                      <select className="default-select form-control wide w-100">
                        <option selected="">Choose...</option>
                        <option value="1">United States</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-10">
                <hr className="mb-4" />
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="mb-3">Sale</h4>
                    <div className="form-check custom-checkbox mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="same-address"
                      />
                      <label className="form-check-label" htmlFor="same-address">
                        Used for Sales Transactions
                      </label>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Sales Description
                      </label>
                      <textarea
                        className="form-txtarea form-control"
                        rows="2"
                        id="comment"
                      ></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Sale Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        value=""
                        required=""
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Tax Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        value=""
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4 className="mb-3">Purchase</h4>
                    <div className="form-check custom-checkbox mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="save-info"
                      />
                      <label className="form-check-label" htmlFor="save-info">
                        Used for Purchase Transactions
                      </label>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Purchase Description
                      </label>
                      <textarea
                        className="form-txtarea form-control"
                        rows="2"
                        id="comment"
                      ></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Cost
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        value=""
                        required=""
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Purchase Tax Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        value=""
                        required=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-right">
               
                  <button type="button" className="btn btn-primary me-1">
                    Save
                  </button>
                
                
                  <button className="btn btn-danger light ms-1" onClick={() => {setShowContent(true)}}>Cancel</button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;

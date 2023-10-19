import React, { useState } from "react";

const AddEstimateForm = () => {
  const [itemForm, setItemForm] = useState({
    itemName: '',
    itemQty: '',
    itemDesc: '',
    rate: '',
    items: []
  });

  const addItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: itemForm.items.length + 1,
      name: itemForm.itemName,
      quantity: itemForm.itemQty,
      description: itemForm.itemDesc,
      rate: itemForm.rate,
      amount: Number(itemForm.itemQty) * Number(itemForm.rate),
      approved: false
    };

    setItemForm(prevState => ({
      ...prevState,
      items: [...prevState.items, newItem],
      itemName: '',
      itemQty: '',
      itemDesc: '',
      rate: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="card">
      <div className="card-body">

        {/* add item modal */}
        <div className="modal fade" id="basicModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={addItem}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Item</h5>
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
                          value={itemForm.itemName}
                          onChange={handleChange}
                          name="itemName"
                          className="form-control"
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">
                        Quantity
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          value={itemForm.itemQty}
                          onChange={handleChange}
                          name="itemQty"
                          className="form-control"
                          placeholder="Quantity"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">
                        Description
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-txtarea form-control"
                          value={itemForm.itemDesc}
                          onChange={handleChange}
                          name="itemDesc"
                          rows="3"
                          id="comment"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-3 col-form-label">Rate</label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          value={itemForm.rate}
                          onChange={handleChange}
                          name="rate"
                          className="form-control"
                          placeholder="Rate"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label className="col-sm-3 col-form-label">
                        Item Total
                      </label>
                      <div
                        className="col-sm-9"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <h5 style={{ margin: "0" }}>$100.00</h5> {/* This value should probably be calculated based on rate and quantity */}
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
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* item table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="estDataBox">
              <div className="itemtitleBar">
                <h4>Items</h4>
              </div>
              <button
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#basicModal"
                style={{ margin: "12px 20px" }}
              >
                + Add Items
              </button>
              <div className="table-responsive active-projects style-1">
                <table id="empoloyees-tblwrapper" className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Qty / Duration</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>Approved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemForm.items.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.quantity}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.rate}</td>
                        <td>{item.amount}</td>
                        <td>{item.approved ? 'Yes' : 'No'}</td>
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
  );
};

export default AddEstimateForm;

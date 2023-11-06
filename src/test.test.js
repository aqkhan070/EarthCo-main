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
                value={itemForm.Name}
                onChange={handleChange}
                name="Name"
                className="form-control form-control-sm"
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
                value={itemForm.Qty}
                onChange={handleChange}
                name="Qty"
                className="form-control form-control-sm"
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
                className="form-txtarea form-control form-control-sm"
                value={itemForm.Description}
                onChange={handleChange}
                name="Description"
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
                value={itemForm.Rate}
                onChange={handleChange}
                name="Rate"
                className="form-control form-control-sm"
                placeholder="Rate"
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label">Tax</label>
            <div className="col-sm-9">
              <Form.Select name="Tax" size="md" className="bg-white">
                <option value="option 1">
                  Non (Non-Taxable Sales)
                </option>
                <option value="option 2">Tax (Taxable Sales)</option>
                <option value="option 3">
                  LBR (Non-Taxable Labour)
                </option>
              </Form.Select>
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
              <h5 style={{ margin: "0" }}>
                {itemForm.Rate * itemForm.Qty}
              </h5>{" "}
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

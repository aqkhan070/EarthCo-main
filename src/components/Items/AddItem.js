import axios from "axios";
import React, { useEffect, useState } from "react";

const AddItem = ({selectedItem, setShowContent, headers }) => {

  const [formData, setFormData] = useState({});

  const getItem = async () => {
    try {
      const res = await axios.get(`https://earthcoapi.yehtohoga.com/api/Item/GetItem?id=${selectedItem}`,{headers});
      console.log("selectedItem iss", res.data);
      setFormData(res.data)
      
    } catch (error) {
      console.log("API call error", error);
      
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Parse values as numbers if the input type is "number"
    const parsedValue = type === "number" ? parseFloat(value) : value;
  
    // Update formData based on input type
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : parsedValue,
    }));
    console.log(formData);
  };

const submitData = async () => {
  try {
    const res = await axios.post(`https://earthcoapi.yehtohoga.com/api/Item/AddItem`,formData, {headers});
    console.log("successfuly posted item", res.data.Message);
    setShowContent(true)
  } catch (error) {
    console.log("api call error",error.response.data.Message);
    console.log("api call error2",error);
    
  }
};

useEffect(() => {
  getItem()
},[])

  return (
    <>
      <div className=" add-item mr-2">
        <div className="card">
          <div className="itemtitleBar">
            <h4>Non Inventory items</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="firstName" className="form-label">
                  Name / Number<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="ItemName"
                  value={formData.ItemName}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Item Name"
                />                
              </div>
              {/* <div className="col-md-3 mb-3">
                <label htmlFor="lastName" className="form-label">
                  SubItem of
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                />
               
              </div> */}
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Income Account<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formData.IncomeAccount}
                  onChange={handleChange}
                  name="IncomeAccount"
                  placeholder=""
                />
               
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName" className="form-label">
                  SKU
                </label>
                <input
                  type="text"
                  name="SKU"
                  value={formData.SKU}
                  onChange={handleChange}
                  className="form-control"
                  id="lastName"
                  placeholder=""
                />
               
              </div>

              <div className="col-md-10">
                <div  className="row">
                  <div className="col-md-6">
                    <h4 className="mb-3">Sale</h4>
                    <div className="form-check custom-checkbox mb-2">
                      <input
                        type="checkbox"
                        name="isSale"
                        value={formData.isSale}
                        onChange={handleChange}
                        className="form-check-input"
                        id="same-address"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="same-address"
                      >
                        Used for Sales Transactions
                      </label>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Sales Description
                      </label>
                      <textarea
                        className="form-txtarea form-control"
                        name="SaleDescription"
                        value={formData.SaleDescription}
                        onChange={handleChange}
                        rows="2"
                        id="comment"
                      ></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Sale Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="SalePrice"
                        value={formData.SalePrice}
                        onChange={handleChange}
                        placeholder="Sale Price"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Tax Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="SaleTaxCode"
                        value={formData.SaleTaxCode}
                        onChange={handleChange}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4 className="mb-3">Purchase</h4>
                    <div className="form-check custom-checkbox mb-2">
                      <input
                        type="checkbox"
                        name="isPurchase"
                        onChange={handleChange}
                        value={formData.isPurchase}
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
                        onChange={handleChange}
                        value={formData.PurchaseDescription}
                        name="PurchaseDescription"
                        id="comment"
                      ></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Cost
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        name="PurchasePrice"
                        value={formData.PurchasePrice}
                        placeholder="Purchase Price"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Purchase Tax Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="PurchareTaxCode"
                        onChange={handleChange}
                        value={formData.PurchareTaxCode}
                        placeholder="Purchace Tax code"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Expense Account<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="ExpenseAccount"
                        value={formData.ExpenseAccount}
                        onChange={handleChange}
                        placeholder="Expense Account"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-right">
                <button onClick={submitData} type="button" className="btn btn-primary me-1">
                  Save
                </button>

                <button
                  className="btn btn-danger light ms-1"
                  onClick={() => {
                    setShowContent(true);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;

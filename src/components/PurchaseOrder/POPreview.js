import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../../assets/images/logo/earthco_logo.png";
import { DataContext } from "../../context/AppData";


const POPreview = () => {

  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  
  const {POData} = useContext(DataContext);
  const [PoPreviewData, setPoPreviewData] = useState({})
  const fetchPo = async () => {
    if (POData.PurchaseOrderId === 0) {
    
      return;
    }

    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/GetPurchaseOrder?id=${POData.PurchaseOrderId}`,
        { headers }
      );
      setPoPreviewData(response.data)
     
      console.log("response.data.Data", response.data);

      console.log(" list is///////", response.data.Data);
    } catch (error) {
     
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchPo()
    console.log(POData)
  },[])

  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    // Calculate the total amount when previewData changes
    if (PoPreviewData && PoPreviewData.ItemData) {
      const total = PoPreviewData.ItemData.reduce(
        (accumulator, item) => accumulator + (item.Qty * item.Rate ),
        0
      );
      setTotalAmount(total);
    }
  }, [PoPreviewData]);

  if (!PoPreviewData || Object.keys(PoPreviewData).length === 0) {
    return <div>Loading...</div>;
  }



  return (
    <div className="card m-5">
    <div className="card-body">
    <div style={{ borderBottom: "5px solid #0394fc", margin:"1em 0em 3em 0em" }}></div>
      <div className="row">
        <div className="col-md-2">
          {" "}
          <img style={{ width: "70%" }} src={logo} alt="" />
        </div>
        <div className="col-md-7"></div>
        <div className="col-md-3">
          <h2>Purchase Order</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <h4>EarthCo</h4>
          <h6>{POData.CustomerName || ""}</h6>
        </div>
        <div className="col-md-5 "></div>
        <div className="col-md-1 p-0 m-0">
          <h6><strong>date</strong></h6>
        </div>
        <div className="col-md-2 p-0 m-0">
          <h6><strong>Expiration Date</strong></h6>
        </div>
        <div className="col-md-1 p-0 m-0">
          <h6><strong>Purchase Order#</strong></h6>
        </div>

        <div className="col-md-3">
          <h6>Customer Address</h6>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-2 p-0 m-0">
          <h6>{POData.Date}</h6>
        </div>
        <div className="col-md-2">
          <h6></h6>
        </div>
        <div className="col-md-1 p-0 m-0">
          <h6>{POData.PurchaseOrderNumber}</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <h4>Bill To</h4>
          <h6>address</h6>
        </div>
        <div className="col-md-3">
          <h4>Ship To</h4>
          <h6>address</h6>
        </div>
      </div>

      <table id="empoloyees-tblwrapper" className="table ">
        <thead className="table-header">
          <tr>
            <th>Description</th>
            <th>Qty / Duration</th>
            <th>Rate</th>

            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {PoPreviewData?.ItemData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.Description}</td>
                <td>{item.Qty}</td>
                <td>{item.Rate}</td>
                <td>{item.Amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="row ">

      <div className="col-md-8"></div>
      <div className="col-md-2"><h6>SubTotal:</h6></div>
      <div className="col-md-2"><h6>{totalAmount}</h6></div>
      <div className="col-md-8"></div>
      <div className="col-md-2"><h6>Discount:</h6></div>   <hr />
      <div className="col-md-8"></div>
      <div className="col-md-2"><h6>Total Amount:</h6></div>
      <div className="col-md-2"><h6>{totalAmount}</h6></div>            
   
    
      <div style={{ borderBottom: "5px solid #012a47", margin:"0em 0em 3em 0em" }}></div>

    </div>
  </div>
  )
}

export default POPreview
import React, { useContext, useEffect, useState } from "react";
import { RoutingContext } from "../../context/RoutesContext";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../../assets/images/logo/earthco_logo.png";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";


const EstimatePreview = () => {
  const { name, setName, fetchName } = useFetchCustomerName();

  const { estmPreviewId } = useContext(RoutingContext);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [previewData, setPreviewData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchEstimates = async () => {
    if (estmPreviewId === 0) {
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${estmPreviewId}`,
        { headers }
      );
      setPreviewData(response.data);
      console.log("selected estimate is", response.data);
      console.log("selected estimate is", previewData);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
 
    fetchEstimates();
  }, []);
  useEffect(() => {
    if (previewData && previewData.EstimateData) {
        fetchName(previewData.EstimateData.CustomerId);
    }
}, [previewData]);
  useEffect(() => {
    // Calculate the total amount when previewData changes
    if (previewData && previewData.EstimateItemData) {
      const total = previewData.EstimateItemData.reduce(
        (accumulator, item) => accumulator + item.Amount,
        0
      );
      setTotalAmount(total);
    }
  }, [previewData]);

  if (!previewData || Object.keys(previewData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
              <h1>Estimate</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <h4>EarthCo</h4>
              <h6>{name || ""}</h6>
            </div>
            <div className="col-md-5 "></div>
            <div className="col-md-1 p-0 m-0">
              <h6><strong>date</strong></h6>
            </div>
            <div className="col-md-2 p-0 m-0">
              <h6><strong>Expiration Date</strong></h6>
            </div>
            <div className="col-md-1 p-0 m-0">
              <h6><strong>Estimate#</strong></h6>
            </div>

            <div className="col-md-3">
              <h6>Customer Address</h6>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-2 p-0 m-0">
              <h6>{previewData.EstimateData.CreatedDate}</h6>
            </div>
            <div className="col-md-2">
              <h6></h6>
            </div>
            <div className="col-md-1 p-0 m-0">
              <h6>{previewData.EstimateData.EstimateNumber}</h6>
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
              {previewData.EstimateItemData.map((item, index) => {
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
    </>
  );
};

export default EstimatePreview;

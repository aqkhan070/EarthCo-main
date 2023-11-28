import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../../assets/images/logo/earthco_logo.png";
import { DataContext } from "../../context/AppData";
import formatDate from "../../custom/FormatDate";

const BillPreview = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { billData } = useContext(DataContext);

  const [billPreviewData, setBillPreviewData] = useState({});

  const getBill = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/GetBill?id=${billData.BillId}`,
        { headers }
      );

      console.log("selected bill is", res.data);
      setBillPreviewData(res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

    useEffect(() => {
        getBill()
        // console.log("billData", billData);
    },[])

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
      // Calculate the total amount when previewData changes
      if (billPreviewData && billPreviewData.ItemData) {
        const total = billPreviewData.ItemData.reduce(
          (accumulator, item) => accumulator + item.Qty * item.Rate,
          0
        );
        setTotalAmount(total);
      }
    }, [billPreviewData]);
  
    if (!billPreviewData || Object.keys(billPreviewData).length === 0) {
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
              <h1>Bill</h1>
            </div>
          </div>

          <div className="row">

            <div className="col-md-8">
              <table>
                <thead>
                  <tr><th> <h5>EarthCo</h5></th></tr>
                  
                </thead>
                <tbody>
                  <tr>
                    <td>
                    <h6>{billData.SupplierName || ""}</h6>
                    </td>
                  </tr>
                  <tr><td> <h6>{billPreviewData.Data.Address}</h6></td></tr>
                  <tr>
                    <td>
                       <h6><strong>Bill to</strong></h6>
                    </td>
                    <td>
                       <h6><strong>Ship to</strong></h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                       <h6><>{billPreviewData.Data.Address}</></h6>
                    </td>
                    <td>
                       <h6><>{billPreviewData.Data.Address}</></h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-md-4 text-right">
              <table style={{width:"100%"}}>
                <thead>
                  <tr>
                    <th> <h6>Date</h6> </th>
                    <th><h6>Expiration Date</h6> </th>
                    <th> <h6>Bill #</h6> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><h6>{formatDate(billPreviewData.Data.BillDate)}</h6></td>
                    <td><h6></h6></td>
                    <td><h6>{billPreviewData.Data.BillNumber}</h6></td>
                  </tr>
                </tbody>
              </table>
            </div>

            
          </div>
          <table id="empoloyees-tblwrapper" className="table ">
            <thead className="table-header">
              <tr>
                <th>Description</th>
                <th>Qty </th>
                <th>Rate</th>

                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {billPreviewData.ItemData.map((item, index) => {
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
          <div className="col-md-2"><h6>0{totalAmount}</h6></div>
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

export default BillPreview;

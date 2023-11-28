import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../../assets/images/logo/earthco_logo.png";
import { DataContext } from "../../context/AppData";
import formatDate from "../../custom/FormatDate";

const InvoicePreview = () => {
  const { InvoiceData } = useContext(DataContext);
  const [InvoicePreviewData, setInvoicePreviewData] = useState({});

  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchInvoice = async () => {
    if (InvoiceData.InvoiceId === 0) {
      return;
    }

    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Invoice/GetInvoice?id=${InvoiceData.InvoiceId}`,
        { headers }
      );
      setInvoicePreviewData(response.data);

      console.log("response.data.Data", response.data);

      console.log(" list is///////", response.data.Data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchInvoice();
    console.log(InvoiceData);
  }, []);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate the total amount when previewData changes
    if (InvoicePreviewData && InvoicePreviewData.ItemData) {
      const total = InvoicePreviewData.ItemData.reduce(
        (accumulator, item) => accumulator + item.Qty * item.Rate,
        0
      );
      setTotalAmount(total);
    }
  }, [InvoicePreviewData]);

  if (!InvoicePreviewData || Object.keys(InvoicePreviewData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="card m-5">
       <div className="card-body">
         <div
          style={{
            borderBottom: "5px solid #0394fc",
            margin: "1em 0em 3em 0em",
          }}
        ></div>
         <div className="row">
           <div className="col-md-2">
             {" "}
             <img style={{ width: "70%" }} src={logo} alt="" />
           </div>
           <div className="col-md-7"></div>
           <div className="col-md-3">
             <h1>Invoice</h1>
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
                 <h6>{InvoiceData.CustomerName || ""}</h6>
                 </td>
               </tr>
               <tr><td> <h6>{InvoicePreviewData.Data.Address}</h6></td></tr>
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
                    <h6><>{InvoicePreviewData.Data.Address}</></h6>
                 </td>
                 <td>
                    <h6><>{InvoicePreviewData.Data.Address}</></h6>
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
                 <th> <h6>Invoice #</h6> </th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td><h6>{formatDate(InvoiceData.IssueDate)}</h6></td>
                
                 <td> <h6>{InvoiceData.InvoiceNumber}</h6></td>
               </tr>
             </tbody>
           </table>
         </div>

         
       </div>
       <table id="empoloyees-tblwrapper" className="table ">
         <thead className="table-header">
           <tr>
             <th>Description</th>
             <th>Qty</th>
             <th>Rate</th>

             <th>Amount</th>
           </tr>
         </thead>
         <tbody>
         {InvoicePreviewData?.ItemData.map((item, index) => {
             return (
               <tr key={index}>
                 <td>{item.Description}</td>
                 <td>{item.Qty}</td>
                 <td>{item.Rate}</td>
                 <td>{item.Amount.toFixed(2)}</td>
               </tr>
             );
           })}
         </tbody>
       </table>
     </div>
     <div className="card-body">
           <div className="row">
       <div className="col-md-8"></div>
       <div className="col-md-2"><h6>SubTotal:</h6></div>
       <div className="col-md-2"><h6>{totalAmount.toFixed(2)}</h6></div>
       <div className="col-md-8"></div>
       <div className="col-md-2"><h6>Discount:</h6></div>   <hr />
       <div className="col-md-8"></div>
       <div className="col-md-2"><h6>Total Amount:</h6></div>
       <div className="col-md-2"><h6>{totalAmount.toFixed(2)}</h6></div>            
    
     
       <div style={{ borderBottom: "5px solid #012a47", margin:"1em 0em 3em 0em" }}></div>
       </div>
     </div>
   </div>
 </>
  )
}

export default InvoicePreview;

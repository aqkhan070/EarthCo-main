import axios from 'axios';
import React, { useEffect } from 'react'
import Cookies from "js-cookie";

const useDeleteFile = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
      };

    const deleteEstmFile = async (id) => {
        try {
          const res = await axios.get(
            `https://earthcoapi.yehtohoga.com/api/Estimate/DeleteEstimateFile?FileId=${id}`,
            { headers }
          );
         
          console.log("bill list is",  res.data);
        } catch (error) {
       
          console.log("api call error", error);
        }
      };

      const deleteSRFile = async (id) => {
        try {
          const res = await axios.get(
            `https://earthcoapi.yehtohoga.com/api/ServiceRequest/DeleteServiceRequestFile?FileId=${id}`,
            { headers }
          );
         
          console.log("bill list is",  res.data);
        } catch (error) {
       
          console.log("api call error", error);
        }
      };

      const deletePOFile = async (id) => {
        try {
          const res = await axios.get(
            `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/DeletePurchaseOrderFile?FileId=${id}`,
            { headers }
          );
         
          console.log("bill list is",  res.data);
        } catch (error) {
       
          console.log("api call error", error);
        }
      };

      const deleteBillFile = async (id) => {
        try {
          const res = await axios.get(
            `https://earthcoapi.yehtohoga.com/api/Bill/DeleteBillFile?FileId=${id}`,
            { headers }
          );
         
          console.log("bill list is",  res.data);
        } catch (error) {
       
          console.log("api call error", error);
        }
      };

      const deleteInvoiceFile = async (id) => {
        try {
          const res = await axios.get(
            `https://earthcoapi.yehtohoga.com/api/Bill/DeleteBillFile?FileId=${id}`,
            { headers }
          );
         
          console.log("bill list is",  res.data);
        } catch (error) {
       
          console.log("api call error", error);
        }
      };

      useEffect(() => {
        deleteEstmFile()
        deleteSRFile()
        deletePOFile()
        deleteBillFile()
        deleteInvoiceFile()
      }, [])
      
    
      


  return {deleteEstmFile, deleteSRFile, deletePOFile, deleteBillFile, deleteInvoiceFile}
}

export default useDeleteFile
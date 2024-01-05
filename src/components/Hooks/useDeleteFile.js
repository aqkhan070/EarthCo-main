import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const useDeleteFile = () => {
  const midPoint = "earthcoapi.yehtohoga.com"
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const deleteEstmFile = async (id, fetchEstimates) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/DeleteEstimateFile?FileId=${id}`,
        { headers }
      );

      console.log("bill list is", res.data);
      fetchEstimates();
    } catch (error) {
      console.log("api call error", error);
    }
  };

  const deleteSRFile = async (id, fetchSR) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/DeleteServiceRequestFile?FileId=${id}`,
        { headers }
      );
      fetchSR();

      console.log("bill list is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  const deletePOFile = async (id, fetchpoData) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/DeletePurchaseOrderFile?FileId=${id}`,
        { headers }
      );
      fetchpoData();

      console.log("bill list is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  const deleteBillFile = async (id, getBill) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/DeleteBillFile?FileId=${id}`,
        { headers }
      );
      getBill();
      console.log("bill list is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  const deleteInvoiceFile = async (id, getInvoice) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Invoice/DeleteInvoiceFile?FileId=${id}`,
        { headers }
      );

      getInvoice();

      console.log("bill list is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  
  const deleteReportFile = async (endPiont, id, getReport) => {
    try {
      const res = await axios.get(
        `https://${midPoint}/api/${endPiont}${id}`,
        { headers }
      );

      getReport();

      console.log("file delete res", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  return {
    deleteEstmFile,
    deleteSRFile,
    deletePOFile,
    deleteBillFile,
    deleteInvoiceFile,
    deleteReportFile,
  };
};

export default useDeleteFile;

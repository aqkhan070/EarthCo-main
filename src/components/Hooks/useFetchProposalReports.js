import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchProposalReports = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [loading, setLoading] = useState(true)
  const [reportError, setReportError] = useState(false)
  const [reportData, setReportData,] = useState([]);


  const fetchReport = async (customerId, year, month, type) => {
   
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Report/GetReportList?CustomerId=${customerId}&Year=${year}&Month=${month}&Type=${type}`,
        { headers }
      );
      setLoading(false)
      setReportData(res.data)
      console.log("proposal report data is", res.data);
    } catch (error) {
      setLoading(false)
      setReportError(true)

      console.log("report api call error", error);
    }
  };

  return {loading,reportError, reportData, setReportData, fetchReport };
};

export default useFetchProposalReports;

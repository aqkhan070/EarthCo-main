import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchDashBoardData = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [dashBoardData, setdashBoardData] = useState({
    EstimateData: [],
    ServiceRequestData: [],
  });

  const [loading, setLoading] = useState(true);

  const getDashboardData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Dashboard/GetDashboardData",
        { headers }
      );
      console.log("dashboard response is", response.data);
      setdashBoardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("API Call Error:", error);
      setLoading(false);
    }
  });

  const sendGoogleCode = async (code, callback = () => {}) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Dashboard/ExternalLoginCallback?code=${code}`,
      
        { headers }
      );
      callback()
      console.log("google api call success", res.data);
    } catch (error) {
      console.log("google api call error", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return { dashBoardData, getDashboardData, loading, sendGoogleCode };
};

export default useFetchDashBoardData;

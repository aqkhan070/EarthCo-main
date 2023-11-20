import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useGetEstimate = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [estimates, setEstimates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableError, setTableError] = useState(false);

  const getEstimate = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimateList",
        { headers }
      );
      console.log("estimate response is", response.data);
      setEstimates(response.data);
      if (response.data != null) {
        setIsLoading(false);
      }
    } catch (error) {
      setTableError(true);
      setTimeout(() => {
        setTableError(false);
      }, 4000);
      setIsLoading(false);
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    getEstimate();
  }, []);

  return { estimates, isLoading, tableError, getEstimate };
};

export default useGetEstimate;

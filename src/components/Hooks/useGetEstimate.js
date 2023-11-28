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
  const [estmRecords, setEstmRecords] = useState({})
  const [filterdEstm, setFilterdEstm] = useState([])
  const getEstimate = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimateList",
        { headers }
      );
      console.log("estimate response is", response.data);
      // setTableError(false)
      // setEstimates(response.data);
      // if (response.data != null) {
      //   setIsLoading(false);
      // }
    } catch (error) {
      // setTableError(true);
      // setTimeout(() => {
      //   setTableError(false);
      // }, 4000);
      // setIsLoading(false);
      console.error("API Call Error:", error);
    }
  };
  

  const getFilteredEstimate = async (pageNo = 1, PageLength = 10, StatusId = 0) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimateServerSideList?DisplayStart=${pageNo}&DisplayLength=${PageLength}&StatusId=${StatusId}`,
        { headers }
      );
      console.log("filter estimate response is", response.data);
      setTableError(false)
      setFilterdEstm(response.data.Data);
      setEstmRecords(response.data)
    
        setIsLoading(false);
 
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
    // getEstimate();
    getFilteredEstimate()
  }, []);

  return {estmRecords, estimates,filterdEstm, isLoading, tableError, getEstimate, getFilteredEstimate };
};

export default useGetEstimate;

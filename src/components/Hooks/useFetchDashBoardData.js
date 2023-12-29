import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchDashBoardData = () => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [dashBoardData, setdashBoardData] = useState({})

    const getDashboardData = async () => {
        try {
          const response = await axios.get(
            "https://earthcoapi.yehtohoga.com/api/Dashboard/GetDashboardData",
            { headers }
          );
          console.log("dashboard response is", response.data);
          setdashBoardData(response.data)
         
        } catch (error) {
         
          console.error("API Call Error:", error);
        }
      };

      useEffect(() => {
        getDashboardData()      
       
      }, [])
      

  return {dashBoardData, getDashboardData}
}

export default useFetchDashBoardData
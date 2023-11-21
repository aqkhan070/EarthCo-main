import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function useFetchPunchList() {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [punchData, setPunchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPunchList = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlistList",
        { headers }
      );
      setPunchData(response.data);
      console.log("response data is", response.data);
    //   console.log("punchData data is", punchData);
      setIsLoading(false);
    } catch (error) {
      console.error("API Call Error:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {

    fetchPunchList();
  }, []);

  useEffect(() => {    
    // fetchPunchList();
    // console.log("punchData data is", punchData);
  }, [punchData]); // This useEffect will run whenever punchData changes

  return { punchData, isLoading,fetchPunchList };
}

export default useFetchPunchList;

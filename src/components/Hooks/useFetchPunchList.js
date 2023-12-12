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
  const [totalRecords, setTotalRecords] = useState({});

  const fetchPunchList = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlistList",
        { headers }
      );
      // setPunchData(response.data);
      // console.log("response data is", response.data);
      //   console.log("punchData data is", punchData);
      // setIsLoading(false);
    } catch (error) {
      // console.error("API Call Error:", error);
      // setIsLoading(false);
    }
  };

  const fetchFilterdPunchList = async (
    Search = "",
    pageNo = 1,
    PageLength = 10,
    StatusId = 0,
    isAscending = false
  ) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlistServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}&StatusId=${StatusId}&isAscending=${isAscending}`,
        { headers }
      );
      setPunchData(response.data.Data);
      setTotalRecords(response.data);
      console.log("response punchList data is", response.data);
      //   console.log("punchData data is", punchData);
      setIsLoading(false);
    } catch (error) {
      console.error("API Call Error punchList:", error);
      setIsLoading(false);
      setPunchData([]);
    }
  };

  return {
    punchData,
    isLoading,
    fetchPunchList,
    totalRecords,
    fetchFilterdPunchList,
  };
}

export default useFetchPunchList;

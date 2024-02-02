import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


const useGetActivityLog = () => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
const [activityLogs, setActivityLogs] = useState([])
    const getLogs = async (id, type) => {
        try {
          const response = await axios.get(
            `https://earthcoapi.yehtohoga.com/api/Email/GetEmailActivityLogs?id=${id}&Type=${type}`,
            { headers }
          );
          console.log("Activity response is", response.data);
          setActivityLogs( response.data)
         
        } catch (error) {
         
          console.error("Activity API Call Error:", error);
        }
      };

  return {getLogs, activityLogs}
}

export default useGetActivityLog
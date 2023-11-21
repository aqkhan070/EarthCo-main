import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function useFetchServiceLocations() {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [serviceLocations, setServiceLocations] = useState([]);

  const fetchServiceLocations = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestList",{headers}
      );
      setServiceLocations(response.data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };
  useEffect(() => {

    fetchServiceLocations();
  }, []);

  return { serviceLocations,fetchServiceLocations };
}

export default useFetchServiceLocations;

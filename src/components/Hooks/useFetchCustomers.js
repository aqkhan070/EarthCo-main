import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function useFetchCustomers() {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [customers, setCustomers] = useState([]);


  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList",{headers}
      );
      setCustomers(response.data);
    
    } catch (error) {
      console.error("API Call Error:", error);
   
    }
  };
  useEffect(() => {

    fetchCustomers();
  }, []);

  return { customers,fetchCustomers};
}

export default useFetchCustomers;

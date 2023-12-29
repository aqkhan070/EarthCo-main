import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useCustomerSearch = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [customerSearch, setCustomerSearch] = useState([]);

  const fetchCustomers = async (e = "") => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetSearchCustomersList?Search=${e}`,
        { headers }
      );
      console.log("customers search list", res.data);
      setCustomerSearch(res.data);
    } catch (error) {
      console.log("customer search api error", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customerSearch, fetchCustomers };
};

export default useCustomerSearch;

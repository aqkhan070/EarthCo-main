import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchCustomerName = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [name, setName] = useState("");

  const fetchName = async (id) => {
    if (!id) {
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerNameById?id=${id}`,
        { headers }
      );
      setName(response.data);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  return { name, fetchName, setName };
};

export default useFetchCustomerName;

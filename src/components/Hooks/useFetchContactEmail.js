import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchContactEmail = () => {

    const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [contactEmail, setContactEmail] = useState([]);

  const fetchEmail = async (id) => {
    if (!id) {
       return 
    }
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerContactEmailById?id=${id}`,
        { headers }
      );
      console.log("email", res.data);
      setContactEmail(res.data);
    } catch (error) {
      console.log("customer search api error", error);
    }
  };
  useEffect(() => {
    fetchEmail();
  }, []);

  return { contactEmail, fetchEmail };
};

export default useFetchContactEmail
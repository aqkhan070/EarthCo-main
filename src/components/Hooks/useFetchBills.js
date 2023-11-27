import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


const useFetchBills = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const [billList, setBillList] = useState([]);
  const [loading, setLoading] = useState(true);
 const [billError, setBillError] = useState(false)

  const fetchBills = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/GetBillList`,
        { headers }
      );
      setBillError(false)
      setLoading(false);
      setBillList(res.data);
      console.log("bill list is",  res.data);
    } catch (error) {
      setLoading(false);
      setBillError(true)
      console.log("api call error", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return { billError, billList, loading, fetchBills };
};

export default useFetchBills;

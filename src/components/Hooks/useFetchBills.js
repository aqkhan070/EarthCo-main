import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


const useFetchBills = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const [billList, setBillList] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchBills = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/GetBillList`,
        { headers }
      );
      setLoading(false);
      setBillList(res.data);
    } catch (error) {
      setLoading(false);
      console.log("api call error", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return { billList, loading, fetchBills };
};

export default useFetchBills;

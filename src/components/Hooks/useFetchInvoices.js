import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchInvoices = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  

  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Invoice/GetInvoiceList`,
        { headers }
      );
      setInvoiceList(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log("Api call error");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return { invoiceList, loading, error, fetchInvoices };
};

export default useFetchInvoices;

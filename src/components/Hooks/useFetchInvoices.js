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
  const [totalRecords, setTotalRecords] = useState(0);
  const [filteredInvoiceList, setfilteredInvoiceList] = useState([]);

  const fetchFilterInvoice = async (
    Search = "",
    pageNo = 1,
    PageLength = 10,
    StatusId = 0,
    isAscending = false
  ) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Invoice/GetInvoiceServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}&StatusId=${StatusId}&isAscending=${isAscending}`,
        { headers }
      );
      setfilteredInvoiceList(res.data.Data);
      setTotalRecords(res.data.totalRecords);
      setError("");
      setLoading(false);
      console.log("purchase order", res.data);
    } catch (error) {
      setLoading(false);
      setfilteredInvoiceList([]);
      setError(error.message);
      console.log("api call error", error.message);
    }
  };

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Invoice/GetInvoiceList`,
        { headers }
      );
      setInvoiceList(res.data);
      // setError("")
      // setLoading(false);
      console.log(res.data);
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      console.log("Api call error");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoiceList,
    loading,
    error,
    fetchInvoices,
    fetchFilterInvoice,
    filteredInvoiceList,
    totalRecords,
  };
};

export default useFetchInvoices;

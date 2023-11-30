import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchPo = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [PoList, setPoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredPo, setFilteredPo] = useState([]);
  const [totalRecords, setTotalRecords] = useState({});
  const fetchPo = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/GetPurchaseOrderList`,
        { headers }
      );
      setPoList(res.data);
      // setLoading(false);
      // setError("")
      console.log("purchase order", res.data);
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      console.log("api call error", error.message);
    }
  };

  const fetchFilterPo = async (
    Search = "",
    pageNo = 1,
    PageLength = 10,
    StatusId = 0
  ) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/GetPurchaseOrderServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}&StatusId=${StatusId}`,
        { headers }
      );
      setFilteredPo(res.data.Data);
      setTotalRecords(res.data);
      setLoading(false);
      setError("");
      console.log("purchase order", res.data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setFilteredPo([]);
      console.log("api call error", error.message);
    }
  };

  useEffect(() => {
    fetchPo();
  }, []);

  return {
    PoList,
    loading,
    error,
    fetchPo,
    filteredPo,
    fetchFilterPo,
    totalRecords,
  };
};

export default useFetchPo;

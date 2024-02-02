import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DataContext } from "../../context/AppData";

const useGetEstimate = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { statusId, setStatusId } = useContext(DataContext);

  const [estimates, setEstimates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableError, setTableError] = useState(false);
  const [estmRecords, setEstmRecords] = useState({});
  const [filterdEstm, setFilterdEstm] = useState([]);

  const getEstimate = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimateList",
        { headers }
      );
      console.log("estimate response is", response.data);
      // setTableError(false)
      // setEstimates(response.data);
      // if (response.data != null) {
      //   setIsLoading(false);
      // }
    } catch (error) {
      // setTableError(true);
      // setTimeout(() => {
      //   setTableError(false);
      // }, 4000);
      // setIsLoading(false);
      console.error("API Call Error:", error);
    }
  };

  const getFilteredEstimate = async (
    Search = "",
    pageNo = 1,
    PageLength = 10,
    StatusId = statusId,
    isAscending = false,
    poFilter = 2,invoiceFilter= 2,billFilter= 2
  ) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimateServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}&StatusId=${StatusId}&isAscending=${isAscending}&isPurchaseOrder=${poFilter}&isBill=${billFilter}&isInvoice=${invoiceFilter}`,
        { headers }
      );
      console.log("filter estimate response is", response.data);
      setTableError(false);
      setFilterdEstm(response.data.Data);
      setEstmRecords(response.data);

      setIsLoading(false);
    } catch (error) {
      setTableError(true);
      setFilterdEstm([]);
      // setTimeout(() => {
      //   setTableError(false);
      // }, 4000);
      setIsLoading(false);
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    // getEstimate();
    getFilteredEstimate();
  }, []);

  return {
    estmRecords,
    estimates,
    filterdEstm,
    isLoading,
    tableError,
    getEstimate,
    getFilteredEstimate,
  };
};

export default useGetEstimate;

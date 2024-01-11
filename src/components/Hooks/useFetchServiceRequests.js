import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DataContext } from "../../context/AppData";

const useFetchServiceRequests = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { statusId, setStatusId } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState(true);
  const [serviceRequest, setserviceRequest] = useState([]);
  const [sRfetchError, setSRfetchError] = useState(true);
  const [sRFilterList, setSRFilterList] = useState([]);
  const [totalRecords, setTotalRecords] = useState({});

  const fetchFilterServiceRequest = async (
    Search = "",
    pageNo = 1,
    PageLength = 10,
    StatusId = statusId,
    isAscending = false
  ) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}&StatusId=${StatusId}&isAscending=${isAscending}`,
        { headers }
      );
      setSRfetchError(false);

      if (response.data != null) {
        setIsLoading(false);
      }
      setSRFilterList(response.data.Data);
      setTotalRecords(response.data);
      console.log("filter sr list", response.data);
    } catch (error) {
      console.log("EEEEEEEEEEEEEEEEE", error);
      setSRFilterList([]);
      setIsLoading(false);
    }
  };

  const fetchServiceRequest = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestList",
        { headers }
      );
      // setSRfetchError(false)

      // if (response.data != null) {
      //   setIsLoading(false);
      // }
      setserviceRequest(response.data);
      console.log("zzzzzzzzzzzzzzz", response.data);
    } catch (error) {
      console.log("EEEEEEEEEEEEEEEEE", error);

      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterServiceRequest();
  }, []);

  return {
    fetchServiceRequest,
    fetchFilterServiceRequest,
    totalRecords,
    sRFilterList,
    isLoading,
    serviceRequest,
    sRfetchError,
  };
};

export default useFetchServiceRequests;

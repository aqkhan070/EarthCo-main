import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";

const useFetchServiceRequests = () => {
   
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Bearer ${token}`,
      };
  const [isLoading, setIsLoading] = useState(true);
  const [serviceRequest, setserviceRequest] = useState([]);
  const [sRfetchError, setSRfetchError] = useState(true)
const [sRFilterList, setSRFilterList] = useState([])
  const [totalRecords, setTotalRecords] = useState({})

    const fetchFilterServiceRequest = async (pageNo = 1, PageLength = 10, StatusId = 0) => {

        try {
          const response = await axios.get(
            `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequestServerSideList?DisplayStart=${pageNo}&DisplayLength=${PageLength}&StatusId=${StatusId}`,
            { headers }
          );
          setSRfetchError(false)
    
          
    
    
          if (response.data != null) {
            setIsLoading(false);
          }
          setSRFilterList(response.data.Data);
          setTotalRecords(response.data)
          console.log("filter sr list", response.data);
        } catch (error) {
          console.log("EEEEEEEEEEEEEEEEE", error);
          
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
        fetchFilterServiceRequest()
      },[])


  return {fetchServiceRequest,fetchFilterServiceRequest,totalRecords, sRFilterList, isLoading, serviceRequest, sRfetchError }
}

export default useFetchServiceRequests
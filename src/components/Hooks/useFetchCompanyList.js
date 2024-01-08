import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

const useFetchCompanyList = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };
  const [companies, setCompanies] = useState([]);
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetCompanyList`,
        { headers }
      );
      setCompanies(res.data);
      console.log("company list is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  return { companies, fetchCompanies };
};

export default useFetchCompanyList;

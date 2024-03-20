import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const useFetchCatagories = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };
  const [catagories, setCatagories] = useState([])
  const fetchCatagories = async (text = "") => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Item/GetSearchAccountList?Search=${text}`,
        { headers }
      );
      setCatagories(res.data)
      console.log("Catagories list is", res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  return { fetchCatagories , catagories};
};

export default useFetchCatagories;

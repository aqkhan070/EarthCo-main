import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useSendEmail = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const sendEmail = async (Link, CustomerId, ContactId, isVendor) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Email/SendEmail?Link="https://earth-co.vercel.app${Link}"&CustomerId=${CustomerId}&ContactId=${ContactId}&isVendor=${isVendor}`,
        { headers }
      );

      console.log("Email response is", res.data);
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      console.log("api call error", error);
    }
  };

  return {
    sendEmail,
  };
};

export default useSendEmail;

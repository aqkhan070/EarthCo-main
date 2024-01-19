import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const useBulkActions = () => {
  const midPoint = "earthcoapi.yehtohoga.com";
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };
  const bulkActions = async (endPiont, payload, alert) => {
    console.log("delete payload", payload);
    try {
      const res = await axios.post(
        `https://${midPoint}/api/${endPiont}`,
        payload,
        {
          headers,
        }
      );
      if (payload.StatusId) {
        alert(true, "success", res.data, true);
      } else {
        alert(true, "error", res.data, true);
      }
      console.log("bulk delete res", res.data);
    } catch (error) {
      console.log("api call error", error);
      alert(true, "error", error.response.data, false);
    }
  };
  return { bulkActions };
};

export default useBulkActions;

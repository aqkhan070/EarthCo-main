import React, { useEffect, useState } from "react";
import TitleBar from "../TitleBar";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
import PunchTR from "./PunchTR";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import useFetchCustomers from "../Hooks/useFetchCustomers";
import useFetchServiceLocations from "../Hooks/useFetchServiceLocations";
import useFetchPunchList from "../Hooks/useFetchPunchList";
import { FormControl, Select, MenuItem } from "@mui/material";
import PunchListCards from "./PunchListCards";
import PunchListModal1 from "./PunchListModal1";
import PunchlistModal2 from "./PunchlistModal2";

const PunchListIndex = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { customers, fetchCustomers } = useFetchCustomers();
  const {
    punchData,
    isLoading,
    fetchPunchList,
    totalRecords,
    fetchFilterdPunchList,
  } = useFetchPunchList();

  const [staffData, setStaffData] = useState([]);
  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPL, setselectedPL] = useState(0);
  const [plDetailId, setPlDetailId] = useState(0);
  const [statusId, setStatusId] = useState(0);
  const [addPunchListData, setAddPunchListData] = useState({
    Title: "",
    ContactName: "",
    ContactCompany: "",
    ContactEmail: "",
    AssignedTo: "",
    CustomerId: null,
  });

  const fetchStaffList = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`,
        { headers }
      );
      setStaffData(response.data);

      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
    }
  };
  const fetchServiceLocations = async (id) => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerServiceLocation?id=${id}`,
        { headers }
      )
      .then((res) => {
        setSLList(res.data);
        console.log("service locations are", res.data);
      })
      .catch((error) => {
        setSLList([]);
        console.log("service locations fetch error", error);
      });
  };
  const fetctContacts = async (id) => {
    if(!id){return}
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerContact?id=${id}`,
        { headers }
      )
      .then((res) => {
        console.log("contacts data isss", res.data);
        setContactList(res.data);
      })
      .catch((error) => {
        setContactList([]);
        console.log("contacts data fetch error", error);
      });
  };

  useEffect(() => {
    fetchStaffList();
    fetchCustomers();
    // fetchPunchList();
    fetchFilterdPunchList();
  }, []);
  useEffect(() => {
    fetchServiceLocations(addPunchListData.CustomerId);
    fetctContacts(addPunchListData.CustomerId);
    console.log("main payload isss", addPunchListData);
  }, [addPunchListData]);

  useEffect(() => {
    // fetchPunchList();
    console.log("punchData data is", punchData);
  }, [punchData]); // This useEffect will run whenever punchData changes


  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.634 13.4211C18.634 16.7009 16.7007 18.6342 13.4209 18.6342H6.28738C2.99929 18.6342 1.06238 16.7009 1.06238 13.4211V6.27109C1.06238 2.99584 2.26688 1.06259 5.54763 1.06259H7.38096C8.03913 1.06351 8.65879 1.37242 9.05296 1.89951L9.88988 3.01234C10.2859 3.53851 10.9055 3.84834 11.5637 3.84926H14.1579C17.446 3.84926 18.6596 5.52309 18.6596 8.86984L18.634 13.4211Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M5.85754 12.2577H13.8646"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const toggleRow = () => {
    document.getElementById("subRow").classList.toggle("dispNone");
  };

  // if (isLoading) {
  //   <div className="center-loader">
  //     <CircularProgress />
  //   </div>;
  // }

  return (
    <>
      <TitleBar icon={icon} title="Punchlists" />
      <div className="container-fluid">
        <div className="row">
          <PunchListCards
            setStatusId={setStatusId}
            statusId={statusId}
            totalRecords={totalRecords}
          />
          {isLoading ? (
            <div className="center-loader">
              <CircularProgress />
            </div>
          ) : (
            <div className="col-xl-12">
              <div className="card">
                
                    <PunchTR
                      punchData={punchData}
                      fetchFilterdPunchList={fetchFilterdPunchList}
                      statusId={statusId}
                      totalRecords={totalRecords}
                      setselectedPL={setselectedPL}
                      setPlDetailId={setPlDetailId}
                      setAddPunchListData={setAddPunchListData}
                    />
                 
              </div>
            </div>
          )}
        </div>

        {/* modal */}

        <PunchListModal1
          plDetailId={plDetailId}
          selectedPL={selectedPL}
          fetchFilterdPunchList={fetchFilterdPunchList}
        />
        {/* modal2 */}
        <PunchlistModal2
          selectedPL={selectedPL}
          addPunchListData={addPunchListData}
      
          inputValue={inputValue}
          contactList={contactList}
          sLList={sLList}
          staffData={staffData}
          setInputValue={setInputValue}
          headers={headers}
          setAddPunchListData={setAddPunchListData}
          setselectedPL={setselectedPL}
          fetchFilterdPunchList={fetchFilterdPunchList}
        />
      </div>
    </>
  );
};

export default PunchListIndex;

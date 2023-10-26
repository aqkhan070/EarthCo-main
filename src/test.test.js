import React, { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import TitleBar from "../TitleBar";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import { Autocomplete, TextField } from '@mui/material';

const UpdateSRForm = ({serviceRequestId, setShowContent}) => {
  const [customers, setCustomers] = useState([]);

  const [sRList, setSRList] = useState({})

  const [SRData, setSRData] = useState({
    ServiceRequestData: {
      ServiceRequestId: serviceRequestId,
     
      CustomerId: 0,
      ServiceLocation: "",
      Contact: "",
      JobName: "",
      DueDate: "",
      SRTypeId: 0,
      SRStatusId: 0,
      Assign: "",
      WorkRequest: "",
      ActionTaken: "",
      CompletedDate: "",
      tblSRItems: [],
    },
  });

  const [itemInput, setItemInput] = useState({
    Name: "",
    Qty: 0,
    Description: "",
    Rate: 0,
  });
  const [tblSRItems, setTblSRItems] = useState([]);

  const [files, setFiles] = useState([]);
  const inputFile = useRef(null);


  const fetchSR = async () => {
    const response = await axios.get(
      `https://earthcoapi.yehtohoga.com/api/ServiceRequest/GetServiceRequest?id=${serviceRequestId}`
    );
    try {     

      setSRList(response.data)
      console.log(" list is///////", sRList);

    } catch (error) {
      console.error("API Call Error:", error);
    }

  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSRData((prevData) => ({
      ServiceRequestData: {
        ...prevData.ServiceRequestData,
        [name]:
          name === "CustomerId" || name === "SRTypeId" || name === "SRStatusId"
            ? Number(value)
            : value,
      },
    }));
    // console.log("object,,,,,,", SRData);
  };

  const submitHandler = async () => {
    const formData = new FormData();
    SRData.ServiceRequestData.tblSRItems = tblSRItems;

    formData.append(
      "ServiceRequestData",
      JSON.stringify(SRData.ServiceRequestData)
    );

   
    files.forEach((fileObj) => {
      formData.append("Files", fileObj);
    });

    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/ServiceRequest/AddServiceRequest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Handle successful submission
    } catch (error) {
      console.error("API Call Error:", error);
    }
    for (let [key, value] of formData.entries()) {
      console.log("filessss", key, value);
    }
  };

  const removeItem = (index) => {
    const newItems = [...tblSRItems];
    newItems.splice(index, 1);
    setTblSRItems(newItems);
  };

  const trackFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const addFile = () => {
    inputFile.current.click();
  };
  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );
    try {
      setCustomers(response.data);
      // console.log(response.data);
      console.log(customers);
      //   console.log("Custommer list is", customers[1].CustomerName);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  useEffect(() => {
    fetchSR();
    fetchCustomers();
  }, []);

 
  );

  // fileAdd

  return (
    <>
    all working fine
      
    </>
  );
};

export default UpdateSRForm;

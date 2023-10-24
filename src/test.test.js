import React, { useContext, useEffect, useRef, useState } from "react";
import StatusActions from "../StatusActions";
import { Form } from "react-bootstrap";
import { DataContext } from "../../context/AppData";
import { NavLink } from "react-router-dom";
import axios from "axios";

const data = {
  EstimateNumber: "2134",
  ServiceLocation: "12435",
  Email: "3245ytr@gmail.com",
  IssueDate: null,
  CustomerId: 6,
  EstimateStatusId: 3,
  CreatedBy: 6,
  EditBy: 6,
  ServiceLocationNotes: "123456",
  PrivateNotes: "1234567",
  EstimateNotes: "1234567",
  QBStatus: "2",
  isActive: true,
  tblEstimateItems: [
    {
      Name: "Name1",
      Description: "Description1",
      Qty: 2,
      Rate: 234,
      Address: "123456",
      CreatedBy: 2,
      EditBy: 2,
      isActive: true,
    },
    {
      Name: "Name2",
      Description: "Description2",
      Qty: 2,
      Rate: 2.5,
      Address: "Address2",
      CreatedBy: 2,
      EditBy: 2,
      isActive: true,
    },
    {
      Name: "Name3",
      Description: "Description3",
      Qty: 3,
      Rate: 2.5,
      Address: "Address3",
      CreatedBy: 2,
      EditBy: 2,
      isActive: true,
    },
  ],
};


const AddEstimateForm = () => {
  
  const [formData, setFormData] = useState({
   
      CustomerId: "",
      ServiceLocation: "",
      Email: "",
      EstimateNumber: "",
      IssueDate: "",
      EstimateNotes: "",
      ServiceLocationNotes: "",
      PrivateNotes: "",
      QBStatus: "",
      EstimateStatusId: "",
      tblEstimateItems: [],
    
  });
  const [itemForm, setItemForm] = useState({
    Name: "",
    Qty: "",
    Description: "",
    Rate: "",
  });

  const inputFile = useRef(null);
  const [Files, setFiles] = useState([]);

  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );
    try {
      setCustomers(response.data);
      //   console.log("Custommer list is", customers[1].CustomerName);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const mergedEstimateData = {
  ...formData,
  CreatedBy: 2,
  EditBy: 2,
  isActive: true,
  tblEstimateItems: [...formData.tblEstimateItems, itemForm],
};
console.log("mergedEstimateData:", mergedEstimateData);
console.log("data:", data);

    postData.append("EstimateData", JSON.stringify(mergedEstimateData));
    console.log(JSON.stringify(mergedEstimateData));
    // Appending files to postData
    Files.forEach((fileObj) => {
      postData.append('Files', fileObj);
    });

    submitData(postData);
};


  // const appendFilesToFormData = (formData) => {
  //   Files.forEach((fileObj) => {
  //     formData.append("Files", fileObj.actualFile);
  //   });
  // };

  const submitData = async (postData) => {
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Estimate/AddEstimate",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Data submitted successfully:", response.data);
      } else {
        console.log("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("API Call Error:", error);
    }

    // Logging FormData contents (for debugging purposes)
    for (let [key, value] of postData.entries()) {
      console.log("filessss", key, value);
    }
    // console.log("post data izzz",postData);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: formData.tblEstimateItems.length + 1,
      ...itemForm,
      Amount: Number(itemForm.Qty) * Number(itemForm.Rate),
      Approved: false,
    };
  
   
    // Clear itemForm fields after adding the new item
    setFormData(prevData => ({
      ...prevData,
      tblEstimateItems: [...prevData.tblEstimateItems, newItem],
    }));
  };
  

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      EstimateStatusId: value,
    }));
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const deleteItem = (id) => {
    const updatedArr = formData.tblEstimateItems.filter((object) => object.id !== id);
    setFormData((prevData) => ({
      ...prevData,
      tblEstimateItems: updatedArr,
    }));
  };

  const addFile = () => {
    inputFile.current.click();
    // console.log("Filesss are", Files);
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // const newFile = {
      // actualFile: uploadedFile,
      // name: uploadedFile.name,
      // caption: uploadedFile.name,
      // date: new Date().toLocaleDateString(),
      // };
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };

  // useEffect(() => {
  // console.log("Updated formData is:", formData);
  // }, [formData]);

  return (
    all good
  );
};

export default AddEstimateForm;

import React, { useContext, useEffect, useRef, useState } from "react";
import StatusActions from "../StatusActions";
import { Form } from "react-bootstrap";
import { DataContext } from "../../context/AppData";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AddEstimateForm = () => {
  const { estimateItems } = useContext(DataContext);

  const [itemObj, setItemObj] = useState(estimateItems);
  const [date, setDate] = useState("2023-09-10");

  const [itemForm, setItemForm] = useState({
    Name: "",
    Qty: "",
    Description: "",
    Rate: "",
    tblEstimateItems: [],
  });

  const inputFile = useRef(null);
  const [Files, setFiles] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    CustomerId: "",
    ServiceLocation: "",
    Email: "",
    EstimateNumber: "",
    IssueDate: "2023-09-10",
    EstimateNotes: "",
    ServiceLocationNotes: "",
    PrivateNotes: "",
    QBStatus: "",
    tblEstimateItems: [],
    Files: [],
  });

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

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: itemForm.tblEstimateItems.length + 1,
      name: itemForm.Name,
      quantity: itemForm.Qty,
      description: itemForm.Description,
      Rate: itemForm.Rate,
      amount: Number(itemForm.Qty),
      //   amount: Number(itemForm.Qty) * Number(itemForm.Rate),
      approved: false,
    };

    setItemForm((prevState) => ({
      ...prevState,
      tblEstimateItems: [...prevState.tblEstimateItems, newItem],
      Name: "",
      Qty: "",
      Description: "",
      Rate: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const deleteItem = (id) => {
    const updatedArr = itemObj.filter((object) => {
      return object.id !== id;
    });
    setItemObj(updatedArr);
  };

  const addFile = () => {
    inputFile.current.click();
    console.log("Filesss are", Files);
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newFile = {
        actualFile: uploadedFile,
        name: uploadedFile.name,
        caption: uploadedFile.name,
        date: new Date().toLocaleDateString(),
      };
      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      tblEstimateItems: [...formData.tblEstimateItems, ...itemForm.tblEstimateItems],
      Files: [...formData.Files, ...Files],
    };
    console.log("Updated formData within handleSubmit:", updatedFormData);
    setFormData(updatedFormData);
  };
  useEffect(() => {
    console.log("Updated formData is:", formData);
  }, [formData]);

  return (
    <div class="card">
      {/* all working fine */}
    </div>
  );
};

export default AddEstimateForm;

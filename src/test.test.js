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
      itemName: '',
      itemQty: '',
      itemDesc: '',
      rate: '',
      items: []
    });
    
    const inputFile = useRef(null);
    const [files, setFiles] = useState([]);


  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customer: '',
    serviceLocation: '',
    email: '',
    estimateNo: '',
    issuedDate: '2023-09-10',
    estimateNotes: '',
    serviceLocationNotes: '',
    privateNotes: '',
    orderId: '',
    items: [''],
    files: [''],
  });



  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );
    try {
      setCustomers(response.data);
      console.log("Custommer list is", customers[1].CustomerName);
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
      id: itemForm.items.length + 1,
      name: itemForm.itemName,
      quantity: itemForm.itemQty,
      description: itemForm.itemDesc,
      rate: itemForm.rate,
      amount: Number(itemForm.itemQty) * Number(itemForm.rate),
      approved: false
    };

    setItemForm(prevState => ({
      ...prevState,
      items: [...prevState.items, newItem],
      itemName: '',
      itemQty: '',
      itemDesc: '',
      rate: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prevState => ({ ...prevState, [name]: value }));
  };

  

  const deleteItem = (id) => {
    const updatedArr = itemObj.filter((object) => {
      return object.id !== id;
    });
    setItemObj(updatedArr);
  };

  const addFile = () => {
    inputFile.current.click();
    console.log("filesss are", files);
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newFile = {
        actualFile: uploadedFile, 
        name: uploadedFile.name,
        caption: uploadedFile.name,
        date: new Date().toLocaleDateString() 
      };
      setFiles(prevFiles => [...prevFiles, newFile]);
    }
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    setFormData(...formData, itemForm) // this line is sending error
    console.log(formData);
    // Send formData to backend or do other operations
  };



  return (
    <div class="card">
      {/* all working fine */}
    </div>
  );
};

export default AddEstimateForm;

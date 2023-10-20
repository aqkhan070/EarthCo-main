import React, { useContext, useEffect, useRef, useState } from "react";
import StatusActions from "../StatusActions";
import { Form } from "react-bootstrap";
import { DataContext } from "../../context/AppData";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AddEstimateForm = () => {
  const { estimateItems } = useContext(DataContext);
  

  const [itemObj, setItemObj] = useState(estimateItems);
  const [date, setDate] = useState();

  const [formData, setFormData] = useState({
    EstimateData: {
        CustomerId: "",
        ServiceLocation: "",
        Email: "",
        EstimateNumber: "",
        IssueDate: "",
        EstimateNotes: "",
        ServiceLocationNotes: "",
        PrivateNotes: "",
        QBStatus: "",
        EstimateStatusId:"",
        tblEstimateItems: [],
    },
    Files: [],
});
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

  function FileUploader() {
    const [file, setFile] = useState(null);
    const [postData, setPostData] = useState({
      title: '',
      description: ''
    });
  }


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

    if (Object.keys(formData.EstimateData).includes(name)) {
      setFormData(prevData => ({
        ...prevData,
        EstimateData: {
          ...prevData.EstimateData,
          [name]: value
        }
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
};


const submitData = async () => {
  const postData = new FormData();

  // Append the EstimateData as a stringified JSON
  postData.append('EstimateData', JSON.stringify({
    ...formData.EstimateData,
    tblEstimateItems: [
      ...formData.EstimateData.tblEstimateItems,
      ...itemForm.tblEstimateItems,
    ],
  }));

  // Append each file to the FormData
  Files.forEach((fileObj, index) => {
    postData.append(`Files[${index}]`, fileObj.actualFile);
  });

  try {
    const response = await axios.post(
      "https://earthcoapi.yehtohoga.com/api/Estimate/AddEstimate",
      postData
    );

   
  } catch (error) {
    console.error("API Call Error:", error);
  }
  console.log("postData",postData);
};




  useEffect(() => {
    fetchCustomers();
  }, []);

  const addItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: itemForm.tblEstimateItems.length + 1,
      Name: itemForm.Name,
      Description: itemForm.Description,
      Qty: Number(itemForm.Qty),
      Rate: Number(itemForm.Rate),
      Amount: Number(itemForm.Qty) * Number(itemForm.Rate),
      Approved: false, 
     
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

        
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        EstimateData: {
            ...prevData.EstimateData,
            EstimateStatusId: value
        }
    }));
}


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
    // console.log("Filesss are", Files);
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

  

  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      EstimateData: {
        ...formData.EstimateData,
        tblEstimateItems: [
          ...formData.EstimateData.tblEstimateItems,
          ...itemForm.tblEstimateItems,
        ],
      },
      Files: [...formData.Files, ...Files],
    };

    // console.log("Updated formData within handleSubmit:", updatedFormData);
    setFormData(updatedFormData);
    submitData()
  };
  useEffect(() => {
    // console.log("Updated formData is:", formData);
  }, [formData]);

  return (
    <div class="card">
      all working finee
    </div>
  );
};

export default AddEstimateForm;

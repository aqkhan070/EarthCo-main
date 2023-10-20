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
    const postData = {
        EstimateData: {
            ...formData.EstimateData,
            tblEstimateItems: [...formData.EstimateData.tblEstimateItems, ...itemForm.tblEstimateItems],
        },
        Files: [...formData.Files, ...Files],
    };
    console.log("object finalllll",postData)  ;
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Estimate/AddEstimate",
        postData
      );

      if (response.status === 200) {
        console.log("Data submitted successfully:", response.data);
      } else {
        console.log("Error submitting data:", response.statusText);
      }
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
      <div className="card-body">
        <div className="row">
          <div className="basic-form col-md-6">
            <div className="row">
              <div className="col-md-8 mb-3">
                <div className="row statusRow">
                <div className="col-lg-4 col-md-12 mb-2" style={{ minWidth: '150px' }}>
                <Form.Select aria-label="Default select example" value={formData.EstimateData.EstimateStatusId} size="md" id="inlineFormCustomSelect">
                    <option value={1}>Open</option>
                    <option value={2}>Approved</option>
                    <option value={3}>Closed Billed</option>
                </Form.Select>
                
            </div>
            
                </div>
              </div>
            </div>
            
          </div>
          
        </div>

       

        

        <div class="mb-2 row text-end">
          <div className="flex-right">
            <button
              type="button"
              class="btn btn-primary me-1"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <NavLink to="/Dashboard/Estimates">
              <button class="btn btn-danger light ms-1">Cancel</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEstimateForm;

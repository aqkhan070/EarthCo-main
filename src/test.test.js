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
  const [files, setFiles] = useState()

  const [customers, setCustomers] = useState([]);



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

 

    setItemForm(prevState => ({
      ...prevState,
      items: [...prevState.items, newItem],
      itemName: '',
      itemQty: '',
      itemDesc: '',
      rate: ''
    }));
  };

  
 

  const addFile = () => {
    inputFile.current.click();
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newFile = {
        name: uploadedFile.name,
        caption: uploadedFile.name,  // Assuming caption is the file name for simplicity
        date: new Date().toLocaleDateString() // Get current date
      };
      setFiles(prevFiles => [...prevFiles, newFile]);
    }
  };

  



  return (
    <div class="card">
      <div className="card-body">
        
                
          

       
                        {/* Files */}
                        <div className="card">
      <div className="card-body p-0">
        <div className="estDataBox">
          <div className="itemtitleBar">
            <h4>Files</h4>
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ margin: "12px 20px" }}
            onClick={addFile}
          >
            + Add File
          </button>
          <input
            type="file"
            ref={inputFile}
            onChange={trackFile}
            style={{ display: "none" }}
          />
          <div className="table-responsive active-projects style-1">
            <table id="empoloyees-tblwrapper" className="table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Caption</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.name}</td>
                    <td>{file.caption}</td>
                    <td>{file.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

      
        
      </div>
    </div>
  );
};

export default AddEstimateForm;

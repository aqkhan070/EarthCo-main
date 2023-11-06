import React, { useContext, useEffect, useState } from "react";
import CustomerTR from "./CustomerTR";
import { Link } from "react-router-dom";
import axios from "axios";
import "datatables.net";
import CustomerModal from "../Modals/CustomerModal";
import { CustomerContext } from "../../context/CustomerData";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from '@mui/material/Alert';


const CustomersTable = () => {
  const { selectedCustomer } = useContext(CustomerContext);
  const [customers, setCustomers] = useState([]);
  const [customerAddSuccess, setCustomerAddSuccess] = useState(false)

  const [isLoading, setIsLoading] = useState(true);


  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
      );
      setCustomers(response.data);
      if (response.data != null) {
        setIsLoading(false);
      }

    }catch(error){
      console.log("EEEEEEEEEEEEEEEEE",error);
      if(error.response.status === 404){
        setIsLoading(false);

      }
      else{
        console.error("API Call Error:", error);

      }

    }
  };


  useEffect(() => {
    fetchCustomers();
   
  }, []);


  
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card">
          <div className="mt-3">
            {customerAddSuccess && <Alert severity="success">Customer Added/Updated Successfuly</Alert>}
        
          </div>
          
          
          <div className="card-body">

          {isLoading ? (
                  <div className="center-loader">
                    <CircularProgress style={{ color: "#789a3d" }} />
                  </div>
                ) : (
                  <div>
                     <CustomerTR customers={customers} setCustomerAddSuccess={setCustomerAddSuccess} fetchCustomers={fetchCustomers}/>
                  </div>
                )}
           
           
          </div>
        </div>
      </div>

      {/* #modal */}

      <div
        className="modal fade bd-example-modal-lg"
        tabIndex="-1"
        id="customerShow"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Customer</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body longModal">
              {selectedCustomer ? <CustomerModal /> : "Loading Please Wait..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;

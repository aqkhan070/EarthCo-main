import React, { useContext, useEffect, useState } from "react";
import CustomerTR from "./CustomerTR";
import { Link } from "react-router-dom";
import axios from "axios";
import "datatables.net";
import CustomerModal from "../Modals/CustomerModal";
import { CustomerContext } from "../../context/CustomerData";

const CustomersTable = () => {
  const { selectedCustomer } = useContext(CustomerContext);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );try {
      setCustomers(response.data);

    }catch(error){
      console.error("API Call Error:", error);

    }
  };


  useEffect(() => {
    fetchCustomers();
   
  }, []);


  
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card">
          
          <div className="card-body">
           
            <CustomerTR customers={customers}/>
          </div>
        </div>
      </div>

      {/* #modal */}

      <div
        className="modal fade bd-example-modal-lg"
        tabindex="-1"
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

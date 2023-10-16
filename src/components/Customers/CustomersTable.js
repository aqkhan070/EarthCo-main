import React, { useContext, useEffect, useState } from "react";
import CustomerTR from "./CustomerTR";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import CustomerModal from "../Modals/CustomerModal";
import { CustomerContext } from "../../context/CustomerData";
// import { DataContext } from "../../context/AppData";

const CustomersTable = () => {
  const { selectedCustomer } = useContext(CustomerContext);
  // const {customers, setCustomers} = useContext(DataContext)
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );try {
      setCustomers(response.data);
      // console.log("Custommers main",customers);

    }catch(error){
      console.error("API Call Error:", error);

    }
  };
  // const handleSearch = (e) => {
  //   const query = e.target.value;
  //   setSearchTerm(query);

    
  //   const filteredCustomers = customers.filter(
  //     (customer) =>
  //       customer.CustomerName.toLowerCase().includes(query.toLowerCase()) // Assuming the customer has a name property
   
  //   );

  //   setCustomers(filteredCustomers);
  // };

  // tanstack table

  useEffect(() => {
    fetchCustomers();
   
    // $('#customerTbl').DataTable();
  }, []);

  useEffect(() => {
    if (customers[0] !== undefined) {
      // $('#customerTbl').DataTable();
    }
  }, [customers]);

  // const renderedCustomers = customers.map((customer, index) => {
  //   return (
  //     <tr>
  //       <td>{index + 1}</td>
  //       <td>
  //         <div className="products">
  //           <div>
  //             <h6>{customer.CustomerName}</h6>
  //           </div>
  //         </div>
  //       </td>
  //       <td><span>{customer.ContactName}</span></td>
  //       <td><span>{customer.ContactCompany}</span></td>
  //       <td>
  //         <span className="text-primary">{customer.ContactEmail}</span>
  //       </td>
  //       <td>
  //         <div className="badgeBox ">
  //           {/* <button
  //             type="button"
  //             onClick={(e) => setSelectedCustomer(customer)}
  //             className="dispContents"
  //             data-toggle="modal"
  //             data-target="#customerShow"
  //           >
  //             <span className="actionBadge badge-success light border-0">
  //               <span className="material-symbols-outlined">visibility</span>
  //             </span>
  //           </button> */}
  //           <span className="actionBadge badge-danger light border-0 badgebox-size">
  //             <span className="material-symbols-outlined badgebox-size ">delete</span>
  //           </span>
  //         </div>
  //       </td>
  //     </tr>
  //   );
  // });
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card">
          <div className="card-header">
            
            {/* <div className="form-group row ">
              <label htmlFor="searchInput" className="col-sm-4 col-form-label search-Lable">
                Search:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  id="searchInput"
                  className="form-control customer-search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Enter customer name..."
                />
              </div>
            </div> */}
            
            <div>
              <Link to="/Dashboard/Customers/Add-Customer">
                <button className="btn btn-primary btn-sm" role="button">
                  + Add Customer
                </button>
              </Link>
            </div>
          </div>
          <div className="card-body">
            {/* <table id="customerTbl" className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Name </th>
                  <th>Contact Name</th>
                  <th>Contact Company </th>
                  <th>Contact E-mail</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderedCustomers}</tbody>
            </table> */}

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

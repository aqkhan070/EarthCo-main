import React, { useContext, useEffect, useState } from "react";
// import CustomerTR from "./CustomerTR";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import CustomerModal from "../Modals/CustomerModal";
import { CustomerContext } from "../../context/CustomerData";
import { DataContext } from "../../context/AppData";

const CustomersTable = () => {
  const { selectedCustomer } = useContext(CustomerContext);
  // const {customers, setCustomers} = useContext(DataContext)
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://earthcoapi.yehtohoga.com/api/Customer/GetCustomersList"
    );
    setCustomers(response.data);
    // console.log(customers);
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    
    // You might want to get all customers data from the original source or store
    // them in another state variable, then filter them based on the query.
    // For the sake of this example, let's assume you have allCustomers which always contains
    // all customers data and `customers` which gets updated based on the search term.
    const filteredCustomers = customers.filter(
      (customer) =>
        customer.CustomerName.toLowerCase().includes(query.toLowerCase()) // Assuming the customer has a name property
        // Add more conditions if needed, for example:
        // || customer.email.toLowerCase().includes(query.toLowerCase())
        );
        

    setCustomers(filteredCustomers);
  };

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

  const renderedCustomers = customers.map((customer, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>
          <div className="products">
            <div>
              <h6>{customer.CustomerName}</h6>
            </div>
          </div>
        </td>
        <td>{/* <span>{contact.contactName}</span> */}</td>
        <td>{/* <span>{customer.companyName}</span> */}</td>
        <td>
          {/* <span className="text-primary">{customer.tblContants[0].FirstName}</span> */}
        </td>
        <td>
          <div className="badgeBox">
            {/* <button
              type="button"
              onClick={(e) => setSelectedCustomer(customer)}
              className="dispContents"
              data-toggle="modal"
              data-target="#customerShow"
            >
              <span className="actionBadge badge-success light border-0">
                <span className="material-symbols-outlined">visibility</span>
              </span>
            </button> */}
            <span className="actionBadge badge-danger light border-0">
              <span className="material-symbols-outlined">delete</span>
            </span>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive active-projects style-1">
                <div className="tbl-caption mb-3">
                  <h4 className="heading mb-0 customer-heading">Customers</h4>
                  <div>
                    <Link to="/Dashboard/Customers/Add-Customer">
                      <button className="btn btn-primary btn-sm" role="button">
                        + Add Customer
                      </button>
                    </Link>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search for a customer..."
                  />
                </div>
                <table id="customerTbl" className="table">
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
                </table>
              </div>
            </div>
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

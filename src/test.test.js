import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateCustomer = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const customerId = location.state?.customerId;







  return (
    <div className="container-fluid">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="card">
          <div className="card-header">
            <h4 className="modal-title" id="#gridSystemModal">
              Customer Info {customerId}
            </h4>
          </div>
          
        </div>
      </form>

      

      {/* Contacts Table */}

      
    </div>
  );
};

export default UpdateCustomer;

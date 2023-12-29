import React, { useEffect, useState } from "react";
// import useFetchServiceRequests from "../Hooks/useFetchServiceRequests";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TableRow,
  TableSortLabel,
  Button,
  TablePagination,
  TableContainer,
  Checkbox,
  Paper,
} from "@mui/material";
import { Form } from "react-bootstrap";
import formatDate from "../../custom/FormatDate";
import TblDateFormat from "../../custom/TblDateFormat";
import { NavLink, useNavigate } from "react-router-dom";

const DashBoardSR = ({ dashBoardData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(",,,,,,,,,,", dashBoardData);
  });

  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h4 style={{ color: "white" }}>Service Requests</h4>
      </div>

      <TableContainer>
        <Table>
          <TableHead className="table-header">
            <TableRow className="material-tbl-alignment">
              <TableCell>Customer Name</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Service Request #</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Work Requested</TableCell>
              <TableCell>Date Created </TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashBoardData.ServiceRequestData?.map((customer, rowIndex) => (
              <TableRow
                className="material-tbl-alignment"
                onClick={() => {
                  // setServiceRequestId(customer.ServiceRequestId);
                  // setShowContent(false);
                  // console.log("////////", serviceRequestId);
                  navigate(
                    `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                  );
                }}
                key={rowIndex}
                hover
              >
                <TableCell>{customer.CustomerName}</TableCell>
                <TableCell>{customer.Assign}</TableCell>
                <TableCell>{customer.ServiceRequestNumber}</TableCell>
                <TableCell>
                  <span
                    style={{
                      backgroundColor: customer.StatusColor,
                    }}
                    className="badge badge-pill "
                  >
                    {customer.Status}
                  </span>
                </TableCell>
                <TableCell>{customer.WorkRequest}</TableCell>
                <TableCell>{TblDateFormat(customer.CreatedDate)}</TableCell>
                <TableCell>{customer.Type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DashBoardSR;

import React, { useEffect, useState } from 'react'
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
import formatDate from '../../custom/FormatDate';


const DashBoardSR = ({ dashBoardData }) => {

  useEffect(() => {
    console.log(",,,,,,,,,,", dashBoardData);
  })

  return (
    <div className='card'>
      <div className="card-header bg-primary">
        <h4 style={{ color: "white" }}>Service Requests</h4>
      </div>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="table-header">
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
              <TableRow key={rowIndex} hover>

                <TableCell>{customer.CustomerName}</TableCell>
                <TableCell>{customer.Assign}</TableCell>
                <TableCell>{customer.ServiceRequestNumber}</TableCell>
                <TableCell><span class="badge badge-pill badge-success ">{customer.Status}</span></TableCell>
                <TableCell>{customer.WorkRequest}</TableCell>
                <TableCell>{formatDate(customer.CreatedDate)}</TableCell>
                <TableCell>{customer.Type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>




    </div>
  )
}

export default DashBoardSR
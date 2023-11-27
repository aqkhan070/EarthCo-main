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


const DashBoardSR = ({dashBoardData}) => {

  useEffect(() => {
    console.log(",,,,,,,,,,",dashBoardData);
  })
 
  return (
    <div className='card'>
      <div className="card-header">
        <h4>Service Requests</h4>
      </div>
       
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow className="table-header">
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Service Request#</TableCell>
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
                          <TableCell>{customer.Status}</TableCell>
                          <TableCell>{customer.WorkRequest}</TableCell>
                          <TableCell>{customer.CreatedDate}</TableCell>                         
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
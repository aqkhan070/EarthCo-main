import React, { useEffect, useState } from "react";
import useGetEstimate from "../Hooks/useGetEstimate";
import { Form } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  TablePagination,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const DashboardEstm = ({ dashBoardData }) => {
  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h4 style={{ color: "white" }}>Estimates</h4>
      </div>

      <TableContainer>
        <Table>
          <TableHead className="table-header">
            <TableRow className="material-tbl-alignment">
              <TableCell>Customer Name</TableCell>
              <TableCell>Assign to</TableCell>
              <TableCell>Estimate #</TableCell>
              <TableCell>Estimate Amount</TableCell>
              <TableCell>Estimate Note</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashBoardData.EstimateData?.map((estimate, index) => (
              <TableRow
                className="material-tbl-alignment"
                key={estimate.EstimateId}
                hover
              >
                <TableCell>{estimate.CustomerName}</TableCell>
                <TableCell>{estimate.RegionalManager}</TableCell>

                <TableCell>{estimate.EstimateNumber}</TableCell>
                <TableCell>{estimate.EstimateAmount}</TableCell>
                <TableCell>{estimate.DescriptionofWork}</TableCell>

                <TableCell>
                  <span class="badge badge-pill badge-success ">
                    {estimate.Status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DashboardEstm;

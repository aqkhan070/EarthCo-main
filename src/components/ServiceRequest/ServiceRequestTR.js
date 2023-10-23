import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  TablePagination,
  TableContainer,
  Checkbox,
  Paper,
} from "@mui/material";
import { Create, Delete } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c9c3d",
    },
  },
});

const ServiceRequestTR = ({ serviceRequest }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const sortedCustomers = [...serviceRequest].sort((a, b) => {
    if (sorting.order === "asc") {
      return a[sorting.field] > b[sorting.field] ? 1 : -1;
    } else if (sorting.order === "desc") {
      return a[sorting.field] < b[sorting.field] ? 1 : -1;
    }
    return 0;
  });

  const deleteServiceRequest = async (id) =>{
    try {
        const response = await fetch(`https://earthcoapi.yehtohoga.com/api/ServiceRequest/DeleteServiceRequest?id=${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        });
  
        if (!response.ok) {
            throw new Error('Failed to delete ServiceRequest');
        }
  
        const data = await response.json();
  
        // Handle the response. For example, you can reload the customers or show a success message
        console.log("ServiceRequest deleted successfully:", data);
        window.location.reload();
  
    } catch (error) {
        console.error("There was an error deleting the customer:", error);
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteServiceRequest(id);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="container text-center">
          <div className="row justify-content-end">
            <div className="col-3 add-customer-btn">
              <Link>
                <Button variant="contained" color="primary">
                  + Add Customer
                </Button>
              </Link>
            </div>
          </div>
          <br />
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                {[
                  "Select",
                  "Service Request #",
                  "Customer Name",
                  "Assigned to",
                  "Status",
                  "Work Requested",
                  "Date Created",
                  "Actions",
                ].map((column, index) => (
                  <TableCell key={index}>
                    {index < 5 ? (
                      <TableSortLabel
                        active={sorting.field === column}
                        direction={sorting.order}
                        onClick={() =>
                          setSorting({
                            field: column,
                            order:
                              sorting.order === "asc" && sorting.field === column
                                ? "desc"
                                : "asc",
                          })
                        }
                      >
                        {column}
                      </TableSortLabel>
                    ) : (
                      column
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer, rowIndex) => (
                  <TableRow key={rowIndex} hover>
                    <TableCell>
                      <Checkbox /> 
                    </TableCell>
                    <TableCell>{customer.ServiceRequestNumber}</TableCell>
                    <TableCell>{customer.CustomerId}</TableCell>
                    <TableCell>{customer.Assign}</TableCell>
                    <TableCell>{customer.SRStatusId}</TableCell>
                    <TableCell>{customer.WorkRequest}</TableCell>
                    <TableCell>{customer.CreatedDate}</TableCell>
                    <TableCell>
                      <Link>
                        <Button
                          className="delete-button"
                          onClick={() => {
                            // Update actions as required
                          }}
                        >
                          <Create />
                        </Button>
                      </Link>
                      <Button
                        color="error"
                        className="delete-button"
                        onClick={() => handleDelete(customer.ServiceRequestId)}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          </TableContainer>
            
          
          <TablePagination
            component="div"
            count={sortedCustomers.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ServiceRequestTR;

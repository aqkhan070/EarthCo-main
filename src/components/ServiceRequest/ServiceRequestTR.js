import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import UpdateSRForm from "./UpdateSRForm";
import { Form } from "react-bootstrap";
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
import { Create, Delete  } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import Alert from '@mui/material/Alert';



const theme = createTheme({
  palette: {
    primary: {
      main: "#7c9c3d",
    },
  },
  typography: {
    fontSize: 14, // Making font a bit larger
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px 16px", // Adjust cell padding to reduce height
        },
      },
    },
  },
});

const ServiceRequestTR = ({ serviceRequest = [], setShowCards, fetchServiceRequest }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [filterDate, setFilterDate] = useState("This Month");

  const [search, setSearch] = useState("");

  const [serviceRequestId, setServiceRequestId] = useState(0);

  const [showContent, setShowContent] = useState(true);
  const [successAlert, setSuccessAlert] = useState(false)
  const token = Cookies.get("token");


  const columnFieldMapping = {
    "Service Request #": "ServiceRequestNumber",
    "Customer Name": "CustomerId",
    "Assigned to": "Assign",
    Status: "SRStatusId",
    "Work Requested": "WorkRequest",
    "Date Created": "CreatedDate",
  };

  //

  const deleteServiceRequest = async (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/DeleteServiceRequest?id=${id}`,{headers}        
       
      );

      if (!response.ok) {
        throw new Error("Failed to delete ServiceRequest");
      }

      const data = await response.json();

      // Handle the response. For example, you can reload the customers or show a success message
      console.log("ServiceRequest deleted successfully:", data);
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteServiceRequest(id);
    }
  };

  useEffect(() => {
    setShowCards(true)
  }, []);

  const handleSearch = (data) => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const threeMonthsAgoStart = new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      1
    );

    let dateFilteredData = [];

    switch (filterDate) {
      case "This Month":
        dateFilteredData = data.filter(
          (item) => new Date(item.CreatedDate) >= monthStart
        );
        break;
      case "Previous Month":
        dateFilteredData = data.filter(
          (item) =>
            new Date(item.CreatedDate) >= prevMonthStart &&
            new Date(item.CreatedDate) <= prevMonthEnd
        );
        break;
      case "Last three months":
        dateFilteredData = data.filter(
          (item) => new Date(item.CreatedDate) >= threeMonthsAgoStart
        );
        break;
      default:
        dateFilteredData = data;
        break;
    }

    return dateFilteredData.filter((item) => {
      const fieldsToSearch = [
        item.CustomerId?.toString(),
        item.ServiceRequestNumber?.toString(),
        item.Assign?.toString(),
        item.SRStatusId?.toString(),
        item.WorkRequest?.toString(),
        item.CreatedDate?.toString(),
      ];

      return fieldsToSearch.some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const sortedAndSearchedCustomers = handleSearch([...serviceRequest]).sort(
    (a, b) => {
      const { field, order } = sorting;

      if (field && order) {
        if (order === "asc") {
          return a[field] > b[field] ? 1 : -1;
        }
        if (order === "desc") {
          return a[field] < b[field] ? 1 : -1;
        }
      }
      return 0;
    }
  );

  return (
    <>
      {showContent ? (
        <ThemeProvider theme={theme}>
          <div className="">
          {successAlert && <Alert className="mb-3" severity="success">This is a success alert — check it out!</Alert> }
            <div className=" text-center">
              <div className="row ">
                <div className="col-md-12">
                <div>
                    <Form.Select
                      size="sm"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      aria-label="Default select example"
                      className="bg-white date-sort-form"
                    >
                      <option value="This Month">This Month</option>
                      <option value="Previous Month">Previous Month</option>
                      <option value="Last three months">
                        Last three months
                      </option>
                    </Form.Select>
                  </div>
                  <div className="col-3 custom-search-container">
                    <TextField
                      label="Search"
                      variant="standard"
                      size="small"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  
                  <div className="custom-button-container">
                    
                      <Button variant="contained" color="primary" onClick={() => {setShowContent(false); setServiceRequestId(0)}}>
                        + Add Service Request
                      </Button>
                   
                  </div>
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
                              active={
                                sorting.field === columnFieldMapping[column]
                              }
                              direction={sorting.order}
                              onClick={() =>
                                setSorting({
                                  field: columnFieldMapping[column],
                                  order:
                                    sorting.order === "asc" &&
                                    sorting.field === columnFieldMapping[column]
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
                    {sortedAndSearchedCustomers.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((customer, rowIndex) => (
                        <TableRow key={rowIndex} hover>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>{customer.ServiceRequestNumber}</TableCell>
                          <TableCell>{customer.CustomerName}</TableCell>
                          <TableCell>{customer.Assign}</TableCell>
                          <TableCell>{customer.Status}</TableCell>
                          <TableCell>{customer.WorkRequest}</TableCell>
                          <TableCell>{customer.CreatedDate}</TableCell>
                          <TableCell>
                            <Button
                              className="delete-button"
                              onClick={() => {
                                setServiceRequestId(customer.ServiceRequestId);
                                setShowContent(false);
                                console.log("////////", serviceRequestId);
                                // console.log("////////",customer.ServiceRequestId);
                              }}
                            >
                              <Create />
                            </Button>

                            <Button
                              color="error"
                              className="delete-button"
                              onClick={() =>
                                handleDelete(customer.ServiceRequestId)
                              }
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
                count={sortedAndSearchedCustomers.length}
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
      ) : (
        <UpdateSRForm
          serviceRequestId={serviceRequestId}
          setShowContent={setShowContent}
          setShowCards={setShowCards}
          setSuccessAlert={setSuccessAlert}
          fetchServiceRequest={fetchServiceRequest}
        />
      )}
    </>
  );
};

export default ServiceRequestTR;

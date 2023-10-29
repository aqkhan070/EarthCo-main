import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import UpdateSRForm from "./UpdateSRForm";
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
import { Create, Delete } from "@mui/icons-material";

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

const ServiceRequestTR = ({ serviceRequest }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [search, setSearch] = useState("");

  const [serviceRequestId, setServiceRequestId] = useState();
  const [showContent, setShowContent] = useState(true);

  const columnFieldMapping = {
    "Service Request #": "ServiceRequestNumber",
    "Customer Name": "CustomerId",
    "Assigned to": "Assign",
    "Status": "SRStatusId",
    "Work Requested": "WorkRequest",
    "Date Created": "CreatedDate",
  };

  //

  const deleteServiceRequest = async (id) => {
    try {
      const response = await fetch(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/DeleteServiceRequest?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
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

  const handleSearch = (data) => {
    return data.filter((item) => {
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
            <div className=" text-center">

              <div className="row ">
                <div className="col-md-12">
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
                    <Link to={"/Dashboard/Service-Requests/Add-SRform"}>
                      <Button variant="contained" color="primary">
                        + Add Service Request
                      </Button>
                    </Link>
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
                    {sortedAndSearchedCustomers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                            
                              <Button
                                className="delete-button"
                                onClick={() => {
                                  setServiceRequestId(
                                    customer.ServiceRequestId
                                  );
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
        />
      )}
    </>
  );
};

export default ServiceRequestTR;

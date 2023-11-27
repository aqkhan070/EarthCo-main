import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form } from "react-bootstrap";
import punchList from "../../assets/images/1.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
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
  IconButton,
  TableContainer,
  Typography,
  Box,
  Checkbox,
  Paper,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Add, Delete, Edit, Create } from "@mui/icons-material";
import Cookies from "js-cookie";
import PunchListDetailRow from "./PunchListDetailRow";

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

const PunchTR = ({ punchData, setselectedPL, setPlDetailId}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [open, setOpen] = useState(false);

  const [expandedRow, setExpandedRow] = useState(-1); // By default, no row is expanded.

  const [search, setSearch] = useState("");

  const [serviceRequestId, setServiceRequestId] = useState();
  const [showContent, setShowContent] = useState(true);

  const columnFieldMapping = {
    "#": "PunchlistId",
    "Title": "Title",
    "Assigned To": "AssignedTo",
    "Date Created": "CreatedDate",
    "Status": "Status",
    "Reports": "Reports",
  };

  const handleSearch = (data) => {
    // Always return the original data without filtering
    return data;
  };

  const deletePL = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/DeleteCustomer?id=${id}`,
        {
         headers
          
        }
      );
      

      // Handle the response. For example, you can reload the customers or show a success message
     
      // window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the pl :", error);
    }
  };


  const sortedAndSearchedCustomers = handleSearch([...punchData]).sort(
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

  const deletePunchList = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchList/DeletePunchlist?id=${id}`,
        {
          headers,
        }
      );

      

      const data = await response.json();

      // Handle the response. For example, you can reload the customers or show a success message
      console.log("Customer deleted successfully:", data);
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deletePunchList(id);
    }
  };

  return (
    <>
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
                  <a
                    href="/"
                    className="btn btn-primary btn-md"
                    data-bs-toggle="modal"
                    data-bs-target="#editPunch"
                  >
                    + Add PunchList
                  </a>
                </div>
              </div>
            </div>
            <br />
            

            <Table>
              <TableHead>
                <TableRow className="table-header">
                  {[
                    "",
                    "Customer Name",
                    "Title",
                    "Assigned to",
                    "Date Created",
                    "Status",
                    "Report",
                    "Actions",
                  ].map((column, index) => (
                    <TableCell key={index}>
                      {index < 5 ? (
                        <TableSortLabel
                          active={sorting.field === columnFieldMapping[column]}
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, rowIndex) => (
                    <>
                      <TableRow key={rowIndex} hover>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation(); // This prevents the TableRow's onClick from being called
                              setExpandedRow(
                                rowIndex === expandedRow ? -1 : rowIndex
                              );
                            }}
                          >
                            {expandedRow ? (
                              <KeyboardArrowDownIcon />
                            ) : (
                              <KeyboardArrowUpIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell>{item.CustomerName}</TableCell>
                        <TableCell>{item.Data.Title}</TableCell>
                        <TableCell>{item.AssignToName}</TableCell>
                        <TableCell>{item.Data.CreatedDate}</TableCell>
                        <TableCell>{item.Status}</TableCell>
                        <TableCell>{item.Reports}</TableCell>

                        <TableCell>
                          <Button
                            className="delete-button"
                            data-bs-toggle="modal"
                            data-bs-target="#addPhotos"
                            onClick={() => {
                              setselectedPL(item.Data.PunchlistId)
                            }}
                          >
                            <Add />
                          </Button>
                          <Button
                          //  className=" btn btn-primary  btn-icon-xxs me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#editPunch"
                            onClick={() => {
                              setselectedPL(item.Data.PunchlistId)
                            }}
                          >
                             {/* <i className="fas fa-pencil-alt"></i> */}
                             <Create></Create>
                          </Button>

                          <Button
                             data-bs-toggle="modal"
                             data-bs-target={`#deleteModal${item.Data.PunchlistId}`}
                            className="btn btn-danger btn-icon-xxs "
                           
                          >
                            {/* <i className="fas fa-trash-alt"></i> */}
                            <Delete color="error"></Delete>
                          </Button>

                          <div
                          className="modal fade"
                          id={`deleteModal${item.Data.PunchlistId}`}
                          tabIndex="-1"
                          aria-labelledby="deleteModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Punch List  Delete</h5>
                                
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                ></button>
                              </div>
                              <div className="modal-body">
                              
                                  <p >
                                  Are you sure you want to delete{" "}
                                  {item.Data.PunchlistId}
                                </p>
                                  
                                
                              </div>

                              <div className="modal-footer">
                                <button
                                    type="button"
                                    id="closer"
                                    className="btn btn-danger light "
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    className="btn btn-primary "
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      handleDelete(item.Data.PunchlistId);
                                    }}
                                  >
                                    Yes
                                  </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        </TableCell>
                      </TableRow>


                      <PunchListDetailRow headers={headers} item={item} rowIndex={rowIndex} expandedRow={expandedRow} setPlDetailId={setPlDetailId} />

                     
                    </>
                  ))}
              </TableBody>
            </Table>

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
    </>
  );
};

export default PunchTR;

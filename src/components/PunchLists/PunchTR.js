import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form } from "react-bootstrap";
import punchList from "../../assets/images/1.jpg";

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

import { Add, Delete, Edit } from "@mui/icons-material";

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

const PunchTR = ({ punchData }) => {
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
    Title: "Title",
    "Assigned To": "AssignedTo",
    "Date Created": "CreatedDate",
    Status: "Status",
    Reports: "Reports",
  };

  //

  const handleSearch = (data) => {
    return data.filter((item) => {
      const fieldsToSearch = [
        // item.PunchlistId?.toString(),
        item.ContactName?.toString(),
        // item.Title?.toString(),
        // item.AssignedTo?.toString(),
        // item.CreatedDate?.toString(),
        // item.Reports?.toString(),
      ];

      return fieldsToSearch.some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      );
    });
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container">
          <div className="container text-center">
            <div className="row ">
              <div className="col-md-12">
                <div className="col-3 custom-search-container">
                  <TextField
                    label="Search"
                    variant="outlined"
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
                      "#",
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, rowIndex) => (
                      <>
                        <TableRow
                          key={rowIndex}
                          hover
                          onClick={() =>
                            setExpandedRow(
                              rowIndex === expandedRow ? -1 : rowIndex
                            )
                          }
                        >
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
                          <TableCell>{item.ContactName}</TableCell>
                          <TableCell>{item.Title}</TableCell>
                          <TableCell>{item.AssignedTo}</TableCell>
                          <TableCell>{item.CreatedDate}</TableCell>
                          <TableCell>{item.Status}</TableCell>
                          <TableCell>{item.Reports}</TableCell>

                          <TableCell>
                            <IconButton>
                              <Add />
                            </IconButton>
                            <IconButton>
                              <Edit />
                            </IconButton>
                            <IconButton>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={8}
                          >
                            <Collapse
                              in={expandedRow === rowIndex}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 1 }}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                >
                                  {/* collapssss */}
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                  {/* <TableHead>
                                    <TableRow>
                                      <TableCell></TableCell>
                                      <TableCell></TableCell>
                                      <TableCell></TableCell>
                                      <TableCell align="right"></TableCell>
                                      <TableCell align="left"></TableCell>
                                    </TableRow>
                                  </TableHead> */}
                                  <TableBody>
                                    <TableRow>
                                      <TableCell></TableCell>
                                      <TableCell rowSpan={2} component="th" scope="row">
                                      <div className="products">
                            <img
                              src={punchList}
                              className="avatar avatar-md"
                              alt="lazy"
                            />
                            <div>
                              <h6>Keep plants</h6>
                              <span>Pool</span>
                            </div>
                            </div>
                                      </TableCell>
                                      <TableCell>item-1</TableCell>
                                      <TableCell></TableCell>
                                      <TableCell rowSpan={2} align="right">
                                      <Form.Select className="bg-white">
                            <option value="complete">Complete</option>
                            <option value="pending">Pending</option>
                            <option value="Estimate">Estimate</option>
                            <option value="Service Request">
                              Service Request
                            </option>
                          </Form.Select>
                                      <TableCell>

                                      </TableCell>
                                      </TableCell>
                                      <TableCell align="left" >
                                        <IconButton>
                                          <Edit />
                                        </IconButton>
                                        <IconButton>
                                          <Delete />
                                        </IconButton>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
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
    </>
  );
};

export default PunchTR;

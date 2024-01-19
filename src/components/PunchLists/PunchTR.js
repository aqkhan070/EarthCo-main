import React, { useEffect, useState } from "react";
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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Add, Delete, Edit, Create } from "@mui/icons-material";
import Cookies from "js-cookie";
import PunchListDetailRow from "./PunchListDetailRow";
import formatDate from "../../custom/FormatDate";
import TblDateFormat from "../../custom/TblDateFormat";
import EventPopups from "../Reusable/EventPopups";
import { NavLink, useNavigate } from "react-router-dom";
import AddButton from "../Reusable/AddButton";

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

const PunchTR = ({
  punchData,
  fetchFilterdPunchList,
  setselectedPL,
  statusId,
  setPlDetailId,
  totalRecords,
  setAddPunchListData,
}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const [expandedRow, setExpandedRow] = useState(-1); // By default, no row is expanded.

  const navigate = useNavigate();

  const columnFieldMapping = {
    "#": "PunchlistId",
    Title: "Title",
    "Assigned To": "AssignedTo",
    "Date Created": "CreatedDate",
    Status: "Status",
    Reports: "Reports",
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
          headers,
        }
      );

      // Handle the response. For example, you can reload the customers or show a success message

      // window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the pl :", error);
    }
  };

  const [tablePage, setTablePage] = useState(0);
  const [searchPL, setSearchPL] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    // Initial fetch of estimates
    fetchFilterdPunchList();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilterdPunchList(
      searchPL,
      tablePage + 1,
      rowsPerPage,
      statusId,
      isAscending
    );
  }, [searchPL, tablePage, rowsPerPage, statusId, isAscending]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
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
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("PunchList Deleted Successfully");

      fetchFilterdPunchList();
      // Handle the response. For example, you can reload the customers or show a success message
      console.log("Customer deleted successfully:", response.data);
      // window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    deletePunchList(id);
  };

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <ThemeProvider theme={theme}>
        <div className="card-header flex-wrap d-flex justify-content-between  border-0">
          <div>
            <TextField
              label="Search PunchList"
              variant="standard"
              size="small"
              fullWidth
              value={searchPL}
              onChange={(e) => setSearchPL(e.target.value)}
            />
          </div>
          <div className=" me-2">
            <FormControl className="  me-2" variant="outlined">
              <Select
                labelId="customer-type-label"
                variant="outlined"
                value={isAscending}
                onChange={() => {
                  setIsAscending(!isAscending);
                }}
                size="small"
              >
                <MenuItem value={true}>Ascending</MenuItem>
                <MenuItem value={false}>Descending</MenuItem>
              </Select>
            </FormControl>
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#editPunch"
              onClick={() => {
                setAddPunchListData({});
              }}
            >
              + Add PunchList
            </button>
          </div>
        </div>

        <div className="card-body pt-0">
          <Table>
            <TableHead>
              <TableRow className="table-header">
                {[
                  "",
                  "Customer Name",
                  "Title",
                  "Regional Manager",
                  "Date Created",
                  "Status",
                ].map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndSearchedCustomers.map((item, rowIndex) => (
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
                    <TableCell>{item.Data.CustomerCompanyName}</TableCell>
                    <TableCell>{item.Data.Title}</TableCell>
                    <TableCell>{item.Data.AssignToName}</TableCell>
                    <TableCell>
                      {TblDateFormat(item.Data.CreatedDate)}
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          cursor: "pointer",
                          backgroundColor: item.Data.StatusColor,
                        }}
                        onClick={() => {
                          navigate(
                            `/PunchlistPreview?id=${item.Data.PunchlistId}`
                          );
                        }}
                        className="badge badge-pill "
                      >
                        {item.Data.Status}
                      </span>
                    </TableCell>
                    {/* <TableCell>{item.Data.Reports}</TableCell> */}

                    <TableCell align="right">
                      <Button
                        className="delete-button"
                        data-bs-toggle="modal"
                        data-bs-target="#addPhotos"
                        onClick={() => {
                          setselectedPL(item.Data.PunchlistId);
                        }}
                      >
                        <Add />
                      </Button>
                      <Button
                        //  className=" btn btn-primary  btn-icon-xxs me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editPunch"
                        onClick={() => {
                          setselectedPL(item.Data.PunchlistId);
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
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Punch List Delete</h5>

                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>
                            <div className="modal-body text-center">
                              <p>
                                Are you sure you want to delete{" "}
                                {item.Data.Title}
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

                  <PunchListDetailRow
                    fetchFilterdPunchList={fetchFilterdPunchList}
                    headers={headers}
                    item={item}
                    rowIndex={rowIndex}
                    expandedRow={expandedRow}
                    setPlDetailId={setPlDetailId}
                  />
                </>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalRecords.totalRecords}
            rowsPerPage={rowsPerPage}
            page={tablePage} // Use tablePage for the table rows
            onPageChange={handleChangePage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setTablePage(0); // Reset the tablePage to 0 when rowsPerPage changes
            }}
          />
        </div>
      </ThemeProvider>
    </>
  );
};

export default PunchTR;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import IrrigationForm from "./IrrigationForm";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { NavLink, useNavigate } from "react-router-dom";
import { Delete, Create } from "@mui/icons-material";
import { Button } from "@mui/material";
import formatDate from "../../custom/FormatDate";
import TblDateFormat from "../../custom/TblDateFormat";
import AddButton from "../Reusable/AddButton";

const Irrigationlist = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  const [irrigationlist, setIrrigationlist] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [selectedIrr, setSelectedIrr] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successres, setSuccessres] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("IrrigationId");
  const [order, setOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  const fetchFilteredIrrigation = async (
    Search = "",
    pageNo = 1,
    PageLength = 10,
    isAscending = false
  ) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Irrigation/GetIrrigationServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}&isAscending=${isAscending}`,
        { headers }
      );
      console.log("irrigation data", res.data);
      setIrrigationlist(res.data.Data);
      setTotalRecords(res.data.totalRecords);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIrrigationlist([]);
      setError(error.response.data.Message);
      console.log("error fetching irrigations", error);
    }
  };

  const [tablePage, setTablePage] = useState(0);

  useEffect(() => {
    // Initial fetch of estimates
    fetchFilteredIrrigation();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilteredIrrigation(search, tablePage + 1, rowsPerPage, isAscending);
  }, [search, tablePage, rowsPerPage, isAscending]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const deleteIrrigation = async (id) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Irrigation/DeleteIrrigation?id=${id}`,
        { headers }
      );
      console.log("successfully deleted irrigation", res.data);
      setSuccessres(res.data);
      fetchFilteredIrrigation();
      setTimeout(() => {
        setSuccessres("");
      }, 4000);
    } catch (error) {
      console.log("error deleting irrigation", error.data);
    }
  };

  useEffect(() => {
    fetchFilteredIrrigation();
  }, []);

  const filteredIrrigationList = irrigationlist;

  const sortedIrrigationList = filteredIrrigationList;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedIrrigationList.length - page * rowsPerPage);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              {isLoading ? (
                <div className="center-loader">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                    <div>
                      <TextField
                        label="Search irrigation"
                        variant="standard"
                        size="small"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                      <AddButton
                        onClick={() => {
                          navigate(`/irrigation/add-irrigation`);
                          // setShowContent(false);
                        }}
                      >
                        Add New
                      </AddButton>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    {error && <Alert severity="error">{error}</Alert>}

                    <Table>
                      <TableHead className="table-header">
                        <TableRow className="material-tbl-alignment">
                          <TableCell>#</TableCell>
                          <TableCell>Customer Name</TableCell>
                          <TableCell>Regional Manager</TableCell>

                          <TableCell>Controllers #</TableCell>
                          <TableCell>Created Date</TableCell>

                          <TableCell>Report</TableCell>
                          {/* <TableCell align="center">Actions</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {irrigationlist ? (
                          irrigationlist.map((irr, index) => (
                            <TableRow
                              className="material-tbl-alignment"
                              hover
                              key={index}
                            >
                              <TableCell>{irr.IrrigationId}</TableCell>
                              <TableCell
                                onClick={() => {
                                  navigate(
                                    `/irrigation/add-irrigation?id=${irr.IrrigationId}`
                                  );
                                }}
                              >
                                {irr.CustomerName}
                              </TableCell>
                              <TableCell
                                onClick={() => {
                                  navigate(
                                    `/irrigation/add-irrigation?id=${irr.IrrigationId}`
                                  );
                                }}
                              >
                                {irr.RegionalManagerName}
                              </TableCell>

                              <TableCell
                                onClick={() => {
                                  navigate(
                                    `/irrigation/add-irrigation?id=${irr.IrrigationId}`
                                  );
                                }}
                              >
                                {irr.ControllerNumbers.map((number, index) =>
                                  index === irr.ControllerNumbers.length - 1
                                    ? number
                                    : number + ", "
                                )}
                              </TableCell>
                              <TableCell
                                onClick={() => {
                                  navigate(
                                    `/irrigation/add-irrigation?id=${irr.IrrigationId}`
                                  );
                                }}
                              >
                                {TblDateFormat(irr.CreatedDate)}
                              </TableCell>

                              <TableCell>
                                <NavLink
                                  to={`/irrigation/audit-report?id=${irr.IrrigationId}`}
                                >
                                  <span className="badge badge-pill badge-success ">
                                    Open
                                  </span>
                                </NavLink>
                              </TableCell>
                              {/* <TableCell>
                                <div className="flex-box">
                                  <Button
                                    title="Edit"
                                    type="button"
                                    // className="btn btn-primary btn-icon-xxs mx-1"
                                    onClick={() => {
                                      setShowContent(false);
                                      setSelectedIrr(irr.IrrigationId);
                                    }}
                                  >
                                     <i className="fa fa-pen"></i> 
                                    <Create></Create>
                                  </Button>

                                  <Button
                                    title="Delete"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#deleteModal${irr.IrrigationId}`}
                                    // className="btn btn-danger btn-icon-xxs mx-1"
                                  >
                               <i className="fa fa-trash"></i> 
                                    <Delete color="error"></Delete>
                                  </Button>

                                  <div
                                    className="modal fade"
                                    id={`deleteModal${irr.IrrigationId}`}
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
                                          <h5 className="modal-title">
                                            Irrigation Delete
                                          </h5>

                                          <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                          ></button>
                                        </div>
                                        <div className="modal-body text-left">
                                          <p>
                                            Are you sure you want to delete{" "}
                                            {irr.IrrigationId}
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
                                              deleteIrrigation(
                                                irr.IrrigationId
                                              );
                                            }}
                                          >
                                            Yes
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TableCell> */}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={12}>No records found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component="div"
                      count={totalRecords}
                      rowsPerPage={rowsPerPage}
                      page={tablePage} // Use tablePage for the table rows
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setTablePage(0); // Reset the tablePage to 0 when rowsPerPage changes
                      }}
                    />
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Irrigationlist;

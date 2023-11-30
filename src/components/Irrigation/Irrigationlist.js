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
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import { Delete, Create } from "@mui/icons-material";
import { Button } from "@mui/material";
import formatDate from "../../custom/FormatDate";

const Irrigationlist = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

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

  const getIrrigationList = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Irrigation/GetIrrigationList`,
        { headers }
      );
      console.log("irrigation data", res.data);
      setIrrigationlist(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.Message);
      console.log("error fetching irrigations", error.response.data.Message);
    }
  };

  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const fetchFilteredIrrigation = async (
    Search = "",
    pageNo = 1,
    PageLength = 10
  ) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Irrigation/GetIrrigationServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}`,
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
      console.log("error fetching irrigations", error.response.data.Message);
    }
  };

  const [tablePage, setTablePage] = useState(0);

  useEffect(() => {
    // Initial fetch of estimates
    fetchFilteredIrrigation();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilteredIrrigation(search, tablePage + 1, rowsPerPage);
  }, [search, tablePage, rowsPerPage]);

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
      {showContent ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  {error && <Alert severity="error">{error}</Alert>}
                  {successres && <Alert severity="success">{successres}</Alert>}

                  <div className="row">
                    <div className="col-md-2 text-left mb-2">
                      <TextField
                        label="Search"
                        variant="standard"
                        size="small"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="col-md-8"></div>

                    <div className="col-md-2 text-right">
                      <button
                        className="btn btn-primary btn-sm"
                        role="button"
                        onClick={() => {
                          setShowContent(false);
                        }}
                      >
                        + Add New
                      </button>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="center-loader">
                      <CircularProgress />
                    </div>
                  ) : (
                    <Table>
                      <TableHead className="table-header">
                        <TableRow>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "IrrigationId"}
                              direction={
                                orderBy === "IrrigationId" ? order : "asc"
                              }
                              onClick={() => handleRequestSort("IrrigationId")}
                            >
                              #
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "CustomerName"}
                              direction={
                                orderBy === "CustomerName" ? order : "asc"
                              }
                              onClick={() => handleRequestSort("CustomerName")}
                            >
                              Customer Name
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "CreatedDate"}
                              direction={
                                orderBy === "CreatedDate" ? order : "asc"
                              }
                              onClick={() => handleRequestSort("CreatedDate")}
                            >
                              Created Date
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>Controller Number</TableCell>
                          <TableCell>Report</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {irrigationlist ? (
                          irrigationlist.map((irr, index) => (
                            <TableRow hover key={index}>
                              <TableCell>{irr.IrrigationId}</TableCell>
                              <TableCell>{irr.CustomerName}</TableCell>
                              <TableCell>
                                {formatDate(irr.CreatedDate)}
                              </TableCell>
                              <TableCell>Controller Number</TableCell>
                              <TableCell>
                                <NavLink
                                  to={`/Dashboard/Irrigation/Audit-Report?id=${irr.IrrigationId}`}
                                >
                                  <span className="badge badge-pill badge-success ">
                                    Open
                                  </span>
                                </NavLink>
                              </TableCell>
                              <TableCell>
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
                                    {/* <i className="fa fa-pen"></i> */}
                                    <Create></Create>
                                  </Button>

                                  <Button
                                    title="Delete"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#deleteModal${irr.IrrigationId}`}
                                    // className="btn btn-danger btn-icon-xxs mx-1"
                                  >
                                    {/* <i className="fa fa-trash"></i> */}
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
                                        <div className="modal-body text-center">
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
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={12}>No records found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}

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
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <IrrigationForm
          getIrrigationList={fetchFilteredIrrigation}
          setSelectedIrr={setSelectedIrr}
          selectedIrr={selectedIrr}
          setShowContent={setShowContent}
          setSuccessres={setSuccessres}
        />
      )}
    </>
  );
};

export default Irrigationlist;

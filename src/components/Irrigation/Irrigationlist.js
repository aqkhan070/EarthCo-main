import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import IrrigationForm from "./IrrigationForm";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import { NavLink } from "react-router-dom";
import { Delete, Create } from "@mui/icons-material";
import {
  Button,
 } from "@mui/material";

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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

  const deleteIrrigation = async (id) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Irrigation/DeleteIrrigation?id=${id}`,
        { headers }
      );
      console.log("successfully deleted irrigation", res.data);
      getIrrigationList();
    } catch (error) {
      console.log("error deleting irrigation", error.data);
    }
  };

  useEffect(() => {
    getIrrigationList();
  }, []);

  const filteredIrrigationList = irrigationlist.filter((irr) =>
    irr.CustomerName.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedIrrigationList = filteredIrrigationList.sort((a, b) => {
    const isAsc = order === "asc";
    const propA = a[orderBy] || "";
    const propB = b[orderBy] || "";
  
    // Check if the property is a string before using localeCompare
    if (typeof propA === "string" && typeof propB === "string") {
      return isAsc ? propA.localeCompare(propB) : propB.localeCompare(propA);
    } else {
      // Handle non-string properties differently or choose a different property to sort by
      // For example, you can use numeric comparison for non-string properties
      return isAsc ? propA - propB : propB - propA;
    }
  });

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
                  {error && (
                    <Alert severity="error">
                      {error}
                    </Alert>
                  )}
                  {successres && (
                    <Alert severity="success">
                      {successres}
                    </Alert>
                  )}

                  <div className="table-responsive active-projects style-1">
                   

                    <div className="row">
                      <div className="col-md-3 text-left"><TextField
                      label="Search"
                      variant="standard"
                      fullWidth
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      margin="normal"
                    /></div>
                    <div className="col-md-7"></div>
                    
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
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === "IrrigationId"}
                                  direction={orderBy === "IrrigationId" ? order : "asc"}
                                  onClick={() => handleRequestSort("IrrigationId")}
                                >
                                  # Irrigation ID
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === "CustomerName"}
                                  direction={orderBy === "CustomerName" ? order : "asc"}
                                  onClick={() => handleRequestSort("CustomerName")}
                                >
                                  Customer Name
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>
                                <TableSortLabel
                                  active={orderBy === "CreatedDate"}
                                  direction={orderBy === "CreatedDate" ? order : "asc"}
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
                            {sortedIrrigationList
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((irr, index) => (
                                <TableRow hover key={index}>
                                  <TableCell>{irr.IrrigationId}</TableCell>
                                  <TableCell>{irr.CustomerName}</TableCell>
                                  <TableCell>{irr.CreatedDate}</TableCell>
                                  <TableCell>Controller Number</TableCell>
                                  <TableCell>
                                    <NavLink to="/Dashboard/Irrigation/Audit-Report">
                                      <span className="badge badge-primary light border-0 me-1">
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
                          <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Irrigation Delete</h5>
                                
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                ></button>
                              </div>
                              <div className="modal-body text-center">
                              
                                  <p  >
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
                                      deleteIrrigation(irr.IrrigationId);
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
                              ))}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}

                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component="div"
                      count={sortedIrrigationList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <IrrigationForm
          getIrrigationList={getIrrigationList}
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

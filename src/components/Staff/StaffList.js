import React, { useEffect, useState } from "react";
import TitleBar from "../TitleBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Create, Delete } from "@mui/icons-material";
import AddStaff from "./AddStaff";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton,
  TablePagination,
  TableSortLabel,
  TextField,
} from "@mui/material";

const StaffList = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [staffData, setStaffData] = useState([]);
  const [toggleAddStaff, settoggleAddStaff] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState(0);
  const [addStaffSuccess, setAddStaffSuccess] = useState(false);
  const [updateStaffSuccess, setUpdateStaffSuccess] = useState(false);
  const [deleteStaffSuccess, setDeleteStaffSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [staffFetchError, setstaffFetchError] = useState(false)

  const icon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ... Your SVG Path Data */}
    </svg>
  );

  const getStaffList = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`,
        { headers }
      );
      setstaffFetchError(false)
      setStaffData(response.data);
      if (response.data != null) {
        setIsLoading(false);
      }
      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
      setstaffFetchError(true)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStaffList();
  }, []);

  const deleteStaff = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/DeleteStaff?id=${id}`,
        { headers }
      );
      setDeleteStaffSuccess(true);
      setTimeout(() => {
        setDeleteStaffSuccess(false);
      }, 4000);
      console.log("staff deleted successfully");
      getStaffList();
    } catch (error) {
      console.log("error deleting staff", error);
    }
  };

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sorting
  const [orderBy, setOrderBy] = useState("UserId");
  const [order, setOrder] = useState("asc");

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = staffData.slice().sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return b[orderBy] > a[orderBy] ? 1 : -1;
    }
  });

  return (
    <>
      {toggleAddStaff ? (
        <>
          <TitleBar icon={icon} title="Staff Management" />
          {isLoading ? (
            <div className="center-loader">
              <CircularProgress style={{ color: "#789a3d" }} />
            </div>
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body">
                      {addStaffSuccess && (
                        <Alert severity="success">Staff Added Successfully</Alert>
                      )}
                      {updateStaffSuccess && (
                        <Alert severity="success">Staff Updated Successfully</Alert>
                      )}
                      {deleteStaffSuccess && (
                        <Alert severity="success">Staff Deleted Successfully</Alert>
                      )}
                      <div className="table-responsive active-projects style-1">
                        <div className="tbl-caption mb-3">
                          <h4 className="heading mb-0">Staff</h4>
                          <div>
                            <button
                              className="btn btn-primary btn-sm"
                              role="button"
                              onClick={() => {
                                setSelectedStaff(0);
                                settoggleAddStaff(false);
                              }}
                            >
                              + Add Staff
                            </button>
                          </div>
                        </div>
                        <TableContainer component={Paper}>
                          <Table id="customerTbl">
                            <TableHead>
                              <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>
                                  <TableSortLabel
                                    active={orderBy === "FirstName"}
                                    direction={orderBy === "FirstName" ? order : "asc"}
                                    onClick={() => handleSortRequest("FirstName")}
                                  >
                                    First Name
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                  <TableSortLabel
                                    active={orderBy === "LastName"}
                                    direction={orderBy === "LastName" ? order : "asc"}
                                    onClick={() => handleSortRequest("LastName")}
                                  >
                                    Last Name
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                  <TableSortLabel
                                    active={orderBy === "Email"}
                                    direction={orderBy === "Email" ? order : "asc"}
                                    onClick={() => handleSortRequest("Email")}
                                  >
                                    User Name
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                  <TableSortLabel
                                    active={orderBy === "Role"}
                                    direction={orderBy === "Role" ? order : "asc"}
                                    onClick={() => handleSortRequest("Role")}
                                  >
                                    Role
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {staffFetchError? <TableRow><TableCell className="text-center" colSpan={12}>No Record Found</TableCell></TableRow>: null}
                              {sortedData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((staff) => (
                                  <TableRow hover key={staff.UserId}>
                                    <TableCell>{staff.UserId}</TableCell>
                                    <TableCell>{staff.FirstName}</TableCell>
                                    <TableCell>{staff.LastName}</TableCell>
                                    <TableCell>{staff.Email}</TableCell>
                                    <TableCell>{staff.Role}</TableCell>
                                    <TableCell>
                                      <Button
                                      // className=" btn btn-primary  btn-icon-xxs me-2"
                                        
                                        onClick={() => {
                                          settoggleAddStaff(false);
                                          setSelectedStaff(staff.UserId);
                                        }}
                                      >
                                        <Create  />
                                        {/* <i className="fas fa-pencil-alt"></i> */}
                                      </Button>
                                      <Button
                                        color="error"
                                        // className="btn btn-danger btn-icon-xxs "
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deleteModal${staff.UserId}`}
                                      >
                                        <Delete color="error" />
                                        {/* <i className="fas fa-trash-alt"></i> */}
                                      </Button>
                                      <div
                                      className="modal fade"
                                      id={`deleteModal${staff.UserId}`}
                                      tabIndex="-1"
                                      aria-labelledby="deleteModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div
                                        className="modal-dialog"
                                        role="document"
                                      >
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title">
                                              Are you sure you want to delete{" "}
                                              {staff.FirstName}
                                            </h5>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                            ></button>
                                          </div>
                                          <div className="modal-body">
                                            <div className="basic-form text-center">
                                              <button
                                                type="button"
                                                id="closer"
                                                className="btn btn-danger light m-3"
                                                data-bs-dismiss="modal"
                                              >
                                                Close
                                              </button>
                                              <button
                                                className="btn btn-primary m-3"
                                                data-bs-dismiss="modal"
                                                onClick={() => {
                                                  deleteStaff(staff.UserId);
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
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={staffData.length}
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
          )}
        </>
      ) : (
        <AddStaff
          headers={headers}
          selectedStaff={selectedStaff}
          settoggleAddStaff={settoggleAddStaff}
          setAddStaffSuccess={setAddStaffSuccess}
          setUpdateStaffSuccess={setUpdateStaffSuccess}
          getStaffList={getStaffList}
        />
      )}
    </>
  );
};

export default StaffList;

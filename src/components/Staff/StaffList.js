import React, { useEffect, useState } from "react";
import TitleBar from "../TitleBar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Create, Delete } from "@mui/icons-material";
import AddStaff from "./AddStaff";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
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
import LoadingButton from "@mui/lab/LoadingButton";
import useQuickBook from "../Hooks/useQuickBook";
import AddButton from "../Reusable/AddButton";

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
  const [staffFetchError, setstaffFetchError] = useState(false);

  const icon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const { syncQB } = useQuickBook();

  const navigate = useNavigate();

  const getStaffList = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`,
        { headers }
      );
      setstaffFetchError(false);
      setStaffData(response.data);
      if (response.data != null) {
        setIsLoading(false);
      }
      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
      setstaffFetchError(true);
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
      syncQB(response.data.SyncId);

      console.log("staff deleted successfully");
      getStaffList();
    } catch (error) {
      console.log("error deleting staff", error);
    }
  };

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      <TitleBar icon={icon} title="Staff Management" />
      {isLoading ? (
        <div className="center-loader">
          <CircularProgress style={{ color: "#789a3d" }} />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="card">
            {addStaffSuccess && (
              <Alert severity="success">Staff Added Successfully</Alert>
            )}
            {updateStaffSuccess && (
              <Alert severity="success">Staff Updated Successfully</Alert>
            )}
            {deleteStaffSuccess && (
              <Alert severity="success">Staff Deleted Successfully</Alert>
            )}

            <div className="card-header border-0">
              <div className="col-md-12">
                <div className="text-right mt-2  ">
                  <AddButton
                    onClick={() => {
                      navigate(`/staff/add-staff`);
                    }}
                  >
                    Add Staff
                  </AddButton>
                </div>
              </div>
            </div>
            <div className="card-body pt-0">
              <Table>
                <TableHead className="table-header">
                  <TableRow className="material-tbl-alignment">
                    <TableCell className="ms-3">#</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffFetchError ? (
                    <TableRow>
                      <TableCell className="text-center" colSpan={12}>
                        No Record Found
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((staff) => (
                      <TableRow
                        className="material-tbl-alignment"
                        hover
                        key={staff.UserId}
                      >
                        <TableCell
                          onClick={() => {
                            navigate(`/Staff/Add-Staff?id=${staff.UserId}`);
                          }}
                        >
                          {staff.UserId}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(`/Staff/Add-Staff?id=${staff.UserId}`);
                          }}
                        >
                          {staff.FirstName}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(`/Staff/Add-Staff?id=${staff.UserId}`);
                          }}
                        >
                          {staff.LastName}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(`/Staff/Add-Staff?id=${staff.UserId}`);
                          }}
                        >
                          {staff.Email}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(`/Staff/Add-Staff?id=${staff.UserId}`);
                          }}
                        >
                          {staff.Role}
                        </TableCell>
                        <TableCell align="right">
                          <span
                            // className="btn btn-danger btn-icon-xxs "
                            data-bs-toggle="modal"
                            data-bs-target={`#deleteModal${staff.UserId}`}
                          >
                            <Delete color="error" />
                            {/* <i className="fas fa-trash-alt"></i> */}
                          </span>
                          <div
                            className="modal fade"
                            id={`deleteModal${staff.UserId}`}
                            tabIndex="-1"
                            aria-labelledby="deleteModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog" role="document">
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

              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
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
      )}
    </>
  );
};

export default StaffList;

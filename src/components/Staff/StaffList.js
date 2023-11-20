import React from "react";
import TitleBar from "../TitleBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Create, Delete, Update } from "@mui/icons-material";
import AddStaff from "./AddStaff";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";

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
  const [deleteStaffSuccess, setDeleteStaffSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

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

  const getStaffList = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`,
        { headers }
      );
      setStaffData(response.data);
      if (response.data != null) {
        setIsLoading(false);
      }
      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
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
      console.log("staff deteted successfully");
      getStaffList();
    } catch (error) {
      console.log("error deleting staff", error);
    }
  };

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
                        <Alert severity="success">
                          Staff Added Successfuly
                        </Alert>
                      )}
                      {updateStaffSuccess && (
                        <Alert severity="success">
                          Staff Updated Successfuly
                        </Alert>
                      )}
                      {deleteStaffSuccess && (
                        <Alert severity="success">
                          Staff Deleted Successfuly
                        </Alert>
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
                        <table id="customerTbl" className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>First Name </th>
                              <th>Last Name</th>
                              <th>User Name</th>
                              <th>Role </th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {staffData.map((staff) => {
                              return (
                                <tr key={staff.UserId}>
                                  <td>{staff.UserId}</td>
                                  <td>{staff.FirstName}</td>
                                  <td>{staff.LastName}</td>
                                  <td>{staff.Email}</td>
                                  <td>{staff.Role}</td>
                                  <td>
                                    {" "}
                                    <Create
                                      className="custom-create-icon"
                                      onClick={() => {
                                        settoggleAddStaff(false);
                                        setSelectedStaff(staff.UserId);
                                      }}
                                    ></Create>{" "}
                                    <Delete
                                      className="custom-delete-icon"
                                      color="error"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#deleteModal${staff.UserId}`}
                                      
                                    ></Delete>
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
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* #modal */}

              {/* <div className="modal fade" id="deleteConfirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div> */}
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

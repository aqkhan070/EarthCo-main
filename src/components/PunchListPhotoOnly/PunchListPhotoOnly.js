import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { Delete, Create, Visibility } from "@mui/icons-material";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  TablePagination,
  TableSortLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import useFetchBills from "../Hooks/useFetchBills";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/AppData";
import formatDate from "../../custom/FormatDate";
import TblDateFormat from "../../custom/TblDateFormat";
import useFetchPunchListPhotos from "../Hooks/useFetchPunchListPhotos";
import TitleBar from "../TitleBar";
import EventPopups from "../Reusable/EventPopups";

const PunchListPhotoOnly = () => {
  const icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.634 13.4211C18.634 16.7009 16.7007 18.6342 13.4209 18.6342H6.28738C2.99929 18.6342 1.06238 16.7009 1.06238 13.4211V6.27109C1.06238 2.99584 2.26688 1.06259 5.54763 1.06259H7.38096C8.03913 1.06351 8.65879 1.37242 9.05296 1.89951L9.88988 3.01234C10.2859 3.53851 10.9055 3.84834 11.5637 3.84926H14.1579C17.446 3.84926 18.6596 5.52309 18.6596 8.86984L18.634 13.4211Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M5.85754 12.2577H13.8646"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const { fetchFilterPLPhoto, tableData, totalRecords, isLoading } =
    useFetchPunchListPhotos();

  useEffect(() => {
    fetchFilterPLPhoto();
  }, []);

  const [tablePage, setTablePage] = useState(0);
  const [searchBill, setSearchBill] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilterPLPhoto(searchBill, tablePage + 1, rowsPerPage, isAscending);
  }, [searchBill, tablePage, rowsPerPage, isAscending]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const deletePunchList = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchlistPhotoOnly/DeletePunchlistPhotoOnly?id=${id}`,
        {
          headers,
        }
      );
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("PunchList Deleted Successfully");

      console.log("Customer deleted successfully:", response.data);
      fetchFilterPLPhoto();
      // window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <TitleBar icon={icon} title="Punchlist - Photos Only" />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header flex-wrap d-flex justify-content-between  border-0">
            <div>
              <TextField
                label="Search"
                variant="standard"
                size="small"
                value={searchBill}
                onChange={(e) => setSearchBill(e.target.value)}
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
                className="btn btn-primary "
                onClick={() => {
                  navigate(`/punchList-photos-only/add`);
                }}
              >
                + Add
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="center-loader">
              <CircularProgress />
            </div>
          ) : (
            <div className="card-body pt-0">
              <Table hover>
                <TableHead className="table-header">
                  <TableRow className=" bill-tbl-alignment">
                    <TableCell>Customer</TableCell>
                    <TableCell>Notes</TableCell>

                    <TableCell>Date</TableCell>
                    <TableCell>Preview</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((item) => (
                    <TableRow key={item.PunchlistPhotoOnlyId} hover>
                      <TableCell>{item.CustomerName}</TableCell>
                      <TableCell>{item.Notes}</TableCell>
                      <TableCell>
                        {TblDateFormat(item.CreatedDate)}
                      </TableCell>{" "}
                      <TableCell>
                        <span
                          onClick={() => {
                            navigate(
                              `/punchList-photos-only/preview?id=${item.PunchlistPhotoOnlyId}`
                            );
                          }}
                          className="span-hover-pointer badge badge-pill badge-success "
                        >
                          Open
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          data-bs-toggle="modal"
                          data-bs-target={`#deleteModal${item.PunchlistPhotoOnlyId}`}
                          className="btn btn-danger btn-icon-xxs "
                        >
                          {/* <i className="fas fa-trash-alt"></i> */}
                          <Delete color="error"></Delete>
                        </Button>
                      </TableCell>
                      <div
                        className="modal fade"
                        id={`deleteModal${item.PunchlistPhotoOnlyId}`}
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
                                Are you sure you want to delete This PunchList
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
                                  deletePunchList(item.PunchlistPhotoOnlyId);
                                }}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableRow>
                  ))}
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PunchListPhotoOnly;

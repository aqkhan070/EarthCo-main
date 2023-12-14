import React, { useContext, useEffect, useState } from "react";
import AddBill from "./AddBill";
import BillTitle from "./BillTitle";
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

const Bills = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };
  const [showContent, setshowContent] = useState(true);
  const [selectedBill, setselectedBill] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("DueDate");
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");

  const {
    billList,
    loading,
    fetchBills,
    billError,
    fetchFilterBills,
    filteredBillsList,
    totalRecords,
  } = useFetchBills();

  const { setBillData } = useContext(DataContext);

  const navigate = useNavigate();

  const [tablePage, setTablePage] = useState(0);
  const [searchBill, setSearchBill] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    // Initial fetch of estimates
    fetchFilterBills();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilterBills(searchBill, tablePage + 1, rowsPerPage, isAscending);
  }, [searchBill, tablePage, rowsPerPage, isAscending]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const deleteBill = async (id) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/DeleteBill?id=${id}`,
        { headers }
      );
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 4000);
      fetchFilterBills();

      console.log(res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  useEffect(() => {
    fetchBills();
    setselectedBill(0);
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredBills = filteredBillsList.filter((bill) =>
    bill.SupplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBills = filteredBills.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (order === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <BillTitle />
      <div className="container-fluid">
        <div className="card " id="bootstrap-table2">
          {loading ? (
            <div className="center-loader">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                <div>
                  <TextField
                    label="Search Bill"
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
                      // setshowContent(false);
                      navigate(`/bills/add-bill`);
                    }}
                  >
                    + Add New Bill
                  </button>
                </div>
              </div>

              <div className="card-body pt-0">
                <Table hover>
                  <TableHead className="table-header">
                    <TableRow className=" bill-tbl-alignment">
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "SupplierName"}
                          direction={orderBy === "SupplierName" ? order : "asc"}
                          onClick={() => handleSort("SupplierName")}
                        >
                          Vendor
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === "DueDate"}
                          direction={orderBy === "DueDate" ? order : "asc"}
                          onClick={() => handleSort("DueDate")}
                        >
                          Due Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell className="text-end">Amount</TableCell>
                      <TableCell>Memo</TableCell>
                      <TableCell>Currency</TableCell>
                      <TableCell>Tags</TableCell>
                      <TableCell align="center">Preview</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {billError ? (
                      <TableRow>
                        <TableCell colSpan={12} className="text-center">
                          No Record Found
                        </TableCell>
                      </TableRow>
                    ) : null}
                    {sortedBills
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((bill) => (
                        <TableRow
                          className="bill-tbl-alignment"
                          onDoubleClick={() => {
                            // setshowContent(false);
                            // setselectedBill(bill.BillId);
                            navigate(`/bills/add-bill?id=${bill.BillId}`);
                          }}
                          hover
                          key={bill.BillId}
                        >
                          <TableCell>{bill.SupplierName}</TableCell>
                          <TableCell>{TblDateFormat(bill.DueDate)}</TableCell>
                          <TableCell className="text-end ">
                            {bill.Amount}
                          </TableCell>
                          <TableCell>{bill.Memo}</TableCell>
                          <TableCell>{bill.Currency}</TableCell>
                          <TableCell>{bill.Tags}</TableCell>
                          <TableCell align="center">
                            <Button
                              // className="btn btn-primary btn-icon-xxs me-2"
                              onClick={() => {
                                navigate(
                                  `/bills/bill-preview?id=${bill.BillId}`
                                );
                                // setBillData(bill);
                                // console.log(estimate.EstimateId);
                              }}
                            >
                              {/* <i className="fa-solid fa-eye"></i> */}

                              <Visibility />
                            </Button>
                            {/* <Button
                                      // className="btn btn-primary btn-icon-xxs me-2"
                                      onClick={() => {
                                        setshowContent(false);
                                        setselectedBill(bill.BillId);
                                      }}
                                    >
                                       <i className="fas fa-pencil-alt"></i>
                                      <Create></Create>
                                    </Button> */}
                            {/*  <Button
                                      data-bs-toggle="modal"
                                      // className="btn btn-danger btn-icon-xxs mr-2"
                                      data-bs-target={`#deleteModal${bill.BillId}`}
                                    >
                                     <i className="fas fa-trash-alt"></i>
                                      <Delete color="error"></Delete>
                                    </Button> */}

                            <div
                              className="modal fade"
                              id={`deleteModal${bill.BillId}`}
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
                                    <h5 className="modal-title">Delete Bill</h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    <p>
                                      Are you sure you want to delete{" "}
                                      {bill.BillId}
                                    </p>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      id="closer"
                                      className="btn btn-danger light me-"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                      onClick={() => deleteBill(bill.BillId)}
                                    >
                                      Yes
                                    </button>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Bills;

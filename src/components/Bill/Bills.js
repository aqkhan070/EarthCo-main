import React, { useEffect, useState } from "react";
import AddBill from "./AddBill";
import BillTitle from "./BillTitle";
import axios from "axios";
import Cookies from "js-cookie";
import { Delete, Create } from "@mui/icons-material";
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
} from "@mui/material";
import Alert from '@mui/material/Alert';
import CircularProgress from "@mui/material/CircularProgress";
import useFetchBills from "../Hooks/useFetchBills";



const Bills = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };
  const [showContent, setshowContent] = useState(true);
  const [selectedBill, setselectedBill] = useState(0)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("DueDate");
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { billList, loading, fetchBills } = useFetchBills();


 
  const deleteBill = async (id) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Bill/DeleteBill?id=${id}`,
        { headers }
      );
      setDeleteSuccess(true)
      setTimeout(() => {
        setDeleteSuccess(false)
      }, 4000);
    fetchBills()
     
      console.log(res.data);
    } catch (error) {
      console.log("api call error", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredBills = billList.filter((bill) =>
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {showContent ? (
        <>
          <BillTitle />
          <div className="container-fluid">
            <div className="row">

              <div className="card dz-card" id="bootstrap-table2">
              {deleteSuccess && <Alert className="mt-2" severity="success">Successfully deleted Bill</Alert>}
              {submitSuccess && <Alert className="mt-2" severity="success">{submitSuccess? submitSuccess:"Successfully Added/Updated bill"}</Alert>}
                {loading? <div className="center-loader">
                      <CircularProgress />
                    </div>:<>
                    <div className="row">
                  <div className="col-md-2 mt-2">
                    <TextField
                      label="Search"
                      variant="standard"
                      fullWidth
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-8"></div>

                  <div className="col-md-2 mt-3">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setshowContent(false);
                      }}
                    >
                      + Add New Bill
                    </Button>
                  </div>
                </div>
                <div className="row"></div>
                <div className="card-body">
                  <TableContainer component={Paper}>
                    <Table hover>
                      <TableHead className="table-header">
                        <TableRow>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "SupplierName"}
                              direction={
                                orderBy === "SupplierName" ? order : "asc"
                              }
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
                          <TableCell>Amount</TableCell>
                          <TableCell>Memo</TableCell>
                          <TableCell>Currency</TableCell>
                          <TableCell>Tags</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedBills
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((bill) => (
                            <TableRow hover key={bill.BillId}>
                              <TableCell>{bill.SupplierName}</TableCell>
                              <TableCell>{bill.DueDate}</TableCell>
                              <TableCell>{bill.Amount}</TableCell>
                              <TableCell>{bill.Memo}</TableCell>
                              <TableCell>{bill.Currency}</TableCell>
                              <TableCell>{bill.Tags}</TableCell>
                              <TableCell>
                                <Button onClick={() => {
                                  setshowContent(false);
                                  setselectedBill(bill.BillId)
                                }}>
                                <Create color="success" />

                                </Button>
                                <Button  data-bs-toggle="modal"
                          data-bs-target={`#deleteModal${bill.BillId}`}>

                                <Delete color="error" />
                                </Button>

                                <div
                        className="modal fade"
                        id={`deleteModal${bill.BillId}`}
                        tabIndex="-1"
                        aria-labelledby="deleteModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">
                                Are you sure you want to delete{" "}
                                {bill.BillId}
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
                                  onClick={() => deleteBill(bill.BillId)}
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
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={sortedBills.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </div>
                    </>}
                

              </div>
            </div>
          </div>
        </>
      ) : (
        <AddBill setshowContent={setshowContent} fetchBills={fetchBills} selectedBill={selectedBill} setSubmitSuccess={setSubmitSuccess} />
      )}
    </>
  );
};

export default Bills;

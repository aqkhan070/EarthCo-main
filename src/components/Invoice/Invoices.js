import React, { useState, useEffect, useContext } from "react";
import AddInvioces from "./AddInvioces";
import InvoiceTitleBar from "./InvoiceTitleBar";
import InvoiceCards from "./InvoiceCards";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  TextField,
  Button,
} from "@mui/material";
import { Delete, Create, Visibility } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import useFetchInvoices from "../Hooks/useFetchInvoices";
import { DataContext } from "../../context/AppData";
import { useNavigate } from "react-router-dom";
import formatDate from "../../custom/FormatDate";

const Invoices = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const navigate = useNavigate();
  const { setInvoiceData } = useContext(DataContext);
  const {
    invoiceList,
    loading,
    error,
    fetchInvoices,
    fetchFilterInvoice,
    filteredInvoiceList,
    totalRecords,
  } = useFetchInvoices();
  const [showContent, setShowContent] = useState(true);

  const [selectedInvoice, setSelectedInvoice] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteRes, setDeleteRes] = useState("");
  const [submitRes, setSubmitRes] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [tablePage, setTablePage] = useState(0);
  const [statusId, setStatusId] = useState(0);
  const [search, setSearch] = useState("");
  useEffect(() => {
    // Initial fetch of estimates
    fetchFilterInvoice();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilterInvoice(search, tablePage + 1, rowsPerPage, statusId);
  }, [search, tablePage, rowsPerPage, statusId]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredInvoices = filteredInvoiceList;

  const sortedInvoices = filteredInvoices.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedInvoices.length - page * rowsPerPage);

  const deleteInvoice = async (id) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Invoice/DeleteInvoice?id=${id}`,
        { headers }
      );
      console.log(res.data);
      fetchFilterInvoice();
      setDeleteRes(res.data);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 4000);
    } catch (error) {
      console.log("delete api error", error);
    }
  };

  return (
    <>
      {showContent ? (
        <>
          <InvoiceTitleBar />
          <div className="container-fluid">
            <div className="row">
              <InvoiceCards />
              <div className="col-xl-12" id="bootstrap-table2">
                <div className="card">
                  {deleteSuccess && (
                    <Alert className="mb-3" severity="success">
                      {deleteRes ? deleteRes : "Successfuly Deleted Invoice"}
                    </Alert>
                  )}
                  {submitRes && (
                    <Alert className="mb-3" severity="success">
                      {submitRes
                        ? submitRes
                        : "Successfuly Added/Updated Invoice"}
                    </Alert>
                  )}

                  {loading ? (
                    <div className="center-loader">
                      <CircularProgress />
                    </div>
                  ) : (
                    <>
                      <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                        <TextField
                          label="Search Invoices"
                          variant="standard"
                          size="small"
                          style={{ width: "15em" }}
                          fullWidth
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <div>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setShowContent(false);
                            }}
                          >
                            + Add New Invoice
                          </button>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="table-responsive active-projects style-1 shorting dt-filter exports">
                          <div>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  {/* <TableCell style={{ width: "50px" }}>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="checkAll"
                                        required=""
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="checkAll"
                                      ></label>
                                    </div>
                                  </TableCell> */}
                                  <TableCell>
                                    <TableSortLabel
                                      active={orderBy === "InvoiceNumber"}
                                      direction={
                                        orderBy === "InvoiceNumber"
                                          ? order
                                          : "asc"
                                      }
                                      onClick={() =>
                                        handleRequestSort("InvoiceNumber")
                                      }
                                    >
                                      Invoice
                                    </TableSortLabel>
                                  </TableCell>
                                  <TableCell>
                                    <TableSortLabel
                                      active={orderBy === "IssueDate"}
                                      direction={
                                        orderBy === "IssueDate" ? order : "asc"
                                      }
                                      onClick={() =>
                                        handleRequestSort("IssueDate")
                                      }
                                    >
                                      Issue Date
                                    </TableSortLabel>
                                  </TableCell>
                                  <TableCell>Customer</TableCell>
                                  <TableCell className="text-end">
                                    Balance
                                  </TableCell>
                                  <TableCell className="text-end">
                                    Total
                                  </TableCell>
                                  <TableCell>Service#</TableCell>
                                  <TableCell>Status</TableCell>
                                  {/* <TableCell>Actions</TableCell> */}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  {error ? (
                                    <TableCell
                                      className="text-center"
                                      colSpan={9}
                                    >
                                      {" "}
                                      <div className="text-center">
                                        No Record Found
                                      </div>
                                    </TableCell>
                                  ) : null}
                                </TableRow>

                                {sortedInvoices
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((invoice, index) => (
                                    <TableRow
                                      onDoubleClick={() => {
                                        setSelectedInvoice(invoice.InvoiceId);
                                        setShowContent(false);
                                      }}
                                      hover
                                      key={index}
                                    >
                                      {/* <TableCell>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            required=""
                                          />
                                          <label className="form-check-label"></label>
                                        </div>
                                      </TableCell> */}
                                      <TableCell>
                                        {invoice.InvoiceNumber}
                                      </TableCell>
                                      <TableCell>
                                        {formatDate(invoice.IssueDate)}
                                      </TableCell>
                                      <TableCell>
                                        {invoice.CustomerName}
                                      </TableCell>
                                      <TableCell className="text-end">
                                        {invoice.BalanceAmount}
                                      </TableCell>
                                      <TableCell className="text-end">
                                        {invoice.TotalAmount.toFixed(2)}
                                      </TableCell>
                                      <TableCell></TableCell>
                                      <TableCell>
                                        <span
                                          onClick={() => {
                                            setInvoiceData(invoice);
                                            navigate(
                                              "/Dashboard/Invoices/Invoice-Preview"
                                            );
                                          }}
                                          className="  span-hover-pointer badge badge-pill badge-success "
                                        >
                                          Open
                                        </span>
                                      </TableCell>
                                      {/* <TableCell>
                                      <Button
                            // className="btn btn-primary btn-icon-xxs me-2"
                            onClick={() => {
                              setInvoiceData(invoice)
                              navigate(
                                "/Dashboard/Invoices/Invoice-Preview"
                              );
                            }}
                          >
                            <i className="fa-solid fa-eye"></i> 

                            <Visibility />
                          </Button>
                                        <Button
                                          onClick={() => {
                                            setSelectedInvoice(
                                              invoice.InvoiceId
                                            );
                                            setShowContent(false);
                                          }}
                                        >
                                          <Create color="success" />
                                        </Button>
                                        <Button
                                          data-bs-toggle="modal"
                                          data-bs-target={`#deleteModal${invoice.InvoiceId}`}
                                        >
                                          <Delete color="error" />
                                        </Button>
                                        <div
                                          className="modal fade"
                                          id={`deleteModal${invoice.InvoiceId}`}
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
                                                 Delete Invoice
                                                </h5>
                                                <button
                                                  type="button"
                                                  className="btn-close"
                                                  data-bs-dismiss="modal"
                                                ></button>
                                              </div>
                                              <div className="modal-body">
                                                <p className="text-left">
                                                Are you sure you want to
                                                  delete {invoice.InvoiceNumber}
                                                </p>
                                                </div>
                                                <div className="modal-footer">
                                                  <button
                                                    type="button"
                                                    id="closer"
                                                    className="btn btn-danger light me-2"
                                                    data-bs-dismiss="modal"
                                                  >
                                                    Close
                                                  </button>
                                                  <button
                                                    className="btn btn-primary "
                                                    data-bs-dismiss="modal"
                                                    onClick={() => {
                                                      deleteInvoice(
                                                        invoice.InvoiceId
                                                      );
                                                      console.log(
                                                        "delete id",
                                                        invoice.InvoiceId
                                                      );
                                                    }}
                                                  >
                                                    Yes
                                                  </button>
                                                </div>
                                              
                                            </div>
                                          </div>
                                        </div>
                                      </TableCell> */}
                                    </TableRow>
                                  ))}
                                {emptyRows > 0 && (
                                  <TableRow>
                                    <TableCell colSpan={9} />
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
                                setRowsPerPage(
                                  parseInt(event.target.value, 10)
                                );
                                setTablePage(0); // Reset the tablePage to 0 when rowsPerPage changes
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <AddInvioces
          setSelectedInvoice={setSelectedInvoice}
          setShowContent={setShowContent}
          selectedInvoice={selectedInvoice}
          fetchInvoices={fetchInvoices}
          setSubmitRes={setSubmitRes}
          fetchFilterInvoice={fetchFilterInvoice}
        />
      )}
    </>
  );
};

export default Invoices;

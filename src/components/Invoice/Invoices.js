import React, { useState, useEffect } from "react";
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
import { Delete, Create } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import useFetchInvoices from "../Hooks/useFetchInvoices";

const Invoices = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { invoiceList, loading, error, fetchInvoices } = useFetchInvoices();
  const [showContent, setShowContent] = useState(true);

  const [selectedInvoice, setSelectedInvoice] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteRes, setDeleteRes] = useState("");
  const [submitRes, setSubmitRes] = useState("")

 
  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredInvoices = invoiceList.filter((invoice) =>
    invoice.InvoiceNumber.toLowerCase().includes(searchText.toLowerCase())
  );

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
      fetchInvoices();
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
              <div className="card dz-card" id="bootstrap-table2">
                <div className="col-xl-12">
                  {deleteSuccess && (
                    <Alert className="mb-3" severity="success">
                      {deleteRes ? deleteRes : "Successfuly Deleted Invoice"}
                    </Alert>
                  )}
                  {submitRes && (
                    <Alert className="mb-3" severity="success">
                      {submitRes ? submitRes : "Successfuly Added/Updated Invoice"}
                    </Alert>
                  )}
                  {error && (
                    <Alert className="mb-3" severity="error">
                      {error ? error : "Error fetching Invoice Data"}
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
                          label="Search"
                          variant="standard"
                          size="small"
                          style={{ marginBottom: "2em", width: "15em" }}
                          fullWidth
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
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
                                  <TableCell style={{ width: "50px" }}>
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
                                  </TableCell>
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
                                  <TableCell>Balance</TableCell>
                                  <TableCell>Total</TableCell>
                                  <TableCell>Service#</TableCell>
                                  <TableCell>Status</TableCell>
                                  <TableCell>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {sortedInvoices
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((invoice, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            required=""
                                          />
                                          <label className="form-check-label"></label>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        {invoice.InvoiceNumber}
                                      </TableCell>
                                      <TableCell>{invoice.IssueDate}</TableCell>
                                      <TableCell>
                                        {invoice.CustomerName}
                                      </TableCell>
                                      <TableCell>
                                        {invoice.BalanceAmount}
                                      </TableCell>
                                      <TableCell>
                                        {invoice.TotalAmount}
                                      </TableCell>
                                      <TableCell></TableCell>
                                      <TableCell>
                                        <div className="d-flex align-items-center">
                                          <i className="fa fa-circle text-success me-1"></i>{" "}
                                          Open
                                        </div>
                                      </TableCell>
                                      <TableCell>
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
                                            className="modal-dialog"
                                            role="document"
                                          >
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title">
                                                  Are you sure you want to
                                                  delete {invoice.InvoiceNumber}
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
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                {emptyRows > 0 && (
                                  <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={9} />
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                            <TablePagination
                              rowsPerPageOptions={[10, 25, 50]}
                              component="div"
                              count={sortedInvoices.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
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
          setShowContent={setShowContent}
          selectedInvoice={selectedInvoice}
          fetchInvoices={fetchInvoices}
          setSubmitRes={setSubmitRes}
        />
      )}
    </>
  );
};

export default Invoices;

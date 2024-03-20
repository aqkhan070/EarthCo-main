import React, { useState, useEffect, useContext } from "react";

import InvoiceTitleBar from "./InvoiceTitleBar";

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
  Checkbox ,
  FormControl,
  Select,
  MenuItem,
  ListSubheader
} from "@mui/material";
import { Delete, Create, Visibility } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import useFetchInvoices from "../Hooks/useFetchInvoices";

import { useNavigate } from "react-router-dom";
import { useEstimateContext } from "../../context/EstimateContext";


import TblDateFormat from "../../custom/TblDateFormat";
import AddButton from "../Reusable/AddButton";
import formatAmount from "../../custom/FormatAmount";
const Invoices = () => {
  const navigate = useNavigate();
  const {
    invoiceList,
    loading,
    error,
    fetchInvoices,
    fetchFilterInvoice,
    filteredInvoiceList,
    totalRecords,
  } = useFetchInvoices();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setEstimateLinkData } = useEstimateContext();

  useEffect(() => {
    fetchInvoices();
    setEstimateLinkData({})
  }, []);

  const [tablePage, setTablePage] = useState(0);
  const [statusId, setStatusId] = useState(0);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [isIssueDate, setIsIssueDate] = useState(false)

  

  useEffect(() => {
    fetchFilterInvoice(
      search,
      tablePage + 1,
      rowsPerPage,
      statusId,
      isAscending,
      isIssueDate
    );
  }, [search, tablePage, rowsPerPage, statusId, isAscending, isIssueDate]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  return (
    <>
      <InvoiceTitleBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12" id="bootstrap-table2">
            <div className="card">
              {loading ? (
                <div className="center-loader">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                    <div>
                      <TextField
                        label="Search Invoices"
                        variant="standard"
                        size="small"
                        style={{ width: "15em" }}
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className=" pe-2">
                      <FormControl className=" me-3" variant="outlined">
                        <Select
                          labelId="customer-type-label"
                          variant="outlined"
                          value={isAscending}
                         
                          size="small"
                        >
                          <MenuItem value={true} onClick={() => {setIsAscending(true)}}>Ascending</MenuItem>
                          <MenuItem value={false} onClick={() => {setIsAscending(false)}}>Descending</MenuItem>
                          <ListSubheader>Sort By</ListSubheader>
                          <MenuItem onClick={() => {setIsIssueDate(true)}} ><><Checkbox checked={isIssueDate} />  Issue Date</> </MenuItem>
                          <MenuItem onClick={() => {setIsIssueDate(false)}} > <><Checkbox checked={!isIssueDate}/> Created Date</></MenuItem>
                        </Select>
                      </FormControl>
                      <AddButton
                        onClick={() => {
                          navigate(`/invoices/add-invoices`);
                        }}
                      >
                        Add Invoice
                      </AddButton>
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <Table>
                      <TableHead className="table-header">
                        <TableRow className="bill-tbl-alignment">
                          <TableCell>Invoice</TableCell>
                          <TableCell>Issue Date</TableCell>
                          <TableCell>Customer</TableCell>

                          <TableCell>Estimate #</TableCell>
                          <TableCell>Bill #</TableCell>
                          <TableCell>Profit %</TableCell>
                          <TableCell className="text-end">Balance</TableCell>
                          <TableCell className="text-end">Total</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {error ? (
                            <TableCell className="text-center" colSpan={9}>
                              <div className="text-center">No Record Found</div>
                            </TableCell>
                          ) : null}
                        </TableRow>

                        {filteredInvoiceList
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((invoice, index) => (
                            <TableRow
                              className="bill-tbl-alignment"
                              onClick={() => {
                                // setSelectedInvoice(invoice.InvoiceId);
                                // setShowContent(false);
                                navigate(
                                  `/invoices/add-invoices?id=${invoice.InvoiceId}`
                                );
                              }}
                              hover
                              key={index}
                            >
                              <TableCell>{invoice.InvoiceNumber}</TableCell>
                              <TableCell>
                                {TblDateFormat(invoice.IssueDate)}
                              </TableCell>
                              <TableCell>{invoice.CustomerName}</TableCell>

                              <TableCell>{invoice.EstimateNumber}</TableCell>
                              <TableCell>{invoice.BillNumber}</TableCell>
                              <TableCell>
                                {invoice.ProfitPercentage?.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-end">
                                ${formatAmount(invoice.BalanceAmount)}
                              </TableCell>
                              <TableCell className="text-end">
                                ${formatAmount(invoice.TotalAmount)}
                              </TableCell>
                              <TableCell>
                                <span
                                  onClick={() => {
                                    // setInvoiceData(invoice);
                                    navigate(
                                      `/invoices/invoice-preview?id=${invoice.InvoiceId}`
                                    );
                                  }}
                                  className="  span-hover-pointer badge badge-pill badge-success "
                                >
                                  Open
                                </span>
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
        </div>
      </div>
    </>
  );
};

export default Invoices;

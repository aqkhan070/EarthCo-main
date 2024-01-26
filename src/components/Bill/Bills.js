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
import AddButton from "../Reusable/AddButton";
import formatAmount from "../../custom/FormatAmount";
const Bills = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    billList,
    loading,

    billError,
    fetchFilterBills,
    filteredBillsList,
    totalRecords,
  } = useFetchBills();

  const navigate = useNavigate();

  const [tablePage, setTablePage] = useState(0);
  const [searchBill, setSearchBill] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    fetchFilterBills();
  }, []);

  useEffect(() => {
    fetchFilterBills(searchBill, tablePage + 1, rowsPerPage, isAscending);
  }, [searchBill, tablePage, rowsPerPage, isAscending]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
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
                  <AddButton
                    onClick={() => {
                      // setshowContent(false);
                      navigate(`/bills/add-bill`);
                    }}
                  >
                    Add Bill
                  </AddButton>
                </div>
              </div>

              <div className="card-body pt-0">
                <Table hover>
                  <TableHead className="table-header">
                    <TableRow className=" bill-tbl-alignment">
                      <TableCell>Vendor</TableCell>
                      <TableCell>Due Date</TableCell>
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
                    {filteredBillsList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((bill) => (
                        <TableRow
                          className="bill-tbl-alignment"
                          onClick={() => {
                            navigate(`/bills/add-bill?id=${bill.BillId}`);
                          }}
                          hover
                          key={bill.BillId}
                        >
                          <TableCell>{bill.SupplierName}</TableCell>
                          <TableCell>{TblDateFormat(bill.DueDate)}</TableCell>
                          <TableCell className="text-end ">
                            ${formatAmount(bill.Amount)}
                          </TableCell>
                          <TableCell>{bill.Memo}</TableCell>
                          <TableCell>{bill.Currency}</TableCell>
                          <TableCell>{bill.Tags}</TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() => {
                                navigate(
                                  `/bills/bill-preview?id=${bill.BillId}`
                                );
                              }}
                            >
                              <Visibility />
                            </Button>
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

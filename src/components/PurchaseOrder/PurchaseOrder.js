import React, { useContext, useEffect, useRef, useState } from "react";
import { AddPO } from "./AddPO";
import PoCards from "./PoCards";
import PoTitle from "./PoTitle";
import axios from "axios";
import Cookies from "js-cookie";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  TablePagination,
  TableSortLabel,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Create, Visibility } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import useFetchPo from "../Hooks/useFetchPo";
import { NavLink, useNavigate } from "react-router-dom";
import { useEstimateContext } from "../../context/EstimateContext";
import formatDate from "../../custom/FormatDate";
import TitleBar from "../TitleBar";
import TblDateFormat from "../../custom/TblDateFormat";
import AddButton from "../Reusable/AddButton";
import formatAmount from "../../custom/FormatAmount";


const PurchaseOrder = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const {
    PoList,
    loading,
    error,
    fetchPo,
    filteredPo,
    fetchFilterPo,
    totalRecords,
  } = useFetchPo();

  const icon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4065 14.8714H7.78821"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14.4065 11.0338H7.78821"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M10.3137 7.2051H7.78827"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5829 2.52066C14.5829 2.52066 7.54563 2.52433 7.53463 2.52433C5.00463 2.53991 3.43805 4.20458 3.43805 6.74374V15.1734C3.43805 17.7254 5.01655 19.3965 7.56855 19.3965C7.56855 19.3965 14.6049 19.3937 14.6168 19.3937C17.1468 19.3782 18.7143 17.7126 18.7143 15.1734V6.74374C18.7143 4.19174 17.1349 2.52066 14.5829 2.52066Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const [showContent, setShowContent] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedPo, setselectedPo] = useState(0);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteRes, setDeleteRes] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const [postSuccessRes, setPostSuccessRes] = useState("");

  const navigate = useNavigate();
  const { setEstimateLinkData } = useEstimateContext();

  const [tablePage, setTablePage] = useState(0);
  const [statusId, setStatusId] = useState(0);
  const [searchPo, setSearchPo] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    // Initial fetch of estimates
    fetchFilterPo();
    setEstimateLinkData({})
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilterPo(searchPo, tablePage + 1, rowsPerPage, statusId, isAscending);
    console.log("search is", searchPo);
  }, [searchPo, tablePage, rowsPerPage, statusId, isAscending]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const deletePo = async (id) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PurchaseOrder/DeletePurchaseOrder?id=${id}`,
        { headers }
      );
      setDeleteRes(res.data);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 4000);
      fetchFilterPo();
      console.log("delete response", res.data);
    } catch (error) {
      setDeleteRes(error);
      setDeleteError(true);
      setTimeout(() => {
        setDeleteError(false);
      }, 4000);

      console.log("error deleting PO", error);
    }
  };

  useEffect(() => {
    // fetchPo();
    setselectedPo(0);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPoList = filteredPo;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedPoList.length - page * rowsPerPage);

  return (
    <>
      <TitleBar icon={icon} title="Add Purchase order" />

      <div className="container-fluid">
        <div className="row">
          <PoCards
            closed={totalRecords.totalClosedRecords}
            open={totalRecords.totalOpenRecords}
            setStatusId={setStatusId}
            statusId={statusId}
          />

          <div className="col-xl-3 mb-3 text-right"></div>
          <div className="col-xl-12">
            <div className="card dz-card">
              {deleteError && (
                <Alert className="m-3" severity="error">
                  {deleteRes ? deleteRes : "Error deleting Purchase order"}
                </Alert>
              )}
              {deleteSuccess && (
                <Alert className="m-3" severity="success">
                  {deleteRes
                    ? deleteRes
                    : "Successfully deleted purchase order"}
                </Alert>
              )}
              {postSuccess && (
                <Alert className="m-3" severity="success">
                  {postSuccessRes
                    ? postSuccessRes
                    : "Successfully Added purchase order"}
                </Alert>
              )}
              {/* {error && (
                    <Alert className="m-3" severity="error">
                      {error? error: "Error fetching purchase order data"}
                    </Alert>
                  )} */}

              {loading ? (
                <div className="center-loader">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                    <div>
                      <TextField
                        label="Search Purchase order"
                        variant="standard"
                        size="small"
                        value={searchPo}
                        onChange={(e) => setSearchPo(e.target.value)}
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
                          navigate("/purchase-order/add-po");
                          // setShowContent(false);
                        }}
                      >
                        Add Purchase Order
                      </AddButton>
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <Table>
                      <TableHead className="table-header">
                        <TableRow className="material-tbl-alignment">
                          <TableCell>Vendor</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Regional Manager</TableCell>
                          <TableCell>Requested By</TableCell>
                          <TableCell>Estimate#</TableCell>
                          <TableCell>Bill#</TableCell>
                          <TableCell>Invoice#</TableCell>
                          <TableCell className="text-end">Amount</TableCell>
                          {/* <TableCell>Actions</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {error ? (
                          <TableRow>
                            {" "}
                            <TableCell className="text-center" colSpan={9}>
                              {" "}
                              No records found{" "}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredPo.map((po, index) => (
                            <TableRow
                              className="material-tbl-alignment"
                              onClick={() => {
                                // setShowContent(false);
                                // setselectedPo(po.PurchaseOrderId);
                                navigate(
                                  `/purchase-order/add-po?id=${po.PurchaseOrderId}`
                                );
                              }}
                              hover
                              key={index}
                            >
                              <TableCell>{po.SupplierName}</TableCell>
                              <TableCell>{TblDateFormat(po.Date)}</TableCell>
                              <TableCell>
                                <span
                                  onClick={() => {
                                    navigate(
                                      `/purchase-order/purchase-order-preview?id=${po.PurchaseOrderId}`
                                    );
                                  }}
                                  style={{
                                    backgroundColor: po.StatusColor,
                                  }}
                                  className=" span-hover-pointer badge badge-pill "
                                >
                                  {po.Status}
                                </span>
                              </TableCell>
                              <TableCell>{po.RegionalManager}</TableCell>
                              <TableCell>{po.RequestedBy}</TableCell>
                              <TableCell>{po.EstimateNumber}</TableCell>
                              <TableCell>{po.BillNumber}</TableCell>
                              <TableCell>{po.InvoiceNumber}</TableCell>
                              <TableCell className="text-end">
                                ${formatAmount(po.Amount)}
                              </TableCell>
                              {/* <TableCell>
                                    <div className="button-container">
                                      <Button
                                        // className="btn btn-primary btn-icon-xxs me-2"
                                        onClick={() => {
                                          goToPrint(po);
                                        }}
                                      >
                                       <i className="fa-solid fa-eye"></i> 

                                        <Visibility />
                                      </Button>
                                      <Button
                                        //  className="btn btn-primary btn-icon-xxs me-2"
                                        onClick={() => {
                                          setShowContent(false);
                                          setselectedPo(po.PurchaseOrderId);
                                        }}
                                      >
                                      <i className="fas fa-pencil-alt"></i>
                                        <Create></Create>
                                      </Button>
                                      <Button
                                        // className="btn btn-danger btn-icon-xxs mr-2"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deleteModal${po.PurchaseOrderId}`}
                                      >
                                       <i className="fas fa-trash-alt"></i> 
                                        <Delete color="error"></Delete>
                                      </Button>
                                      <div
                                        className="modal fade"
                                        id={`deleteModal${po.PurchaseOrderId}`}
                                        tabIndex="-1"
                                        aria-labelledby="deleteModalLabel"
                                        aria-hidden="true"
                                      >
                                        <div
                                          className="modal-dialog modal-dialog modal-dialog-centered"
                                          role="document"
                                        >
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5 className="modal-title">
                                                Delete Purchase Order
                                              </h5>
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                              ></button>
                                            </div>
                                            <div className="modal-body">
                                              <p>
                                                Are you sure you want to delete{" "}
                                                {po.PurchaseOrderId}?
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
                                                  deletePo(po.PurchaseOrderId);
                                                }}
                                              >
                                                Yes
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell> */}
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>

                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component="div"
                      count={totalRecords.totalRecords}
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

export default PurchaseOrder;

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
} from "@mui/material";
import { Delete, Create, Visibility } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import useFetchPo from "../Hooks/useFetchPo";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/AppData";
import formatDate from "../../custom/FormatDate";

const PurchaseOrder = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { PoList, loading, error, fetchPo, filteredPo, fetchFilterPo, totalRecords } = useFetchPo();
 
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

  const [open, setOpen] = useState(0)
  const [closed, setClosed] = useState(0)

  const navigate = useNavigate();
  const {setPOData} = useContext(DataContext);

  useEffect(() => {
    // Filter the estimates array to get only the entries with Status === "Pending"
    const pendingPO = PoList.filter(estimate => estimate.Status === "Open");
    const pendingClosed = PoList.filter(estimate => estimate.Status === "Closed");
   

    // Update the state variable with the number of pending estimates
    setOpen(pendingPO.length);
    setClosed(pendingClosed.length);
   
  }, [PoList]);


  const [tablePage, setTablePage] = useState(0);
  const [statusId, setStatusId] = useState(0)
  useEffect(() => {
    // Initial fetch of estimates
    fetchFilterPo(1, rowsPerPage, statusId);
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilterPo(tablePage + 1, rowsPerPage, statusId);
  }, [tablePage, rowsPerPage, statusId]);
  
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
    setselectedPo(0)
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

  const sortedPoList = filteredPo.filter((po) =>
    po.SupplierName.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (orderBy === "Vendor") {
      return order === "asc"
        ? a.SupplierName.localeCompare(b.SupplierName)
        : b.SupplierName.localeCompare(a.SupplierName);
    }
    // Add more cases for other columns if needed
    return 0;
  });

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedPoList.length - page * rowsPerPage);

  return (
    <>
      {showContent ? (
        <>
          <PoTitle />
          <div className="container-fluid">
            <div className="row">
              <PoCards closed={totalRecords.totalClosedRecords} open={totalRecords.totalOpenRecords} setStatusId={setStatusId} statusId={statusId} />

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
                        <TextField
                          label="Search Purchase order"
                          variant="standard"
                          size="small"
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
                            + Add New Purchase Order
                          </button>
                        </div>
                      </div>

                      <div className="card-body">
                       
                          <Table>
                            <TableHead className="table-header">
                              <TableRow>
                                <TableCell>
                                  <TableSortLabel
                                    active={orderBy === "Vendor"}
                                    direction={
                                      orderBy === "Vendor" ? order : "asc"
                                    }
                                    onClick={() => handleRequestSort("Vendor")}
                                  >
                                    Vendor
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Regional Manager</TableCell>
                                <TableCell>Requested By</TableCell>
                                <TableCell>Estimate#</TableCell>
                                <TableCell>Bill#</TableCell>
                                <TableCell>Invoice#</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {error ? <TableRow> <TableCell className="text-center" colSpan={9}> No records found </TableCell></TableRow>: null}
                              {sortedPoList
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((po) => (

                                  <TableRow hover key={po.EstimateNumber}>
                                    <TableCell>{po.SupplierName}</TableCell>
                                    <TableCell>{formatDate(po.Date)}</TableCell>
                                    <TableCell>{po.Status}</TableCell>
                                    <TableCell>{po.RegionalManager}</TableCell>
                                    <TableCell>{po.RequestedBy}</TableCell>
                                    <TableCell>{po.EstimateNumber}</TableCell>
                                    <TableCell>{po.BillNumber}</TableCell>
                                    <TableCell>{po.InvoiceNumber}</TableCell>
                                    <TableCell>{po.Amount}</TableCell>
                                    <TableCell>
                                      <div className="button-container">
                                      <Button
                            // className="btn btn-primary btn-icon-xxs me-2"
                            onClick={() => {
                              setPOData(po)
                              navigate(
                                "/Dashboard/Purchase-Order/Purchase-Order-Preview"
                              );
                            }}
                          >
                            {/* <i className="fa-solid fa-eye"></i> */}

                            <Visibility />
                          </Button>
                                        <Button
                                          //  className="btn btn-primary btn-icon-xxs me-2"
                                          onClick={() => {
                                            setShowContent(false);
                                            setselectedPo(po.PurchaseOrderId);
                                          }}
                                        >
                                          {/* <i className="fas fa-pencil-alt"></i> */}
                                          <Create></Create>
                                        </Button>
                                        <Button
                                          // className="btn btn-danger btn-icon-xxs mr-2"
                                          data-bs-toggle="modal"
                                          data-bs-target={`#deleteModal${po.PurchaseOrderId}`}
                                        >
                                         {/* <i className="fas fa-trash-alt"></i> */}
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
                                                Are you sure you want to
                                                  delete {po.PurchaseOrderId}?
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
                                                      deletePo(
                                                        po.PurchaseOrderId
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
      ) : (
        <AddPO
        setselectedPo={setselectedPo}
          selectedPo={selectedPo}
          setShowContent={setShowContent}
          setPostSuccessRes={setPostSuccessRes}
          setPostSuccess={setPostSuccess}
          fetchPo={fetchPo}
          fetchFilterPo={fetchFilterPo}
        />
      )}
    </>
  );
};

export default PurchaseOrder;

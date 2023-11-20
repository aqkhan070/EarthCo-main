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
import { Delete, Create } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import useFetchPo from "../Hooks/useFetchPo";

const PurchaseOrder = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { PoList, loading, error, fetchPo } = useFetchPo();
 
  const [showContent, setShowContent] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedPo, setselectedPo] = useState(0);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteRes, setDeleteRes] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const [postSuccessRes, setPostSuccessRes] = useState("");
  

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
      fetchPo();
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
    fetchPo();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPoList = PoList.filter((po) =>
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
              <PoCards />

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
                  {error && (
                    <Alert className="m-3" severity="error">
                      {error? error: "Error fetching purchase order data"}
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
                        <TableContainer component={Paper}>
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
                                <TableCell>R-Manager</TableCell>
                                <TableCell>R-By</TableCell>
                                <TableCell>Estimate#</TableCell>
                                <TableCell>Bill#</TableCell>
                                <TableCell>Invoice#</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sortedPoList
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((po) => (
                                  <TableRow key={po.EstimateNumber}>
                                    <TableCell>{po.SupplierName}</TableCell>
                                    <TableCell>{po.Date}</TableCell>
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
                                          className="delete-button"
                                          onClick={() => {
                                            setShowContent(false);
                                            setselectedPo(po.PurchaseOrderId);
                                          }}
                                        >
                                          <Create
                                            style={{ color: "#7c9c3d" }}
                                          />
                                        </Button>
                                        <Button
                                          className="delete-button"
                                          data-bs-toggle="modal"
                                          data-bs-target={`#deleteModal${po.PurchaseOrderId}`}
                                        >
                                          <Delete color="error" />
                                        </Button>
                                        <div
                                          className="modal fade"
                                          id={`deleteModal${po.PurchaseOrderId}`}
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
                                                  delete {po.PurchaseOrderId}
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
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={sortedPoList.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
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
          selectedPo={selectedPo}
          setShowContent={setShowContent}
          setPostSuccessRes={setPostSuccessRes}
          setPostSuccess={setPostSuccess}
        />
      )}
    </>
  );
};

export default PurchaseOrder;

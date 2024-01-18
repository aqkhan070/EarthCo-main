import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  TablePagination,
  Checkbox,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UpdateEstimateForm from "./UpdateEstimateForm";
import Alert from "@mui/material/Alert";
import { Delete, Create, Visibility } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import formatDate from "../../custom/FormatDate";
import TblDateFormat from "../../custom/TblDateFormat";
import useGetEstimate from "../Hooks/useGetEstimate";
import { DataContext } from "../../context/AppData";
import UpdateAllModal from "../Reusable/UpdateAllModal";
import DeleteAllModal from "../Reusable/DeleteAllModal";
const theme = createTheme({
  palette: {
    primary: {
      main: "#7c9c3d",
    },
  },
  typography: {
    fontSize: 14, // Making font a bit larger
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px 16px", // Adjust cell padding to reduce height
        },
      },
    },
  },
});

const EstimateTR = ({
  headers,
  estimates,
  statusId,
  setShowStatusCards,
  getEstimate,
  setestmPreviewId,
}) => {
  // useEffect(() => {console.log("estimates inside table are", estimates)},[])
  const { estmRecords, tableError, filterdEstm, getFilteredEstimate } =
    useGetEstimate();
  const { PunchListData, setPunchListData } = useContext(DataContext);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("EstimateId");
  const [filtering, setFiltering] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [selectedEstimateIds, setSelectedEstimateIds] = useState([]);

  const navigate = useNavigate();

  const handleSort = (property) => {
    let actualProperty;
    switch (property) {
      case "#":
        actualProperty = "EstimateId";
        break;
      case "Customer Name":
        actualProperty = "CustomerName";
        break;
      case "Estimate Number":
        actualProperty = "EstimateNumber";
        break;
      case "Estimate Amount":
        actualProperty = "EstimateAmount";
        break;
      case "Description Of Work":
        actualProperty = "DescriptionofWork";
        break;
      case "Date Created":
        actualProperty = "DateCreated";
        break;
      case "Status":
        actualProperty = "ContactStatusEmail";
        break;
      default:
        actualProperty = property;
    }

    const isAsc = orderBy === actualProperty && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(actualProperty);
  };

  // const filteredEstimates = estimates
  const filteredEstimates = filterdEstm;
  // .filter((e) =>
  //   e.CustomerName.toLowerCase().includes(filtering.toLowerCase())
  // )
  // .filter((e) => filterByDate(e.Date, filterDate))
  // .sort(getSorting(order, orderBy));

  // ... Pagination, Sorting logic ...
  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }

  const deleteEstimate = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/DeleteEstimate?id=${id}`,
        {
          headers,
        }
      );
      console.log(response.data);

      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
        getFilteredEstimate();
      }, 4000);
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    deleteEstimate(id);
  };

  const [tablePage, setTablePage] = useState(0);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    // Initial fetch of estimates
    getFilteredEstimate();
    setPunchListData({});
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    getFilteredEstimate(
      search,
      tablePage + 1,
      rowsPerPage,
      statusId,
      isAscending
    );
  }, [search, tablePage, rowsPerPage, statusId, isAscending]);

  const handleChangePage = (event, newPage) => {
    // Update the tablePage state
    setTablePage(newPage);
  };

  const [selectedEstimates, setSelectedEstimates] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (event, estimateId) => {
    if (event.target.checked) {
      // Checkbox is checked, add the estimateId to the selectedEstimates array
      setSelectedEstimates((prevSelected) => [...prevSelected, estimateId]);
    } else {
      // Checkbox is unchecked, remove the estimateId from the selectedEstimates array
      setSelectedEstimates((prevSelected) =>
        prevSelected.filter((id) => id !== estimateId)
      );
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // Select all rows
      const allEstimateIds = filteredEstimates.map(
        (estimate) => estimate.EstimateId
      );
      setSelectedEstimates(allEstimateIds);
      setSelectAll(true);
    } else {
      // Deselect all rows
      setSelectedEstimates([]);
      setSelectAll(false);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="card">
          <div className="card-header flex-wrap d-flex justify-content-between  border-0">
            <div>
              <TextField
                label="Search Estimate"
                variant="standard"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

              {selectedEstimates.length <= 0 ? (
                <></>
              ) : (
                <>
                  <DeleteAllModal
                    selectedItems={selectedEstimates}
                    endpoint={"Estimate/DeleteAllSelectedEstimate"}
                    bindingFunction={getFilteredEstimate}
                  />
                  <UpdateAllModal
                    selectedItems={selectedEstimates}
                    endpoint={"Estimate/UpdateAllSelectedEstimateStatus"}
                    bindingFunction={getFilteredEstimate}
                  />
                </>
              )}
              <button
                className="btn btn-primary "
                onClick={() => {
                  // setSelectedItem(0);
                  // setShowContent(false);
                  navigate("/estimates/add-estimate");
                }}
              >
                + Add Estimates
              </button>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="row ">
              <div
                className="modal fade"
                id="deleteAllModal"
                tabIndex="-1"
                aria-labelledby="deleteAllModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Estimates</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>Are you sure you want to delete Estimate</p>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        // id="closer"
                        className="btn btn-danger light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary "
                        data-bs-dismiss="modal"
                        onClick={() => {}}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="updateAllModal"
                tabIndex="-1"
                aria-labelledby="updateAllModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Update Estimates</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>Are you sure you want to Update selected Estimate</p>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        // id="closer"
                        className="btn btn-danger light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary "
                        data-bs-dismiss="modal"
                        onClick={() => {}}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <TableContainer>
                <Table>
                  <TableHead className="table-header">
                    <TableRow className="material-tbl-alignment">
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>#</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell className="table-cell-align">
                        Regional Manager
                      </TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center" className="table-cell-align">
                        Estimate #
                      </TableCell>
                      <TableCell className="table-cell-align">
                        Description Of Work
                      </TableCell>
                      <TableCell align="center" className="table-cell-align">
                        PO #
                      </TableCell>
                      <TableCell align="center" className="table-cell-align">
                        Bill #
                      </TableCell>
                      <TableCell align="center" className="table-cell-align">
                        Invoice #
                      </TableCell>
                      <TableCell
                        align="center"
                        className=" text-end table-cell-align"
                      >
                        Profit %
                      </TableCell>
                      <TableCell className="text-end">Amount</TableCell>
                      {/* <TableCell>Actions</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableError ? (
                      <TableRow>
                        <TableCell className="text-center" colSpan={12}>
                          No record Found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEstimates
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((estimate, index) => (
                          <TableRow
                            className="material-tbl-alignment"
                            key={estimate.EstimateId}
                            hover
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedEstimates.includes(
                                  estimate.EstimateId
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, estimate.EstimateId)
                                }
                              />
                            </TableCell>
                            <TableCell
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.EstimateId}
                            </TableCell>
                            <TableCell
                              className="table-cell-align"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.CustomerName}
                            </TableCell>
                            <TableCell
                              className="table-cell-align"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.RegionalManager}
                            </TableCell>
                            <TableCell
                              className="table-cell-align"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {TblDateFormat(estimate.Date)}
                            </TableCell>
                            <TableCell
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              <span
                                style={{
                                  backgroundColor: estimate.StatusColor,
                                }}
                                className="badge badge-pill  span-hover-pointer"
                              >
                                {estimate.Status}
                              </span>
                            </TableCell>
                            <TableCell
                              align="center"
                              className="table-cell-align"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.EstimateNumber}
                            </TableCell>
                            {/* <TableCell>{estimate.EstimateAmount}</TableCell> */}
                            <TableCell
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.DescriptionofWork}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.PurchaseOrderNumber}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.BillNumber}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.InvoiceNumber}
                            </TableCell>
                            <TableCell
                              className="text-end"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.ProfitPercentage?.toFixed(2)}
                            </TableCell>
                            <TableCell
                              className="text-end"
                              onClick={() => {
                                navigate(
                                  `/estimates/add-estimate?id=${estimate.EstimateId}`
                                );
                              }}
                            >
                              {estimate.EstimateAmount?.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {estmRecords.totalRecords && (
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={estmRecords.totalRecords}
                  rowsPerPage={rowsPerPage}
                  page={tablePage} // Use tablePage for the table rows
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setTablePage(0); // Reset the tablePage to 0 when rowsPerPage changes
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default EstimateTR;

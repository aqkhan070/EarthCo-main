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
import AddButton from "../Reusable/AddButton";
import formatAmount from "../../custom/FormatAmount";
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
  estmRecords,
  tableError,
  filterdEstm,
  getFilteredEstimate,
  statusId,
}) => {
  // useEffect(() => {console.log("estimates inside table are", estimates)},[])
  const {} = useGetEstimate();
  const { PunchListData, setPunchListData } = useContext(DataContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const filteredEstimates = filterdEstm;

  const deleteEstimate = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/DeleteEstimate?id=${id}`,
        {
          headers,
        }
      );
      console.log(response.data);

      setTimeout(() => {
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
  const isRowSelected = (estimateId) => selectedEstimates.includes(estimateId);

 const handleSelectAll = (event) => {
  if (event.target.checked) {
    // Select all rows
    if (Array.isArray(filteredEstimates)) {
      const allEstimateIds = filteredEstimates.map(
        (estimate) => estimate.EstimateId
      );
      setSelectedEstimates(allEstimateIds);
      setSelectAll(true);
    } else {
      // Handle the case where filteredEstimates is not an array
      console.error("filteredEstimates is not an array");
    }
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
                <FormControl className="  me-2" variant="outlined">
                  <Select
                    labelId="customer-type-label"
                    variant="outlined"
                    size="small"
                    value={1}
                  >
                    <MenuItem value={1}>Group Actions</MenuItem>

                    <UpdateAllModal
                      selectedItems={selectedEstimates}
                      endpoint={"Estimate/UpdateAllSelectedEstimateStatus"}
                      bindingFunction={getFilteredEstimate}
                    />
                    <br />

                    <DeleteAllModal
                      selectedItems={selectedEstimates}
                      endpoint={"Estimate/DeleteAllSelectedEstimate"}
                      bindingFunction={getFilteredEstimate}
                    />
                  </Select>
                </FormControl>
              )}
              <AddButton
                onClick={() => {
                  navigate("/estimates/add-estimate");
                }}
              >
                Add Estimates
              </AddButton>
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
                            className={`material-tbl-alignment ${
                              isRowSelected(estimate.EstimateId)
                                ? "selected-row"
                                : ""
                            }`}
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
                              {formatAmount(estimate.EstimateAmount)}
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

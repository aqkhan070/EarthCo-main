import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UpdateEstimateForm from "./UpdateEstimateForm";
import Alert from "@mui/material/Alert";
import { Delete, Create } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";

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
  setShowStatusCards,
  getEstimate,
}) => {
  // useEffect(() => {console.log("estimates inside table are", estimates)},[])

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("EstimateId");
  const [filtering, setFiltering] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filterDate, setFilterDate] = useState("This Month");

  const [selectedItem, setSelectedItem] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [submitsuccess, setSubmitsuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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

  function filterByDate(dateString, filterType) {
    const date = new Date(dateString);
    const now = new Date();
    let startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    let endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    let startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    let endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    let startOfThreeMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 2,
      1
    );

    switch (filterType) {
      case "This Month":
        return date >= startOfMonth && date <= endOfMonth;
      case "Previous Month":
        return date >= startOfPrevMonth && date <= endOfPrevMonth;
      case "Last three months":
        return date >= startOfThreeMonthsAgo && date <= endOfMonth;
      default:
        return true;
    }
  }

  // const filteredEstimates = estimates
  const filteredEstimates = estimates
    .filter((e) =>
      e.CustomerName.toLowerCase().includes(filtering.toLowerCase())
    )
    .filter((e) => filterByDate(e.Date, filterDate))
    .sort(getSorting(order, orderBy));

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
  console.log("filtered", filteredEstimates);

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
        getEstimate();
      }, 4000);
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    deleteEstimate(id);
  };

  return (
    <>
      {showContent ? (
        <ThemeProvider theme={theme}>
          <div className="card">
            <div className="card-body">
              <Paper>
                <div className=" text-center">
                  {submitsuccess && (
                    <Alert severity="success">Successfuly Added Estimates</Alert>
                  )}
                  {updateSuccess && (
                    <Alert severity="success">Successfuly Updated Estimates</Alert>
                  )}
                  {deleteSuccess && (
                    <Alert className="mb-3" severity="success">
                      Successfuly Deleted Estimate
                    </Alert>
                  )}
                  <div className="row">
                    <div>
                      <Form.Select
                        size="sm"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        aria-label="Default select example"
                        className="bg-white date-sort-form"
                      >
                        <option value="This Month">This Month</option>
                        <option value="Previous Month">Previous Month</option>
                        <option value="Last three months">Last three months</option>
                      </Form.Select>
                    </div>
                    <div className="col-md-12">
                      <div className="custom-search-container">
                        <TextField
                          label="Search"
                          variant="standard"
                          size="small"
                          value={filtering}
                          onChange={(e) => setFiltering(e.target.value)}
                        />
                      </div>
                      <div className="custom-button-container">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setSelectedItem(0);
                            setShowContent(false);
                          }}
                        >
                          + Add Estimates
                        </button>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <br />
                <TableContainer>
                  <Table>
                    <TableHead className="table-header">
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        {[
                          "#",
                          "Customer",
                          "Regional Manager",
                          "Date",
                          "Status",
                          "Estimate#",
                          "Description Of Work",
                          "PO#",
                          "Bill#",
                          "Invoice#",
                          "Profit%",
                          "Amount",
                          "Actions",
                        ].map((headCell) => (
                          <TableCell
                            key={headCell}
                            sortDirection={orderBy === headCell ? order : false}
                          >
                            <TableSortLabel
                              active={orderBy === headCell}
                              direction={orderBy === headCell ? order : "asc"}
                              onClick={() => handleSort(headCell)}
                            >
                              {headCell}
                            </TableSortLabel>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredEstimates
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((estimate, index) => (
                          <TableRow key={estimate.EstimateId} hover>
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell>{estimate.EstimateId}</TableCell>
                            <TableCell>{estimate.CustomerName}</TableCell>
                            <TableCell>{estimate.RegionalManager}</TableCell>
                            <TableCell>{estimate.Date}</TableCell>
                            <TableCell>{estimate.Status}</TableCell>
                            <TableCell>{estimate.EstimateNumber}</TableCell>
                            {/* <TableCell>{estimate.EstimateAmount}</TableCell> */}
                            <TableCell>{estimate.DescriptionofWork}</TableCell>
                            <TableCell>{estimate.PurchaseOrderNumber}</TableCell>
                            <TableCell>{estimate.BillNumber}</TableCell>
                            <TableCell>{estimate.InvoiceNumber}</TableCell>
                            <TableCell>{estimate.ProfitPercentage}</TableCell>
                            <TableCell>{estimate.EstimateAmount}</TableCell>
                            <TableCell>
                              <div className="button-container">
                                <Button
                                  className="delete-button"
                                  onClick={() => {
                                    setSelectedItem(estimate.EstimateId);
                                    console.log(",,,,,,,,,,", selectedItem);
                                    setShowContent(false);
                                  }}
                                >
                                  <Create />
                                </Button>
                                <Button
                                  className="delete-button"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#deleteModal${estimate.EstimateId}`}
                                >
                                  <Delete color="error" />
                                </Button>
                                <div
                                  className="modal fade"
                                  id={`deleteModal${estimate.EstimateId}`}
                                  tabIndex="-1"
                                  aria-labelledby="deleteModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title">
                                          Are you sure you want to delete{" "}
                                          {estimate.EstimateNumber}
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
                                              handleDelete(estimate.EstimateId);
                                              console.log(
                                                "delete id",
                                                estimate.EstimateId
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
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={filteredEstimates.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                />
              </Paper>
            </div>
          </div> 
        </ThemeProvider>
      ) : (
        <UpdateEstimateForm
          headers={headers}
          setShowContent={setShowContent}
          estimateId={selectedItem}
          setShowStatusCards={setShowStatusCards}
          setSubmitsuccess={setSubmitsuccess}
          setUpdateSuccess={setUpdateSuccess}
          getEstimate={getEstimate}
        />
      )}
    </>
  );
};

export default EstimateTR;

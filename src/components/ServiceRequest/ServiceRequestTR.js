import React, { useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";

import UpdateSRForm from "./UpdateSRForm";
import { Form } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TableRow,
  TableSortLabel,
  Button,
  TablePagination,
  TableContainer,
  Checkbox,
  Paper,
} from "@mui/material";
import { Create, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import { DataContext } from "../../context/AppData";
import formatDate from "../../custom/FormatDate";
import useFetchServiceRequests from "../Hooks/useFetchServiceRequests";

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

const ServiceRequestTR = ({
  serviceRequest,
  setShowCards,
  statusId,
  fetchServiceRequest,
  sRfetchError,
}) => {

  const { fetchFilterServiceRequest, sRFilterList,totalRecords } = useFetchServiceRequests();


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [filterDate, setFilterDate] = useState("This Month");

  const [search, setSearch] = useState("");

  const [serviceRequestId, setServiceRequestId] = useState(0);

  const [showContent, setShowContent] = useState(true);
  const [successAlert, setSuccessAlert] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const navigate = useNavigate();
  const {setSRData} = useContext(DataContext);

  const columnFieldMapping = {
    "Service Request #": "ServiceRequestNumber",
    "Customer Name": "CustomerId",
    "Assigned to": "Assign",
    Status: "SRStatusId",
    "Work Requested": "WorkRequest",
    "Date Created": "CreatedDate",
  };

  const [pages, setpages] = useState(1)

  const [tablePage, setTablePage] = useState(0);
  useEffect(() => {
    // Initial fetch of estimates
    fetchFilterServiceRequest(1, rowsPerPage, statusId);
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilterServiceRequest(tablePage + 1, rowsPerPage, statusId);
  }, [tablePage, rowsPerPage, statusId]);

  const handleChangePage = (event, newPage) => {
    // Update the tablePage state
    setTablePage(newPage);
  };

  //

  const deleteServiceRequest = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/ServiceRequest/DeleteServiceRequest?id=${id}`,
        { headers }
      );
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 4000);

      // Handle the response. For example, you can reload the customers or show a success message
      console.log("ServiceRequest deleted successfully:");
      fetchFilterServiceRequest();
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    deleteServiceRequest(id);
  };

  useEffect(() => {
    setShowCards(true);
  }, []);

  const handleSearch = (data) => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const threeMonthsAgoStart = new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      1
    );

    let dateFilteredData = [];

    switch (filterDate) {
      case "This Month":
        dateFilteredData = data.filter(
          (item) => new Date(item.CreatedDate) >= monthStart
        );
        break;
      case "Previous Month":
        dateFilteredData = data.filter(
          (item) =>
            new Date(item.CreatedDate) >= prevMonthStart &&
            new Date(item.CreatedDate) <= prevMonthEnd
        );
        break;
      case "Last three months":
        dateFilteredData = data.filter(
          (item) => new Date(item.CreatedDate) >= threeMonthsAgoStart
        );
        break;
      default:
        dateFilteredData = data;
        break;
    }

    return dateFilteredData.filter((item) => {
      const fieldsToSearch = [
        item.CustomerId?.toString(),
        item.ServiceRequestNumber?.toString(),
        item.Assign?.toString(),
        item.SRStatusId?.toString(),
        item.WorkRequest?.toString(),
        item.CreatedDate?.toString(),
      ];

      return fieldsToSearch.some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const sortedAndSearchedCustomers = handleSearch([...sRFilterList]).sort(
    (a, b) => {
      const { field, order } = sorting;

      if (field && order) {
        if (order === "asc") {
          return a[field] > b[field] ? 1 : -1;
        }
        if (order === "desc") {
          return a[field] < b[field] ? 1 : -1;
        }
      }
      return 0;
    }
  );

  return (
    <>
      {showContent ? (
        <ThemeProvider theme={theme}>
          <div className="card-body">
       
              <div className="row mx-1">
            <div className=" text-center mb-3">
            {successAlert && (
              <Alert className="mb-3" severity="success">
                {successAlert
                  ? successAlert
                  : "Successfuly Added/Updated Service request"}
              </Alert>
            )}
            {deleteSuccess && (
              <Alert className="mb-3" severity="success">
                Successfuly Deleted Service request
              </Alert>
            )}
                <div className="col-md-12">
                  {/* <div>
                    <Form.Select
                      size="sm"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      aria-label="Default select example"
                      className="bg-white date-sort-form"
                    >
                      <option value="This Month">This Month</option>
                      <option value="Previous Month">Previous Month</option>
                      <option value="Last three months">
                        Last three months
                      </option>
                    </Form.Select>
                  </div> */}
                  <div className="col-3 custom-search-container">
                    <TextField
                      label="Search Service Request"
                      variant="standard"
                      size="small"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                

                  <div className="custom-button-container">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setShowContent(false);
                            setServiceRequestId(0);
                          }}
                        >
                          + Add Service Request
                        </button>
                      </div>
                </div>
              </div>
              <br />

              <Table>
                <TableHead>
                  <TableRow className="table-header">
                    {[
                      "Select",
                      "Service Request #",
                      "Customer Name",
                      "Assigned to",
                      "Status",
                      "Work Requested",
                      "Date Created",
                      "Actions",
                    ].map((column, index) => (
                      <TableCell key={index}>
                        {index < 5 ? (
                          <TableSortLabel
                            active={
                              sorting.field === columnFieldMapping[column]
                            }
                            direction={sorting.order}
                            onClick={() =>
                              setSorting({
                                field: columnFieldMapping[column],
                                order:
                                  sorting.order === "asc" &&
                                  sorting.field === columnFieldMapping[column]
                                    ? "desc"
                                    : "asc",
                              })
                            }
                          >
                            {column}
                          </TableSortLabel>
                        ) : (
                          column
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sRfetchError ? (
                    <TableRow>
                      <TableCell className="text-center" colSpan={12}>
                        No Record found
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {sortedAndSearchedCustomers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((customer, rowIndex) => (
                      <TableRow key={rowIndex} hover>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>{customer.ServiceRequestNumber}</TableCell>
                        <TableCell>{customer.CustomerName}</TableCell>
                        <TableCell>{customer.Assign}</TableCell>
                        <TableCell><span className="badge badge-pill badge-success ">{customer.Status}</span></TableCell>
                        <TableCell>{customer.WorkRequest}</TableCell>
                        <TableCell>{formatDate(customer.CreatedDate)}</TableCell>
                        <TableCell>
                          <Button
                            // className="btn btn-primary btn-icon-xxs me-2"
                            onClick={() => {
                              navigate(
                                "/Dashboard/Service-Requests/Service-Request-Preview"
                              );
                              // setestmPreviewId(estimate.EstimateId);
                              setSRData(customer);
                            }}
                          >
                            {/* <i className="fa-solid fa-eye"></i> */}

                            <Visibility />
                          </Button>
                          <Button
                            // className="btn btn-primary btn-icon-xxs me-2"
                            onClick={() => {
                              setServiceRequestId(customer.ServiceRequestId);
                              setShowContent(false);
                              console.log("////////", serviceRequestId);
                              // console.log("////////",customer.ServiceRequestId);
                            }}
                          >
                            <Create />
                            {/* <i className="fas fa-pencil-alt"></i> */}
                          </Button>

                          <Button
                            // className="btn btn-danger btn-icon-xxs mr-2"
                            data-bs-toggle="modal"
                            data-bs-target={`#deleteModal${customer.ServiceRequestId}`}
                          >
                            <Delete color="error" />
                            {/* <i className="fas fa-trash-alt"></i> */}
                          </Button>
                          <div
                            className="modal fade"
                            id={`deleteModal${customer.ServiceRequestId}`}
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
                                    Delete Service Request
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <p>
                                    {" "}
                                    Are you sure you want to delete Service
                                    Request No {customer.ServiceRequestNumber}
                                  </p>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    id="closer"
                                    className="btn btn-danger light "
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    className="btn btn-primary "
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      handleDelete(customer.ServiceRequestId);
                                      console.log(
                                        "delete id",
                                        customer.ServiceRequestId
                                      );
                                    }}
                                  >
                                    Yes
                                  </button>
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
          </div>
        </ThemeProvider>
      ) : (
        <UpdateSRForm
          headers={headers}
          serviceRequestId={serviceRequestId}
          setShowContent={setShowContent}
          setShowCards={setShowCards}
          setSuccessAlert={setSuccessAlert}
          fetchServiceRequest={fetchServiceRequest}
          fetchFilterServiceRequest={fetchFilterServiceRequest}
        />
      )}
    </>
  );
};

export default ServiceRequestTR;

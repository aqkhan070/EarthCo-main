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
  FormControl,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { Create, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import { DataContext } from "../../context/AppData";
import formatDate from "../../custom/FormatDate";
import useFetchServiceRequests from "../Hooks/useFetchServiceRequests";
import TblDateFormat from "../../custom/TblDateFormat";

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
  const { fetchFilterServiceRequest, sRFilterList, totalRecords } =
    useFetchServiceRequests();

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
  const { setSRData, loggedInUser } = useContext(DataContext);

  const [tablePage, setTablePage] = useState(0);
  const [sRsearch, setSRsearch] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  useEffect(() => {
    // Initial fetch of estimates
    fetchFilterServiceRequest();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchFilterServiceRequest(
      sRsearch,
      tablePage + 1,
      rowsPerPage,
      statusId,
      isAscending
    );
  }, [sRsearch, tablePage, rowsPerPage, statusId, isAscending]);

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

  const sortedAndSearchedCustomers = sRFilterList;
  // handleSearch([...sRFilterList]).sort(
  //   (a, b) => {
  //     const { field, order } = sorting;

  //     if (field && order) {
  //       if (order === "asc") {
  //         return a[field] > b[field] ? 1 : -1;
  //       }
  //       if (order === "desc") {
  //         return a[field] < b[field] ? 1 : -1;
  //       }
  //     }
  //     return 0;
  //   }
  // );

  return (
    <>
      {showContent ? (
        <ThemeProvider theme={theme}>
          <div className="">
            <div className="card">
              <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                <div>
                  <TextField
                    label="Search Service request"
                    variant="standard"
                    size="small"
                    value={sRsearch}
                    onChange={(e) => setSRsearch(e.target.value)}
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
                  {loggedInUser.userRole == "1" && (
                    <button
                      className="btn btn-primary "
                      onClick={() => {
                        // setShowContent(false);
                        // setServiceRequestId(0);
                        navigate(`/service-requests/add-sRform`);
                      }}
                    >
                      + Add Service Request
                    </button>
                  )}
                </div>
              </div>
              <div className="card-body pt-0">
                <Table>
                  <TableHead className="table-header">
                    <TableRow className="material-tbl-alignment">
                      {[
                        // "Select",
                        "Service Request #",
                        "Customer Name",
                        "Assigned to",
                        "Status",
                        "Work Requested",
                        "Date Created",
                        "Type",
                      ].map((column, index) => (
                        <TableCell key={index}>{column}</TableCell>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((customer, rowIndex) => (
                        <TableRow
                          className="material-tbl-alignment"
                          onClick={() => {
                            // setServiceRequestId(customer.ServiceRequestId);
                            // setShowContent(false);
                            // console.log("////////", serviceRequestId);
                            navigate(
                              `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                            );
                          }}
                          key={rowIndex}
                          hover
                        >
                          {/* <TableCell>
                          <Checkbox />
                        </TableCell> */}
                          <TableCell>{customer.ServiceRequestNumber}</TableCell>
                          <TableCell>{customer.CustomerName}</TableCell>
                          <TableCell>{customer.Assign}</TableCell>
                          <TableCell>
                            <span
                              onClick={() => {
                                navigate(
                                  `/service-requests/service-request-preview?id=${customer.ServiceRequestId}`
                                );
                                // setestmPreviewId(estimate.EstimateId);
                                setSRData(customer);
                              }}
                              style={{
                                backgroundColor: customer.StatusColor,
                              }}
                              className="span-hover-pointer badge badge-pill  "
                            >
                              {customer.Status}
                            </span>
                          </TableCell>
                          <TableCell>{customer.WorkRequest}</TableCell>
                          <TableCell>
                            {TblDateFormat(customer.CreatedDate)}
                          </TableCell>
                          <TableCell>{customer.Type}</TableCell>
                          {/* <TableCell>
                              <Button
                                // className="btn btn-primary btn-icon-xxs me-2"
                                onClick={() => {
                                  navigate(
                                    "/service-requests/service-request-preview"
                                  );
                                  // setestmPreviewId(estimate.EstimateId);
                                  setSRData(customer);
                                }}
                              >
                               <i className="fa-solid fa-eye"></i> 

                                <Visibility />
                              </Button>
                              <Button
                                // className="btn btn-primary btn-icon-xxs me-2"
                                onClick={() => {
                                  setServiceRequestId(
                                    customer.ServiceRequestId
                                  );
                                  setShowContent(false);
                                  console.log("////////", serviceRequestId);
                                  // console.log("////////",customer.ServiceRequestId);
                                }}
                              >
                                <Create />
                               <i className="fas fa-pencil-alt"></i> 
                              </Button>

                              <Button
                                // className="btn btn-danger btn-icon-xxs mr-2"
                                data-bs-toggle="modal"
                                data-bs-target={`#deleteModal${customer.ServiceRequestId}`}
                              >
                                <Delete color="error" />
                              <i className="fas fa-trash-alt"></i> 
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
                                        Request No{" "}
                                        {customer.ServiceRequestNumber}
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
                                          handleDelete(
                                            customer.ServiceRequestId
                                          );
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
                            </TableCell> */}
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

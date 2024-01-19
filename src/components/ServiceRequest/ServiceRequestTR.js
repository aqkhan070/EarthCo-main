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
import UpdateAllSR from "../Reusable/UpdateAllSR";
import DeleteAllModal from "../Reusable/DeleteAllModal";
import AddButton from "../Reusable/AddButton";

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

  const [selectedServiceRequests, setSelectedServiceRequests] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (event, serviceRequestId) => {
    if (event.target.checked) {
      // Checkbox is checked, add the serviceRequestId to the selectedServiceRequests array
      setSelectedServiceRequests((prevSelected) => [
        ...prevSelected,
        serviceRequestId,
      ]);
    } else {
      // Checkbox is unchecked, remove the serviceRequestId from the selectedServiceRequests array
      setSelectedServiceRequests((prevSelected) =>
        prevSelected.filter((id) => id !== serviceRequestId)
      );
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // Select all rows
      const allServiceRequestIds = sortedAndSearchedCustomers.map(
        (customer) => customer.ServiceRequestId
      );
      setSelectedServiceRequests(allServiceRequestIds);
      setSelectAll(true);
    } else {
      // Deselect all rows
      setSelectedServiceRequests([]);
      setSelectAll(false);
    }
  };
  const isRowSelected = (sr) => selectedServiceRequests.includes(sr);

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
                  {loggedInUser.userRole == "4" ? (
                    <></>
                  ) : (
                    <>
                      {selectedServiceRequests.length <= 0 ? (
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

                            <UpdateAllSR
                              selectedItems={selectedServiceRequests}
                              endpoint={
                                "ServiceRequest/UpdateAllSelectedServiceRequestStatus"
                              }
                              bindingFunction={fetchFilterServiceRequest}
                            />
                            <br />

                            <DeleteAllModal
                              selectedItems={selectedServiceRequests}
                              endpoint={
                                "ServiceRequest/DeleteAllSelectedServiceRequest"
                              }
                              bindingFunction={fetchFilterServiceRequest}
                            />
                          </Select>
                        </FormControl>
                      )}
                      <AddButton
                        onClick={() => {
                          navigate(`/service-requests/add-sRform`);
                        }}
                      >
                        Add Service Request
                      </AddButton>
                    </>
                  )}
                </div>
              </div>
              <div className="card-body pt-0">
                <Table>
                  <TableHead className="table-header">
                    <TableRow className="material-tbl-alignment">
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      {[
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
                          className={`material-tbl-alignment ${
                            isRowSelected(customer.ServiceRequestId)
                              ? "selected-row"
                              : ""
                          }`}
                          key={rowIndex}
                          hover
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedServiceRequests.includes(
                                customer.ServiceRequestId
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  e,
                                  customer.ServiceRequestId
                                )
                              }
                            />
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              navigate(
                                `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                              );
                            }}
                          >
                            {customer.ServiceRequestNumber}
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              navigate(
                                `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                              );
                            }}
                          >
                            {customer.CustomerName}
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              navigate(
                                `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                              );
                            }}
                          >
                            {customer.Assign}
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              navigate(
                                `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                              );
                            }}
                          >
                            <span
                              style={{
                                backgroundColor: customer.StatusColor,
                              }}
                              className="span-hover-pointer badge badge-pill  "
                            >
                              {customer.Status}
                            </span>
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              navigate(
                                `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                              );
                            }}
                          >
                            {customer.WorkRequest}
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              navigate(
                                `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                              );
                            }}
                          >
                            {TblDateFormat(customer.CreatedDate)}
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              navigate(
                                `/service-requests/add-sRform?id=${customer.ServiceRequestId}`
                              );
                            }}
                          >
                            {customer.Type}
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

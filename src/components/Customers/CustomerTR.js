import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UpdateCustomer from "./UpdateCustomer";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Button,
  TablePagination,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Create, Delete, Update } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import axios from "axios";

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

const CustomerTR = ({
  customers,
  setCustomerAddSuccess,
  setCustomerUpdateSuccess,
  fetchCustomers,
  headers,
  customerFetchError,
  totalRecords,
}) => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showContent, setShowContent] = useState(true);

  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [filtering, setFiltering] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Sorting logic here...
  const sortedCustomers = [...customers].sort((a, b) => {
    if (sorting.order === "asc") {
      return a.CustomerId > b.CustomerId ? 1 : -1;
    } else if (sorting.order === "desc") {
      return a.CustomerId < b.CustomerId ? 1 : -1;
    }
    return 0;
  });

  const [tablePage, setTablePage] = useState(0);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    // Initial fetch of estimates
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchCustomers(search, tablePage + 1, rowsPerPage, isAscending);
  }, [tablePage, rowsPerPage, isAscending]);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchCustomers(search, 1, rowsPerPage);
  }, [search]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  // Filtering logic here...
  const filteredCustomers = sortedCustomers;

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Customer/DeleteCustomer?id=${id}`,
        {
          headers,
        }
      );

      // Handle the response. For example, you can reload the customers or show a success message
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 4000);
      fetchCustomers();
      // window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    deleteCustomer(id);
  };

  return (
    <ThemeProvider theme={theme}>
      {showContent ? (
        <div className="card">
          {deleteSuccess && (
            <Alert severity="success">Successfully deleted Company</Alert>
          )}
          <div className="card-header flex-wrap d-flex justify-content-between  border-0">
            <div>
              <TextField
                label="Search Customer"
                variant="standard"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="pt-2 me-2">
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
              <button
                className="btn btn-primary "
                onClick={() => {
                  navigate(`/customers/add-customer`);
                  setSelectedItem(0);
                  console.log(",,,,,,,,,,", selectedItem);
                  // setShowContent(false);
                }}
              >
                + Add Customer
              </button>
            </div>
          </div>

          <div className="card-body pt-0">
            <Table>
              <TableHead className="table-header">
                <TableRow className="material-tbl-alignment">
                  {/* Map through columns here */}
                  {[
                    // "Select",
                    "Customer Id",
                    "Customer Name",
                    "Contact Name",
                    "Contact Company",
                    "Contact Email",
                    "Actions",
                  ].map((column, index) => (
                    <TableCell className="table-cell-align" key={index}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {customerFetchError ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center">
                      {" "}
                      No Record Found
                    </TableCell>
                  </TableRow>
                ) : null}
                {filteredCustomers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer, rowIndex) => (
                    <TableRow
                      className="material-tbl-alignment"
                      key={rowIndex}
                      hover
                    >
                      {/* <TableCell>
                    <Checkbox
                      checked={selectedItem === customer.CustomerId}
                      onChange={() => setSelectedItem(customer.CustomerId)}
                    />
                  </TableCell>*/}
                      <TableCell
                        className="table-cell-align"
                        onClick={() => {
                          navigate(
                            `/customers/add-customer?id=${customer.CustomerId}`
                          );
                        }}
                      >
                        {customer.CustomerId}
                      </TableCell>

                      <TableCell
                        onClick={() => {
                          navigate(
                            `/customers/add-customer?id=${customer.CustomerId}`
                          );
                        }}
                      >
                        {customer.CustomerName}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          navigate(
                            `/customers/add-customer?id=${customer.CustomerId}`
                          );
                        }}
                      >
                        {customer.ContactName}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          navigate(
                            `/customers/add-customer?id=${customer.CustomerId}`
                          );
                        }}
                      >
                        {customer.CompanyName}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          navigate(
                            `/customers/add-customer?id=${customer.CustomerId}`
                          );
                        }}
                      >
                        {customer.Email}
                      </TableCell>
                      <TableCell className="table-cell-align">
                        <Button
                          // className="btn btn-danger btn-icon-xxs "
                          data-bs-toggle="modal"
                          data-bs-target={`#deleteModal${customer.CustomerId}`}
                        >
                          <Delete color="error" />
                          {/* <i className="fas fa-trash-alt"></i> */}
                        </Button>

                        <div
                          className="modal fade"
                          id={`deleteModal${customer.CustomerId}`}
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
                                <h5 className="modal-title">Customer Delete</h5>

                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  Are you sure you want to delete{" "}
                                  {customer.CompanyName}
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
                                  onClick={() =>
                                    handleDelete(customer.CustomerId)
                                  }
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
        </div>
      ) : (
        <UpdateCustomer
          headers={headers}
          setCustomerAddSuccess={setCustomerAddSuccess}
          setCustomerUpdateSuccess={setCustomerUpdateSuccess}
          selectedItem={selectedItem}
          setShowContent={setShowContent}
          fetchCustomers={fetchCustomers}
        />
      )}
    </ThemeProvider>
  );
};

export default CustomerTR;

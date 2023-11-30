import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UpdateCustomer from "./UpdateCustomer";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    // Initial fetch of estimates
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    fetchCustomers(search, tablePage + 1, rowsPerPage);
  }, [tablePage, rowsPerPage, search]);

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

          <div className="card-body">
            <div className="search-row">
              <div className="search-container tblsearch-input">
                <TextField
                  className="tblsearch-input"
                  variant="standard"
                  size="small"
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="add-customer-btn">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSelectedItem(0);
                    console.log(",,,,,,,,,,", selectedItem);
                    setShowContent(false);
                  }}
                >
                  + Add Customer
                </Button>
              </div>
            </div>

            <div className="text-center m-3">
              <Table>
                <TableHead>
                  <TableRow className="table-header">
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
                        {index < 5 ? (
                          <TableSortLabel
                            active={sorting.field === column}
                            direction={
                              ["asc", "desc"].includes(sorting.order)
                                ? sorting.order
                                : "asc"
                            }
                            onClick={() =>
                              setSorting({
                                field: column,
                                order:
                                  sorting.order === "asc" &&
                                  sorting.field === column
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
                      <TableRow key={rowIndex} hover>
                        {/* <TableCell>
                    <Checkbox
                      checked={selectedItem === customer.CustomerId}
                      onChange={() => setSelectedItem(customer.CustomerId)}
                    />
                  </TableCell>*/}
                        <TableCell className="table-cell-align">
                          {customer.CustomerId}
                        </TableCell>
                        <TableCell>{customer.CompanyName}</TableCell>
                        <TableCell>{customer.CustomerName}</TableCell>
                        <TableCell>{customer.Address}</TableCell>
                        <TableCell>{customer.Email}</TableCell>
                        <TableCell className="table-cell-align">
                          <Link
                          // to={"/Dashboard/Customers/Update-Customer"}
                          >
                            <Button
                              onClick={() => {
                                setSelectedItem(customer.CustomerId);
                                console.log(",,,,,,,,,,", selectedItem);
                                setShowContent(false);
                              }}
                            >
                              <Create />
                              {/* <i className="fas fa-pencil-alt"></i> */}
                            </Button>
                          </Link>
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
                                  <h5 className="modal-title">
                                    Customer Delete
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

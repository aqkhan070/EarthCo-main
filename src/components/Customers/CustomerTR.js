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

const CustomerTR = ({ customers, setCustomerAddSuccess, fetchCustomers }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showContent, setShowContent] = useState(true);

  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [filtering, setFiltering] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  

  // Sorting logic here...
  const sortedCustomers = [...customers].sort((a, b) => {
    if (sorting.order === "asc") {
      return a[sorting.field] > b[sorting.field] ? 1 : -1;
    } else if (sorting.order === "desc") {
      return a[sorting.field] < b[sorting.field] ? 1 : -1;
    }
    return 0;
  });

  // Filtering logic here...
  const filteredCustomers = sortedCustomers.filter((customer) =>
    customer.CompanyName.toLowerCase().includes(filtering.toLowerCase())
  );

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(
        `https://earthcoapi.yehtohoga.com/api/Customer/DeleteCustomer?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      const data = await response.json();

      // Handle the response. For example, you can reload the customers or show a success message
      console.log("Customer deleted successfully:", data);
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(id);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {showContent ? (
        <div className="">
          
          <div className="row">
            <div className="d-flex"></div>
          </div>


          <div className=" ml-2 row search-row ">
            <div className="col-3  search-container tblsearch-input">
              <TextField
                className="tblsearch-input "
                variant="standard"
                size="small"
                label="Search"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
              />
            </div>
            <div className="col-3 add-customer-btn">
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
          </div>{" "}
          <br />
          <div className="text-center">
            <Table>
              <TableHead>
                <TableRow className="table-header">
                  {/* Map through columns here */}
                  {[
                    // "Select",
                    "CustomerId",
                    "CustomerName",
                    "ContactName",
                    "ContactCompany",
                    "ContactEmail",
                    "Actions",
                  ].map((column, index) => (
                    <TableCell key={index}>
                      {index < 5 ? (
                        <TableSortLabel
                          active={sorting.field === column}
                          direction={sorting.order}
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
                      <TableCell>{customer.UserId}</TableCell>
                      <TableCell>{customer.CompanyName}</TableCell>
                      <TableCell>{customer.FirstName} {customer.LastName}</TableCell>
                      <TableCell>{customer.Address}</TableCell>
                      <TableCell>{customer.Email}</TableCell>
                      <TableCell>
                        <Link
                        // to={"/Dashboard/Customers/Update-Customer"}
                        >
                          <Button
                            className="delete-button"
                            onClick={() => {
                              setSelectedItem(customer.UserId);
                              console.log(",,,,,,,,,,", selectedItem);
                              setShowContent(false);
                            }}
                          >
                            <Create />
                          </Button>
                        </Link>
                        <Button
                          color="error"
                          className="delete-button"
                          onClick={() => handleDelete(customer.UserId)}
                        >
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredCustomers.length}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </div>
        </div>
      ) : (
        <UpdateCustomer
        setCustomerAddSuccess={setCustomerAddSuccess}
          selectedItem={selectedItem}
          setShowContent={setShowContent}
          fetchCustomers={fetchCustomers}

        />
      )}
    </ThemeProvider>
  );
};

export default CustomerTR;

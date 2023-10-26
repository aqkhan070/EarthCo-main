import React, { useState } from "react";
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

import { Delete, Create } from "@mui/icons-material";

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

const EstimateTR = ({ estimates }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("EstimateId");
  const [filtering, setFiltering] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedItem, setSelectedItem] = useState();
  const [showContent, setShowContent] = useState(true);

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

  const filteredEstimates = estimates
    .filter((e) =>
      e.CustomerName.toLowerCase().includes(filtering.toLowerCase())
    )
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

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }

  const deleteEstimate = async (id) => {
    try {
      const response = await fetch(
        `https://earthcoapi.yehtohoga.com/api/Estimate/DeleteEstimate?id=${id}`,
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
      deleteEstimate(id);
    }
  };

  return (
    <>
      {showContent ? (
        <ThemeProvider theme={theme}>
          <Paper>
          <div className="container text-center">
      <div className="row">
        <div className="col-md-12">
          <div className="custom-search-container">
            <TextField
              label="Search"
              variant="outlined"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
          <div className="custom-button-container">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/Dashboard/Estimates/Add-Estimate");
              }}
            >
              + Add Estimates
            </button>
          </div>
        </div>
      </div>
    </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    {[
                      "#",
                      "Customer Name",
                      "Assign to",
                      "Estimate Number",
                      "Estimate Amount",
                      "Description Of Work",
                      "Date Created",
                      "Status",
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
                      <TableRow key={estimate.EstimateId}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell>{estimate.EstimateId}</TableCell>
                        <TableCell>{estimate.CustomerName}</TableCell>
                        <TableCell>{estimate.CustomerName}</TableCell>
                        <TableCell>{estimate.EstimateNumber}</TableCell>
                        <TableCell>{estimate.EstimateAmount}</TableCell>
                        <TableCell>{estimate.DescriptionofWork}</TableCell>
                        <TableCell>{estimate.DateCreated}</TableCell>
                        <TableCell>{estimate.ContactStatustEmail}</TableCell>
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
                            <Button>
                              <Delete
                                color="error"
                                onClick={() =>
                                  handleDelete(estimate.EstimateId)
                                }
                              />
                            </Button>
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
        </ThemeProvider>
      ) : (
        <UpdateEstimateForm
          setShowContent={setShowContent}
          estimateId={selectedItem}
        />
      )}
    </>
  );
};

export default EstimateTR;

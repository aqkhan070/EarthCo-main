import React, { useEffect, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { Delete, Create } from "@mui/icons-material";
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
const LandscapeTR = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("EstimateId");
  const [filtering, setFiltering] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedItem, setSelectedItem] = useState();
  const [showContent, setShowContent] = useState(true);

  const [reports, setReports] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchReports = async () => {
    const response = await axios.get(
      `https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/GetMonthlyLandsacpeList`,
      { headers }
    );
    try {
      setReports(response.data);
      console.log("////////", reports);
      if (response.data != null) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("api call error", error);
    }
  };

  useEffect(() => {
    fetchReports();
  });

  const handleSort = (property) => {
    let actualProperty;
    switch (property) {
      case "#":
        actualProperty = "MonthlyLandsacpeId";
        break;
      case "Customer Name":
        actualProperty = "tblCustomer.CustomerName";
        break;
      // case "Estimate Number":
      //   actualProperty = "EstimateNumber";
      //   break;
      case "Type":
        actualProperty = "Type";
        break;
      case "Assign To":
        actualProperty = "";
        break;
      case "Status":
        actualProperty = "";
        break;
      case "Date Created":
        actualProperty = "CreatedDate";
        break;

      default:
        actualProperty = property;
    }

    const isAsc = orderBy === actualProperty && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(actualProperty);
  };

  const filteredReports = reports
    .filter((e) =>
      e.tblCustomer.CustomerName.toLowerCase().includes(filtering.toLowerCase())
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

  const deleteReport = async (id) => {
    try {
      const response = await fetch(
        `https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/DeleteMonthlyLandsacpe?id=${id}`,
        {
          headers,
        }
      );

      // Handle the response. For example, you can reload the customers or show a success message
      console.log("Customer deleted successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteReport(id);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="center-loader">
          <CircularProgress style={{ color: "#789a3d" }} />
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <Paper>
            <div className=" text-center">
              <div className="row">
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
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        navigate("/Landscape/Add-Landscape");
                      }}
                    >
                      + Add
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
                      "Customer Name",
                      "Type",
                      "Assigned to",
                      "Status",
                      "Date Created",
                      "Report",
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
                  {filteredReports
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((report, index) => (
                      <TableRow key={report.MonthlyLandsacpeId} hover>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell>{report.MonthlyLandsacpeId}</TableCell>
                        <TableCell>{report.tblCustomer.CustomerName}</TableCell>
                        <TableCell>...</TableCell>
                        <TableCell>...</TableCell>
                        <TableCell>...</TableCell>
                        <TableCell>{report.CreatedDate}</TableCell>
                        <TableCell>...</TableCell>
                        {/* <TableCell>...</TableCell> */}
                        {/* <TableCell>...</TableCell> */}
                        <TableCell>
                          <div className="button-container">
                            {/* <Button
                            className="delete-button"
                            onClick={() => {
                              setSelectedItem(estimate.EstimateId);
                              console.log(",,,,,,,,,,", selectedItem);
                              setShowContent(false);
                            }}
                          >
                            <Create />
                          </Button> */}
                            <Button className="delete-button">
                              <Delete
                                color="error"
                                onClick={() =>
                                  handleDelete(report.MonthlyLandsacpeId)
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
              count={filteredReports.length}
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
      )}
    </>
  );
};

export default LandscapeTR;

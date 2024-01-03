import React, { useEffect, useState, useContext } from "react";
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
import TblDateFormat from "../../custom/TblDateFormat";
import { DataContext } from "../../context/AppData";

const LandscapeTR = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [reports, setReports] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const { loggedInUser } = useContext(DataContext);

  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/MonthlyLandsacpe/GetMonthlyLandsacpeList`,
        { headers }
      );

      setReports(response.data);
      console.log("////////", response.data);
      if (response.data != null) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("api call error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports;
  //   .filter((e) =>
  //     e.tblCustomer.CustomerName.toLowerCase().includes(filtering.toLowerCase())
  //   )
  //   .sort(getSorting(order, orderBy));

  // // ... Pagination, Sorting logic ...
  // function desc(a, b, orderBy) {
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }

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

  return (
    <>
      {isLoading ? (
        <div className="center-loader">
          <CircularProgress style={{ color: "#789a3d" }} />
        </div>
      ) : (
        <div>
          <div className="row ">
            <div className="col-md-12">
              <div className="custom-button-container">
                {loggedInUser.userRole == "1" && (
                  <button
                    className="btn btn-primary mb-2"
                    onClick={() => {
                      navigate("/landscape/add-landscape");
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>
          </div>{" "}
          <Table>
            <TableHead className="table-header ">
              <TableRow className="material-tbl-alignment">
                {/* <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell> */}
                {["#", "Customer Name", "Requested by", "Date Created"].map(
                  (headCell) => (
                    <TableCell key={headCell}>{headCell}</TableCell>
                  )
                )}
                {/* <TableCell align="right">Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.length <= 0 ? (
                <TableRow>
                  {" "}
                  <TableCell align="center" colSpan={12}>
                    No Record Found
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report, index) => (
                  <TableRow
                    key={report.MonthlyLandsacpeId}
                    hover
                    className="material-tbl-alignment"
                    onClick={() => {
                      navigate(
                        `/landscape/add-landscape?id=${report.MonthlyLandsacpeId}`
                      );
                    }}
                  >
                    <TableCell>{report.MonthlyLandsacpeId}</TableCell>
                    <TableCell>{report.CompanyName}</TableCell>

                    <TableCell>{report.RequestByName}</TableCell>

                    <TableCell>{TblDateFormat(report.CreatedDate)}</TableCell>

                    {/* <TableCell>...</TableCell> */}
                    {/* <TableCell>...</TableCell> */}
                    {/* <TableCell align="right">
                      <div>
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
                        <Button className="delete-button">
                          <Delete
                            color="error"
                            onClick={() =>
                              handleDelete(report.MonthlyLandsacpeId)
                            }
                          />
                        </Button>
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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
        </div>
      )}
    </>
  );
};

export default LandscapeTR;

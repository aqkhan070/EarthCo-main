import React, { useEffect, useState, useContext } from "react";

import TitleBar from "../../TitleBar";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton,
  TablePagination,
  TextField,
} from "@mui/material";
import formatDate from "../../../custom/FormatDate";
import { useNavigate } from "react-router-dom";
import TblDateFormat from "../../../custom/TblDateFormat";
import { DataContext } from "../../../context/AppData";
import StatusCards from "../../Landscape/StatusCards";
import AddButton from "../../Reusable/AddButton";

const WeeklyReportlist = () => {
  const icon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5096 2.53165H7.41104C5.50437 2.52432 3.94146 4.04415 3.89654 5.9499V15.7701C3.85437 17.7071 5.38979 19.3121 7.32671 19.3552C7.35512 19.3552 7.38262 19.3561 7.41104 19.3552H14.7343C16.6538 19.2773 18.1663 17.6915 18.1525 15.7701V7.36798L13.5096 2.53165Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2688 2.52084V5.18742C13.2688 6.48909 14.3211 7.54417 15.6228 7.54784H18.1482"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0974 14.0786H8.1474"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2229 10.6388H8.14655"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const navigate = useNavigate();

  const [statusId, setStatusId] = useState(0);
  const [records, setRecords] = useState({});

  const token = Cookies.get("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { loggedInUser } = useContext(DataContext);
  //   const [weeklyreportsError, setstaffFetchError] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [WeeklyReportData, setWeeklyReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchWeeklyReports = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/WeeklyReport/GetWeeklyReportList`,
        { headers }
      );
      setWeeklyReportData(res.data);
      setLoading(false);

      setRecords({
        open: res.data.filter((report) => report.StatusId === 1).length,
        closed: res.data.filter((report) => report.StatusId === 2).length,
      });

      setWeeklyReport(false);
      console.log("proposal report data is", res.data);
    } catch (error) {
      console.log("report api call error", error);
      setWeeklyReport(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyReports();
  }, []);

  const [filteredWeeklyReportData, setFilteredWeeklyReportData] = useState([]);

  useEffect(() => {
    let filteredReports =
      statusId === 0
        ? WeeklyReportData
        : WeeklyReportData.filter((report) => report.StatusId === statusId);
    setFilteredWeeklyReportData(filteredReports);
  }, [statusId, WeeklyReportData]);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sorting
  const [orderBy, setOrderBy] = useState("UserId");
  const [order, setOrder] = useState("asc");

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <TitleBar icon={icon} title="Weekly Landscape" />
      <div className="container-fluid">
        <div className="row">
          <StatusCards
            setStatusId={setStatusId}
            statusId={statusId}
            records={records}
          />
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                <div></div>
                <div className=" me-2">
                  {loggedInUser.userRole == "1" && (
                    <AddButton
                      onClick={() => {
                        navigate("/weekly-reports/add-weekly-report");
                      }}
                    >
                      Add Weekly Report
                    </AddButton>
                  )}
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="table-responsive">
                  {loading ? (
                    <div className="center-loader">
                      <CircularProgress />
                    </div>
                  ) : (
                    <Table>
                      <TableHead className="table-header">
                        <TableRow className="material-tbl-alignment">
                          <TableCell className="ms-3">#</TableCell>

                          <TableCell>Assign / Appointment</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Created</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {weeklyReport ? (
                          <TableRow>
                            <TableCell className="text-center" colSpan={12}>
                              No Record Found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredWeeklyReportData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((staff) => (
                              <TableRow
                                className="material-tbl-alignment"
                                hover
                                key={staff.WeeklyReportId}
                                onClick={() => {
                                  navigate(
                                    `/weekly-reports/add-weekly-report?id=${staff.WeeklyReportId}`
                                  );
                                }}
                              >
                                <TableCell className="ms-3">
                                  {staff.WeeklyReportId}
                                </TableCell>
                                <TableCell>
                                  {staff.RegionalManagerName}
                                </TableCell>
                                <TableCell>{staff.CustomerName}</TableCell>
                                <TableCell>
                                  <span
                                    style={{
                                      backgroundColor: staff.ReportStatusColor,
                                    }}
                                    className="span-hover-pointer badge badge-pill  "
                                  >
                                    {staff.ReportStatus}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {TblDateFormat(staff.CreatedDate)}
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  )}

                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={WeeklyReportData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyReportlist;

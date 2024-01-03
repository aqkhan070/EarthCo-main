import React, { useEffect, useState, useContext } from "react";
import TitleBar from "../../../TitleBar";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  TablePagination,
  TableSortLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import TblDateFormat from "../../../../custom/TblDateFormat";
import CircularProgress from "@mui/material/CircularProgress";
import { DataContext } from "../../../../context/AppData";

const RisingCaneTable = () => {
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

  const token = Cookies.get("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const navigate = useNavigate();
  const { loggedInUser } = useContext(DataContext);

  const [weeklyReport, setWeeklyReport] = useState(true);
  const [WeeklyReportData, setWeeklyReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchWeeklyReports = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/WeeklyReport/GetWeeklyReportRCList`,
        { headers }
      );
      setWeeklyReportData(res.data);
      setLoading(false);

      setWeeklyReport(false);
      console.log("rising cane report data is", res.data);
    } catch (error) {
      console.log("report api call error", error);
      setWeeklyReport(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyReports();
  }, []);

  return (
    <>
      <TitleBar icon={icon} title="Weekly Report- Rising Canes" />
      <div className="container-fluid">
        <div className="card">
          <div className="row mx-2 mt-2 mb-2">
            <div className="col-md-12 text-end">
              {loggedInUser.userRole == "1" && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate(`/weekly-reports/add-rising-canes`);
                  }}
                >
                  Add report
                </button>
              )}
            </div>
          </div>

          <div className="card-body pt-0">
            {loading ? (
              <div className="center-loader">
                <CircularProgress />
              </div>
            ) : (
              <Table hover>
                <TableHead className="table-header">
                  <TableRow className=" bill-tbl-alignment">
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Regional Manager</TableCell>

                    <TableCell>Contact Company</TableCell>
                    <TableCell>Report Week</TableCell>
                    <TableCell>Status</TableCell>
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
                    WeeklyReportData.map((report) => (
                      <TableRow
                        key={report.WeeklyReportRCId}
                        className="bill-tbl-alignment"
                        hover
                      >
                        <TableCell
                          onClick={() => {
                            navigate(
                              `/weekly-reports/add-rising-canes?id=${report.WeeklyReportRCId}`
                            );
                          }}
                        >
                          {report.CompanyName}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(
                              `/weekly-reports/add-rising-canes?id=${report.WeeklyReportRCId}`
                            );
                          }}
                        >
                          {report.ContactName}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(
                              `/weekly-reports/add-rising-canes?id=${report.WeeklyReportRCId}`
                            );
                          }}
                        >
                          {report.RegionalManagerName}
                        </TableCell>

                        <TableCell
                          onClick={() => {
                            navigate(
                              `/weekly-reports/add-rising-canes?id=${report.WeeklyReportRCId}`
                            );
                          }}
                        >
                          {report.ContactCompany}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            navigate(
                              `/weekly-reports/add-rising-canes?id=${report.WeeklyReportRCId}`
                            );
                          }}
                        >
                          {TblDateFormat(report.ReportForWeekOf)}
                        </TableCell>
                        <TableCell>
                          <span
                            onClick={() => {
                              navigate(
                                `/weekly-reports/rising-canes-preview?id=${report.WeeklyReportRCId}`
                              );
                            }}
                            className="span-hover-pointer badge badge-pill badge-success "
                          >
                            Open
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RisingCaneTable;

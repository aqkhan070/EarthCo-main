import React, { useEffect, useState } from "react";
import TitleBar from "../TitleBar";
import axios from "axios";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import OpenWithIcon from "@mui/icons-material/AttachMoney";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const WagesTable = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const currentYear = currentDate.getFullYear();

  const years = Array.from(
    { length: currentYear - 2009 },
    (_, index) => currentYear - index
  );

  const [staffData, setStaffData] = useState([]);
  const [orignalStaffData, setOrignalStaffData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const [isLoading, setIsLoading] = useState(true);
  const [staffFetchError, setstaffFetchError] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
        d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z"
        stroke="#888888"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const getStaffList = async (year=currentYear , month=currentMonth) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Dashboard/GetIrrigatorReport?year=${year}&month=${month}`,
        { headers }
      );
      setstaffFetchError(false);
      setStaffData(response.data);
      setOrignalStaffData(response.data);
      if (response.data != null) {
        setIsLoading(false);
      }
      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
      setstaffFetchError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStaffList();
  }, []);
  useEffect(() => {
    getStaffList(selectedYear,selectedMonth );
  }, [selectedMonth, selectedYear]);
  useEffect(() => {
    // Calculate total amount
    const total = staffData.reduce((accumulator, staff) => accumulator + staff.Amount, 0);
    
    // Set total amount to state
    setTotalAmount(total);

  }, [staffData]);

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

  return (
    <>
      <TitleBar icon={icon} title="Wages" />
      {isLoading ? (
        <div className="center-loader">
          <CircularProgress style={{ color: "#789a3d" }} />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="card">
            <div className="card-body ">
              <div className="row">
              
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12"><label className="form-label">Regional Manager</label>
                  <Autocomplete
                    id="staff-autocomplete"
                    size="small"
                    options={orignalStaffData.filter(
                      (option, index, self) =>
                        self.findIndex(
                          (item) =>
                            item.ReginoalManagerName ===
                            option.ReginoalManagerName
                        ) === index
                    )}
                    getOptionLabel={(option) => option.ReginoalManagerName}
                    onChange={(e, value) => {
                      if (value) {
                        // Filter originalMapData based on the selected customer
                        const filteredData = orignalStaffData.filter(
                          (item) =>
                            item.ReginoalManagerName ===
                            value.ReginoalManagerName
                        );
                        setStaffData(filteredData); // Update mapData with the filtered data
                      } else {
                        // If value is null (text field cleared), reset mapData to original data
                        setStaffData(orignalStaffData);
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.ReginoalManagerName === value.ReginoalManagerName
                    }
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div className="customer-dd-border-map">
                          <h6>{option.ReginoalManagerName}</h6>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        fullWidth
                        onClick={() => {}}
                        placeholder="Select Regional Manager"
                        className="bg-white"
                      />
                    )}
                  /></div>
                  <div className="col-md-6">
                  <label className="form-label">
                    Year
                  </label>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      name="Year"
                      value={selectedYear}
                     
                      onChange={(e) => {setSelectedYear(e.target.value)}}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  </div>
                  <div className="col-md-6">
                  <label className="form-label">
                    Month
                  </label>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      name="Month"
                      value={selectedMonth}
                   
                      onChange={(e) => {setSelectedMonth(e.target.value)}}
                    >
                      {months.map((month, index) => (
                        <MenuItem key={index} value={index + 1}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  </div>
                  </div>
                
                </div>
                <div className="col-md-8">
                  <Table>
                    <TableHead className="table-header">
                      <TableRow className="material-tbl-alignment">
                        <TableCell>Name</TableCell>

                        <TableCell>Regional Manager</TableCell>
                        <TableCell align="center">Hours</TableCell>

                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staffFetchError || staffData.length == 0  ? (
                        <TableRow>
                          <TableCell className="text-center" colSpan={12}>
                            No Record Found
                          </TableCell>
                        </TableRow>
                      ) : null}
                      {staffData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((staff) => (
                          <TableRow
                            className="material-tbl-alignment"
                            hover
                            key={staff.UserId}
                          >
                            <TableCell>{staff.IrrigatorName}</TableCell>

                            <TableCell>{staff.ReginoalManagerName}</TableCell>

                            <TableCell align="center">{staff.Hours}</TableCell>

                            <TableCell align="right">
                              ${staff.Amount}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow
                            className="material-tbl-alignment"
                            hover
                           
                          >
                            <TableCell></TableCell>

                            <TableCell></TableCell>

                            <TableCell align="right"><strong>Total</strong></TableCell>

                            <TableCell align="right">
                              <strong>
                              ${totalAmount}</strong>
                            </TableCell>
                          </TableRow>
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={staffData.length}
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
      )}
    </>
  );
};
export default WagesTable;

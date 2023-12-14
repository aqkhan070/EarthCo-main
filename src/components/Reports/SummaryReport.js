import React, { useContext, useEffect, useState } from "react";
import SummaryReportPreview from "./SummaryReportPreview";
import TitleBar from "../TitleBar";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useCustomerSearch from "../Hooks/useCustomerSearch";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import useFetchProposalReports from "../Hooks/useFetchProposalReports";
import { useNavigate } from "react-router";
import { DataContext } from "../../context/AppData";

const SummaryReport = () => {
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

  const { sRProposalData, setsRProposalData } = useContext(DataContext);

  const [toggleReport, setToggleReport] = useState(false);
  const { customerSearch, fetchCustomers } = useCustomerSearch();
  const { loading, reportError, reportData, fetchReport } =
    useFetchProposalReports();
  const { name, setName, fetchName } = useFetchCustomerName();

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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const currentYear = currentDate.getFullYear();

  const [formData, setFormData] = useState({
    CustomerId: "",
    Year: currentYear, // Set the default year to the current year
    Month: currentMonth, // Set the default month to the current month
  });
  // Create an array of years from 2010 to the current year
  const years = Array.from(
    { length: currentYear - 2009 },
    (_, index) => currentYear - index
  );

  const handleCustomerAutocompleteChange = (event, newValue) => {
    // Construct an event-like object with the structure expected by handleInputChange
    if (newValue) {
      setName(newValue.CompanyName);
    }
    const simulatedEvent = {
      target: {
        name: "CustomerId",
        value: newValue ? newValue.UserId : "",
      },
    };
    handleInputChange(simulatedEvent);
  };

  const handleInputChange = (e, newValue) => {
    const { name, value } = e.target;

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId
    const adjustedValue = ["UserId"].includes(name) ? Number(value) : value;

    setFormData((prevData) => ({ ...prevData, [name]: adjustedValue }));
    console.log("form data is", formData);
  };

  const [submitClicked, setSubmitClicked] = useState(false);

  const getGeneralReportData = () => {
    setSubmitClicked(true);
    if (!formData.CustomerId || !formData.Year || !formData.Month) {
      return;
    }

    setsRProposalData((prevData) => ({
      ...prevData,
      formData,
    }));
    //   fetchReport(

    //     "Service Request"
    //   );
    navigate(
      `/general-report?Customer=${formData.CustomerId}&Year=${formData.Year}&Month=${formData.Month}`
    );
  };

  const getReportData = () => {
    setSubmitClicked(true);
    if (!formData.CustomerId || !formData.Year || !formData.Month) {
      return;
    }

    setsRProposalData((prevData) => ({
      ...prevData,
      formData,
    }));
    //   fetchReport(

    //     "Service Request"
    //   );
    navigate(
      `/summary-report-preview?Customer=${formData.CustomerId}&Year=${formData.Year}&Month=${formData.Month}`
    );
  };

  const getProposalReportData = () => {
    setSubmitClicked(true);
    if (!formData.CustomerId || !formData.Year || !formData.Month) {
      return;
    }
    setsRProposalData((prevData) => ({
      ...prevData,
      formData,
    }));
    navigate(
      `/proposal-summary?Customer=${formData.CustomerId}&Year=${formData.Year}&Month=${formData.Month}`
    );
  };

  const getLandscapeReportData = () => {
    setSubmitClicked(true);
    if (!formData.CustomerId || !formData.Year || !formData.Month) {
      return;
    }
    setsRProposalData((prevData) => ({
      ...prevData,
      formData,
    }));
    navigate(
      `/landscape/landscape-report?Customer=${formData.CustomerId}&Year=${formData.Year}&Month=${formData.Month}`
    );
  };

  return (
    <>
      <TitleBar icon={icon} title="Monthly Reports" />

      <div className="container-fluid mt-3">
        <div className="card">
          <div className="card-header">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <label className="form-label">
                    Customers <span className="text-danger">*</span>
                  </label>
                  <Autocomplete
                    id="staff-autocomplete"
                    size="small"
                    options={customerSearch}
                    getOptionLabel={(option) => option.CompanyName || ""}
                    value={name ? { CompanyName: name } : null}
                    onChange={handleCustomerAutocompleteChange}
                    isOptionEqualToValue={(option, value) =>
                      option.UserId === value.CustomerId
                    }
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div className="customer-dd-border">
                          <h6> {option.CompanyName}</h6>
                          <small># {option.UserId}</small>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        onClick={() => {
                          setName("");
                        }}
                        onChange={(e) => {
                          fetchCustomers(e.target.value);
                        }}
                        placeholder="Choose..."
                        error={submitClicked && !formData.CustomerId}
                        className="bg-white"
                      />
                    )}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    Year<span className="text-danger">*</span>
                  </label>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      name="Year"
                      value={formData.Year}
                      error={submitClicked && !formData.Year}
                      onChange={handleInputChange}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    Month<span className="text-danger">*</span>
                  </label>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      name="Month"
                      value={formData.Month}
                      error={submitClicked && !formData.Month}
                      onChange={handleInputChange}
                    >
                      {months.map((month, index) => (
                        <MenuItem key={index} value={index + 1}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 mt-4 pt-1">
                  <button
                    className="btn btn-primary btn-sm ms-2"
                    onClick={() => {
                      getGeneralReportData();
                    }}
                  >
                    Generate Report
                  </button>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    {" "}
                    <button
                      onClick={() => {
                        navigate("/landscape/add-landscape");
                      }}
                      className="btn btn-info btn-sm me-2"
                    >
                      Add LandScape
                    </button>
                    <button
                      onClick={() => {
                        getLandscapeReportData();
                      }}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      LandScape
                    </button>
                    <button
                      onClick={() => {
                        getProposalReportData();
                      }}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      Proposal Summary
                    </button>
                    <button
                      onClick={() => {
                        getReportData();
                      }}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      Service Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryReport;

import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UpdateEstimateForm from "./UpdateEstimateForm";
import Alert from "@mui/material/Alert";
import { Delete, Create, Visibility } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import formatDate from "../../custom/FormatDate";
import TblDateFormat from "../../custom/TblDateFormat";
import DeleteAllModal from "./DeleteAllModal";
import useGetEstimate from "../Hooks/useGetEstimate";
import { DataContext } from "../../context/AppData";

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

const EstimateTR = ({
  headers,
  estimates,
  statusId,
  setShowStatusCards,
  getEstimate,
  setestmPreviewId,
}) => {
  // useEffect(() => {console.log("estimates inside table are", estimates)},[])
  const { estmRecords, tableError, filterdEstm, getFilteredEstimate } =
    useGetEstimate();
  const { PunchListData, setPunchListData } = useContext(DataContext);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("EstimateId");
  const [filtering, setFiltering] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filterDate, setFilterDate] = useState("This Month");

  const [selectedItem, setSelectedItem] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [submitsuccess, setSubmitsuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [selectedEstimateIds, setSelectedEstimateIds] = useState([]);

  const navigate = useNavigate();

 



 


  const filteredEstimates = filterdEstm;
 
  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  console.log("filtered", filteredEstimates);

  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }

  const deleteEstimate = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/DeleteEstimate?id=${id}`,
        {
          headers,
        }
      );
      console.log(response.data);

      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
        getFilteredEstimate();
      }, 4000);
    } catch (error) {
      console.error("There was an error deleting the customer:", error);
    }
  };

  const handleDelete = (id) => {
    deleteEstimate(id);
  };

  const handleCheckboxChange = (e, estimateId) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedEstimateIds([...selectedEstimateIds, estimateId]);
    } else {
      setSelectedEstimateIds(
        selectedEstimateIds.filter((id) => id !== estimateId)
      );
    }
    console.log("selected ids are", selectedEstimateIds);
  };

  const [pages, setpages] = useState(1);

  const [tablePage, setTablePage] = useState(0);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    // Initial fetch of estimates
    getFilteredEstimate();
    setPunchListData({});
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    getFilteredEstimate(
      search,
      tablePage + 1,
      rowsPerPage,
      statusId,
      isAscending
    );
  }, [search, tablePage, rowsPerPage, statusId, isAscending]);

  const handleChangePage = (event, newPage) => {
    // Update the tablePage state
    setTablePage(newPage);
  };

  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    if (!selectAll) {
      // Select all EstimateIds
      const allEstimateIds = filteredEstimates.map(
        (estimate) => estimate.EstimateId
      );
      setSelectedEstimateIds(allEstimateIds);
    } else {
      // Deselect all EstimateIds
      setSelectedEstimateIds([]);
    }

    // Toggle the selectAll state
    setSelectAll(!selectAll);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
   
              <TableContainer>
                <Table>
                  <TableHead className="table-header">
                    <TableRow className="material-tbl-alignment">
                      {/*<TableCell padding="checkbox">
                           <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAll}
                          /></TableCell> */}
                      <TableCell>#</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell className="table-cell-align">
                        Regional Manager
                      </TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell className="table-cell-align">
                        Estimate #
                      </TableCell>
                      <TableCell className="table-cell-align">
                        Description Of Work
                      </TableCell>
                      <TableCell className="table-cell-align">PO #</TableCell>
                      <TableCell className="table-cell-align">Bill #</TableCell>
                      <TableCell className="table-cell-align">
                        Invoice #
                      </TableCell>
                      <TableCell className=" text-end table-cell-align">
                        Profit %
                      </TableCell>
                      <TableCell className="text-end">Amount</TableCell>
                      {/* <TableCell>Actions</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableError ? (
                      <TableRow>
                        <TableCell className="text-center" colSpan={12}>
                          No record Found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEstimates
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((estimate, index) => (
                          <TableRow
                            className="material-tbl-alignment"
                            onClick={() => {
                             
                              navigate(
                                `/estimates/add-estimate?id=${estimate.EstimateId}`
                              );
                            }}
                            key={estimate.EstimateId}
                            hover
                          >
                           
                            <TableCell>{estimate.EstimateId}</TableCell>
                            <TableCell className="table-cell-align">
                              {estimate.CustomerCompanyName}
                            </TableCell>
                            <TableCell className="table-cell-align">
                              {estimate.RegionalManager}
                            </TableCell>
                            <TableCell className="table-cell-align">
                              {TblDateFormat(estimate.Date)}
                            </TableCell>
                            <TableCell>
                              <span
                                onClick={() => {
                                  navigate(
                                    `/estimates/estimate-preview?id=${estimate.EstimateId}`
                                  );
                                  
                                  console.log(estimate.EstimateId);
                                }}
                                style={{
                                  backgroundColor: estimate.StatusColor,
                                }}
                                className="badge badge-pill  span-hover-pointer"
                              >
                                {estimate.Status}
                              </span>
                            </TableCell>
                            <TableCell
                              align="center"
                              className="table-cell-align"
                            >
                              {estimate.EstimateNumber}
                            </TableCell>
                            {/* <TableCell>{estimate.EstimateAmount}</TableCell> */}
                            <TableCell>{estimate.DescriptionofWork}</TableCell>
                            <TableCell align="center">
                              {estimate.PurchaseOrderNumber}
                            </TableCell>
                            <TableCell align="center">
                              {estimate.BillNumber}
                            </TableCell>
                            <TableCell align="center">
                              {estimate.InvoiceNumber}
                            </TableCell>
                            <TableCell className="text-end">
                              {estimate.ProfitPercentage?.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-end">
                              {estimate.EstimateAmount?.toFixed(2)}
                            </TableCell>
                         
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
             
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={estmRecords.totalRecords}
                rowsPerPage={rowsPerPage}
                page={tablePage} // Use tablePage for the table rows
                onPageChange={handleChangePage}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setTablePage(0); // Reset the tablePage to 0 when rowsPerPage changes
                }}
              />
            
           
      </ThemeProvider>
    </>
  );
};

export default EstimateTR;

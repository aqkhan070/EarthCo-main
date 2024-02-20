import React, { useEffect, useState } from "react";
import AddItem from "./AddItem";

import Cookies from "js-cookie";
import axios from "axios";
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
  TableSortLabel,
  TextField,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Create } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import AddButton from "../Reusable/AddButton";
import EventPopups from "../Reusable/EventPopups";
import useQuickBook from "../Hooks/useQuickBook";

const Items = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const { syncQB } = useQuickBook();

  const navigate = useNavigate();

  const [showContent, setShowContent] = useState(true);
  const [itemsList, setItemsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);

  const [successRes, setSuccessRes] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(false);

  const getFilteredItemsList = async (
    Search = "",
    pageNo = 1,
    PageLength = 10,
    isAscending = false
  ) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Item/GetItemServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}&isAscending=${isAscending}`,
        { headers }
      );
      console.log("filtered items data", res.data);
      setItemsList(res.data.Data);
      setTotalRecords(res.data.totalRecords);
      setLoading(false);
    } catch (error) {
      setItemsList([]);
      setLoading(false);

      console.log("Api call error", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Item/DeleteItem?id=${id}`,
        { headers }
      );
      console.log("item deleted", res.data);
      syncQB(res.data.SyncId);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Item Deleted Successfuly");
      getFilteredItemsList()
    } catch (error) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Error deleting item");
      console.log("Api call error", error);
    }
  };

  const [tablePage, setTablePage] = useState(0);

  useEffect(() => {
    // Initial fetch of estimates
    getFilteredItemsList();
  }, []);

  useEffect(() => {
    // Fetch estimates when the tablePage changes
    getFilteredItemsList(search, tablePage + 1, rowsPerPage, isAscending);
  }, [search, tablePage, rowsPerPage, isAscending]);

  // useEffect(() => {
  //   getItemsList();
  // }, []);

  const handleChangePage = (event, newPage) => {
    console.log("New Page:", newPage);
    setTablePage(newPage);
  };
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const filteredItems = itemsList;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredItems.length - page * rowsPerPage);

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="container-fluid">
        <div className="col-xl-12">
          <div className="card" id="bootstrap-table2">
            {successRes && <Alert security="success">{successRes}</Alert>}
            {loading ? (
              <div className="center-loader">
                <CircularProgress />
              </div>
            ) : (
              <>
                <div className="card-header flex-wrap d-flex justify-content-between  border-0">
                  <div>
                    <TextField
                      label="Search Item"
                      variant="standard"
                      size="small"
                      fullWidth
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className=" me-2">
                    <FormControl className="  me-2" variant="outlined">
                      <Select
                        labelId="customer-type-label"
                        variant="outlined"
                        value={isAscending}
                        onChange={() => {
                          setIsAscending(!isAscending);
                        }}
                        size="small"
                      >
                        <MenuItem value={true}>Ascending</MenuItem>
                        <MenuItem value={false}>Descending</MenuItem>
                      </Select>
                    </FormControl>
                    <AddButton onClick={() => navigate(`/items/add-item`)}>
                      Add Item
                    </AddButton>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <Table>
                    <TableHead className="table-header">
                      <TableRow className="material-tbl-alignment">
                        <TableCell>Name</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell align="center">Account #</TableCell>
                        <TableCell className="text-end">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? filteredItems.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : filteredItems
                      ).map((item, index) => (
                        <TableRow
                          className="material-tbl-alignment"
                          key={index}
                          hover
                        >
                          <TableCell
                            onClick={() => {
                              navigate(`/items/add-item?id=${item.ItemId}`);
                            }}
                          >
                            {item.ItemName}
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              navigate(`/items/add-item?id=${item.ItemId}`);
                            }}
                          >
                            {item.SKU}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={() => {
                              navigate(`/items/add-item?id=${item.ItemId}`);
                            }}
                          >
                            {item.IncomeAccount}
                          </TableCell>
                          <TableCell className="text-end">
                            <Button
                              //  className=" btn btn-primary  btn-icon-xxs me-2"
                              size="small"
                              onClick={() => {
                                setSelectedItem(item.ItemId);
                                setShowContent(false);
                              }}
                            ></Button>
                            <Button
                              //  className="btn btn-danger btn-icon-xxs "
                              size="small"
                              data-bs-toggle="modal"
                              // className="btn btn-danger btn-icon-xxs mr-2"
                              data-bs-target={`#deleteItemModal${item.ItemId}`}
                            >
                              <Delete color="error" />
                            </Button>

                            <div
                              className="modal fade"
                              id={`deleteItemModal${item.ItemId}`}
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
                                    <h5 className="modal-title">Delete Item</h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>
                                  <div className="modal-body text-center">
                                    <p>
                                      Are you sure you want to delete{" "}
                                      {item.ItemName}
                                    </p>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      id="closer"
                                      className="btn btn-danger light me-"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                      onClick={() => deleteItem(item.ItemId)}
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
                      {emptyRows > 0 && (
                        <TableRow>
                          <TableCell colSpan={5} />
                        </TableRow>
                      )}
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Items;

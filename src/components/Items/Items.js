import React, { useEffect, useState } from "react";
import AddItem from "./AddItem";
import ItemTitle from "./ItemTitle";
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
} from "@mui/material";
import { Delete, Create } from "@mui/icons-material";
import Alert from "@mui/material/Alert";

const Items = () => {
  const headers = {
    Authorization: `Bearer ${Cookies.get("token")}`,
  };
  const [showContent, setShowContent] = useState(true);
  const [itemsList, setItemsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);

  const [successRes, setSuccessRes] = useState("");

  const getItemsList = async () => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Item/GetItemList`,
        { headers }
      );
      console.log("items data", res.data);
      setItemsList(res.data);
    } catch (error) {
      console.log("Api call error", error);
    }
  };
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getFilteredItemsList = async (
    Search = "",
    pageNo = 1,
    PageLength = 10
  ) => {
    try {
      const res = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Item/GetItemServerSideList?Search="${Search}"&DisplayStart=${pageNo}&DisplayLength=${PageLength}`,
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
    } catch (error) {
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
    getFilteredItemsList(search, tablePage + 1, rowsPerPage);
  }, [search, tablePage, rowsPerPage]);

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredItems = itemsList;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredItems.length - page * rowsPerPage);

  return (
    <>
      <ItemTitle />
      {showContent ? (
        <>
          <div className="container-fluid">
            <div className="col-xl-12">
              <div className="card" id="bootstrap-table2">
                {successRes && <Alert security="success">{successRes}</Alert>}
                {loading ? (
                  <div className="center-loader">
                    <CircularProgress />
                  </div>
                ) : (
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3 mb-2 text-left">
                        <TextField
                          label="Search"
                          variant="standard"
                          size="small"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>

                      <div className="col-md-9 text-right">
                        <button
                          className="btn btn-primary btn-sm "
                          onClick={() => setShowContent(false)}
                        >
                          + Add New
                        </button>
                      </div>
                    </div>

                    <Table>
                      <TableHead className="table-header">
                        <TableRow>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "ItemName"}
                              direction={orderBy === "ItemName" ? order : "asc"}
                              onClick={() => handleSortRequest("ItemName")}
                            >
                              Name
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "SKU"}
                              direction={orderBy === "SKU" ? order : "asc"}
                              onClick={() => handleSortRequest("SKU")}
                            >
                              SKU
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "IncomeAccount"}
                              direction={
                                orderBy === "IncomeAccount" ? order : "asc"
                              }
                              onClick={() => handleSortRequest("IncomeAccount")}
                            >
                              Account #
                            </TableSortLabel>
                          </TableCell>
                          {/* <TableCell className="text-end">Actions</TableCell> */}
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
                            onDoubleClick={() => {
                              setSelectedItem(item.ItemId);
                              setShowContent(false);
                            }}
                            key={index}
                            hover
                          >
                            <TableCell>{item.ItemName}</TableCell>
                            <TableCell>{item.SKU}</TableCell>
                            <TableCell>{item.IncomeAccount}</TableCell>
                            {/* <TableCell className="text-end">
                              <Button
                                //  className=" btn btn-primary  btn-icon-xxs me-2"
                                size="small"
                                onClick={() => {
                                  setSelectedItem(item.ItemId);
                                  setShowContent(false);
                                }}
                              >
                            <i className="fa fa-pencil"></i> 
                                <Create></Create>
                              </Button>
                              <Button
                                //  className="btn btn-danger btn-icon-xxs "
                                size="small"
                                data-bs-toggle="modal"
                                // className="btn btn-danger btn-icon-xxs mr-2"
                                data-bs-target={`#deleteItemModal${item.ItemId}`}
                              >
                            <i className="fa fa-trash"></i>
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
                                      <h5 className="modal-title">
                                        Delete Item
                                      </h5>
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
                            </TableCell> */}
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
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <AddItem
          headers={headers}
          getFilteredItemsList={getFilteredItemsList}
          selectedItem={selectedItem}
          setShowContent={setShowContent}
          setSuccessRes={setSuccessRes}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
};

export default Items;

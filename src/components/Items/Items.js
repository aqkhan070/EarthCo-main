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
} from "@mui/material";
import { Delete, Create } from "@mui/icons-material";



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
  const [selectedItem, setSelectedItem] = useState(0)


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

  useEffect(() => {
    getItemsList();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredItems = itemsList.filter((item) =>
    item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredItems.length - page * rowsPerPage);

  return (
    <>
      <ItemTitle />
      {showContent ? (
        <>
          <div className="container-fluid">
            <div className="card">
              <div className="">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card" id="bootstrap-table2">
                      <div className=" card-header flex-wrap d-flex justify-content-between  border-0">
                        <h4 className="heading mb-0">Items</h4>
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => setShowContent(false)}
                          >
                            + Add New
                          </Button>
                        </div>
                      </div>

                      <div className="card-body">
                    
                          <div className="search-container ">
                            <TextField
                              label="Search"
                              variant="standard"
                              size="small"
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <Table>
                            <TableHead className="table-header">
                              <TableRow>
                                <TableCell>
                                  <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="checkAll"
                                      required=""
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkAll"
                                    ></label>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <TableSortLabel
                                    active={orderBy === "ItemName"}
                                    direction={
                                      orderBy === "ItemName" ? order : "asc"
                                    }
                                    onClick={() =>
                                      handleSortRequest("ItemName")
                                    }
                                  >
                                    Name
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                  <TableSortLabel
                                    active={orderBy === "SKU"}
                                    direction={
                                      orderBy === "SKU" ? order : "asc"
                                    }
                                    onClick={() => handleSortRequest("SKU")}
                                  >
                                    SKU
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                  <TableSortLabel
                                    active={orderBy === "IncomeAccount"}
                                    direction={
                                      orderBy === "IncomeAccount"
                                        ? order
                                        : "asc"
                                    }
                                    onClick={() =>
                                      handleSortRequest("IncomeAccount")
                                    }
                                  >
                                    Account#
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>Actions</TableCell>
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
                                <TableRow key={index} hover>
                                  <TableCell>
                                    <div className="form-check custom-checkbox checkbox-success check-lg me-3">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`customCheckBox${index}`}
                                        required=""
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`customCheckBox${index}`}
                                      ></label>
                                    </div>
                                  </TableCell>
                                  <TableCell>{item.ItemName}</TableCell>
                                  <TableCell>{item.SKU}</TableCell>
                                  <TableCell>{item.IncomeAccount}</TableCell>
                                  <TableCell>
                                  
                                      <Button
                                        //  className=" btn btn-primary  btn-icon-xxs me-2"
                                        size="small"
                                        onClick={() => {
                                          setSelectedItem(item.ItemId)
                                          setShowContent(false)
                                        }}
                                      >
                                        {/* <i className="fa fa-pencil"></i> */}
                                        <Create></Create>
                                      </Button>
                                      <Button
                                        //  className="btn btn-danger btn-icon-xxs "
                                        size="small"
                                        onClick={() => {deleteItem(item.ItemId)}}
                                      >
                                        {/* <i className="fa fa-trash"></i> */}
                                        <Delete color="error" />
                                      </Button>
                                   
                                  </TableCell>
                                </TableRow>
                              ))}
                              {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                  <TableCell colSpan={5} />
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                     
                        <TablePagination
                          rowsPerPageOptions={[ 10, 50, 100]}
                          component="div"
                          count={filteredItems.length}
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
          </div>
        </>
      ) : (
        <AddItem headers={headers} selectedItem={selectedItem} setShowContent={setShowContent} />
      )}
    </>
  );
};

export default Items;

import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TableRow,
  TableSortLabel,
  Button,
  TablePagination,
  IconButton,
  TableContainer,
  Typography,
  Box,
  Checkbox,
  Paper,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Add, Delete, Edit } from "@mui/icons-material";
import punchList from "../../assets/images/1.jpg";
import { Form } from "react-bootstrap";
import axios from "axios";
import { DataContext } from "../../context/AppData";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
const PunchListDetailRow = ({
  headers,
  item,
  rowIndex,
  expandedRow,
  setPlDetailId,
}) => {
  const { PunchDetailData, setPunchDetailData, setPunchListData } =
    useContext(DataContext);
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCostItem, setSelectedCostItem] = useState([]);

  const handleCheckboxChange = (items) => {
    if (selectedItems.includes(items)) {
      // If item is already in the selectedItems array, remove it
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== items)
      );
    } else {
      // If item is not in the selectedItems array, add it
      setSelectedItems([...selectedItems, items]);
    }

    console.log("selected item is", selectedCostItem);
  };

  useEffect(() => {
    const updatedSelectedItems = selectedItems.map((items) => ({
      ...items,
      isCost: false,
    }));

    setPunchListData((prevData) => ({
      ...prevData,
      AssignTo: item.Data.AssignedTo,
      ContactId: item.Data.ContactId,
      PunchlistId: item.Data.PunchlistId,
      CustomerId: item.Data.CustomerId,
      ItemData: updatedSelectedItems,
    }));
  }, [selectedItems]);

  const deletePunchListDetail = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchList/DeletePunchlistDetail?id=${id}`,
        {
          headers,
        }
      );
      console.log("delete pl details response", response.data);
    } catch (error) {
      console.error(
        "There was an error deleting the punch list detail:",
        error
      );
    }
  };

  const handleDelete = (id) => {
    deletePunchListDetail(id);
  };
  return (
    <>
      {item.DetailDataList.map((detail) => {
        return (
          <TableRow key={detail.DetailData.PunchlistDetailId}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse
                in={expandedRow === rowIndex}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    {/* collapssss */}
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      <TableRow>
                        <TableCell rowSpan={2} component="th" scope="row">
                          <div className="products">
                            <img
                              src={`https://earthcoapi.yehtohoga.com/${detail.DetailData.PhotoPath}`}
                              className="avatar avatar-md"
                              alt="PunchList Image"
                            />
                            <div>
                              <h6>{detail.DetailData.Notes}</h6>
                              <span>{detail.DetailData.PunchlistDetailId}</span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {detail.ItemData.map((item) => {
                            return (
                              <div key={item.ItemId}>
                                <Checkbox
                                  checked={selectedItems.includes(item)}
                                  onChange={() => handleCheckboxChange(item)}
                                />
                                <span>{item.Name}</span>
                              </div>
                            );
                          })}
                        </TableCell>

                        <TableCell className="Punch-Detail-Link" colSpan={4}>
                          <FormControl>
                            {/* <InputLabel size="small" id="pLLink">
                              select
                            </InputLabel> */}
                            <Select
                              labelId="pLLink"
                              aria-label="Default select example"
                              variant="outlined"
                              size="small"
                              placeholder="Select"
                              fullWidth
                            >
                              <MenuItem onClick={() => {}} value={2}>
                                Complete
                              </MenuItem>
                              <MenuItem onClick={() => {}} value={3}>
                                Pending
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  console.log("estimate", item);

                                  navigate(
                                    "/Dashboard/Estimates/Update-Estimate"
                                  );
                                }}
                                value={5}
                              >
                                Estimate
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  console.log("service request");
                                  navigate(
                                    "/Dashboard/Service-Requests/Update-SRform"
                                  );
                                }}
                                value={4}
                              >
                                Service Request
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <TableCell></TableCell>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            className="delete-button"
                            data-bs-toggle="modal"
                            data-bs-target="#addPhotos"
                            onClick={() => {
                              setPunchDetailData(detail);
                            }}
                          >
                            <Edit />
                          </Button>
                          <Button
                            color="error"
                            className="delete-button"
                            data-bs-toggle="modal"
                            data-bs-target={`#deletePlDetailsModal${detail.DetailData.PunchlistDetailId}`}
                          >
                            <Delete />
                          </Button>

                          <div
                            className="modal fade"
                            id={`deletePlDetailsModal${detail.DetailData.PunchlistDetailId}`}
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
                                    Punch List Detail Delete
                                  </h5>

                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <p>
                                    Are you sure you want to delete{" "}
                                    {detail.DetailData.PunchlistDetailId}
                                  </p>
                                </div>

                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    id="closer"
                                    className="btn btn-danger light "
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    className="btn btn-primary "
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      handleDelete(
                                        detail.DetailData.PunchlistDetailId
                                      );
                                    }}
                                  >
                                    Yes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default PunchListDetailRow;

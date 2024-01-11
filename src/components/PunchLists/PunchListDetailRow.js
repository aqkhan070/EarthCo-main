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
import EventPopups from "../Reusable/EventPopups";
import Tooltip from "@mui/material/Tooltip";
const PunchListDetailRow = ({
  headers,
  item,
  rowIndex,
  expandedRow,
  setPlDetailId,
  fetchFilterdPunchList,
}) => {
  const { PunchDetailData, setPunchDetailData, setPunchListData } =
    useContext(DataContext);
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCostItem, setSelectedCostItem] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

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
      // PhotoPath: item.DetailDataList.DetailData.PhotoPath,
      // AfterPhotoPath: item.DetailDataList.DetailData.AfterPhotoPath,
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
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Punch List detail deleted successfuly");
      fetchFilterdPunchList();
      console.log("delete pl details response", response.data);
    } catch (error) {
      console.log("There was an error deleting the punch list detail:", error);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Error deleting punch list detail");
    }
  };

  const changePlStatus = async (id, status) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchList/UpdatePunchlistDetailStatus?PunchlistDetailId=${id}&StatusId=${status}`,
        {
          headers,
        }
      );
      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText("Punch List Status Changed successfuly");
      fetchFilterdPunchList();
      console.log("delete pl details response", response.data);
    } catch (error) {
      console.log("There was an error deleting the punch list detail:", error);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText(
        "There was an error changing status of punch list detail:"
      );
    }
  };

  const handleDelete = (id) => {
    deletePunchListDetail(id);
  };
  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      {item.DetailDataList.map((detail) => {
        return (
          <TableRow key={detail.DetailData.PunchlistDetailId}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
              <Collapse
                in={expandedRow === rowIndex}
                timeout="auto"
                unmountOnExit
              >
                <Table size="small" aria-label="purchases">
                  <TableRow>
                    <TableCell colSpan={3} sx={{ maxWidth: "7em" }}>
                      <div className="products">
                        {detail.DetailData.PhotoPath ? (
                          <>
                            {" "}
                            <a
                              href={`https://earthcoapi.yehtohoga.com/${detail.DetailData.PhotoPath}`}
                              target="_blank" // This attribute opens the link in a new tab
                              rel="noopener noreferrer" // Recommended for security reasons
                            >
                              <img
                                src={`https://earthcoapi.yehtohoga.com/${detail.DetailData.PhotoPath}`}
                                className="avatar avatar-md"
                                alt="PunchList Image"
                              />
                            </a>
                          </>
                        ) : (
                          <div style={{ width: "5em" }}>No image found</div>
                        )}

                        <div>
                          <Tooltip title={detail.DetailData.Notes} arrow>
                            <h6
                              style={{
                                maxWidth: "7em",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {detail.DetailData.Notes}
                            </h6>{" "}
                          </Tooltip>
                          <span>{detail.DetailData.PunchlistDetailId}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          backgroundColor:
                            detail.DetailData.PunchlichlistDetailColor,
                        }}
                        className="badge badge-pill "
                      >
                        {detail.DetailData.PunchlichlistDetailStatus}
                      </span>
                    </TableCell>

                    <TableCell colSpan={3}>
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

                    <TableCell className="Punch-Detail-Link" colSpan={3}>
                      <FormControl className="punch-select-width">
                        {/* <InputLabel size="small" id="pLLink">
                              select
                            </InputLabel> */}
                        <Select
                          labelId="pLLink"
                          aria-label="Default select example"
                          variant="outlined"
                          size="small"
                          placeholder="Select"
                          value={1}
                          fullWidth
                        >
                          <MenuItem onClick={() => {}} value={1}>
                            Select
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              changePlStatus(
                                detail.DetailData.PunchlistDetailId,
                                1
                              );
                            }}
                            value={2}
                          >
                            Complete
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              changePlStatus(
                                detail.DetailData.PunchlistDetailId,
                                2
                              );
                            }}
                            value={3}
                          >
                            Pending
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              console.log("estimate", item);
                              setPunchListData((prevData) => ({
                                ...prevData,
                                PhotoPath: detail.DetailData.PhotoPath,
                                AfterPhotoPath:
                                  detail.DetailData.AfterPhotoPath,
                              }));

                              navigate("/estimates/add-estimate");
                            }}
                            value={5}
                          >
                            Estimate
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              console.log("service request");
                              navigate("/service-requests/add-sRform");
                            }}
                            value={4}
                          >
                            Service Request
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell colSpan={3} align="right">
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
                            <div className="modal-body text-center">
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
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default PunchListDetailRow;

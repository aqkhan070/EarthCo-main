import React from "react";
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


const PunchListDetailRow = ({headers, item, rowIndex, expandedRow,setPlDetailId }) => {

  const deletePunchListDetail = async (id) => {
    // try {
    //   const response = await axios.get(
    //     `https://earthcoapi.yehtohoga.com/api/PunchList/DeletePunchlist?id=${id}`,
    //     {
    //       headers,
    //     }
    //   );
  
      
  
    //   const data = await response.json();
  
    //   // Handle the response. For example, you can reload the customers or show a success message
    //   console.log("detail deleted successfully:", data);
    //   window.location.reload();
    // } catch (error) {
    //   console.error("There was an error deleting the customer:", error);
    // }
  };

 
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deletePunchListDetail(id);
    }
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
                        <TableCell></TableCell>
                        <TableCell rowSpan={2} component="th" scope="row">
                          <div className="products">
                            <img
                              src={`https://earthcoapi.yehtohoga.com/${detail.DetailData.PhotoPath}`}
                              className="avatar avatar-md"
                              alt="PunchList Image"
                            />
                            <div>
                              <h6>Keep plants</h6>
                              <span>{detail.DetailData.PunchlistDetailId}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {" "}

                          {detail.ItemData.map((item) => {
                            return(
                                <div key={item.ItemId}>
                            <Checkbox />
                            <span>{item.Name}</span>
                          </div>
                            )
                          })}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell rowSpan={2} align="right">
                          <Form.Select
                            aria-label="Default select example"
                            id="inputState"
                            className="bg-white"
                          >
                            <option value="complete">Complete</option>
                            <option value="pending">Pending</option>
                            <option value="Estimate">Estimate</option>
                            <option value="Service Request">
                              Service Request
                            </option>
                          </Form.Select>
                          <TableCell></TableCell>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            className="delete-button"
                            data-bs-toggle="modal"
                            data-bs-target="#addPhotos"
                            onClick={setPlDetailId(detail.DetailData.PunchlistDetailId)}
                          >
                            <Edit />
                          </Button>
                          <Button color="error" className="delete-button" onClick={() => {handleDelete(detail.DetailData.PunchlistDetailId)}}>
                            <Delete />
                          </Button>
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

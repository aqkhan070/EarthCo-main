import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Collapse,
  Box,
  IconButton,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

const PunchTR = ({ punchData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = punchData.filter((item) => item.ContactName.includes(search));

  return (
    <Paper sx={{ width: '100%' }}>
      {/* Search */}
      <TextField
        label="Search by Customer Name"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: '16px' }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reports</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <React.Fragment key={item.PunchlistId}>
                <TableRow>
                  <TableCell>{item.PunchlistId}</TableCell>
                  <TableCell>{item.ContactName}</TableCell>
                  <TableCell>{item.Title}</TableCell>
                  <TableCell>{item.AssignedTo}</TableCell>
                  <TableCell>{item.CreatedDate}</TableCell>
                  <TableCell>{item.Status}</TableCell>
                  <TableCell>{item.Reports}</TableCell>
                  
                  <TableCell>
                    <IconButton><Add /></IconButton>
                    <IconButton><Edit /></IconButton>
                    <IconButton><Delete /></IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={openRow === item.PunchlistId} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        {/* Your collapsed content here */}
                        <Select defaultValue="complete" fullWidth>
                          <MenuItem value="complete">Complete</MenuItem>
                          {/* ... other options */}
                        </Select>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PunchTR;

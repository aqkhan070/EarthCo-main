import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const TableFilterPopover = ({ anchorEl, onClose,  selectedCell, setBillFilter, setInvoiceFilter, setPoFilter }) => {
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = (event) => {
   
    if (selectedCell == "PO") {
        setPoFilter(event.target.value);
     
    }
    if (selectedCell == "Bill") {
        setBillFilter(event.target.value);
      
    }
    if (selectedCell == "Invoice") {
        setInvoiceFilter(event.target.value);
        
    }
    onClose();

  };

 

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
   
    >
      <div style={{ padding: '16px' ,  width: '17em'}}>
        <label >{selectedCell}</label>
        <Select
         
          size='small'
         value={selectedOption}
          onChange={handleOptionChange}
          fullWidth
          // Use style to set the width of the select field
          style={{ width: '100%' }} // Adjust the width as needed
        ><MenuItem value="All">All</MenuItem>
          <MenuItem value="Generated">Generated</MenuItem>
          <MenuItem value="Not Generated">Not Generated</MenuItem>
          
        </Select>
      
      </div>
    </Popover>
  );
};

export default TableFilterPopover;

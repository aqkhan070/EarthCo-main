import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import formatAmount from '../../custom/FormatAmount';
import TblDateFormat from '../../custom/TblDateFormat';
import { TablePagination } from "@mui/material";


const CustomerInvoice = ({data = []}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
    return (
        <div className="card">
          <h4 className="modal-title itemtitleBar" id="#gridSystemModal1">
           Invoices
          </h4>
    
          <div className="card-body">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="estDataBox">
                    <div className="table-responsive active-projects style-1">
                      <table id="empoloyees-tblwrapper" className="table">
                        <thead>
                          <tr>
                            <th>Invoice</th>
                            <th>Issue Date</th>
                            <th>Profit %</th>
                            <th>Balance</th>
                            <th>Total</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                        {data.length === 0 ? <tr><td className='text-center' colSpan={12}>No Record Found</td></tr>:data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                           <tr key={index} style={{cursor : "pointer"}}   onClick={() => {
                            navigate(`/invoices/add-invoices?id=${item.InvoiceId}`);
                          }}>
                          <td style={{padding : "0.9em 0.5em"}}>{item.InvoiceNumber}</td>
                          <td style={{padding : "0.9em 0.5em"}}>{TblDateFormat(item.IssueDate)}</td>
                          <td style={{padding : "0.9em 0.5em"}}>{item.ProfitPercentage ? item.ProfitPercentage.toFixed(2): ""}</td>
                          <td style={{padding : "0.9em 0.5em"}}>${formatAmount(item.BalanceAmount)}</td>
                          <td style={{padding : "0.9em 0.5em"}}>${formatAmount(item.TotalAmount)}</td>
                          
                        </tr>
                          ))}
                        </tbody>
                      </table>
                      <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={data.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(event, newPage) => setPage(newPage)}
  onRowsPerPageChange={(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }}
/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default CustomerInvoice
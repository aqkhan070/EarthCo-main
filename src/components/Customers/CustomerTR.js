import React, { useContext, useMemo } from "react";
import { CustomerContext } from "../../context/CustomerData";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

const CustomerTR = ({customers  }) => {
  const { setSelectedCustomer } = useContext(CustomerContext);

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const dummyCustomers =[
    {
      "CustomerId": 1,
      "CustomerName": "Asad Bilal Arif",
      "ContactId": 0,
      "ContactName": null,
      "ContactCompany": null,
      "ContactEmail": null
    },
    {
      "CustomerId": 2,
      "CustomerName": "Asad Bilal",
      "ContactId": 0,
      "ContactName": null,
      "ContactCompany": null,
      "ContactEmail": null
    },
    {
      "CustomerId": 5,
      "CustomerName": "Hanan",
      "ContactId": 4,
      "ContactName": "Contact1 Contact1",
      "ContactCompany": "CompanyName1",
      "ContactEmail": "Email1"
    }
  ];
  const data = useMemo(() => customers, [customers]);
  // console.log("customers",customers);
  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: "#",
      accessorKey: "CustomerId",
    },
    {
      header: "Customer Name",
      accessorKey: "CustomerName",
      
       
    },
    {
      header: "Contact Name",
      accessorKey: "ContactName",
    },
    {
      header: "Contact Company",
      accessorKey: "ContactCompany",
    },
    {
      header: "Contact E-Mail	",
      accessorKey: "ContactEmail",
    },{
      header: "Actions",
      cell : <div className="badgeBox ">
      {/* <button
        type="button"
        onClick={(e) => setSelectedCustomer(customer)}
        className="dispContents"
        data-toggle="modal"
        data-target="#customerShow"
      >
        <span className="actionBadge badge-success light border-0">
          <span className="material-symbols-outlined">visibility</span>
        </span>
      </button> */}
      <span className="actionBadge badge-danger light border-0 badgebox-size">
        <span className="material-symbols-outlined badgebox-size ">delete</span>
      </span>
    </div>
      
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <div className="w3-container">
        <input
          type="text"
          className="form-control"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: "🔼", desc: "🔽" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
         {/* <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
        </table>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary"
            onClick={() => table.setPageIndex(0)}
          >
            First page
          </button>
          <button
            className="btn btn-secondary"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous page
          </button>
          <button
            className="btn btn-secondary"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next page
          </button>
          <button
            className="btn btn-primary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last page
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerTR;

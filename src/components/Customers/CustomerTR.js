import React, {  useMemo } from "react";
import { Link } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

const CustomerTR = ({ customers }) => {

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const data = useMemo(() => customers, [customers]);
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
    },
    {
      header: "Actions",
      cell: (
        <div className="badgeBox justify-content-center ">
          <button
        type="button"
        onClick={(e) => {}}
        className="dispContents"
        data-toggle="modal"
        data-target="#customerShow"
      >
        <span className="actionBadge badge-success light border-0">
          <span className="material-symbols-outlined">visibility</span>
        </span>
      </button>
          <span className="actionBadge badge-danger light border-0 badgebox-size">
            <span className="material-symbols-outlined badgebox-size ">
              delete
            </span>
          </span>
        </div>
      ),
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
      <div className="container">
        <div className="container text-center">
          <div className="row justify-content-between">
            <div className="col-6 search-container">
              <div className="container text-center search-wrap">
                <div className="row justify-content-start ">
                  <div className="col-3">
                    <label
                      htmlFor="searchInput"
                      className="col-sm-4 col-form-label search-Lable"
                    >
                      Search:
                    </label>
                  </div>
                  <div class="col-4">
                    <input
                      type="text"
                      className="form-control customer-search-input"
                      value={filtering}
                      placeholder="Search Customer..."
                      onChange={(e) => setFiltering(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-3 add-customer-btn">
              <Link to="/Dashboard/Customers/Add-Customer">
                <button className="btn btn-primary btn-sm" role="button">
                  + Add Customer
                </button>
              </Link>
            </div>
          </div>
        </div>

        <table className="table">
          <thead className="table-header">
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
                          { asc: "▲", desc: "▼ " }[
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div class="d-flex flex-row-reverse">
        <div className="p-2">
            <button
              className="btn btn-primary page-btn"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Last
            </button>
          </div>
          
          <div className="p-2">
            <button
              className="btn btn-secondary page-btn"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </button>
          </div>
          <div className="p-2">
            <button
              className="btn btn-secondary page-btn"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Prev
            </button>
          </div>
          <div className="p-2">
            <button
              className="btn btn-primary page-btn"
              onClick={() => table.setPageIndex(0)}
            >
              First
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default CustomerTR;

<>
<TableBody>
{/* Modify this part to display rows for the current page */}
{weeklyReport
  ? <TableRow><TableCell className="text-center" colSpan={12}>No Record Found</TableCell></TableRow>
  : filteredWeeklyReportData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((report) => {
        // ... [Your row rendering code]
      })
}
</TableBody>


<TablePagination
component="div"
count={weeklyReport ? 0 : filteredWeeklyReportData.length}
page={page}
onPageChange={handleChangePage}
rowsPerPage={rowsPerPage}
onRowsPerPageChange={handleChangeRowsPerPage}
/>
</>
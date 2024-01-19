<div className="card-body py-0">
<div className="row  dashboard-header">
  <div className="col-md-6  ">
    <h4 className="pt-3 pb-2" style={{ color: "white" }}>
    Estimates
    </h4>
  </div>
  <div className="col-md-6 text-end">
    {selectedServiceRequests.length <= 0 ? (
      <></>
    ) : (
      <FormControl
              className="py-2 me-2"
              style={{ borderColor: "transparent", color: "white" }}
              variant="outlined"
            >
              <Select
                labelId="customer-type-label"
                variant="outlined"
                style={{ borderColor: "transparent", color: "white" }}
                size="small"
                value={1}
              >
                <MenuItem value={1}>Group Actions</MenuItem>

                <UpdateAllModal
                  selectedItems={selectedEstimates}
                  endpoint={"Estimate/UpdateAllSelectedEstimateStatus"}
                  bindingFunction={getDashboardData}
                />
                <br />

                <DeleteAllModal
                  selectedItems={selectedEstimates}
                  endpoint={"Estimate/DeleteAllSelectedEstimate"}
                  bindingFunction={getDashboardData}
                />
              </Select>
            </FormControl>
    )}
  </div>
</div>
<div className="row">
<Table>
          <TableHead className="table-header">
            <TableRow className="material-tbl-alignment">
              <TableCell padding="checkbox">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Assign to</TableCell>
              <TableCell>Estimate #</TableCell>
              <TableCell align="right">Estimate Amount</TableCell>
              <TableCell>Estimate Note</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashBoardData.EstimateData.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No Record Found
                </TableCell>
              </TableRow>
            ) : (
              dashBoardData.EstimateData?.map((estimate, index) => (
                <TableRow
                  className={`material-tbl-alignment ${
                    isRowSelected(estimate.EstimateId) ? "selected-row" : ""
                  }`}
                  key={estimate.EstimateId}
                  hover
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEstimates.includes(estimate.EstimateId)}
                      onChange={(e) =>
                        handleCheckboxChange(e, estimate.EstimateId)
                      }
                    />
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      navigate(
                        `/estimates/add-estimate?id=${estimate.EstimateId}`
                      );
                    }}
                  >
                    {estimate.CustomerName}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      navigate(
                        `/estimates/add-estimate?id=${estimate.EstimateId}`
                      );
                    }}
                  >
                    {estimate.RegionalManager}
                  </TableCell>

                  <TableCell
                    onClick={() => {
                      navigate(
                        `/estimates/add-estimate?id=${estimate.EstimateId}`
                      );
                    }}
                  >
                    {estimate.EstimateNumber}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      navigate(
                        `/estimates/add-estimate?id=${estimate.EstimateId}`
                      );
                    }}
                    align="right"
                  >
                    {estimate.EstimateAmount.toFixed(2)}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      navigate(
                        `/estimates/add-estimate?id=${estimate.EstimateId}`
                      );
                    }}
                  >
                    {estimate.DescriptionofWork}
                  </TableCell>

                  <TableCell
                    onClick={() => {
                      navigate(
                        `/estimates/add-estimate?id=${estimate.EstimateId}`
                      );
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: estimate.StatusColor,
                      }}
                      className="badge badge-pill badge-success "
                    >
                      {estimate.Status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
</div>
</div>
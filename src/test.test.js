import React, { useState } from "react";
// ... other imports ...

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c9c3d",
    },
  },
  typography: {
    fontSize: 16,  // Making font a bit larger
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px 16px',  // Adjust cell padding to reduce height
        },
      },
    },
  },
});

// ... unchanged code ...

const EstimateTR = ({ estimates }) => {
  // ... unchanged code ...

  const filteredEstimates = estimates
    .filter((e) => e.CustomerName.toLowerCase().includes(filtering.toLowerCase()))
    .sort(getSorting(order, orderBy));  // Moved sorting here so it always sorts after filtering

  return (
    <>
      {showContent ? (
        <ThemeProvider theme={theme}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12} className="container text-center">
              <TextField
                fullWidth  // Makes the TextField take the full width on small screens
                label="Search"
                variant="outlined"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  {/* ... rest of the table ... */}
                </Table>
              </TableContainer>
              {/* ... TablePagination ... */}
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : (
        <UpdateEstimateForm
          setShowContent={setShowContent}
          estimateId={selectedItem}
        />
      )}
    </>
  );
};

export default EstimateTR;

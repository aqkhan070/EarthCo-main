// ... Previous code ...

const filteredEstimates = estimates
  .filter((e) => e.CustomerName.toLowerCase().includes(filtering.toLowerCase()))
  .filter((e) => filterByDate(e.DateCreated, filterDate))
  .sort(getSorting(order, orderBy));

// ... Other parts of the component ...

function filterByDate(dateString, filterType) {
  const date = new Date(dateString);
  const now = new Date();
  let startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  let endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  let startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  let endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  let startOfThreeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

  switch (filterType) {
    case "This Month":
      return date >= startOfMonth && date <= endOfMonth;
    case "Previous Month":
      return date >= startOfPrevMonth && date <= endOfPrevMonth;
    case "Last three months":
      return date >= startOfThreeMonthsAgo && date <= endOfMonth;
    default:
      return true;  // By default, return true if the filter type is unrecognized
  }
}

// ... Remaining parts of the component ...

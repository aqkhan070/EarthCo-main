const formatDate = (dateString, reverse = true) => {
  if (!dateString) return ""; // Handle empty or undefined input

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  if (reverse) {
    return `${year}-${month}-${day}`;
  } else {
    return `${month}/${day}/${year}`;
  }
};

export default formatDate;

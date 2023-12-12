const TblDateFormat = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined input
  
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  
    return `${month}-${day}-${year}`;
  };
  
  export default TblDateFormat;
  
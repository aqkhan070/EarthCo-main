const formatAmount = (amount) => {
    if (typeof amount !== 'number') return "0.00"; // Handle invalid input
  
    const formatted = amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formatted;
  };
  
  export default formatAmount;
  
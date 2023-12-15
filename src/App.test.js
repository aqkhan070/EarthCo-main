
const [subtotal, setSubtotal] = useState(0);
const [totalProfit, setTotalProfit] = useState(0);
const [totalACAmount, setTotalACAmount] = useState(0);
const [totalExpense, setTotalExpense] = useState(0);
const [totalDiscount, setTotalDiscount] = useState(0);
const [paymentCredit, setPaymentCredit] = useState(0);
const [balanceDue, setBalanceDue] = useState(0);

const shippingcostChange = (e) => {
  if (parseFloat(e.target.value) > 0) {
    setShippingCost(parseFloat(e.target.value));
  } else {
    setShippingCost(0);
  }
};

const discountChange = (e) => {
  const newValue = parseFloat(e.target.value);

  if (newValue) {
    if (newValue >= 0 && newValue <= 100) {
      setTotalDiscount(newValue);
    } else if (newValue > 100) {
      setTotalDiscount(100); // Set it to the maximum value (100) if it exceeds.
    } else {
      setTotalDiscount(0);
    }
  }
};

useEffect(() => {
  const filteredACItems = formData.tblInvoiceItems?.filter(
    (item) => item.isCost === true
  );
  const filteredItems = formData.tblInvoiceItems?.filter(
    (item) => item.isCost === false
  );

  const newACTotalAmount = filteredACItems?.reduce(
    (acc, item) => acc + item.Rate * item.Qty,
    0
  );

  const newTotalAmount = filteredItems?.reduce(
    (acc, item) => acc + item.Rate * item.Qty,
    0
  );

  const newCostTotalAmount = filteredItems?.reduce(
    (acc, item) => acc + item.PurchasePrice * item.Qty,
    0
  );
  const totalamount =
    newTotalAmount + shippingCost - (totalDiscount / subtotal) * 100;

  const calculatedTotalProfit =
    newTotalAmount - (totalDiscount / subtotal) * 100 - totalExpense;

  const calculatedProfitPercentage =
    (calculatedTotalProfit / totalExpense) * 100;

  setTotalExpense(newCostTotalAmount + newACTotalAmount);

  setSubtotal(newTotalAmount);
  setTotalACAmount(newACTotalAmount);
  if (totalamount) {
    setTotalItemAmount(totalamount);
  }
  if (calculatedTotalProfit) {
    setTotalProfit(calculatedTotalProfit);
  }

  setBalanceDue(totalItemAmount - paymentCredit);

  setProfitPercentage(calculatedProfitPercentage);

  // console.log("amounts are", calculatedProfitPercentage, shippingCost, calculatedTotalProfit, totalACAmount, totalItemAmount, subtotal);
}, [
  formData.tblInvoiceItems,
  shippingCost,
  totalDiscount,
  totalItemAmount,
  subtotal,
  totalExpense,
]);

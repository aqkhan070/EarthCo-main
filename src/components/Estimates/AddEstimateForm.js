import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Print, Email, Download } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Delete, Create } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import formatDate from "../../custom/FormatDate";
import useFetchInvoices from "../Hooks/useFetchInvoices";
import useFetchBills from "../Hooks/useFetchBills";
import useFetchPo from "../Hooks/useFetchPo";
import useCustomerSearch from "../Hooks/useCustomerSearch";
import useFetchCustomerName from "../Hooks/useFetchCustomerName";
import { useNavigate } from "react-router-dom";
import { useEstimateContext } from "../../context/EstimateContext";
import useDeleteFile from "../Hooks/useDeleteFile";
import { DataContext } from "../../context/AppData";
import { RoutingContext } from "../../context/RoutesContext";
import useSendEmail from "../Hooks/useSendEmail";
import EventPopups from "../Reusable/EventPopups";
import LoaderButton from "../Reusable/LoaderButton";
import Contacts from "../CommonComponents/Contacts";
import ServiceLocations from "../CommonComponents/ServiceLocations";
import useFetchContactEmail from "../Hooks/useFetchContactEmail";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import useQuickBook from "../Hooks/useQuickBook";

const AddEstimateForm = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const currentDate = new Date();
  const [formData, setFormData] = useState({
    EstimateNumber: "",
    IssueDate: formatDate(currentDate),
    EstimateNotes: "",
    ServiceLocationNotes: "",

    EstimateStatusId: 4,
    tblEstimateItems: [],
  });

  const {
    sendEmail,
    showEmailAlert,
    setShowEmailAlert,
    emailAlertTxt,
    emailAlertColor,
  } = useSendEmail();

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = Number(queryParams.get("id"));

  const {
    PunchListData,
    setPunchListData,
    selectedImages,
    setSelectedImages,
    loggedInUser,
    sROBJ,
    setSROBJ,
  } = useContext(DataContext);
  const { syncQB } = useQuickBook();

  useEffect(() => {
    fetchName(PunchListData.CustomerId);
    if (PunchListData.ItemData) {
      setFormData((prevState) => ({
        ...prevState,
        ...PunchListData,
        tblEstimateItems: PunchListData.ItemData,
      }));
    }

    if (PunchListData.ContactIds?.length > 0) {
      setSelectedContacts(PunchListData.ContactIds);
    }

    if (PunchListData.PhotoPath) {
      setFormData((prevState) => ({
        ...prevState,
        ...PunchListData,
        tblEstimateFiles: [
          { FilePath: PunchListData.PhotoPath },
          { FilePath: PunchListData.AfterPhotoPath },
        ],
      }));
    }

    fetchStaffList();
    fetctContacts(PunchListData.CustomerId);
    console.log("PunchList Data link", PunchListData);

    // }
  }, [PunchListData]);

  const inputFile = useRef(null);
  const [Files, setFiles] = useState([]);
  const [sLList, setSLList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [tags, setTags] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const { invoiceList, fetchInvoices } = useFetchInvoices();
  const { billList, fetchBills } = useFetchBills();
  const { PoList, fetchPo } = useFetchPo();
  const { contactEmail, fetchEmail } = useFetchContactEmail();

  const [totalItemAmount, setTotalItemAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const { customerSearch, fetchCustomers } = useCustomerSearch();
  const { deleteEstmFile } = useDeleteFile();

  const { name, setName, fetchName } = useFetchCustomerName();

  const [estimateFiles, setEstimateFiles] = useState([]);

  const { setEstimateLinkData } = useEstimateContext();

  const [PrevFiles, setPrevFiles] = useState([]);
  const [btnDisable, setBtnDisable] = useState(false);

  const fetchEstimates = async () => {
    if (!idParam) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Estimate/GetEstimate?id=${idParam}`,
        { headers }
      );

      console.log("selected estimate is", response.data);
      if (response.data.EstimateItemData.PurchaseOrderId) {
        setBtnDisable(true);
      }
      setPrevFiles(response.data.EstimateFileData);
      setEstimateLinkData((prevState) => ({
        ...prevState,
        FileData: response.data.EstimateFileData,
      }));
      fetchName(response.data.EstimateItemData.CustomerId);
      setSelectedContacts(
        response.data.EstimateContactData.map((contact) => contact.ContactId)
      );
      // Combine EstimateItemData and EstimateCostItemData into tblEstimateItems
      const combinedItems = [
        ...response.data.EstimateItemData,
        ...response.data.EstimateCostItemData,
      ];

      setFormData((prevState) => ({
        ...prevState,
        ...response.data.EstimateData,
        tblEstimateItems: combinedItems,
        // tblEstimateFiles: combinedItems,
      }));

      setEstimateFiles(response.data.EstimateFileData);

      // setFiles((prevState) => ({
      //   ...prevState,
      //   ...response.data.EstimateFileData,

      // }))

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("API Call Error:", error);
    }
  };

  const fetchServiceLocations = async (id) => {
    if (!id) {
      return;
    }
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerServiceLocation?id=${id}`,
        { headers }
      )
      .then((res) => {
        setSLList(res.data);
        console.log("service locations are", res.data);
      })
      .catch((error) => {
        setSLList([]);
        console.log("service locations fetch error", error);
      });
  };

  const fetctContacts = async (id) => {
    if (!id) {
      return;
    }

    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Customer/GetCustomerContact?id=${id}`,
        { headers }
      )
      .then((res) => {
        console.log("contacts data isss", res.data);
        setContactList(res.data);
      })
      .catch((error) => {
        setContactList([]);
        console.log("contacts data fetch error", error);
      });
  };

  const fetchTags = async () => {
    axios
      .get(`https://earthcoapi.yehtohoga.com/api/Estimate/GetTagList`, {
        headers,
      })
      .then((res) => {
        console.log("tags are ", res.data);
        setTags(res.data);
      })
      .catch((error) => {
        setTags([]);
        console.log("contacts data fetch error", error);
      });
  };

  const fetchStaffList = async () => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/Staff/GetStaffList`,
        { headers }
      );
      setStaffData(response.data);

      console.log("staff list iss", response.data);
    } catch (error) {
      console.log("error getting staff list", error);
    }
  };

  const [staffData, setStaffData] = useState([]);

  const handleAutocompleteChange = (
    fieldName,
    valueProperty,
    event,
    newValue
  ) => {
    const simulatedEvent = {
      target: {
        name: fieldName,
        value: newValue ? newValue[valueProperty] : "",
      },
    };

    handleInputChange(simulatedEvent);
  };

  const [selectedContacts, setSelectedContacts] = useState([]);
  const handleContactChange = (event, newValue) => {
    setSelectedContacts(newValue.map((company) => company.ContactId));
  };

  const handleTagAutocompleteChange = (event, newValues) => {
    const tagString = newValues.map((tag) => tag.Tag).join(", ");

    setFormData((prevData) => ({
      ...prevData,
      Tags: tagString,
    }));
  };

  const handleInputChange = (e, newValue) => {
    setDisableButton(false);
    const { name, value } = e.target;

    // Convert to number if the field is CustomerId, Qty, Rate, or EstimateStatusId
    const adjustedValue = [
      "UserId",
      "ServiceLocationId",
      "ContactId",
      "Qty",
      "Rate",
      "EstimateStatusId",
      "RequestedBy",
    ].includes(name)
      ? Number(value)
      : value;

    setFormData((prevData) => ({ ...prevData, [name]: adjustedValue }));
  };

  const LinkToPO = () => {
    setEstimateLinkData((prevState) => ({
      ...prevState,
      ...formData,
    }));
  };

  const handleSubmit = (id = idParam, number = formData.EstimateNumber) => {
    setSubmitClicked(true);

    console.log("formdata in handlesubmit", formData);

    if (
      !formData.IssueDate ||
      !formData.CustomerId ||
      !formData.ServiceLocationId ||
      !formData.RequestedBy ||
      !formData.RegionalManagerId ||
      !formData.AssignTo ||
      !formData.EstimateStatusId ||
      selectedContacts.length <= 0
    ) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please fill all required fields");
      console.log("Required fields are empty");
      return;
    }

    if (formData.tblEstimateItems.length <= 0) {
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText("Please Add Atleast one Item");
      return;
    }
    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    console.log("mergedcontactData:", selectedContacts);
    const contactIdArray = selectedContacts.map((contact) => ({
      ContactId: contact,
    }));
    const mergedEstimateData = {
      ...formData,
      EstimateId: id,
      EstimateNumber: number,
      ContactId: selectedContacts[0],
      CompanyId: Number(loggedInUser.CompanyId),
      TotalAmount: totalItemAmount || 0,
      ProfitPercentage: profitPercentage || 0,
      Shipping: shippingCost || 0,
      tblEstimateContacts: contactIdArray,
    };

    console.log("mergedEstimateData:", mergedEstimateData);
    console.log("mergedcontactData:", selectedContacts);
    // console.log("data:", data);

    postData.append("EstimateData", JSON.stringify(mergedEstimateData));
    console.log(JSON.stringify(mergedEstimateData));
    // Appending files to postData
    Files.forEach((fileObj) => {
      postData.append("Files", fileObj);
    });
    estimateFiles.forEach((fileObj) => {
      postData.append("Files", fileObj);
    });
    setDisableButton(true);

    submitData(postData);
  };

  const submitData = async (postData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
    };
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/Estimate/AddEstimate",
        postData,
        {
          headers,
        }
      );

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);
      syncQB(response.data.SyncId);

      setDisableButton(false);
      setTimeout(() => {
        navigate(`/estimates`);
      }, 4000);

      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("API Call Error:", error);

      setDisableButton(false);
      setOpenSnackBar(true);
      setSnackBarColor("error");
      setSnackBarText(error.response.data);
    }

    // Logging FormData contents (for debugging purposes)
    for (let [key, value] of postData.entries()) {
      console.log("fpayload....", key, value);
    }
    // window.location.reload();

    // console.log("post data izzz",postData);
  };

  useEffect(() => {
    fetchEstimates();
    fetchStaffList();
    fetchTags();
    fetchInvoices();
    fetchBills();
    fetchPo();
    fetchCustomers();
  }, []);

  useEffect(() => {
    fetchServiceLocations(formData.CustomerId);
    fetctContacts(formData.CustomerId);
    fetchName(formData.CustomerId);
    console.log("selected customer name iss......", name);
    console.log("main payload isss", formData);
  }, [formData.CustomerId]);

  const handleStatusChange = (e) => {
    const value = parseInt(e.target.value, 10); // This converts the string to an integer

    setFormData((prevData) => ({
      ...prevData,
      EstimateStatusId: value,
    }));
  };

  // new items
  const [itemInput, setItemInput] = useState({
    Name: "",
    Qty: 1,
    Description: "",
    Rate: null,
  });
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Item/GetSearchItemList?Search=${searchText}`,
        { headers }
      )
      .then((response) => {
        setSearchResults(response.data);
        console.log("item list is", response.data);
      })
      .catch((error) => {
        console.error("Error fetching itemss data:", error);
      });
  }, [searchText]);

  const deleteItem = (itemId, isCost) => {
    const updatedArr = formData.tblEstimateItems.filter(
      (item) => item.ItemId !== itemId || item.isCost !== isCost
    );
    setFormData((prevData) => ({
      ...prevData,
      tblEstimateItems: updatedArr,
    }));
  };

  const handleItemChange = (event) => {
    setSearchText(event.target.value);

    setSelectedItem({}); // Clear selected item when input changes
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSearchText(item.ItemName); // Set the input text to the selected item's name
    setItemInput({
      ...itemInput,
      ItemId: item.ItemId,
      Name: item.ItemName,
      Description: item.SaleDescription,
      Rate: item.SalePrice,
      PurchasePrice: item.PurchasePrice,
      isCost: false,
    });

    setSearchResults([]); // Clear the search results

    console.log("selected item is", item);
  };

  const handleAddItem = () => {
    const newAmount = itemInput.Qty * itemInput.Rate;
    const newItem = {
      ...itemInput,
      Amount: newAmount,
    };

    setFormData((prevData) => ({
      ...prevData,
      tblEstimateItems: [...prevData.tblEstimateItems, newItem],
    }));

    setSearchText("");
    setSelectedItem({
      SalePrice: "",
      SaleDescription: "",
    });
    setItemInput({
      Name: "",
      Qty: 1,
      Description: "",
      Rate: null,
    });
    console.log("new items are", formData);
  };

  const handleQuantityChange = (itemId, event, add) => {
    if (add === 0) {
      const updatedItems = formData.tblEstimateItems.map((item) => {
        if (item.ItemId === itemId && item.isCost == false) {
          const updatedItem = { ...item };
          updatedItem.Qty = parseInt(event.target.value, 10);
          updatedItem.Amount = updatedItem.Qty * updatedItem.Rate;
          return updatedItem;
        }
        return item;
      });
      setFormData((prevData) => ({
        ...prevData,
        tblEstimateItems: updatedItems,
      }));
    }
    if (add === 1) {
      const updatedItems = formData.tblEstimateItems.map((item) => {
        if (item.ItemId === itemId && item.isCost == true) {
          const updatedItem = { ...item };
          updatedItem.Qty = parseInt(event.target.value, 10);
          updatedItem.Amount = updatedItem.Qty * updatedItem.Rate;
          return updatedItem;
        }
        return item;
      });
      setFormData((prevData) => ({
        ...prevData,
        tblEstimateItems: updatedItems,
      }));
    }
  };

  const handleRateChange = (itemId, event, add) => {
    if (add === 0) {
      const updatedItems = formData.tblEstimateItems.map((item) => {
        if (item.ItemId === itemId && item.isCost == false) {
          const updatedItem = { ...item };
          updatedItem.Rate = parseFloat(event.target.value);
          updatedItem.Amount = updatedItem.Qty * updatedItem.Rate;
          return updatedItem;
        }
        return item;
      });
      setFormData((prevData) => ({
        ...prevData,
        tblEstimateItems: updatedItems,
      }));
    }
    if (add === 1) {
      const updatedItems = formData.tblEstimateItems.map((item) => {
        if (item.ItemId === itemId && item.isCost == true) {
          const updatedItem = { ...item };
          updatedItem.Rate = parseFloat(event.target.value);
          updatedItem.Amount = updatedItem.Qty * updatedItem.Rate;
          return updatedItem;
        }
        return item;
      });
      setFormData((prevData) => ({
        ...prevData,
        tblEstimateItems: updatedItems,
      }));
    }
  };

  const handleCostChange = (itemId, event, add) => {
    if (add === 0) {
      const updatedItems = formData.tblEstimateItems.map((item) => {
        if (item.ItemId === itemId && item.isCost == false) {
          const updatedItem = { ...item };
          updatedItem.PurchasePrice = parseFloat(event.target.value);
          // updatedItem.Amount = updatedItem.Qty * updatedItem.Rate;
          return updatedItem;
        }
        return item;
      });
      setFormData((prevData) => ({
        ...prevData,
        tblEstimateItems: updatedItems,
      }));
    }
    if (add === 1) {
      const updatedItems = formData.tblEstimateItems.map((item) => {
        if (item.ItemId === itemId && item.isCost == true) {
          const updatedItem = { ...item };
          updatedItem.PurchasePrice = parseFloat(event.target.value);
          // updatedItem.Amount = updatedItem.Qty * updatedItem.Rate;
          return updatedItem;
        }
        return item;
      });
      setFormData((prevData) => ({
        ...prevData,
        tblEstimateItems: updatedItems,
      }));
    }
  };

  // AC

  const [aCInput, setACInput] = useState({
    Name: "",
    Qty: 1,
    Description: "",
    Rate: null,
  });
  const [searchACText, setSearchACText] = useState("");
  const [searchACResults, setSearchACResults] = useState([]);
  const [selectedACItem, setSelectedACItem] = useState({});
  const [showACItem, setShowACItem] = useState(true);

  useEffect(() => {
    if (searchACText) {
      // Make an API request when the search text changes

      axios
        .get(
          `https://earthcoapi.yehtohoga.com/api/Item/GetSearchItemList?Search=${searchACText}`,
          { headers }
        )
        .then((response) => {
          setSearchACResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching itemss data:", error);
        });
    } else {
      setSearchACResults([]); // Clear the search results when input is empty
    }
  }, [searchACText]);

  const handleACItemChange = (event) => {
    setShowACItem(true);
    setSearchACText(event.target.value);

    setSelectedACItem({}); // Clear selected item when input changes
  };
  const handleACAddItem = () => {
    // setTblSRItems([...tblSRItems, itemInput]);
    setFormData((prevData) => ({
      ...prevData,
      tblEstimateItems: [...prevData.tblEstimateItems, aCInput],
    }));
    setSearchACText("");
    setSelectedACItem({
      SalePrice: "",
      SaleDescription: "",
    });
    setACInput({
      Name: "",
      Qty: 1,
      Description: "",
      Rate: 0,
    }); // Reset the modal input field
    console.log("new items aree", formData);
  };
  const handleACItemClick = (item) => {
    setSelectedACItem(item);
    setSearchACText(item.ItemName); // Set the input text to the selected item's name
    setACInput({
      ...aCInput,
      ItemId: item.ItemId,
      Name: item.ItemName,
      Description: item.SaleDescription,
      Rate: item.PurchasePrice,
      isCost: true,
    });

    setShowACItem(false);
    setSearchACResults([]); // Clear the search results
    console.log("selected item is", item);
  };

  // calculations

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
    const filteredACItems = formData.tblEstimateItems?.filter(
      (item) => item.isCost === true
    );
    const filteredItems = formData.tblEstimateItems?.filter(
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

    let calculatedTotalProfit = 0;
    if (subtotal > 0) {
      calculatedTotalProfit =
        newTotalAmount - (totalDiscount / subtotal) * 100 - totalExpense;
    }
    let calculatedProfitPercentage = 0;
    // if (totalExpense > 0) {
    //   calculatedProfitPercentage = (calculatedTotalProfit / totalExpense) * 100;
    // } early calculation
    if (totalamount > 0) {
      calculatedProfitPercentage = (calculatedTotalProfit / totalamount) * 100;
    }
    setTotalExpense(newCostTotalAmount + newACTotalAmount);

    setSubtotal(newTotalAmount);
    setTotalACAmount(newACTotalAmount);
    if (totalamount) {
      setTotalItemAmount(totalamount);
    }

    setTotalProfit(calculatedTotalProfit);

    setBalanceDue(totalItemAmount - paymentCredit);

    setProfitPercentage(calculatedProfitPercentage);

    // console.log("amounts are", calculatedProfitPercentage, shippingCost, calculatedTotalProfit, totalACAmount, totalItemAmount, subtotal);
  }, [
    formData.tblEstimateItems,
    shippingCost,
    totalDiscount,
    totalItemAmount,
    subtotal,
    totalExpense,
  ]);

  // filesss........

  const handleDeleteFile = (index) => {
    // Create a copy of the Files array without the file to be deleted
    const updatedFiles = [...Files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const handleDeletePLFile = (indexToDelete) => {
    // Create a copy of the formData.tblEstimateFiles array
    const updatedFiles = [...formData.tblEstimateFiles];

    // Remove the file at the specified index
    updatedFiles.splice(indexToDelete, 1);

    // Update the formData with the new array without the deleted file
    setFormData({ ...formData, tblEstimateFiles: updatedFiles });
  };

  const handleEstmDeleteFile = (index) => {
    // Create a copy of the estimateFiles array without the file to be deleted
    const updatedEstimateFiles = [...estimateFiles];
    updatedEstimateFiles.splice(index, 1);

    // Update the estimateFiles state with the updated array
    setEstimateFiles(updatedEstimateFiles);
  };

  const addFile = () => {
    inputFile.current.click();
    // console.log("Filesss are", Files);
  };

  const trackFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // const newFile = {
      // actualFile: uploadedFile,
      // name: uploadedFile.name,
      // caption: uploadedFile.name,
      // date: new Date().toLocaleDateString(),
      // };
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
  };

  // State to store selected images

  const handleImageSelect = (image) => {
    // Check if the image is already selected
    const isSelected = selectedImages.some(
      (selectedImage) => selectedImage.EstimateFileId === image.EstimateFileId
    );

    if (isSelected) {
      // If already selected, remove it from the selectedImages state
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter(
          (selectedImage) =>
            selectedImage.EstimateFileId !== image.EstimateFileId
        )
      );
    } else {
      // If not selected, add it to the selectedImages state
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, image]);
    }

    console.log("selected images arew", selectedImages);
  };

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <EventPopups
        open={showEmailAlert}
        setOpen={setShowEmailAlert}
        color={emailAlertColor}
        text={emailAlertTxt}
      />
      <div className="card">
        <div className="itemtitleBar ">
          <h4>Estimate Details</h4>
        </div>

        <>
          {loading ? (
            <div className="center-loader">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="card-body">
                <div className="row ">
                  <div className="col-md-3">
                    <label className="form-label">
                      Customers <span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={customerSearch}
                      getOptionLabel={(option) => option.CompanyName || ""}
                      value={name ? { CompanyName: name } : null}
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "CustomerId",
                          "UserId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.UserId === value.CustomerId
                      }
                      renderOption={(props, option) => (
                        <li {...props}>
                          <div className="customer-dd-border">
                            <h6> {option.CompanyName}</h6>
                            <small># {option.UserId}</small>
                          </div>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          onClick={() => {
                            setName("");
                            fetchCustomers();
                          }}
                          onChange={(e) => {
                            fetchCustomers(e.target.value);
                          }}
                          placeholder="Choose..."
                          error={submitClicked && !formData.CustomerId}
                          className="bg-white"
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-3  ">
                    <label className="form-label">Estimate No.</label>
                    <TextField
                      value={formData.EstimateNumber}
                      name="EstimateNumber"
                      onChange={handleInputChange}
                      type="text"
                      variant="outlined"
                      placeholder="Estimate No"
                      size="small"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-3 ">
                    <label className="form-label">Tags</label>
                    <Autocomplete
                      id="inputState19"
                      size="small"
                      multiple
                      options={tags}
                      getOptionLabel={(option) => option.Tag || ""}
                      value={tags?.filter((tag) =>
                        (formData.Tags
                          ? formData.Tags.split(", ")
                          : []
                        ).includes(tag.Tag)
                      )}
                      onChange={handleTagAutocompleteChange}
                      isOptionEqualToValue={(option, value) =>
                        option.Tag === value.Tag
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Tags"
                          className="bg-white"
                        />
                      )}
                      aria-label="Default select example"
                    />
                  </div>
                  <div className="col-md-3 "></div>
                  <div className=" col-md-3 mt-2">
                    <label className="form-label">
                      Date<span className="text-danger">*</span>
                    </label>
                    <TextField
                      value={formatDate(formData.IssueDate)}
                      name="IssueDate"
                      onChange={handleInputChange}
                      className="input-limit-datepicker"
                      type="date"
                      variant="outlined"
                      size="small"
                      error={submitClicked && !formData.IssueDate}
                      // helperText={
                      //   submitClicked && !formData.CustomerId
                      //     ? "Issue Date is required"
                      //     : ""
                      // }
                      required
                      fullWidth
                    />
                  </div>
                  <div className="col-md-3 mt-2 ">
                    <label className="form-label">
                      Regional Manager<span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={staffData.filter(
                        (staff) => staff.Role === "Regional Manager"
                      )}
                      getOptionLabel={(option) => option.FirstName || ""}
                      value={
                        staffData.find(
                          (staff) => staff.UserId === formData.RegionalManagerId
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "RegionalManagerId",
                          "UserId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.UserId === value.RegionalManagerId
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          error={submitClicked && !formData.RegionalManagerId}
                          placeholder="Choose..."
                          className="bg-white"
                        />
                      )}
                    />
                  </div>{" "}
                  <div className="col-md-3 mt-2">
                    <label className="form-label">
                      Assigned To<span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={staffData.filter(
                        (staff) => staff.Role === "Admin"
                      )}
                      getOptionLabel={(option) => option.FirstName || ""}
                      value={
                        staffData.find(
                          (staff) => staff.UserId === formData.AssignTo
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "AssignTo",
                          "UserId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.UserId === value.AssignTo
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          error={submitClicked && !formData.AssignTo}
                          placeholder="Choose..."
                          className="bg-white"
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-3 mt-2"></div>
                  <div className="col-md-3  mt-2">
                    <div className="row">
                      <div className="col-md-auto">
                        <label className="form-label">
                          Service Locations
                          <span className="text-danger">*</span>{" "}
                        </label>
                      </div>
                      <div className="col-md-3">
                        {" "}
                        {formData.CustomerId ? (
                          <ServiceLocations
                            fetchServiceLocations={fetchServiceLocations}
                            fetchCustomers={fetchCustomers}
                            customerId={formData.CustomerId}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <Autocomplete
                      id="inputState19"
                      size="small"
                      options={sLList}
                      getOptionLabel={(option) => option.Name || ""}
                      value={
                        sLList.find(
                          (customer) =>
                            customer.ServiceLocationId ===
                            formData.ServiceLocationId
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "ServiceLocationId",
                          "ServiceLocationId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.ServiceLocationId === value.ServiceLocationId
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Service Locations"
                          error={submitClicked && !formData.ServiceLocationId}
                          className="bg-white"
                        />
                      )}
                      aria-label="Default select example"
                    />
                  </div>
                  <div className="col-md-3 mt-2">
                    <label className="form-label">
                      Requested by <span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      id="staff-autocomplete"
                      size="small"
                      options={staffData.filter(
                        (staff) => staff.Role === "Regional Manager"
                      )}
                      getOptionLabel={(option) => option.FirstName || ""}
                      value={
                        staffData.find(
                          (staff) => staff.UserId === formData.RequestedBy
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "RequestedBy",
                          "UserId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.UserId === value.RequestedBy
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          error={submitClicked && !formData.RequestedBy}
                          placeholder="Choose..."
                          className="bg-white"
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-3  mt-2">
                    <label className="form-label">
                      Linked Invoice
                      {formData.InvoiceId ? (
                        <>
                          <a
                            href=""
                            style={{ color: "blue" }}
                            className="ms-2"
                            onClick={() => {
                              navigate(
                                `/invoices/add-invoices?id=${formData.InvoiceId}`
                              );
                            }}
                          >
                            View
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </label>
                    <Autocomplete
                      size="small"
                      options={invoiceList}
                      getOptionLabel={(option) => option.InvoiceNumber || ""}
                      value={
                        invoiceList.find(
                          (invoice) => invoice.InvoiceId === formData.InvoiceId
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "InvoiceId",
                          "InvoiceId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.InvoiceId === value.InvoiceId
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Invoice No"
                          className="bg-white"
                        />
                      )}
                      aria-label="Contact select"
                    />
                  </div>
                  <div className="col-md-3 mt-2"></div>
                  <div className="col-md-3  mt-2">
                    <div className="row">
                      <div className="col-md-auto">
                        <label className="form-label">
                          Contact<span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-md-3">
                        {" "}
                        {formData.CustomerId ? (
                          <Contacts
                            fetctContacts={fetctContacts}
                            fetchCustomers={fetchCustomers}
                            customerId={formData.CustomerId}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <Autocomplete
                      multiple
                      size="small"
                      options={contactList}
                      getOptionLabel={(option) => option.FirstName || ""}
                      onChange={handleContactChange}
                      value={contactList.filter((company) =>
                        selectedContacts.includes(company.ContactId)
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Select Contacts"
                          className="bg-white"
                          error={submitClicked && selectedContacts.length <= 0}
                        />
                      )}
                      aria-label="Contact select"
                    />

                    {/* <Autocomplete
                      id="inputState299"
                      size="small"
                      options={contactList}
                      getOptionLabel={(option) => option.FirstName || ""}
                      value={
                        contactList.find(
                          (contact) => contact.ContactId === formData.ContactId
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "ContactId",
                          "ContactId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.ContactId === value.ContactId
                      }
                      renderOption={(props, option) => (
                        <li {...props}>
                          <div className="customer-dd-border">
                            <h6> {option.FirstName}</h6>
                            <small>{option.Email}</small>
                          </div>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Contacts"
                          error={submitClicked && !formData.ContactId}
                          className="bg-white"
                        />
                      )}
                      aria-label="Contact select"
                    /> */}
                  </div>
                  <div className="col-md-3  mt-2">
                    <label className="form-label">
                      Status<span className="text-danger">*</span>
                    </label>
                    <Select
                      aria-label="Default select example"
                      variant="outlined"
                      value={formData.EstimateStatusId || 4}
                      onChange={handleStatusChange}
                      name="Status"
                      size="small"
                      error={submitClicked && !formData.EstimateStatusId}
                      placeholder="Select Status"
                      fullWidth
                    >
                      <MenuItem value={1}>Accepted</MenuItem>
                      <MenuItem value={2}>Closed - Billed</MenuItem>
                      <MenuItem value={3}>Converted</MenuItem>
                      <MenuItem value={4}>Pending</MenuItem>
                      <MenuItem value={5}>Rejected</MenuItem>
                    </Select>
                  </div>
                  <div className="col-md-3 mt-2 ">
                    <label className="form-label">
                      Linked Bill
                      {formData.BillId ? (
                        <>
                          <a
                            href=""
                            style={{ color: "blue" }}
                            className="ms-2"
                            onClick={() => {
                              navigate(`/Bills/addbill?id=${formData.BillId}`);
                            }}
                          >
                            View
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </label>
                    <Autocomplete
                      size="small"
                      options={billList}
                      getOptionLabel={(option) => option.BillNumber || ""}
                      value={
                        billList.find(
                          (bill) => bill.BillId === formData.BillId
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "BillId",
                          "BillId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.BillId === value.BillId
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Bill No"
                          className="bg-white"
                        />
                      )}
                      aria-label="Contact select"
                    />
                  </div>
                  <div className="col-md-3 mt-2"></div>
                  <div className="col-md-3  mt-2 ">
                    <label className="form-label">
                      Linked To Purchase Order
                      {formData.PurchaseOrderId ? (
                        <>
                          <a
                            href=""
                            style={{ color: "blue" }}
                            className="ms-2"
                            onClick={() => {
                              navigate(
                                `/purchase-order/add-po?id=${formData.PurchaseOrderId}`
                              );
                            }}
                          >
                            View
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </label>
                    <Autocomplete
                      size="small"
                      options={PoList}
                      getOptionLabel={(option) =>
                        option.PurchaseOrderNumber || ""
                      }
                      value={
                        PoList.find(
                          (po) =>
                            po.PurchaseOrderId === formData.PurchaseOrderId
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(
                          "PurchaseOrderId",
                          "PurchaseOrderId",
                          event,
                          newValue
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.PurchaseOrderId === value.PurchaseOrderId
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Purchase order No"
                          className="bg-white"
                        />
                      )}
                      aria-label="Contact select"
                    />
                  </div>
                </div>
              </div>

              {/* item table */}
              <div className="itemtitleBar">
                <h4>Items</h4>
              </div>
              <div className="card-body pt-0">
                <div className="estDataBox">
                  <div className="table-responsive active-projects style-1 mt-2">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th className="itemName-width">Item</th>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Cost Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.tblEstimateItems &&
                        formData.tblEstimateItems.length > 0 ? (
                          formData.tblEstimateItems
                            .filter((item) => item.isCost === false) // Filter items with isCost equal to 1
                            .map((item, index) => (
                              <tr colSpan={2} key={item.ItemId}>
                                <td className="itemName-width">{item.Name}</td>
                                <td>{item.Description}</td>
                                <td>
                                  <input
                                    type="number"
                                    style={{ width: "7em" }}
                                    className="form-control form-control-sm"
                                    value={item.Qty}
                                    onChange={(e) =>
                                      handleQuantityChange(item.ItemId, e, 0)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    style={{ width: "7em" }}
                                    className="form-control form-control-sm"
                                    value={item.Rate}
                                    onChange={(e) =>
                                      handleRateChange(item.ItemId, e, 0)
                                    }
                                  />
                                </td>
                                <td>
                                  {item ? (item.Qty * item.Rate).toFixed(2) : 0}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    style={{ width: "7em" }}
                                    className="form-control form-control-sm"
                                    value={item.PurchasePrice}
                                    onChange={(e) =>
                                      handleCostChange(item.ItemId, e, 0)
                                    }
                                  />
                                </td>
                                <td>
                                  <div className="badgeBox">
                                    <Button
                                      onClick={() => {
                                        deleteItem(item.ItemId, item.isCost);
                                      }}
                                    >
                                      <Delete color="error" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <></>
                        )}
                        <tr>
                          <td className="itemName-width">
                            <>
                              <Autocomplete
                                id="search-items"
                                options={searchResults}
                                getOptionLabel={(item) => item.ItemName}
                                value={selectedItem.ItemName} // This should be the selected item, not searchText
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    handleItemClick(newValue);
                                  } else {
                                    setSelectedItem({});
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Search for items..."
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleItemChange}
                                  />
                                )}
                                renderOption={(props, item) => (
                                  <li
                                    style={{
                                      cursor: "pointer",
                                      width: "30em",
                                    }}
                                    {...props}
                                    onClick={() => handleItemClick(item)}
                                  >
                                    <div className="customer-dd-border">
                                      <p>
                                        <strong>{item.ItemName}</strong>{" "}
                                      </p>
                                      <p>{item.Type}</p>
                                      <small>{item.SaleDescription}</small>
                                    </div>
                                  </li>
                                )}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    // Handle item addition when Enter key is pressed
                                    e.preventDefault(); // Prevent form submission
                                    handleAddItem();
                                  }
                                }}
                              />
                            </>
                          </td>
                          <td>
                            <p>{selectedItem?.SaleDescription || " "}</p>
                          </td>
                          <td>
                            <input
                              type="number"
                              name="Qty"
                              value={itemInput.Qty}
                              onChange={(e) =>
                                setItemInput({
                                  ...itemInput,
                                  Qty: Number(e.target.value),
                                })
                              }
                              style={{ width: "7em" }}
                              className="form-control form-control-sm"
                              placeholder="Quantity"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  // Handle item addition when Enter key is pressed
                                  e.preventDefault(); // Prevent form submission
                                  handleAddItem();
                                }
                              }}
                            />
                          </td>
                          <td>
                            <div className="col-sm-9">
                              <input
                                type="number"
                                name="Rate"
                                style={{ width: "7em" }}
                                className="form-control form-control-sm"
                                value={itemInput.Rate || ""}
                                onChange={(e) =>
                                  setItemInput({
                                    ...itemInput,
                                    Rate: Number(e.target.value),
                                  })
                                }
                                onClick={(e) => {
                                  setSelectedItem({
                                    ...selectedItem,
                                    SalePrice: 0,
                                  });
                                }}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    // Handle item addition when Enter key is pressed
                                    e.preventDefault(); // Prevent form submission
                                    handleAddItem();
                                  }
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <h5 style={{ margin: "0" }}>
                              {itemInput
                                ? (itemInput.Rate * itemInput.Qty).toFixed(2)
                                : 0}
                            </h5>
                          </td>
                          <td>
                            <div className="col-sm-9">
                              <input
                                type="number"
                                name="CostPrice"
                                style={{ width: "7em" }}
                                className="form-control form-control-sm"
                                value={itemInput.PurchasePrice || ""}
                                onChange={(e) =>
                                  setItemInput({
                                    ...itemInput,
                                    PurchasePrice: Number(e.target.value),
                                  })
                                }
                                onClick={(e) => {
                                  setSelectedItem({
                                    ...selectedItem,
                                    PurchasePrice: 0,
                                  });
                                }}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    // Handle item addition when Enter key is pressed
                                    e.preventDefault(); // Prevent form submission
                                    handleAddItem();
                                  }
                                }}
                              />
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* <div className="itemtitleBar">
                <h4>Additional Costs</h4>
              </div>
              <div className="card-body  pt-0">
                <div className="estDataBox">
                  <div className="table-responsive active-projects style-1 mt-2">
                    <table id="empoloyees-tblwrapper mx-2" className="table">
                      <thead>
                        <tr>
                          <th className="itemName-width">Item</th>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.tblEstimateItems &&
                        formData.tblEstimateItems.length > 0 ? (
                          formData.tblEstimateItems
                            .filter((item) => item.isCost === true) // Filter items with isCost equal to 1
                            .map((item, index) => (
                              <tr className="itemName-width" key={item.ItemId}>
                                <td>{item.Name}</td>
                                <td>{item.Description}</td>
                                <td>
                                  <input
                                    type="number"
                                    style={{ width: "7em" }}
                                    className="form-control form-control-sm"
                                    value={item.Qty}
                                    onChange={(e) =>
                                      handleQuantityChange(item.ItemId, e, 1)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    style={{ width: "7em" }}
                                    className="form-control form-control-sm"
                                    value={item.Rate}
                                    onChange={(e) =>
                                      handleRateChange(item.ItemId, e, 1)
                                    }
                                  />
                                </td>
                                <td>
                                  {item ? (item.Qty * item.Rate).toFixed(2) : 0}
                                </td>
                                <td>
                                  <div className="badgeBox">
                                    <Button
                                      onClick={() => {
                                        deleteItem(item.ItemId, item.isCost);
                                      }}
                                    >
                                      <Delete color="error" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <></>
                        )}
                        <tr>
                          <td className="itemName-width">
                            <>
                              <Autocomplete
                                id="search-ac-items"
                                options={searchACResults}
                                getOptionLabel={(item) => item.ItemName}
                                value={selectedACItem.ItemName}
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    handleACItemClick(newValue);
                                  } else {
                                    setSelectedACItem({});
                                  }
                                }}
                                inputValue={searchACText}
                                onInputChange={(event, newInputValue) => {
                                  setShowACItem(true);
                                  setSearchACText(newInputValue);
                                  setSelectedACItem({}); // Clear selected item when input changes
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Search for items..."
                                    variant="outlined"
                                    size="small"
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        // Handle item addition when Enter key is pressed
                                        e.preventDefault(); // Prevent form submission
                                        handleACAddItem();
                                      }
                                    }}
                                    fullWidth
                                  />
                                )}
                                renderOption={(props, item) => (
                                  <li
                                    style={{ cursor: "pointer" }}
                                    {...props}
                                    onClick={() => handleACItemClick(item)}
                                  >
                                    <div className="customer-dd-border">
                                      <p>
                                        <strong>{item.ItemName}</strong>{" "}
                                      </p>
                                      <p>{item.Type}</p>
                                      <small>{item.SaleDescription}</small>
                                    </div>
                                  </li>
                                )}
                              />
                            </>
                          </td>
                          <td>
                            <p>{selectedACItem?.SaleDescription || " "}</p>
                          </td>
                          <td>
                            <input
                              type="number"
                              name="Qty"
                              value={aCInput.Qty}
                              onChange={(e) =>
                                setACInput({
                                  ...aCInput,
                                  Qty: Number(e.target.value),
                                })
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  // Handle item addition when Enter key is pressed
                                  e.preventDefault(); // Prevent form submission
                                  handleACAddItem();
                                }
                              }}
                              style={{ width: "7em" }}
                              className="form-control form-control-sm"
                              placeholder="Quantity"
                            />
                          </td>
                          <td>
                            <div className="col-sm-9">
                              <input
                                type="number"
                                name="Rate"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    // Handle item addition when Enter key is pressed
                                    e.preventDefault(); // Prevent form submission
                                    handleACAddItem();
                                  }
                                }}
                                onChange={(e) =>
                                  setACInput({
                                    ...aCInput,
                                    Rate: Number(e.target.value),
                                  })
                                }
                                onClick={(e) => {
                                  setSelectedACItem({
                                    ...selectedACItem,
                                    PurchasePrice: 0,
                                  });
                                }}
                                style={{ width: "7em" }}
                                className="form-control form-control-sm"
                                value={
                                  selectedACItem?.PurchasePrice ||
                                  aCInput.Rate ||
                                  ""
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <h5 style={{ margin: "0" }}>
                              {aCInput
                                ? (aCInput.Rate * aCInput.Qty).toFixed(2)
                                : 0}
                            </h5>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div> */}

              {/* Files */}

              <div className="card-body">
                <div className="row">
                  <div className="col-md-5">
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <div className="basic-form">
                          <form>
                            <label className="form-label">Estimate Notes</label>
                            <div className="mb-3">
                              <textarea
                                placeholder="Estimate Notes"
                                value={formData.EstimateNotes}
                                name="EstimateNotes"
                                onChange={handleInputChange}
                                className=" form-control"
                                rows="3"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="basic-form">
                          <form>
                            {/* <h4 className="card-title">Service Location Notes</h4> */}
                            <label className="form-label">
                              Service Location Notes
                            </label>
                            <div className="mb-3">
                              <textarea
                                placeholder="Service Location Notes"
                                value={formData.ServiceLocationNotes}
                                name="ServiceLocationNotes"
                                onChange={handleInputChange}
                                className=" form-control "
                                rows="3"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="basic-form">
                          <label className="form-label">Attachments</label>

                          <div className="dz-default dlab-message upload-img mb-3">
                            <form action="#" className="dropzone">
                              <svg
                                width="41"
                                height="40"
                                viewBox="0 0 41 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                                  stroke="#DADADA"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M20.5 20V35"
                                  stroke="#DADADA"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                                  stroke="#DADADA"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                                  stroke="#DADADA"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <div className="fallback mb-3">
                                <input
                                  name="file"
                                  type="file"
                                  onChange={trackFile}
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      {/*<div className="col-md-12 col-lg-12">
                        <div className="basic-form">
                          <form>
                             <h4 className="card-title">Private Notes</h4>
                            <label className="form-label">Private Notes</label>
                            <div className="mb-3">
                              <textarea
                                placeholder= "PrivateNotes"
                                value={formData.PrivateNotes}
                                name="PrivateNotes"
                                onChange={handleInputChange}
                                className="form-txtarea form-control form-control-sm"
                                rows="2"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-md-4  ms-auto sub-total">
                    <table className="table table-clear table-borderless custom-table custom-table-row">
                      <tbody>
                        <tr>
                          <td className="left">
                            <strong>Subtotal</strong>
                          </td>
                          <td className="right text-right">
                            ${subtotal?.toFixed(2)}
                          </td>
                        </tr>
                        {/* <tr>
                          <td className="left custom-table-row">
                            <label className="form-label">Taxes</label>
                            <div
                              style={{ width: "10em" }}
                              className="input-group"
                            >
                              <input
                                style={{ width: "10em" }}
                                type="text"
                                className="form-control form-control-sm "
                                name="Taxes"
                                placeholder="Taxes"
                              />
                            </div>
                          </td>
                          <td className="right text-right">$0.00</td>
                        </tr> */}
                        <tr>
                          <td className="left custom-table-row">
                            <label className="form-label">Discount(%)</label>
                            <div
                              style={{ width: "10em" }}
                              className="input-group"
                            >
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="Discount"
                                value={totalDiscount}
                                onChange={discountChange}
                                placeholder="Discount"
                              />
                            </div>
                          </td>
                          <td className="right text-right">
                            $
                            {totalDiscount && subtotal
                              ? ((totalDiscount / subtotal) * 100).toFixed(2)
                              : 0}
                          </td>
                        </tr>
                        {/*  <tr>
                          <td className="left custom-table-row">
                            <label className="form-label">Shipping</label>
                            <div
                              style={{ width: "10em" }}
                              className="input-group"
                            >
                              <input
                                type="number"
                                value={shippingCost}
                                className="form-control form-control-sm"
                                onChange={shippingcostChange}
                                name="Shipping"
                                placeholder="Shipping"
                              />
                            </div>
                          </td>
                          <td className="right text-right">
                            ${shippingCost || 0.0}
                          </td>
                        </tr> */}

                        <tr>
                          <td className="left">
                            <strong>Total</strong>
                          </td>
                          <td className="right text-right">
                            <strong>${totalItemAmount?.toFixed(2)}</strong>
                          </td>
                        </tr>
                        {/* <tr>
                          <td className="left">Payment/Credit</td>
                          <td className="right text-right">${paymentCredit}</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <h3>Balance due</h3>
                          </td>
                          <td className="right text-right">
                            <h3>${balanceDue.toFixed(2)}</h3>
                          </td>
                        </tr> */}
                        <tr>
                          <td className="left">Total Expenses</td>
                          <td className="right text-right">
                            ${totalExpense.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="left">Total Profit</td>
                          <td className="right text-right">
                            ${totalProfit?.toFixed(2) || 0}
                          </td>
                        </tr>
                        <tr>
                          <td className="left">Profit Margin(%)</td>
                          <td className="right text-right">
                            {profitPercentage ? profitPercentage.toFixed(2) : 0}
                            %
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <div className="card-body row">
                      {formData.tblEstimateFiles?.map((file, index) => (
                        <div
                          key={index}
                          className="col-md-2 col-md-2 mt-3 image-container"
                          style={{
                            width: "150px", // Set the desired width
                            height: "120px", // Set the desired height
                            margin: "1em",
                            position: "relative",
                          }}
                        >
                          <a
                            href={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                              style={{
                                width: "150px",
                                height: "120px",
                                objectFit: "cover",
                              }}
                            />
                          </a>
                          <p
                            className="file-name-overlay"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              left: "13px",
                              right: "0",
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              textAlign: "center",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              width: "100%",
                              textOverflow: "ellipsis",
                              padding: "5px",
                            }}
                          ></p>
                          <span
                            className="file-delete-button"
                            style={{
                              left: "140px",
                            }}
                            onClick={() => handleDeletePLFile(index)}
                          >
                            <span>
                              <Delete color="error" />
                            </span>
                          </span>
                        </div>
                      ))}
                      {PrevFiles.map((file, index) => (
                        <div
                          key={index}
                          className="col-md-2 col-md-2 mt-3 image-container"
                          style={{
                            width: "150px",
                            height: "120px",
                            margin: "1em",
                            position: "relative",
                          }}
                        >
                          <a
                            href={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`https://earthcoapi.yehtohoga.com/${file.FilePath}`}
                              alt={file.FileName}
                              style={{
                                width: "150px",
                                height: "120px",
                                objectFit: "cover",
                              }}
                            />
                          </a>
                          <p
                            className="file-name-overlay"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              left: "13px",
                              right: "0",
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              textAlign: "center",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              width: "100%",
                              textOverflow: "ellipsis",
                              padding: "5px",
                            }}
                          >
                            {file.FileName}
                          </p>
                          {selectedImages.some(
                            (selectedImage) =>
                              selectedImage.EstimateFileId ===
                              file.EstimateFileId
                          ) ? (
                            <span
                              className=""
                              style={{
                                position: "absolute",
                                top: "3px",
                                left: "14px",
                              }}
                            >
                              <Tooltip
                                title="Click to select image"
                                placement="top"
                                arrow
                              >
                                <Checkbox
                                  checked={true}
                                  onChange={() => handleImageSelect(file)}
                                />
                              </Tooltip>
                            </span>
                          ) : (
                            <span
                              className=""
                              style={{
                                position: "absolute",
                                top: "3px",
                                left: "14px",
                              }}
                            >
                              <Tooltip
                                title="Click to select image"
                                placement="top"
                                arrow
                              >
                                <Checkbox
                                  checked={false}
                                  onChange={() => handleImageSelect(file)}
                                />
                              </Tooltip>
                            </span>
                          )}
                          <span
                            className="file-delete-button"
                            style={{
                              left: "140px",
                            }}
                          >
                            <span
                              onClick={() => {
                                deleteEstmFile(
                                  file.EstimateFileId,
                                  fetchEstimates
                                );
                              }}
                            >
                              <Delete color="error" />
                            </span>
                          </span>
                        </div>
                      ))}

                      {Files.map((file, index) => (
                        <div
                          key={index}
                          className="col-md-2 col-md-2 mt-3 image-container"
                          style={{
                            width: "150px", // Set the desired width
                            height: "120px", // Set the desired height
                            margin: "1em",
                            position: "relative",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            style={{
                              width: "150px",
                              height: "120px",
                              objectFit: "cover",
                            }}
                          />
                          <p
                            className="file-name-overlay"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              left: "13px",
                              right: "0",
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              textAlign: "center",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              width: "100%",
                              textOverflow: "ellipsis",
                              padding: "5px",
                            }}
                          >
                            {file.name}
                          </p>
                          <span
                            className="file-delete-button"
                            style={{
                              left: "140px",
                            }}
                            onClick={() => {
                              handleDeleteFile(index);
                            }}
                          >
                            <span>
                              <Delete color="error" />
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mb-2 row text-right">
                  <div className="col-md-5 col-sm-4"></div>

                  <div className="col-md-7 col-sm-7 p-0 ">
                    {idParam ? (
                      <>
                        {loggedInUser.userRole == "1" ? (
                          <>
                            <FormControl>
                              <Select
                                labelId="estimateLink"
                                aria-label="Default select example"
                                variant="outlined"
                                className="text-left "
                                value={1}
                                // color="success"

                                name="Status"
                                size="small"
                                placeholder="Select Status"
                                fullWidth
                              >
                                <MenuItem value={1}>Create </MenuItem>
                                <MenuItem
                                  value={2}
                                  onClick={() => {
                                    LinkToPO();
                                    navigate("/purchase-order/add-po");
                                  }}
                                >
                                  Purchase Order
                                </MenuItem>
                                {formData.BillId ? (
                                  <MenuItem
                                    onClick={() => {
                                      LinkToPO();
                                      navigate("/invoices/add-invoices");
                                    }}
                                    value={3}
                                  >
                                    Invoice
                                  </MenuItem>
                                ) : (
                                  ""
                                )}
                              </Select>
                            </FormControl>
                          </>
                        ) : (
                          <></>
                        )}

                        <button
                          type="button"
                          className="mt-1 btn btn-sm btn-outline-primary estm-action-btn"
                          onClick={() => {
                            navigate(
                              `/send-mail?title=${"Estimate"}&mail=${contactEmail}&customer=${name}&number=${
                                formData.EstimateNumber
                              }`
                            );
                          }}
                        >
                          <Email />
                        </button>

                        <button
                          type="button"
                          className="mt-1 btn btn-sm btn-outline-primary estm-action-btn"
                          onClick={() => {
                            navigate(
                              `/estimates/estimate-preview?id=${idParam}`
                            );
                          }}
                        >
                          <Print></Print>
                        </button>
                      </>
                    ) : (
                      <></>
                    )}{" "}
                    <button
                      className="btn btn-danger light ms-1 me-2"
                      onClick={() => {
                        navigate(`/estimates`);
                        setPunchListData({
                          ContactIds: [],
                        });
                      }}
                    >
                      Cancel
                    </button>
                    {idParam ? (
                      <LoaderButton
                        loading={disableButton}
                        disable={btnDisable}
                        handleSubmit={() => {
                          handleSubmit(0, "");
                        }}
                        color={"customColor"}
                      >
                        Save as copy
                      </LoaderButton>
                    ) : (
                      <></>
                    )}
                    <LoaderButton
                      disable={btnDisable}
                      loading={disableButton}
                      handleSubmit={() => {
                        handleSubmit();
                      }}
                    >
                      Save
                    </LoaderButton>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default AddEstimateForm;

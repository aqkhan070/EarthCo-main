import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Autocomplete, TextField } from "@mui/material";
import { Delete, Create } from "@mui/icons-material";
import { Button } from "@mui/material";
import useFetchPunchDetails from "../Hooks/useFetchPunchDetails";
import { DataContext } from "../../context/AppData";
import EventPopups from "../Reusable/EventPopups";

const PunchListModal1 = ({ selectedPL, fetchFilterdPunchList, plDetailId }) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { PunchDetailData, setPunchDetailData } = useContext(DataContext);
  // const { pLDetail, setPLDetail } = useFetchPunchDetails();

  const [formData, setFormData] = useState({
    PunchlistId: selectedPL,
  });
  const [itemsList, setItemsList] = useState([]);
  const [returnElement, setReturnElement] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("");
  const [snackBarText, setSnackBarText] = useState("");

  const hideOptional = () => {
    const checkbox = document.getElementById("customCheckBox1");
    if (checkbox.checked) {
      setReturnElement(
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Photo (After)</label>
          <div className="col-sm-9">
            <input
              type="file"
              className="form-control"
              id="afterFile"
              placeholder=""
              onChange={handleAfterFileInputChange}
            />
          </div>
        </div>
      );
    } else {
      setReturnElement(false);
    }
  };

  useEffect(() => {
    // Assuming PunchDetailData.DetailData is an object
    const newFormData = { ...formData };
    const newItemData = [...itemsList];

    // Iterate over the keys of PunchDetailData.DetailData
    for (const key in PunchDetailData.DetailData) {
      // Check if the key exists in PunchDetailData.DetailData
      if (PunchDetailData.DetailData.hasOwnProperty(key)) {
        // Add the key-value pair to formData
        newFormData[key] = PunchDetailData.DetailData[key];
      }
    }

    for (const key in PunchDetailData.ItemData) {
      // Check if the key exists in PunchDetailData.DetailData
      if (PunchDetailData.ItemData.hasOwnProperty(key)) {
        // Add the key-value pair to formData
        newItemData[key] = PunchDetailData.ItemData[key];
      }
    }

    // Update formData with the new keys
    setItemsList(newItemData);
    setFormData(newFormData);
  }, [PunchDetailData.DetailData, PunchDetailData.ItemData]);

  const handleChange = (event) => {
    const { name } = event.target;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      PunchlistId: selectedPL,
      // PunchlistDetailId: plDetailId
    }));
  };

  useEffect(() => {
    console.log("mail payload", formData);
  }, [formData]);

  // items

  const [itemInput, setItemInput] = useState({
    Name: "",
    Qty: 1,
    Description: "",
    Rate: null,
  });
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [showItem, setShowItem] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        `https://earthcoapi.yehtohoga.com/api/Item/GetSearchItemList?Search=${searchText}`,
        { headers }
      )
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching itemss data:", error);
      });
  }, [searchText]);

  const handleAddItem = () => {
    // Adding the new item to the itemsList
    setItemsList((prevItems) => [
      ...prevItems,
      { ...itemInput }, // Ensure each item has a unique 'id'
    ]);
    // Reset the input fields
    setSearchText("");
    setSelectedItem({});
    setItemInput({
      Name: "",
      Qty: 1,
      Description: "",
      Rate: null,
    });
  };

  const handleItemChange = (event) => {
    setShowItem(true);
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
    });
    setShowItem(false);
    setSearchResults([]); // Clear the search results

    console.log("selected item is", itemInput);
  };

  const deleteItem = (id) => {
    const updatedItemsList = itemsList.filter((item) => item.ItemId !== id);
    setItemsList(updatedItemsList);
  };

  const calculateTotalAmount = () => {
    const total = itemsList.reduce((acc, item) => {
      return acc + item.Rate * item.Qty;
    }, 0);
    return total;
  };

  const handleQuantityChange = (itemId, event) => {
    const updatedItemsList = itemsList.map((item) => {
      if (item.ItemId === itemId) {
        return {
          ...item,
          Qty: Number(event.target.value),
        };
      }
      return item;
    });
    setItemsList(updatedItemsList);
  };

  const handleRateChange = (itemId, event) => {
    const updatedItemsList = itemsList.map((item) => {
      if (item.ItemId === itemId) {
        return {
          ...item,
          Rate: Number(event.target.value),
        };
      }
      return item;
    });
    setItemsList(updatedItemsList);
  };

  useEffect(() => {
    // Calculate the total amount and update the state
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [itemsList]);

  // files

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [PrevFiles, setPrevFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    const newFileObjects = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileObject = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
      newFileObjects.push(fileObject);
    }

    // setSelectedFiles([...selectedFiles, ...files]);
    setSelectedFiles((prevFiles) => [...prevFiles, files]);
    console.log("Added files:", newFileObjects);
  };

  const handleDeleteFile = (indexToDelete) => {
    // Create a new array without the file to be deleted
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToDelete
    );

    // Update the selectedFiles state with the new array
    setSelectedFiles(updatedFiles);
    console.log("Deleted file at index:", indexToDelete);
  };

  // files
  const [selectedFile, setSelectedFile] = useState(null);

  // Step 2: Create an event handler function
  const handleFileInputChange = (event) => {
    // Step 3: Access the selected file
    const file = event.target.files[0];

    // Step 4: Update the state with the selected file
    setSelectedFile(file);
  };

  const [selectedAfterFile, setSelectedAfterFile] = useState(null);

  // Step 2: Create an event handler function
  const handleAfterFileInputChange = (event) => {
    // Step 3: Access the selected file
    const file = event.target.files[0];

    // Step 4: Update the state with the selected file
    setSelectedAfterFile(file);
  };

  const getPunchListDetail = async (id) => {
    try {
      const response = await axios.get(
        `https://earthcoapi.yehtohoga.com/api/PunchList/GetPunchlistDetail?id=${id}`,
        {
          headers,
        }
      );

      setFormData((prevData) => ({
        ...prevData,
        ...response.data,
      }));

      // Handle the response. For example, you can reload the customers or show a success message
      console.log("pl details res:", response.data);
    } catch (error) {
      console.error("There was an error getting the pl details:", error);
    }
  };

  useEffect(() => {
    getPunchListDetail(plDetailId);
  }, [plDetailId]);

  // handle submit

  useEffect(() => {
    console.log("Pl detailsform data is", formData);
    console.log("Pl items data is", itemsList);
  }, [formData, itemsList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = new FormData();

    // Merge the current items with the new items for EstimateData
    const PunchlistDetailData = {
      ...formData,
      tblPunchlistItems: itemsList,
    };

    console.log("PunchlistDetailData:", PunchlistDetailData);
    // console.log("data:", data);

    postData.append("PunchlistDetailData", JSON.stringify(PunchlistDetailData));

    if (selectedFile) {
      postData.append("Files", selectedFile);
    }

    // Append selectedAfterFile if it exists
    if (selectedAfterFile) {
      postData.append("AfterFiles", selectedAfterFile);
    }

    console.log(JSON.stringify(PunchlistDetailData));

    submitData(postData);
  };

  // const appendFilesToFormData = (formData) => {
  //   Files.forEach((fileObj) => {
  //     formData.append("Files", fileObj.actualFile);
  //   });
  // };

  const submitData = async (postData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
    };
    try {
      const response = await axios.post(
        "https://earthcoapi.yehtohoga.com/api/PunchList/AddPunchlistDetail",
        postData,
        { headers }
      );

      setOpenSnackBar(true);
      setSnackBarColor("success");
      setSnackBarText(response.data.Message);

      document.getElementById("PunchDetailModalCloser").click();
      setFormData({
        Notes: "",
        Address: "",
        isComplete: null,
        isAfterPhoto: null,
      });
      fetchFilterdPunchList();
      document.getElementById("formFile").value = "";
      document.getElementById("afterFile").value = "";
      setItemsList([]);
      for (const entry of postData.entries()) {
        console.log(`FormData Entry - ${entry[0]}: ${entry[1]}`);
      }

      console.log("Data submitted successfully:", response.data.Message);
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  return (
    <>
      <EventPopups
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        color={snackBarColor}
        text={snackBarText}
      />
      <div className="modal fade" id="addPhotos">
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: "80em" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Punchlist</h5>
              <button
                // type="button"
                className="btn-close"
                onClick={() => {
                  document.getElementById("PunchDetailModalCloser").click();
                }}
                // data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="basic-form">
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Photo</label>
                  <div className="col-sm-9">
                    <input
                      className="form-control"
                      onChange={handleFileInputChange}
                      type="file"
                      id="formFile"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Notes</label>
                  <div className="col-sm-9">
                    <textarea
                      name="Notes"
                      value={formData.Notes || ""}
                      onChange={handleChange}
                      className="form-control"
                      placeholder=""
                    ></textarea>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Address</label>
                  <div className="col-sm-9">
                    <input
                      name="Address"
                      type="text"
                      value={formData.Address || ""}
                      onChange={handleChange}
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div
                    className="form-check custom-checkbox mx-3 mb-3"
                    onClick={hideOptional}
                  >
                    {/* <div className="col-sm-3"> */}
                    <input
                      type="checkbox"
                      name="isAfterPhoto"
                      onChange={handleChange}
                      value={formData.isAfterPhoto || ""}
                      className="form-check-input"
                      id="customCheckBox1"
                    />
                    {/* </div> */}
                    {/* <div className="col-sm-9"> */}
                    <label
                      className="form-check-label"
                      htmlFor="customCheckBox1"
                    >
                      After Photo
                    </label>
                    {/* </div> */}
                  </div>
                </div>
                {/* <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">After Photo</label>
                                    </div> */}

                {returnElement}
                <div className="row">
                  <div className="form-check custom-checkbox mx-3">
                    {/* <div className="col-sm-3"> */}
                    <input
                      type="checkbox"
                      name="isComplete"
                      value={formData.isComplete || ""}
                      className="form-check-input"
                      onChange={handleChange}
                      id="customCheckBox2"
                    />
                    {/* </div> */}
                    {/* <div className="col-sm-9"> */}
                    <label
                      className="form-check-label"
                      htmlFor="customCheckBox2"
                    >
                      Complete ?
                    </label>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* item modal */}
            <div className="itemtitleBar">
              <h4>Items</h4>
            </div>
            <div className="card-body">
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
                        <th>Tax</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsList && itemsList.length > 0 ? (
                        itemsList.map((item, index) => (
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
                                  handleQuantityChange(item.ItemId, e)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={item.Rate}
                                style={{ width: "7em" }}
                                className="form-control form-control-sm"
                                onChange={(e) =>
                                  handleRateChange(item.ItemId, e)
                                }
                              />
                            </td>
                            <td>{(item.Rate * item.Qty).toFixed(2)}</td>
                            <td>NaN</td>
                            <td>
                              <div className="badgeBox">
                                <Button
                                  onClick={() => {
                                    deleteItem(item.ItemId);
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
                                    <small>{item.Type}</small>
                                    <br />
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
                              value={
                                selectedItem?.SalePrice || itemInput.Rate || ""
                              }
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
                            {(itemInput.Rate * itemInput.Qty).toFixed(2)}
                          </h5>
                        </td>
                        <td>
                          <input
                            type="number"
                            name="tax"
                            style={{ width: "7em" }}
                            disabled
                            className="form-control form-control-sm"
                            placeholder="tax"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                id="PunchDetailModalCloser"
                className="btn btn-danger light"
                data-bs-dismiss="modal"
                onClick={() => {
                  setPunchDetailData({});
                  setFormData({
                    Notes: "",
                    Address: "",
                    isComplete: false,
                    isAfterPhoto: false,
                  });

                  // document.getElementById("formFile").value = "";
                  // document.getElementById("afterFile").value = "";
                  setItemsList([]);
                }}
              >
                Close
              </button>
              {/* <NavLink to='/PunchlistPreview'> */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save
              </button>
              {/* </NavLink> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PunchListModal1;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Autocomplete, TextField } from "@mui/material";


const PunchListModal1 = ({selectedPL,fetchPunchList, plDetailId}) => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  


  const [formData, setFormData] = useState({
    PunchlistId: selectedPL
  })

  const [returnElement, setReturnElement] = useState();
  const hideOptional = () => {
    const checkbox = document.getElementById("customCheckBox1");
    if (checkbox.checked) {
      setReturnElement(
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Photo (After)</label>
          <div className="col-sm-9">
            <input type="file" className="form-control" id="afterFile" placeholder="" onChange={handleAfterFileInputChange} />
          </div>
        </div>
      );
    } else {
      setReturnElement(false);
    }
  }

  const handleChange = (event) => {
    const { name } = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      PunchlistId: selectedPL
    }));
  };

  useEffect(() => {
    console.log("mail payload",formData );
  },[formData])

  // items

  const [itemsList, setItemsList] = useState([]);
  const [itemInput, setItemInput] = useState({
    Name: "",
    Qty: 1,
    Description: "",
    Rate: null,
  });
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItem, setShowItem] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchText) {
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
    } else {
      setSearchResults([]); // Clear the search results when input is empty
    }
  }, [searchText]);

  const handleItemChange = (event) => {
    setShowItem(true);
    setSearchText(event.target.value);

    setSelectedItem(null); // Clear selected item when input changes
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
  useEffect(() => {
    // Calculate the total amount and update the state
    const total = calculateTotalAmount();
    setTotalAmount(total);
    console.log("items are",itemsList);
  }, [itemsList]);

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
      console.error("There was an error deleting the customer:", error);
    }
  };
  

  useEffect(() => {
    getPunchListDetail(plDetailId)
  },[plDetailId])


  // handle submit

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
        {headers}
      ); 
      setFormData({
        Notes:"",
        Address:"",
        isComplete: null,
        isAfterPhoto: null
      })
      fetchPunchList();
      document.getElementById("formFile").value = '';
      document.getElementById("afterFile").value = '';
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
    <div className="modal fade" id="addPhotos">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Punchlist</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
    
            <div className="modal-body">
              <div className="basic-form">
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Photo</label>
                  <div className="col-sm-9">
                    <input className="form-control"  onChange={handleFileInputChange} type="file" id="formFile" />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Notes</label>
                  <div className="col-sm-9">
                    <textarea
                    name="Notes"
                    value={formData.Notes}
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
                      value={formData.Address}
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
                      value={formData.isAfterPhoto}
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
                      value={formData.isComplete}
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

            <div className="estDataBox">
                  <div className="itemtitleBar">
                    <h4>Items</h4>
                  </div>

                  <div className="table-responsive active-projects style-1 mt-2">
                    <table id="empoloyees-tblwrapper" className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Qty</th>
                          {/* <th>Tax</th> */}
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          itemsList && itemsList.length > 0 ? (
                            itemsList.map((item, index) => (
                              <tr key={item.ItemId}>
                                {" "}
                                {/* Make sure item has a unique 'id' or use index as a fallback */}
                                <td>{item.Name}</td>
                                <td>{item.Description}</td>
                                <td>{item.Rate}</td>
                                <td>{item.Qty}</td>
                                {/* <td>NaN</td> */}
                                <td>{item.Rate * item.Qty}</td>
                                <td>
                                  <div className="badgeBox">
                                    <span
                                      className="actionBadge badge-danger light border-0 badgebox-size"
                                      onClick={() => {
                                        deleteItem(item.ItemId);
                                      }}
                                    >
                                      <span className="material-symbols-outlined badgebox-size">
                                        delete
                                      </span>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <></>
                          ) /* Add a null check or alternative content if formData.tblEstimateItems is empty */
                        }

                        <tr>
                          <td>
                            <>
                              <Autocomplete
                                id="search-items"
                                options={searchResults}
                                getOptionLabel={(item) => item.ItemName}
                                value={selectedItem}
                                onChange={(event, newValue) => {
                                  if (newValue) {
                                    handleItemClick(newValue);
                                  } else {
                                    setSelectedItem(null);
                                  }
                                }}
                                inputValue={searchText}
                                onInputChange={(_, newInputValue) => {
                                  setShowItem(true);
                                  setSearchText(newInputValue);
                                  setSelectedItem(null); // Clear selected item when input changes
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Search for items..."
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                  />
                                )}
                                renderOption={(props, item) => (
                                  <li
                                    style={{ cursor: "pointer" }}
                                    {...props}
                                    onClick={() => handleItemClick(item)}
                                  >
                                    {item.ItemName}
                                  </li>
                                )}
                              />
                            </>
                          </td>
                          <td>
                            <p>{selectedItem?.SaleDescription || " "}</p>
                          </td>

                          <td>
                            <div className="col-sm-9">
                              <p>
                                {selectedItem?.SalePrice ||
                                  itemInput.Rate ||
                                  " "}
                              </p>
                            </div>
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
                            />
                          </td>
                          {/* <td>
                            <input
                              type="text"
                              name="tax"
                              disabled
                              style={{ width: "7em" }}
                              className="form-control form-control-sm"
                              placeholder="Tax"
                            />
                          </td> */}
                          <td>
                            <h5 style={{ margin: "0" }}>
                              {itemInput.Rate * itemInput.Qty}
                            </h5>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                // Adding the new item to the itemsList
                                setItemsList((prevItems) => [
                                  ...prevItems,
                                  { ...itemInput }, // Ensure each item has a unique 'id'
                                ]);
                                // Reset the input fields
                                setSearchText("");
                                setSelectedItem(null);
                                setItemInput({
                                  Name: "",
                                  Qty: 1,
                                  Description: "",
                                  Rate: null,
                                });
                              }}
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <NavLink to='/PunchlistPreview'> */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Save
              </button>
              {/* </NavLink> */}
            </div>
      
        </div>
      </div>
    </div>
  );
};

export default PunchListModal1;

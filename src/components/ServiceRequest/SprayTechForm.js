import React, { useEffect, useState } from "react";
import useFetchSprayTech from "../Hooks/useFetchSprayTech";
import { Checkbox, TextField } from "@mui/material";

const SprayTechForm = ({
  SrId,
  sTechItems,
  setSTechItems,
  sideData,
  setSideData,
}) => {
  const { sprayTechData, fetchSprayTech } = useFetchSprayTech();

  useEffect(() => {
    fetchSprayTech();
  }, []);

  useEffect(() => {
    if (sTechItems.length === 0) {
      const updatedSTechItems = sprayTechData.map((item) => ({
        ...item,
        isUsed: false,
        ServiceRequestId: SrId,
      }));
      setSTechItems(updatedSTechItems);
      console.log("updatedSTechItems", updatedSTechItems);
    }
  }, [sprayTechData]);

  useEffect(() => {
    console.log("sTechItems", sideData);
  }, [sideData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSideData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  return (
    <>
      <div className="itemtitleBar">
        <h4>Spray Tech Form</h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card-body pt-0 pb-0">
            <div className="estDataBox">
              <div className="table-responsive style-1 mt-2">
                <table id="empoloyees-tblwrapper" className="table">
                  <thead style={{ backgroundColor: "#F0F4F9" }}>
                    <tr>
                     
                      <th colSpan={"12"} style={{ fontWeight: "bold" }} className="text-center">Chemicals</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {sTechItems.map((item, index) => (
                      <>
                        {index === 0 ||
                        item.Type !== sTechItems[index - 1].Type ? (
                          <tr style={{ backgroundColor: "#F0F4F9" }}>
                            <td style={{ fontWeight: "bold" }}>#</td>
                            <td style={{ fontWeight: "bold" }}>{item.Type}</td>
                            <td style={{ fontWeight: "bold" }}>Rate</td>
                            <td style={{ fontWeight: "bold" }}>Notes</td>
                          </tr>
                        ) : null}
                        <tr
                          key={item.SprayTechItemId}
                          style={{
                            height: "fit-content",
                            color: item.isOrganic ? "red" : "inherit",
                          }}
                        >
                          <td>
                            <Checkbox
                              // Here you can use item.isUsed for managing checkbox state
                              checked={item.isUsed}
                              onChange={() => {
                                // Toggle isUsed value when checkbox is clicked
                                setSTechItems((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index].isUsed =
                                    !updatedItems[index].isUsed;
                                  return updatedItems;
                                });
                              }}
                            />
                          </td>
                          <td>{item.ItemName}</td>
                          <td>
                            {item.Rate} {item.Unit}
                          </td>
                          <td style={{whiteSpace : "nowrap"}}>{item.Notes}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div
              className="col-md-12 mt-2"
              style={{ backgroundColor: "#F0F4F9" }}
            >
              <h4 className="mb-1 pb-0 mt-1">Sprayed Hours</h4>
            </div>
            <div className="col-md-12 mt-3">
              {" "}
              <label className="form-label mt-2 me-1"> Hours: </label>
              <TextField
                size="small"
                name="Hours"
                type="number"
                onChange={handleChange}
                value={sideData.Hours}
              />
            </div>
            <div
              className="col-md-12 mt-3"
              style={{ backgroundColor: "#F0F4F9" }}
            >
              <h4 className="mb-1 pb-0 mt-1">Landscape treated</h4>
            </div>
            <div className="col-md-1">
              <Checkbox
                name="isTurf"
                onChange={handleChange}
                value={sideData.isTurf}
                checked={sideData.isTurf}
              />
            </div>
            <div className="col-md-11">
              <h5 className="mb-0 pb-0 mt-1">Turf</h5>
            </div>
            <div className="col-md-1">
              <Checkbox
                name="isShrubs"
                onChange={handleChange}
                value={sideData.isShrubs}
                checked={sideData.isShrubs}
              />
            </div>
            <div className="col-md-11">
              <h5 className="mb-0 pb-0 mt-1">Shrubs</h5>
            </div>
            <div className="col-md-1">
              <Checkbox
                name="isParkways"
                onChange={handleChange}
                value={sideData.isParkways}
                checked={sideData.isParkways}
              />
            </div>
            <div className="col-md-11">
              <h5 className="mb-0 pb-0 mt-1">Parkways</h5>
            </div>
            <div className="col-md-1">
              <Checkbox
                name="isTrees"
                onChange={handleChange}
                value={sideData.isTrees}
                checked={sideData.isTrees}
              />
            </div>
            <div className="col-md-11">
              <h5 className="mb-0 pb-0 mt-1">Trees</h5>
            </div>
            <div
              className="col-md-12 mt-3"
              style={{ backgroundColor: "#F0F4F9" }}
            >
              <h4 className="mb-1 pb-0 mt-1">Quantity</h4>
            </div>
            <div className="col-md-12 mt-3">
              {" "}
              <label className="form-label mt-2 me-1"> Ounces: </label>
              <TextField
                size="small"
                name="Ounces"
                onChange={handleChange}
                value={sideData.Ounces}
              />
            </div>
            <div className="col-md-12 mt-3">
              {" "}
              <label className="form-label mt-2 me-1"> Pounds: </label>
              <TextField
                size="small"
                name="Pounds"
                onChange={handleChange}
                value={sideData.Pounds}
              />
            </div>
            <div className="col-md-12 mt-3">
              {" "}
              <label className="form-label mt-2 me-2"> Others: </label>
              <TextField
                size="small"
                name="Other"
                onChange={handleChange}
                value={sideData.Other}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SprayTechForm;

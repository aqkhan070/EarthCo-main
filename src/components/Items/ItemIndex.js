import React from "react";
import { Route, Routes } from "react-router-dom";
import AddItem from "./AddItem";
import Items from "./Items";
import ItemTitle from "./ItemTitle";

const ItemIndex = () => {
  return (
    <>
      <ItemTitle></ItemTitle>
      <Routes>
        <Route path="" element={<Items />} />
        <Route path="Add-Item" element={<AddItem />} />
      </Routes>
    </>
  );
};

export default ItemIndex;

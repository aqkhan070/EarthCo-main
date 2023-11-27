// EstimateContext.js
import React, { createContext, useContext, useState } from "react";

const EstimateContext = createContext();

export const EstimateProvider = ({ children }) => {
  const [estimateState, setEstimateState] = useState(initialEstimateState);

  return (
    <EstimateContext.Provider value={{ estimateState, setEstimateState }}>
      {children}
    </EstimateContext.Provider>
  );
};

export const useEstimateContext = () => {
  return useContext(EstimateContext);
};

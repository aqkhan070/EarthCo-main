import { createContext } from 'react';

const DataContext = createContext();

const DataFun = ({ children }) => {
  return (
    <DataContext.Provider value={{}}>
      {children}
    </DataContext.Provider>
  );
}

export default DataFun;
export { DataContext };

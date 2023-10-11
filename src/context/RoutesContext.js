import React from 'react'
import { createContext, useState } from 'react'

const RoutingContext = createContext();

const RoutesContext = ({ children }) => {
    const [estimateRoute, setEstimateRoute] = useState();
    const [SRroute, setSRroute] = useState('');

    return (
        <RoutingContext.Provider value={{ estimateRoute, setEstimateRoute, SRroute, setSRroute }}>
            {children}
        </RoutingContext.Provider>
    )
}

export default RoutesContext;
export { RoutingContext };

import React, { createContext, useRef, useState } from 'react'

const StyleContext = createContext()

const StyleData = ({ children }) => {

    const [mainControl, setMainControl] = useState('desktop');
    const [showSubMenu, setShowSM] = useState(false);
    const eliminate = useRef(null)

    const statesIndex = {
        showSubMenu,
        setShowSM,
        mainControl,
        setMainControl,
        eliminate
    }

    return (
        <StyleContext.Provider value={statesIndex}>
            {children}
        </StyleContext.Provider>
    )
}

export default StyleData
export { StyleContext }
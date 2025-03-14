'use client'
import { createContext, useContext } from "react";

// const GlobalContext = createContext({ AB: process.env.AB }); // wtest
const GlobalContext = createContext();

export const GlobalProvider = ({ children, urlDomain, mainAdmin }) => {
    return <GlobalContext.Provider value={{ ABC: 'abc', urlDomain, mainAdmin }}>
            {children}
        </GlobalContext.Provider>
}

export const useGlobal = () => {
    return useContext(GlobalContext)
}

// export const useGlobal = () => useContext(GlobalContext);

// export default GlobalContext;
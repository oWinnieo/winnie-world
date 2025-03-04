'use client'
// contexts/AlertContext.js
import React, { createContext, useContext, useState } from 'react'

// 创建一个 Alert 上下文对象
const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [ alert, setAlert ] = useState(null);

    const showAlert = (message, type = 'info') => {
        setAlert({ message, type })
        setTimeout(() => {
            setAlert(null);
        }, 3000)
    }

    return (
        <AlertContext.Provider
            value={{ alert, showAlert }}>
                {children}            
        </AlertContext.Provider>
    )
}

const useAlert = () => {
    return useContext(AlertContext)
}

export { AlertContext, AlertProvider, useAlert };
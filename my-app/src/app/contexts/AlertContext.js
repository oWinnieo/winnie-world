'use client'
import { createContext, useState, useContext } from 'react'
import { Alert } from '@/app/components/alert/alert'
const AlertContext = createContext()
export const AlertProvider = ({ children }) => {
    const [ alert, setAlert ] = useState({ message: "", type: "", visible: false })
    
    const showAlert = ({
        message,
        type = "info"
    }) => {
        setAlert({ message, type, visible: true })
        let tAlert = setTimeout(() => {
            clearTimeout(tAlert)
            setAlert({ message: "", type: "", visible: false})
        }, 3000)
    }
    const hideAlert = () => {
        setAlert({ message: "", type: "", visible: false})
    }
    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert.visible && <Alert message={alert.message} type={alert.type} />}
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    return useContext(AlertContext)
}


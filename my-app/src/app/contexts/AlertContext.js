'use client'
import { createContext, useState, useContext } from 'react'
import { Alert } from '@/app/components/dialogElement/alert/alert'
const AlertContext = createContext()
export const AlertProvider = ({ children }) => {
    const [ alert, setAlert ] = useState({ message: "", type: "", visible: false })
    const [ styleType, setStyleType ] = useState('')
    const [ linkData, setLinkData ] = useState(null)
    
    const showAlert = ({
        message,
        type = "info",
        styleType = undefined,
        linkData = null
    }) => {
        setAlert({ message, type, visible: true })
        if (styleType !== 'keep') {
            let tAlert = setTimeout(() => {
                clearTimeout(tAlert)
                setAlert({ message: "", type: "", visible: false})
            }, 3000)
        } else {
            setStyleType(styleType)
        }
        if (linkData) {
            setLinkData(linkData)
        }
    }
    const hideAlert = () => {
        setAlert({ message: "", type: "", visible: false})
    }
    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert.visible && <Alert message={alert.message} type={alert.type} styleType={styleType} linkData={linkData} />}
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    return useContext(AlertContext)
}


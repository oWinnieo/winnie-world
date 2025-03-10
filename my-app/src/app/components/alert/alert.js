'use client'
// components/Alert.js
import React, { useState } from 'react';
// import styles from './alert.scss';
import { useAlert } from '@/app/contexts/AlertContext'
import './alert.scss'

export const Alert = ({ message, type = 'info', onClose }) => {
    const { hideAlert } = useAlert()

    return (
        <div className={`alert ${type}`}>
            <span className="message">{message}</span>
            <button className="closeButtonAlert" onClick={hideAlert}>
                ×
            </button>
        </div>
    );
};

// export const Alert = ({ message, type }) => {
//     const alertStyles = {
//         info: { background: "#2196f3", color: "#fff" },
//         success: { background: "#4caf50", color: "#fff" },
//         warning: { background: "#ffc107", color: "#fff" },
//         error: { background: "#f44336", color: "#fff" },
//     }
//     return (
//         <div style={{
//             position: "fixed",
//             top: "10px",
//             right: "10px",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             ...alertStyles[type],
//         }}>
//             {message}
//         </div>
//     )
// }
/* { alertShow ? <Alert message={alertMsg} type={alertType} onClose={hideAlert} /> : null} */

    
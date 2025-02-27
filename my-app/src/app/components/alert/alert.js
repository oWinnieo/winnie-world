// components/Alert.js
import React, { useState } from 'react';
// import styles from './alert.scss';
import './alert.scss'

export const Alert = ({ message, type = 'info', onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    // const closeAlert = () => {
    //     setIsVisible(false);
    // };

    if (!isVisible) return null;

    return (
        // <div>alert wtest</div>
        <div className={`alert ${type}`}>
            <span className="message">{message}</span>
            <button className="closeButtonAlert" onClick={onClose}>
                ×
            </button>
        </div>
    );
    // return (<div>1</div>)
};
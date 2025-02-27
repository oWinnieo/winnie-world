// components/Modal.js
import React, { useState } from 'react';
// import styles from './modal.scss';
import './modal.scss';

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            {/* onClick={onClose} */}
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="closeButtonModal" onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};
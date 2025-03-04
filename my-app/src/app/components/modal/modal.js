// components/Modal.js
import React, { useState } from 'react';
// import styles from './modal.scss';
import { useModal } from '@/app/contexts/ModalContext'
import './modal.scss';

export const Modal = ({ title, content, isOpen, onClose, children }) => {
    // if (!isOpen) return null;
    const { closeModal } = useModal()

    return (
        <div className="modalOverlay">
            {/* onClick={onClose} */}
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="closeButtonModal" onClick={closeModal}>
                    ×
                </button>
                <h2>{title}</h2>
                <p>{content}</p>
                {children}
            </div>
        </div>
    );
};


/* 调用 <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Please enter password for editing.</h2>
                <p>This is the content of the modal.</p>
                <input
                className="border border-slate-500 px-8 py-2"
                type="text"
                password="Password"
                onChange={e => setPw(e.target.value)}
                ></input>
                <button onClick={pwCheck}>check</button>
            </Modal> */
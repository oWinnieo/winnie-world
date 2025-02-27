'use client'
import { FormAddItem } from "./formAddItem"
import { Modal } from '../modal/modal';
import { Alert } from '../alert/alert';
import { useState } from 'react'
export const AddItem = () => {
    const [ isAddItem, setIsAddItem ] = useState(false)
    const ToggleAddItem = () => {
        setIsAddItem((val) => !val)
    }
    /* modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        if (!isAddItem) {
            setIsModalOpen(true);
        } else {
            setIsAddItem(false)
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    /* /modal */
    /* pw check */
    const [ pw, setPw ] = useState('')
    const [ checkWaiting, setCheckWaiting ] = useState(true)
    const [ alertShow, setAlertShow ] = useState(false)
    const [ alertMsg, setAlertMsg ] = useState('')
    const [ alertType, setAlertType ] = useState('')
    const pwCheck = () => {
        console.log('pw', pw)
        setAlertShow(true)
        if (pw === 'xiaow233') { // xiaow233
            console.log('yes')
            setAlertMsg('pw ok')
            setAlertType('success')
            setIsModalOpen(false)
            ToggleAddItem()
        } else {
            console.log('no')
            setAlertMsg('pw wrong')
            setAlertType('danger')
        }
        let t1 = setTimeout(() => {
            clearTimeout(t1)
            setAlertShow(false)
        }, 3000)
    }
    const closeAlert = () => {
        setAlertShow(false)
    }
    /* /pw check */
    
    return (
        <>
            {/* <Alert></Alert> */}
            <button onClick={openModal}>
            {/* ToggleAddItem wtest backup */}
                {isAddItem ? 'Cancel Adding' : 'Add Item (need to enter the right password)'}
            </button>
            {
                isAddItem ? <FormAddItem></FormAddItem> : null
            }
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Please enter password for editing.</h2>
                {/* <p>This is the content of the modal.</p> */}
                <input
                className="border border-slate-500 px-8 py-2"
                type="text"
                password="Password"
                onChange={e => setPw(e.target.value)}
                ></input>
                <button onClick={pwCheck}>check</button>
            </Modal>
            { alertShow ? <Alert message={alertMsg} type={alertType} onClose={closeAlert} /> : null}
        </>)
}
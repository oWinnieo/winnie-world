'use client'
import { FormAddItem } from "./itemEditForm"
import { useState, useContext } from 'react'
import { htmlDecode, htmlSimpleDecode } from '@/lib/utils';
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
import './itemEditor.scss';
// import MyContext from '@/app/contexts/MyContext' // wtest context
export const ItemEditor = ({ params, type }) => {
    // console.log('wtest ItemEditor params', params)
    const [ isAddItem, setIsAddItem ] = useState(false)
    const { showAlert } = useAlert()
    const { openModal, closeModal } = useModal()
    const ToggleAddItem = () => {
        setIsAddItem((val) => !val)
    }
    /* modal */
    const checkAddStatus = () => {
        if (!isAddItem) {
            openModal(
                {
                    title: 'pw check',
                    content: 'Please enter password for editing.',
                    childEl: (closeModal) => (
                        <ModalContent closeModal={closeModal} valueHandler={pwCheck} />
                    )
                    
                },
            )
        } else {
            ToggleAddItem()
        }
        
    };
    /* /modal */
    /* pw check */
    const pwCheck = (val) => {
        if (val === '123') { // wtest xiaow233
            showAlert({
                message: 'pw ok',
                type: "success",
            })
            closeModal()
            ToggleAddItem()
        } else {
            showAlert({
                message: 'pw wrong',
                type: 'danger'
            })
        }
        let t1 = setTimeout(() => {
            clearTimeout(t1)
        }, 3000)
    }
    /* /pw check */
    return (
        <>
            <div className="area-tools">
                <button onClick={checkAddStatus}>
                    {isAddItem ? (
                        params.data ? 'Cancel Edit' : 'Cancel Adding') :
                        (params.data ? 'Edit Item (need to enter the right password)' : 'Add Item (need to enter the right password)')}
                </button>
            </div>
            <div className="area-content">
            {
                isAddItem ? <FormAddItem params={params}></FormAddItem> : 
                    (
                        params.data ? <div>{htmlDecode(params.data.content)}</div> : null
                    )
            }
            </div>
        </>)
}
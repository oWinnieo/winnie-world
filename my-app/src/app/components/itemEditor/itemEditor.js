'use client'
import { FormAddItem } from "./itemEditForm"
import { useState, useContext } from 'react'
import { htmlDecode, htmlSimpleDecode } from '@/lib/utils';
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
import { useSession } from "next-auth/react"; // wtest auth
import './itemEditor.scss';
// import MyContext from '@/app/contexts/MyContext' // wtest context
export const ItemEditor = ({ params, type }) => {
    // console.log('wtest ItemEditor params', params)
    // const { data: session } = useSession(); // wtest auth backup
    /* wtest auth mock */
    const session = {
        user: {
            "name":"Ryuuna R",
            "email":"ryuuna2010@gmail.com",
            id: '100402157727233293796',
            image: 'https://lh3.googleusercontent.com/a/ACg8ocIjhCKEvHRTFNPuWEhoKJWg-6g4U4BaGSCwu5Zk11RaaTxCBvM=s96-c'
        }
    }
    /* /wtest auth mock */
    const [ isAddItem, setIsAddItem ] = useState(false)
    const { showAlert } = useAlert()
    const { openModal, closeModal } = useModal()
    const ToggleAddItem = () => {
        setIsAddItem((val) => !val)
    }
    /* check author */
    const authorCheck = () => {
        return session.user.id
    }
    /* /check author */
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
        if (val === 'xiaow233') { // wtest 
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
                isAddItem ? <FormAddItem params={{
                    ...params,
                    userId: session.user.id,
                }}></FormAddItem> : 
                    (
                        params.data ? <div>{htmlDecode(params.data.content)}</div> : null
                    )
            }
            </div>
        </>)
}
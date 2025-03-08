'use client'
import { FormAddItem } from "./itemEditForm"
import { useState, useContext } from 'react'
import { htmlDecode, htmlSimpleDecode } from '@/lib/utils';
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
import { useSession } from "next-auth/react"; // wtest auth
import { userInfo } from '@/app/mock/userInfo' // wtest mock
import './itemEditor.scss';
// import MyContext from '@/app/contexts/MyContext' // wtest context
export const ItemEditor = ({ params, type }) => {
    // console.log('wtest ItemEditor params', params)
    const { data: session } = useSession(); // wtest auth backup
    /* wtest auth mock *
    const session = {
        user: userInfo
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
        return session.user.userId
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
        if (val === '123') { // wtest 
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
            {/* <p>wtest params: {JSON.stringify(params)}</p> */}
            {/* <p>wtest params.data: {params.data.author.id}</p> */}
            {/* <p>wtest session.user.userId: {session.user.userId}</p> */}
            <div className="area-tools">
                <button className={params?.data?.author?.id && params.data.author.id !== session.user.userId && 'disabled'} onClick={checkAddStatus}>
                    {isAddItem ? (
                        params.data ? 'Cancel Edit' : 'Cancel Adding') :
                        (params.data ? (
                            params.data?.author?.id && params.data.author.id !== session.user.userId ? 'Edit Item (You‘re not the author)' :'Edit Item (need to enter the right password)'
                        ) : (
                            params.data?.author?.id && params.data.author.id !== session.user.userId ? 'Add Item (You‘re not the author)' : 'Add Item (need to enter the right password)')
                        )
                    }
                        
                </button>
            </div>
            <div className="area-content">
            {
                isAddItem ? <FormAddItem params={{
                    ...params,
                    // user: session.user
                    authorId: session?.user?.userId ? session.user.userId : '?? wtest waiting'
                }}></FormAddItem> : 
                    (
                        params.data ? <div>{htmlDecode(params.data.content)}</div> : null
                    )
            }
            </div>
        </>)
}
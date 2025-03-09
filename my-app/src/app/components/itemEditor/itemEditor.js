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
    const { data: session } = useSession(); // wtest auth
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
    /* check authorInfo *
    const authorCheck = () => {
        return session.user.userId
    }
    /* /check authorInfo */
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
    /* pw check *
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
    /* access check */
    const editAccess = () => {
        return params?.data ?
            session?.user?.userId && params?.data?.authorInfo?.userId && params.data.authorInfo.userId === session.user.userId
            : true
    }
    /* /access check */
    return (
        <>
            {/* <p>wtest params: {JSON.stringify(params)}</p> */}
            {/* <p>wtest params.data: {JSON.stringify(params.data.authorInfo)}</p> */}
            {/* <p>wtest session.user.userId: {JSON.stringify(session?.user?.userId)}</p> */}
            {/* <p>userId: {params?.data?.authorInfo?.userId}</p> */}
            {/* <p>wtest editAccess(): {JSON.stringify(editAccess())}</p> */}
            <div className="area-tools">
                {
                    editAccess() ?
                        <button className={params?.data?.authorInfo?.userId && params.data.authorInfo.userId !== session.user.userId ? 'disabled' : 'available'} onClick={ToggleAddItem}>
                            {/* checkAddStatus wtest */}
                            {isAddItem ? (
                                params.data ? 'Cancel Edit' : 'Cancel Adding') :
                                (params.data ? (
                                        'Edit Item'
                                    ) : (
                                        'Add Item'
                                    )
                                )
                            }
                        </button> : <p className="tip">Only the author or the admin can edit this post.</p>
                }
                
            </div>
            <div className="area-content">
            {
                editAccess() && isAddItem ? <FormAddItem params={{
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
'use client'
import { usePathname, useRouter } from "next/navigation"
import { FormForLearningItem } from "./itemForm"
import { EditorComment } from '@components/editorComment/editorComment'
import { useState } from 'react'
import { htmlDecode, strSliced, html2txt } from '@/lib/utils';
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
import { ListNavItem } from '@components/list/listNavItem/listNavItem'
import { ItemUser } from '@/app/components/item/itemUser/itemUser';
import { ItemComment } from '@/app/components/item/itemComment/itemComment';
import { MessageSquareMore, Heart, Star, Share2, QrCode } from 'lucide-react'
import {
    ifLogined,
    userLoginedSameWithAuthor,
    ifLoginedAsAdmin,
    editOrAddBtnStatusCheck
} from '@/lib/auth'
import { QRCodeCanvas } from "qrcode.react"; // wtest qrcode
import { itemDelete } from '@/lib/dataOperation';
import './itemEditor.scss';

const interactClick = async ({ type, params, session, showAlert }) => {
    if ((type === 'like' || type === 'favorite') && (!session || !session.user || !session.user.userId)) {
        showAlert({
            message: 'Please sign in to continue.'
        })
        return undefined
    }
    const setAuthorId = () => {
        if (type === 'like' || type === 'favorite') {
            return session.user.userId
        } else {
            return session?.user?.userId ? session.user.userId : 'guest'
        }
    }
    const dataUpdated = {
        belongToItemId: params.data.id,
        belongToItemCollection: params.collectionName,
        authorId: setAuthorId()
    }
    try {
        const res = await fetch(`${params.urlDomain}?collectionName=${type}`, {
            // &belongToItemId=${params.belongToItemId}&belongToItemCollection=${params.belongToItemCollection} wtest
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({ ...dataUpdated })
        })
        const dataRes = await res.json();
        if (dataRes.success) {
            console.log(dataRes.message)
            if (type !== 'share') window.location.reload()
        } else {
            throw new Error('Failed to create an item.')
        }
    } catch (err) {
        console.log(err)
    }
}

export const ItemEditor = ({ params, type, session }) => {
    const pathName = usePathname()
    const router = useRouter()
    const { showAlert } = useAlert()
    const { openModal, closeModal } = useModal()
    const copyContentOfSharing = async ({ type, params, session, showAlert, url }) => {
        const title = params?.data?.title ? params.data.title : ''
        const contentSliced = strSliced(html2txt(params.data.content), 20)
        try {
            await navigator.clipboard.writeText(`${title}\n${contentSliced}\n${url}`)
            showAlert({
                message: 'Copy successfully!',
                type: 'success'
            })
            interactClick({ type, params, session, showAlert })
        } catch(err) {
            showAlert({
                message: 'Copy failed!',
                type: 'danger'
            })
        }
    }
    const openQRCode = async ({ type, params, session, showAlert, url }) => {
        interactClick({ type, params, session, showAlert })
        openModal(
            {
                title: 'Share by QRCode',
                content: 'You can share this post using this QRCode',
                childEl: () => (
                    <div className="area-for-child-el">
                        <QRCodeCanvas value={url} size={200} />
                    </div>
                )
            },
        )
    }
    const [ isEditItem, setIsEditItem ] = useState(false)
    
    const ToggleAddItem = () => {
        setIsEditItem((val) => !val)
    }
    /* enterDelWord */
    const enterDelWord = (val, params) => {
        if (val === 'delete') { // wtest delete
            showAlert({
                message: 'delete confirm',
                type: "success",
            })
            closeModal()
            itemDelete({
                params: {
                    urlDomain: params.urlDomain,
                    collectionName: params.collectionName
                },
                id: params.data._id,
                listPage: params.collectionName
            }).then(res => {
                router.push(`/learning/${res}`)
            })
        } else {
            showAlert({
                message: 'don\'t delete',
                type: 'danger'
            })
        }
    }
    /* /enterDelWord */
    const delConfirm = ({ nameForConfrom, params }) => {
        openModal(
            {
                title: 'del confirm',
                content: `<${nameForConfrom}>: Are you sure to delete this item? (If yes, please enter the world \'delete\')`,
                childEl: () => (
                    <ModalContent valueHandler={enterDelWord} params={params} />
                )
                // closeModal={closeModal} // wtest backup
                
            },
        )
    }
    
    /* access check */
    const editTip = () => {
        return params?.data ? 'Only the author or the admin can edit this post.' : 'If you want to add an item, please log in first.'
    }
    /* /access check */
    /* area-interaction */
    /* wtest */
    const [areaName, setAreaName] = useState('comment')
    const areaSwitch = ({ areaName }) => {
        setAreaName(areaName)
    }
    /* /wtest */
    const [replyCommentInfo, setReplyCommentInfo] = useState({})
    const makeReply = ({ commentId }) => {
        setReplyCommentInfo(params?.data?.comments.find(com => com._id === commentId))
    }
    const clearReply = () => {
        setReplyCommentInfo(null)
    }
    /* /area-interaction */
    const accessCheckParams = {
        group: params?.group,
        data: params?.data,
        authorInfo: params?.data?.authorInfo,
        session
    }
    
    return (
        <>
            {/* <p>wtest {JSON.stringify(params)}</p> */}
            {/* <p>wtest {JSON.stringify(session)}</p> */}
            {(params.group !== 'management' || !params.data || (params.collectionName === 'intro' && session?.user?.role === 'mainAdmin')) && <div className="area-tools">
                {
                    editOrAddBtnStatusCheck(accessCheckParams) ?
                        <button className={editOrAddBtnStatusCheck(accessCheckParams) ? 'available' : 'disabled'} onClick={ToggleAddItem}>
                            {/* checkAddStatus wtest */}
                            {isEditItem ?
                                (params.data ? 'Cancel Edit' : 'Cancel Adding') :
                                (params.data ? 'Edit Item' : 'Add Item')
                            }
                        </button>
                        : <p className="tip">{editTip()}</p>
                }
            </div>}
            <div className="area-content">
                {
                    editOrAddBtnStatusCheck(accessCheckParams) && isEditItem ?
                        <>
                            <FormForLearningItem params={{
                                ...params,
                                authorId: session?.user?.userId ? session.user.userId : undefined,
                            }}></FormForLearningItem>
                        </> : 
                        (
                            (() => {
                                switch(params.group) {
                                    case 'management':
                                        switch (params.collectionName) {
                                            case 'listNav':
                                                return params.data ? <ListNavItem
                                                    id={params.data._id}
                                                    status={editOrAddBtnStatusCheck(accessCheckParams)}
                                                    item={params.data}
                                                    isEditItem={isEditItem}
                                                    ToggleAddItem={ToggleAddItem}
                                                    params={params}
                                                    authorId={session?.user?.userId ? session.user.userId : undefined}></ListNavItem> : null
                                            case 'user':
                                                return params.data ? <ItemUser
                                                    id={params.data._id}
                                                    status={editOrAddBtnStatusCheck(accessCheckParams)}
                                                    item={params.data}
                                                    isEditItem={isEditItem}
                                                    ToggleAddItem={ToggleAddItem}
                                                    params={params}
                                                    authorId={session?.user?.userId ? session.user.userId : undefined}
                                                    session={session}></ItemUser> : null
                                        }   
                                    case 'learning':
                                        return params.data ? <div className="area-content-in">{htmlDecode(params.data.content)}</div> : null
                                }
                            })()
                        )
                }
                {params.data && // wtest params.group === 'management'
                <div className="area-content-tools">
                    {params.group === 'learning' && (<>
                        <button
                            className="btn-qrcode"
                            onClick={() => openQRCode({ type: 'share', params, session, showAlert, url: `https://winnie-online.win/${pathName}`})}>
                            <QrCode />
                        </button>
                        <button
                            className="btn-share"
                            onClick={() => copyContentOfSharing({ type: 'share', params, session, showAlert, url: `${window.location.origin}${pathName}` })}>
                            <Share2 />
                            <span className="count">({params.data.share})</span>
                        </button>
                        <button className="btn-comment">
                            <MessageSquareMore />
                            <span className="count">({params.data.comments?.length})</span>
                        </button>
                        <button onClick={() => interactClick({ type: 'like', params, session, showAlert })}>
                            <Heart className={params.data.likeStatus ? 'text-red-500' : ''} />
                            <span className="count">({params.data.like})</span>
                        </button>
                        <button onClick={() => interactClick({ type: 'favorite', params, session, showAlert })}>
                            <Star className={params.data.favoriteStatus ? 'text-red-500' : ''} />
                            <span className="count">({params.data.favorite})</span>
                        </button>
                    </>)}
                    {
                        editOrAddBtnStatusCheck(accessCheckParams) &&
                        (params.group === 'learning' || (params.group === 'management' && isEditItem)) &&
                        (<>
                            <button className={editOrAddBtnStatusCheck(accessCheckParams) ? 'available' : 'disabled'} onClick={ToggleAddItem}>
                                {/* checkAddStatus wtest */}
                                {isEditItem ? 'Cancel Edit' : 'Edit Item'
                                }
                            </button>
                            {/* { wtest
                                JSON.stringify(Object.keys(params.data))
                            } */}
                            <button
                                className={editOrAddBtnStatusCheck(accessCheckParams) ? 'available' : 'disabled'}
                                onClick={() => delConfirm({ nameForConfrom: params.data.title, params })}
                            >
                            Delete Item
                            </button>
                        </>)
                        
                    }
                    
                </div>}
                {
                    params.data && params.group === 'learning' && <div className="area-interaction">
                    {(() => {
                        switch (areaName) {
                            case 'comment':
                                return <>
                                    {params?.data?.comments?.length > 0 && <ul className="ul-comment">
                                        {params?.data?.comments?.map(comment =>
                                            <ItemComment
                                            key={comment._id}
                                            comment={comment}
                                            makeReply={makeReply}
                                            urlDomain={params.urlDomain}
                                            session={session}
                                            accessEditStatus={
                                                userLoginedSameWithAuthor({
                                                    session,
                                                    data: comment,
                                                    authorInfo: comment.authorInfo
                                                }) || ifLoginedAsAdmin({ session })}
                                            accessStatus={
                                                ifLogined({
                                                    session
                                                })
                                            }></ItemComment>
                                        )}
                                    </ul>
                                    }
                                    {
                                        ifLogined({ session }) &&
                                        // <p>EditorComment wtest_here_fetch -- a</p>
                                        <EditorComment
                                            params={params}
                                            itemId={params.data.id}
                                            itemColName={params.collectionName}
                                            authorId={session?.user?.userId}
                                            replyCommentInfo={replyCommentInfo}
                                            clearReply={clearReply}
                                        ></EditorComment>
                                    }
                                </>
                            case 'like':
                                return <>
                                    <div>like area</div>
                                </>
                        }
                    })()}
                </div>
                }
            </div>
        </>)
}
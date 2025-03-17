'use client'
import { FormForLearningItem } from "./itemForm"
import { EditorComment } from '@components/editorComment/editorComment'
import { useState, useContext, useEffect } from 'react'
import { htmlDecode } from '@/lib/utils';
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import { ListNavItem } from '@components/list/listNavItem/listNavItem'
import { ItemUser } from '@/app/components/item/itemUser/itemUser';
import { ItemComment } from '@/app/components/item/itemComment/itemComment';
import { MessageSquareMore, Heart, Star } from 'lucide-react'
import {
    ifLogined,
    userLoginedSameWithAuthor,
    ifLoginedAsAdmin,
    editOrAddBtnStatusCheck
} from '@/lib/auth'


import './itemEditor.scss';
// import MyContext from '@/app/contexts/MyContext' // wtest context

const interactClick = async ({ type, params, session, showAlert }) => {
    if (!session || !session.user || !session.user.userId) {
        showAlert({
            message: 'Please sign in to continue.'
        })
        return undefined
    }
    const dataUpdated = {
        belongToItemId: params.data.id,
        belongToItemCollection: params.collectionName,
        authorId: session.user.userId
    }
    try {
        // console.log('wtest waiting -----------------------> add', 'type', type, 'dataUpdated', dataUpdated)
        
        // debugger;
        const res = await fetch(`${params.urlDomain}?collectionName=${type}&belongToItemId=${params.belongToItemId}&belongToItemCollection=${params.belongToItemCollection}`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({ ...dataUpdated }) // wtest user: params.user
        })
        // console.log('res', res)
        // debugger;
        const dataRes = await res.json();
        if (dataRes.success) {
            console.log(dataRes.message)
            window.location.reload()
        } else {
            throw new Error('Failed to create an item.')
        }
    } catch (err) {
        console.log(err)
    }
}

export const ItemEditor = ({ params, type }) => {
    // console.log('wtest ItemEditor params >>>>>>>>>>>>>', params)
    // console.log('params.collectionName', params.collectionName)
    // console.log('params.urlDomain', params.urlDomain)
    /* wtest auth mock */
    const session = sessionInfo()
    /* /wtest auth mock */
    const [ isEditItem, setIsEditItem ] = useState(false)
    const { showAlert } = useAlert()
    const { openModal } = useModal()
    const ToggleAddItem = () => {
        setIsEditItem((val) => !val)
    }
    /* modal */
    const checkAddStatus = () => {
        if (!isEditItem) {
            openModal(
                {
                    title: 'pw check',
                    content: 'Please enter password for editing.',
                    childEl: () => (
                        <ModalContent valueHandler={pwCheck} />
                    )
                    // closeModal={closeModal} // wtest backup
                    
                },
            )
        } else {
            ToggleAddItem()
        }
        
    };
    /* /modal */
    
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
            {/* <p>aaa: {JSON.stringify(ifLogined())}, {JSON.stringify(ifWithAuthorInfo())}</p> */}
            {/* <p>ccc: {JSON.stringify(params.data)}</p> */}
            {/* <p>wtest params: {session?.user?.userId}, {JSON.stringify(editOrAddBtnStatusCheck(accessCheckParams))}</p> */}
            {/* <p>wtest params: {JSON.stringify(ifLogined())}</p> */}
            {/* <p>-------</p> */}
            {/* <p>wtest params.data: {JSON.stringify(params.data.authorInfo)}</p> */}
            {/* <p>authorInfo.userId: {params?.data?.authorInfo?.userId}</p> */}
            {/* <p>params.group: {JSON.stringify(params.group)}</p> */}
            {(params.group !== 'management' || !params.data) && <div className="area-tools">
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
                {/* {
                    params.data && <>
                        <p>wtest params.data.content, {JSON.stringify(params.data.content)}</p>
                        <p>--- wtest</p>
                    </>
                } */}
                {
                    editOrAddBtnStatusCheck(accessCheckParams) && isEditItem ?
                        <>
                            <FormForLearningItem params={{
                                ...params,
                                // user: session.user
                                authorId: session?.user?.userId ? session.user.userId : undefined,
                            }}></FormForLearningItem>
                        </> : 
                        (
                            (() => {
                                switch(params.group) {
                                    case 'management':
                                        // console.log('wtest authorId', session?.user?.userId ? session?.user?.userId : '??')
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
                                                    authorId={session?.user?.userId ? session.user.userId : undefined}></ItemUser> : null
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
                    {/* editOrAddBtnStatusCheck: {JSON.stringify(editOrAddBtnStatusCheck(accessCheckParams))} */}
                    {
                        editOrAddBtnStatusCheck(accessCheckParams) && (params.group === 'learning' || (params.group === 'management' && isEditItem)) &&
                        <button className={editOrAddBtnStatusCheck(accessCheckParams) ? 'available' : 'disabled'} onClick={ToggleAddItem}>
                            {/* checkAddStatus wtest */}
                            {isEditItem ? 'Cancel Edit' : 'Edit Item'
                            }
                        </button>
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
                                            // group={params.group}
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
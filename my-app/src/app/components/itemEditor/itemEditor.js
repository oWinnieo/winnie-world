'use client'
import { FormForLearningItem } from "./itemForm"
import { EditorComment } from '@components/editorComment/editorComment'
import { useState, useContext } from 'react'
import { htmlDecode } from '@/lib/utils';
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import { ListNavItem } from '@components/listNavItem/listNavItem'
import { ItemUser } from '@/app/components/itemUser/itemUser';
import { ItemComment } from '@components/itemComment/itemComment';
import {
    ifLogined,
    userLoginedSameWithAuthor,
    ifLoginedAsAdmin,
    editOrAddBtnStatusCheck
} from '@/lib/auth'


import './itemEditor.scss';
// import MyContext from '@/app/contexts/MyContext' // wtest context
export const ItemEditor = ({ params, type }) => {
    // console.log('wtest ItemEditor params.urlDomain >>>>>>>>>>>>>', params.urlDomain)
    // console.log('params.collectionName', params.collectionName)
    // console.log('params.urlDomain', params.urlDomain)
    /* wtest auth mock */
    const session = sessionInfo()
    /* /wtest auth mock */
    const [ isEditItem, setIsEditItem ] = useState(false)
    const { showAlert } = useAlert()
    const { openModal } = useModal()
    const ToggleAddItem = () => {
        console.log('')
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
    const [areaName, setAreaName] = useState('comment')
    const areaSwitch = ({ areaName }) => {
        setAreaName(areaName)
    }
    const [replyCommentInfo, setReplyCommentInfo] = useState({})
    const makeReply = ({ commentId }) => {
        // console.log('commentId', commentId)
        setReplyCommentInfo(params?.data?.comments.find(com => com._id === commentId))
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
            {/* <p>wtest session.user.userId 1: {JSON.stringify(session?.user?.userId)}</p> */}
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
                                authorId: session?.user?.userId ? session.user.userId : '?? wtest waiting',
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
                        <button onClick={() => areaSwitch({ areaName: 'comment'})}>Comments ({params.data.comments?.length})</button>
                        <button onClick={() => areaSwitch({ areaName: 'like'})}>Like</button>
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
                                            accessStatus={
                                                userLoginedSameWithAuthor({
                                                    session,
                                                    data: comment,
                                                    authorInfo: comment.authorInfo
                                                }) || ifLoginedAsAdmin({ session })}></ItemComment>
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
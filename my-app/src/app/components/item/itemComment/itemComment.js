'use client' // wtest_here_fetch
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
/* wtest pw */
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
/* /wtest pw */
import { strSliced } from '@/lib/utils'
import { UserRound, MessageCircleReply, CircleX, Heart, Star } from 'lucide-react'
import './itemComment.scss'

const itemDelete = async ({ params, id }) => {
    const res = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
        method: 'DELETE',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({ id })
    })
    const dataRes = await res.json();
    if (dataRes.success) {
        console.log(dataRes.message)
        window.location.reload()
    } else {
        throw new Error('Failed to delete an item.')
    }
}

const interactClick = async ({ type, params, session, showAlert }) => {
    if (!session || !session.user || !session.user.userId) {
        showAlert({
            message: 'Please sign in to continue.'
        })
        return undefined
    }
    const dataUpdated = {
        belongToItemId: params.id,
        belongToItemCollection: params.collectionName,
        authorId: session.user.userId
    }
    try {
        const res = await fetch(`${params.urlDomain}?collectionName=${type}&belongToItemId=${params.belongToItemId}&belongToItemCollection=${params.belongToItemCollection}`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({ ...dataUpdated }) // wtest user: params.user
        })
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

export const ItemComment = ({ comment, makeReply, urlDomain, accessEditStatus, accessStatus, session }) => {
    const { showAlert } = useAlert()
    const { openModal, closeModal } = useModal()
    const delConfirm = ({ nameForConfrom }) => {
        openModal(
            {
                title: 'del confirm',
                content: `<${nameForConfrom}>: Are you sure to delete this item? (If yes, please enter the world \'delete\')`,
                childEl: () => (
                    <ModalContent valueHandler={enterDelWord} />
                )
                // closeModal={closeModal} // wtest backup
                
            },
        )
    }
    /* enterDelWord */
    const enterDelWord = (val) => {
        if (val === 'delete') {
            showAlert({
                message: 'delete confirm',
                type: "success",
            })
            closeModal()
            itemDelete({ params: {
                urlDomain,
                collectionName: 'comment',
            }, id: comment._id })
        } else {
            showAlert({
                message: 'don\'t delete',
                type: 'danger'
            })
        }
    }
    /* /enterDelWord */
    return (
        <li className="comment-area" key={comment._id}>
            <div className="comment-info">
                {comment?.authorInfo?.image ?
                <p className="comment-author">
                    <AvatarOfUser
                        srcImage={comment.authorInfo.image}
                    ></AvatarOfUser>
                    <span>{comment.authorInfo.name}</span>
                </p>: 'authorName (wtest)'}
                <div className="comment-tools">
                    <button
                        className='btn-like'
                        onClick={() => interactClick({
                            type: 'like', params: {
                            id: comment._id,
                            collectionName: 'comment',
                            urlDomain
                        }, session, showAlert })}>
                        <Heart className={comment.likeStatus ? 'text-red-500' : ''} />
                        <span className="count">({comment.like})</span>
                    </button>
                    <button
                        className='btn-favorite'
                        onClick={() => interactClick({
                            type: 'favorite', params: {
                            id: comment._id,
                            collectionName: 'comment',
                            urlDomain
                        }, session, showAlert })}>
                        <Star className={comment.favoriteStatus ? 'text-red-500' : ''} />
                        <span className="count">({comment.favorite})</span>
                    </button>
                    {accessStatus && <>
                        <button
                            className='btn-reply'
                            onClick={() => makeReply({ commentId: comment._id })}><MessageCircleReply /></button>
                        {
                            accessEditStatus && <button
                                className="btn-delete btn-hover"
                                onClick={() => delConfirm({ nameForConfrom: strSliced(comment.content, 20) })}
                                ><CircleX /></button>
                        }
                    </>}
                        
                </div>
            </div>
            <div className="comment-content">
                {comment.replyToCommentInfo && 
                    <div className="area-reply">
                        <div className="reply-content">{comment.replyToCommentInfo.content}</div> 
                        <div className="reply-author"><UserRound /> {comment.replyToCommentInfo.authorInfo.name}</div>
                    </div>
                }
                <div>{comment.content}</div>
            </div>
        </li>
    )
}

// export const ItemComment = () => {
//     return <p>ItemComment inside wtest_here_fetch -- 3</p>
// }
'use client' // wtest_here_fetch
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
/* wtest pw */
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
/* /wtest pw */
import { strSliced } from '@/lib/utils'
import './itemComment.scss'

const itemDelete = async ({ params, id }) => {
    console.log('wtest delete >>>>>>>>>>>', 'params', params, 'id', id)
    // const encodedId = encodeURIComponent(id); // wtest waiting not reason
    const res = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, { // wtest waiting ?id=${encodedId}
        method: 'DELETE',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({ id }) // wtest waiting
    })
    const dataRes = await res.json();
    if (dataRes.success) {
        console.log(dataRes.message)
        window.location.reload() // wtest backup
    } else {
        throw new Error('Failed to delete an item.')
    }
}

export const ItemComment = ({ comment, makeReply, urlDomain, accessStatus }) => {
    console.log('itemComment wtest auth', accessStatus, 'comment', comment)
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
        if (val === 'delete') { // wtest delete
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
                    <button className='btn-reply' onClick={() => makeReply({ commentId: comment._id })}>Reply</button>
                    {/* <button className="btn-delete" onClick={() => wtest_delete()}>delete</button> */}
                    {accessStatus && <button
                        className="btn-delete btn-hover"
                        onClick={() => delConfirm({ nameForConfrom: strSliced(comment.content, 20) })}
                    >Delete</button>}
                    </div>
            </div>
            {/* why: {JSON.stringify(comment?.authorInfo?.image)} */}
            
            <div className="comment-content">
                {comment.replyToCommentInfo && 
                <p className="area-reply">{comment.replyToCommentInfo.content} (By: {JSON.stringify(comment.replyToCommentInfo.authorInfo.name)})</p>
                }
                <p>{comment.content}</p>
                {/* <p>wtest: {JSON.stringify(comment.replyToCommentInfo)}</p> */}
            </div>
            
            {/* accessCheck() */}
        </li>
    )
}

// export const ItemLearning = () => {
//     return <p>ItemLearning inside wtest here fetch -- 1</p>
// }
'use client'
import Link from 'next/link'
import { timeFormatter } from '@/lib/utils';
/* wtest pw */
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
/* /wtest pw */
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import './itemLearning.scss'

const itemDelete = async ({ params, id }) => {
    console.log('wtest delete >>>>>>>>>>> 111', 'params', params, 'id', id, `${params.urlDomain}?collectionName=${params.collectionName}`)
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

export const ItemLearning = ({ title, authorInfo, contentSliced, createdAt, collectionName, id, params, data }) => {
    /* wtest auth mock */
    const session = sessionInfo()
    /* /wtest auth mock */
    const itemUrl = `/learning/${collectionName}/${id}`
    /* wtest pw */
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
        if (val === '123') { // wtest delete
            showAlert({
                message: 'delete confirm',
                type: "success",
            })
            closeModal()
            itemDelete({ params, id })
        } else {
            showAlert({
                message: 'don\'t delete',
                type: 'danger'
            })
        }
    }
    /* /enterDelWord */
    /* /wtest pw */
    /* author name display */
    const authorNameDisplay = () => {
        return authorInfo?.userId ?
            (session?.user?.userId && authorInfo.userId === session?.user?.userId ? <span className="span-me">Me</span> : authorInfo.name)
            : '??'
    }
    /* /author name display */
    /* check if edit is available */
    const accessCheck = () => {
        return (authorInfo && session?.user?.userId && authorInfo?.userId && authorInfo.userId === session.user.userId) ||
            (session?.user?.userId && session?.user?.role && session.user.role === 'mainAdmin')
    }
    /* /check if edit is available */
    return (
        <div className="item-learning">
            {/* <p>wtest userID: {JSON.stringify(session?.user?.userId)}, {JSON.stringify(session?.user?.name)}</p> */}
            {/* <p>wtest session.user.userId wtest : {JSON.stringify(session?.user?.userId)}</p> */}
            {/* <p>wtest data.commentCount: {JSON.stringify(data.commentCount)}</p> */}
            <div className="item-info">
                <span className="item-info-1">
                    <span className="item-title">{title}</span>
                </span>
                <span className="item-info-2">
                    {data.commentCount !== 0 && <span>Comments: ({data.commentCount})</span>}
                    <span>By: <span className="item-author">{authorNameDisplay()}</span></span>
                </span>
            </div>
            {/* <p>wtest authorInfo userId, {authorInfo?.userId ? authorInfo.userId : '?'}, session userId, {session?.user?.userId ? session.user.userId : '?'}</p> */}
            <p>{contentSliced}</p>
            <p>{timeFormatter(createdAt)}</p>
            <Link href={itemUrl}>More...</Link>
            {/* <p>wtest {JSON.stringify(session.user.userId)}</p> */}
            {accessCheck() && <button
                className="btn-delete btn-hover"
                onClick={() => delConfirm({ nameForConfrom: title })}
            >Delete</button>}
        </div>
    )
}
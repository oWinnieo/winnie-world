'use client'
import Link from 'next/link'
import { timeFormatter } from '@/lib/utils';
/* wtest pw */
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
/* /wtest pw */
import { MessageSquareMore, UserRound, Heart, Star, Share2 } from 'lucide-react'
import './itemLearning.scss'

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

export const ItemLearning = ({ title, authorInfo, contentSliced, createdAt, collectionName, id, params, data, session }) => {
    const itemUrl = `/learning/${collectionName}/${id}`
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
            itemDelete({ params, id })
        } else {
            showAlert({
                message: 'don\'t delete',
                type: 'danger'
            })
        }
    }
    /* /enterDelWord */
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
            <div className="item-info">
                <span className="item-info-1">
                    <span className="item-title">{title}</span>
                </span>
                <span className="item-info-2">
                    {data.countShare !== 0 &&
                    <span>
                        <Share2 />
                        <span className="count">({data.countShare})</span>
                    </span>}
                    {data.countComment !== 0 &&
                    <span>
                        <MessageSquareMore />
                        <span className="count">({data.countComment})</span>
                    </span>}
                    {data.countLike !== 0 &&
                    <span>
                        <Heart />
                        <span className="count">({data.countLike})</span>
                    </span>}
                    {data.countFavorite !== 0 &&
                    <span>
                        <Star />
                        <span className="count">({data.countFavorite})</span>
                    </span>}
                    <span>
                        <UserRound />
                        <span className="item-author">{authorNameDisplay()}</span>
                    </span>
                </span>
            </div>
            <p>{contentSliced}</p>
            <p>{timeFormatter(createdAt)}</p>
            <Link href={itemUrl}>More...</Link>
            {accessCheck() && <button
                className="btn-delete btn-hover"
                onClick={() => delConfirm({ nameForConfrom: title })}
            >Delete</button>}
        </div>
    )
}
'use client'
import Link from 'next/link'
import { timeFormatter } from '../../../../lib/util'
import { htmlDecode } from '@/lib/utils';
/* wtest pw */
import { useAlert } from '@/app/contexts/AlertContext' // wtest alert
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContent } from '@/app/components/modal/modalContent'
/* /wtest pw */
import { useSession } from "next-auth/react"; // wtest auth
import { userInfo } from '@/app/mock/userInfo' // wtest mock
import './learningItem.scss'

const itemDelete = async ({ params, id }) => {
    // const encodedId = encodeURIComponent(id); // wtest waiting not reason
    const res = await fetch(`${params.urlDomainLearning}?collectionName=${params.collectionName}`, { // wtest waiting ?id=${encodedId}
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

export const LearningItem = ({ title, authorInfo, contentSliced, createdAt, collectionName, id, params }) => {
    const { data: session } = useSession(); // wtest auth
    /* wtest auth mock *
    const session = {
        user: userInfo
    }
    // console.log('session', session)
    /* /wtest auth mock */
    const itemUrl = `/learning/${collectionName}/${id}`
    /* wtest pw */
    const { showAlert } = useAlert() // wtest alert
    const { openModal, closeModal } = useModal()
    const confirmDel = () => {
        openModal(
            {
                title: 'del confirm',
                content: 'Are you sure to delete this item? (If yes, please enter the world \'delete\')',
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
            console.log('wtest delete >>>>>>>>>>>', 'params', params, 'id', id)
            // itemDelete({ params, id })
        } else {
            showAlert({
                message: 'don\'t delete',
                type: 'danger'
            })
        }
        // let t1 = setTimeout(() => {
        //     clearTimeout(t1)
        // }, 3000)
    }
    /* /enterDelWord */
    /* /wtest pw */
    /* author name display */
    const authorNameDisplay = () => {
        return authorInfo?.name ?
            (session?.user?.name && authorInfo.name === session?.user?.name ? <span className="span-me">Me</span> : authorInfo.name)
            : '??'
    }
    /* /author name display */
    return (
        <div className="item-learning">
            {/* <p>wtest userID: {JSON.stringify(session?.user?.userId)}, {JSON.stringify(session?.user?.name)}</p> */}
            {/* <p>authorInfo: {JSON.stringify(authorInfo.name)}</p> */}
            <h3 className="item-author">{title} (By: {authorNameDisplay()})</h3>
            <p>wtest authorInfo userId, {authorInfo?.userId ? authorInfo.userId : '?'}, session userId, {session?.user?.userId ? session.user.userId : '?'}</p>
            <p>{contentSliced}</p>
            <p>{timeFormatter(createdAt)}</p>
            <Link href={itemUrl}>More...</Link>
            {/* <p>wtest {JSON.stringify(session.user.userId)}</p> */}
            {authorInfo && session?.user?.userId && authorInfo?.userId && authorInfo.userId === session.user.userId && <button
                className="btnDelete"
                onClick={confirmDel}
            >Delete</button>}
        </div>
    )
}
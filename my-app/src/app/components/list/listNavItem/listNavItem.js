'use client'
import Link from 'next/link'
import { useAlert } from '@/app/contexts/AlertContext'
import { useModal } from '@/app/contexts/ModalContext'
import { ModalContentDelConfirm } from '@/app/components/dialogElement/modal/modalContentDelConfirm'

export const itemDelete = async ({ params, id }) => {
    const res = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
        method: 'DELETE',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({ id })
    })
    const dataRes = await res.json();
    if (dataRes.success) {
        window.location.reload()
    } else {
        throw new Error('Failed to delete an item.')
    }
}

export const ListNavItem = ({ status, item, isEditItem, ToggleAddItem, params, id }) => {
    const { showAlert } = useAlert()
    const { openModal, closeModal } = useModal()
    /* enterDelWord */
    const enterDelWord = (val) => {
        if (val === 'delete') {
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
    const delConfirm = ({ nameForConfrom }) => {
        openModal(
            {
                title: 'del confirm',
                content: `<${nameForConfrom}>: Are you sure to delete this item? (If yes, please enter the world \'delete\')`,
                childEl: () => (
                    <ModalContentDelConfirm valueHandler={enterDelWord} />
                )
                // closeModal={closeModal} // wtest backup
            },
        )
    }
    return (
        <li className="li-list-nav" key={item.title}>
            <Link href={`/${item?.groupName}/${item.colName}`}>{item.title}</Link>
            {status &&
                <div className="area-content-tools">
                    <button className={status ? 'available' : 'disabled'} onClick={ToggleAddItem}>
                        {/* checkAddStatus wtest */}
                        {isEditItem ? 'Cancel Edit' : 'Edit Item'
                        }
                    </button>
                    <button
                        onClick={() => delConfirm({ nameForConfrom: item.title })}>Delete</button>
                </div>
            }
        </li>
    )
}


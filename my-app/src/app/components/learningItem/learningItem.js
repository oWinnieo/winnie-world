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
    /* wtest 1 *
    const res = await fetch(params.urlDomain, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
    
      const data = await res.json();
      if (data.success) {
        console.log('res: ok');
        // 重新获取列表
        // fetchItems();
        // window.location.reload() // wtest backup
      } else {
        console.error('Failed to delete an item.:', data.error);
      }
      // wtest why deleteById -> findByIdAndDelete no work
    /* /wtest 1 */
}

export const LearningItem = ({ title, author, content, contentSliced, createdAt, collectionName, id, params }) => {
    const { data: session } = useSession(); // wtest auth backup
    /* wtest auth mock *
    const session = {
        user: userInfo
    }
    /* /wtest auth mock */
    const itemUrl = `/learning/${collectionName}/${id}`
    /* wtest pw */
    const { showAlert } = useAlert() // wtest alert
    const { openModal, closeModal } = useModal()
    const checkDelStatus = () => {
        openModal(
            {
                title: 'pw check',
                content: 'Please enter password for editing.',
                childEl: (closeModal) => (
                    <ModalContent closeModal={closeModal} valueHandler={pwCheck} />
                )
                
            },
        )
    }
    /* pw check */
    const pwCheck = (val) => {
        if (val === '123') { // wtest xiaow233
            showAlert({
                message: 'pw ok',
                type: "success",
            })
            closeModal()
            // ToggleAddItem()
            itemDelete({ params, id })
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
    /* /wtest pw */
    return (
        <div className="item-learning">
            <h3>{title} (Author: {author?.name ? author.name : '??'})</h3>
            <p>{contentSliced}</p>
            {/* <p>---</p> */}
            {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
            {/* <div>{htmlDecode(content, 'show')}</div> */}
            <p>{timeFormatter(createdAt)}</p>
            {/* <p>wtest: id: {id}</p> */}
            <Link href={itemUrl}>More...</Link>
            {author && author.userId && author.userId === session.user.userId && <button
                className="btnDelete"
                onClick={checkDelStatus}
            >Delete</button>}
        </div>
    )
}
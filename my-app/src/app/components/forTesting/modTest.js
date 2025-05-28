'use client'
import { useModal } from '@/app/contexts/ModalContext' // wtest modTest
import { ModalContentDelConfirm } from '@/app/components/dialogElement/modal/modalContentDelConfirm'
import { useAlert } from '@/app/contexts/AlertContext'

export const ModTest = ({ urlDomain }) => {
    // fetch(urlDomain + "/api/listNav", {
    //     method: "GET",
    //     credentials: "include", // 重要！确保带上 Cookie
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.error(err));
    /* wtest modTest */
    const { showAlert } = useAlert()
    const { openModal } = useModal()
    const pwCheck = (val) => {
        // console.log('val', val)
        showAlert({
            message: `value = ${val}`,
            type: "success",
        })
    }
    const test = () => {
        openModal(
            {
                title: 'test',
                content: 'show the val',
                childEl: () => (
                    <ModalContentDelConfirm valueHandler={pwCheck} />
                )
                // closeModal={closeModal} // wtest backup
                
            },
        )
      }
      /* /wtest modTest */
    return (
        <p className="modTest">
            {/* <p>wtest {JSON.stringify(session)}</p> */}
            <button onClick={test}>123</button>
        </p>
    )
}


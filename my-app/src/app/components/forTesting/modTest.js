'use client'
import { useModal } from '@/app/contexts/ModalContext' // wtest modTest
import { ModalContent } from '@/app/components/modal/modalContent'
import { useAlert } from '@/app/contexts/AlertContext' // wtest alert

export const ModTest = () => {
    /* wtest modTest */
    const { showAlert } = useAlert() // wtest alert
    const { openModal } = useModal()
    const pwCheck = (val) => {
        console.log('val', val)
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
                    <ModalContent valueHandler={pwCheck} />
                )
                // closeModal={closeModal} // wtest backup
                
            },
        )
      }
      /* /wtest modTest */
    return (
        <p className="modTest">111
            <button onClick={test}>123</button>
        </p>
    )
}


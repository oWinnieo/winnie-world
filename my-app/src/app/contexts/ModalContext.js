'use client'
import { createContext, useState, useContext } from 'react'
import { Modal } from '@/app/components/modal/modal'

const ModalContext = createContext()

// export const ModalProvider = ({ children }) => {
//     // const [ modal, setModal ] = useState({ title: "", content: "", visible: false })
//     const [ modalContent, setModalContent ] = useState(null)
//     const [ isOpen, setIsOpen ] = useState(false)
//     console.log('wtest ??')
//     const [ modalState, setModalState ] = useState({password: 'wtest-1'}) // wtest {}

//     const openModal = ({
//         title,
//         content,
//         childEl,
//         initialState = {}
//     }) => {
//         setModalContent({
//             title,
//             content,
//             childEl,
//         })
//         setModalState(initialState) // wtest 
//         setIsOpen(true)
//     }
//     const closeModal = () => {
//         setIsOpen(false)
//         setModalState({}) // wtest null
//         let tModal = setTimeout(() => {
//             clearTimeout(tModal)
//             setModalContent(null)
//         }, 300)
//     }

//     return (
//         <ModalContext.Provider value={{ openModal, closeModal, modalState, setModalState }}>
//             <p>wtest: {JSON.stringify(modalState)}</p>
//             {children}
//             {isOpen && modalContent &&
//             // <Modal title={modal.title} content={modal.content} />
//             // isOpen={isModalOpen} onClose={closeModal}
//             <Modal
//                 title={modalContent.title}
//                 content={modalContent.content}
//                 >
//                 {/* <h2></h2> */}
//                 {/* <p>This is the content of the modal.</p> */}
//                 {modalContent.childEl}
//             </Modal>
//             }
//         </ModalContext.Provider>
//     )
// }

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
  
    const openModal = (content) => {
      setModalContent(content);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
      setModalContent(null);
    };
  
    return (
      <ModalContext.Provider value={{ openModal, closeModal }}>
        {children}
        {isOpen && modalContent && (
          <Modal title={modalContent.title} content={modalContent.content}>
            {modalContent.childEl(closeModal)}
          </Modal>
        )}
      </ModalContext.Provider>
    );
  };

export const useModal = () => {
    return useContext(ModalContext)
}





/* 调用 backup wtest
<>
                        <p>wtest 123: {JSON.stringify(modalState)}</p>
                        <input
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        // password
                        value={modalState.password || ""} // wtest modalState.password
                        onChange={
                            // e => {
                            // 
                            // // setModalState({ ...modalState, password: e.target.value })
                            // // setModalState({ ...modalState, password: e.target.value });
                            // }
                            (e) => {
                                console.log('input onchange', e.target.value)
                                setModalState({ ...modalState, password: e.target.value })
                            }
                        }
                        ></input>
                        * e => setPw(e.target.value) *
                        <button onClick={pwCheck}>check</button>
                    </>
                    */
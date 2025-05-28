'use client'
import { createContext, useState, useContext } from 'react'
import { Modal } from '@/app/components/dialogElement/modal/modal'

const ModalContext = createContext()

// export const ModalProvider = ({ children }) => {
//     // const [ modal, setModal ] = useState({ title: "", content: "", visible: false })
//     const [ modalContentState, setModalContentState ] = useState(null)
//     const [ isOpen, setIsOpen ] = useState(false)
//     const [ modalState, setModalState ] = useState({password: 'wtest-1'}) // wtest {}

//     const openModal = ({
//         title,
//         content,
//         childEl,
//         initialState = {}
//     }) => {
//         setModalContentState({
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
//             setModalContentState(null)
//         }, 300)
//     }

//     return (
//         <ModalContext.Provider value={{ openModal, closeModal, modalState, setModalState }}>
//             <p>wtest: {JSON.stringify(modalState)}</p>
//             {children}
//             {isOpen && modalContentState &&
//             // <Modal title={modal.title} content={modal.content} />
//             // isOpen={isModalOpen} onClose={closeModal}
//             <Modal
//                 title={modalContentState.title}
//                 content={modalContentState.content}
//                 >
//                 {/* <h2></h2> */}
//                 {/* <p>This is the content of the modal.</p> */}
//                 {modalContentState.childEl}
//             </Modal>
//             }
//         </ModalContext.Provider>
//     )
// }

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContentState, setModalContentState] = useState(null);
  
    const openModal = (content) => {
      setModalContentState(content);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
      setModalContentState(null);
    };
  
    return (
      <ModalContext.Provider value={{ openModal, closeModal }}>
        {children}
        {isOpen && modalContentState && (
          <Modal title={modalContentState.title} content={modalContentState.content}>
            {modalContentState.childEl(closeModal)}
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
                                setModalState({ ...modalState, password: e.target.value })
                            }
                        }
                        ></input>
                        * e => setPw(e.target.value) *
                        <button onClick={pwCheck}>check</button>
                    </>
                    */
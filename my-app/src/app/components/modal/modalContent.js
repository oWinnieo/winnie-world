import { useState } from 'react'
export const ModalContent = ({ closeModal, valueHandler }) => {
    const [pw, setPw] = useState("");
    return (
      <>
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button onClick={() => valueHandler(pw)}>Check</button>
      </>
    );
  };
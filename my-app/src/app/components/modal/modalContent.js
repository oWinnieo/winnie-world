'use client'
import { useState } from 'react'
import './modal.scss'
export const ModalContent = ({ valueHandler }) => {
    const [val, setVal] = useState("");
    const handleKeyDown = (e) => {
      // 检查按下的键是否为回车键（keyCode 为 13 或者 key 为 'Enter'）
      if (e.key === 'Enter') {
          valueHandler(val);
      }
  };
    return (
      <div className="modal-content">
        {/* <p>wtest</p> */}
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown} // 添加按键事件监听
        />
        <p>
          <button onClick={() => valueHandler(val)}>Check</button>
        </p>
      </div>
    );
  };
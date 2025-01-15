'use client'
import { FormAddItem } from "./formAddItem"
import { useState } from 'react'
export const AddItem = ({ addSuccess }) => {
    let [ isAddItem, setIsAddItem ] = useState(false)
    const ToggleAddItem = () => {
        setIsAddItem((val) => !val)
    }
    console.log('AddItem addSuccess', addSuccess)
    return (
        <>
            {/* <p>wtest: {JSON.stringify(isAddItem)}</p> */}
            <button onClick={ToggleAddItem}>
                {isAddItem ? 'Cancel Adding' : 'Add Item'}
            </button>
            {
                isAddItem ? <FormAddItem addSuccess={addSuccess}></FormAddItem> : null
            }
        </>)
}
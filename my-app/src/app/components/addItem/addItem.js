'use client'
import { FormAddItem } from "./formAddItem"
import { useState } from 'react'
export const AddItem = () => {
    let [ isAddItem, setIsAddItem ] = useState(false)
    const ToggleAddItem = () => {
        setIsAddItem((val) => !val)
    }
    return (
        <>
            {/* <p>wtest: {JSON.stringify(isAddItem)}</p> */}
            <button onClick={ToggleAddItem}>
                {isAddItem ? 'Cancel Adding' : 'Add Item'}
            </button>
            {
                isAddItem ? <FormAddItem></FormAddItem> : null
            }
        </>)
}
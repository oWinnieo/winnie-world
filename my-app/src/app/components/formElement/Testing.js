import './formElement.scss'
import { useState, useEffect } from 'react'
export const Testing = ({value, onChange}) => {
    const [val, setVal] = useState()
    // useEffect(() => {
    //     console.log('val changed', val)
    //     onChange(val)
    // }, [val])
    return (
        <>
        <p>11</p>
        {/* value={value} onChange={onChange} */}
            <input className="testing"  type="text" />
        </>
    )
}
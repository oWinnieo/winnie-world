'use client'
import { useState } from 'react';
import './addItem.scss';
export const FormAddItem = () => {
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('e', e)
        if (!title || !content) {
            alert('Title and content should not be empty!')
            return
        }
        try {
            const res = await fetch('http://winnie-online.win/api/learning-item', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({ title, content })
            })
            if (res.ok) {
                console.log('res: ok')
                console.log('AddItem addSuccess', addSuccess)
                window.location.reload()
            } else {
                throw new Error('Failed to create an item.')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="area-form flex flex-col gap-3">
            <input
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}></input>
            <input
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Content"
                onChange={e => setContent(e.target.value)}></input>
            <button>Submit</button>
        </form>
    )
}
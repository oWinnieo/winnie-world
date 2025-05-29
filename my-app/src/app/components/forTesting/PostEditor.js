'use client'
import { useState } from 'react'
import './PostEditor.scss'

async function handlePublish(postContent) {
    console.log('postContent', postContent)
    debugger;
    // const res = await fetch(`/api/moderate`, {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ content: postContent })
    // })


    // const res = await fetch('/api/moderate', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ content: postContent }),
    // })
    // debugger;
    // const data = await res.json()

    const res = await fetch('/api/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: '待审核的内容' }),
    })
    debugger;

    const data = await res.json()
    console.log(data)
    debugger;

    // const result = await res.json()

    // if (!result.ok) {
    //     alert('内容未通过审核：' + Object.keys(result.reasons).join(', '))
    //     return
    // }

    // 启动真正的发布逻辑
    //   await publishPost(postContent)
}

const PostEditor = ({ urlDomain }) => {
    // console.log('urlDomain 123', urlDomain)
    const [content, setContent] = useState('')

    const onSubmit = async () => {
        await handlePublish(content)
    }

    return (
        <div>
        <textarea className="textarea" value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={onSubmit}>发布</button>
        </div>
    )
}

export { PostEditor }

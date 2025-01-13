'use client'
import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItem } from '@/app/components/learningItem/learningItem'
import { AddItem } from '@/app/components/addItem/addItem'
import { useState } from 'react'
import Link from 'next/link'

// const getItems = async () => {
//     try {
//         const res = await fetch('http://localhost:3000/api/learning-item', {
//             cache: 'no-store'
//         })

//         if (!res.ok) {
//             throw new Error('Failed to fetch data')
//         }
//         return res.json()
//     } catch (error) {
//         console.log('Error loading items: ', error)
//     }
// }

export default function LearningEnglish () {
    let [ isAddItem, setIsAddItem ] = useState(false)
    const ToggleAddItem = () => {
        setIsAddItem((val) => !val)
    }
    // const { items } = await getItems()
    return (
        <PageWrap>
            <AreaTitle>English Learning</AreaTitle>
            {/* <p>wtest: {JSON.stringify(isAddItem)}</p> */}
            <button onClick={ToggleAddItem}>
                {isAddItem ? 'Cancel Adding' : 'Add Item'}
            </button>
            {isAddItem ? // wtest backup isAddItem / true
                <AddItem></AddItem> : null
            }
            <div>Learning List will be here.</div>
            <ul>
                {/* {items.map(i => (
                    // <li>
                    //     <LearningItem
                    //         title="aha t"
                    //         content="aha c"
                    //     ></LearningItem>
                    // </li>
                    <p>{JSON.stringify(i)}</p>
                ))} */}
            </ul>
        </PageWrap>
    )
}
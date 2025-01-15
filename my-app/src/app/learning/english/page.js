// app/page.tsx
import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItem } from '@/app/components/learningItem/learningItem'
import { AddItem } from '@/app/components/addItem/addItem'
// import { useState } from 'react'
import Link from 'next/link'

export default async function LearningEnglish() {
    const { data } = await fetch('http://localhost:3000/api/learning-item', {
      cache: 'no-store', // 等效于 SSR 的行为
    }).then(res => res.json());
  
    return (
      <div>
        <PageWrap>
            <AreaTitle>English Learning</AreaTitle>
            {/* <button onClick={addItem}>submit wtest</button> */}
            {/* <p>wtest: {JSON.stringify(isAddItem)}</p> */}
            <AddItem></AddItem>
            <div>Learning List will be here.</div>
            {/* <div>{JSON.stringify(data)}</div> */}
            <ul>
                {data.map(i => (
                    <li key={i._id}>
                        <LearningItem
                            title={i.title}
                            content={i.content}
                        ></LearningItem>
                    </li>
                    // <p>{JSON.stringify(i)}</p>
                ))}
            </ul>
        </PageWrap>
      </div>
    );
  }
// 'use client'



// const LearningEnglish = () => {
    // const { items } = await getItems()
//     return (
        
//     )
// }

// export async function getServerSideProps () {
//     try {
//         const res = await fetch('http://localhost:3000/api/learning-item');
//         const data = await res.json();
//         return { props: { data } };
//       } catch (error) {
//         console.error(error);
//         return { props: { data: null } };
//       }
// }

// export default LearningEnglish
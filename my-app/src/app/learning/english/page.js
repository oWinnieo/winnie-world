// app/page.tsx
import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { AddItem } from '@/app/components/addItem/addItem'
// import { useState } from 'react'
export default function LearningEnglish() {
    return (
      <div>
        <PageWrap>
            <AreaTitle>English Learning</AreaTitle>
            {/* <button onClick={addItem}>submit wtest</button> */}
            {/* <p>wtest: {JSON.stringify(isAddItem)}</p> */}
            <AddItem></AddItem>
            <div>Learning List will be here.</div>
            {/* <div>{JSON.stringify(data)}</div> */}
            <LearningItemList></LearningItemList>
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
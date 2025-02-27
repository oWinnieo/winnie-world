// app/page.tsx
// 'use client'
import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { AddItem } from '@/app/components/addItem/addItem'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
export default function LearningEnglish() {
    // const wtest_d = useRouter()
    // console.log('wtest_d', wtest_d.asPath)
    return (
      <div>
        <PageWrap>
            <AreaTitle>English Learning</AreaTitle>
            {/* <button onClick={addItem}>submit wtest</button> */}
            {/* <p>wtest: {JSON.stringify(isAddItem)}</p> */}
            <AddItem></AddItem>
            {/* <div>Learning List will be here.</div> */}
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
//         const res = await fetch('https://localhost:3000/api/learning-item');
//         const data = await res.json();
//         return { props: { data } };
//       } catch (error) {
//         console.error(error);
//         return { props: { data: null } };
//       }
// }

// export default LearningEnglish
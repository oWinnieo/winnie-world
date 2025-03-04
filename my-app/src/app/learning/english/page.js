// app/page.tsx
// 'use client'
import { useContext } from 'react'
import { PageWrap } from '@components/pageWrap/pageWrap'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'

// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
export default function LearningEnglish() {
    // const wtest_d = useRouter()
    // console.log('wtest_d', wtest_d.asPath)
    const urlDomain = process.env.URL_DOMAIN + '/api/learning-item'
    /* wtest context */
    // const { data, setData } = useContext(MyContext)
    // const sharedState = 'Shared State'
    // const sharedFunction = () => {
    //   console.log('sharedFunction')
    // }
    /* /wtest context */

    return (
      <>
        <PageWrap>
            <AreaTitle>English Learning</AreaTitle>
            {/* <button onClick={addItem}>submit wtest</button> */}
            {/* <p>wtest: {JSON.stringify(isAddItem)}</p> */}
            
            <ItemEditor
              params={
                {
                  urlDomain,
                  collectionName: 'english'
                }
              }
            ></ItemEditor>
            {/* <div>Learning List will be here.</div> */}
            {/* <div>{JSON.stringify(data)}</div> */}
            <LearningItemList
              params={
                {
                  urlDomain,
                  collectionName: 'english'
                }
              }
            ></LearningItemList>
        </PageWrap>
      </>
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
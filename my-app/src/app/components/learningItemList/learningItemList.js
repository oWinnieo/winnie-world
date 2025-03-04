// 'use client'
import { LearningItem } from '@/app/components/learningItem/learningItem'
import { htmlDecode, htmlDecodeSlice, html2txt } from '@/lib/utils';

const getListData = async (params) => {

    const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
        cache: 'no-store', // 等效于 SSR 的行为
        }).then(res => res.json());
    // }).then(res => {
    //     console.log('res', res.json())
    //     // return res.json()
    // });
    // // // // /* wtest */
    // // // console.log('data 1', data)
    const dataNew = data && data.length > 0 ? data.map(item => {
        return {
            ...item,
            contentSliced: html2txt(item.content)
        }
    }) : []
    // console.log('data', data)
    /* /wtest */
    return dataNew // wtest backup data
    // console.log('wtest_res', wtest_res)
    // return []
}

export const LearningItemList = async ({ params }) => {
    const listData = await getListData(params);
    console.log('wtest collectionName 123', params.collectionName)
    return (
        <ul>
            {/* {listData.length} */}
            {!listData || listData.length === 0 ? <p>Loading...</p> : listData.map(i => (
                <li key={i._id}>
                    <LearningItem
                        title={i.title}
                        // content={ReactHtmlParser(i.content)}
                        contentSliced={i.contentSliced}
                        createdAt={i.createdAt}
                        collectionName={params.collectionName}
                        id={i._id}
                        params={params}
                    ></LearningItem>
                </li>
            ))}
        </ul>
    )
}
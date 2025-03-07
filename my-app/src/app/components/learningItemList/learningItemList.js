// 'use client'
import { LearningItem } from '@/app/components/learningItem/learningItem'
import { htmlDecode, htmlDecodeSlice, html2txt } from '@/lib/utils';

const getListData = async (params) => {

    const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
        cache: 'no-store', // 等效于 SSR 的行为
        }).then(res => res.json());
    const dataNew = data && data.length > 0 ? data.map(item => {
        return {
            ...item,
            contentSliced: html2txt(item.content)
        }
    }) : []
    return dataNew
}

export const LearningItemList = async ({ params }) => {
    const listData = await getListData(params);
    // console.log('wtest collectionName 123', params.collectionName)
    return (
        <ul>
            {/* {listData.length} */}
            {!listData || listData.length === 0 ? <p>Loading...</p> : listData.map(i => (
                <li key={i._id}>
                    {/* <p>{JSON.stringify(i.author)}</p> */}
                    <LearningItem
                        title={i.title}
                        author={i.author}
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
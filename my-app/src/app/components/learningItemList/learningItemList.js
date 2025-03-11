// 'use client'
import { LearningItem } from '@/app/components/learningItem/learningItem'
import { UserItem } from '@/app/components/userItem/userItem';
import { htmlDecode, htmlDecodeSlice, html2txt } from '@/lib/utils';
import { collectionName as colNameMock } from '../../mock/collectionName' // wtest mock

const getListData = async (params) => {
    const { data } = await fetch(`${params.urlDomainLearning}?collectionName=${params.collectionName}&fetchType=list`, {
        cache: 'no-store', // 等效于 SSR 的行为
        }).then(res => res.json());
    const dataNew = data && data.length > 0 ? data.map(item => {
        const itemNew = colNameMock.includes(params.collectionName) ? {
            ...item,
            contentSliced: html2txt(item.content)
        } : item
        return itemNew
    }) : []
    return dataNew
}

export const LearningItemList = async ({ params }) => {
    const listData = await getListData(params);

    return (
        <ul>
            {!listData || listData.length === 0 ? <p>Loading...</p> : listData.map(i => (
                <li key={i._id}>
                    {/* <p>{JSON.stringify(i)}</p> */}
                    {
                        params.collectionName === 'user' ?
                            <UserItem
                                data={i}
                            ></UserItem> :
                            <LearningItem
                                title={i.title}
                                authorInfo={i.authorInfo}
                                contentSliced={i.contentSliced}
                                createdAt={i.createdAt}
                                collectionName={params.collectionName}
                                id={i._id}
                                params={params}
                            ></LearningItem>
                    }
                </li>
            ))}
        </ul>
    )
}
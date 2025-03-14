// 'use client'
import { LearningItem } from '@/app/components/learningItem/learningItem'
import { htmlDecodeSlice, html2txt, strSliced } from '@/lib/utils';
import { collectionNameForLearning as colLearning } from '../../../constants/collectionName' // wtest mock
import { userItemConfig } from '@/constants/formConfig'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'

const getListData = async (params) => {
    const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list`, {
        cache: 'no-store', // 等效于 SSR 的行为
        }).then(res => res.json());
        // console.log('data', data)
    const dataNew = data && data.length > 0 ? data.map(item => {
        const itemNew = colLearning.includes(params.collectionName) ? {
            ...item,
            contentSliced: strSliced(html2txt(item.content), 200)
        } : (
            params.collectionName === 'user' ? {
                ...item,
                isEditItem: false
            } : item
        )
        return itemNew
    }) : []
    // console.log('dataNew ============ itemlist', dataNew)
    return dataNew
}

export const LearningItemList = async ({ params }) => {
    const listData = await getListData(params);
    return (
        <ul>
            {!listData || listData.length === 0 ? <p>No Data</p> : listData.map(i => (
                <li key={i._id}>
                    {/* <p>{JSON.stringify(i)}</p> */}
                    {
                        params.collectionName === 'user' ?
                            <ItemEditor
                                params={
                                {
                                    group: 'management',
                                    urlDomain: params.urlDomain,
                                    collectionName: 'user', // wtest 'listNav',
                                    formConfig: userItemConfig, // wtest
                                    data: i,
                                }
                                }
                            ></ItemEditor>
                            :
                            <LearningItem
                                title={i.title}
                                authorInfo={i.authorInfo}
                                contentSliced={i.contentSliced}
                                createdAt={i.createdAt}
                                collectionName={params.collectionName}
                                id={i._id}
                                params={params}
                                data={i}
                            ></LearningItem>
                    }
                </li>
            ))}
        </ul>
    )
}
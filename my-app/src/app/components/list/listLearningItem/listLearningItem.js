'use client'
import { ItemLearning } from '@/app/components/item/itemLearning/itemLearning'
import { userItemConfig } from '@/constants/formConfig'
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'

export const ListLearningItem = ({ params, listData, session }) => {
    return (
        <ul>
            {!listData || listData.length === 0 ? <p>No Data</p> : listData.map(i => (
                <li key={i._id}>
                    {
                        params.collectionName === 'user' ?
                            <ItemEditor
                                params={
                                    {
                                        group: 'management',
                                        urlDomain: params.urlDomain,
                                        collectionName: 'user',
                                        formConfig: userItemConfig,
                                        data: i,
                                    }
                                }
                                session={session}
                            ></ItemEditor>
                            :
                            <ItemLearning
                                title={i.title}
                                authorInfo={i.authorInfo}
                                contentSliced={i.contentSliced}
                                createdAt={i.createdAt}
                                collectionName={params.collectionName}
                                id={i._id}
                                params={params}
                                data={i}
                                session={session}
                            ></ItemLearning>
                    }
                </li>
            ))}
        </ul>
    )
}
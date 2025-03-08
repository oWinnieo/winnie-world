// 'use client'
import { LearningItem } from '@/app/components/learningItem/learningItem'
import { UserItem } from '@/app/components/userItem/userItem';
import { htmlDecode, htmlDecodeSlice, html2txt } from '@/lib/utils';
import { collectionName as colNameMock } from '../../mock/collectionName' // wtest mock

const getListData = async (params) => {
    const { data } = await fetch(`${params.urlDomainLearning}?collectionName=${params.collectionName}&fetchType=list`, {
        cache: 'no-store', // 等效于 SSR 的行为
        }).then(res => res.json());
    // console.log('colNameMock', colNameMock)
        // console.log('data', data)
    const dataNew = data && data.length > 0 ? data.map(item => {
        const itemNew = colNameMock.includes(params.collectionName) ? {
            ...item,
            contentSliced: html2txt(item.content)
        } : item
        return itemNew
    }) : []
    // if (['english', 'japanese', 'server'].includes(params.collectionName)) {
        // const authorIdArr = dataNew.map(item => item.authorId)
        // console.log('authorIdArr', authorIdArr)
        // const { data } = await fetch(`${params.urlDomainUser}?collectionName=user&fetchType=list`, {
        //     cache: 'no-store', // 等效于 SSR 的行为
        //     }).then(res => res.json());
        // // 
        // const authorIdArr = ['321', '112233', '67']
        // // const user = await modelUser.findOne({ userId: '321' })
        // // const userArr = await modelUser.find({
        // //   userId: { $in: authorIdArr }
        // // })
        // // console.log('userArr', userArr)
        // console.log('user', user)
        // // const { authorId } = learningItems.json()
        // // const authorId = learningItems
        // console.log('collection need auth', authorIdArr)
        // // const 
    // }
    // debugger;
    return dataNew
    // return []
}

export const LearningItemList = async ({ params }) => {
    const listData = await getListData(params);

    return (
        <ul>
            {/* {listData.length} */}
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
                                author={i.author}
                                // content={ReactHtmlParser(i.content)}
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
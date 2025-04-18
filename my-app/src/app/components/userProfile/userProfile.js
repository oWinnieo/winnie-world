'use client'
import { useState, useEffect } from 'react'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import { tipsConst } from '@/constants/tipsConst'
import { Tips } from '@/app/components/tips/tips'
import { html2txt, strSliced } from '@/lib/utils';
import Link from 'next/link'
import './userProfile.scss'
export const UserProfile = ({ dataUser, urlDomain }) => {
    const [areaName, setAreaName] = useState('item')
    const [listData, setListData] = useState([])
    const dataSwitchHandler = async ({ urlDomain, dataType }) => {
        setListData([])
        const { data } = await fetch(`${urlDomain}?collectionName=${dataType}&fetchType=list&userId=${dataUser.userId}`, {
            cache: 'no-store'
        }).then(res => res.json())
        setListData(data)
    }

    useEffect(() => {
        if (areaName !== 'recent') {
            const fetchData = async () => {
                await dataSwitchHandler({ urlDomain, dataType: areaName })
            }
            fetchData()
        }
    }, [areaName])
    useEffect(() => {
        // const funInit = async () => {
        //     await dataSwitchHandler({ urlDomain, dataType: areaName })
        // }
        // funInit()
    }, [])
    return (
        <>
            <AreaTitle>Profile of {dataUser.name}</AreaTitle>
            {dataUser ? <>
                <div className="area-user">
                    <div className="area-user-avatar">
                        <AvatarOfUser
                            className="area-user-avatar-img"
                            srcImage={dataUser.image}
                        ></AvatarOfUser>
                        <div>{dataUser.name}</div>
                    </div>
                    <div className="area-user-info">
                        <div>
                            <p className="info-title">Email:</p>
                            <p>{dataUser.email}</p></div>
                        <div>
                            <p className="info-title">Role:</p> 
                            <p>{dataUser.role}</p></div>
                    </div>
                </div>
            </> : tipsConst.tipDataWrong}
            {/* <Tips content={tipsConst.beingDecorated}></Tips> */}
            <div className="area-related">
                <div className="area-tabs">
                    {/* <button
                        className="btn-recent"
                        onClick={() => setAreaName('recent')}>Recent Posts</button> */}
                    <button
                        className={`btn-item ${areaName === 'item' && 'btn-strong'}`}
                        onClick={() => setAreaName('item')}>Posts</button>
                    <button
                        className={`btn-comment ${areaName === 'comment' && 'btn-strong'}`}
                        onClick={() => setAreaName('comment')}>Comments</button>
                    <button
                        className={`btn-like ${areaName === 'like' && 'btn-strong'}`}
                        onClick={() => setAreaName('like')}>Likes</button>
                    <button
                        className={`btn-favorite ${areaName === 'favorite' && 'btn-strong'}`}
                        onClick={() => setAreaName('favorite')}>favorites</button>
                </div>
                <div className="area-list">
                    {listData?.length > 0 &&
                        <ul className="ul-interaction-item">
                            {listData.map((item, index) => (
                                (() => {
                                    let itemUrl
                                    switch (areaName) {
                                        case 'item':
                                            return <li
                                                key={`post-${areaName}-${index}`}
                                            >
                                                <p className='area-name'>&gt;&gt;&gt;&gt;&gt;&gt; Learning Area: {item.area}</p>
                                                {/* <p>{JSON.stringify(item)}</p> */}
                                                <ul key={`post-${item.area}`}>
                                                    {item.list?.map(subItem => (
                                                        <li key={`post-${item.area}-${subItem._id}`}>
                                                            {/*  */}
                                                            {/* <p>_id: {subItem._id}</p> */}
                                                            <Link href={`/learning/${item.area}/${subItem._id}`}>{subItem.title}{subItem.status === 'draft' ? ' (Draft)' : ''}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        case 'comment':
                                            console.log('item', item)
                                            itemUrl = item.belongToItemInfo ? `/learning/${item.belongToItemInfo.itemType}/${item.belongToItemInfo._id}` : ''
                                            return <li
                                                key={`comment-${areaName}-${item._id}`}
                                            ><Link href={itemUrl}>{item.content} to: {item.belongToItemInfo?.content ?
                                                strSliced(html2txt(item.belongToItemInfo.content)) : '?'}</Link></li>
                                        case 'like':
                                            itemUrl = item.belongToItemInfo ? `/learning/${item.belongToItemInfo.itemType}/${item.belongToItemInfo._id}` : ''
                                            return <li
                                                key={`like-${areaName}-${item._id}`}
                                            ><Link href={itemUrl}>{strSliced(html2txt(item.belongToItemInfo.content), 200)}</Link></li>
                                        case 'favorite':
                                            itemUrl = item.belongToItemInfo ? `/learning/${item.belongToItemInfo.itemType}/${item.belongToItemInfo._id}` : ''
                                            return <li
                                                key={`favorite-${areaName}-${item._id}`}
                                            ><Link href={itemUrl}>{strSliced(html2txt(item.belongToItemInfo.content), 200)}</Link></li>
                                    }
                                })()
                                
                            ))}
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}




// 'use client'
// import { useState, useEffect } from 'react'
// export const UserProfile = ({ dataUser, urlDomain }) => {
//     const [areaName, setAreaName] = useState('comment')
//     const [listData, setListData] = useState([])
//     // console.log('dataUser', dataUser)
//     const dataSwitchHandler = async ({ urlDomain, dataType }) => {
//         console.log('dataSwitchHandler wtest')
//         const { data } = await fetch(`${urlDomain}?collectionName=${dataType}&fetchType=list&userId=${dataUser.userId}`, {
//             cache: 'no-store'
//         }).then(res => res.json())
//         setListData(data)
        
//         console.log('listData >>>', listData, 'dataType', dataType)
//     }
    
//     useEffect(() => {
//         setListData()
//     }, [areaName])
//     useEffect(() => {
//         const funInit = async () => {
//             await dataSwitchHandler({ urlDomain, dataType: areaName })
//         }
//         funInit()
//     }, [])
//     return (
//         <>
//             <div className="area-related">
//                 <div className="area-tabs">
//                     <button
//                         className="btn-comment"
//                         onClick={() => dataSwitchHandler({ dataType: 'a', urlDomain })}>a</button>
//                     <button
//                         className="btn-like"
//                         onClick={() => dataSwitchHandler({ dataType: 'b', urlDomain })}>b</button>
//                     <button
//                         className="btn-favorite"
//                         onClick={() => dataSwitchHandler({ dataType: 'c', urlDomain })}>c</button>
//                 </div>
//                 <div className="area-list">
//                     <div>{areaName}</div>
//                     {listData?.length > 0 &&
//                         <ul>
//                             {listData}
//                         </ul>
//                     }
//                 </div>
//             </div>
//         </>
//     )
// }
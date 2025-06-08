'use client'
import { useState, useEffect } from 'react'
import { AreaTitle } from '@components/areaTitle/areaTitle'
import { AvatarOfUser } from '@/app/components/avatarOfUser/avatarOfUser'
import { tipsConst } from '@/constants/tipsConst'
import { Tips } from '@/app/components/tips/tips'
import { UserConSwitch } from '@components/userRelated/userConSwitch/userConSwitch'
import { Tabs } from '@components/tabs/tabs'
import Link from 'next/link'
import './userProfile.scss'

const tabsItemType = [
        {
            itemName: 'item',
            itemTitle: 'Posts'
        },
        {
            itemName: 'comment',
            itemTitle: 'Comments'
        },
        {
            itemName: 'like',
            itemTitle: 'Likes'
        },
        {
            itemName: 'favorite',
            itemTitle: 'Favorites'
        }
    ]

export const UserProfile = ({ dataUser, urlDomain }) => {
    const [areaName, setAreaName] = useState('item')
    const [areaNameShow, setAreaNameShow] = useState('')
    const [listData, setListData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const dataSwitchHandler = async ({ urlDomain, dataType }) => {
        setIsLoading(true)
        setListData([])
        
        const { data } = await fetch(`${urlDomain}?collectionName=${dataType}&fetchType=list&userId=${dataUser.userId}`, {
            cache: 'no-store'
        }).then(res => res.json())
        console.log('data ~~~', data)
        
        setListData(data)
        setIsLoading(false)
        setAreaNameShow(areaName)
        
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
                <Tabs areaName={areaName} setAreaName={setAreaName} items={tabsItemType}></Tabs>
                <div className="area-list">
                    {isLoading ? <p>Loading...</p> :
                        (listData.length > 0 ?
                            <UserConSwitch
                                areaName={areaNameShow}
                                listData={listData} /> : <p>No Data</p>)
                    }
                </div>
            </div>
        </>
    )
}

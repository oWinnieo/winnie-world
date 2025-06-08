'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Tabs } from '@components/tabs/tabs'

export const UserPost = React.memo(({ listData }) => {
    const [listForShow, setListForShow] = useState(null)
    const tabsItemType = listData.map(item => ({
        itemName: item.area,
        itemTitle: 'Area ' + item.area.charAt(0).toUpperCase() + item.area.slice(1)
    }))
    const [areaName, setAreaName] = useState(tabsItemType[0].itemName)
    useEffect(() => {
        setListForShow(listData.find(i => i.area === areaName))
    }, [areaName])
    return <>
        <Tabs areaName={areaName} setAreaName={setAreaName} items={tabsItemType}></Tabs>
        {listForShow?.list?.length > 0 ?
            <ul className="ul-interaction-item" key={`post-${listForShow.area}`}>
                {listForShow.list?.map(subItem => (
                    <li key={`post-${listForShow.area}-${subItem._id}`}>
                        <Link href={`/learning/${listForShow.area}/${subItem._id}`}>{subItem.title}{subItem.status === 'draft' ? ' (Draft)' : ''}</Link>
                    </li>
                ))}
            </ul> :
            <p>No Data</p>}
    </>
})

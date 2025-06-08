'use client'
import React from 'react'
import { UserPost } from '@/app/components/userRelated/userPost/userPost'
import { UserComment } from '@components/userRelated/userComment/userComment'
import { UserLike } from '@components/userRelated/userLike/userLike'
import { UserFavorite } from '@components/userRelated/userFavorite/userFavorite'
export const UserConSwitch = React.memo(({ areaName, listData }) => {
    console.log('UserConSwitch ?')
    return <>
    {/* 12, areaName, {areaName} */}
    {/* {areaName === 'item' && <UserPost listData={listData} areaName={areaName}></UserPost>} */}
        {areaName === 'item' ?
            <UserPost listData={listData}></UserPost> :
            <ul className="ul-interaction-item">
            {listData.map((item, index) => {
                let itemUrl
                switch (areaName) {
                    case 'comment':
                        itemUrl = item.belongToItemInfo ? `/learning/${item.belongToItemInfo.itemType}/${item.belongToItemInfo._id}` : ''
                        return <UserComment
                            key={`comment-${areaName}-${item._id}-${index}`}
                            item={item}
                            itemUrl={itemUrl} />
                    case 'like':
                        itemUrl = item.belongToItemInfo ? `/learning/${item.belongToItemInfo.itemType}/${item.belongToItemInfo._id}` : ''
                        return <UserLike
                            key={`like-${areaName}-${item._id}-${index}`}
                            item={item}
                            itemUrl={itemUrl} />
                    case 'favorite':
                        itemUrl = item.belongToItemInfo ? `/learning/${item.belongToItemInfo.itemType}/${item.belongToItemInfo._id}` : ''
                        return <UserFavorite
                            key={`favorite-${areaName}-${item._id}-${index}`}
                            item={item}
                            itemUrl={itemUrl} />
                }
            })}
            </ul>
    }
    </>
})

        /* wtest *
                            if (areaName === 'item') {
                                return 
                            } else {
                                return <p>111</p>
                            }
                            /* /wtest */
                            /* wtest *
                            switch (areaName) {
                                case 'item':
                                    return <UserPost listData={listData} isLoading={isLoading} testing={isLoading}></UserPost>
                                default:
                                    return <p>111</p>
                            }
                            /* /wtest */
                            // return <UserPost listData={listData} isLoading={isLoading} testing={isLoading}></UserPost>


    // const userConForShow = {
    //         'item': 
    //         'comment': ,
    //         'like': ,
    //         'favorite': 
    //     }
'use client'
import { listNavItemConfig } from '@/constants/formConfig'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import {
    ifLoginedAsAdmin
} from '@/lib/auth'
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'
export const ItemListNav = ({ item, urlDomain }) => {
    /* wtest auth mock */
    const session = sessionInfo()
    /* /wtest auth mock */
    return (
        // <p>ItemListNav</p>
        <>
            {item?.groupName && item?.colName ? 
                            (item.groupName === 'learning' ?
                                <ItemEditor
                                    params={
                                    {
                                        group: 'management',
                                        urlDomain,
                                        collectionName: 'listNav', // wtest 'listNav',
                                        formConfig: listNavItemConfig, // wtest learningItemConfig // wtest listNavItemConfig,
                                        data: item,
                                    }
                                    }
                                ></ItemEditor> :
                                (ifLoginedAsAdmin({ session }) &&
                                <ItemEditor
                                    params={
                                    {
                                        group: 'management',
                                        urlDomain,
                                        collectionName: 'listNav', // wtest 'listNav',
                                        formConfig: listNavItemConfig, // wtest learningItemConfig // wtest listNavItemConfig,
                                        data: item,
                                    }
                                    }
                                ></ItemEditor>)
                                )
                            : <li className="li-list-nav" key={item.title}>{item.title}</li>
                            }
        </>
        
    )
}
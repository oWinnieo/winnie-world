'use client'
import { listNavItemConfig } from '@/constants/formConfig'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
import {
    ifLoginedAdmin
} from '@/lib/auth'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'
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
                                (ifLoginedAdmin({ session }) &&
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
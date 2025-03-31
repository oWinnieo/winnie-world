'use client'
import { listNavItemConfig } from '@/constants/formConfig'
import {
    ifLoginedAsAdmin
} from '@/lib/auth'
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'
export const ItemListNav = ({ item, urlDomain, session }) => { // wtest session here
    return (
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
                                    session={session}
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
                                    session={session}
                                ></ItemEditor>)
                                )
                            : <li className="li-list-nav" key={item.title}>{item.title}</li>
                            }
        </>
        
    )
}